import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(import.meta.dirname, '..');
export const CATEGORIES = {
  basics: 'AI 基礎知識',
  'generative-ai': '生成式 AI',
  techniques: 'AI 核心技術',
  applications: 'AI 工具與應用',
  safety: 'AI 安全與未來',
};
export const SECTION_NAMES = [
  '概念介紹', '運作原理', '生活應用範例', '互動探索',
  '知識重點整理', '知識小測驗', '延伸閱讀', '參考資料',
];
export const ABS = relative => path.join(ROOT, relative);
export const readJson = relative => JSON.parse(fs.readFileSync(ABS(relative), 'utf8'));
export const listFiles = folder => fs.existsSync(ABS(folder))
  ? fs.readdirSync(ABS(folder)).sort().filter(name => fs.statSync(ABS(`${folder}/${name}`)).isFile())
  : [];
export function parseArticle(text, file) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw Error(`${file}: 缺少 YAML Frontmatter`);
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const index = line.indexOf(':');
    if (index < 0) throw Error(`${file}: 無法辨識欄位 ${line}`);
    const key = line.slice(0, index).trim();
    const raw = line.slice(index + 1).trim();
    if (!/^[a-z][a-z0-9_]*$/.test(key) || key in meta) throw Error(`${file}: 欄位名稱不合法或重複 ${key}`);
    if (raw.startsWith('[') || raw.startsWith('"')) {
      try { meta[key] = JSON.parse(raw); }
      catch { throw Error(`${file}: 欄位 ${key} 請使用有效 JSON 字串或陣列`); }
    } else {
      meta[key] = /^\d+$/.test(raw) ? Number(raw) : raw;
    }
  }
  return { meta, body: text.slice(match[0].length).trim(), file };
}
export function getArticles() {
  return Object.keys(CATEGORIES).flatMap(category =>
    listFiles(`wiki/${category}`).filter(name => name.endsWith('.md')).map(name => {
      const file = `wiki/${category}/${name}`;
      return { ...parseArticle(fs.readFileSync(ABS(file), 'utf8'), file), categoryFolder: category };
    })
  );
}
export function makeIndex(articles) {
  const latest = articles.map(a => String(a.meta.updated_at)).filter(v => /^\d{4}-\d{2}-\d{2}$/.test(v)).sort().at(-1) || '未知';
  let result = `# AI 知識索引\n\n> 依分類整理 Wiki 文章；文章最新修改日期：${latest}。\n\n`;
  for (const [category, label] of Object.entries(CATEGORIES)) {
    result += `## ${label}\n\n`;
    const selected = articles.filter(a => a.meta.category === category).sort((a,b) => a.meta.id.localeCompare(b.meta.id));
    for (const a of selected) result += `- [${a.meta.title}](${category}/${a.meta.id}.md) — ${a.meta.summary}\n`;
    result += '\n';
  }
  return result;
}
