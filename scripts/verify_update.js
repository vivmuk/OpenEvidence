const fs = require('fs');
const base = '/home/vivgates/OpenEvidence/data';

function extract(src, varname) {
  const m = src.match(new RegExp('var ' + varname + 'Data\\s*=\\s*(\\s*\\[[\\s\\S]*\\]\\s*);;\\s*$'));
  return m ? new Function('return ' + m[1])() : null;
}

const t = extract(fs.readFileSync(base + '/emergingTrends.js', 'utf8'), 'emergingTrends');
const tl = extract(fs.readFileSync(base + '/globalTimeline.js', 'utf8'), 'globalTimeline');
const mx = extract(fs.readFileSync(base + '/globalMatrix.js', 'utf8'), 'globalMatrix');

console.log('COUNTS -> trends:', t.length, ' timeline:', tl.length, ' matrix:', mx.length);

const newTools = [
  'DxPro (DxCheck)', 'Hela', 'ZenMD', 'OpenInsight', 'Nigel (AGA)',
  'Platform24 AI Triage', 'LaennecAI Zorgm Pro', 'GC MediAI Uisarang AI', 'Nemedic useBlue.ai'
];

console.log('in trends:  ', newTools.filter(x => t.some(e => e.name === x)).length, '/9');
console.log('in matrix:  ', newTools.filter(x => mx.some(e => e.platform === x)).length, '/9');
console.log('in timeline:', newTools.filter(x => tl.some(e => e.title && e.title.includes(x))).length, '/9');

const vera = t.find(e => e.name === 'Vera Health');
const hippo = t.find(e => e.name === 'Hippocratic AI');
console.log('Vera metric:', vera.metric, '| has 190 countries:', vera.desc.includes('190 countries'), '| has \$32M:', vera.desc.includes('32M'));
console.log('Hippocratic has Polaris 6 Ultra:', hippo.desc.includes('Polaris 6 Ultra'));

const allSrc = newTools.every(x => {
  const e = t.find(e => e.name === x);
  return Boolean(e && e.url && e.url.startsWith('http'));
});
console.log('all new trend entries have http source URL:', allSrc);

const allMat = newTools.every(x => mx.some(e => e.platform === x));
console.log('all new matrix entries present:', allMat);

// Every new entry must have a valid source URL (task requirement)
const missingUrl = t.filter(e => newTools.includes(e.name)).filter(e => !e.url || !e.url.startsWith('http'));
console.log('new trend entries missing http URL:', missingUrl.length);
