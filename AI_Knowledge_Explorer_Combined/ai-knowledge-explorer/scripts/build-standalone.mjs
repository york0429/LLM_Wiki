/**
 * Offline preview builder. No third-party packages or live service required.
 * Vite remains the primary development tool; this produces a portable copy for review.
 */
import fs from 'node:fs';
import path from 'node:path';
import { ABS, getArticles, readJson } from './content-utils.mjs';

const output = ABS('dist-local');
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
const entries = getArticles();
const allInteractions = {};
const allQuizzes = {};
const rawArticles = {};
for (const article of entries) {
  const id = article.meta.id;
  rawArticles[`../${article.file}`] = fs.readFileSync(ABS(article.file), 'utf8');
  allInteractions[`../interactions/${id}.json`] = readJson(`interactions/${id}.json`);
  allQuizzes[`../quizzes/${id}.json`] = readJson(`quizzes/${id}.json`);
}
const dataSource = fs.readFileSync(ABS('src/data.js'), 'utf8')
  .replace(/^import learningPath from .*?;\s*$/m,'')
  .replace(/^import sources from .*?;\s*$/m,'')
  .replace(/^const rawArticles = import\.meta\.glob\([^\n]+\);\s*$/m,'')
  .replace(/^const allInteractions = import\.meta\.glob\([^\n]+\);\s*$/m,'')
  .replace(/^const allQuizzes = import\.meta\.glob\([^\n]+\);\s*$/m,'');
if (dataSource.includes('import.meta.glob')) throw Error('src/data.js glob 匯入有變化，請更新離線建置腳本');
const storageSource = fs.readFileSync(ABS('src/storage.js'), 'utf8');
const mainSource = fs.readFileSync(ABS('src/main.js'), 'utf8')
  .replace(/^import '\.\/styles\.css';\s*$/m,'')
  .replace(/^import \{[^\n]+\} from '\.\/data\.js';\s*$/m,'')
  .replace(/^import \{[^\n]+\} from '\.\/storage\.js';\s*$/m,'');
for (const [sourceName, value] of [['data',dataSource],['storage',storageSource],['main',mainSource]]) {
  if (/^import /m.test(value)) throw Error(`離線建置時 ${sourceName} 仍包含尚未處理的匯入`);
}
const prelude = `// 此檔案由 scripts/build-standalone.mjs 產生，請勿手動修改。\n`+
`const learningPath = ${JSON.stringify(readJson('learning-paths/main.json'))};\n`+
`const sources = ${JSON.stringify(readJson('sources/sources.json'))};\n`+
`const rawArticles = ${JSON.stringify(rawArticles)};\n`+
`const allInteractions = ${JSON.stringify(allInteractions)};\n`+
`const allQuizzes = ${JSON.stringify(allQuizzes)};\n`;
const script = `${prelude}\n${dataSource}\n${storageSource}\n${mainSource}`.replace(/^export\s+(?=(const|function)\b)/gm,'');
fs.writeFileSync(path.join(output,'app.js'), script);
fs.copyFileSync(ABS('src/styles.css'),path.join(output,'styles.css'));
const html = fs.readFileSync(ABS('index.html'), 'utf8')
  .replace('<script type="module" src="/src/main.js"></script>', '<link rel="stylesheet" href="./styles.css" />\n    <script defer src="./app.js"></script>');
if (!html.includes('./app.js')) throw Error('index.html 腳本標籤無法替換');
fs.writeFileSync(path.join(output,'index.html'),html);
console.log(`✓ 已建立離線預覽：dist-local/index.html（${entries.length} 篇文章）`);
