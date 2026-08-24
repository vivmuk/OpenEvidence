// OpenEvidence Publishers — full dataset of content partners whose data powers OpenEvidence
// Compiled Aug 24, 2026 from openevidence.com/announcements, PRNewswire, ACC/NCCN/AAP press, Wikipedia
// Categories: publisher | society | research | network | publichealth | backbone

const PUBLISHERS = [
  // ── Landmark journal publishers ──────────────────────────────
  { id:'nejm', name:'NEJM Group', org:'Massachusetts Medical Society', cat:'journal', date:'2025-02-19', dateLabel:'Feb 19, 2025',
    scope:'NEJM · NEJM Evidence · NEJM AI · NEJM Catalyst · NEJM Journal Watch — all content and multimedia from 1990 forward',
    desc:'First landmark content agreement, announced alongside OpenEvidence\u2019s $1B Sequoia-led round. Multi-year deal covering the world\u2019s most-cited medical journal.',
    logo:'logos/publishers/nejm.png', domain:'nejm.org',
    src:'https://www.prnewswire.com/news-releases/openevidence-achieves-1-billion-valuation-in-sequoia-led-round-and-announces-content-partnership-with-the-new-england-journal-of-medicine-302380960.html' },

  { id:'jama', name:'JAMA Network', org:'American Medical Association', cat:'journal', date:'2025-06-05', dateLabel:'Jun 5, 2025',
    scope:'JAMA · JAMA Network Open · 11 specialty journals',
    desc:'Multi-year strategic content agreement with the JAMA Network — 13 peer-reviewed journals covering every medical specialty.',
    logo:'logos/publishers/jama.png', domain:'jamanetwork.com',
    src:'https://www.prnewswire.com/news-releases/openevidence-and-the-jama-network-sign-strategic-content-agreement-302473690.html' },

  { id:'springernature', name:'Springer Nature', org:'Nature portfolio + Springer imprints', cat:'publisher', date:'2026-08-05', dateLabel:'Aug 5, 2026',
    scope:'Nature and the full Springer Nature peer-reviewed portfolio, via the ARC3 AI-ready content licensing framework',
    desc:'Subscription agreement effective Aug 4, 2026. One of the first deals licensed under Springer Nature\u2019s ARC3 (\u201cAI-Ready Content\u201d) framework for responsible AI training.',
    logo:'logos/publishers/springernature.png', domain:'springernature.com',
    src:'https://www.openevidence.com/announcements/springer-nature-and-openevidence-announce-agreement-to-maximise-exposure-of-trusted-findings-on-openevidence-platform' },

  { id:'wiley', name:'Wiley', org:'NYSE: WLY', cat:'publisher', date:'2026-03-03', dateLabel:'Mar 3, 2026',
    scope:'Hundreds of Wiley-published society journals across medicine — expanded twice since launch (Cochrane, neurology)',
    desc:'Partnership to deliver trusted research to physicians at the point of care. Expanded Apr 16, 2026 with four neurological societies\u2019 journals.',
    logo:'logos/publishers/wiley.png', domain:'wiley.com',
    src:'https://www.openevidence.com/announcements/wiley-and-openevidence-partner-to-deliver-trusted-research-to-physicians-at-the-point-of-care' },

  { id:'cochrane', name:'Cochrane', org:'The Cochrane Collaboration', cat:'research', date:'2026-03-03', dateLabel:'Mar 3, 2026',
    scope:'Cochrane Library systematic reviews — the gold standard of evidence synthesis',
    desc:'Cochrane\u2019s systematic reviews joined OpenEvidence as part of the Wiley agreement.',
    logo:'logos/publishers/cochrane.png', domain:'cochranelibrary.com',
    src:'https://www.openevidence.com/announcements/wiley-and-openevidence-partner-to-deliver-trusted-research-to-physicians-at-the-point-of-care' },

  // ── Neurology societies (via Wiley expansion, Apr 16, 2026) ───
  { id:'ana', name:'American Neurological Association', org:'via Wiley', cat:'society', date:'2026-04-16', dateLabel:'Apr 16, 2026',
    scope:'Annals of Neurology · Annals of Clinical and Translational Neurology',
    desc:'One of four neurological societies whose journals joined OpenEvidence through the Wiley agreement.',
    logo:null, mono:'ANA', monoColor:'#1F4E79', domain:'aneuro.org',
    src:'https://www.openevidence.com/announcements/openevidence-expands-neurology-coverage-with-four-neurological-societies-now-participating-in-the-wiley-openevidence-agreement' },

  { id:'ean', name:'European Academy of Neurology', org:'via Wiley', cat:'society', date:'2026-04-16', dateLabel:'Apr 16, 2026',
    scope:'European Journal of Neurology',
    desc:'One of four neurological societies in the Wiley expansion — bringing European neurology research to the point of care.',
    logo:'logos/publishers/ean.png', domain:'ean.org',
    src:'https://www.openevidence.com/announcements/openevidence-expands-neurology-coverage-with-four-neurological-societies-now-participating-in-the-wiley-openevidence-agreement' },

  { id:'ilae', name:'International League Against Epilepsy', org:'via Wiley', cat:'society', date:'2026-04-16', dateLabel:'Apr 16, 2026',
    scope:'Epilepsia · Epileptic Disorders · Epilepsia Open',
    desc:'Three epilepsy journals joined via the Wiley agreement as new disease classifications reshaped epilepsy practice.',
    logo:'logos/publishers/ilae.png', domain:'ilae.org',
    src:'https://www.openevidence.com/announcements/openevidence-expands-neurology-coverage-with-four-neurological-societies-now-participating-in-the-wiley-openevidence-agreement' },

  { id:'mds', name:'Intl. Parkinson & Movement Disorder Society', org:'via Wiley', cat:'society', date:'2026-04-16', dateLabel:'Apr 16, 2026',
    scope:'Movement Disorders · Movement Disorders Clinical Practice',
    desc:'The fourth neurology society in the Wiley expansion — eight neurology titles in total across the four societies.',
    logo:null, mono:'MDS', monoColor:'#7A1F2B', domain:'movementdisorders.org',
    src:'https://www.openevidence.com/announcements/openevidence-expands-neurology-coverage-with-four-neurological-societies-now-participating-in-the-wiley-openevidence-agreement' },

  // ── Specialty societies & colleges ───────────────────────────
  { id:'acc', name:'American College of Cardiology', org:'ACC', cat:'society', date:'2025-11-07', dateLabel:'Nov 7, 2025',
    scope:'ACC cardiovascular clinical guidance, expert consensus and research',
    desc:'Strategic partnership to advance AI-enabled, evidence-based cardiovascular care at the point of care.',
    logo:'logos/publishers/acc.png', domain:'acc.org',
    src:'https://www.acc.org/About-ACC/Press-Releases/2025-11-07/17/25/American-College-of-Cardiology-OpenEvidence-to-Advance-AI-Enabled-Evidence-Based-Cardiovascular-Care' },

  { id:'nccn', name:'NCCN', org:'National Comprehensive Cancer Network', cat:'society', date:'2025-11-05', dateLabel:'Nov 5, 2025',
    scope:'NCCN Clinical Practice Guidelines in Oncology · JNCCN · Treatment Algorithms (added Apr 2026)',
    desc:'Licensing agreement for NCCN\u2019s oncology guidelines — expanded Apr 27, 2026 with canonical treatment algorithms at the point of care.',
    logo:'logos/publishers/nccn.png', domain:'nccn.org',
    src:'https://www.openevidence.com/announcements/nccn-and-openevidence-collaborate-to-bring-clinical-oncology-guidelines-to-medical-ai' },

  { id:'asco', name:'ASCO', org:'American Society of Clinical Oncology', cat:'society', date:'2026-05-01', dateLabel:'May 2026',
    scope:'ASCO clinical practice guidelines for oncology',
    desc:'ASCO guideline integration deepened OpenEvidence\u2019s oncology focus alongside NCCN and SSO content.',
    logo:'logos/publishers/asco.png', domain:'asco.org',
    src:'https://www.tipranks.com/news/private-companies/openevidence-deepens-oncology-focus-with-asco-guideline-integration-and-expanding-clinical-partnerships' },

  { id:'acep', name:'ACEP', org:'American College of Emergency Physicians', cat:'society', date:'2025-12-11', dateLabel:'Dec 11, 2025',
    scope:'Emergency medicine clinical guidance and policy content',
    desc:'Partnership bringing emergency-medicine evidence to OpenEvidence.',
    logo:'logos/publishers/acep.png', domain:'acep.org',
    src:'https://www.openevidence.com/announcements/acep' },

  { id:'acog', name:'ACOG', org:'American College of Obstetricians and Gynecologists', cat:'society', date:'2026-05-04', dateLabel:'May 4, 2026',
    scope:'ACOG evidence-based clinical guidance for ob-gyn and women\u2019s health',
    desc:'Strategic collaboration to advance ob-gyn health care with ACOG\u2019s full clinical guidance.',
    logo:'logos/publishers/acog.png', domain:'acog.org',
    src:'https://www.openevidence.com/announcements/openevidence-and-acog-announce-strategic-collaboration-to-advance-ob-gyn-health-care' },

  { id:'aap', name:'American Academy of Pediatrics', org:'AAP', cat:'society', date:'2026-07-15', dateLabel:'Jul 15, 2026',
    scope:'Pediatrics · Hospital Pediatrics · Pediatrics in Review · Red Book · Pediatric Dermatology · Bright Futures',
    desc:'Strategic collaboration integrating AAP policies, recommendations and pediatric research with citations to original sources.',
    logo:'logos/publishers/aap.png', domain:'aap.org',
    src:'https://www.openevidence.com/announcements/american-academy-of-pediatrics-and-openevidence-announce-collaboration-to-improve-pediatric-care' },

  { id:'aaohns', name:'AAO-HNSF', org:'American Academy of Otolaryngology–Head and Neck Surgery Foundation', cat:'society', date:'2026-03-16', dateLabel:'Mar 16, 2026',
    scope:'ENT clinical practice guidelines, kept live-updated with new evidence',
    desc:'First-of-its-kind partnership to keep clinical practice guidelines aligned with the latest evidence.',
    logo:'logos/publishers/aaohns.png', domain:'entnet.org',
    src:'https://www.openevidence.com/announcements/openevidence-and-aao-hnsf-pioneer-a-new-model-for-updating-clinical-practice-guidelines' },

  { id:'aao', name:'American Academy of Ophthalmology', org:'AAO', cat:'society', date:'2026-06-09', dateLabel:'Jun 9, 2026',
    scope:'Preferred Practice Patterns and clinical guidelines for eye care',
    desc:'Partnership to close the gap between evidence and eye care.',
    logo:'logos/publishers/aao.png', domain:'aao.org',
    src:'https://www.openevidence.com/announcements/openevidence-and-the-american-academy-of-ophthalmology-partner-to-close-the-gap-between-evidence-and-eye-care' },

  { id:'sno', name:'Society for Neuro-Oncology', org:'SNO · Official Generative AI Partner', cat:'society', date:'2026-06-23', dateLabel:'Jun 23, 2026',
    scope:'Neuro-oncology content; OpenEvidence embedded across SNO digital properties',
    desc:'OpenEvidence named SNO\u2019s official generative AI partner — 3,000+ members across 60 countries.',
    logo:null, mono:'SNO', monoColor:'#274472', domain:'neuro-oncology.org',
    src:'https://www.openevidence.com/announcements/sno-and-openevidence-launch-official-generative-ai-partnership' },

  { id:'sso', name:'Society of Surgical Oncology', org:'SSO', cat:'society', date:'2026-05-11', dateLabel:'May 11, 2026',
    scope:'Surgical oncology journals and evidence; SSO Innovator Grant launched',
    desc:'Strategic partnership to strengthen access to trusted surgical oncology evidence.',
    logo:null, mono:'SSO', monoColor:'#14532D', domain:'ssosurg.org',
    src:'https://www.openevidence.com/announcements/openevidence-and-society-of-surgical-oncology-announce-strategic-partnership-to-advance-surgical-cancer-care-and-launch-sso-innovator-grant' },

  { id:'gina', name:'GINA', org:'Global Initiative for Asthma', cat:'society', date:'2026-05-05', dateLabel:'May 5, 2026',
    scope:'GINA Strategy Report and asthma clinical recommendations',
    desc:'Delivering the world\u2019s asthma strategy to physicians worldwide.',
    logo:'logos/publishers/gina.png', domain:'ginasthma.org',
    src:'https://www.openevidence.com/announcements/the-global-initiative-for-asthma-and-openevidence-partner-to-deliver-asthma-strategy-to-physicians-worldwide' },

  { id:'anticoag', name:'Anticoagulation Forum', org:'AF', cat:'society', date:'2026-07-08', dateLabel:'Jul 8, 2026',
    scope:'Guidance in antithrombotic care',
    desc:'Partnership to expand access to AI-enabled guidance in antithrombotic care.',
    logo:'logos/publishers/anticoag.png', domain:'acforum.org',
    src:'https://www.openevidence.com/announcements/openevidence-anticoagulation-forum-partner-to-expand-access-to-ai-enabled-guidance-in-antithrombotic-care' },

  { id:'nord', name:'NORD', org:'National Organization for Rare Disorders', cat:'society', date:'2026-03-12', dateLabel:'Mar 12, 2026',
    scope:'Expert-reviewed rare disease reference library',
    desc:'Bringing AI-powered rare disease resources to clinicians and patients worldwide.',
    logo:'logos/publishers/nord.png', domain:'rarediseases.org',
    src:'https://www.openevidence.com/announcements/national-organization-for-rare-disorders-and-openevidence-partner-to-bring-ai-powered-rare-disease-resources-to-clinicians-and-patients-worldwide' },

  { id:'jomi', name:'JOMI', org:'Journal of Medical Insight', cat:'journal', date:'2026-06-25', dateLabel:'Jun 25, 2026',
    scope:'357 peer-reviewed surgical videos — first video evidence on OpenEvidence',
    desc:'First video-evidence collaboration: narrated surgical videos brought to clinicians.',
    logo:'logos/publishers/jomi.png', domain:'jomi.com',
    src:'https://www.openevidence.com/announcements/openevidence-and-journal-of-medical-insight-jomi-partner-to-bring-peer-reviewed-surgical-videos-to-clinicians' },

  // ── Clinical networks & public health ────────────────────────
  { id:'oneoncology', name:'OneOncology', org:'Community oncology network', cat:'network', date:'2026-08-06', dateLabel:'Aug 6, 2026',
    scope:'Real-world community oncology data — 1.5M patients; genomic data + trial matching planned',
    desc:'Multi-year partnership delivering evidence-grounded AI decision support to community oncology practices nationwide.',
    logo:'logos/publishers/oneoncology.png', domain:'oneoncology.com',
    src:'https://www.openevidence.com/announcements/oneoncology-and-openevidence-partner-to-improve-cancer-care-nationwide' },

  { id:'lacounty', name:'LA County Dept. of Public Health', org:'Los Angeles County DPH', cat:'publichealth', date:'2026-07-23', dateLabel:'Jul 23, 2026',
    scope:'Official LA County public health guidance on selected topics',
    desc:'Connects physicians with local public health guidance directly inside OpenEvidence searches.',
    logo:'logos/publishers/lacounty.png', domain:'dph.lacounty.gov',
    src:'https://www.openevidence.com/announcements/los-angeles-county-department-of-public-health-and-openevidence-partner-to-connect-physicians-with-local-public-health-guidance' },

  { id:'nycdoh', name:'NYC Dept. of Health & Mental Hygiene', org:'NYC DOHMH', cat:'publichealth', date:'2025-01-01', dateLabel:'Pre-existing',
    scope:'New York City public health content',
    desc:'Long-standing content integration, publicly revealed in a Jul 30, 2026 LA Times article.',
    logo:'logos/publishers/nycdoh.png', domain:'nyc.gov',
    src:'https://www.latimes.com' },

  // ── Open research backbone (indexed since launch) ────────────
  { id:'pubmed', name:'PubMed / PMC', org:'U.S. National Library of Medicine (NIH)', cat:'backbone', date:'2021-01-01', dateLabel:'Since launch',
    scope:'36M+ biomedical citations and full-text articles',
    desc:'Core open-literature layer — every OpenEvidence answer is grounded in indexed biomedical literature.',
    logo:'logos/publishers/pubmed.png', domain:'pubmed.ncbi.nlm.nih.gov', src:'' },

  { id:'medrxiv', name:'medRxiv', org:'Cold Spring Harbor · Yale · BMJ', cat:'backbone', date:'2021-01-01', dateLabel:'Since launch',
    scope:'Preprints in the health sciences',
    desc:'Preprint layer surfacing the latest research before formal publication.',
    logo:'logos/publishers/medrxiv.png', domain:'medrxiv.org', src:'' },

  { id:'biorxiv', name:'bioRxiv', org:'Cold Spring Harbor Laboratory', cat:'backbone', date:'2021-01-01', dateLabel:'Since launch',
    scope:'Preprints in the life sciences',
    desc:'Life-science preprints indexed alongside the peer-reviewed layer.',
    logo:'logos/publishers/biorxiv.png', domain:'biorxiv.org', src:'' },

  { id:'clinicaltrials', name:'ClinicalTrials.gov', org:'U.S. National Library of Medicine', cat:'backbone', date:'2021-01-01', dateLabel:'Since launch',
    scope:'Registry of clinical studies and trials',
    desc:'Trial registry context for therapy questions.',
    logo:'logos/publishers/clinicaltrials.png', domain:'clinicaltrials.gov', src:'' },
];

const PUBLISHER_CATEGORIES = {
  journal:      { label:'Journals & Journal Publishers', icon:'📰' },
  publisher:    { label:'Academic Publishers', icon:'🏛️' },
  society:      { label:'Medical Societies & Colleges', icon:'🩺' },
  research:     { label:'Evidence-Synthesis Bodies', icon:'🔬' },
  network:      { label:'Clinical Networks', icon:'🏥' },
  publichealth: { label:'Public Health Agencies', icon:'🏙️' },
  backbone:     { label:'Open Research Backbone (indexed since launch)', icon:'🌐' },
};
