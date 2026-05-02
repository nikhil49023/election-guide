import { describe, it, expect, vi } from 'vitest';
import { POST } from './route';

// Mock the AI SDK functions
vi.mock('ai', () => ({
  createDataStreamResponse: vi.fn(() => new Response('stream')),
  formatDataStreamPart: vi.fn(),
  generateText: vi.fn().mockResolvedValue({ text: 'mocked response' }),
}));

vi.mock('@ai-sdk/google', () => ({
  google: vi.fn(),
}));

describe('Chat API Route', () => {
  it('returns 400 for invalid payload (missing messages array)', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        invalidField: 'test'
      }),
    });
    
    const res = await POST(req);
    expect(res.status).toBe(400);
    const text = await res.text();
    expect(text).toContain('Invalid request payload');
  });

  it('returns 200 and processes valid payload', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        messages: [{ role: 'user', content: 'hello' }],
        role: 'voter',
        lang: 'en'
      }),
    });
    
    const res = await POST(req);
    // Because it enters the stream code (either fallback or real depending on env key),
    // it returns the mocked Response from createDataStreamResponse
    expect(res.status).toBe(200);
  });
});
