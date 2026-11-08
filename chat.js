/* OpenEvidence Insights — semantic chat.
 *
 * Everything runs in the browser: the query is embedded with a small local
 * model (all-MiniLM-L6-v2), matched against a prebuilt corpus of every
 * passage the tracker has collected, and the answer is composed from the
 * passages that actually match. No API key, no server round trip, and
 * nothing is invented — every claim links back to where it came from.
 *
 * The corpus vectors were built with the same model, so the query and the
 * corpus share one vector space.
 */
(function () {
  'use strict';

  var MODEL_ID = 'Xenova/all-MiniLM-L6-v2';
  var CDN = 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';

  var state = {
    embedder: null,
    loading: false,
    corpus: null,
    vectors: null,
    rows: null,
    ready: false,
    history: []
  };

  var el = {};
  var SUGGESTED = [
    'What is OpenEvidence and how big is it?',
    'Which model does Abridge actually use?',
    'What is the latest on OpenEvidence?',
    'Who are OpenEvidence\'s competitors?',
    'What did the FDA decide about AI medical devices?',
    'How does Doximity Ask work?',
    'What are the risks of AI hallucination in medicine?',
    'What is the evidence for ambient AI scribes?'
  ];

  /* ------------------------------------------------------------- helpers */

  function esc(s) {
    return String(s === null || s === undefined ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function $(sel, root) { return (root || document).querySelector(sel); }

  /* ------------------------------------------------------------ retrieval */

  function decodeVectors() {
    if (state.rows) return state.rows;
    var v = state.vectors;
    var bin = atob(v.v);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    var flat = new Int8Array(bytes.buffer);
    var rows = [];
    for (var r = 0; r < v.n; r++) {
      var row = new Float32Array(v.d);
      var scale = v.s[r];
      var off = r * v.d;
      for (var j = 0; j < v.d; j++) row[j] = flat[off + j] * scale;
      rows.push(row);
    }
    state.rows = rows;
    return rows;
  }

  function search(queryVec, limit) {
    var rows = decodeVectors();
    var corpus = state.corpus;
    var scored = [];
    for (var i = 0; i < rows.length; i++) {
      var dot = 0;
      var a = rows[i], b = queryVec;
      for (var j = 0; j < a.length; j++) dot += a[j] * b[j];
      scored.push({ i: i, score: dot });
    }
    scored.sort(function (x, y) { return y.score - x.score; });
    return scored.slice(0, limit || 40).map(function (s) {
      var p = corpus[s.i];
      return { score: s.score, passage: p };
    });
  }

  /* -------------------------------------------------- answer composition */

  var STOP = new Set(('a an the of and or to in for on with is are was were be been being by at from as it its ' +
    'this that these those what which who whom whose when where why how do does did doing done have has had ' +
    'i you he she they we me my your our their his her not no yes can could would should will shall may might ' +
    'must about into over under again more most some such only own same so than too very just also').split(' '));

  function terms(q) {
    return q.toLowerCase().replace(/[^a-z0-9\s.-]/g, ' ').split(/\s+/)
      .filter(function (t) { return t.length > 2 && !STOP.has(t); });
  }

  /** Split a passage body into sentences. */
  function sentences(text) {
    return String(text).split(/(?<=[.!?])\s+(?=[A-Z0-9])/).map(function (s) { return s.trim(); })
      .filter(function (s) { return s.length > 30; });
  }

  /** Score a sentence against the query terms. */
  function scoreSentence(s, ts) {
    var low = s.toLowerCase();
    var score = 0;
    for (var i = 0; i < ts.length; i++) {
      if (low.indexOf(ts[i]) !== -1) score += 1 + (ts[i].length > 5 ? 0.5 : 0);
    }
    return score / Math.max(1, ts.length);
  }

  /**
   * Build an answer from the retrieved passages.
   *
   * This is extractive on purpose. The corpus is the site's own tracked data,
   * so the honest answer is the best-matching evidence, composed from the
   * sentences that actually answer the question - not a generated summary
   * that might invent a number.
   */
  function compose(results, query) {
    var ts = terms(query);
    var top = results.slice(0, 6);
    if (!top.length) return null;

    // Best sentence across the top passages.
    var best = null;
    top.forEach(function (r) {
      sentences(r.passage.text).forEach(function (s) {
        var sc = scoreSentence(s, ts) + r.score * 0.35;
        if (!best || sc > best.score) best = { score: sc, sentence: s, from: r };
      });
    });

    // Supporting sentences from the other strong passages.
    var supporting = [];
    var seen = new Set();
    if (best) seen.add(best.sentence.slice(0, 60));
    top.forEach(function (r) {
      if (supporting.length >= 3) return;
      sentences(r.passage.text).forEach(function (s) {
        if (supporting.length >= 3) return;
        var sc = scoreSentence(s, ts);
        if (sc <= 0) return;
        var key = s.slice(0, 60);
        if (seen.has(key)) return;
        seen.add(key);
        supporting.push({ sentence: s, from: r, score: sc });
      });
    });
    supporting.sort(function (a, b) { return b.score - a.score; });
    supporting = supporting.slice(0, 3);

    // Deduplicate the primary result set by page+title for the source list.
    var uniq = [];
    var keys = new Set();
    results.slice(0, 12).forEach(function (r) {
      var k = r.passage.page + '|' + r.passage.title;
      if (keys.has(k)) return;
      keys.add(k);
      uniq.push(r);
    });

    return {
      lead: best ? best.sentence : top[0].passage.text.slice(0, 320),
      leadFrom: best ? best.from : top[0],
      supporting: supporting,
      sources: uniq.slice(0, 6),
      topScore: top[0].score
    };
  }

  /* ------------------------------------------------------------- rendering */

  function renderMessage(role, html) {
    var wrap = document.createElement('div');
    wrap.className = 'oe-chat-msg oe-chat-' + role;
    wrap.innerHTML = html;
    el.log.appendChild(wrap);
    el.log.scrollTop = el.log.scrollHeight;
    return wrap;
  }

  function sourceChip(p) {
    var href = p.url || p.page;
    var label = p.url ? p.org || p.title : (p.org ? p.org + ' — ' + p.title : p.title);
    var inner = '<span class="oe-chat-chip">' + esc(p.kind) + '</span>' +
      '<span class="oe-chat-chip-title">' + esc(label.slice(0, 70)) + '</span>' +
      (p.date ? '<span class="oe-chat-chip-date">' + esc(p.date) + '</span>' : '');
    return '<a class="oe-chat-source" href="' + esc(href) + '" target="_blank" rel="noopener">' + inner + '</a>';
  }

  function answerHtml(q, a) {
    var h = '';
    if (a) {
      h += '<div class="oe-chat-answer">';
      h += '<p class="oe-chat-lead">' + esc(a.lead) + '</p>';
      if (a.leadFrom) {
        h += '<div class="oe-chat-lead-src">' + sourceChip(a.leadFrom.passage) + '</div>';
      }
      if (a.supporting.length) {
        h += '<ul class="oe-chat-support">';
        a.supporting.forEach(function (s) {
          h += '<li>' + esc(s.sentence) + '</li>';
        });
        h += '</ul>';
      }
      h += '</div>';
      if (a.sources.length) {
        h += '<div class="oe-chat-sources"><div class="oe-chat-sources-h">Sources on this site</div>';
        a.sources.forEach(function (r) { h += sourceChip(r.passage); });
        h += '</div>';
      }
    } else {
      h += '<div class="oe-chat-answer"><p class="oe-chat-lead">Nothing in the tracker matches that yet. ' +
        'Try a broader phrasing, or browse the <a href="timeline">timeline</a> and ' +
        '<a href="publications">publications</a>.</p></div>';
    }
    return h;
  }

  /* ------------------------------------------------------------ chat logic */

  function setBusy(on) {
    state.loading = on;
    el.send.disabled = on;
    el.hint.textContent = on ? 'Thinking…' : '';
  }

  function ask(question) {
    if (!question || !question.trim()) return;
    var q = question.trim();
    state.history.push({ role: 'user', text: q });
    renderMessage('user', '<div class="oe-chat-bubble">' + esc(q) + '</div>');

    var pending = renderMessage('bot', '<div class="oe-chat-typing"><i></i><i></i><i></i></div>');

    ensureCorpus()
      .then(function () { return ensureEmbedder(); })
      .then(function (embedder) {
        return embedder([q], { pooling: 'mean', normalize: true }).then(function (out) {
          var vec = out.tolist()[0];
          return search(vec, 40);
        });
      }).then(function (results) {
      var answer = compose(results, q);
      state.history.push({ role: 'bot', text: answer && answer.lead ? answer.lead : '' });
      pending.innerHTML = answerHtml(q, answer);
      setBusy(false);
      el.input.focus();
    }).catch(function (e) {
      pending.innerHTML = '<div class="oe-chat-answer"><p class="oe-chat-lead">The search model could not load, so I cannot search right now. ' +
        'The corpus itself still works — browse the <a href="timeline">timeline</a> or <a href="publications">publications</a>.</p></div>';
      setBusy(false);
    });
  }

  var embedPromise = null;
  function ensureEmbedder() {
    if (state.embedder) return Promise.resolve(state.embedder);
    if (embedPromise) return embedPromise;
    setBusy(true);
    if (el.hint) el.hint.textContent = 'Loading the search model (one time, ~22 MB)…';
    // transformers.js ships as an ES module, so it has to be imported rather
    // than dropped in with a <script> tag.
    embedPromise = import(/* webpackIgnore: true */ CDN + '/dist/transformers.min.js')
      .then(function (mod) {
        var pipeline = mod.pipeline || (mod.default && mod.default.pipeline);
        if (!pipeline) throw new Error('transformers.js loaded without a pipeline export');
        // Point the library at Hugging Face explicitly. Left at its default it
        // tries a relative /models/... path first, which on this static server
        // returns the SPA's HTML page - and the library then fails trying to
        // parse that HTML as JSON.
        if (mod.env) {
          mod.env.allowLocalModels = false;
          mod.env.useBrowserCache = true;
          mod.env.remoteHost = 'https://huggingface.co/';
          mod.env.remotePathTemplate = '{model}/resolve/{revision}/';
        }
        return pipeline('feature-extraction', MODEL_ID, { quantized: true });
      })
      .then(function (p) { state.embedder = p; return p; });
    return embedPromise;
  }

  /* ------------------------------------------------------------------ UI */

  /**
   * The corpus is ~2.7 MB, so it is fetched only when the chat is actually
   * opened — never on page load.
   */
  function ensureCorpus() {
    if (state.ready) return Promise.resolve();
    return loadCorpus();
  }

  function buildUI() {
    var wrap = document.createElement('div');
    wrap.className = 'oe-chat';
    wrap.innerHTML =
      '<button class="oe-chat-launcher" aria-label="Open the tracker assistant" title="Ask the tracker (press /)">' +
        '<span class="oe-chat-launcher-icon">✦</span></button>' +
      '<div class="oe-chat-panel" aria-hidden="true">' +
        '<div class="oe-chat-head">' +
          '<div class="oe-chat-head-t"><span class="oe-chat-dot"></span>Ask the tracker</div>' +
          '<button class="oe-chat-close" aria-label="Close">✕</button>' +
        '</div>' +
        '<div class="oe-chat-log" id="oeChatLog"></div>' +
        '<div class="oe-chat-suggest" id="oeChatSuggest"></div>' +
        '<form class="oe-chat-form">' +
          '<input class="oe-chat-input" id="oeChatInput" type="text" autocomplete="off" ' +
            'placeholder="Ask anything the tracker has collected…" aria-label="Your question">' +
          '<button class="oe-chat-send" id="oeChatSend" type="submit" aria-label="Send">→</button>' +
        '</form>' +
        '<div class="oe-chat-hint" id="oeChatHint"></div>' +
      '</div>';
    document.body.appendChild(wrap);

    el.launcher = $('.oe-chat-launcher', wrap);
    el.panel = $('.oe-chat-panel', wrap);
    el.log = $('#oeChatLog', wrap);
    el.input = $('#oeChatInput', wrap);
    el.send = $('#oeChatSend', wrap);
    el.hint = $('#oeChatHint', wrap);
    el.suggest = $('#oeChatSuggest', wrap);

    function open() {
      el.panel.classList.add('open');
      el.panel.setAttribute('aria-hidden', 'false');
      el.launcher.classList.add('hidden');
      ensureCorpus().catch(function () { /* ask() reports it */ });
      if (!el.suggest.childElementCount) {
        SUGGESTED.forEach(function (s) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'oe-chat-suggestion';
          b.textContent = s;
          b.addEventListener('click', function () { el.input.value = s; ask(s); });
          el.suggest.appendChild(b);
        });
      }
      if (!el.log.childElementCount) {
        renderMessage('bot',
          '<div class="oe-chat-answer"><p class="oe-chat-lead">I can search everything this tracker has collected — ' +
          'timelines, competitors, models, benchmarks, publications, regulation and patient-facing apps — and answer ' +
          'with the sources attached. Every answer links back to where it came from.</p>' +
          '<p class="oe-chat-lead">Try one of the suggestions below.</p></div>');
      }
      setTimeout(function () { el.input.focus(); }, 120);
    }
    function close() {
      el.panel.classList.remove('open');
      el.panel.setAttribute('aria-hidden', 'true');
      el.launcher.classList.remove('hidden');
    }

    el.launcher.addEventListener('click', open);
    $('.oe-chat-close', wrap).addEventListener('click', close);
    $('.oe-chat-form', wrap).addEventListener('submit', function (e) {
      e.preventDefault();
      var v = el.input.value;
      el.input.value = '';
      ask(v);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && el.panel.classList.contains('open')) close();
      if (e.key === '/' && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault(); open();
      }
    });
  }

  function loadCorpus() {
    if (state.corpusPromise) return state.corpusPromise;
    state.corpusPromise = Promise.all([
      fetch('data/chatCorpus.js').then(function (r) { return r.text(); }),
      fetch('data/chatVectors.js').then(function (r) { return r.text(); })
    ]).then(function (texts) {
      // The generated files declare a top-level `var`, which is function-scoped
      // inside new Function() — so return it explicitly rather than hoping it
      // lands on an exports object.
      state.corpus = new Function(texts[0] + '\n;return chatCorpusData;')();
      state.vectors = new Function(texts[1] + '\n;return chatVectorsData;')();
      state.ready = true;
    });
    return state.corpusPromise;
  }

  function init() {
    if (document.getElementById('oeChatInput')) return; // already built
    buildUI();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.oeChat = { ask: ask, open: function () { $('.oe-chat-launcher').click(); } };
})();
