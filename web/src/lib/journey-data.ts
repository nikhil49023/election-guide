export type Role = 'voter' | 'candidate' | 'volunteer' | 'observer';
export type Language = 'en' | 'hi';

export interface Step {
  id: string;
  label: string;
  description: string;
  detailedExplanation: string;
  illustration:
    | 'awareness'
    | 'register'
    | 'verify'
    | 'campaign'
    | 'training'
    | 'polling'
    | 'evm'
    | 'security'
    | 'counting'
    | 'report';
  requiredDocs: string[];
  deadlines: string;
  protocolSteps: string[];
  readinessCheck: {
    question: string;
    action: string;
    url?: string;
  };
  quote?: string;
  impact?: string;
}

export interface JourneyData {
  roles: Record<Role, {
    title: string;
    description: string;
    icon: string;
    steps: Step[];
  }>;
}

export const JOURNEY_DATA: Record<Language, JourneyData> = {
  en: {
    roles: {
      voter: {
        title: 'Common Citizen',
        description: 'Register, verify, vote, and track the result.',
        icon: 'IN',
        steps: [
          {
            id: 'voter-enroll',
            label: 'Enroll or Update',
            description: 'Get your name into the electoral roll.',
            detailedExplanation: 'A citizen who is 18 or older must be enrolled in the electoral roll for the place where they ordinarily live. New voters use Form 6, overseas voters use Form 6A, and existing voters use Form 8 for correction, shifting, replacement EPIC, or PwD marking.',
            illustration: 'register',
            requiredDocs: ['Age proof', 'Address proof', 'Recent photo', 'Mobile number for status updates'],
            deadlines: 'Apply before the roll closes for the election schedule in your constituency.',
            protocolSteps: [
              'Open the voter services portal or contact the Booth Level Officer.',
              'Choose the correct form: Form 6, 6A, 7, or 8.',
              'Upload proof, submit, and save the reference number.',
              'Track verification until the Electoral Registration Officer accepts or asks for correction.'
            ],
            readinessCheck: {
              question: 'Have you submitted the correct voter form and saved the reference number?',
              action: 'Open Voter Portal',
              url: 'https://voters.eci.gov.in/'
            },
            quote: 'A vote only works when your name is on the roll.',
            impact: 'Enrollment converts citizenship into actual electoral participation.'
          },
          {
            id: 'voter-verify',
            label: 'Verify Name and Booth',
            description: 'Confirm your roll entry and polling station.',
            detailedExplanation: 'Before polling day, search your name by EPIC number or personal details, download or note your voter slip information, and identify your polling station, part number, and serial number.',
            illustration: 'verify',
            requiredDocs: ['EPIC number if available', 'Registered mobile number', 'Booth or constituency details'],
            deadlines: 'Verify after final publication of the roll and again before polling day.',
            protocolSteps: [
              'Search the electoral roll using EPIC or demographic details.',
              'Check spelling, age, address, part number, and serial number.',
              'Use Form 8 if corrections are needed while the roll window is open.',
              'Save booth location and travel plan before polling day.'
            ],
            readinessCheck: {
              question: 'Do you know your booth and roll serial number?',
              action: 'Search Electoral Roll',
              url: 'https://electoralsearch.eci.gov.in/'
            },
            quote: 'Verification prevents last-minute confusion at the booth.',
            impact: 'A prepared voter reduces queues and helps polling staff move the line fairly.'
          },
          {
            id: 'voter-fair-play',
            label: 'Fair Play Watch',
            description: 'Understand the Model Code of Conduct.',
            detailedExplanation: 'Once elections are announced, campaign behavior is regulated. Bribery, intimidation, hate appeals, misuse of official machinery, and illegal inducements should be reported through official complaint channels.',
            illustration: 'awareness',
            requiredDocs: ['Incident location', 'Photo or video evidence if safe', 'cVIGIL or complaint reference'],
            deadlines: 'From election announcement until completion of the election process.',
            protocolSteps: [
              'Observe without confronting anyone or putting yourself at risk.',
              'Record time, place, and clear evidence where lawful and safe.',
              'Submit through cVIGIL or the official grievance channel.',
              'Keep the complaint reference and let election officials investigate.'
            ],
            readinessCheck: {
              question: 'Do you know how to report a violation safely?',
              action: 'Open cVIGIL',
              url: 'https://cvigil.eci.gov.in/'
            },
            quote: 'Fair elections depend on alert citizens.',
            impact: 'Reporting violations protects voters from pressure and inducement.'
          },
          {
            id: 'voter-poll-day',
            label: 'Polling Day',
            description: 'Enter, identify, vote, and exit.',
            detailedExplanation: 'At the polling station, officials verify your identity and roll entry, mark your finger with indelible ink, obtain your signature or thumb impression, and allow you to cast your vote on the EVM in secrecy.',
            illustration: 'polling',
            requiredDocs: ['EPIC or accepted photo ID', 'Voter slip if available', 'Accessible support request if needed'],
            deadlines: 'Reach during the notified polling hours for your constituency.',
            protocolSteps: [
              'Join the correct queue and follow polling staff instructions.',
              'Show identity proof and confirm your roll entry.',
              'Receive ink mark and sign the register or provide thumb impression.',
              'Enter the voting compartment alone unless formally assisted.'
            ],
            readinessCheck: {
              question: 'Do you have an accepted photo ID ready for polling day?',
              action: 'Find My Booth',
              url: 'https://electoralsearch.eci.gov.in/'
            },
            quote: 'Your vote is secret; your participation is public courage.',
            impact: 'A smooth polling day turns preparation into representation.'
          },
          {
            id: 'voter-evm-vvpat',
            label: 'EVM and VVPAT',
            description: 'Press, verify, and complete your vote.',
            detailedExplanation: 'Press the blue button next to your chosen candidate or NOTA. The candidate lamp glows, a beep sounds, and the VVPAT window briefly shows a paper slip with the selected name and symbol before the slip drops into the sealed box.',
            illustration: 'evm',
            requiredDocs: ['Chosen candidate or NOTA decision', 'Attention during VVPAT display'],
            deadlines: 'Complete inside the voting compartment without delay.',
            protocolSteps: [
              'Check the candidate name and symbol before pressing.',
              'Press one blue button only.',
              'Watch the VVPAT display for the brief verification window.',
              'Leave the compartment without taking photos or revealing your vote.'
            ],
            readinessCheck: {
              question: 'Do you understand the EVM and VVPAT sequence?',
              action: 'Read EVM Guidance',
              url: 'https://www.eci.gov.in/evm/'
            },
            quote: 'The beep confirms that the vote has been recorded.',
            impact: 'VVPAT verification builds trust in the recorded choice.'
          },
          {
            id: 'voter-results',
            label: 'Results and Accountability',
            description: 'Follow counting and stay engaged.',
            detailedExplanation: 'After polling, EVMs and VVPATs are sealed, moved under security to strong rooms, and opened for counting on the notified date. Results are published officially; citizens should rely on official channels rather than rumors.',
            illustration: 'counting',
            requiredDocs: ['Official result source', 'Constituency name', 'Candidate affidavit links for follow-up'],
            deadlines: 'Counting day and the post-result public accountability period.',
            protocolSteps: [
              'Track only official result sources or verified election authority updates.',
              'Compare winning candidate details and affidavit disclosures.',
              'Report misinformation or coercion if seen after polling.',
              'Keep engaging with the representative after the result.'
            ],
            readinessCheck: {
              question: 'Do you know where to verify official results?',
              action: 'Open ECI Results',
              url: 'https://results.eci.gov.in/'
            },
            quote: 'Democracy does not end when the result is declared.',
            impact: 'Accountability after voting keeps representation connected to citizens.'
          }
        ]
      },
      candidate: {
        title: 'Candidate',
        description: 'Nominate, campaign, comply, and account transparently.',
        icon: 'CN',
        steps: [
          {
            id: 'candidate-eligibility',
            label: 'Eligibility and Team',
            description: 'Confirm legal readiness before filing.',
            detailedExplanation: 'A candidate should confirm constituency eligibility, disqualifications, proposer requirements, party authorization if applicable, election agent arrangements, and the calendar notified by the Returning Officer.',
            illustration: 'verify',
            requiredDocs: ['Constituency notification', 'Age and citizenship proof', 'Party authorization if applicable', 'Proposer details'],
            deadlines: 'Before the nomination window opens.',
            protocolSteps: [
              'Read the election notification and nomination timetable.',
              'Confirm eligibility and proposer requirements for the election type.',
              'Appoint trusted election, polling, and counting agents.',
              'Prepare originals and copies before visiting the Returning Officer.'
            ],
            readinessCheck: {
              question: 'Have eligibility, proposer, and agent details been verified?',
              action: 'Candidate Information',
              url: 'https://www.eci.gov.in/candidate-political-parties'
            },
            quote: 'A clean campaign starts before the first public speech.',
            impact: 'Early compliance prevents avoidable rejection or disputes.'
          },
          {
            id: 'candidate-nomination',
            label: 'Nomination Filing',
            description: 'Submit nomination papers and affidavit.',
            detailedExplanation: 'Nomination is filed before the Returning Officer within the notified period. The package normally includes nomination forms, security deposit, required declarations, party symbol authorization where relevant, and Form 26 affidavit on assets, liabilities, education, and criminal cases.',
            illustration: 'register',
            requiredDocs: ['Nomination paper', 'Form 26 affidavit', 'Security deposit proof', 'Symbol or party authorization'],
            deadlines: 'During the notified nomination dates and hours only.',
            protocolSteps: [
              'Complete every field and attach required declarations.',
              'File before the Returning Officer within notified hours.',
              'Collect acknowledgment and check display of affidavit details.',
              'Prepare for scrutiny and keep originals available.'
            ],
            readinessCheck: {
              question: 'Is the nomination file complete and signed everywhere required?',
              action: 'Nomination Resources',
              url: 'https://www.eci.gov.in/candidate-political-parties'
            },
            quote: 'Transparency is the first promise a candidate makes.',
            impact: 'Complete filings help voters compare candidates on verified facts.'
          },
          {
            id: 'candidate-scrutiny',
            label: 'Scrutiny and Withdrawal',
            description: 'Respond to objections and confirm final candidature.',
            detailedExplanation: 'The Returning Officer scrutinizes nomination papers on the appointed date. Candidates or authorized representatives may respond to objections. After scrutiny, eligible candidates may withdraw within the withdrawal window; the final list and symbols follow.',
            illustration: 'report',
            requiredDocs: ['Acknowledgment receipt', 'Original proofs', 'Authorized representative letter', 'Withdrawal form if needed'],
            deadlines: 'Scrutiny and withdrawal dates fixed in the election notification.',
            protocolSteps: [
              'Attend scrutiny or send an authorized representative.',
              'Answer objections with documents and legal clarity.',
              'Decide withdrawal before the deadline if required.',
              'Verify final name, party, and symbol on the candidate list.'
            ],
            readinessCheck: {
              question: 'Are you ready for scrutiny with originals and responses?',
              action: 'RO Guidance',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'The final ballot is built through scrutiny.',
            impact: 'Scrutiny protects voters from invalid or incomplete candidature.'
          },
          {
            id: 'candidate-campaign',
            label: 'Campaign Protocol',
            description: 'Campaign within law and MCC limits.',
            detailedExplanation: 'Campaigns must follow the Model Code of Conduct, permission rules, silence period, expenditure limits, and restrictions on inducement, hate speech, official machinery, and public order violations.',
            illustration: 'campaign',
            requiredDocs: ['Campaign permission letters', 'Vehicle and venue permissions', 'Expense register', 'Media certification where required'],
            deadlines: 'Campaign ends with the statutory silence period before polling.',
            protocolSteps: [
              'Take permissions for rallies, vehicles, loudspeakers, and venues.',
              'Record every campaign expense with bills and vouchers.',
              'Avoid inducements, intimidation, hate appeals, and misinformation.',
              'Stop campaigning when the silence period begins.'
            ],
            readinessCheck: {
              question: 'Is every campaign event permitted and logged?',
              action: 'MCC and Expenditure',
              url: 'https://www.eci.gov.in/mcc/'
            },
            quote: 'Persuasion is democratic; pressure is not.',
            impact: 'Ethical campaigning protects voter freedom.'
          },
          {
            id: 'candidate-poll-count',
            label: 'Poll and Counting Agents',
            description: 'Observe voting and counting lawfully.',
            detailedExplanation: 'Candidates appoint polling agents to observe mock poll, sealing, polling, and close of poll. Counting agents attend counting, observe tabulation, and raise objections through the prescribed channel.',
            illustration: 'counting',
            requiredDocs: ['Agent appointment forms', 'Agent ID', 'Counting hall pass', 'Candidate copy of accounts'],
            deadlines: 'Agent appointments before polling and counting as notified.',
            protocolSteps: [
              'Train agents on booth conduct and secrecy rules.',
              'Ensure agents observe mock poll and seal signatures.',
              'Use formal objection routes; do not disrupt polling.',
              'At counting, compare round-wise data with official sheets.'
            ],
            readinessCheck: {
              question: 'Are polling and counting agents trained and documented?',
              action: 'Counting Process',
              url: 'https://results.eci.gov.in/'
            },
            quote: 'Observation must strengthen trust, not create disorder.',
            impact: 'Proper agent conduct improves transparency for every voter.'
          },
          {
            id: 'candidate-accounts',
            label: 'Accounts and Disclosure',
            description: 'Close expenditure and legal reporting.',
            detailedExplanation: 'After the election, candidates must submit true election expenditure accounts within the prescribed period and preserve records. Non-compliance can lead to legal consequences and future disqualification risk.',
            illustration: 'report',
            requiredDocs: ['Final expense register', 'Bills and vouchers', 'Bank account statements', 'Agent-certified summaries'],
            deadlines: 'Submit within the statutory post-result period notified for the election.',
            protocolSteps: [
              'Reconcile daily register, bank records, bills, and shadow observations.',
              'Resolve notices from expenditure monitoring teams.',
              'Submit final accounts in the required format.',
              'Archive records for inspection and future compliance.'
            ],
            readinessCheck: {
              question: 'Are all expenditure records reconciled and ready to file?',
              action: 'Expense Guidance',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'Public trust includes public accounting.',
            impact: 'Transparent accounts limit money power in elections.'
          }
        ]
      },
      volunteer: {
        title: 'Poll Worker',
        description: 'Prepare the booth, run polling, seal materials, and report.',
        icon: 'PW',
        steps: [
          {
            id: 'worker-training',
            label: 'Training and Appointment',
            description: 'Learn your role before poll day.',
            detailedExplanation: 'Polling personnel must attend training, understand the Presiding Officer diary, voter identification flow, EVM and VVPAT handling, accessibility support, forms, envelopes, and emergency escalation paths.',
            illustration: 'training',
            requiredDocs: ['Appointment letter', 'Training handbook', 'Duty order', 'Contact list'],
            deadlines: 'Training rounds before dispatch day.',
            protocolSteps: [
              'Attend all training sessions and practical EVM demonstrations.',
              'Confirm duty role, polling station, dispatch time, and transport.',
              'Study forms, statutory packets, non-statutory packets, and diary entries.',
              'Save sector officer and Returning Officer contact routes.'
            ],
            readinessCheck: {
              question: 'Have you completed training and confirmed dispatch details?',
              action: 'Personnel Guidance',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'A trained polling team is the backbone of a peaceful poll.',
            impact: 'Good preparation prevents delays and procedural errors.'
          },
          {
            id: 'worker-dispatch',
            label: 'Material Dispatch',
            description: 'Collect and verify every polling item.',
            detailedExplanation: 'Before leaving for the polling station, the team receives EVM, VVPAT, seals, forms, electoral roll copies, indelible ink, stationery, signs, and other materials. Every item must be checked against the dispatch checklist.',
            illustration: 'security',
            requiredDocs: ['Material checklist', 'EVM and VVPAT IDs', 'Seals and tags', 'Electoral roll copy'],
            deadlines: 'Dispatch day before movement to the polling station.',
            protocolSteps: [
              'Match EVM and VVPAT numbers with assigned documents.',
              'Check seals, tags, forms, envelopes, ink, and stationery.',
              'Report missing or mismatched material immediately.',
              'Move to the polling station through assigned transport and security.'
            ],
            readinessCheck: {
              question: 'Has every item been checked before leaving dispatch?',
              action: 'Review Checklist',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'No polling team should discover missing material at the booth.',
            impact: 'Material accuracy protects the validity of the poll.'
          },
          {
            id: 'worker-mock-poll',
            label: 'Mock Poll and Sealing',
            description: 'Prove the machine before actual poll.',
            detailedExplanation: 'Before actual polling, the Presiding Officer conducts mock poll in the presence of polling agents, tallies EVM result with VVPAT slips, clears mock poll data, removes and seals mock slips, then seals EVM and VVPAT for actual polling.',
            illustration: 'evm',
            requiredDocs: ['Mock poll certificate', 'Black envelope for mock slips', 'Paper seals', 'Presiding Officer diary'],
            deadlines: 'Before the scheduled start of actual polling.',
            protocolSteps: [
              'Conduct mock poll with agents present where available.',
              'Show result and tally with VVPAT slips.',
              'Clear mock poll data and remove mock VVPAT slips.',
              'Seal required compartments and record certificates and signatures.'
            ],
            readinessCheck: {
              question: 'Can you complete mock poll, clear, and sealing without skipping a record?',
              action: 'EVM Instructions',
              url: 'https://www.eci.gov.in/evm/'
            },
            quote: 'The actual poll begins only after trust is demonstrated.',
            impact: 'Mock poll protects confidence in machine accuracy.'
          },
          {
            id: 'worker-live-poll',
            label: 'Live Poll Management',
            description: 'Run the booth fairly and accessibly.',
            detailedExplanation: 'During polling, staff verify identity, manage the register, ink marking, voter slips, queue discipline, secrecy, assistance rules, challenged votes, tendered votes, and incident reporting.',
            illustration: 'polling',
            requiredDocs: ['Marked copy of roll', 'Register of voters', 'Indelible ink', 'Incident forms'],
            deadlines: 'Throughout notified polling hours.',
            protocolSteps: [
              'Maintain queue order, accessibility priority, and secrecy.',
              'Verify each elector against the roll and accepted ID.',
              'Record signatures or thumb impressions and apply ink correctly.',
              'Escalate machine issues, violence, impersonation, or complaints immediately.'
            ],
            readinessCheck: {
              question: 'Is the booth flow clear to every member of the polling team?',
              action: 'Polling Duties',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'Neutrality is a polling officer’s operating system.',
            impact: 'Fair booth management lets every eligible elector vote with dignity.'
          },
          {
            id: 'worker-close-return',
            label: 'Close, Seal, Return',
            description: 'Close the poll and return materials.',
            detailedExplanation: 'At close of poll, the Presiding Officer presses the Close button, seals EVM and VVPAT carrying cases in the presence of agents, completes statutory documents, packs materials, and returns everything to the receiving center under security.',
            illustration: 'report',
            requiredDocs: ['Account of votes recorded', 'Presiding Officer diary', 'Sealed EVM/VVPAT cases', 'Statutory packet list'],
            deadlines: 'Immediately after close of poll and before deposit at receiving center.',
            protocolSteps: [
              'Allow voters already in queue at closing time as per rules.',
              'Press Close and record final machine details.',
              'Seal machines, VVPAT, and statutory papers with signatures where required.',
              'Deposit materials and obtain receipt at the receiving center.'
            ],
            readinessCheck: {
              question: 'Can you account for every paper, seal, and machine before return?',
              action: 'Close Poll Protocol',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'The last seal is as important as the first vote.',
            impact: 'Careful return safeguards counting and public trust.'
          }
        ]
      },
      observer: {
        title: 'Observer',
        description: 'Monitor, verify, escalate, and report independently.',
        icon: 'OB',
        steps: [
          {
            id: 'observer-briefing',
            label: 'Briefing and Deployment',
            description: 'Understand jurisdiction and mandate.',
            detailedExplanation: 'Observers are deployed by the Commission as independent monitors. General, police, and expenditure observers review arrangements, law and order, complaints, expenditure monitoring, and critical polling station readiness.',
            illustration: 'training',
            requiredDocs: ['Deployment order', 'Observer handbook', 'Constituency map', 'Officer contact matrix'],
            deadlines: 'Before arrival in the assigned constituency.',
            protocolSteps: [
              'Review mandate, constituency profile, and sensitive locations.',
              'Establish communication with DEO, RO, police, and expenditure teams.',
              'Publish contact or meeting schedule if required by instructions.',
              'Set reporting cadence with the Commission.'
            ],
            readinessCheck: {
              question: 'Is your jurisdiction, team map, and reporting channel confirmed?',
              action: 'Observer Portal',
              url: 'https://observerseci.eci.nic.in/'
            },
            quote: 'Observers are the Commission’s field assurance system.',
            impact: 'Independent oversight improves public confidence.'
          },
          {
            id: 'observer-prepoll',
            label: 'Pre-Poll Review',
            description: 'Inspect readiness before voting starts.',
            detailedExplanation: 'Before polling, observers inspect vulnerable areas, critical booths, route charts, EVM randomization, strong rooms, training quality, accessibility arrangements, and complaint response systems.',
            illustration: 'security',
            requiredDocs: ['Inspection notes', 'Route chart', 'Critical booth list', 'Strong room checklist'],
            deadlines: 'From arrival until the eve of poll.',
            protocolSteps: [
              'Inspect sample polling stations and sensitive locations.',
              'Review EVM/VVPAT randomization, storage, and security.',
              'Check training, accessibility, webcasting, and communication plans.',
              'Direct corrective action through DEO/RO where gaps are found.'
            ],
            readinessCheck: {
              question: 'Have all critical locations and strong rooms been reviewed?',
              action: 'Inspection Checklist',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'The best intervention happens before the failure.',
            impact: 'Pre-poll review prevents avoidable disruption.'
          },
          {
            id: 'observer-campaign',
            label: 'Campaign and Expenditure Watch',
            description: 'Track MCC, complaints, and money power.',
            detailedExplanation: 'Observers review MCC enforcement, complaint disposal, cVIGIL cases, media certification, seizures, and candidate expenditure records. Expenditure observers inspect registers and guide monitoring teams.',
            illustration: 'campaign',
            requiredDocs: ['Complaint register', 'cVIGIL cases', 'Candidate expense registers', 'Seizure and media reports'],
            deadlines: 'From notification through the campaign period.',
            protocolSteps: [
              'Review complaint disposal quality and response time.',
              'Inspect expenditure monitoring teams and candidate registers.',
              'Escalate serious MCC, intimidation, bribery, or hate speech issues.',
              'Record directions and follow-up closure.'
            ],
            readinessCheck: {
              question: 'Are complaints and expenditure records being reviewed regularly?',
              action: 'cVIGIL Dashboard',
              url: 'https://cvigil.eci.gov.in/'
            },
            quote: 'Oversight turns rules into real-world protection.',
            impact: 'Monitoring reduces intimidation and unequal campaign power.'
          },
          {
            id: 'observer-poll-day',
            label: 'Poll Day Observation',
            description: 'Watch mock poll, voting, and escalation.',
            detailedExplanation: 'On poll day, observers monitor mock poll, booth opening, queue management, accessibility, incidents, replacement machines, vulnerable areas, and overall compliance without taking over routine polling duties.',
            illustration: 'polling',
            requiredDocs: ['Poll day route plan', 'Incident log', 'Sector officer updates', 'Observer app reports'],
            deadlines: 'Before mock poll until end of polling.',
            protocolSteps: [
              'Visit priority booths and verify mock poll compliance.',
              'Monitor queues, accessibility, secrecy, and law and order.',
              'Track incidents and ensure proper escalation by field officers.',
              'Send timely observation reports through official channels.'
            ],
            readinessCheck: {
              question: 'Is the poll day route plan focused on critical risk points?',
              action: 'Observer Reporting',
              url: 'https://observerseci.eci.nic.in/'
            },
            quote: 'Observe enough to know, intervene only through authority.',
            impact: 'Measured observation keeps polling lawful and calm.'
          },
          {
            id: 'observer-counting',
            label: 'Counting and Final Report',
            description: 'Monitor counting and close reporting.',
            detailedExplanation: 'Observers monitor counting center security, table arrangement, candidate agent access, round-wise tabulation, VVPAT procedures where applicable, objections, and declaration discipline before submitting final reports.',
            illustration: 'counting',
            requiredDocs: ['Counting center plan', 'Round-wise result sheets', 'Objection log', 'Final observer report'],
            deadlines: 'Counting day through final report submission.',
            protocolSteps: [
              'Inspect counting center security and access control.',
              'Monitor round-wise tabulation and objection handling.',
              'Ensure declaration follows completed statutory process.',
              'Submit final report with unresolved risks or recommendations.'
            ],
            readinessCheck: {
              question: 'Is the counting center ready for transparent observation?',
              action: 'Results Portal',
              url: 'https://results.eci.gov.in/'
            },
            quote: 'Counting must be both correct and visibly correct.',
            impact: 'Transparent counting closes the election with legitimacy.'
          }
        ]
      }
    }
  },
  hi: {
    roles: {
      voter: {
        title: 'आम नागरिक',
        description: 'नाम जुड़वाएं, सत्यापित करें, मतदान करें और परिणाम देखें।',
        icon: 'IN',
        steps: [
          {
            id: 'voter-enroll',
            label: 'नामांकन या सुधार',
            description: 'अपना नाम मतदाता सूची में सुनिश्चित करें।',
            detailedExplanation: '18 वर्ष या उससे अधिक आयु का नागरिक अपने सामान्य निवास स्थान की मतदाता सूची में नाम जुड़वा सकता है। नए मतदाता फॉर्म 6, प्रवासी भारतीय फॉर्म 6A और मौजूदा मतदाता सुधार, स्थानांतरण, EPIC बदलने या PwD चिह्नांकन के लिए फॉर्म 8 का उपयोग करते हैं।',
            illustration: 'register',
            requiredDocs: ['आयु प्रमाण', 'पता प्रमाण', 'हाल की फोटो', 'स्थिति सूचना के लिए मोबाइल नंबर'],
            deadlines: 'अपने निर्वाचन क्षेत्र की चुनावी समय-सारिणी में मतदाता सूची बंद होने से पहले आवेदन करें।',
            protocolSteps: [
              'वोटर पोर्टल खोलें या बूथ लेवल अधिकारी से संपर्क करें।',
              'सही फॉर्म चुनें: फॉर्म 6, 6A, 7 या 8।',
              'प्रमाण अपलोड करें, आवेदन जमा करें और संदर्भ संख्या सुरक्षित रखें।',
              'ERO द्वारा स्वीकृति या सुधार मांगने तक स्थिति ट्रैक करें।'
            ],
            readinessCheck: {
              question: 'क्या आपने सही फॉर्म जमा कर संदर्भ संख्या सुरक्षित रखी है?',
              action: 'वोटर पोर्टल खोलें',
              url: 'https://voters.eci.gov.in/'
            },
            quote: 'मत तभी काम आता है जब नाम सूची में हो।',
            impact: 'नामांकन नागरिकता को वास्तविक चुनावी भागीदारी में बदलता है।'
          },
          {
            id: 'voter-verify',
            label: 'नाम और बूथ सत्यापन',
            description: 'अपनी सूची प्रविष्टि और मतदान केंद्र जांचें।',
            detailedExplanation: 'मतदान से पहले EPIC या व्यक्तिगत विवरण से अपना नाम खोजें, मतदाता पर्ची की जानकारी नोट करें और मतदान केंद्र, भाग संख्या तथा क्रम संख्या पहचानें।',
            illustration: 'verify',
            requiredDocs: ['EPIC नंबर यदि उपलब्ध हो', 'पंजीकृत मोबाइल नंबर', 'बूथ या निर्वाचन क्षेत्र का विवरण'],
            deadlines: 'अंतिम मतदाता सूची प्रकाशित होने के बाद और मतदान से पहले फिर से जांचें।',
            protocolSteps: [
              'EPIC या जनसांख्यिकीय विवरण से मतदाता सूची खोजें।',
              'नाम, आयु, पता, भाग संख्या और क्रम संख्या जांचें।',
              'यदि समय खुला है तो सुधार के लिए फॉर्म 8 उपयोग करें।',
              'मतदान से पहले बूथ स्थान और यात्रा योजना सुरक्षित रखें।'
            ],
            readinessCheck: {
              question: 'क्या आपको अपना बूथ और सूची क्रम संख्या पता है?',
              action: 'मतदाता सूची खोजें',
              url: 'https://electoralsearch.eci.gov.in/'
            },
            quote: 'सत्यापन मतदान दिवस की उलझन कम करता है।',
            impact: 'तैयार मतदाता कतार और बूथ प्रक्रिया को सुचारू बनाता है।'
          },
          {
            id: 'voter-fair-play',
            label: 'निष्पक्ष चुनाव निगरानी',
            description: 'आदर्श आचार संहिता समझें।',
            detailedExplanation: 'चुनाव घोषणा के बाद प्रचार आचरण नियंत्रित होता है। रिश्वत, धमकी, नफरत फैलाने वाली अपील, सरकारी मशीनरी का दुरुपयोग और अवैध प्रलोभन आधिकारिक माध्यमों से रिपोर्ट किए जाने चाहिए।',
            illustration: 'awareness',
            requiredDocs: ['घटना स्थान', 'सुरक्षित हो तो फोटो या वीडियो', 'cVIGIL या शिकायत संदर्भ'],
            deadlines: 'चुनाव घोषणा से चुनाव प्रक्रिया पूरी होने तक।',
            protocolSteps: [
              'किसी से भिड़े बिना और जोखिम लिए बिना अवलोकन करें।',
              'समय, स्थान और सुरक्षित प्रमाण दर्ज करें।',
              'cVIGIL या आधिकारिक शिकायत माध्यम से भेजें।',
              'संदर्भ संख्या रखें और जांच अधिकारियों को करने दें।'
            ],
            readinessCheck: {
              question: 'क्या आपको सुरक्षित शिकायत दर्ज करना आता है?',
              action: 'cVIGIL खोलें',
              url: 'https://cvigil.eci.gov.in/'
            },
            quote: 'निष्पक्ष चुनाव सतर्क नागरिकों पर निर्भर करते हैं।',
            impact: 'शिकायत मतदाताओं को दबाव और प्रलोभन से बचाती है।'
          },
          {
            id: 'voter-poll-day',
            label: 'मतदान दिवस',
            description: 'प्रवेश, पहचान, मतदान और निकास।',
            detailedExplanation: 'मतदान केंद्र पर अधिकारी आपकी पहचान और सूची प्रविष्टि सत्यापित करते हैं, उंगली पर अमिट स्याही लगाते हैं, हस्ताक्षर या अंगूठा निशान लेते हैं और आपको गोपनीय रूप से EVM पर मतदान करने देते हैं।',
            illustration: 'polling',
            requiredDocs: ['EPIC या मान्य फोटो पहचान पत्र', 'मतदाता पर्ची यदि उपलब्ध हो', 'आवश्यक हो तो सहायता अनुरोध'],
            deadlines: 'अपने क्षेत्र के घोषित मतदान समय में पहुंचें।',
            protocolSteps: [
              'सही कतार में लगें और मतदान दल के निर्देश मानें।',
              'पहचान पत्र दिखाएं और सूची प्रविष्टि मिलाएं।',
              'स्याही निशान लें और रजिस्टर में हस्ताक्षर या अंगूठा दें।',
              'सहायता स्वीकृत न हो तो मतदान कक्ष में अकेले जाएं।'
            ],
            readinessCheck: {
              question: 'क्या आपके पास मतदान दिवस के लिए मान्य फोटो ID है?',
              action: 'मेरा बूथ खोजें',
              url: 'https://electoralsearch.eci.gov.in/'
            },
            quote: 'आपका वोट गुप्त है; आपकी भागीदारी सार्वजनिक साहस है।',
            impact: 'सुचारू मतदान तैयारी को प्रतिनिधित्व में बदलता है।'
          },
          {
            id: 'voter-evm-vvpat',
            label: 'EVM और VVPAT',
            description: 'बटन दबाएं, सत्यापित करें और मतदान पूरा करें।',
            detailedExplanation: 'अपने पसंदीदा उम्मीदवार या NOTA के सामने नीला बटन दबाएं। लाइट जलेगी, बीप बजेगी और VVPAT विंडो में थोड़ी देर के लिए नाम और प्रतीक वाली पर्ची दिखेगी, फिर पर्ची सीलबंद बॉक्स में गिर जाएगी।',
            illustration: 'evm',
            requiredDocs: ['उम्मीदवार या NOTA का निर्णय', 'VVPAT प्रदर्शन पर ध्यान'],
            deadlines: 'मतदान कक्ष में बिना देरी प्रक्रिया पूरी करें।',
            protocolSteps: [
              'बटन दबाने से पहले नाम और प्रतीक मिलाएं।',
              'केवल एक नीला बटन दबाएं।',
              'VVPAT विंडो में संक्षिप्त सत्यापन देखें।',
              'फोटो लिए या वोट बताए बिना बाहर आएं।'
            ],
            readinessCheck: {
              question: 'क्या आपको EVM और VVPAT क्रम समझ में है?',
              action: 'EVM मार्गदर्शन पढ़ें',
              url: 'https://www.eci.gov.in/evm/'
            },
            quote: 'बीप बताती है कि वोट दर्ज हो गया है।',
            impact: 'VVPAT सत्यापन दर्ज विकल्प में भरोसा बढ़ाता है।'
          },
          {
            id: 'voter-results',
            label: 'परिणाम और जवाबदेही',
            description: 'गिनती देखें और जुड़े रहें।',
            detailedExplanation: 'मतदान के बाद EVM और VVPAT सील होकर सुरक्षा में स्ट्रॉन्ग रूम जाते हैं और घोषित दिन पर गिनती के लिए खोले जाते हैं। परिणाम आधिकारिक रूप से प्रकाशित होते हैं; अफवाहों की जगह आधिकारिक स्रोतों पर भरोसा करें।',
            illustration: 'counting',
            requiredDocs: ['आधिकारिक परिणाम स्रोत', 'निर्वाचन क्षेत्र का नाम', 'उम्मीदवार हलफनामा लिंक'],
            deadlines: 'गिनती दिवस और परिणाम के बाद की जवाबदेही अवधि।',
            protocolSteps: [
              'केवल आधिकारिक परिणाम स्रोत या सत्यापित अपडेट देखें।',
              'विजेता उम्मीदवार का विवरण और हलफनामा देखें।',
              'मतदान के बाद गलत सूचना या दबाव दिखे तो रिपोर्ट करें।',
              'परिणाम के बाद भी प्रतिनिधि से संवाद बनाए रखें।'
            ],
            readinessCheck: {
              question: 'क्या आपको आधिकारिक परिणाम कहां देखने हैं पता है?',
              action: 'ECI परिणाम खोलें',
              url: 'https://results.eci.gov.in/'
            },
            quote: 'लोकतंत्र परिणाम घोषित होने पर समाप्त नहीं होता।',
            impact: 'मतदान के बाद जवाबदेही प्रतिनिधित्व को नागरिकों से जोड़े रखती है।'
          }
        ]
      },
      candidate: {
        title: 'उम्मीदवार',
        description: 'नामांकन, प्रचार, अनुपालन और पारदर्शी हिसाब।',
        icon: 'CN',
        steps: [
          {
            id: 'candidate-eligibility',
            label: 'पात्रता और टीम',
            description: 'नामांकन से पहले कानूनी तैयारी पक्की करें।',
            detailedExplanation: 'उम्मीदवार को निर्वाचन क्षेत्र पात्रता, अयोग्यता, प्रस्तावक, पार्टी प्राधिकरण, चुनाव एजेंट और RO द्वारा घोषित कैलेंडर की पुष्टि करनी चाहिए।',
            illustration: 'verify',
            requiredDocs: ['चुनाव अधिसूचना', 'आयु और नागरिकता प्रमाण', 'पार्टी प्राधिकरण यदि लागू हो', 'प्रस्तावक विवरण'],
            deadlines: 'नामांकन अवधि खुलने से पहले।',
            protocolSteps: [
              'अधिसूचना और नामांकन समय-सारिणी पढ़ें।',
              'पात्रता और प्रस्तावक आवश्यकताएं जांचें।',
              'चुनाव, मतदान और मतगणना एजेंट तय करें।',
              'RO कार्यालय जाने से पहले मूल और प्रतियां तैयार रखें।'
            ],
            readinessCheck: {
              question: 'क्या पात्रता, प्रस्तावक और एजेंट विवरण सत्यापित हैं?',
              action: 'उम्मीदवार जानकारी',
              url: 'https://www.eci.gov.in/candidate-political-parties'
            },
            quote: 'स्वच्छ प्रचार पहली सभा से पहले शुरू होता है।',
            impact: 'समय पर अनुपालन अस्वीकृति और विवाद रोकता है।'
          },
          {
            id: 'candidate-nomination',
            label: 'नामांकन दाखिल',
            description: 'नामांकन पत्र और हलफनामा जमा करें।',
            detailedExplanation: 'नामांकन RO के सामने घोषित अवधि में दाखिल होता है। इसमें नामांकन फॉर्म, जमानत, घोषणाएं, पार्टी प्रतीक प्राधिकरण और फॉर्म 26 हलफनामा शामिल होते हैं।',
            illustration: 'register',
            requiredDocs: ['नामांकन पत्र', 'फॉर्म 26 हलफनामा', 'जमानत प्रमाण', 'प्रतीक या पार्टी प्राधिकरण'],
            deadlines: 'केवल अधिसूचित नामांकन तिथियों और समय में।',
            protocolSteps: [
              'हर कॉलम भरें और आवश्यक घोषणाएं लगाएं।',
              'RO के सामने समय के भीतर दाखिल करें।',
              'रसीद लें और हलफनामा प्रदर्शन जांचें।',
              'जांच के लिए मूल दस्तावेज तैयार रखें।'
            ],
            readinessCheck: {
              question: 'क्या नामांकन फाइल पूरी और सही जगह हस्ताक्षरित है?',
              action: 'नामांकन संसाधन',
              url: 'https://www.eci.gov.in/candidate-political-parties'
            },
            quote: 'पारदर्शिता उम्मीदवार का पहला वादा है।',
            impact: 'पूर्ण दस्तावेज मतदाताओं को सत्यापित तुलना देते हैं।'
          },
          {
            id: 'candidate-scrutiny',
            label: 'जांच और वापसी',
            description: 'आपत्तियों का उत्तर दें और अंतिम उम्मीदवारी तय करें।',
            detailedExplanation: 'RO तय दिन पर नामांकन पत्रों की जांच करता है। उम्मीदवार या प्रतिनिधि आपत्तियों का उत्तर दे सकते हैं। जांच के बाद तय समय में नाम वापस लिया जा सकता है और अंतिम सूची तथा प्रतीक जारी होते हैं।',
            illustration: 'report',
            requiredDocs: ['रसीद', 'मूल प्रमाण', 'प्रतिनिधि प्राधिकरण पत्र', 'आवश्यक हो तो वापसी फॉर्म'],
            deadlines: 'अधिसूचना में तय जांच और वापसी तिथियां।',
            protocolSteps: [
              'जांच में उपस्थित हों या प्रतिनिधि भेजें।',
              'आपत्तियों का दस्तावेजों से उत्तर दें।',
              'वापसी का निर्णय समयसीमा से पहले लें।',
              'अंतिम सूची में नाम, दल और प्रतीक जांचें।'
            ],
            readinessCheck: {
              question: 'क्या आप मूल दस्तावेज और उत्तरों के साथ जांच के लिए तैयार हैं?',
              action: 'RO मार्गदर्शन',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'अंतिम मतपत्र जांच से बनता है।',
            impact: 'जांच मतदाताओं को अमान्य उम्मीदवारी से बचाती है।'
          },
          {
            id: 'candidate-campaign',
            label: 'प्रचार प्रोटोकॉल',
            description: 'कानून और MCC सीमा में प्रचार करें।',
            detailedExplanation: 'प्रचार को आदर्श आचार संहिता, अनुमति नियम, मौन अवधि, खर्च सीमा और प्रलोभन, धमकी, नफरत व सरकारी मशीनरी दुरुपयोग की रोक का पालन करना होता है।',
            illustration: 'campaign',
            requiredDocs: ['सभा अनुमति', 'वाहन और स्थल अनुमति', 'खर्च रजिस्टर', 'मीडिया प्रमाणन जहां जरूरी हो'],
            deadlines: 'मतदान से पहले वैधानिक मौन अवधि शुरू होने पर प्रचार समाप्त।',
            protocolSteps: [
              'रैली, वाहन, लाउडस्पीकर और स्थल की अनुमति लें।',
              'हर खर्च बिल और वाउचर के साथ दर्ज करें।',
              'प्रलोभन, धमकी, नफरत और गलत सूचना से बचें।',
              'मौन अवधि शुरू होते ही प्रचार रोकें।'
            ],
            readinessCheck: {
              question: 'क्या हर प्रचार कार्यक्रम अनुमत और दर्ज है?',
              action: 'MCC और खर्च',
              url: 'https://www.eci.gov.in/mcc/'
            },
            quote: 'समझाना लोकतांत्रिक है; दबाव नहीं।',
            impact: 'नैतिक प्रचार मतदाता की स्वतंत्रता बचाता है।'
          },
          {
            id: 'candidate-poll-count',
            label: 'मतदान और गिनती एजेंट',
            description: 'मतदान और गिनती का वैध अवलोकन करें।',
            detailedExplanation: 'उम्मीदवार एजेंट नियुक्त करते हैं जो मॉक पोल, सीलिंग, मतदान और मतदान समाप्ति देखते हैं। गिनती एजेंट गणना, तालिका और आपत्तियों को निर्धारित चैनल से देखते हैं।',
            illustration: 'counting',
            requiredDocs: ['एजेंट नियुक्ति फॉर्म', 'एजेंट ID', 'गिनती हॉल पास', 'खातों की प्रति'],
            deadlines: 'मतदान और गिनती से पहले अधिसूचित समय तक।',
            protocolSteps: [
              'एजेंटों को बूथ आचरण और गोपनीयता नियम सिखाएं।',
              'मॉक पोल और सील हस्ताक्षर का अवलोकन कराएं।',
              'औपचारिक आपत्ति मार्ग अपनाएं, मतदान बाधित न करें।',
              'गिनती में राउंडवार आंकड़ों की आधिकारिक शीट से तुलना करें।'
            ],
            readinessCheck: {
              question: 'क्या मतदान और गिनती एजेंट प्रशिक्षित और दस्तावेजित हैं?',
              action: 'गिनती प्रक्रिया',
              url: 'https://results.eci.gov.in/'
            },
            quote: 'अवलोकन भरोसा बढ़ाए, अव्यवस्था नहीं।',
            impact: 'सही एजेंट आचरण पारदर्शिता बढ़ाता है।'
          },
          {
            id: 'candidate-accounts',
            label: 'खर्च और खुलासा',
            description: 'चुनावी खर्च का अंतिम हिसाब दें।',
            detailedExplanation: 'चुनाव के बाद उम्मीदवार को निर्धारित अवधि में सही खर्च लेखा जमा करना और रिकॉर्ड सुरक्षित रखना होता है। उल्लंघन से कानूनी परिणाम हो सकते हैं।',
            illustration: 'report',
            requiredDocs: ['अंतिम खर्च रजिस्टर', 'बिल और वाउचर', 'बैंक विवरण', 'एजेंट प्रमाणित सारांश'],
            deadlines: 'परिणाम के बाद चुनाव के लिए निर्धारित वैधानिक अवधि में।',
            protocolSteps: [
              'दैनिक रजिस्टर, बैंक रिकॉर्ड और बिल मिलाएं।',
              'खर्च निगरानी नोटिसों का समाधान करें।',
              'निर्धारित प्रारूप में अंतिम खाते जमा करें।',
              'रिकॉर्ड निरीक्षण और भविष्य अनुपालन के लिए सुरक्षित रखें।'
            ],
            readinessCheck: {
              question: 'क्या सभी खर्च रिकॉर्ड मिलान होकर दाखिल करने को तैयार हैं?',
              action: 'खर्च मार्गदर्शन',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'जन विश्वास में जन लेखा भी शामिल है।',
            impact: 'पारदर्शी खाते चुनाव में धनबल घटाते हैं।'
          }
        ]
      },
      volunteer: {
        title: 'चुनाव कर्मी',
        description: 'बूथ तैयार करें, मतदान चलाएं, सामग्री सील करें और रिपोर्ट दें।',
        icon: 'PW',
        steps: [
          {
            id: 'worker-training',
            label: 'प्रशिक्षण और नियुक्ति',
            description: 'मतदान से पहले अपनी भूमिका सीखें।',
            detailedExplanation: 'चुनाव कर्मियों को प्रशिक्षण, Presiding Officer डायरी, पहचान प्रवाह, EVM/VVPAT, पहुंच सुविधा, फॉर्म, लिफाफे और आपातकालीन रिपोर्टिंग समझनी होती है।',
            illustration: 'training',
            requiredDocs: ['नियुक्ति पत्र', 'प्रशिक्षण पुस्तिका', 'ड्यूटी आदेश', 'संपर्क सूची'],
            deadlines: 'डिस्पैच दिवस से पहले प्रशिक्षण दौर।',
            protocolSteps: [
              'सभी प्रशिक्षण और EVM अभ्यास में भाग लें।',
              'ड्यूटी भूमिका, बूथ, डिस्पैच समय और परिवहन पुष्टि करें।',
              'फॉर्म, पैकेट और डायरी प्रविष्टियां पढ़ें।',
              'सेक्टर अधिकारी और RO संपर्क मार्ग सुरक्षित रखें।'
            ],
            readinessCheck: {
              question: 'क्या प्रशिक्षण पूरा और डिस्पैच विवरण पुष्टि है?',
              action: 'कर्मी मार्गदर्शन',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'प्रशिक्षित मतदान दल शांतिपूर्ण मतदान की रीढ़ है।',
            impact: 'अच्छी तैयारी देरी और प्रक्रियागत त्रुटियां रोकती है।'
          },
          {
            id: 'worker-dispatch',
            label: 'सामग्री डिस्पैच',
            description: 'हर मतदान सामग्री जांचें।',
            detailedExplanation: 'बूथ जाने से पहले दल EVM, VVPAT, सील, फॉर्म, मतदाता सूची, स्याही, स्टेशनरी और अन्य सामग्री प्राप्त करता है। हर वस्तु चेकलिस्ट से मिलानी चाहिए।',
            illustration: 'security',
            requiredDocs: ['सामग्री चेकलिस्ट', 'EVM/VVPAT ID', 'सील और टैग', 'मतदाता सूची प्रति'],
            deadlines: 'मतदान केंद्र रवाना होने से पहले डिस्पैच दिवस।',
            protocolSteps: [
              'EVM और VVPAT नंबर दस्तावेजों से मिलाएं।',
              'सील, टैग, फॉर्म, लिफाफे, स्याही और स्टेशनरी जांचें।',
              'कमी या गलत मिलान तुरंत रिपोर्ट करें।',
              'निर्धारित परिवहन और सुरक्षा से बूथ जाएं।'
            ],
            readinessCheck: {
              question: 'क्या रवाना होने से पहले हर सामग्री जांची गई है?',
              action: 'चेकलिस्ट देखें',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'कमी बूथ पर नहीं, डिस्पैच पर पकड़ी जानी चाहिए।',
            impact: 'सामग्री की शुद्धता मतदान की वैधता बचाती है।'
          },
          {
            id: 'worker-mock-poll',
            label: 'मॉक पोल और सीलिंग',
            description: 'वास्तविक मतदान से पहले मशीन सिद्ध करें।',
            detailedExplanation: 'वास्तविक मतदान से पहले Presiding Officer एजेंटों की उपस्थिति में मॉक पोल करता है, EVM परिणाम को VVPAT पर्चियों से मिलाता है, मॉक डेटा साफ करता है, पर्चियां सील करता है और मशीनें वास्तविक मतदान के लिए सील करता है।',
            illustration: 'evm',
            requiredDocs: ['मॉक पोल प्रमाणपत्र', 'मॉक पर्चियों का काला लिफाफा', 'पेपर सील', 'PO डायरी'],
            deadlines: 'वास्तविक मतदान शुरू होने से पहले।',
            protocolSteps: [
              'जहां एजेंट हों, उनकी उपस्थिति में मॉक पोल करें।',
              'परिणाम दिखाएं और VVPAT पर्चियों से मिलाएं।',
              'मॉक डेटा साफ करें और मॉक पर्चियां निकालें।',
              'सील लगाएं और प्रमाणपत्र व हस्ताक्षर दर्ज करें।'
            ],
            readinessCheck: {
              question: 'क्या आप मॉक पोल, क्लियर और सीलिंग क्रम पूरा कर सकते हैं?',
              action: 'EVM निर्देश',
              url: 'https://www.eci.gov.in/evm/'
            },
            quote: 'भरोसा दिखाने के बाद ही वास्तविक मतदान शुरू होता है।',
            impact: 'मॉक पोल मशीन की शुद्धता पर विश्वास बचाता है।'
          },
          {
            id: 'worker-live-poll',
            label: 'लाइव मतदान प्रबंधन',
            description: 'बूथ निष्पक्ष और सुगम चलाएं।',
            detailedExplanation: 'मतदान के दौरान दल पहचान, रजिस्टर, स्याही, कतार, गोपनीयता, सहायता नियम, challenged/tendered votes और घटना रिपोर्टिंग संभालता है।',
            illustration: 'polling',
            requiredDocs: ['चिह्नित मतदाता सूची', 'मतदाता रजिस्टर', 'अमिट स्याही', 'घटना फॉर्म'],
            deadlines: 'घोषित मतदान समय के दौरान।',
            protocolSteps: [
              'कतार, प्राथमिकता और गोपनीयता बनाए रखें।',
              'हर मतदाता को सूची और मान्य ID से सत्यापित करें।',
              'हस्ताक्षर/अंगूठा और स्याही सही दर्ज करें।',
              'मशीन समस्या, हिंसा, impersonation या शिकायत तुरंत बढ़ाएं।'
            ],
            readinessCheck: {
              question: 'क्या बूथ प्रवाह पूरी टीम को स्पष्ट है?',
              action: 'मतदान कर्तव्य',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'निष्पक्षता मतदान अधिकारी का संचालन सिद्धांत है।',
            impact: 'निष्पक्ष बूथ प्रबंधन हर पात्र मतदाता को गरिमा देता है।'
          },
          {
            id: 'worker-close-return',
            label: 'बंद, सील, वापसी',
            description: 'मतदान बंद कर सामग्री जमा करें।',
            detailedExplanation: 'मतदान समाप्ति पर Close बटन दबाया जाता है, EVM/VVPAT केस एजेंटों की उपस्थिति में सील होते हैं, वैधानिक दस्तावेज पूरे होते हैं और सामग्री सुरक्षा में रिसीविंग सेंटर जमा होती है।',
            illustration: 'report',
            requiredDocs: ['रिकॉर्ड किए गए मतों का लेखा', 'PO डायरी', 'सील EVM/VVPAT केस', 'पैकेट सूची'],
            deadlines: 'मतदान बंद होते ही और रिसीविंग सेंटर जमा से पहले।',
            protocolSteps: [
              'बंद समय पर कतार में मौजूद मतदाताओं को नियम अनुसार अनुमति दें।',
              'Close दबाएं और अंतिम मशीन विवरण दर्ज करें।',
              'मशीन, VVPAT और कागजात सील करें।',
              'सामग्री जमा कर रसीद लें।'
            ],
            readinessCheck: {
              question: 'क्या हर कागज, सील और मशीन का हिसाब है?',
              action: 'बंद प्रोटोकॉल',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'अंतिम सील पहले वोट जितनी महत्वपूर्ण है।',
            impact: 'सावधानीपूर्ण वापसी गिनती और भरोसा बचाती है।'
          }
        ]
      },
      observer: {
        title: 'पर्यवेक्षक',
        description: 'स्वतंत्र रूप से निगरानी, सत्यापन, एस्केलेशन और रिपोर्टिंग।',
        icon: 'OB',
        steps: [
          {
            id: 'observer-briefing',
            label: 'ब्रीफिंग और तैनाती',
            description: 'क्षेत्र और अधिकार समझें।',
            detailedExplanation: 'पर्यवेक्षक आयोग के स्वतंत्र मॉनिटर के रूप में तैनात होते हैं। सामान्य, पुलिस और खर्च पर्यवेक्षक व्यवस्था, कानून-व्यवस्था, शिकायत, खर्च निगरानी और संवेदनशील बूथ तैयारी देखते हैं।',
            illustration: 'training',
            requiredDocs: ['तैनाती आदेश', 'पर्यवेक्षक पुस्तिका', 'क्षेत्र मानचित्र', 'अधिकारी संपर्क सूची'],
            deadlines: 'निर्धारित क्षेत्र में आगमन से पहले।',
            protocolSteps: [
              'अधिकार, क्षेत्र प्रोफाइल और संवेदनशील स्थान पढ़ें।',
              'DEO, RO, पुलिस और खर्च टीम से संपर्क स्थापित करें।',
              'निर्देशानुसार संपर्क या बैठक समय प्रकाशित करें।',
              'आयोग के साथ रिपोर्टिंग क्रम तय करें।'
            ],
            readinessCheck: {
              question: 'क्या क्षेत्र, टीम मानचित्र और रिपोर्ट चैनल पुष्टि हैं?',
              action: 'Observer Portal',
              url: 'https://observerseci.eci.nic.in/'
            },
            quote: 'पर्यवेक्षक आयोग की फील्ड आश्वासन प्रणाली हैं।',
            impact: 'स्वतंत्र निगरानी जनता का भरोसा बढ़ाती है।'
          },
          {
            id: 'observer-prepoll',
            label: 'पूर्व-मतदान समीक्षा',
            description: 'मतदान से पहले तैयारी जांचें।',
            detailedExplanation: 'पर्यवेक्षक vulnerable क्षेत्र, critical booth, route chart, EVM randomization, strong room, training, accessibility और complaint response systems की जांच करते हैं।',
            illustration: 'security',
            requiredDocs: ['निरीक्षण नोट', 'रूट चार्ट', 'critical booth सूची', 'strong room चेकलिस्ट'],
            deadlines: 'आगमन से मतदान पूर्व संध्या तक।',
            protocolSteps: [
              'नमूना बूथ और संवेदनशील स्थान निरीक्षण करें।',
              'EVM/VVPAT randomization, storage और security देखें।',
              'training, accessibility, webcasting और communication plan जांचें।',
              'कमी मिलने पर DEO/RO से सुधार कराएं।'
            ],
            readinessCheck: {
              question: 'क्या critical स्थान और strong room समीक्षा हो गई है?',
              action: 'निरीक्षण चेकलिस्ट',
              url: 'https://www.eci.gov.in/'
            },
            quote: 'सबसे अच्छा हस्तक्षेप विफलता से पहले होता है।',
            impact: 'पूर्व समीक्षा व्यवधान रोकती है।'
          },
          {
            id: 'observer-campaign',
            label: 'प्रचार और खर्च निगरानी',
            description: 'MCC, शिकायत और धनबल पर नजर।',
            detailedExplanation: 'पर्यवेक्षक MCC enforcement, complaint disposal, cVIGIL cases, media certification, seizures और candidate expenditure records देखते हैं। खर्च पर्यवेक्षक registers और monitoring teams का निरीक्षण करते हैं।',
            illustration: 'campaign',
            requiredDocs: ['शिकायत रजिस्टर', 'cVIGIL मामले', 'उम्मीदवार खर्च रजिस्टर', 'seizure और media reports'],
            deadlines: 'अधिसूचना से प्रचार अवधि तक।',
            protocolSteps: [
              'शिकायत निपटान गुणवत्ता और समय देखें।',
              'खर्च निगरानी टीम और उम्मीदवार रजिस्टर जांचें।',
              'गंभीर MCC, धमकी, रिश्वत या hate speech escalate करें।',
              'निर्देश और follow-up closure दर्ज करें।'
            ],
            readinessCheck: {
              question: 'क्या शिकायत और खर्च रिकॉर्ड नियमित देखे जा रहे हैं?',
              action: 'cVIGIL Dashboard',
              url: 'https://cvigil.eci.gov.in/'
            },
            quote: 'निगरानी नियमों को जमीन पर सुरक्षा बनाती है।',
            impact: 'निगरानी दबाव और असमान प्रचार शक्ति घटाती है।'
          },
          {
            id: 'observer-poll-day',
            label: 'मतदान दिवस अवलोकन',
            description: 'मॉक पोल, मतदान और escalation देखें।',
            detailedExplanation: 'मतदान दिवस पर पर्यवेक्षक मॉक पोल, बूथ opening, queue, accessibility, incidents, replacement machines और vulnerable areas देखते हैं, पर routine polling duties अपने हाथ में नहीं लेते।',
            illustration: 'polling',
            requiredDocs: ['poll day route plan', 'incident log', 'sector officer updates', 'observer app reports'],
            deadlines: 'मॉक पोल से मतदान समाप्ति तक।',
            protocolSteps: [
              'priority बूथ जाएं और mock poll compliance देखें।',
              'queue, accessibility, secrecy और law and order देखें।',
              'घटनाओं को track करें और field officers से escalation कराएं।',
              'आधिकारिक माध्यम से समय पर observation reports भेजें।'
            ],
            readinessCheck: {
              question: 'क्या poll day route plan risk points पर केंद्रित है?',
              action: 'Observer Reporting',
              url: 'https://observerseci.eci.nic.in/'
            },
            quote: 'इतना देखें कि सच पता हो, हस्तक्षेप अधिकार से करें।',
            impact: 'संतुलित अवलोकन मतदान को शांत और वैध रखता है।'
          },
          {
            id: 'observer-counting',
            label: 'गिनती और अंतिम रिपोर्ट',
            description: 'गिनती देखें और रिपोर्ट बंद करें।',
            detailedExplanation: 'पर्यवेक्षक counting center security, table arrangement, candidate agent access, round-wise tabulation, VVPAT procedure, objections और declaration discipline देखते हैं।',
            illustration: 'counting',
            requiredDocs: ['counting center plan', 'round-wise result sheets', 'objection log', 'final observer report'],
            deadlines: 'गिनती दिवस से अंतिम रिपोर्ट जमा तक।',
            protocolSteps: [
              'counting center security और access control जांचें।',
              'round-wise tabulation और objection handling देखें।',
              'घोषणा पूर्ण वैधानिक प्रक्रिया के बाद हो यह सुनिश्चित करें।',
              'unresolved risks या recommendations के साथ final report दें।'
            ],
            readinessCheck: {
              question: 'क्या counting center पारदर्शी अवलोकन के लिए तैयार है?',
              action: 'Results Portal',
              url: 'https://results.eci.gov.in/'
            },
            quote: 'गिनती सही भी हो और सही दिखे भी।',
            impact: 'पारदर्शी गिनती चुनाव को वैधता के साथ बंद करती है।'
          }
        ]
      }
    }
  }
};
