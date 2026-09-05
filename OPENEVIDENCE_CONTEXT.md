# OpenEvidence — Agent Context File

> **Purpose:** Single-file agent-ingestible snapshot of OpenEvidence's product, partnerships, competitive landscape, adoption metrics, and feature history. Any AI agent can download this from the site and use it to answer questions, update dashboards, or brief users without crawling the entire website.
>
> **Last updated:** August 19, 2026
> **Maintained by:** Automated cron jobs (daily announcement check + weekly research sweep)
> **Source repo:** https://github.com/vivmuk/OpenEvidence.git

---

## 1. Company Overview

**OpenEvidence** is America's most widely used AI-powered medical knowledge and clinical decision support platform. Founded in 2021 in Miami, FL. Free for NPI-verified U.S. physicians, nurse practitioners, and physician associates.

- **CEO:** Daniel Nadler
- **CMO:** Travis Zack, MD
- **SVP Clinical Informatics:** Mondira Ray, MD MBI
- **SVP Medical AI:** Samuel Finlayson, MD PhD
- **HQ:** Miami, FL
- **Employees:** ~100 (approximately 30 engineers)

### Funding History
| Round | Date | Amount | Valuation | Lead Investors |
|-------|------|--------|-----------|----------------|
| Series A | Feb 2025 | — | $750M | Sequoia Capital |
| Series B | Jul 2025 | $210M | $3.5B | GV (Google Ventures), Kleiner Perkins |
| Series C | Oct 2025 | $200M | $6B | — |
| Series D | Jan 2026 | $250M | $12B | Thrive Capital, DST Global |

**Total funding:** ~$700M (trailing 12 months as of Jan 2026)
**Additional investors:** Nvidia, Craft Ventures, Coatue, Blackstone, ICONIQ, Mayo Clinic, Henry (Amaro acquisition)

### Revenue Model
- Free for verified clinicians
- Pharma advertising platform (acquired Amaro, Sep 2025) — ~$150M/yr annualized revenue
- 90% gross margin
- Enterprise health system deployments

---

## 2. Adoption Metrics

| Metric | Value | Date | Source |
|--------|-------|------|--------|
| Registered physicians | 757,000+ | Jan 2026 | Press releases |
| Verified U.S. clinicians | 860,000+ | Jun 2026 | openevidence.com |
| U.S. physicians using daily | 50%+ of practicing physicians | Mar 2026 | PRNewswire |
| Monthly consultations | 20M+ | Jan 2026 | Healthcare.digital |
| Daily consultations (peak) | 1M (Mar 10, 2026) | Mar 2026 | PRNewswire |
| Hospitals/medical centers | 10,000+ | 2025 | Sacra |
| Health system deployments | 4 (Sutter, Mount Sinai, Cedars-Sinai, NYP) | Jul 2026 | Healthcare IT News |
| Americans receiving care from OE-using physicians | 100M+ | 2025 | Press releases |
| Voice Mode access | 860,000 clinicians | May 2026 | PYMNTS |
| EchoNext cardiology AI access | 500,000 physicians | Jun 2026 | BusinessWire |

**Milestones:**
- First AI to score >90% on USMLE (Jun 2023)
- First AI to score 100% on USMLE (Aug 2025)
- First AI platform to reach 1M clinical consultations in a single day (Mar 10, 2026)
- First FDA-cleared AI tool (EchoNext) integrated into platform (Jun 23, 2026)

---

## 3. Complete Feature List (Chronological)

### 2023 — Founding & Core Platform
| Date | Feature | Description |
|------|---------|-------------|
| Jan 2023 | **Clinical Search Engine** | AI-powered clinical Q&A with cited, peer-reviewed evidence. Free for verified U.S. physicians. |
| Jun 2023 | **USMLE 90% Score** | First AI to score over 90% on USMLE — 77% fewer errors than ChatGPT. |
| Nov 2023 | **Journal Partnerships (30+)** | Elsevier ClinicalKey AI, Wiley, NEJM, JAMA Network, Cochrane, NCCN, ACC, ADA, AAFP, ACEP, ACOG, AUA, AAO, ASCO, AAN, NORD, GINA, JOMI + more. |

### 2024 — Platform Maturity
| Date | Feature | Description |
|------|---------|-------------|
| Dec 2024 | **OpenEvidence 2.0** | Major platform upgrade. Strengthened grounding in verifiable, peer-reviewed sources. Transition from focused clinical-question tool to broader evidence platform. |

### 2025 — Product Expansion
| Date | Feature | Description |
|------|---------|-------------|
| Jul 2025 | **DeepConsult** | First AI agent purpose-built for physicians. Uses reasoning models to cross-reference hundreds of peer-reviewed studies. 100x compute of standard search. Agentic research. |
| Aug 2025 | **Visits (AI Scribe)** | Ambient clinical documentation. Transcribes patient encounters, generates structured notes enriched with evidence-based guidelines. Competes with Abridge, Ambience, Microsoft Dragon. |
| Aug 2025 | **USMLE 100% Perfect Score** | First AI in history to score perfect 100% on USMLE. |
| Sep 2025 | **Amaro Acquisition (Ad Platform)** | Acquired GV-backed AI-native advertising company. Forms backbone of pharma ad platform reaching 760K+ verified physicians. |
| Oct 2025 | **Microsoft Dragon Copilot Integration** | OpenEvidence integrated across Microsoft clinical applications, starting with Dragon Copilot ambient platform. |
| Dec 2025 | **Voices (Note Formatting)** | Customizable note formatting styles within Visits documentation workflow. |
| Dec 2025 | **Doctor Dialer (Limited Release)** | HIPAA-secure dialer for doctor-patient communication. Multi-step AI for call documentation and real-time clinical decision support. 37M minutes powered. |

### 2026 — Rapid Expansion
| Date | Feature | Description |
|------|---------|-------------|
| Feb 6, 2026 | **Clinical Trial Matching** | Automatically surfaces active/recruiting clinical trials and compares inclusion criteria against patient characteristics. Location filtering and distance display. |
| Feb 11, 2026 | **EHR Integration (Epic)** | OpenEvidence embedded into Epic EHR workflows. Physicians access evidence-based answers without leaving EHR. Deployed at Sutter Health, Mount Sinai, Cedars-Sinai, NYP. |
| Feb 26, 2026 | **Doctor Dialer (Wide Release)** | Adds messaging, faxing, and voicemail. Unifies patient communication, clinical decision support, and documentation. Competes with Doximity. |
| Mar 1, 2026 | **Cochrane Partnership** | Cochrane systematic reviews, figures, tables, multimedia integrated into platform. |
| Mar 10, 2026 | **1M Consultations/Day Milestone** | First time in history — 1M clinical consultations between NPI-verified physicians and AI in 24 hours. 30M monthly. |
| Mar 24, 2026 | **Coding Intelligence** | Automates medical coding — ICD-10, E/M, CPT suggestions inline. RVU values. Medicare MPPR optimization. Revenue-cycle management in clinical workflow. |
| Apr 2, 2026 | **Tandem Partnership** | Streamlines evidence-based prescribing and prior auth directly within platform. |
| Apr 7, 2026 | **Dotflows** | AI-native customization — reusable natural language prompts. Community library. Type '.' to invoke custom workflows (.discharge, .prior_auth, .avs, .fmla). |
| May 4, 2026 | **ACOG Partnership** | American College of Obstetricians & Gynecologists integrates evidence-based clinical guidance into OpenEvidence for ob-gyn care. |
| May 5, 2026 | **GINA Partnership** | Global Initiative for Asthma delivers asthma strategy to physicians worldwide via OpenEvidence. |
| May 11, 2026 | **SSO Partnership** | Society of Surgical Oncology strategic partnership + SSO Innovator Grant. |
| May 20, 2026 | **Cedars-Sinai Patient-Aware AI** | Patient-aware clinical intelligence with agentic clinical AI. EHR-tailored queries incorporating patient-specific data. |
| May 21, 2026 | **Voice Mode** | First speech-to-speech medical AI. Hands-free spoken Q&A for clinicians. 860K clinicians get voice access. |
| May 27, 2026 | **ASCO Guidelines Integration** | ASCO guidelines, figures, and flowcharts integrated into specialty oncology model. |
| Jun 9, 2026 | **AAO Partnership** | American Academy of Ophthalmology partners to close gap between evidence and eye care. |
| Jun 22, 2026 | **OpenEvidence 2.0 (2026)** | Major capability expansion: administrative and clinical workflows, in-platform calculators, enhanced primary-evidence modules. Evolution from Q&A tool to enterprise clinical-AI suite. |
| Jun 23, 2026 | **SNO Partnership** | Society for Neuro-Oncology (3,000+ members, 60 countries) designates OpenEvidence as official generative AI partner. |
| Jun 23, 2026 | **Pathway Labs EchoNext (FDA-cleared AI)** | First FDA-cleared AI tool integrated into OpenEvidence. EchoNext detects structural heart disease from ECGs. Free to any doctor on the platform. |
| Jun 25, 2026 | **JOMI Partnership (Surgical Videos)** | Journal of Medical Insight brings 357 peer-reviewed surgical videos to platform. First video evidence collaboration. |
| Jul 8, 2026 | **AC Forum Partnership** | Anticoagulation Forum partners to expand AI-enabled guidance in antithrombotic care. |
| Jul 9, 2026 | **NewYork-Presbyterian / Columbia / Weill Cornell** | Enterprise deployment across all NYP hospitals and care sites in Greater New York. |
| Jul 10, 2026 | **EvidenceGrade** | Real-time evidence quality grading. Grades and visualizes strength of cited evidence behind every AI answer. Builds on GRADE framework (Cochrane, WHO). |
| Jul 13, 2026 | **Mount Sinai Enterprise-Wide** | Enterprise-wide deployment across 7 hospitals. First deployment to extend access to ALL care team members (physicians, nurses, pharmacists, therapists). Epic EHR integrated. |
| Jul 15, 2026 | **AAP Partnership (Pediatrics)** | American Academy of Pediatrics (67,000 members) integrates pediatric clinical guidance into platform. |
| Jul 16, 2026 | **Boston Children's Hospital Collaboration** | Multi-year collaboration to study AI use at point of care and care delivery patterns. EHR integration. First pediatric research collaboration. |
| Jul 20, 2026 | **NOHARM Study Result** | Stanford-Harvard ARISE study: physicians chose OpenEvidence in 22.3% of free-choice responses — more than every other external AI chatbot combined (19.8%). 45 LLMs + 4 clinical AI evaluated, 12,747 expert annotations. |
| Jul 23, 2026 | **LA County Department of Public Health** | First public health department partnership. Brings LA County public health guidance, alerts, and resources into OpenEvidence for clinicians. |
| Jul 28, 2026 | **Education Platform (CE & MOC Credits)** | Accredited interprofessional CE and MOC credits for NPI-verified physicians, NPs, and PAs. AKH Inc. as accredited provider. Jointly accredited by ACCME, ACPE, and ANCC. |
| Aug 5, 2026 | **Springer Nature Partnership** | Peer-reviewed content from Springer Nature (Nature, Nature Medicine, 180+ years of publications) integrated into platform. |
| Aug 6, 2026 | **OneOncology Partnership** | AI-enabled, evidence-grounded clinical decision support brought to one of the largest US community oncology networks. |
| Aug 19, 2026 | **Patient Take-Homes** | Fully optional feature for sharing curated clinical evidence with patients. Converts OpenEvidence answers into patient handouts. Physicians can optionally share appropriate, high-quality, evidence-based medical information with patients. Fully curated and controlled by the physician. Dedicated site at takehome.openevidence.com. |
| Aug 10, 2026 | **OpenEvidence Games (MedMini & Synapses)** | Suite of medical puzzle games for clinicians. MedMini (daily medical mini crossword) and Synapses (daily diagnostic reasoning puzzle). Live in Discover on web and app. |

---

## 4. Complete Partnership List

### Content / Journal Partners
- **NEJM** (Feb 2025)
- **JAMA Network** (11 journals, Jun 2025)
- **Elsevier / ClinicalKey AI** (Nov 2023)
- **Wiley** (Mar 2026)
- **Cochrane** (Mar 2026)
- **NCCN** (Cancer Guidelines, Nov 2025)
- **ASCO** (Oncology Guidelines, May 2026)
- **Springer Nature** (Nature, Nature Medicine — Aug 2026)
- **JOMI** (Surgical Videos, Jun 2026)

### Medical Society Partners
- **ACC** (Cardiology)
- **ADA** (Diabetes)
- **AAFP** (Family Physicians)
- **ACOG** (OB/GYN, May 2026)
- **ACEP** (Emergency Physicians, Dec 2025)
- **NORD** (Rare Diseases, Mar 2026)
- **AAOS** (Orthopaedic Surgeons)
- **AAO** (Ophthalmology, Jun 2026)
- **AAO-HNS** (Otolaryngology, Mar 2026)
- **AUA** (Urology)
- **AMA** (Medical Association)
- **GINA** (Asthma, May 2026)
- **SSO** (Surgical Oncology, May 2026)
- **SNO** (Neuro-Oncology, Jun 2026)
- **ASAM** (Addiction Medicine)
- **AAP** (Pediatrics, Jul 2026)
- **AC Forum** (Antithrombotic Care, Jul 2026)
- **WMS** (Wilderness Medicine)
- **IPMDS** (Postconcussive Symptoms)

### Health System Deployments
- **Sutter Health** (Feb 2026) — First Epic EHR integration
- **Mount Sinai** (Mar 2026, enterprise-wide Jul 2026) — 7 hospitals, all care team members
- **Cedars-Sinai** (May 2026) — Patient-aware AI with agentic clinical AI
- **NewYork-Presbyterian / Columbia / Weill Cornell** (Jul 2026) — NYC + Westchester
- **Boston Children's Hospital** (Jul 2026) — Research collaboration, EHR integration
- **OneOncology** (Aug 2026) — Community oncology network

### Public Health
- **LA County Department of Public Health** (Jul 2026) — First public health department partnership

### Technology Partners
- **Microsoft** (Dragon Copilot integration, Oct 2025)
- **Tandem** (Prescriptions & Prior Auth, Apr 2026)
- **Pathway Labs** (FDA-cleared EchoNext AI, Jun 2026)
- **Veeva Systems** (Commercial partnership)
- **Nvidia** (Investor + Compute)
- **Google Cloud** (Backend)
- **Baseten** (AI Inference)
- **Vercel** (Frontend Hosting)

### Acquired
- **Amaro** (Sep 2025) — GV-backed AI-native advertising company → pharma ad platform

---

## 5. Competitive Landscape

| Competitor | Type | Key Stats | Threat Level |
|------------|------|-----------|--------------|
| **Doximity (NYSE: DOCS)** | Public, $8.75B market cap | $620M TTM revenue, 2M+ members (85% US MDs), NOHARM #1 (Jul 2026) | BIGGEST THREAT |
| **ChatGPT for Clinicians** | OpenAI, launched Apr 2026 | GPT-5.4, free for verified, CME credits, 40M daily health queries | DIRECT COMPETITOR |
| **UpToDate / Wolters Kluwer** | Public (EURONEXT: WKL) | Founded 1992, 2M global clinicians, 180 countries, $579/yr | INCUMBENT |
| **Abridge** | Private, $5.3B | 300+ health systems, 200+ specialties, 28 languages, Best in KLAS 2025 & 2026 | CONVERGING |
| **Ambience Healthcare** | Private | 80% utilization, $13K/yr revenue/clinician, 200+ specialties | ADJACENT |
| **Microsoft Dragon Copilot** | Microsoft | $19.7B Nuance acquisition, deep Epic integration | ADJACENT |
| **Google MedGemma** | Alphabet, open weights | 4B + 27B sizes, 128K context, MedQA 64.4%, HuggingFace | FOUNDATION MODEL |
| **UpDoc** | Private, FDA-cleared Jun 2026 | First FDA-cleared agentic clinical AI, chronic disease mgmt | NEW COMPETITOR |
| **Pathway Medical** | Acquired by Doximity ($63M) | Sued by OpenEvidence for prompt injection | ACQUIRED |
| **Glass Health** | Pivoted/Acquired | Now Glass Medical AI — oncology drug development | PIVOTED |

### Key Competitive Dynamics
- **OpenEvidence vs Doximity:** Doximity topped NOHARM safety benchmark (Jul 2026). OpenEvidence won the "revealed preference" arm — physicians chose it 22.3% vs 19.8% for all other external AI combined. Doximity has PeerCheck (11,000+ physician reviewers). OpenEvidence has EvidenceGrade (real-time evidence grading). Lawsuit ongoing (trade secret theft/prompt injection).
- **OpenEvidence vs UpToDate:** OpenEvidence is free; UpToDate charges $579/yr. UpToDate Expert AI leads on total aggregate benchmark score (71/100). OpenEvidence leads on internet search volume (98.7% of all searches among AI-enabled clinical reference tools). Different use cases — UpToDate for curated depth, OpenEvidence for speed and breadth.
- **OpenEvidence vs ChatGPT for Clinicians:** OpenAI's clinical workspace launched Apr 2026. Free for verified clinicians. 40M daily health queries on ChatGPT. GPT-5.4 outperformed OpenEvidence on MedQA and HealthBench in Nature Medicine study (Jun 2026). But lacks EHR integration and specialty content partnerships.
- **Nature Medicine Controversy (Jun 2026):** Study showed GPT-5.2, Gemini 3.1 Pro, Claude Opus 4.6 outperformed OpenEvidence and UpToDate Expert AI on medical benchmarks. OpenEvidence demanded retraction, alleging undisclosed conflicts of interest. OpenEvidence backed a counter-study (Real-POCQi, Jul 2026) showing OE outperformed frontier LLMs on real-world clinical questions.

---

## 6. Research & Benchmarks

### Key Benchmark Studies
- **NOHARM (Stanford-Harvard ARISE, Jul 2026):** 45 LLMs + 4 clinical AI, 12,747 expert annotations. OpenEvidence most-used in physician free-choice (22.3%). Doximity topped safety.
- **Nature Medicine (Jun 2026):** GPT-5.2, Gemini 3.1 Pro, Claude Opus 4.6 outperformed OpenEvidence and UpToDate Expert AI on MedQA, HealthBench, real clinical queries.
- **Real-POCQi (arXiv, Jul 2026):** 149 physicians, specialty-matched comparisons. OpenEvidence outperformed Claude, Gemini, GPT-5.5 on real-world clinical questions.
- **USMLE (Aug 2025):** OpenEvidence first AI to score perfect 100%.

### Research Tracker
- 37+ arXiv papers tracked (cs.AI, cs.CL, cs.CY)
- 24+ benchmark studies tracked
- Data files: `/data/research.json` (119+ items), `/data/benchmarks.json`

---

## 7. Data Endpoints for Agents

### JSON Endpoints (served by server.js)
- `/data/timeline.json` — chronological event log
- `/data/publications.json` — academic publications
- `/data/benchmarks.json` — clinical AI benchmark studies
- `/data/competitors.json` — competitor landscape
- `/data/partnerships.json` — partnership tracker
- `/data/metrics.json` — adoption metrics over time
- `/data/global_landscape.json` — global CDS events
- `/data/research.json` — consolidated research (PubMed + arXiv + Semantic Scholar)

### CSV Endpoints
- `/data/timeline.csv`, `/data/publications.csv`, `/data/competitors.csv`, `/data/partnerships.csv`, `/data/metrics.csv`, `/data/global_landscape.csv`

### JavaScript Data Files (in repo)
- `data/timeline.js` — timelineData array
- `data/oeFeatures.js` — oeFeaturesData array (complete feature list with icons, dates, descriptions)
- `data/partners.js` — partnersData array
- `data/competitors.js` — competitorsData array
- `data/whatsNew.js` — whatsNewData array (current banner items)
- `data/globalTimeline.js`, `data/globalRegions.js`, `data/regulatory.js`, `data/emergingTrends.js`, `data/globalMatrix.js`

### This File
- `/OPENEVIDENCE_CONTEXT.md` — this comprehensive agent context file

### Progressive Disclosure Entry Point
- `/SKILL.md` — start here if you are an AI agent. It tells you what to read first, what to load only when needed, and how to avoid context overload.

---

## 8. Website Structure

Single-page Express app deployed on Railway (https://oe.up.railway.app).

### Pages
- `/` — Main dashboard (overview, charts, What's New)
- `/timeline` — Full chronological timeline
- `/funding` — Funding history and valuation
- `/products` — Product features
- `/features` — Feature card grid
- `/competitors` — Competitive landscape
- `/partnerships` — Partnership tracker
- `/tech` — Technology stack
- `/pharma` — Pharma advertising
- `/benchmarks` — Benchmark studies
- `/publications` — Academic publications
- `/sct` — Stanford-Harvard NOHARM study deep dive
- `/doximity` — Doximity competitor analysis
- `/global` — Global CDS landscape
- `/future` — Future outlook
- `/sources` — All sources

### Tech Stack
- Backend: Node.js/Express (server.js)
- Frontend: Vanilla HTML/CSS/JS (single-page app)
- Charts: Custom makeChart() in shared.js
- Styling: shared.css (38KB)
- Hosting: Railway (oe.up.railway.app)
- Git: https://github.com/vivmuk/OpenEvidence.git (branch: main)

---

## 9. Notes for Agents

1. **Timeline is descending** (newest first) in all data files.
2. **QC filter:** Research results are filtered for relevance to clinical AI decision support. Non-relevant results (imaging-only, bioinformatics, surgical robotics) are discarded.
3. **No fabrication policy:** If web search is unavailable, do NOT invent data. Skip gracefully.
4. **NOHARM benchmark:** User explicitly said NOT to run the noharm benchmark for OE site. A weekly cron job did it anyway once (Jul 19). Check cron prompts for unwanted behaviors.
5. **Venice API:** Use `POST /api/v1/augment/search` for web search and `venice_parameters.enable_x_search: true` with `grok-4-20` model for X/Twitter search. Do NOT use DuckDuckGo (CAPTCHA blocks).
6. **File edits:** Use `exec` for edits to files outside the workspace sandbox (the OE repo is at `/home/vivgates/OpenEvidence/`).
7. **Git push:** `cd /home/vivgates/OpenEvidence && git add -A && git commit -m '<message>' && git push origin main`
8. **llms.txt** at the root lists all data endpoints — this file complements it with structured content for direct ingestion.

---

*This file is automatically maintained. To update, edit the data files in the repo and re-push. The cron jobs will keep it current as new features and partnerships are discovered.*
