// === WHAT'S NEW DATA (loaded by index.html) ===
// Cron jobs: append new items to the TOP of this array.
// Each item: { date, category, title, desc }
// The index page renders these dynamically — no need to edit index.html.

var whatsNewData = [
  {
    date: "August 23, 2026",
    updated: "Manual research update (Sun Aug 23, 9:16 AM ET) — ClinicalTrials.gov registry record verified via API.",
    items: [
      {
        cat: "Research — First Registered Clinical Trial of OpenEvidence",
        title: "NCT07199231: Cambridge Health Alliance study compares OpenEvidence vs ChatGPT, Claude & Gemini in real clinical practice",
        desc: "First clinical trial registration evaluating OpenEvidence safety and comparative efficacy. Observational prospective cohort at CHA (Harvard/Tufts-affiliated safety-net system, Boston): 20 residents (family medicine, internal medicine, psychiatry) use OpenEvidence during real patient care, cross-checking every query against gold-standard references (PubMed/UpToDate). Attending-physician SMEs (5+ yrs post-training) rate clinical appropriateness on a 10-point Likert scale with ICC inter-rater checks; Part 2 rates OpenEvidence vs ChatGPT/Gemini/Claude outputs on accuracy, completeness, and bias. Key detail: OpenEvidence is blacklisted from CHA network services pending study results — an evidence-gated adoption model. Primary completion July 30, 2026; study completion est. Sept 30, 2026. PI/Responsible party: Hannah Galvin, Chief Health Information Officer, CHA."
      }
    ]
  },
  {
    date: "August 21, 2026",
    updated: "Daily announcement check (Fri Aug 21, 9:00 AM ET) — Venice Augment Search + scrape. 2 missing timeline entries found and added: Patient Take-Homes (Aug 19) and Springer Nature content agreement (Aug 5). No new arXiv papers (all 30 results already in research.json).",
    items: [
      {
        cat: "OE Product Launch — Patient Communication",
        title: "OpenEvidence Launches Patient Take-Homes (Aug 19, 2026)",
        desc: "New fully optional feature lets physicians convert OpenEvidence answers into curated patient handouts. Physicians control what gets shared — evidence-based medical information delivered at physician's discretion. Extends OE from clinician-only tool toward physician-mediated patient education, a new product category for clinical AI platforms."
      },
      {
        cat: "OE Partnership — Publisher Content",
        title: "Springer Nature and OpenEvidence Announce Content Agreement (Aug 5, 2026)",
        desc: "Subscription agreement brings peer-reviewed content from Springer Nature's portfolio (Nature, Nature Medicine, and 3,000+ journals) into OpenEvidence. Part of Springer Nature's ARC3 AI-ready content licensing framework. Ensures author attribution and source linking. Adds to existing publisher partnerships with NEJM, JAMA, Wiley, and Cochrane."
      }
    ]
  },
  {
    date: "August 19, 2026",
    updated: "Global CDS weekly sweep (Tue Aug 19, 9:18 AM ET) — web_search unavailable on this lane; update built from data/research.json cache (9 fresh arxiv/PubMed papers Aug 11-17) and prior dashboard state.",
    items: [
      {
        cat: "Benchmarking / RAG vs Frontier LLMs",
        title: "VITA corpus-specific clinical RAG matches or beats newer frontier LLMs on HealthBench (Aug 12, arXiv 2608.12138)",
        desc: "Reddy et al. publish VITA: V1 ranked #1 on HealthBench with 51.9% rubric points vs GPT-5.4 (46.1%), o4-mini (44.3%), Gemini 3.1 Pro (42.6%), Claude Sonnet 4.6 (37.3%). Head-to-head with newer frontier models (GPT-5.5, Claude Opus 4.8, Gemini 3.5 Pro, Grok 4.3) under neutral DeepSeek-V4-Pro judging: VITA and GPT-5.5 statistically indistinguishable on mean per-question score; VITA led on points-weighted score. Tradeoff explicit: corpus specificity improves grounding at the cost of lower communication scores. Reflects OE's corpus-anchored RAG design philosophy and adds external validation against the OpenAI/Anthropic/Google camps."
      },
      {
        cat: "Benchmarking / Medical VQA",
        title: "CARE: Confidence-Aware Reasoning for Reliable Medical VQA (Aug 11, arXiv 2608.10964)",
        desc: "Du et al. (multi-institution) introduce CARE: dual-stage pipeline (Medical-CoT SFT cold-start + GRPO with Confidence-Aware Reward). Reports best diagnostic accuracy, lowest Expected Calibration Error, and lowest hallucination rate across 3 medical VQA benchmarks. Frames CARE as a foundation for trustworthy clinical decision support. Code at github.com/anotherbricki/CARE. Directly relevant to physician-AI teaming at point of care and to OE-class citation-first CDS calibration."
      },
      {
        cat: "Benchmarking / SOTA on HealthBench-Hard",
        title: "ConRub-Med: consensus-rubric RL for open-ended medical QA ranks #1 on 6/9 benchmarks (Aug 11, arXiv 2608.10996)",
        desc: "Zhu et al. propose consensus-rubric reinforcement learning: 3 LMs propose criteria, reviewer retains only cross-supported ones. Three-state scoring (correct coverage, missing info, incorrect claims with negative credit). Scores 38.98 ± 1.04 on HealthBench-Hard vs InfiMed-ORBIT 33.60 (8k samples) and 37.30 (28k). New SOTA on medical and generalization averages. Indicates that purpose-built RLHF-style training for medical QA is closing the frontier-LLM gap on rubric-grounded evaluation."
      },
      {
        cat: "Evidence Base Integrity — Cautionary",
        title: "89% of open-access biomedical papers show LLM-assisted writing by end of 2025 (Aug 11, arXiv 2608.10715)",
        desc: "Holzwarth et al. introduce an unbiased estimator based on changing word frequencies. Findings: 89% of open-access biomedical papers show excess LLM-associated vocabulary by end of 2025; Discussion sections 68% LLM-usage vs Methods 32%, but >50% LLM-usage in Methods overall. Pertinent to OE-class evidence-based medicine platforms: if nearly the entire biomedical corpus now contains LLM-influenced text, RAG systems, citation integrity auditing, and EvidenceGrade-style strength-of-evidence grading become more (not less) important downstream."
      },
      {
        cat: "Safety / Ethics Framework",
        title: "ETHOS: modular ethics framework for clinical multi-agent AI systems (Aug 15, arXiv 2608.15424)",
        desc: "Sharma, Pugh, Beeche et al. (Penn, submitted to PSB 2027) publish ETHOS — a practical, modular ethics governance framework for clinical multi-agent AI. Targeted squarely at supervisory gaps in agentic CDS rollouts like UpDoc, DeepConsult, and Visits. As 2026 OE-class platforms move from Q&A to in-visit and post-visit agentic execution, external governance frameworks become procurement-relevant for hospital AI committees."
      },
      {
        cat: "Safety / Demographic Bias",
        title: "Demographic Injection under DEI prompts: novel medical-LLM safety failure mode (Aug 15, arXiv 2608.15254)",
        desc: "Mardian & Liu run a 47-model × 4-benchmark audit and identify a previously unnamed safety failure mode: when demographic descriptors are injected under DEI/marginalized-group framings, medical LLM outputs degrade in clinically meaningful directions. Adds to the bias landscape (cf. Aug 8 Tessler et al. sociodemographic dizziness study) and argues for both adversarial demographic testing and explicit DEI-prompt hygiene in clinical LLM evaluation."
      },
      {
        cat: "CDSS Methodology — ICU Reinforcement Learning",
        title: "Offline RL for ICU sepsis hemodynamic management with MIMIC-IV dual off-policy evaluation (Aug 17, arXiv 2608.16482)",
        desc: "Pérez-Roig, Fernández-Narro, and Sáez (cs.AI) publish offline RL for sepsis hemodynamic management on MIMIC-IV with dual off-policy evaluation — meaningfully advances RL-based CDSS rigor and indicates that 2026 academic CDSS work is increasingly evidence-validated on public ICU datasets rather than vendor-private data."
      },
      {
        cat: "CDSS Methodology — Multimodal RL",
        title: "Removing temporal note redundancy improves multimodal RL for medicine (Aug 14, arXiv 2608.14157)",
        desc: "Weng, Lee, Mahendra, and Aswani show that pruning temporal redundancy in clinical notes lifts multimodal RL CDSS performance. Argues for both simpler note preprocessing and richer multimodal training in next-gen clinical decision-support pipelines."
      }
    ]
  },
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
