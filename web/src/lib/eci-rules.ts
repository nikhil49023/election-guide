/**
 * Represents a specific rule or guideline from the Election Commission of India.
 * @interface
 */
export interface EciRule {
  id: string;
  title: string;
  appliesTo: string[];
  summary: string;
  protocol: string[];
  sourceTitle: string;
  sourceUrl: string;
}

/**
 * Centralized knowledge base of core ECI rules and procedures.
 * Used by the AI assistant to ground its responses in official guidelines.
 * @constant
 */
export const ECI_RULES: EciRule[] = [
  {
    id: 'voter-form-6',
    title: 'New voter registration through Form 6',
    appliesTo: ['voter', 'enrollment', 'registration', 'form 6'],
    summary:
      'Form 6 is the application for inclusion of a new elector in the electoral roll. The applicant addresses it to the Electoral Registration Officer for the constituency where they ordinarily reside.',
    protocol: [
      'Use Form 6 for a new general elector.',
      'Provide name, relative details, contact details, Aadhaar details if available, gender, date of birth, age proof, and ordinary residence proof.',
      'Attach a recent passport-size colour photo with a white background.',
      'False declaration is punishable under Section 31 of the Representation of the People Act, 1950.',
    ],
    sourceTitle: 'ECI Form 6 Guidelines',
    sourceUrl: 'https://voters.eci.gov.in/guidelines/Form-6_en.pdf',
  },
  {
    id: 'voter-form-8',
    title: 'Correction, shifting, replacement EPIC, and PwD marking through Form 8',
    appliesTo: ['voter', 'correction', 'shift', 'epic', 'pwd', 'form 8'],
    summary:
      'Form 8 is used by an enrolled elector for shifting residence, correction of entries, replacement EPIC, or marking as a person with disability.',
    protocol: [
      'Use Form 8 only if already enrolled as an elector.',
      'Choose one application option: shifting, correction, replacement EPIC, or PwD marking.',
      'Provide EPIC details, contact details, Aadhaar details if available, and supporting documents.',
      'If a replacement EPIC is issued after approval, return the old EPIC to the ERO as instructed.',
    ],
    sourceTitle: 'ECI Form 8 Guidelines',
    sourceUrl: 'https://voters.eci.gov.in/guidelines/Form-8_en.pdf',
  },
  {
    id: 'mcc-campaign-conduct',
    title: 'Model Code of Conduct campaign restrictions',
    appliesTo: ['candidate', 'campaign', 'mcc', 'political party', 'speech'],
    summary:
      'The Model Code of Conduct requires parties and candidates to avoid private-life criticism unrelated to public activity, activities that aggravate social divisions, and appeals to caste or communal feelings for votes.',
    protocol: [
      'Criticize policies, public record, and political work rather than unrelated private life.',
      'Do not create mutual hatred or tension between caste, community, religious, or linguistic groups.',
      'Do not appeal to caste or communal feelings to secure votes.',
      'Seek required permissions and follow ECI advisories issued during the election period.',
    ],
    sourceTitle: 'ECI Manual on Model Code of Conduct',
    sourceUrl: 'https://www.eci.gov.in/',
  },
  {
    id: 'ro-duties',
    title: 'Returning Officer election management duties',
    appliesTo: ['candidate', 'nomination', 'scrutiny', 'returning officer', 'counting'],
    summary:
      'The Returning Officer conducts election in a constituency and handles notices, nomination acceptance and scrutiny, affidavit publication, symbol allotment, candidate list preparation, EVM/VVPAT preparation, training, and counting-related duties.',
    protocol: [
      'RO publishes the election notice.',
      'RO accepts and scrutinizes nomination forms.',
      'RO publishes candidate affidavits and allots symbols.',
      'RO prepares contesting candidate list, ballot materials, EVM/VVPAT readiness, staff training, and counting process.',
    ],
    sourceTitle: 'ECI Handbook for Returning Officer',
    sourceUrl: 'https://www.eci.gov.in/',
  },
  {
    id: 'evm-poll-day-mock-poll',
    title: 'Poll-day EVM/VVPAT mock poll before actual voting',
    appliesTo: ['voter', 'poll worker', 'candidate', 'observer', 'evm', 'vvpat', 'mock poll'],
    summary:
      'On poll day, mock poll is conducted before actual poll in the presence of polling agents. The electronic result and VVPAT slips are tallied, mock data is cleared, mock slips are sealed, and EVM/VVPAT are sealed before actual poll.',
    protocol: [
      'Conduct mock poll before actual poll with polling agents present where available.',
      'Cast at least 50 mock votes and ensure candidates including NOTA are covered.',
      'Tally Control Unit result with VVPAT slips and record certificate in the Presiding Officer report.',
      'Press CLEAR, show zero votes, remove mock VVPAT slips, stamp/mark them as mock poll slips, and seal them separately.',
      'Seal EVMs and VVPATs in the presence of polling agents and obtain signatures on seals.',
    ],
    sourceTitle: 'ECI EVM/VVPAT Poll Day Instructions',
    sourceUrl: 'https://www.eci.gov.in/',
  },
  {
    id: 'form-17c-close-poll',
    title: 'Close of poll, Form 17C, and sealed return',
    appliesTo: ['poll worker', 'candidate', 'observer', 'form 17c', 'close poll', 'strong room'],
    summary:
      'After close of poll, the Presiding Officer closes the Control Unit, records votes and seal details in Form 17C, gives copies to polling agents, seals EVM/VVPAT in their presence, and sends machines to the strong room.',
    protocol: [
      'Press CLOSE after polling is complete according to rules.',
      'Record total polled votes, seal numbers, and machine serial numbers in Form 17C.',
      'Provide Form 17C copies to polling agents present.',
      'Seal EVMs and VVPATs in carrying cases with polling agent signatures where present.',
      'Escort polled machines to the strong room under security and videography as instructed.',
    ],
    sourceTitle: 'ECI EVM/VVPAT and Form 17C Instructions',
    sourceUrl: 'https://www.eci.gov.in/mythvsreality/details/other',
  },
  {
    id: 'evm-security-transparency',
    title: 'EVM security, randomisation, strong rooms, and stakeholder presence',
    appliesTo: ['evm', 'vvpat', 'candidate', 'observer', 'strong room', 'counting'],
    summary:
      'ECI processes include First Level Checking, two-stage randomisation, candidate or party representative presence, sealing, GPS/security-backed movement, strong-room safeguards, and counting in the presence of candidates or agents.',
    protocol: [
      'FLC is conducted before elections by authorised BEL/ECIL engineers with recognized political party representatives invited.',
      'First randomisation allocates machines constituency-wise; second randomisation allocates polling-station-wise before commissioning.',
      'Candidates or representatives may observe commissioning and sign seals.',
      'Polled EVMs/VVPATs are stored in strong rooms under double lock, CCTV, and armed security, with candidates/representatives allowed to monitor.',
      'Strong rooms are opened on counting day in the presence of candidates/representatives, RO/ARO, and ECI Observer.',
    ],
    sourceTitle: 'ECI Myth vs Reality: EVM Transparency',
    sourceUrl: 'https://www.eci.gov.in/mythvsreality/details/other',
  },
  {
    id: 'vvpat-verification',
    title: 'VVPAT verification and counting safeguards',
    appliesTo: ['voter', 'candidate', 'observer', 'counting', 'vvpat'],
    summary:
      'The voter verifies their vote through the VVPAT slip display. During counting, EVM totals are tallied with Form 17C, and VVPAT slips are counted in specified circumstances including mandatory random verification and certain discrepancy situations.',
    protocol: [
      'Voter presses the chosen button and verifies the displayed VVPAT slip.',
      'At counting, EVM total is compared with Form 17C for the polling station.',
      'Mandatory VVPAT slip verification applies to randomly selected polling stations as per ECI instructions.',
      'If mock data/slips were not cleared or CU/Form 17C mismatch affects margin conditions, VVPAT slips of relevant station may be counted as instructed.',
    ],
    sourceTitle: 'ECI Myth vs Reality: VVPAT and Counting',
    sourceUrl: 'https://www.eci.gov.in/mythvsreality/details/other',
  },
  {
    id: 'expenditure-observer',
    title: 'Expenditure Observer duties',
    appliesTo: ['candidate', 'observer', 'expenditure', 'campaign finance'],
    summary:
      'Expenditure Observers monitor candidate expenditure and guide expenditure monitoring personnel, Assistant Expenditure Observers, DEO coordination, and inspection of candidate expenditure registers.',
    protocol: [
      'Supervise and guide expenditure monitoring personnel in the constituency.',
      'Guide DEO and train Assistant Expenditure Observers and related teams.',
      'Inspect monitoring teams and report laxity or irregularity to DEO for corrective action.',
      'Inspect each candidate expenditure register at least three times during campaign as instructed.',
    ],
    sourceTitle: 'ECI Compendium of Instructions on Election Expenditure Monitoring',
    sourceUrl: 'https://www.eci.gov.in/',
  },
  {
    id: 'claims-objections',
    title: 'Claims, objections, and deletion safeguards in electoral roll work',
    appliesTo: ['voter', 'electoral roll', 'claims', 'objections', 'ero'],
    summary:
      'Claims and objections are processed by ERO/AERO after the required notice period and eligibility verification. Deletion from draft rolls requires due process, enquiry, and reasonable opportunity where applicable.',
    protocol: [
      'Claims and objections use prescribed forms and declarations.',
      'ERO/AERO disposes claims and objections after the notice period and eligibility verification.',
      'Deletion must follow applicable enquiry and speaking-order requirements where instructed.',
      'Aggrieved persons may submit claims with supporting documents through official channels.',
    ],
    sourceTitle: 'ECI Electoral Roll Claims and Objections Instructions',
    sourceUrl: 'https://www.eci.gov.in/',
  },
];

const DEFAULT_RULE_COUNT = 5;
const ECI_RULE_SEARCH_INDEX = ECI_RULES.map((rule) => ({
  rule,
  normalizedTerms: rule.appliesTo.map((term) => term.toLowerCase()),
}));

function formatRule(rule: EciRule, index: number) {
  const protocol = rule.protocol.map((item, itemIndex) => `${itemIndex + 1}. ${item}`).join(' ');
  return `Rule ${index + 1}: ${rule.title}. Summary: ${rule.summary} Protocol: ${protocol} Source: ${rule.sourceTitle} (${rule.sourceUrl}).`;
}

/**
 * Builds a dynamic, context-aware subset of ECI rules based on the user's role and current journey step.
 * Uses rudimentary keyword matching against the pre-compiled search index.
 *
 * @param {string | undefined} role - The current user's role (e.g., 'voter', 'candidate').
 * @param {Object} activeStep - The current active step in the election journey.
 * @param {string} [activeStep.id] - Optional ID of the step.
 * @param {string} [activeStep.label] - Optional label of the step.
 * @param {string} [activeStep.description] - Optional description of the step.
 * @returns {string} A formatted string of rules tailored for the AI prompt.
 */
export function buildEciKnowledgeBase(role: string | undefined, activeStep: { id?: string; label?: string; description?: string } | undefined) {
  const searchable = `${role ?? ''} ${activeStep?.id ?? ''} ${activeStep?.label ?? ''} ${activeStep?.description ?? ''}`.toLowerCase();
  const relevantRules = ECI_RULE_SEARCH_INDEX.filter(({ normalizedTerms }) =>
    normalizedTerms.some((term) => searchable.includes(term))
  ).map(({ rule }) => rule);
  const selectedRules = relevantRules.length > 0 ? relevantRules : ECI_RULES.slice(0, DEFAULT_RULE_COUNT);

  return selectedRules
    .map((rule, index) => formatRule(rule, index))
    .join('\n');
}
