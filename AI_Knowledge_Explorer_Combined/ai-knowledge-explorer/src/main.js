import './styles.css';
import { articles, articleById, categoryInfo, categoryOrder, stages, sourceById, getStageArticles } from './data.js';
import { readProgress, markOpened, setCompleted, saveScore } from './storage.js';

const app = document.getElementById('app');
const state = { category: 'all', keyword: '', difficulty: 'all', learningTab: 'all', menuOpen: false, interaction: {}, quizSession: null };
const sectionTitles = ['概念介紹', '運作原理', '生活應用範例', '互動探索', '知識重點整理', '知識小測驗', '延伸閱讀', '參考資料'];
const htmlEscape = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const safeUrl = value => /^https:\/\//i.test(value || '') ? value : '';
const escapeAttr = htmlEscape;

function inlineMarkdown(raw) {
  const escaped = htmlEscape(raw);
  return escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
function contentHTML(raw = '') {
  return raw.split(/\n\s*\n/).map(block => {
    const lines = block.trim().split('\n');
    if (!block.trim()) return '';
    if (lines.every(line => /^[-*] /.test(line))) return `<ul class="prose-list">${lines.map(line=>`<li>${inlineMarkdown(line.replace(/^[-*] /,''))}</li>`).join('')}</ul>`;
    return `<p>${lines.map(inlineMarkdown).join('<br>')}</p>`;
  }).join('');
}
function route() {
  const hash = location.hash.startsWith('#/') ? location.hash.slice(2) : 'home';
  const [page = 'home', ...rest] = hash.split('/');
  return { page, id: decodeURIComponent(rest.join('/')) };
}
function percent(done,total) { return total ? Math.round(done / total * 100) : 0; }
function completedCount(ids, progress) { return ids.filter(id => progress.completed[id]).length; }
function totalDone(progress) { return articles.filter(a => progress.completed[a.id]).length; }
function scoreText(score) { return score ? `${score.correct}/${score.total}` : '尚未測驗'; }
function navHref(page) { return `#/${page}`; }
function currentArticle(id) { return articleById[id]; }
function cateBadge(category) { return `<span class="pill pill-light">${htmlEscape(categoryInfo[category]?.name || category)}</span>`; }
function statusBadge(article, progress) {
  if (progress.completed[article.id]) return '<span class="pill pill-done">✓ 已完成</span>';
  if (progress.opened[article.id]) return '<span class="pill pill-progress">閱讀中</span>';
  return '<span class="pill pill-muted">尚未開始</span>';
}
function progressBar(done,total,extra='') { return `<div class="progress-track ${extra}" role="progressbar" aria-valuenow="${percent(done,total)}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${percent(done,total)}%"></div></div>`; }
function card(article, progress, compact=false) {
  return `<a class="article-card ${compact?'article-card-compact':''}" href="#/article/${encodeURIComponent(article.id)}">
      <div class="card-header"><span class="pill pill-light">${htmlEscape(article.categoryName)}</span><span class="small-meta">${htmlEscape(article.minutes)} 分鐘</span></div>
      <div class="card-glyph" aria-hidden="true">${categoryInfo[article.category]?.icon || '✧'}</div>
      <h3>${htmlEscape(article.title)}</h3><p>${htmlEscape(article.summary)}</p>
      <div class="card-footer"><span class="small-meta">${htmlEscape(article.difficulty)} · 階段 ${article.stage}</span><span class="card-arrow" aria-hidden="true">↗</span></div>
    </a>`;
}
function header(page) {
  const links = [['home','首頁'],['explore','知識探索'],['path','學習路線'],['challenge','知識挑戰'],['learning','我的學習']];
  return `<header class="site-header"><div class="header-inner"><a class="brand" href="#/home" aria-label="AI Explorer 首頁"><span class="brand-mark">✦</span><span class="brand-type">AI <strong>Explorer</strong><small>知識探索百科</small></span></a>
      <nav class="header-nav ${state.menuOpen?'is-open':''}" aria-label="主要導覽">${links.map(([id,title])=>`<a href="#/${id}" class="${page===id?'is-active':''}" ${page===id?'aria-current="page"':''}>${title}</a>`).join('')}</nav>
      <div class="header-actions"><a class="search-shortcut" href="#/explore" aria-label="搜尋文章">⌕</a><button class="menu-toggle" type="button" data-action="toggle-menu" aria-expanded="${state.menuOpen}" aria-label="${state.menuOpen?'關閉':'開啟'}導覽選單">${state.menuOpen?'✕':'☰'}</button></div></div></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="footer-inner"><div><strong>✦ AI Explorer</strong><p>用簡單的方式，探索 AI 的無限可能。</p></div><div class="footer-links"><a href="#/about">關於本站</a><a href="#/explore">知識索引</a><span>繁體中文 · 學習示範專案</span></div></div></footer>`;
}
function pageHero(eyebrow,title,description) {
  return `<section class="page-hero"><span class="eyebrow">${htmlEscape(eyebrow)}</span><h1>${htmlEscape(title)}</h1><p>${htmlEscape(description)}</p></section>`;
}
function homePage(progress) {
  const done = totalDone(progress);
  const pending = articles.find(a => progress.opened[a.id] && !progress.completed[a.id]) || articles.find(a => !progress.completed[a.id]) || articles[0];
  const first = articles.filter(a => a.stage < 3).slice(0,3);
  return `<main id="main" tabindex="-1">
    <section class="home-hero"><div class="hero-glow hero-glow-one"></div><div class="hero-glow hero-glow-two"></div>
      <div class="hero-content"><span class="eyebrow"><span class="eyebrow-dot"></span> AI KNOWLEDGE EXPLORER</span>
      <h1>探索 AI，<br><span class="gradient-text">從這裡開始。</span></h1>
      <p>不必具備程式基礎。用簡單的解釋、互動卡片和小測驗，一步步建立你的人工智慧知識地圖。</p>
      <div class="hero-buttons"><a class="btn btn-primary" href="#/path">開始學習 <span aria-hidden="true">↗</span></a><a class="btn btn-quiet" href="#/explore">自由探索 <span aria-hidden="true">→</span></a></div>
      <div class="hero-stats"><div><strong>${articles.length}</strong><span>篇入門文章</span></div><div><strong>${categoryOrder.length}</strong><span>大知識領域</span></div><div><strong>${articles.reduce((n,a)=>n+(a.quiz?.questions.length||0),0)}</strong><span>道互動練習</span></div></div></div>
      <div class="hero-visual" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="orbit-center"><span>✧</span><small>AI</small></div><span class="orbit-bubble bubble-one">LLM</span><span class="orbit-bubble bubble-two">RAG</span><span class="orbit-bubble bubble-three">Agent</span><span class="orbit-bubble bubble-four">Prompt</span><span class="orbit-spark spark-one">✦</span><span class="orbit-spark spark-two">✳</span></div>
    </section>
    <section class="section" aria-labelledby="categories-title"><div class="section-heading"><div><span class="section-kicker">EXPLORE TOPICS</span><h2 id="categories-title">探索 AI 知識領域</h2><p>選一個感興趣的主題，展開你的學習旅程。</p></div><a class="text-link" href="#/explore">瀏覽全部文章 ↗</a></div>
      <div class="category-grid">${categoryOrder.map((key,i)=>`<a href="#/explore/${key}" class="category-card cat-${i+1}"><div class="category-top"><span class="category-icon">${categoryInfo[key].icon}</span><span aria-hidden="true" class="arrow-round">↗</span></div><h3>${categoryInfo[key].name}</h3><p>${categoryInfo[key].description}</p><span class="small-meta">${articles.filter(a=>a.category===key).length} 篇文章</span></a>`).join('')}</div>
    </section>
    <section class="section split-section"><div class="learn-path-banner"><span class="section-kicker">YOUR JOURNEY</span><h2>不知道從哪裡開始？<br>跟著推薦路線學 AI。</h2><p>五個循序漸進的學習階段，從 AI 基本概念到實際應用與安全議題。你也能隨時自由跳轉。</p><a href="#/path" class="btn btn-primary">查看學習路線 →</a><div class="path-decoration" aria-hidden="true"><span>01</span><span>02</span><span>03</span><span>04</span><span>05</span></div></div>
    <div class="resume-panel"><div class="panel-heading"><span class="section-kicker">KEEP EXPLORING</span><h2>你的學習進度</h2></div><div class="progress-ring-wrap"><div class="progress-ring" style="--value:${percent(done,articles.length)}"><span><strong>${percent(done,articles.length)}%</strong><small>已完成</small></span></div><div class="progress-ring-detail"><strong>${done} / ${articles.length} 篇</strong><p>每篇文章都可以由你自己標記完成，沒有強制考試。</p></div></div>
      <div class="resume-next"><span class="small-meta">推薦繼續閱讀</span><a href="#/article/${pending.id}">${htmlEscape(pending.title)} <span aria-hidden="true">↗</span></a></div><a class="text-link" href="#/learning">查看我的學習 →</a></div></section>
    <section class="section" aria-labelledby="featured-title"><div class="section-heading"><div><span class="section-kicker">START HERE</span><h2 id="featured-title">推薦入門文章</h2><p>從最常遇到的 AI 概念開始認識。</p></div></div><div class="articles-grid">${first.map(a=>card(a,progress)).join('')}</div></section>
  </main>`;
}
function visibleArticles() {
  return articles.filter(a => (state.category==='all'||a.category===state.category) && (state.difficulty==='all'||a.difficulty===state.difficulty) && (`${a.title} ${a.summary} ${a.categoryName}`.toLocaleLowerCase('zh-Hant').includes(state.keyword.toLocaleLowerCase('zh-Hant'))));
}
function exploreResults(progress) {
  const filtered = visibleArticles();
  return `<div class="result-meta">找到 <strong>${filtered.length}</strong> 篇知識文章</div><div class="articles-grid">${filtered.map(a=>card(a,progress)).join('') || '<div class="empty-state"><div>⌕</div><h3>找不到符合的文章</h3><p>試著更換關鍵字或其他分類。</p><button class="btn btn-quiet" data-action="clear-search">清除條件</button></div>'}</div>`;
}
function explorePage(progress, routeId) {
  if (routeId && categoryInfo[routeId]) state.category=routeId;
  return `<main id="main" tabindex="-1"><div class="page-shell">${pageHero('KNOWLEDGE LIBRARY','知識探索','從基礎概念到核心技術，找到你想了解的人工智慧知識。')}
      <div class="explore-toolbar"><label class="search-input"><span class="search-icon" aria-hidden="true">⌕</span><input id="explore-search" type="search" placeholder="搜尋 LLM、RAG、Prompt、Agent..." value="${escapeAttr(state.keyword)}" autocomplete="off" aria-label="搜尋知識文章"></label><label class="filter-control">難度 <select id="difficulty-filter" aria-label="選擇文章難度"><option value="all" ${state.difficulty==='all'?'selected':''}>全部難度</option><option value="入門" ${state.difficulty==='入門'?'selected':''}>入門</option><option value="進階" ${state.difficulty==='進階'?'selected':''}>進階</option></select></label></div>
      <div class="filter-pills" role="group" aria-label="文章分類篩選"><button class="filter-pill ${state.category==='all'?'selected':''}" data-action="filter-cat" data-value="all">全部文章</button>${categoryOrder.map(key=>`<button class="filter-pill ${state.category===key?'selected':''}" data-action="filter-cat" data-value="${key}">${htmlEscape(categoryInfo[key].name)}</button>`).join('')}</div>
      <div id="explore-results" aria-live="polite">${exploreResults(progress)}</div></div></main>`;
}
function interactionZone(a) {
  const component = a.interaction;
  if (!component) return '<p>此文章目前沒有互動內容。</p>';
  const session = state.interaction[a.id] || { flipped:false, step:0, side:'a' };
  let widget = '';
  if (component.type==='flashcard') {
    widget=`<button class="flashcard ${session.flipped?'is-flipped':''}" type="button" data-action="flip" data-article="${a.id}" aria-label="${session.flipped?'查看問題':'翻開卡片查看答案'}">
      <span class="flashcard-icon">${session.flipped?'✦':'?'}</span><span class="flashcard-label">${session.flipped?'答案揭曉':'想一想'}</span><strong>${htmlEscape(session.flipped?component.answer:component.question)}</strong>
      ${session.flipped?`<span class="flashcard-explanation">${htmlEscape(component.explanation)}</span>`:''}<span class="flashcard-hint">⟳ 點擊${session.flipped?'返回問題':'翻開卡片'}</span></button>`;
  } else if (component.type==='step-flow') {
    const step = component.steps[Math.min(Math.max(session.step,0),component.steps.length-1)];
    widget=`<div class="flow-widget"><div class="flow-steps">${component.steps.map((s,i)=>`<span class="flow-dot ${i===session.step?'current':i<session.step?'passed':''}" title="${escapeAttr(s.title)}"></span>`).join('')}</div>
      <div class="flow-stage"><span class="flow-number">STEP ${String(session.step+1).padStart(2,'0')} / ${String(component.steps.length).padStart(2,'0')}</span><span class="flow-glyph" aria-hidden="true">${['✦','⌕','◇','✓','✧'][session.step%5]}</span><h3>${htmlEscape(step.title)}</h3><p>${htmlEscape(step.description)}</p></div>
      <div class="flow-actions"><button class="btn btn-quiet btn-small" data-action="prev-step" data-article="${a.id}" ${session.step===0?'disabled':''}>← 上一步</button><button class="btn btn-primary btn-small" data-action="next-step" data-article="${a.id}">${session.step===component.steps.length-1?'重新觀看 ↻':'下一步 →'}</button></div></div>`;
  } else if(component.type==='comparison') {
    const active = session.side==='b'?'option_b':'option_a';
    widget=`<div class="comparison-widget"><div class="comparison-tabs" role="group" aria-label="比較情境"><button class="${active==='option_a'?'active':''}" data-action="compare" data-article="${a.id}" data-value="a">${htmlEscape(component.option_a.label)}</button><button class="${active==='option_b'?'active':''}" data-action="compare" data-article="${a.id}" data-value="b">${htmlEscape(component.option_b.label)}</button></div>
      <div class="comparison-result"><span class="micro-label">SCENARIO ${active==='option_a'?'A':'B'}</span><h3>${htmlEscape(component[active].label)}</h3><p>${htmlEscape(component[active].description)}</p></div><div class="comparison-summary"><strong>重點比較</strong><p>${htmlEscape(component.conclusion)}</p></div></div>`;
  }
  return `<div class="interaction-widget"><div class="widget-title"><span>✳ 互動探索</span><small>${htmlEscape(component.title || '點擊卡片探索')}</small></div>${widget}</div>`;
}
function renderQuiz() {
  const s=state.quizSession;
  if (!s) return '';
  if (s.complete) {
    const correct=s.responses.filter((answer,i)=>answer===s.questions[i].answer).length;
    return `<div class="quiz-finish" aria-live="polite"><div class="finish-symbol">✦</div><span class="section-kicker">CHALLENGE COMPLETED</span><h2>挑戰完成！</h2><div class="big-score">${Math.round(correct/s.questions.length*100)} <span>分</span></div><p>答對 ${correct} / ${s.questions.length} 題。${correct===s.questions.length?'全部答對，繼續探索吧！':'可以參考解析，再回到文章複習。'}</p>
      <div class="finish-review">${s.questions.map((q,i)=>`<div class="review-item"><strong>${s.responses[i]===q.answer?'✓':'↻'} ${htmlEscape(q.question)}</strong><p>正確答案：${htmlEscape(q.options[q.answer])}</p><small>${htmlEscape(q.explanation)}</small></div>`).join('')}</div>
      <div class="quiz-buttons"><button class="btn btn-primary" data-action="restart-quiz">重新挑戰 ↻</button>${s.mode==='article'?'<a class="btn btn-quiet" href="#/learning">查看學習紀錄 →</a>':'<a class="btn btn-quiet" href="#/challenge">返回挑戰列表 →</a>'}</div></div>`;
  }
  const q=s.questions[s.index];
  return `<div class="quiz-widget"><div class="quiz-top"><span class="pill pill-light">${htmlEscape(s.label)}</span><span class="small-meta">第 ${s.index+1} / ${s.questions.length} 題</span></div>${progressBar(s.index,s.questions.length,'quiz-progress')}<h3>${htmlEscape(q.question)}</h3><div class="quiz-options" role="group" aria-label="選擇答案">${q.options.map((o,i)=>{
    let cls = s.selected===i?'selected':'';
    if (s.revealed) cls+= i===q.answer?' correct':i===s.selected?' incorrect':'';
    return `<button type="button" class="quiz-option ${cls}" data-action="select-answer" data-value="${i}" ${s.revealed?'disabled':''}><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${htmlEscape(o)}</span></button>`;
  }).join('')}</div>
  ${s.revealed?`<div class="quiz-feedback ${s.selected===q.answer?'is-correct':'is-incorrect'}" role="status"><strong>${s.selected===q.answer?'✓ 答對了！':'正確答案：'+String.fromCharCode(65+q.answer)}</strong><p>${htmlEscape(q.explanation)}</p></div>`:''}
  <div class="quiz-buttons">${s.revealed?`<button class="btn btn-primary" data-action="next-question">${s.index===s.questions.length-1?'查看結果 →':'下一題 →'}</button>`:`<button class="btn btn-primary" data-action="submit-answer" ${s.selected===null?'disabled':''}>確認答案 →</button>`}</div></div>`;
}
function articlePage(progress, id) {
  const a=currentArticle(id);
  if (!a) return notFound('找不到這篇文章');
  markOpened(a.id);
  progress=readProgress();
  const related=(a.related||[]).map(id=>articleById[id]).filter(Boolean);
  const stage=stages.find(s=>s.number===a.stage);
  const sequence=stage?.article_ids||[];
  const currentIndex=sequence.indexOf(id);
  const sources=(a.sources||[]).map(id=>sourceById[id]).filter(Boolean);
  return `<main id="main" tabindex="-1"><div class="article-container"><nav class="crumbs" aria-label="麵包屑"><a href="#/home">首頁</a><span>›</span><a href="#/explore/${a.category}">${htmlEscape(a.categoryName)}</a><span>›</span><span>${htmlEscape(a.title)}</span></nav>
    <div class="article-layout"><aside class="article-sidebar"><div class="sidebar-title">KNOWLEDGE MAP</div><h2>知識分類</h2>${categoryOrder.map(key=>`<div class="sidebar-category"><a class="sidebar-category-title ${key===a.category?'selected':''}" href="#/explore/${key}"><span>${categoryInfo[key].icon}</span>${htmlEscape(categoryInfo[key].name)}</a>${key===a.category?`<div class="sidebar-articles">${articles.filter(x=>x.category===key).map(x=>`<a class="${x.id===a.id?'active':''}" href="#/article/${x.id}">${htmlEscape(x.title)}</a>`).join('')}</div>`:''}</div>`).join('')}</aside>
      <article class="article-body"><div class="article-head"><div class="article-tags">${cateBadge(a.category)}<span class="pill pill-muted">${htmlEscape(a.difficulty)}</span><span class="pill pill-muted">約 ${a.minutes} 分鐘</span></div><h1>${htmlEscape(a.title)}</h1><p class="article-lede">${htmlEscape(a.summary)}</p><div class="article-meta"><span>✦ ${htmlEscape(stage?.title||'自由探索')}</span><span>更新日期：${htmlEscape(a.updated_at)}</span></div></div>
      <div class="mobile-toc"><details><summary>本篇目錄</summary>${sectionTitles.map((s,i)=>`<button type="button" data-action="scroll-section" data-value="section-${i}">${s}</button>`).join('')}</details></div>
      ${sectionTitles.map((name,i)=>{
        if(name==='互動探索') return `<section class="article-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${name}</h2>${contentHTML(a.sections[name])}${interactionZone(a)}</section>`;
        if(name==='知識小測驗') return `<section class="article-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${name}</h2>${contentHTML(a.sections[name])}<div id="article-quiz-zone">${state.quizSession?.mode==='article'&&state.quizSession.key===a.id ? renderQuiz() : `<div class="quiz-entry"><div><span class="mini-icon">✎</span><h3>準備好測試一下嗎？</h3><p>3 題單選題，答完可查看解析，不影響文章完成狀態。</p></div><button class="btn btn-primary" data-action="start-article-quiz" data-id="${a.id}">開始測驗 →</button>${progress.scores[`article:${a.id}`]?`<span class="best-note">最佳成績：${scoreText(progress.scores[`article:${a.id}`])}</span>`:''}</div>`}</div></section>`;
        if(name==='延伸閱讀') return `<section class="article-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${name}</h2><div class="related-list">${related.map(r=>`<a href="#/article/${r.id}"><span>${categoryInfo[r.category].icon}</span><div><strong>${htmlEscape(r.title)}</strong><small>${htmlEscape(r.summary)}</small></div><b aria-hidden="true">↗</b></a>`).join('')}</div></section>`;
        if(name==='參考資料') return `<section class="article-section source-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${name}</h2><p class="muted">本篇為初學者教學摘要；如需引用技術細節，請進一步查閱原始來源。來源連結待個別複核。</p><ol>${sources.map(s=>`<li><a href="${escapeAttr(safeUrl(s.url))}" target="_blank" rel="noopener noreferrer">${htmlEscape(s.title)}</a><span class="source-org">— ${htmlEscape(s.author)}</span></li>`).join('')}</ol></section>`;
        return `<section class="article-section" id="section-${i}"><h2><span>${String(i+1).padStart(2,'0')}</span>${name}</h2><div class="prose">${contentHTML(a.sections[name])}</div></section>`;
      }).join('')}
      <div class="completion-box"><div class="completion-info"><span class="completion-icon">${progress.completed[a.id]?'✓':'☆'}</span><div><h3>${progress.completed[a.id]?'你已完成這篇文章！':'完成今天的知識探索'}</h3><p>${progress.completed[a.id]?'需要複習時仍可以隨時回來閱讀。':'閱讀完成後，自己決定是否標記完成；測驗成績獨立記錄。'}</p></div></div><button class="btn ${progress.completed[a.id]?'btn-quiet':'btn-primary'}" data-action="complete-article" data-id="${a.id}" data-value="${progress.completed[a.id]?'no':'yes'}">${progress.completed[a.id]?'取消完成標記':'✓ 標記已完成'}</button></div>
      <div class="article-pager">${currentIndex>0?`<a href="#/article/${sequence[currentIndex-1]}"><small>← 上一篇</small><strong>${htmlEscape(articleById[sequence[currentIndex-1]].title)}</strong></a>`:'<span></span>'}${currentIndex<sequence.length-1?`<a class="next" href="#/article/${sequence[currentIndex+1]}"><small>下一篇 →</small><strong>${htmlEscape(articleById[sequence[currentIndex+1]].title)}</strong></a>`:'<span></span>'}</div></article>
      <aside class="article-toc"><div class="toc-title">ON THIS PAGE</div><nav aria-label="文章目錄">${sectionTitles.map((name,i)=>`<button type="button" data-action="scroll-section" data-value="section-${i}">${htmlEscape(name)}</button>`).join('')}</nav><div class="toc-progress">${statusBadge(a,progress)}<span>階段 ${a.stage} / 5</span></div></aside>
    </div></div></main>`;
}
function pathPage(progress) {
  const done=totalDone(progress);
  return `<main id="main" tabindex="-1"><div class="page-shell">${pageHero('LEARNING ROADMAP','你的 AI 學習路線','五個循序漸進的階段，從基礎到應用；你可以自由選擇任何階段開始。')}
    <div class="overall-path-progress"><div><span class="section-kicker">OVERALL PROGRESS</span><h2>讓每一次探索，都成為成長的一步。</h2><p>已完成 ${done} / ${articles.length} 篇文章</p></div><div class="path-overall-value">${percent(done,articles.length)}%</div></div>${progressBar(done,articles.length)}
    <div class="roadmap">${stages.map((stage,i)=>{
      const as=getStageArticles(stage), completed=completedCount(stage.article_ids,progress);
      return `<section class="roadmap-stage"><div class="stage-rail"><div class="stage-number">${String(stage.number).padStart(2,'0')}</div><span class="rail-line"></span></div><div class="stage-content"><div class="stage-head"><div><span class="section-kicker">STAGE ${String(stage.number).padStart(2,'0')}</span><h2>${htmlEscape(stage.title)}</h2><p>${htmlEscape(stage.description)}</p></div><span class="stage-percent">${percent(completed,as.length)}%</span></div>${progressBar(completed,as.length)}
      <div class="roadmap-articles">${as.map((a,idx)=>`<a href="#/article/${a.id}" class="roadmap-article"><span class="roadmap-item-number">${String(idx+1).padStart(2,'0')}</span><span class="roadmap-item-content"><strong>${htmlEscape(a.title)}</strong><small>${htmlEscape(a.summary)}</small></span>${statusBadge(a,progress)}<span class="roadmap-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></div></section>`;
    }).join('')}</div></div></main>`;
}
function pickQuestions(category) {
  const pool=articles.filter(a=>category==='all'||a.category===category).flatMap(a=>a.quiz?.questions||[]);
  for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  return pool.slice(0,Math.min(5,pool.length));
}
function challengePage(progress,id) {
  if(id==='run' && state.quizSession?.mode==='challenge') return `<main id="main" tabindex="-1"><div class="page-shell challenge-run"><a class="back-link" href="#/challenge">← 返回知識挑戰</a><div class="challenge-run-head"><span class="section-kicker">KNOWLEDGE CHALLENGE</span><h1>${htmlEscape(state.quizSession.label)}</h1><p>每題都有答案解析，答完即可查看結果。</p></div>${renderQuiz()}</div></main>`;
  return `<main id="main" tabindex="-1"><div class="page-shell">${pageHero('TEST YOUR KNOWLEDGE','AI 知識挑戰','把學到的觀念變成自己的知識！自由選擇主題，進行五題小挑戰。')}
  <div class="challenge-hero-note"><span>✳</span><p>所有題目來自現有文章題庫。答題後立即查看解析，測驗不會限制閱讀與學習路線。</p></div><div class="section-heading"><div><span class="section-kicker">CHOOSE YOUR TOPIC</span><h2>選擇挑戰主題</h2></div></div><div class="challenge-grid">
  ${categoryOrder.map((key,i)=>`<div class="challenge-card"><div class="challenge-icon cat-${i+1}">${categoryInfo[key].icon}</div><span class="small-meta">${htmlEscape(categoryInfo[key].name)}</span><h3>${htmlEscape(categoryInfo[key].name)}挑戰</h3><p>${htmlEscape(categoryInfo[key].description)}</p><div class="challenge-card-bottom"><span class="small-meta">5 題・最佳 ${scoreText(progress.scores[`challenge:${key}`])}</span><button class="btn btn-primary btn-small" data-action="start-challenge" data-value="${key}">開始 →</button></div></div>`).join('')}
  <div class="challenge-card challenge-all"><div class="challenge-icon">✦</div><span class="small-meta">ALL TOPICS</span><h3>綜合知識挑戰</h3><p>從五個知識領域中隨機選題，看看自己掌握了多少概念。</p><div class="challenge-card-bottom"><span class="small-meta">5 題・最佳 ${scoreText(progress.scores['challenge:all'])}</span><button class="btn btn-primary btn-small" data-action="start-challenge" data-value="all">開始 →</button></div></div>
  </div></div></main>`;
}
function learningPage(progress) {
  const done=totalDone(progress);
  const listed=articles.filter(a=>state.learningTab==='all'||(state.learningTab==='done'?progress.completed[a.id]:state.learningTab==='reading'?progress.opened[a.id]&&!progress.completed[a.id]:!progress.opened[a.id]));
  const attempted=Object.keys(progress.scores||{}).length;
  const next=articles.find(a=>progress.opened[a.id]&&!progress.completed[a.id])||articles.find(a=>!progress.completed[a.id]);
  return `<main id="main" tabindex="-1"><div class="page-shell">${pageHero('MY LEARNING','我的學習','記錄每一步探索，依照自己的步調慢慢累積 AI 知識。')}
  <div class="summary-grid"><div class="summary-card"><span class="summary-icon">✦</span><strong>${done}<small> / ${articles.length}</small></strong><span>已完成文章</span></div><div class="summary-card"><span class="summary-icon">✎</span><strong>${attempted}</strong><span>已有成績的測驗</span></div><div class="summary-card"><span class="summary-icon">◈</span><strong>${percent(done,articles.length)}%</strong><span>總學習進度</span></div></div>
  <div class="learning-columns"><section class="learning-box"><div class="section-heading compact"><div><span class="section-kicker">STAGE PROGRESS</span><h2>學習路線進度</h2></div><a class="text-link" href="#/path">查看路線 →</a></div>${stages.map(s=>`<div class="learning-stage"><div><strong>${htmlEscape(s.title)}</strong><span>${completedCount(s.article_ids,progress)} / ${s.article_ids.length}</span></div>${progressBar(completedCount(s.article_ids,progress),s.article_ids.length)}</div>`).join('')}</section>
    <section class="learning-box"><div class="section-heading compact"><div><span class="section-kicker">NEXT STEP</span><h2>推薦繼續閱讀</h2></div></div>${next?`<div class="next-article"><span class="pill pill-light">${htmlEscape(next.categoryName)}</span><div class="next-article-spark">${categoryInfo[next.category].icon}</div><h3>${htmlEscape(next.title)}</h3><p>${htmlEscape(next.summary)}</p><a class="btn btn-primary" href="#/article/${next.id}">繼續學習 ↗</a></div>`:'<div class="next-article"><h3>已完成所有文章！</h3><p>試試知識挑戰，或重新閱讀感興趣的主題。</p><a class="btn btn-primary" href="#/challenge">前往知識挑戰 →</a></div>'}</section></div>
  <section class="section"><div class="section-heading"><div><span class="section-kicker">YOUR LIBRARY</span><h2>我的文章紀錄</h2></div></div><div class="filter-pills" role="group" aria-label="閱讀狀態篩選">${[['all','全部'],['reading','閱讀中'],['done','已完成'],['notstarted','尚未開始']].map(([key,label])=>`<button class="filter-pill ${state.learningTab===key?'selected':''}" data-action="learning-tab" data-value="${key}">${label}</button>`).join('')}</div>
  <div class="learning-article-list">${listed.map(a=>`<a href="#/article/${a.id}" class="learning-article"><div class="learning-list-icon">${categoryInfo[a.category].icon}</div><div><strong>${htmlEscape(a.title)}</strong><small>${htmlEscape(a.categoryName)} · ${htmlEscape(a.minutes)} 分鐘</small></div>${statusBadge(a,progress)}<span aria-hidden="true">↗</span></a>`).join('')||'<div class="empty-state"><h3>目前沒有符合狀態的文章</h3><p>可以切換其他狀態查看。</p></div>'}</div></section>
  <section class="section"><div class="section-heading"><div><span class="section-kicker">QUIZ RECORDS</span><h2>測驗最佳成績</h2><p>閱讀完成和測驗成績分開記錄，不需要通過考試才能學習。</p></div></div><div class="score-grid">${articles.filter(a=>progress.scores[`article:${a.id}`]).map(a=>`<a href="#/article/${a.id}" class="score-record"><span>${htmlEscape(a.title)}</span><strong>${scoreText(progress.scores[`article:${a.id}`])} <span aria-hidden="true">↗</span></strong></a>`).join('')||'<div class="empty-state"><h3>還沒有文章測驗紀錄</h3><p>在任一篇文章底部可以開始作答。</p></div>'}${categoryOrder.concat('all').filter(key=>progress.scores[`challenge:${key}`]).map(key=>`<a href="#/challenge" class="score-record"><span>${key==='all'?'綜合知識挑戰':categoryInfo[key].name+'挑戰'}</span><strong>${scoreText(progress.scores[`challenge:${key}`])} <span aria-hidden="true">↗</span></strong></a>`).join('')}</div></section><p class="storage-note">ⓘ 學習紀錄儲存在目前的瀏覽器中；更換裝置或清除網站資料後可能無法保留。</p></div></main>`;
}
function aboutPage() {
  return `<main id="main" tabindex="-1"><div class="page-shell about-page">${pageHero('ABOUT THE PROJECT','關於 AI Explorer','把難懂的 AI 技術，整理成每個人都能開始閱讀、操作與探索的知識。')}
  <section class="about-feature"><div><span class="section-kicker">OUR IDEA</span><h2>不只是文章集合，<br>而是持續成長的知識庫。</h2><p>AI Knowledge Explorer 結合互動學習網站與 LLM Wiki 的持續知識整理思路。以可追溯的來源與 Markdown 文章為基礎，將知識轉化成翻轉卡、流程圖、比較卡與測驗。</p></div><div class="about-graphic"><span>RAW</span><i>↓</i><span>WIKI</span><i>↓</i><span>LEARN</span></div></section>
  <div class="about-principles"><div><span>01</span><h3>好理解</h3><p>以繁體中文、簡單例子與互動方式介紹 AI。</p></div><div><span>02</span><h3>可追溯</h3><p>知識內容保留來源連結，重要事實仍需查證。</p></div><div><span>03</span><h3>可擴充</h3><p>新增內容遵守 AGENTS.md，沿用既有文章與互動模板。</p></div></div>
  <section class="about-guideline"><span class="section-kicker">HOW WE KEEP IT CONSISTENT</span><h2>一份 AGENTS.md，持續維護同一套規則。</h2><p>我們用四種工作流程管理知識：<strong>Ingest</strong> 納入來源、<strong>Query</strong> 查詢與綜整、<strong>Publish</strong> 發布互動教學、<strong>Lint</strong> 檢查品質。這些規範讓新文章在分類、來源、互動卡片與測驗上維持一致。</p><div class="workflow-chips"><span>Ingest</span><span>Query</span><span>Publish</span><span>Lint</span></div></section>
  <div class="about-disclaimer"><strong>關於資料來源</strong><p>網站內容為入門教學摘要，不等於官方技術文件。所列參考來源需在正式對外發布前逐一複核；若有錯誤，應依據可查證的來源修正。</p></div></div></main>`;
}
function notFound(message='找不到這個頁面') {
  return `<main id="main" tabindex="-1"><div class="not-found"><div>✧</div><h1>${htmlEscape(message)}</h1><p>你可以回首頁，或從知識探索重新開始。</p><a class="btn btn-primary" href="#/home">返回首頁 →</a></div></main>`;
}
function render(preserveScroll=false) {
  const y=window.scrollY;
  const progress=readProgress();
  const current=route();
  let page;
  switch(current.page) {
    case 'home': page=homePage(progress); break;
    case 'explore': page=explorePage(progress,current.id); break;
    case 'article': page=articlePage(progress,current.id); break;
    case 'path': page=pathPage(progress); break;
    case 'challenge': page=challengePage(progress,current.id); break;
    case 'learning': page=learningPage(progress); break;
    case 'about': page=aboutPage(); break;
    default: page=notFound();
  }
  app.innerHTML=header(current.page)+page+footer();
  document.title=(current.page==='article'&&currentArticle(current.id)?currentArticle(current.id).title+' | ':'')+'AI Explorer | AI 知識探索百科';
  if (preserveScroll) window.scrollTo(0,y);
  else window.scrollTo(0,0);
}
function startQuiz(mode,key) {
  let questions, label;
  if(mode==='article') {
    const a=articleById[key]; if(!a?.quiz) return;
    questions=a.quiz.questions; label='文章小測驗';
  } else {
    questions=pickQuestions(key); label=key==='all'?'綜合知識挑戰':`${categoryInfo[key]?.name||'AI'}挑戰`;
  }
  if (!questions.length) return;
  state.quizSession={mode,key,label,questions,index:0,responses:[],selected:null,revealed:false,complete:false};
}
function proceedQuestion() {
  const s=state.quizSession;
  if(!s||!s.revealed) return;
  if(s.index===s.questions.length-1) {
    s.complete=true;
    const correct=s.responses.filter((x,i)=>x===s.questions[i].answer).length;
    saveScore(`${s.mode}:${s.key}`,correct,s.questions.length);
  } else {s.index++;s.selected=null;s.revealed=false;}
  render(true);
}
function selectedInteractive(articleId) {
  return state.interaction[articleId] ||= {flipped:false,step:0,side:'a'};
}
document.addEventListener('click', event => {
  if(event.target.closest('.skip-link')) { event.preventDefault(); document.getElementById('main')?.focus(); return; }
  const button=event.target.closest('[data-action]');
  if(!button) return;
  const action=button.dataset.action;
  const id=button.dataset.id||button.dataset.article;
  const value=button.dataset.value;
  if (action==='toggle-menu') {state.menuOpen=!state.menuOpen; render(true); return;}
  if (action==='filter-cat') {state.category=value;render(true);return;}
  if (action==='clear-search') {state.keyword='';state.category='all';state.difficulty='all';render(true);return;}
  if (action==='learning-tab') {state.learningTab=value;render(true);return;}
  if (action==='scroll-section') {document.getElementById(value)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
  if (action==='complete-article') {setCompleted(id,value==='yes');render(true);return;}
  if (action==='flip') {const session=selectedInteractive(id);session.flipped=!session.flipped;render(true);return;}
  if (action==='prev-step'||action==='next-step') {const a=articleById[id];const s=selectedInteractive(id);const count=a.interaction.steps.length;s.step=action==='prev-step'?Math.max(0,s.step-1):(s.step+1)%count;render(true);return;}
  if (action==='compare') {selectedInteractive(id).side=value;render(true);return;}
  if (action==='start-article-quiz') {startQuiz('article',id);render(true);return;}
  if (action==='start-challenge') {startQuiz('challenge',value);location.hash='#/challenge/run';return;}
  if (action==='select-answer') {if(state.quizSession && !state.quizSession.revealed){state.quizSession.selected=Number(value);render(true);}return;}
  if (action==='submit-answer') {if(state.quizSession?.selected!==null){state.quizSession.revealed=true;state.quizSession.responses[state.quizSession.index]=state.quizSession.selected;render(true);}return;}
  if (action==='next-question') {proceedQuestion();return;}
  if (action==='restart-quiz') {const s=state.quizSession;startQuiz(s.mode,s.key);render(true);return;}
});
document.addEventListener('input',event => {
  if(event.target.id==='explore-search') {
    state.keyword=event.target.value;
    const target=document.getElementById('explore-results');
    if(target) target.innerHTML=exploreResults(readProgress());
  }
});
document.addEventListener('change',event => {
  if(event.target.id==='difficulty-filter') {state.difficulty=event.target.value;render(true);}
});
window.addEventListener('hashchange',()=> {state.menuOpen=false;render();});
render();
