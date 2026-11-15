import fs from 'node:fs';
import { ABS, getArticles, makeIndex } from './content-utils.mjs';

try {
  const articles = getArticles();
  fs.writeFileSync(ABS('wiki/index.md'), makeIndex(articles));
  console.log(`✓ 已重建 wiki/index.md（共 ${articles.length} 篇文章）`);
} catch (error) {
  console.error(`✗ 索引建立失敗：${error.message}`);
  process.exitCode = 1;
}
