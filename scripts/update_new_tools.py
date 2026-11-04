#!/usr/bin/env python3
"""Add verified new clinical AI tools to the OpenEvidence dashboard data files."""
import re

BASE = "/home/vivgates/OpenEvidence/data"

# New trend cards (actual emoji chars, valid UTF-8 JS)
NEW_TRENDS = '''
{icon:"🩺",name:"DxPro (DxCheck)",metric:"Free",metricLabel:"for verified US clinicians",trajectory:"emerging",trajectoryLabel:"EMERGING",desc:"AI-powered clinical workspace for practicing U.S. healthcare professionals. Launched Oct 29, 2026 by DxCheck, it delivers specialty-tailored, cited clinical answers with daily monitoring of trials, safety signals and guideline updates, plus patient-experience insight from review sites. Free for verified clinicians.",region:"US",src:"DxCheck / PRNewswire",url:"https://www.prnewswire.com/news-releases/dxcheck-launches-dxpro-an-ai-powered-workspace-that-helps-clinicians-stay-current-in-their-specialty-302923063.html"},
{icon:"🔬",name:"Hela",metric:"SG",metricLabel:"Singapore clinical AI",trajectory:"emerging",trajectoryLabel:"EMERGING",desc:"Clinical-grade AI reference for doctors in practice and in training. Every answer traced to a source, reviewed by named clinicians, and continuously checked by AI agents working with human clinician editors. Built by Singapore-based Cistema Pte. Ltd.; available on web, iOS and Android. Launched Oct 8, 2026.",region:"Global (SEA)",src:"Cistema / EINPresswire",url:"https://www.einpresswire.com/article/946884809/hela-launches-clinical-grade-medical-ai-with-every-answer-traced-to-a-source"},
{icon:"🇮🇳",name:"ZenMD",metric:"60K+",metricLabel:"Indian clinicians (8 weeks)",trajectory:"up",trajectoryLabel:"GROWING",desc:"Clinical AI for Indian doctors built in Hyderabad. ZenConsult gives evidence-based decision support with dosing, drug interactions and guideline sources; ZenScribe/ZenNotes handle documentation; ZenScan reads X-rays. Every response passes a hallucination-correction layer. Free for doctors; governed hospital plans. 60,000+ clinicians within eight weeks of its May 21, 2026 launch. Founder: Rithika Reddy. Independent, founder-backed.",region:"IN",src:"ZenMD",url:"https://www.zenmd.ai/"},
{icon:"🔍",name:"OpenInsight",metric:"Early access",metricLabel:"AI medical search (2026)",trajectory:"emerging",trajectoryLabel:"EMERGING",desc:"AI-powered medical search engine and clinical decision-support tool built for healthcare professionals, grounded in literature clinicians trust. Designed around regional generics, national drug schedules and local protocols rather than US-only content. Free for verified healthcare professionals; professional registration required. Built by SentArc Labs.",region:"IN",src:"SentArc Labs",url:"https://openinsight.in/"},
{icon:"🏥",name:"Nigel (AGA)",metric:"14-day",metricLabel:"free trial",trajectory:"emerging",trajectoryLabel:"EMERGING",desc:"AI virtual assistant built exclusively for gastroenterology and hepatology by the American Gastroenterological Association (launched Jul 10, 2026). Grounded in AGA's GRADE-based clinical guidelines and vetted by GI and liver experts, with transparent evidence strength and uncertainty.",region:"US",src:"American Gastroenterological Association",url:"https://gastro.org/press-releases/aga-launches-nigel-an-ai-assistant-built-specifically-for-gastroenterology-and-hepatology/"},
{icon:"🇸🇪",name:"Platform24 AI Triage",metric:"Dialogue",metricLabel:"based AI triage",trajectory:"emerging",trajectoryLabel:"EMERGING",desc:"Dialogue-based AI triage tool launched Jun 29, 2026, moving from click-through forms to intelligent conversation to help people decide when and where to seek care. European clinical triage tool for primary care access.",region:"EU, UK",src:"Platform24",url:"https://platform24.com/blog/2026/06/29/platform24-launches-dialogue-based-ai-triage-from-click-through-forms-to-intelligent-dialogue/"},
{icon:"🇳🇱",name:"LaennecAI Zorgm Pro",metric:"Free",metricLabel:"medical answer engine",trajectory:"emerging",trajectoryLabel:"EMERGING",desc:"Free medical education answer engine built by doctors, for doctors (launched Jun 1, 2026). European clinical AI reference for physicians. Netherlands-based LaennecAI.",region:"EU",src:"LaennecAI / PRNewswire",url:"https://www.prnewswire.com/in/news-releases/laennecai-launches-zorgm-pro-a-free-medical-education-answer-engine-built-by-doctors-for-doctors-302784837.html"},
{icon:"🇰🇷",name:"GC MediAI Uisarang AI",metric:"Nationwide",metricLabel:"Korea launch (Aug 2026)",trajectory:"emerging",trajectoryLabel:"EMERGING",desc:"AI-powered medical operating system combining Korea's leading Uisarang EMR with healthcare-specific AI to streamline clinical workflows for hospitals, clinics and physicians. Launched nationwide Aug 6, 2026.",region:"Asia (KR)",src:"GC MediAI / Korea Biomedical Review",url:"https://www.koreabiomed.com/news/articleView.html?idxno=32689"},
{icon:"🏥",name:"Nemedic useBlue.ai",metric:"US Patent",metricLabel:"12,592,322 (Mar 2026)",trajectory:"emerging",trajectoryLabel:"EMERGING",desc:"AI agent platform for procedural (surgical) healthcare practices, founded by otolaryngologist Bradford G. Bichey, MD, MPH (Westfield, Indiana). Runs alongside the EHR to handle referral intake, patient engagement, prior-authorization readiness and documentation. Public launch with self-serve registration May 13, 2026; BAA per practice.",region:"US",src:"Nemedic",url:"https://nemedic.com/press/useblue-ai-launch/"},
'''

NEW_TIMELINE = '''
{date:"2026-10-29",region:"US",cat:"Product",title:"DxCheck launches DxPro AI clinical workspace",desc:"DxCheck launches DxPro, an AI-powered workspace for practicing U.S. healthcare professionals. Specialty-tailored, cited clinical answers with daily monitoring of trials, safety signals and guideline updates, plus patient-experience insight. Free for verified clinicians.",src:"DxCheck / PRNewswire",url:"https://www.prnewswire.com/news-releases/dxcheck-launches-dxpro-an-ai-powered-workspace-that-helps-clinicians-stay-current-in-their-specialty-302923063.html",new:true},
{date:"2026-10-08",region:"Global",cat:"Product",title:"Cistema launches Hela clinical-grade AI reference",desc:"Singapore-based Cistema Pte. Ltd. launches Hela, a clinical-grade AI reference for doctors where every answer is traced to a source, reviewed by named clinicians, and continuously checked by AI agents. Available on web, iOS and Android.",src:"Cistema / EINPresswire",url:"https://www.einpresswire.com/article/946884809/hela-launches-clinical-grade-medical-ai-with-every-answer-traced-to-a-source",new:true},
{date:"2026-05-21",region:"IN",cat:"Product",title:"ZenMD launches clinical AI for Indian doctors",desc:"ZenMD launches in India, a clinical intelligence layer for doctors with ZenConsult evidence-based decision support, ZenScribe/ZenNotes documentation, and ZenScan X-ray analysis. Every response passes a hallucination-correction layer. 60,000+ clinicians within eight weeks of launch. Free for doctors.",src:"ZenMD",url:"https://www.zenmd.ai/",new:true},
{date:"2026-10-01",region:"IN",cat:"Product",title:"SentArc Labs launches OpenInsight AI medical search",desc:"OpenInsight, an AI-powered medical search engine and clinical decision-support tool built for healthcare professionals, grounded in trusted literature with regional generics, national drug schedules and local protocols. Free for verified healthcare professionals.",src:"SentArc Labs",url:"https://openinsight.in/",new:true},
{date:"2026-07-10",region:"US",cat:"Product",title:"AGA launches Nigel AI assistant for gastroenterology",desc:"The American Gastroenterological Association launches Nigel, an AI-powered virtual assistant built exclusively for gastroenterology and hepatology, grounded in AGA's GRADE-based clinical guidelines and vetted by GI and liver experts.",src:"American Gastroenterological Association",url:"https://gastro.org/press-releases/aga-launches-nigel-an-ai-assistant-built-specifically-for-gastroenterology-and-hepatology/",new:true},
{date:"2026-06-29",region:"EU",cat:"Product",title:"Platform24 launches dialogue-based AI triage",desc:"Platform24 launches a dialogue-based AI triage tool, moving from click-through forms to intelligent conversation to help people decide when and where to seek care. European clinical triage tool for primary care access.",src:"Platform24",url:"https://platform24.com/blog/2026/06/29/platform24-launches-dialogue-based-ai-triage-from-click-through-forms-to-intelligent-dialogue/",new:true},
{date:"2026-06-01",region:"EU",cat:"Product",title:"LaennecAI launches Zorgm Pro medical answer engine",desc:"LaennecAI launches Zorgm Pro, a free medical education answer engine built by doctors, for doctors. European clinical AI reference for physicians.",src:"LaennecAI / PRNewswire",url:"https://www.prnewswire.com/in/news-releases/laennecai-launches-zorgm-pro-a-free-medical-education-answer-engine-built-by-doctors-for-doctors-302784837.html",new:true},
{date:"2026-08-06",region:"Asia",cat:"Product",title:"GC MediAI launches Uisarang AI nationwide in Korea",desc:"GC MediAI launches Uisarang AI, an AI-powered medical operating system combining Korea's leading EMR with healthcare-specific AI to streamline clinical workflows for hospitals, clinics and physicians.",src:"GC MediAI / Korea Biomedical Review",url:"https://www.koreabiomed.com/news/articleView.html?idxno=32689",new:true},
{date:"2026-05-13",region:"US",cat:"Product",title:"Nemedic launches useBlue.ai AI platform for procedural care",desc:"Nemedic (Westfield, Indiana) launches useBlue.ai, an AI agent platform for procedural healthcare practices that runs alongside the EHR to handle referral intake, patient engagement, prior-authorization readiness and documentation. Founded by otolaryngologist Bradford G. Bichey, MD, MPH.",src:"Nemedic",url:"https://nemedic.com/press/useblue-ai-launch/",new:true},
'''

NEW_MATRIX = '''
{platform:"DxPro (DxCheck)",us:"yes",eu:"no",uk:"no",cn:"no",in:"no",jp:"no",sea:"no",latam:"no",mea:"no"},
{platform:"Hela",us:"no",eu:"yes",uk:"yes",cn:"no",in:"yes",jp:"no",sea:"yes",latam:"no",mea:"no"},
{platform:"ZenMD",us:"yes",eu:"no",uk:"no",cn:"no",in:"yes",jp:"no",sea:"no",latam:"no",mea:"no"},
{platform:"OpenInsight",us:"no",eu:"no",uk:"no",cn:"no",in:"yes",jp:"no",sea:"no",latam:"no",mea:"no"},
{platform:"Nigel (AGA)",us:"yes",eu:"no",uk:"no",cn:"no",in:"no",jp:"no",sea:"no",latam:"no",mea:"no"},
{platform:"Platform24 AI Triage",us:"no",eu:"yes",uk:"yes",cn:"no",in:"no",jp:"no",sea:"no",latam:"no",mea:"no"},
{platform:"LaennecAI Zorgm Pro",us:"no",eu:"yes",uk:"no",cn:"no",in:"no",jp:"no",sea:"no",latam:"no",mea:"no"},
{platform:"GC MediAI Uisarang AI",us:"no",eu:"no",uk:"no",cn:"no",in:"no",jp:"no",sea:"no",latam:"no",mea:"no"},
{platform:"Nemedic useBlue.ai",us:"yes",eu:"no",uk:"no",cn:"no",in:"no",jp:"no",sea:"no",latam:"no",mea:"no"},
'''

def update_emerging_trends():
    path = f"{BASE}/emergingTrends.js"
    with open(path, encoding="utf-8") as f:
        content = f.read()
    # Vera icon is stored as a literal \u escape in the file; match it with a raw string
    vera_icon = r'\ud83e\udd7a'
    content = content.replace(
        '{icon:' + vera_icon + ',name:"Vera Health",metric:"250K+",metricLabel:"HCPs globally"',
        '{icon:' + vera_icon + ',name:"Vera Health",metric:"800K+",metricLabel:"HCPs globally"')
    content = content.replace(
        "Direct competitor to OpenEvidence globally.",
        "Direct competitor to OpenEvidence globally. Raised $32M Series A (Oct 27, 2026); now 800,000+ clinicians across 190 countries, including roughly 1 in 4 physicians in Spain and Italy.")
    content = content.replace(
        "180M+ patient interactions. 99.90% correct clinical advice, 0.00% severe harm events.",
        "180M+ patient interactions. 99.90% correct clinical advice, 0.00% severe harm events. Launched Polaris 6 Ultra (Nov 2026), its first healthcare model with bedside intuition and lower pricing.")
    content = content.replace("];;", NEW_TRENDS + "];;")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("emergingTrends.js updated")

def update_timeline():
    path = f"{BASE}/globalTimeline.js"
    with open(path, encoding="utf-8") as f:
        content = f.read()
    content = content.replace("];", NEW_TIMELINE + "];")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("globalTimeline.js updated")

def update_matrix():
    path = f"{BASE}/globalMatrix.js"
    with open(path, encoding="utf-8") as f:
        content = f.read()
    content = content.replace("];;", NEW_MATRIX + "];;")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("globalMatrix.js updated")

if __name__ == "__main__":
    update_emerging_trends()
    update_timeline()
    update_matrix()
    print("All data files updated.")
