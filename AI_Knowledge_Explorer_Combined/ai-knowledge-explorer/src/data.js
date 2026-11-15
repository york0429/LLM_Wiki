import learningPath from '../learning-paths/main.json';
import sources from '../sources/sources.json';

const rawArticles = import.meta.glob('../wiki/{basics,generative-ai,techniques,applications,safety}/*.md', { query: '?raw', import: 'default', eager: true });
const allInteractions = import.meta.glob('../interactions/*.json', { eager: true, import: 'default' });
const allQuizzes = import.meta.glob('../quizzes/*.json', { eager: true, import: 'default' });

export const categoryInfo = {
  basics: { name: 'AI 基礎知識', icon: '✦', description: '從零開始理解人工智慧與機器學習。' },
  'generative-ai': { name: '生成式 AI', icon: '✧', description: '探索 LLM 與內容生成的基本概念。' },
  techniques: { name: 'AI 核心技術', icon: '⌘', description: '透過範例學習 Prompt、RAG 等方法。' },
  applications: { name: 'AI 工具與應用', icon: '◇', description: '認識 Agent、聊天機器人與實際情境。' },
  safety: { name: 'AI 安全與未來', icon: '◈', description: '建立可靠且注意隱私的 AI 使用習慣。' },
};
export const stages = learningPath.stages;
export const sourceById = Object.fromEntries(sources.map(s => [s.source_id, s]));

export function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw new Error('缺少 YAML frontmatter');
  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('[') || value.startsWith('"')) {
      try { value = JSON.parse(value); } catch { /* keep literal */ }
    } else if (/^\d+$/.test(value)) {
      value = Number(value);
    }
    meta[key] = value;
  }
  return { meta, body: text.slice(match[0].length).trim() };
}

function splitSections(body) {
  const map = {};
  const regex = /^## (.+)\r?\n/gm;
  const matches = Array.from(body.matchAll(regex));
  matches.forEach((match, idx) => {
    const start = match.index + match[0].length;
    const end = matches[idx + 1]?.index ?? body.length;
    map[match[1].trim()] = body.slice(start, end).trim();
  });
  return map;
}

export const articles = Object.entries(rawArticles).map(([path, markdown]) => {
  const { meta, body } = parseFrontmatter(markdown);
  const sections = splitSections(body);
  const interaction = allInteractions[`../interactions/${meta.interaction_id}.json`];
  const quiz = allQuizzes[`../quizzes/${meta.quiz_id}.json`];
  return { ...meta, body, sections, path, interaction, quiz, categoryName: categoryInfo[meta.category]?.name ?? meta.category };
}).sort((a, b) => a.stage - b.stage || a.title.localeCompare(b.title, 'zh-Hant'));

export const articleById = Object.fromEntries(articles.map(article => [article.id, article]));
export const categoryOrder = Object.keys(categoryInfo);

export function getStage(article) {
  return stages.find(stage => stage.number === article.stage);
}

export function getStageArticles(stage) {
  return stage.article_ids.map(id => articleById[id]).filter(Boolean);
}
