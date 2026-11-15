const KEY = 'ai-explorer.learning.v1';
let fallback = {};

export function readProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { opened: {}, completed: {}, scores: {} };
    const data = JSON.parse(raw);
    return { opened: data.opened || {}, completed: data.completed || {}, scores: data.scores || {} };
  } catch {
    return { opened: fallback.opened || {}, completed: fallback.completed || {}, scores: fallback.scores || {} };
  }
}
export function writeProgress(data) {
  fallback = data;
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* nonpersistent mode */ }
}
export function markOpened(id) {
  const data = readProgress();
  if (!data.opened[id]) {
    data.opened[id] = true;
    writeProgress(data);
  }
}
export function setCompleted(id, value) {
  const data = readProgress();
  if (value) data.completed[id] = true;
  else delete data.completed[id];
  writeProgress(data);
}
export function saveScore(key, correct, total) {
  const data = readProgress();
  const previous = data.scores[key];
  if (!previous || correct / total > previous.correct / previous.total) {
    data.scores[key] = { correct, total, savedAt: new Date().toISOString() };
    writeProgress(data);
  }
}
