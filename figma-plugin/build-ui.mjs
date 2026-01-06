// AI 生成 By Peng.Guo
// 构建脚本：将 ui.js 内联到 ui.html 中
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 读取 ui.html 模板
const htmlPath = resolve(__dirname, 'ui.html');
const jsPath = resolve(__dirname, 'dist/ui.js');
const outputPath = resolve(__dirname, 'ui-bundled.html');

let html = readFileSync(htmlPath, 'utf-8');
let js = readFileSync(jsPath, 'utf-8');

// 重要：转义 JS 中的 </script 字符串，防止浏览器误解析为脚本结束标签
// 使用 Unicode 转义方式：将 < 替换为 \x3c 或 \u003c
// 同时处理已转义的 <\/script 和未转义的 </script
js = js.replace(/<\\\/script/gi, '\\x3c/script');  // 处理 <\/script
js = js.replace(/<\/script/gi, '\\x3c/script');     // 处理 </script

// 将占位符替换为内联脚本
html = html.replace(
  '<!-- UI_SCRIPT_PLACEHOLDER -->',
  `<script>
console.log('[Debug] 开始加载 React UI 脚本...');
try {
${js}
console.log('[Debug] React UI 脚本加载完成');
console.log('[Debug] initComponentLibraryUI 是否存在:', typeof window.initComponentLibraryUI);
} catch (err) {
console.error('[Debug] React UI 脚本执行出错:', err);
}
</script>`
);

// 写入输出文件
writeFileSync(outputPath, html);

console.log('✓ 已生成 ui-bundled.html');

