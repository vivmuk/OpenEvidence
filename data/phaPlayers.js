// Personal health agent landscape: platforms, device makers, health systems, challengers.
var phaPlayersData = [
  {name:"OpenAI - Health in ChatGPT", type:"Frontier platform · records + Apple Health", badge:"SCALE LEADER",
   stats:[{l:"Launched",v:"Jul 23, 2026"},{l:"Tiers",v:"Free/Go/Plus/Pro"},{l:"Data",v:"Records + Apple Health"},{l:"HIPAA",v:"Not covered after export"}],
   desc:"Health in ChatGPT lets eligible US users connect medical records and Apple Health data so the assistant can interpret information in context and track changes over time. The same period saw OpenAI connect ChatGPT to Epic records on the clinician side, putting one vendor on both sides of the physician - patient boundary. The governance gap is explicit: once data leaves a provider, HIPAA no longer protects it.",
   url:"https://www.paubox.com/blog/chatgpt-health-launches-nationwide-but-medical-records-not-hipaa-protected"},

  {name:"Microsoft - Copilot Health", type:"Frontier platform · dedicated health space", badge:"FAST FOLLOWER",
   stats:[{l:"Launched",v:"Mar 12, 2026"},{l:"Preview",v:"May 2026"},{l:"Sources",v:"EHR + wearables + labs"},{l:"Demand",v:"~1 in 5 Copilot chats health-related"}],
   desc:"A separate, secure space inside Copilot that aggregates records, wearable data (Apple Health, Fitbit) and laboratory results into what Microsoft calls a coherent story of a user's health. Microsoft's own analysis of 500,000+ de-identified Copilot conversations found nearly one in five involved symptom assessment or condition discussion - evidence that consumer demand already flows through general assistants.",
   url:"https://fortune.com/2026/03/12/microsoft-copilot-health-ai-medical-personal-health-data/"},

  {name:"Apple - Health app + Apple Intelligence", type:"Device platform · on-device processing", badge:"DISTRIBUTION MOAT",
   stats:[{l:"Announced",v:"Sep 2026"},{l:"OS",v:"iOS 27 / iPadOS 27"},{l:"Processing",v:"On-device"},{l:"Status",v:"Health+ planned 2026"}],
   desc:"Apple extended Apple Intelligence into the Health app, positioning the iPhone as the secure central store for health and fitness data with on-device processing and interpretation of long-term metrics. The fuller AI health coach (Project Mulberry) was scaled back, with nutrition tracking and a reduced health agent arriving first. Apple's advantage is the install base and the sensor data already on the device.",
   url:"https://www.apple.com/newsroom/2026/09/apple-advances-health-and-fitness-capabilities-using-apple-intelligence/"},

  {name:"Google - Health App + Fitbit Edge + Health Coach", type:"Device platform · AI coaching + data aggregation", badge:"VERTICAL STACK",
   stats:[{l:"Fitbit Edge",v:"$179.99, ships Oct 27"},{l:"Battery",v:"7 days"},{l:"Health Guardian",v:"BP + insulin resistance trends"},{l:"Premium",v:"$9.99/mo or $99.99/yr"}],
   desc:"Google consolidated its consumer health stack in October 2026: the Fitbit app became the Google Health app in May, the Fitbit Edge tracker launched Oct 12 with a Health Guardian suite that passively tracks blood pressure and insulin resistance trends, and the Google Health app opened to Function Health lab results, Abbott Lingo CGM data and MyFitnessPal meal logs. The Abbott partnership pairs Lingo glucose data with Google's AI Health Coach for personalised metabolic insights and plans a large-scale real-world metabolic health study. Vendor claim: Health Guardian features are for general wellness, not diagnosis.",
   url:"https://blog.google/products-and-platforms/devices/fitbit/google-fitbit-edge/"},

  {name:"Google - Personal Health Agent (research)", type:"Research → product pipeline", badge:"STATE OF THE ART",
   stats:[{l:"Published",v:"Nature, Oct 21, 2026"},{l:"Architecture",v:"3 sub-agents"},{l:"Evaluation",v:"11 tasks · 7,000+ annotations"},{l:"Safety gaps",v:"~17% of summaries"}],
   desc:"Google Research's personal health agent is the most comprehensively evaluated consumer health agent published to date: a data science agent, a health domain expert agent and a health coach agent over four user journeys, open-sourced as a multi-agent framework. Independent coverage found it beat its Gemini base models on personal health tasks while still showing safety gaps in a meaningful share of summaries. The research underpins the shipping Google Health Coach in the Fitbit/Pixel Watch product line.",
   url:"https://www.nature.com/articles/s41586-026-11161-8"},

  {name:"Oura", type:"Wearable maker · coaching layer", badge:"COACHING LEADER",
   stats:[{l:"AI coach",v:"Oura Advisor"},{l:"New model",v:"Reproductive health, Feb 2026"},{l:"Shift",v:"Metrics → dialogue"}],
   desc:"Oura turned its insight feed into a two-way coaching dialogue with Oura Advisor and launched a dedicated reproductive health model spanning menstrual cycles through menopause. Represents the device-maker path to personal agents: own the sensor, own the interpretation.",
   url:"https://sahha.ai/blog/ai-health-coaching-platforms/"},

  {name:"WHOOP", type:"Wearable maker · embedded AI guidance", badge:"ADJACENT",
   stats:[{l:"Approach",v:"AI guidance on every screen"},{l:"Model",v:"Subscription + hardware"}],
   desc:"WHOOP integrated AI guidance across its app rather than shipping a separate coach, and has publicly disputed regulatory interpretations of its own features - illustrating how close wearable guidance sits to a clinical claim.",
   url:"https://athletechnews.com/wearable-makers-eye-healthcare-new-innovations-apple-watch-oura-whoop-garmin/"},

  {name:"Mount Sinai - Check Symptoms & Get Care", type:"Health system deployment", badge:"PROOF POINT",
   stats:[{l:"Concordance",v:"88-96% with physician triage"},{l:"Sessions",v:"~22,000"},{l:"Completion",v:"~80%"},{l:"Published",v:"NEJM Catalyst 2026"}],
   desc:"Mount Sinai's digital triage tool is the clearest health-system proof point for consumer-facing symptom assessment: blinded clinician comparison plus continuous post-deployment review showed 88-96% concordance with physician triage, with a tiered roadmap other organisations can copy.",
   url:"https://catalyst.nejm.org/doi/full/10.1056/CAT.25.0394"},

  {name:"Symptom checkers (K Health, Ada, and others)", type:"Consumer triage platforms", badge:"CROWDED",
   stats:[{l:"Top accuracy",v:"82-88% correct care level"},{l:"Failure mode",v:"Tendency to overtriage"},{l:"Evidence",v:"Decade of vignette studies"}],
   desc:"A decade of symptom-checker research shows top platforms reaching roughly 82-88% accuracy at assigning the correct level of care, with a consistent tendency to overtriage rather than undertriage. Independent validation in Swedish emergency departments found an AI triage system outperforming junior clinicians at identifying emergency cases.",
   url:"https://futurewellnesstech.com/ai-symptom-checkers-triage-accuracy-2026/"},

  {name:"Ambient home sensing (radar, WiFi, acoustic)", type:"Non-contact monitoring", badge:"EMERGING",
   stats:[{l:"Modalities",v:"mmWave, WiFi, acoustic, glasses"},{l:"Design",v:"Local-first processing"},{l:"Use",v:"Ageing in place, chronic care"}],
   desc:"A wave of non-contact sensing - mmWave radar, WiFi sensing, acoustic AI and smart glasses - monitors vitals and activity at home without requiring a wearable. Privacy-first local processing is the emerging design pattern, and consent across everyone in a sensed space is the unsolved governance problem.",
   url:"https://www.forbes.com/sites/saibala/2026/06/28/a-doctor-at-home-the-rise-of-ambient-home-health-monitoring/"},

  {name:"Function Health and lab-first subscriptions", type:"Consumer diagnostics + AI interpretation", badge:"ADJACENT",
   stats:[{l:"Model",v:"Subscription lab panels"},{l:"Value",v:"Longitudinal biomarker trends"},{l:"Risk",v:"Interpretation without a clinician"}],
   desc:"Lab-first consumer services generate dense longitudinal biomarker data, which makes them natural personal-agent customers and a direct source of the 'what does my bloodwork mean' question that general assistants now answer informally.",
   url:"https://www.producthunt.com/products/copilot-health"},

  {name:"Samsung / Garmin / Withings", type:"Device incumbents", badge:"ADJACENT",
   stats:[{l:"Position",v:"Sensor-first, AI second"},{l:"Risk",v:"Interpretation gap"}],
   desc:"Hardware incumbents with large installed bases are adding AI interpretation and coaching, but trail the platform players on model capability and the wearable-native startups on coaching depth.",
   url:"https://www.aimagicx.com/blog/ai-health-wearables-smart-rings-monitors-guide-2026"},

  {name:"Meta AI glasses and form-factor sensing", type:"Ambient capture", badge:"WILDCARD",
   stats:[{l:"Bet",v:"Infuse sensing into existing form factors"},{l:"Barrier",v:"Social acceptability + consent"}],
   desc:"The argument for glasses is that people already wear them, so sensing can be added without asking for a new device. It also concentrates the consent problem: continuous capture in public and shared spaces.",
   url:"https://www.forbes.com/sites/saibala/2026/06/28/a-doctor-at-home-the-rise-of-ambient-home-health-monitoring/"},

  {name:"Perplexity - Perplexity Health", type:"Frontier platform · EHR + wearables + agents", badge:"CITATION-FIRST",
   stats:[{l:"Launched",v:"Mar 19, 2026"},{l:"Rollout",v:"Apr 2026, US Pro/Max"},{l:"Providers",v:"1.7M+ via b.well"},{l:"Wearables",v:"Apple Health, Fitbit, Withings, Clue"}],
   desc:"Perplexity Health connects EHR via b.well (1.7M+ providers), wearable data via Terra API, and offers AI agents for nutrition, sleep and visit prep built on Perplexity Computer. A Health Advisory Board including Dr Eric Topol was announced at launch. Perplexity commits to no training on health data and citations on every response. The fifth major health AI product launched in the first three months of 2026, according to IAPP analysis.",
   url:"https://perplexityaimagazine.com/ai-news/perplexity-health-launch/"},

  {name:"Anthropic - Claude for Healthcare", type:"Frontier platform · clinical and health data", badge:"EARLY",
   stats:[{l:"Launched",v:"Jan 11, 2026"},{l:"Model",v:"Claude"},{l:"Scope",v:"Healthcare and life sciences"}],
   desc:"Anthropic launched Claude for Healthcare on 11 January 2026, one of five major health AI products to launch in the first three months of 2026. Product details are less documented than OpenAI's or Microsoft's offerings; IAPP analysis notes the same convergence pattern - EHR integration, wearable connections, no-training commitment, US-only availability.",
   url:"https://www.anthropic.com/news/healthcare-life-sciences"},

  {name:"Amazon - Health AI (One Medical)", type:"Frontier platform · subscription health", badge:"ECOSYSTEM PLAY",
   stats:[{l:"Launched",v:"Jan 22, 2026"},{l:"Channel",v:"One Medical members"},{l:"Expansion",v:"Mar 2026"}],
   desc:"Amazon Health AI became available to One Medical members on 22 January 2026 and was expanded in March. IAPP analysis notes the strategic logic: Amazon channels users toward One Medical consultations and Amazon Pharmacy prescriptions. The product follows the same convergence pattern as the other four: EHR + wearables, no training, US-only, outside HIPAA.",
   url:"https://www.aboutamazon.com/news/retail/amazon-health-ai-agent-one-medical"},

  {name:"Alloop - Trio + AI Health Agent", type:"Wearable maker · AI-native platform", badge:"NEW ENTRANT",
   stats:[{l:"Launched",v:"Oct 23, 2026"},{l:"Hardware",v:"Modular ring/wristband"},{l:"Integrations",v:"Apple Health, Google Health"},{l:"Funding",v:"Kickstarter"}],
   desc:"Alloop's Trio is a modular 3-in-1 wearable with one interchangeable sensing core that snaps between a smart ring and a wristband. Its Personal AI Health Agent interprets physiological data alongside user-journalled meals, activities and symptoms via voice, text and images. An open platform integrates Apple Health, Google Health and Health Connect. Bio Age score spans six domains. A new entrant combining hardware, open data integration and conversational AI.",
   url:"https://www.openpr.com/news/4671109/alloop-officially-launches-trio-a-modular-3-in-1-wearable"}
];
