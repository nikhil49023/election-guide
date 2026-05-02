import { google } from '@ai-sdk/google';
import { createDataStreamResponse, formatDataStreamPart, generateText } from 'ai';
import { z } from 'zod';
import { buildEciKnowledgeBase } from '@/lib/eci-rules';

export const maxDuration = 30;

type ChatRequest = {
  messages: Array<{ role: string; content: string }>;
  role?: string;
  lang?: 'en' | 'hi';
  activeStep?: {
    id?: string;
    label?: string;
    detailedExplanation?: string;
    protocolSteps?: string[];
    requiredDocs?: string[];
    readinessCheck?: { url?: string };
    impact?: string;
  };
};

const chatRequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system', 'data']),
    content: z.string()
  })),
  role: z.string().optional(),
  lang: z.enum(['en', 'hi']).optional(),
  activeStep: z.object({
    id: z.string().optional(),
    label: z.string().optional(),
    detailedExplanation: z.string().optional(),
    protocolSteps: z.array(z.string()).optional(),
    requiredDocs: z.array(z.string()).optional(),
    readinessCheck: z.object({ url: z.string().optional() }).optional(),
    impact: z.string().optional()
  }).optional()
});

export async function POST(req: Request) {
  let body: ChatRequest;
  try {
    const rawBody = await req.json();
    body = chatRequestSchema.parse(rawBody) as ChatRequest;
  } catch {
    return new Response('Invalid request payload. Validation failed.', { status: 400 });
  }
  const { messages, role, activeStep, lang } = body;

  const isHindi = lang === 'hi';
  const stepLabel = activeStep?.label || (isHindi ? 'इस चरण' : 'This step');
  const stepDescription = activeStep?.detailedExplanation || (isHindi
    ? 'आधिकारिक चुनाव जानकारी के लिए चुनाव आयोग की वेबसाइट देखें।'
    : 'Check the Election Commission website for official election guidance.');
  const stepUrl = activeStep?.readinessCheck?.url || 'https://eci.gov.in/';
  const stepImpact = activeStep?.impact || 'Your vote is your power';
  const protocolSteps = activeStep?.protocolSteps ?? [];
  const requiredDocs = activeStep?.requiredDocs ?? [];

  const numberedProtocol = protocolSteps.length > 0
    ? protocolSteps.map((step, index) => `${index + 1}. ${step}`)
    : [isHindi ? '1. आधिकारिक ECI पोर्टल देखें।' : '1. Check the official ECI portal.'];
  const documentsList = requiredDocs.length > 0
    ? requiredDocs.map((doc) => `- ${doc}`)
    : [isHindi ? '- लागू नहीं' : '- N/A'];

  const compactProtocol = protocolSteps.length > 0
    ? protocolSteps.map((step, index) => `${index + 1}. ${step}`).join(' ')
    : 'N/A';
  const compactDocuments = requiredDocs.length > 0
    ? requiredDocs.join(', ')
    : 'N/A';

  const eciKnowledgeBase = buildEciKnowledgeBase(role, activeStep);
  const fallbackText = isHindi
    ? `सारांश: ${stepLabel} के लिए ${stepDescription}\n\nचरण:\n${numberedProtocol.join('\n')}\n\nदस्तावेज:\n${documentsList.join('\n')}\n\nआधिकारिक स्रोत: ${stepUrl}`
    : `Summary: ${stepLabel} - ${stepDescription}\n\nSteps:\n${numberedProtocol.join('\n')}\n\nDocuments:\n${documentsList.join('\n')}\n\nOfficial source: ${stepUrl}`;

  const dataStreamResponse = (text: string) => createDataStreamResponse({
    execute: (dataStream) => {
      dataStream.write(formatDataStreamPart('text', text));
      dataStream.write(formatDataStreamPart('finish_message', {
        finishReason: 'stop',
        usage: { promptTokens: 0, completionTokens: 0 },
      }));
    },
  });

  const systemPrompt = `You are a helpful Indian Election Process Assistant.
  Language: ${isHindi ? 'Hindi' : 'English'}
  Current User Role: ${role || 'Voter'}
  Current Step in Journey: ${activeStep?.label || 'Overview'}
  Step Description: ${activeStep?.detailedExplanation || 'General election guidance.'}
  Required Documents: ${compactDocuments}
  Step Protocol: ${compactProtocol}
  Official Link for this step: ${stepUrl}
  Official ECI Rules Knowledge Base:
  ${eciKnowledgeBase}

  Instructions:
  - Your answers MUST be grounded in the journey context and Official ECI Rules Knowledge Base above.
  - If a user asks for a link or where to go, direct them specifically to: ${stepUrl || 'the ECI portal (https://eci.gov.in/)'}.
  - Mention the relevant official ECI source title or URL when giving a rule, policy, or legal-process answer.
  - Use simple language for common citizens.
  - In Hindi mode, ensure you use clear and polite Hindi.
  - Format answers for a compact mobile chat panel:
    Summary: one short sentence.
    Steps: numbered list with 3-5 items when explaining a process.
    Documents: short bullet list when documents matter.
    Official source: include the source title or URL on its own line.
  - When explaining process, answer in clear ordered steps using the Step Protocol.
  - Always explain impact when relevant: ${stepImpact}.`;

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return dataStreamResponse(fallbackText);
  }

  try {
    const result = await generateText({
      model: google(process.env.GEMINI_MODEL || 'gemma-4-26b-a4b-it'),
      messages,
      system: systemPrompt,
      temperature: 0.2,
    });

    return dataStreamResponse(result.text);
  } catch (error) {
    console.error('Gemini request failed, using fallback response.', error);
    const serviceNotice = isHindi
      ? 'नोट: AI model request अभी पूरा नहीं हो सका, इसलिए मैं आधिकारिक ECI context से grounded fallback उत्तर दे रहा हूँ.\n\n'
      : 'Note: The AI model request could not be completed, so I am using the grounded official ECI fallback answer.\n\n';

    return dataStreamResponse(`${serviceNotice}${fallbackText}`);
  }
}
