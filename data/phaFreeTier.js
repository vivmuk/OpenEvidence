// Free-tier default models for the consumer AI a patient would actually use.
//
// This is the consumer side, not the clinician side: the model that runs when
// an ordinary person opens the app and asks a health question on a free
// account. It is deliberately NOT the flagship model - a patient on a free
// tier gets something different, and usually weaker, than the vendor's
// headline capability.
//
// `confidence` describes the free-tier default claim:
//   disclosed - the vendor states it
//   reported - a credible third party states it
//   inferred - deduced, with the reasoning shown
//   undisclosed - no public statement
//
// Updated as of 2026-11-07. Regenerate the JSON mirror from this file.
var phaFreeTierData = [
 {
  "platform": "ChatGPT",
  "vendor": "OpenAI",
  "freeDefault": "GPT-6 Luna",
  "paidDefault": "GPT-6 Sol (Plus / Pro / Business / Enterprise); GPT-6 Pro powered by GPT-6 Astra on the top tiers",
  "healthAccess": "Health in ChatGPT is free for logged-in US users on Free, Go, Plus and Pro, on web and iOS. A free user can connect Apple Health and supported US medical records and get grounded, cited health answers with no separate fee. OpenAI published no separate per-plan limit on the Health experience itself; free users are bounded by the general chat limits.",
  "freeTierLimits": "Unlimited text chats with GPT-6, subject to abuse guardrails. Separate caps on uploads, image generation, voice, data analysis and Codex. Free users get the Think toggle but no Medium / High / Extra High / Pro reasoning levels, and no access to GPT-6 Pro or Astra.",
  "healthNote": "OpenAI's own system-card addendum on the October 29, 2026 GPT-6 Luna update - the build that applies to Free and Go users - reports higher factual-error rates on health and wellness questions than the October 7 build. So the free tier and the paid tier are not merely different in capability on health; the free model was, for a period, measurably weaker on exactly the questions a patient asks.",
  "confidence": "disclosed",
  "asOf": "2026-11-07",
  "notes": "A patient asking a health question on a free ChatGPT account is talking to GPT-6 Luna. Paid tiers get GPT-6 Sol with higher reasoning levels and, at the top, Astra.",
  "conflict": "OpenAI's own pages disagree on the version label for the free default. The help centre says 'GPT-5.6 Luna is becoming the default model for Free and Go users' (updated ~Oct 30) and the Free Tier FAQ says free users have access to GPT-5.6 Luna (updated ~Nov 6), while the live pricing page lists GPT-6 Luna as available on Free and GPT-5.6 Luna as not available on Free. Resolved to GPT-6 Luna: the pricing page is live and current, the October 7 release note says 'Free and Go use GPT-6 Luna', and the October 29 model update is scoped to Free and Go users - which is only possible if free users were already on GPT-6. The help-centre copy looks like prose that has not been refreshed since the GPT-6 rollout. Both candidate labels are Luna-tier models, so the practical difference is the generation number, not the tier.",
  "citations": [
   {
    "title": "Plans and Pricing | ChatGPT - free plan is 'Unlimited text chats with GPT-6'; model matrix shows Free = GPT-6 Luna Yes, GPT-5.6 Luna No",
    "url": "https://chatgpt.com/pricing/",
    "date": "2026-11-07",
    "kind": "vendor",
    "quote": "Unlimited text chats with GPT-6"
   },
   {
    "title": "ChatGPT release notes - GPT-6 and Intelligent UI in ChatGPT",
    "url": "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
    "date": "2026-10-07",
    "kind": "vendor",
    "quote": "Plus, Pro, Business, and Enterprise use GPT-6 Sol; Free and Go use GPT-6 Luna."
   },
   {
    "title": "GPT-6 Sol and GPT-6 Luna: October 2026 update - OpenAI Deployment Safety Hub",
    "url": "https://deploymentsafety.openai.com/gpt-6-october/exploitbench",
    "date": "2026-10-07",
    "kind": "vendor",
    "quote": "We're launching GPT-6 to everyone in ChatGPT, across free and paid plans globally. These models will replace GPT-5.6 Sol and GPT-5.6 Luna in ChatGPT."
   },
   {
    "title": "Model Release Notes - GPT-6 in ChatGPT update (applies to Free and Go users)",
    "url": "https://help.openai.com/en/articles/9624314-model-release-notes",
    "date": "2026-10-29",
    "kind": "vendor",
    "quote": "This update applies to Free and Go users, and people using ChatGPT without signing in."
   },
   {
    "title": "Launching Health in ChatGPT | OpenAI",
    "url": "https://openai.com/index/health-in-chatgpt/",
    "date": "2026-07-23",
    "kind": "vendor",
    "quote": "GPT-5.5 Instant brought frontier health intelligence to all free users. GPT-5.6 Sol builds on that progress with even stronger performance on more complex questions."
   },
   {
    "title": "Health in ChatGPT | OpenAI Help Center - plan availability",
    "url": "https://help.openai.com/en/articles/20001036-health-in-chatgpt",
    "date": "2026-10-27",
    "kind": "vendor",
    "quote": "Health is available to eligible, logged-in ChatGPT Free, Go, Plus, and Pro users in the U.S. It is supported on web and iOS."
   },
   {
    "title": "GPT-6 and other models in ChatGPT | OpenAI Help Center (the conflicting, stale label)",
    "url": "https://help.openai.com/en/articles/20001354-gpt-6-and-other-models-in-chatgpt",
    "date": "2026-10-30",
    "kind": "vendor",
    "quote": "GPT-5.6 Luna is becoming the default model for Free and Go users."
   }
  ],
  "alternatives": [
   {
    "model": "GPT-5.6 Luna",
    "note": "the label two OpenAI help pages still carry for the free default",
    "url": "https://help.openai.com/en/articles/20001354-gpt-6-and-other-models-in-chatgpt",
    "date": "2026-10-30"
   }
  ]
 },
 {
  "platform": "Claude",
  "vendor": "Anthropic",
  "freeDefault": "Claude Sonnet 5.5 (Haiku 5.5 also available on Free)",
  "paidDefault": "Claude Opus 5.5 (paid plans); Claude Fable 5.1 on Max / Ultra, and by usage credits on Pro",
  "healthAccess": "None for free users. Anthropic's health features - Apple Health on iOS, Android Health Connect, and the HealthEx and Function medical-record connectors - are in beta, US-only, and gated to Pro, Max and Ultra plans. A free user asking a health question simply gets an ordinary Sonnet 5.5 chat with no personal data grounding.",
  "freeTierLimits": "Standard session limits (resetting every five hours plus a weekly cap); Anthropic publishes no numeric message count for the free tier.",
  "healthNote": "Two model-level caveats matter for health questions. Anthropic ships biology safeguards on Sonnet 5.5 that may be flagged in error for some microbiology and virology questions, and on Opus tiers higher-risk biology and cybersecurity requests visibly fall back to an older model (Opus 4.8) - so on paid plans the model answering a sensitive biology question may not be the one selected. Anthropic states it is not a medical device and directs users to clinicians.",
  "confidence": "disclosed",
  "asOf": "2026-11-07",
  "notes": "A patient asking a health question on a free Claude account is talking to Sonnet 5.5 at Medium effort, with Haiku 5.5 available for lighter queries. That is a materially stronger free default than OpenAI's or Google's.",
  "conflict": "Anthropic does not publish a literal sentence naming the version-level default for free accounts on the Sonnet 5.5 launch - unlike the Sonnet 5 announcement, which said Sonnet 5 'is the default model for Free and Pro plans'. The pricing page names only the families (Sonnet, Haiku) without version numbers. The version-level default was therefore resolved from the Sonnet 5.5 product page, the pricing table, Anthropic's prior explicit Free-and-Pro default statement for Sonnet 5, the Academy guide calling Sonnet the versatile default, and first-party app inspections by two independent testers (Oct 9 and Nov 6, 2026) showing Sonnet 5.5 at Medium effort on a free account.",
  "citations": [
   {
    "title": "Plans & pricing | Claude by Anthropic - plan table shows Free gets Sonnet and Haiku, not Opus or Fable",
    "url": "https://claude.com/pricing",
    "date": "2026-11-07",
    "kind": "vendor",
    "quote": "| #### Sonnet | Yes | Yes | Yes | Yes |"
   },
   {
    "title": "Claude Sonnet | Anthropic - Sonnet 5.5 product page",
    "url": "https://www.anthropic.com/claude/sonnet",
    "date": "2026-09-28",
    "kind": "vendor",
    "quote": "Anyone can chat with Claude using Sonnet 5.5 on Claude.ai, available on web, iOS, and Android."
   },
   {
    "title": "Choosing the right Claude model: Haiku, Sonnet, Opus, or Fable | Claude Academy",
    "url": "https://academy.claude.com/tutorials/choosing-the-right-claude-model",
    "date": "2026-11-07",
    "kind": "vendor",
    "quote": "Free includes Haiku and Sonnet; Pro, Max, and Ultra add Opus, Fable, and more headroom."
   },
   {
    "title": "Introducing Claude Sonnet 5 | Anthropic - the prior explicit free-tier default statement",
    "url": "https://www.anthropic.com/news/claude-sonnet-5",
    "date": "2026-06-30",
    "kind": "vendor",
    "quote": "From today, Claude Sonnet 5 is available across all plans: it is the default model for Free and Pro plans, and is available to Max, Team, and Enterprise users."
   },
   {
    "title": "Use Claude with iOS apps | Claude Help Center - health features are paid-only",
    "url": "https://support.claude.com/en/articles/11869619-use-claude-with-ios-apps",
    "date": "2026-11-07",
    "kind": "vendor",
    "quote": "Health features are currently in beta, require a Pro, Max, or Ultra plan, and are available in the US only."
   },
   {
    "title": "Claude Sonnet 5.5 - free-tier observation",
    "url": "https://simonwillison.net/2026/Sep/28/claude-sonnet-5-5/",
    "date": "2026-09-28",
    "kind": "press",
    "quote": "The most interesting thing about Sonnet 5.5 is that it's now the model used for the free tier on claude.ai."
   },
   {
    "title": "Is Claude Free? Free Plan Limits - free-account app inspection",
    "url": "https://hub.dailytech.id/is-claude-free/",
    "date": "2026-10-09",
    "kind": "press",
    "quote": "The app's default was \"Sonnet 5.5\" with the effort set to \"Medium\"."
   }
  ],
  "alternatives": [
   {
    "model": "Claude Haiku 5.5",
    "note": "also selectable on Free, for lighter queries",
    "url": "https://academy.claude.com/tutorials/choosing-the-right-claude-model",
    "date": "2026-11-07"
   },
   {
    "model": "Claude Opus 4.8",
    "note": "the fallback Opus tiers drop to for some higher-risk biology questions",
    "url": "https://www.anthropic.com/news/healthcare-life-sciences",
    "date": "2026-01-11"
   }
  ]
 },
 {
  "platform": "Gemini",
  "vendor": "Google",
  "freeDefault": "Auto - no manual model choice. Gemini Flash-Lite handles most prompts, with Flash or Pro used when deeper reasoning is needed",
  "paidDefault": "Gemini 4 Argon on Google AI Pro / Ultra, with Flash, Pro and Argon selectable on AI Pro/Ultra and Flash on AI Plus",
  "healthAccess": "No health-specific routing and no free-tier health limits are published. A free user asking a health question gets whatever the Auto router picks for that prompt - usually Flash-Lite - with no health data grounding. Google's consumer health surfaces are separate products, not free-tier AI-plan features: the Personal Health Coach (sleep, CGM via Health Connect, medical-record linking) is a Google AI plan public preview tied to Fitbit.",
  "freeTierLimits": "Thinking levels Low / Medium / High, with Low the default. Raising the thinking level burns the usage allowance faster, so a free user who turns effort up exhausts the 5-hour and weekly caps sooner.",
  "healthNote": "Because free users cannot pick a model, the honest answer is that a free patient does not know which model answered their health question - Google does not disclose per-prompt routing probabilities, and the heavier reasoning models (Argon, Pro) are subscriber-only.",
  "confidence": "disclosed",
  "asOf": "2026-11-07",
  "notes": "A patient asking a health question on a free Gemini account is talking to Flash-Lite via Auto, with Pro-model reasoning reserved for subscribers.",
  "conflict": "No material vendor conflict on the free default. Two wrinkles were resolved: earlier coverage from July 2026 described the free default as Gemini 3.6 Flash, now obsolete because of the October 9, 2026 model-access change that moved free accounts to Auto/Flash-Lite; and Google never publishes version numbers for the Flash-Lite tier used by the app, so the label is 'Flash-Lite' with no 3.5/3.6 suffix. The dated help pages were preferred over the pricing page, which still lists only 'Access to our Flash-Lite model' for Free and undersells Auto.",
  "citations": [
   {
    "title": "Changes to Gemini model access and limits | Gemini Apps Help",
    "url": "https://support.google.com/gemini/answer/17004136?hl=en",
    "date": "2026-10-09",
    "kind": "vendor",
    "quote": "Auto will be the default setting for users without a Google AI plan. Gemini will use auto model selection to send each prompt to the Gemini model that suits it best. Most prompts will go to Flash-Lite, our fastest model. Prompts that need deeper reasoning may go to Flash or Pro."
   },
   {
    "title": "About Gemini models | Gemini Apps Help - model availability and the Auto footnote",
    "url": "https://support.google.com/gemini/answer/18648722?hl=en",
    "date": "2026-11-07",
    "kind": "vendor",
    "quote": "If auto model selection is turned on, Gemini will choose the appropriate model for each prompt. Most prompts will use Flash-Lite for quick answers. Prompts that require more reasoning may use Flash or Pro. If auto model selection is turned off, all responses will use Flash-Lite."
   },
   {
    "title": "Understanding \"Auto\" in the Gemini Model Picker - Google official answer",
    "url": "https://support.google.com/gemini/thread/472706487/understanding-auto-in-the-gemini-model-picker?hl=en-AU",
    "date": "2026-10-13",
    "kind": "vendor",
    "quote": "As part of our recent updates to Gemini Apps, users without a Google AI subscription will now see Auto as their default setting in the model picker."
   },
   {
    "title": "Free Gemini users now on 'Auto' models as app adds thinking levels | 9to5Google",
    "url": "https://9to5google.com/2026/10/09/gemini-auto-free-users/",
    "date": "2026-10-09",
    "kind": "press",
    "quote": "Free users \"without a plan\" can no longer manually switch models. Officially, their only option in the picker is \"Auto\" with \"Gemini 3 models\"."
   }
  ],
  "alternatives": [
   {
    "model": "Gemini 3.6 Flash",
    "note": "the free default as described in July 2026, before the October 9 model-access change",
    "url": "https://9to5google.com/2026/10/09/gemini-auto-free-users/",
    "date": "2026-10-09"
   },
   {
    "model": "Gemini 3.5 Flash",
    "note": "described by Google as the default for the Gemini app and AI Mode globally",
    "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
    "date": "2026-05-19"
   }
  ]
 },
 {
  "platform": "Google Search / AI Mode",
  "vendor": "Google",
  "freeDefault": "AI Mode: Gemini 3.5 Flash (global default since May 19, 2026). AI Overviews: Gemini 3 was the last explicit vendor default (Jan 27, 2026), with Gemini 3.5 Flash-Lite now routing some Search queries",
  "paidDefault": "Gemini 4 Argon, selectable in the AI Mode model menu on Google AI Pro / Ultra (with daily limits), plus Gemini 3.8 Flash and 3.7 Flash options for subscribers",
  "healthAccess": "No health-specific model and no health-specific free-tier limits are published. Google's published position is that health results in Search come from advanced AI and health-focused advancements on Gemini models that make AI Overviews more clinically factual, and that people with the most complex health questions should move into AI Mode. There is no dedicated health model and no paid/free contrast beyond Argon's availability.",
  "freeTierLimits": "Argon carries daily usage limits for subscribers. Google publishes no limits tied to health queries.",
  "healthNote": "For a free consumer, the hardest health questions land on Gemini 3.5 Flash in AI Mode - while an AI Pro/Ultra subscriber can escalate to Argon. Google separately published an end-to-end framework for evaluating AI on health scenarios (accuracy, safety, usefulness) with clinician review on Nov 4, 2026, and partners with national medical institutions for locally calibrated health sourcing.",
  "confidence": "disclosed",
  "asOf": "2026-11-07",
  "notes": "AI Mode is the more consequential surface for a patient: Google set Gemini 3.5 Flash as the default in AI Mode for everyone globally at I/O 2026, and merged AI Overviews into that flow. Since July 2026 Gemini 3.5 Flash-Lite has also been rolling out in Google Search for high-volume, latency-sensitive queries.",
  "conflict": "The AI Overviews default is the soft point. Google's last explicit, vendor-stated default for AI Overviews is Gemini 3 (Jan 27, 2026), while at I/O 2026 Google merged AI Overviews into AI Mode and moved the combined flow onto Gemini 3.5 Flash. Google has not published a fresh AI-Overviews-specific default statement, and it states plainly that AI Overviews and AI Mode may use different models. So this entry reports the last explicit vendor default (Gemini 3) alongside the merged-flow reality (Gemini 3.5 Flash) rather than asserting one. Google also never labels which model wrote a given answer - routing is server-side and per query - so any single-answer model claim is unsupported.",
  "citations": [
   {
    "title": "Google Search's I/O 2026 updates: AI agents and more | blog.google",
    "url": "https://blog.google/products-and-platforms/products/search/search-io-2026/",
    "date": "2026-05-19",
    "kind": "vendor",
    "quote": "Starting today, we're upgrading Search with Gemini 3.5 Flash - our newest Flash model delivering sustained frontier performance for agents and coding - as the new default model in AI Mode for everyone globally."
   },
   {
    "title": "Just ask anything: a seamless new Search experience | blog.google (Robby Stein, VP Product)",
    "url": "https://blog.google/products-and-platforms/products/search/ai-mode-ai-overviews-updates/",
    "date": "2026-01-27",
    "kind": "vendor",
    "quote": "First, we're making Gemini 3 the new default model for AI Overviews globally, so you get a best-in-class AI response right on the search results page, for questions where it's helpful."
   },
   {
    "title": "Gemini 3.5: frontier intelligence with action | blog.google",
    "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/",
    "date": "2026-05-19",
    "kind": "vendor",
    "quote": "3.5 Flash is now the default model for the Gemini app and AI Mode in Search globally."
   },
   {
    "title": "Introducing Gemini 3.6 Flash, 3.5 Flash-Lite, and 3.5 Flash Cyber | blog.google",
    "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/",
    "date": "2026-07-21",
    "kind": "vendor",
    "quote": "3.5 Flash-Lite is also rolling out in Google Search."
   },
   {
    "title": "Get AI-powered responses with AI Mode in Google Search | Google Search Help",
    "url": "https://support.google.com/websearch/answer/16011537?hl=en",
    "date": "2026-11-07",
    "kind": "vendor",
    "quote": "You can use 4 Argon in AI Mode by selecting it from the menu in the \"Ask anything\" bar. The \"Auto\" or \"Fast\" model in AI Mode will continue to be helpful for fast, all-around assistance on most questions."
   },
   {
    "title": "Google for Health - Improving Access to Health Information",
    "url": "https://health.google/products/",
    "date": "2026-11-07",
    "kind": "vendor",
    "quote": "We're able to bring more helpful health results in Search through advanced AI and health-focused advancements on Gemini models. This technology helps make features like AI Overviews more comprehensive, relevant, and clinically factual. For your most complex health questions, jump into AI Mode - a tab in Search."
   },
   {
    "title": "We're sharing our framework for building safer and more helpful AI for health | blog.google",
    "url": "https://blog.google/innovation-and-ai/technology/health/evaluating-health-ai-at-scale/",
    "date": "2026-11-04",
    "kind": "vendor",
    "quote": "The framework evaluates models across three areas: accuracy, safety, and usefulness. It combines closed-question benchmarks, autoraters, and expert human review to assess common and high-risk health scenarios."
   }
  ],
  "alternatives": [
   {
    "model": "Gemini 3",
    "note": "the last explicit vendor default for AI Overviews (Jan 27, 2026)",
    "url": "https://blog.google/products-and-platforms/products/search/ai-mode-ai-overviews-updates/",
    "date": "2026-01-27"
   },
   {
    "model": "Gemini 3.5 Flash-Lite",
    "note": "routing some high-volume Search queries since July 2026",
    "url": "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-6-flash-3-5-flash-lite-3-5-flash-cyber/",
    "date": "2026-07-21"
   }
  ]
 }
];
