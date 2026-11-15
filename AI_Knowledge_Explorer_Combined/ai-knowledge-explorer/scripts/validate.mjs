import fs from 'node:fs';
import { ABS, CATEGORIES, SECTION_NAMES, getArticles, listFiles, makeIndex, readJson } from './content-utils.mjs';

const errors = [];
const warn = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };
const word = value => typeof value === 'string' && value.trim().length > 0;
const kebab = value => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
const arrayOfWords = value => Array.isArray(value) && value.every(word);
const isoDate = value => word(value) && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
const uniques = (xs, prefix) => {
  const seen = new Set();
  for (const x of xs) {
    assert(!seen.has(x), `${prefix}: 重複 ID ${x}`);
    seen.add(x);
  }
};
const readSafe = file => {
  try { return readJson(file); }
  catch (error) { errors.push(`${file}: JSON 無法讀取 (${error.message})`); return null; }
};
let articles = [];
try { articles = getArticles(); }
catch (error) { errors.push(`Markdown 解析失敗：${error.message}`); }
const articleMap = new Map(articles.map(a => [a.meta.id, a]));
uniques(articles.map(a => a.meta.id), '文章');
assert(articles.length >= 1, '至少需有一篇知識文章');

let pathData = readSafe('learning-paths/main.json');
let sources = readSafe('sources/sources.json');
if (!Array.isArray(sources)) { errors.push('sources/sources.json 必須為陣列'); sources = []; }
uniques(sources.map(s=>s.source_id), '來源');
const sourceMap = new Map(sources.map(s=>[s.source_id,s]));

for (const s of sources) {
  const prefix = `來源 ${s.source_id}`;
  assert(kebab(s.source_id), `${prefix}: source_id 不合法`);
  for (const k of ['title','author','type','url','status']) assert(word(s[k]), `${prefix}: 缺少 ${k}`);
  assert(typeof s.url === 'string' && /^https:\/\//.test(s.url), `${prefix}: 來源網址需為 HTTPS`);
  assert(['verified','pending','disputed'].includes(s.status), `${prefix}: status 不合法`);
  assert(s.published_at === null || isoDate(s.published_at), `${prefix}: published_at 應為日期或 null`);
  assert(isoDate(s.collected_at), `${prefix}: collected_at 日期不合法`);
  assert(arrayOfWords(s.related_articles), `${prefix}: related_articles 必須是字串陣列`);
  for (const id of (Array.isArray(s.related_articles) ? s.related_articles : []))
    assert(articleMap.has(id), `${prefix}: 相關文章不存在 ${id}`);
  if (s.status !== 'verified') warn.push(`${prefix} 尚未完成查證`);
}
const stages = Array.isArray(pathData?.stages) ? pathData.stages : [];
assert(stages.length === 5, '推薦學習路線必須有五個階段');
uniques(stages.map(s=>s.id), '階段');
const stageItems = [];
for (let i=0; i<stages.length; i++) {
  const s = stages[i];
  assert(s.number === i+1, `學習階段 ${s.id}: number 必須從 1 連續到 5`);
  assert(word(s.title) && word(s.description), `學習階段 ${s.id}: 缺少標題或說明`);
  assert(arrayOfWords(s.article_ids) && s.article_ids.length > 0, `學習階段 ${s.id}: 缺少文章 ID`);
  for (const id of s.article_ids || []) {
    stageItems.push(id);
    assert(articleMap.has(id), `學習階段 ${s.id}: 文章不存在 ${id}`);
    assert(articleMap.get(id)?.meta.stage === s.number, `學習階段 ${s.id}: 文章 ${id} 的 stage 不一致`);
  }
}
uniques(stageItems, '學習路線文章');

const required = ['id','title','category','difficulty','stage','summary','minutes','interaction_id','quiz_id','related','sources','updated_at'];
const allQuestionIds = [];
for (const {meta: a, body, file, categoryFolder} of articles) {
  const prefix = `${file}`;
  for (const key of required) assert(Object.hasOwn(a, key), `${prefix}: 缺少中繼資料 ${key}`);
  assert(kebab(a.id), `${prefix}: id 必須是英文 kebab-case`);
  assert(file === `wiki/${a.category}/${a.id}.md`, `${prefix}: 分類、檔名與 id 不一致`);
  assert(categoryFolder === a.category && a.category in CATEGORIES, `${prefix}: 分類無效`);
  assert(word(a.title) && word(a.summary), `${prefix}: 標題或摘要為空`);
  assert(['入門','進階'].includes(a.difficulty), `${prefix}: 難度無效`);
  assert(Number.isInteger(a.stage) && a.stage >= 1 && a.stage <= 5, `${prefix}: 學習階段無效`);
  assert(Number.isInteger(a.minutes) && a.minutes > 0, `${prefix}: 閱讀時間無效`);
  assert(a.interaction_id === a.id && a.quiz_id === a.id, `${prefix}: 卡片／題庫 ID 必須與文章一致`);
  assert(arrayOfWords(a.related), `${prefix}: related 必須為字串陣列`);
  assert(arrayOfWords(a.sources) && a.sources.length > 0, `${prefix}: sources 必須包含來源 ID`);
  assert(isoDate(a.updated_at), `${prefix}: updated_at 日期格式無效`);
  const headings = [...body.matchAll(/^##\s+(.+)\s*$/gm)].map(m => m[1].trim());
  assert(JSON.stringify(headings) === JSON.stringify(SECTION_NAMES), `${prefix}: 八個二級標題名稱或順序不正確`);
  const sections = [...body.matchAll(/^##\s+(.+)\s*$/gm)];
  for(let i=0; i<sections.length; i++) {
    const start = sections[i].index + sections[i][0].length;
    const end = sections[i+1]?.index ?? body.length;
    assert(body.slice(start,end).trim().length > 0, `${prefix}: 「${headings[i]}」內容不可為空`);
  }
  for (const id of Array.isArray(a.related) ? a.related : []) {
    assert(id !== a.id, `${prefix}: related 不能連結自己`);
    assert(articleMap.has(id), `${prefix}: related 指向不存在的 ${id}`);
  }
  for (const id of Array.isArray(a.sources) ? a.sources : [])
    assert(sourceMap.has(id), `${prefix}: 來源 ID 不存在 ${id}`);
  assert(stageItems.includes(a.id), `${prefix}: 文章未納入學習路線`);
  const interaction = readSafe(`interactions/${a.id}.json`);
  if (interaction) {
    const p = `互動 ${a.id}`;
    assert(interaction.id === a.id && interaction.article_id === a.id, `${p}: ID 不一致`);
    assert(['flashcard','step-flow','comparison'].includes(interaction.type), `${p}: type 不支援`);
    if (interaction.type === 'flashcard') {
      for(const k of ['question','answer','explanation']) assert(word(interaction[k]), `${p}: ${k} 不可為空`);
    }
    if (interaction.type === 'step-flow') {
      assert(word(interaction.title), `${p}: 缺少 title`);
      assert(Array.isArray(interaction.steps) && interaction.steps.length >= 2, `${p}: 至少需要兩個步驟`);
      for(const step of interaction.steps || []) assert(word(step.title) && word(step.description), `${p}: 步驟標題與說明不可為空`);
    }
    if (interaction.type === 'comparison') {
      assert(word(interaction.title) && word(interaction.conclusion), `${p}: 缺少標題或結論`);
      for(const k of ['option_a','option_b'])
        assert(word(interaction[k]?.label) && word(interaction[k]?.description), `${p}: ${k} 必須有名稱與說明`);
    }
  }
  const quiz = readSafe(`quizzes/${a.id}.json`);
  if (quiz) {
    const p = `測驗 ${a.id}`;
    assert(quiz.id === a.id && quiz.article_id === a.id, `${p}: ID 不一致`);
    assert(Number.isInteger(quiz.version) && quiz.version > 0, `${p}: 版本無效`);
    assert(Array.isArray(quiz.questions) && quiz.questions.length === 3, `${p}: 必須恰好三題`);
    for (const q of quiz.questions || []) {
      allQuestionIds.push(q.question_id);
      assert(kebab(q.question_id) && q.article_id === a.id, `${p}: 題目 ID 或 article_id 無效`);
      assert(q.version === quiz.version, `${p}: 題目版本不一致`);
      assert(word(q.question) && word(q.explanation), `${p}: 題幹及解析不可空白`);
      assert(Array.isArray(q.options) && q.options.length === 4 && q.options.every(word), `${p}: 必須是四個非空選項`);
      assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3, `${p}: 正確答案必須是 0～3`);
    }
  }
}
uniques(allQuestionIds, '測驗題目');
for (const folder of ['interactions','quizzes']) {
  for (const name of listFiles(folder).filter(name => name.endsWith('.json')))
    assert(articleMap.has(name.slice(0,-5)), `${folder}/${name}: 找不到相對應文章`);
}
const indexFile = ABS('wiki/index.md');
assert(fs.existsSync(indexFile), '缺少 wiki/index.md，請先執行 npm run index');
if (fs.existsSync(indexFile)) {
  assert(fs.readFileSync(indexFile,'utf8') === makeIndex(articles), 'wiki/index.md 與文章資料不同步，請執行 npm run index');
}
assert(fs.existsSync(ABS('wiki/log.md')), '缺少 wiki/log.md');
for (const msg of warn) console.log(`注意：${msg}`);
if (errors.length) {
  console.error(`\n✗ 發現 ${errors.length} 個資料問題：`);
  errors.forEach(msg => console.error(`  - ${msg}`));
  process.exitCode = 1;
} else {
  console.log(`\n✓ 資料檢查通過：${articles.length} 篇文章、${allQuestionIds.length} 題、${sources.length} 筆來源、${stages.length} 個學習階段。`);
  if (warn.length) console.log(`  ${warn.length} 筆來源仍待人工查證；通過的是資料結構檢查，並非內容事實查證。`);
}
