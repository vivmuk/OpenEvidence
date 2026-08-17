// === WHAT'S NEW DATA (loaded by index.html) ===
// Cron jobs: append new items to the TOP of this array.
// Each item: { date, category, title, desc }
// The index page renders these dynamically — no need to edit index.html.

var whatsNewData = [
  {
    date: "August 16, 2026",
    updated: "Daily announcement check (Sat Aug 15, 10:54 PM ET)",
    items: [
      {
        cat: "Benchmarking / Meta-Analysis",
        title: "EClinicalMedicine publishes largest AI cardiovascular RCT meta-analysis — 31 trials, 1.69M patients (Aug 6, PMID 42602970)",
        desc: "Ong et al. (Imperial / Oxford / King's College London) publish the most comprehensive systematic review and meta-analysis of AI in cardiovascular care to date: 31 RCTs across 13 regions (n=1,685,717 patients). Image-based AI-CDSS reduces MACE (RR 0.74, 95% CI 0.58-0.96; I²=0); AI-mobile health interventions reduce systolic BP by 3.18 mmHg; AI-enhanced ECG does not significantly improve heart failure detection (RR 1.22, I²=90%). 71% of trials reported significant AI benefit, but almost all on intermediate process endpoints rather than hard outcomes; GRADE certainty remains low-to-very-low across outcomes. Pivotal Lancet-family evidence for regulators, payers, and hospital procurement."
      },
      {
        cat: "OE Product Launch — Gamification",
        title: "OpenEvidence Games Launched — MedMini and Synapses (Aug 10, 2026)",
        desc: "OpenEvidence launches OpenEvidence Games — a new suite of puzzles built for clinicians, live now in Discover on web and in the OpenEvidence app. The lineup starts with two games: MedMini and Synapses, bringing gamified medical knowledge reinforcement to hundreds of thousands of verified clinicians. Extends the platform beyond clinical decision support into medical education and engagement."
      },
      {
        cat: "OE Product Launch — Telemedicine",
        title: "OpenEvidence Doctor Dialer wide-release — AI-integrated telemedicine",
        desc: "Wide-release of AI-integrated Doctor Dialer for privacy-centric, doctor-patient telemedicine with clinical decision AI deeply integrated. Adds messaging, faxing, and voicemail. Telemedicine wedge competes with Doximity Dialer, Amwell, K Health (PatientGPT), and EHR vendor virtual-care modules. Together with Visits, extends OE toward full-stack synchronous care."
      },
      {
        cat: "Benchmarking / Safety Audit",
        title: "Nature Medicine publishes SIM-VAIL chatbot safety audit — 9 frontier LLMs, 810 conversations (Aug 7, PMID 42567928)",
        desc: "Weilnhammer et al. publish SIM-VAIL (simulated vulnerability-amplifying interaction loops) framework. 810 conversations across 9 frontier consumer chatbots and 30 simulated psychiatric profiles scored across 13 clinically-grounded risk dimensions. Concerning behavior widespread but reduced in newer models. First clinically-validated cross-vendor consumer chatbot safety audit — explicitly applicable to evaluating ChatGPT Health and Copilot Health."
      },
      {
        cat: "Implementation Framework",
        title: "PACT framework for clinical AI continuity-of-care (Npj Health Syst, Aug 5, PMID 42552388)",
        desc: "Khairat and Safran (UNC + Harvard Medical School) publish PACT: Patient-centered, AI-enabled Continuity and Timely action. Reframes clinical AI as a health-system function spanning pre-visit, visit, and post-visit care with explicit ownership, communication, confirmation, escalation, and outcome measures."
      },
      {
        cat: "Cautionary — Hospital AI Discontinued",
        title: "JMIR: Singapore tertiary hospital chatbot discontinued due to sociotechnical misalignment (Aug 1, PMID 42573583)",
        desc: "Yeow et al. publish single-hospital case study of ChatAI deployment at a large Singapore government tertiary hospital. Misalignments across goals, people, processes, technology, infrastructure led to eventual discontinuation despite initial implementation efforts. Cautionary evidence that successful launch ≠ sustained adoption."
      }
    ]
  }
];
