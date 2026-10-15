#!/usr/bin/env node
// Gate 1 length check: lead + the three questions (not the Stuck? line).
// Target 350, hard ceiling 361. Exits 1 if any prompt is over the ceiling.
const fs = require('fs'), vm = require('vm');
const TARGET = 350, CEIL = 361;
let bad = false, rows = [];
for (const f of fs.readdirSync('p').filter(x => x.endsWith('.html'))) {
  const s = fs.readFileSync('p/' + f, 'utf8');
  const m = s.match(/window\.PROMPT = (\{[\s\S]*?\n\});/);
  if (!m) continue;                       // placeholder page
  const P = vm.runInNewContext('(' + m[1] + ')');
  const g = P.g1;
  rows.push([P.n, P.name, g.lead.length + g.asks.reduce((a, q) => a + q.length, 0)]);
}
rows.sort((a, b) => a[0] - b[0]).forEach(([n, name, c]) => {
  const flag = c > CEIL ? 'OVER' : c > TARGET ? 'near' : 'ok';
  if (c > CEIL) bad = true;
  console.log(`Prompt ${String(n).padStart(2)} ${name.padEnd(28)} ${String(c).padStart(4)}  ${flag}`);
});
process.exit(bad ? 1 : 0);
