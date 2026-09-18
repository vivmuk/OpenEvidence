// === WHAT'S NEW DATA (loaded by index.html) ===
// Cron jobs: append new items to the TOP of this array.
// Each item: { date, category, title, desc }
// The index page renders these dynamically — no need to edit index.html.

var whatsNewData = [
  {
    date: "September 18, 2026",
    updated: "Daily announcement check (Fri Sep 18, 4:50 AM ET) — Venice Augment Search (5 queries) + Grok X/Twitter search + openevidence.com/news scrape + PubMed eutils (30 results). arXiv API returned empty (retried). 1 NEW ANNOUNCEMENT: MSK + OpenEvidence precision oncology partnership (Sep 16) — OncoKB integration + Epic EHR. 6 new PubMed papers added to research.json (Fine-tuning/RAG/hybrid systematic review JMIR, HPB oncology LLM MDT comparison JMIR, DiagnosticXchange open-source clinical AI eval framework JAMIA, AI-assisted childhood cancer LTFU J Pediatr Hematol Oncol, Cross-site CDSS transfer Stud Health Technol Inform, Medical LLM history-taking Cureus). 5 new benchmark entries. Key finding: MSK partnership brings FDA-recognized OncoKB precision oncology knowledge base into OpenEvidence for all clinicians nationwide — first somatic cancer variant knowledge base with FDA recognition.",
    items: [
      {
        cat: "Partnership — Precision Oncology",
        title: "Memorial Sloan Kettering and OpenEvidence partner to advance precision oncology (Sep 16, 2026)",
        desc: "MSK and OpenEvidence announce partnership integrating OpenEvidence into MSK's Epic EHR workflow and bringing MSK's OncoKB — the first and only FDA-recognized somatic cancer variant knowledge base — directly into OpenEvidence for nationwide use. OncoKB expert knowledge paired with patient clinical context for point-of-care clinical decision support in complex oncology cases. OncoKB levels of evidence aligned with AMP/ASCO/CAP consensus. More than half of US hematologist-oncologists already use OpenEvidence. Debyani Chakravarty PhD (Lead Scientist, OncoKB): 'OpenEvidence will widen OncoKB's reach.' Anaeze Offodile MD (Chief Strategy Officer, MSK): 'Embedding trusted tools into clinical practice in ways that augment the expertise of our clinicians.' Travis Zack MD (CMO, OpenEvidence): 'Bringing MSK-curated interpretation of cancer genetics to physicians anywhere.' Samyukta Mullangi MD (VP Clinical Strategy, OpenEvidence): 'Democratizing the power of MSK's genomic curation.' First partnership to integrate an FDA-recognized cancer variant knowledge base into a clinical AI platform."
      },
      {
        cat: "Research — RAG Systematic Review",
        title: "JMIR systematic review: RAG improves guideline adherence 71%->92% in clinical decision support (Sep 17, 2026)",
        desc: "Patel et al. (Mayo Clinic) publish PRISMA systematic review of 35 studies (2024-2026) evaluating fine-tuning, RAG, and hybrid post-training strategies for clinical decision-making. RAG improved guideline adherence from 71.1% to 92.1% and diagnostic accuracy from 78.9% to 94.7%. Fine-tuning achieved AUC up to 0.912 for cancer detection. Hybrid systems exceeded 90% accuracy in complex workflows (stroke triage, dermatology, multimodal imaging, oncology). 25/35 studies judged high risk of bias. Directly relevant to OpenEvidence's RAG architecture."
      },
      {
        cat: "Research — Clinical AI Evaluation Framework",
        title: "DiagnosticXchange: open-source framework for multi-dimensional clinical AI evaluation (Sep 17, 2026)",
        desc: "Sorka et al. (Technion Israel) publish in JAMIA an open-source evaluation framework assessing clinical AI across accuracy, cost, time, invasiveness, physician effort, and safety behaviors. 8 LLMs on 216 peer-reviewed cases across 19 specialties (1728 sessions). Three systems achieved near-identical accuracy (93.5%-94.0%) yet differed 1.75x in cost and 2.1x in physician oversight. Safety analysis revealed premature diagnosis (9.3%), noncontributory invasive procedures (29.9%). Accuracy-only benchmarks are insufficient for safe clinical AI deployment."
      },
      {
        cat: "Research — LLM Stability in Oncology MDT",
        title: "LLM treatment recommendations show moderate concordance with MDT decisions in HPB oncology (Sep 17, 2026)",
        desc: "Jo et al. (CHA University) compared 4 LLMs (GPT-4o, GPT-5.2, Gemini 3 Pro, Claude Sonnet 4.5) on 107 hepatopancreatobiliary MDT cases. Concordance ranged 48.6%-72.9%. Response stability varied substantially (Gemini 3 Pro Fleiss kappa=0.737 vs GPT-4o kappa=0.430). Response stability must be systematically characterized before clinical integration."
      }
    ]
  },
  {
    date: "September 16, 2026",
    updated: "Daily announcement check (Wed Sep 16, 9:00 AM ET) — Venice Augment Search (5 queries) + Grok X/Twitter search + openevidence.com/announcements scrape + arXiv API (30 entries) + PubMed eutils (30 results). 1 NEW ANNOUNCEMENT: Penn Medicine global partnership (Sep 15) — 10,000+ clinicians, 7 hospitals, Botswana-UPenn Partnership for global health. 7 new research papers added to research.json (KnowBench ER benchmark, VeriDx diagnostic verification, non-institutional AI clinician survey, on-premise clinical AI agents Nature Medicine, prompt injection patient safety hazard, JMIR healthcare professional LLM attitudes survey, Doctorina primary care diagnostics evaluation). 1 new benchmark added to benchmarks.json (KnowBench). Key finding: Penn Medicine is first global health partnership for OpenEvidence, extending AI clinical decision support to low-resource settings via Botswana-UPenn Partnership.",
    items: [
      {
        cat: "Partnership — Health System + Global Health",
        title: "OpenEvidence and Penn Medicine partner for global clinical AI deployment (Sep 15, 2026)",
        desc: "OpenEvidence and Penn Medicine announce global partnership to bring AI-powered clinical decision support to 10,000+ clinicians across 7 hospitals in Pennsylvania and New Jersey. Partnership extends to low- and middle-income countries through the Botswana-UPenn Partnership (BUP) — 25-year academic health partnership in sub-Saharan Africa. Penn Medicine teams will co-design purpose-built tools for Botswana clinicians adapted to local resource constraints. Integration with Penn Pathways clinical decision support program and EHR. Penn Medicine: University of Pennsylvania Health System + Perelman School of Medicine, 49,000+ team members, ~500K emergency patients annually. Srinath Adusumalli (VP & Chief Health Information Officer) leads deployment. Travis Zack (CMO, OpenEvidence): 'The best available medical evidence should reach every clinician, not only those working inside the world's best resourced hospitals.' First global health partnership for OpenEvidence."
      },
      {
        cat: "Research — Clinical AI Benchmark",
        title: "KnowBench introduces Effort Reduction as unified clinical AI benchmark metric (Sep 14, 2026)",
        desc: "Knowtex introduces KnowBench, a deployment-grounded clinical AI benchmark measuring Effort Reduction (ER): proportion of AI-generated clinical work product accepted by clinicians under expert review. Initial measurement: 97.99% aggregate ER across 1M+ encounters, 13 specialties. Covers documentation, coding, orders, chart summarization, patient summaries, and clinical decision support. First benchmark to measure real-world clinician acceptance rather than reference-based similarity."
      },
      {
        cat: "Research — Clinical AI Safety",
        title: "Nature Medicine: On-premise medical AI agents for reliable clinical decision-making (Sep 15, 2026)",
        desc: "Zhang et al. (TU Dresden / Heidelberg) publish in Nature Medicine a fully on-premise clinical AI agent with multi-perspective reliability framework. 90.04% accuracy on 7-disease MIMIC-IV benchmark. Behavioral consistency strongest discriminator of diagnostic correctness (AUC=0.860). At 0.90 consistency threshold, 49.4% of cases retained at 98.9% accuracy — framework for selective autonomy in clinical AI deployment."
      },
      {
        cat: "Research — Clinical AI Security",
        title: "Prompt injection classified as patient safety hazard in clinical AI systems (Sep 15, 2026)",
        desc: "Waisberg & Guarnieri (Annals of Biomedical Engineering) argue prompt injection warrants classification as patient safety hazard, not technical curiosity. Medicine particularly exposed due to external content in clinical records. Improved prompting and input filtering insufficient — need provenance-aware context handling, restricted privileges, and adversarial testing. Directly relevant to OpenEvidence's own legal cases against Pathway Medical and Doximity for prompt injection attacks."
      },
      {
        cat: "Research — Physician AI Attitudes",
        title: "JMIR survey: 62.7% of healthcare professionals use or contemplate LLMs; decision support top application (Sep 15, 2026)",
        desc: "Rao et al. (Harvard Medical School / Mass General Brigham) survey 335 healthcare professionals. Literature review (73.4%) and decision support (57%) identified as most valuable LLM applications. 75.5% concerned about decision errors, 96.4% about bias. 65.4% prefer professional association regulation over tech companies (29%). 87.8% support professional guidelines; 66.6% have no confidence in existing oversight."
      }
    ]
  },

  {
    date: "September 13, 2026",
    updated: "Weekly update (Sun Sep 13, 5:00 PM ET) — Venice Augment Search (8 OE queries + 4 competitor/benchmark queries) + PubMed eutils (30 broad + 10 narrow) + openevidence.com/announcements scrape. arXiv API rate-limited (429) on 3 attempts — skipped this week. 4 new PubMed papers added to research.json (Living-OEP vs OpenEvidence oncology comparison, LLM citation reliability, AI discharge letters, CustomGPT ophthalmology curriculum). 2 new benchmark entries (Living-OEP head-to-head, LLM citation reliability). 3 new timeline entries (Cortico MedSafe-Dx safety benchmark Sep 9, Abridge Best in KLAS 2026 Sep 1, MINC partnership Sep 11 — already added Sep 12). 1 new partnership (MINC#NIMC — already added Sep 12). 1 new competitor (Cortico MedSafe-Dx). Key finding: Living-OEP agentic AI system outperformed OpenEvidence and 3 other AI chatbots on oncology evidence quality in head-to-head comparison.",
    items: [
      {
        cat: "Research — Oncology AI Head-to-Head",
        title: "Living-OEP agentic AI outperforms OpenEvidence and other chatbots on breast cancer evidence quality (Sep 1, 2026)",
        desc: "ESMO Real World Data study (PMID 42729682) compared a human-supervised AI-augmented living oncology evidence platform (Living-OEP, powered by GPT-4.1 + o3 + Claude Sonnet-4) against ChatGPT, Perplexity, Consensus, and OpenEvidence across 8 breast cancer treatment scenarios. Living-OEP provided more comprehensive and accurate evidence, linked all data to original publications and FDA labels. Agentic AI review accuracy 95.1-97.2%. First study to benchmark OpenEvidence against an agentic AI evidence platform in oncology."
      },
      {
        cat: "Research — LLM Citation Reliability",
        title: "ChatGPT-5.4 highest accuracy but highest citation fabrication rate in foot and ankle surgery (Sep 11, 2026)",
        desc: "Foot Ankle Orthop study (PMID 42732183) tested ChatGPT-5.4, Gemini-3, and Copilot on 192 foot and ankle surgery board questions. ChatGPT-5.4 achieved 89.6% accuracy but fabricated 22.9% of references. All models produced fabricated citations. Highlights persistent safety concern with LLM-generated references in clinical education and decision support."
      },
      {
        cat: "Benchmark — Clinical AI Safety",
        title: "Cortico launches MedSafe-Dx — open benchmark for clinical AI safety (Sep 9, 2026)",
        desc: "Vancouver-based Cortico launched MedSafe-Dx, a free open benchmark testing whether AI models can safely support clinical decisions. Evaluates escalation of urgent cases, avoidance of false reassurance, and appropriate uncertainty across 250 simulated patient cases. 11 frontier models evaluated. GPT-5.2 highest safety pass rate (97.6%) but over-escalated 71% of routine cases. Gemini 3 Pro highest diagnostic recall (87.2%) but lowest safety pass rate (62.4%). Public code, dataset, and medRxiv preprint. Live leaderboard expanded to 12 models from 6 AI labs."
      },
      {
        cat: "Competitor — Abridge",
        title: "Abridge wins #1 Best in KLAS 2026 for Ambient AI (second consecutive year, Sep 1, 2026)",
        desc: "Abridge earns No. 1 Best in KLAS 2026 ranking for Ambient AI in Revenue Cycle category for the second year. Based on independent customer feedback from largest enterprise healthcare systems. At $5.3B valuation with 300+ health systems, 200+ specialties, 28 languages. Nvidia and Eli Lilly strategic investment. Direct convergence with OpenEvidence on evidence and payer connectivity."
      }
    ]
  },

  {
    date: "September 12, 2026",
    updated: "Daily announcement check (Sat Sep 12, 9:00 AM ET) — Venice Augment Search (5 queries) + Grok X/Twitter search + openevidence.com/announcements scrape + arXiv API (30 entries). 1 new timeline entry: MINC#NIMC Canadian physician verification partnership (Sep 11). All 30 arXiv results already in research.json.",
    items: [
      {
        cat: "Partnership — Canadian Physician Verification",
        title: "OpenEvidence and MINC#NIMC partner to ensure free access for Canadian physicians (Sep 11, 2026)",
        desc: "OpenEvidence and the Medical Identification Number for Canada Corporation (MINC#NIMC) announce a partnership to streamline physician verification for Canada and support continued free access for verified Canadian clinicians. MINC is the trusted physician identification system used by 95%+ of Canadian physicians. Partnership strengthens physician identity checks for Canadian users and streamlines clinician access to the platform. First Canadian physician verification partnership."
      }
    ]
  },

  {
    date: "September 6, 2026",
    updated: "Weekly update (Sun Sep 6, 5:00 PM ET) — Venice Augment Search (15 queries) + arXiv API (50 entries) + PubMed eutils (30 broad + 30 narrow) + openevidence.com/announcements. 7 new PubMed papers added to research.json. 2 new benchmark entries. 8 new timeline entries. AMSSM partnership added. All 50 arXiv results already in research.json. Key findings: OpenEvidence $300M annualized revenue (Becker's/The Information Jul 17). STAT benchmark trust article (Jul 29). FDA GenAI device discussion paper (Aug 15). ARISE MAST benchmark launch. Pacific AI testing report. Clinical readiness claims article (Sep 6).",
    items: [
      {
        cat: "Funding — Revenue Milestone",
        title: "OpenEvidence annualized revenue hits $300M (Jul 2026)",
        desc: "Sacra estimates OpenEvidence hit $300M annualized revenue in July 2026, doubling from $150M at end of 2025. The Information reports OpenEvidence weighed $200M raise at $20B valuation but is unlikely to proceed. Acquisition talks with a large technology company also reported."
      },
      {
        cat: "Media — Benchmark Trust Debate",
        title: "STAT examines whether doctors can trust clinical AI benchmarks (Jul 29)",
        desc: "STAT News Katie Palmer reports on conflicting benchmark studies. NYU Langone Nature Medicine study found frontier LLMs beat specialized tools. Real-POCQi preprint using OE's own queries found OpenEvidence ahead. Article explores why two rigorous 2026 studies reached opposite conclusions and what it means for clinical AI trust."
      },
      {
        cat: "Research — 7 New PubMed Papers",
        title: "Weekly PubMed sweep adds 7 new papers to research.json",
        desc: "AER ventral hernia retromuscular repair (PMID 42543136, J Gastrointest Surg). LLM adverse event detection in immunotherapy trials (PMID 42690663, JAMA Netw Open). LLM CAR-T adverse event extraction (PMID 42658846, PLOS Digit Health). LLM clinical data modality decomposition (PMID 42700364, JAMIA). LLM fetal CNS MRI diagnostic reasoning (PMID 42700049, Medicine). ChatGPT diagnostic assessment teaching RCT (PMID 42700004, Medicine). LLM ultrasound report error detection (PMID 42701163, Insights Imaging)."
      },
      {
        cat: "Regulatory — FDA GenAI Devices",
        title: "FDA issues discussion paper on GenAI-enabled medical devices (Aug 15)",
        desc: "FDA seeks public feedback by Oct 19 2026 on risk assessment, premarket evaluation, and postmarket monitoring for generative AI-enabled medical devices. Proposes competency-based assessment inspired by physician training. Covers foundation models and agentic AI systems. Impacts all clinical AI tools."
      },
      {
        cat: "Research — ARISE MAST Benchmark",
        title: "ARISE launches MAST benchmark suite for clinical AI safety",
        desc: "Stanford-Harvard ARISE Network launches Medical AI Superintelligence Test (MAST). Evaluates clinical AI systems for safety, accuracy, and reliability across medical domains. Highest-scoring system did not reach 63%. Clinician-focused ranking includes medical-specialized models."
      },
      {
        cat: "Research — Clinical Readiness Claims",
        title: "Academic analysis calls for trustworthy clinical readiness claims from benchmark scores (Sep 6)",
        desc: "Peer-reviewed analysis argues medical AI benchmark scores do not reliably predict clinical readiness. Calls for standardized reporting guidelines, regulatory oversight, and benchmark validation frameworks. Highlights gap between controlled test performance and real-world deployment."
      },
      {
        cat: "Partnership — AMSSM",
        title: "American Medical Society for Sports Medicine partners with OpenEvidence (Aug 27)",
        desc: "Exclusive collaboration to co-develop AI-powered educational resources on sports medicine for both patients and clinicians. Brings AMSSM sports medicine physician expertise to the OpenEvidence platform."
      }
    ]
  },
  {
    date: "September 5, 2026",
    updated: "Weekly update (Sat Sep 5, 6:20 AM ET) — Venice Augment Search (15 queries) + arXiv API (50 entries) + PubMed eUtils (30 broad + 20 narrow) + openevidence.com/announcements scrape. 7 new PubMed papers added to research.json. 6 new benchmark entries. 12 new timeline entries. All 50 arXiv results already in research.json.",
    items: [
      {
        cat: "OE Product — Model Family Launch",
        title: "OpenEvidence Model Family: Osler, Sackett, Snow, and Darwin (Sep 3, 2026)",
        desc: "OpenEvidence releases a new family of medical AI models named for founders of modern medicine. Osler (~5s) becomes the new default model. Sackett (~30s) is a deeper interactive search model. Snow (~5m) succeeds Deep Consult with full parallel literature investigation. Darwin — the most advanced medical AI model in the world — is in research preview: first AI to score perfect 100% on MedQA, also leading MedXpertQA (72.8%), HealthBench Professional (82.7%), and NOHARM (87.2%). Free to all verified clinicians on web, iOS, and Android."
      },
      {
        cat: "Research — Reference Quality Audit",
        title: "OpenEvidence reference quality validated across five medical specialties (PMID 42686938, npj Health Systems)",
        desc: "Lotan et al. evaluated all 4,979 citations from 150 standardized prompts across five specialties. Zero fabricated references. Only 3 attribution errors. Most references recent and high-impact. First systematic reference-quality audit of OpenEvidence confirms RAG architecture integrity."
      },
      {
        cat: "Research — Triage Safety",
        title: "OpenEvidence errs on the safe side in structured triage benchmark (PMID 42673790, Int J Med Inform)",
        desc: "Jia et al. tested 60 clinician-authored vignettes using the identical benchmark that found ChatGPT Health under-triaged 51.6% of emergencies. OpenEvidence demonstrated a conservative safety profile, erring on the safe side. Physician-facing RAG architecture produced safer triage than consumer chatbots."
      },
      {
        cat: "Research — Randomized Vignette Study",
        title: "Physicians rate OpenEvidence e-consultation advice 4.2-4.7/5 in randomized trial (PMID 42690592, J Gen Intern Med)",
        desc: "Desjardins et al. randomized 44 internal medicine faculty to receive advice labeled as human- or AI-generated. OE advice rated highly across all domains. Management adoption jumped from 37.5% to 81.8% (OR 8.43). Source labeling had no significant effect — physicians trusted the content regardless."
      },
      {
        cat: "Research — OE vs ChatGPT in Spine Care",
        title: "OpenEvidence 2.0 outperforms ChatGPT-4o on citation validity in spine guideline queries (PMID 42674131, Spine J)",
        desc: "Avrumova et al. conducted the first head-to-head comparison using cervical spine clinical guideline queries. OE superior on citation validity with verified peer-reviewed literature. ChatGPT generated fabricated references. Evaluated guideline alignment, sourcing, and prompt-engineering effects."
      },
      {
        cat: "Research — Four-Way LLM Comparison in Orthopaedics",
        title: "OpenEvidence tops four-LLM comparison on MIRCT surgical recommendations (PMID 42692242, J Shoulder Elbow Surg)",
        desc: "Vauclin et al. tested 61 MIRCT Delphi consensus scenarios across OE, ChatGPT-4o, Gemini, and DeepSeek (976 recommendations). OE achieved highest concordance with expert consensus (65-69%). All LLMs fell short of expert-level decision-making."
      },
      {
        cat: "Competitor — ChatGPT Health Epic Integration",
        title: "ChatGPT Health adds Epic EHR integration for clinicians (Sep 1, 2026)",
        desc: "TechCrunch reports ChatGPT Health now integrates with Epic EHR, enabling clinicians to access appointment notes, lab results, medications, and specialist documentation. Direct competitor to OpenEvidence's Epic integration. Free for verified US physicians, NPs, PAs, and pharmacists."
      },
      {
        cat: "Competitor — Doximity AI Surge",
        title: "Doximity stock surges 52.7% as CEO cites AI search profitability (Aug 7, 2026)",
        desc: "Doximity CEO says each AI search generates 10x its cost in revenue. Q1 beat estimates, raised FY2027 guidance. 150+ health systems implemented. Doximity Ask topped NOHARM safety benchmark. Direct competitor to OpenEvidence's ad-supported model."
      }
    ]
  },

  {
    date: "September 5, 2026",
    updated: "Daily announcement check (Sat Sep 5, 5:28 AM ET) — Venice Augment Search (5 queries) + Grok X/Twitter search + openevidence.com/announcements + arXiv API (30 entries). 1 new timeline entry: OpenEvidence Model Family launch (Sep 3). 3 new arXiv papers added to research.json.",
    items: [
      {
        cat: "OE Product Launch — Model Family",
        title: "OpenEvidence Model Family Launched: Osler, Sackett, Snow, and Darwin (Sep 3, 2026)",
        desc: "OpenEvidence releases a new family of medical AI models named for founders of modern medicine. Osler (~5s) becomes the new default model for point-of-care answers. Sackett (~30s) is a deeper search model that interactively asks clinicians for context. Snow (~5m) succeeds Deep Consult with full parallel literature investigation. Darwin — the most advanced medical AI model in the world — is in research preview (application only): first AI to score perfect 100% on MedQA, also leading MedXpertQA (72.8%), HealthBench Professional (82.7%), and NOHARM (87.2%). Available to institutional partners like NORD and accredited researchers as safeguards are validated. Osler, Sackett, and Snow are free to all verified clinicians on web, iOS, and Android."
      },
      {
        cat: "Research — Clinical AI Safety Framework",
        title: "AI Morbidity and Mortality: First structured framework for clinical AI failure review (Aug 31, arXiv 2609.00076)",
        desc: "Mui, Sittig, Labkoff, Basu propose AI M&M — a blameless, case-based review framework for clinical AI failures. Four-axis classification (Trigger-Mechanism-Clinical Pathway-Corrective Action) with tool-in-loop attribution. Two clinician reviewers reached agreement on all 20 axis-level classifications across 5 outpatient CDS cases. Complements model monitoring and patient safety reporting for institutional learning. Added to research.json."
      },
      {
        cat: "Research — Guideline-Grounded RAG CDS",
        title: "DIASENTINEL: Auditable multi-agent RAG system for diabetes risk screening (Aug 31, arXiv 2608.31128)",
        desc: "Shueh et al. present a fully on-premise multi-agent system for T2DM risk screening from EHRs, integrating Reciprocal Rank Fusion over ADA guidelines with hybrid rule-based + LLM entailment verification. Provides cited recommendations with audit trail. Directly relevant to OE-class RAG architecture patterns. Added to research.json."
      },
      {
        cat: "Research — Medical LLM Reliability",
        title: "Decodability criterion predicts when hidden-state selection beats majority voting in medical LLMs (Aug 17, arXiv 2608.17124)",
        desc: "Wang, Hong, Bagci introduce CASE (Correctness-Axis Selection) and decodability — a leakage-free measure predicting whether learned selection outperforms majority voting. CASE improves medical LLM accuracy by up to 19 points on medium-difficulty questions. Practical criterion for medical LLM deployment reliability. Added to research.json."
      }
    ]
  },

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
