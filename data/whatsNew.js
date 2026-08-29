// === WHAT'S NEW DATA (loaded by index.html) ===
// Cron jobs: append new items to the TOP of this array.
// Each item: { date, category, title, desc }
// The index page renders these dynamically — no need to edit index.html.

var whatsNewData = [
  {
    date: "August 29, 2026",
    updated: "Daily announcement check (Sat Aug 29, 9:00 AM ET) — Venice Augment Search (5 queries) + Grok X/Twitter search + openevidence.com/announcements scrape + arXiv API (30 entries). 1 new timeline entry: Daniel Nadler TIME100 AI 2026 (Aug 27). All 30 arXiv results already in research.json.",
    items: [
      {
        cat: "Milestone — TIME100 AI Recognition",
        title: "Daniel Nadler Named to TIME100 AI 2026 (Aug 27, 2026)",
        desc: "OpenEvidence founder and CEO Daniel Nadler named to TIME's TIME100 AI 2026 list of the world's most influential people in artificial intelligence. TIME profile quotes Nadler: 'Over 300 million Americans will be treated by a doctor using OpenEvidence to help make a treatment decision.' Companion recognition to his 2025 TIME100 Health inclusion. GV (Google Ventures) congratulates Nadler on X alongside other AI leaders. Added to Timeline as Milestone entry."
      }
    ]
  },

  {
    date: "August 27, 2026",
    updated: "Daily announcement check (Thu Aug 27, 9:00 AM ET) — Venice Augment Search (5 queries) + Grok X/Twitter search + openevidence.com/announcements scrape + arXiv API (30 entries). 1 new timeline entry: Zeke Emanuel MS NOW mention (Aug 26). All 30 arXiv results already in research.json (132 papers).",
    items: [
      {
        cat: "Media — National TV Mention",
        title: "Zeke Emanuel on MS NOW: 'Two-thirds of doctors regularly consult OpenEvidence' (Aug 26, 2026)",
        desc: "Dr. Ezekiel Emanuel (former Obama health policy advisor, VP University of Pennsylvania) mentions OpenEvidence on MS NOW (MSNBC), citing two-thirds physician adoption. @OpenEvidence highlights the quote on X. Same day, physician @gruntdoc posts a clinical thread using OpenEvidence for STD treatment info, calling it 'astonishingly useful.' Added to Timeline as Media entry."
      }
    ]
  },
  {
    date: "August 23, 2026",
    updated: "Weekly sweep verification pass (Sun Aug 23, 5:15 PM ET) — arXiv API (50 entries) and PubMed re-checked; 3 new OpenEvidence-relevant PubMed papers ingested. No new announcements since Aug 19.",
    items: [
      {
        cat: "Research — OpenEvidence as Formal Research Instrument",
        title: "J Gastrointest Surg 'Augmented Evidence Review' series uses OpenEvidence as an AI evidence stream (PMIDs 42508724, 42586233)",
        desc: "Two papers (Cleveland Clinic Jul 27; Ohio State Aug 12) introduce the AER framework — registry data + surgeon social-media poll + OpenEvidence literature synthesis as three independent evidence streams. OE output corroborated registry findings in both; institutionalizes OE as an evidence-synthesis instrument in peer-reviewed surgical research methodology. Added to Publications, Research and Timeline."
      },
      {
        cat: "Research — Clinical AI Policy Agenda",
        title: "ACNP study group: five priority themes for responsible AI in mental health care (NPP Digit Psychiatry, Aug 20, PMID 42624890)",
        desc: "Paulus, Torous, Perlis et al. argue clinical AI's barriers are now infrastructural, not computational; name clinician-facing augmentation and structured decision-support pipelines as the most immediate scalable impact, and call for rigorous safety evaluation of patient-facing AI (esp. suicide risk). Added to Publications, Research and Timeline."
      },
      {
        cat: "QC Notes",
        title: "arXiv: 6 candidates screened out; PubMed: 10 tangential hits discarded",
        desc: "arXiv feed had 6 untracked papers — all QC-excluded (general LLM methodology, medical coding, imaging segmentation, governance-taxonomy, pathology indexing). PubMed broad query returned Krumholz JACC editorials and pure-clinical reviews that mention AI only tangentially — skipped per QC policy. All 50 arXiv API results otherwise already tracked."
      }
    ]
  },
  {
    date: "August 23, 2026",
    updated: "Weekly research sweep (Sun Aug 23, 5:00 PM ET) — arXiv API + PubMed + announcements-page audit. Daily checks had already ingested all Jul 10–Aug 19 announcements into timeline.js; this sweep backfilled the CSVs and added new research.",
    items: [
      {
        cat: "Research — New Head-to-Head: Dental AI Treatment Planning",
        title: "OpenEvidence tops 4-way dental AI evaluation (J Prosthodont, Aug 21, PMID 42629964)",
        desc: "10 prosthodontic cases × 4 AI systems (OpenEvidence, ChatGPT-5, Gemini 2.5, Copilot) scored by 4 calibrated specialists against consensus reference (κ=0.74). OpenEvidence highest mean score 7.7±1.4, edging ChatGPT-5 (7.6±1.1); Gemini 5.1; Copilot 4.7 (failed 3/10 cases to content filtering). Clinically significant diagnostic errors across ALL systems — authors recommend adjunctive use with specialist oversight. Added to Publications, Research and Benchmarks."
      },
      {
        cat: "Research — AI Patient Education vs Expert Author",
        title: "LLMs beat expert-authored patient education for vocal cord dysfunction (World J Otorhinolaryngol HNS, Aug 17, PMID 42609726)",
        desc: "45 providers ranked OpenEvidence vs ChatGPT-5 Extended Thinking vs a fellowship-trained laryngologist on 4 common VCD patient questions. AI preferred over the expert response for definition, diagnosis and treatment questions (all Friedman p≤0.001); ChatGPT-5 ET best overall (3/4 first-choice), OpenEvidence comparable on the definition question. Added to Publications, Research and Benchmarks."
      },
      {
        cat: "Data Backfill — Timeline & Partnership CSVs",
        title: "CSV event log synchronized with Jul 8 – Aug 19 announcements; gyn-onc RAG benchmark added",
        desc: "timeline.csv: added Patient Take-Homes (Aug 19), OpenEvidence Games/MedMini/Synapses (Aug 10), Springer Nature agreement (Aug 5), LA County DPH partnership (Jul 23), Anticoagulation Forum partnership (Jul 8) + 2 research rows. partnerships.csv: added Anticoagulation Forum, LA County DPH, Springer Nature rows. benchmarks.json: added Gynecologic Oncology pre-integration benchmark (PMID 42462288 — NCCN-anchored GPT-5 RAG beat baseline GPT-5 and OpenEvidence, which lacked NCCN access during the study window) and hormonal-contraception LLM consultation study (PMID 42513458). No new arXiv papers — all 50 API results already tracked or out of QC scope."
      }
    ]
  },
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
