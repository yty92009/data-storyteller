// AI Skill 收藏数据：收录实用的开源 Agent Skill（SKILL.md）
// 新增技能只需在数组里加一项
// 每条技能固定四块：intro 简介 / effect 作用 / url 公开地址 / tips 使用技巧
// 内容以技能作者的描述与 README 为依据
// tag 用于分类筛选
const skills = [
  {
    tag: '需求澄清',
    title: 'Grill Me',
    author: 'Matt Pocock',
    intro: '作者定位它是一场「毫不留情的访谈（relentless interview）」：针对你的计划或设计，走遍决策树的每一条分支，直到你和 AI 达成真正的共识（shared understanding）。',
    effect: '一次只问一个问题，绝不一次性甩给你一堆问题；每个问题都附带 AI 自己的推荐答案，让你是在「回应一个方案」而不是面对空白输入框发呆。能通过读代码回答的问题，它会自己去读而不是问你。整个过程把每一个隐含决策都显性化——「重点不是快速达成一致，而是不让任何重要的事被默默假设」。技能本身无状态（stateless）：不写任何文件，唯一的产物是对话中被打磨清晰的理解。',
    url: 'https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me',
    tips: `【安装】（作者提供的一行命令）
npx skills add mattpocock/skills --skill=grill-me
更新：npx skills update grill-me

【调用】必须手动输入 /grill-me——作者明确说明：agent 不会自己主动使用它

【使用时机】作者的原文是：在「计划感觉大致靠谱、但你隐约察觉还有未解决的决策藏在里面」的时候用它——正是要把软肋找出来、逼到台面上

【相关技能】同仓库还有三个变体：
- grill-with-docs：同样的访谈，但会把决策沉淀为 ADR 文档和术语表
- wayfinder：项目大到一次会话装不下、路线还模糊时，先画决策地图
- to-spec：访谈结束后，把共识直接合成一份 spec 文档`
  },
  {
    tag: '设计美化',
    title: 'Taste',
    author: 'Leonxlnx',
    intro: '作者的定义非常直白：「给你的 AI 好品味（gives your AI good taste），阻止 AI 生成无聊、平庸的模板货」——一套面向 AI Agent 的反模板（Anti-Slop）前端技能。',
    effect: '用可移植的 Agent Skill 升级 AI 生成的界面：更强的布局、字体排印、动效与留白，而不是千篇一律的样板 UI。默认主技能 design-taste-frontend（v2）基于对 247 个精选设计站点的研究构建：AI 先盘点项目独有的东西，脚本会从 20 种设计方向、48 种 Hero 方案、172 种区块布局、44 种字体系统、56 种配色中发牌给你三选；再用真实浏览器检查器对页面做「AI 模板味」体检——眉毛标题、等宽字体标签、01/02/03 编号、发丝线、渐变、紫色系等经典 AI 味一律判不合格；最后用截图做一轮 look-and-fix。兼容 React / Vue / Svelte，规则约束的是设计意图而非框架 API。',
    url: 'https://github.com/Leonxlnx/taste-skill',
    tips: `【安装】
npx skills add https://github.com/Leonxlnx/taste-skill
只装主技能：
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"

【Claude Code 插件方式安装】（无需 npx，技能自动加 taste-skill: 前缀）
/plugin marketplace add Leonxlnx/taste-skill
/plugin install taste-skill@taste-skill

【环境要求】v2 需要 Node 22+ 和 Chrome / Edge / Chromium（真实浏览器检查器要用）

【按需选装】每个技能只干一件事，不必全装：
- redesign-existing-projects：改造已有项目，先审计 UI 再修
- high-end-visual-design / minimalist-ui / industrial-brutalist-ui：风格已定时的专项强化
- gpt-taste：给 GPT / Codex 用的更严格变体
- image-to-code：先出参考图 → 分析 → 再实现代码的图像优先流程`
  }
];

// 渲染分类筛选按钮
const ALL_TAGS = ['全部', ...new Set(skills.map(s => s.tag))];
const filterBox = document.getElementById('skillFilter');
filterBox.innerHTML = ALL_TAGS.map(t =>
  `<button class="filter-btn${t === '全部' ? ' active' : ''}" data-tag="${t}">${t}</button>`
).join('');

// 渲染技能卡片
const grid = document.getElementById('skillGrid');
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function renderSkills(tag) {
  const list = tag === '全部' ? skills : skills.filter(s => s.tag === tag);
  grid.innerHTML = list.map(s => `
    <article class="card skill-item">
      <div class="note-meta">
        <span class="note-tag">${s.tag}</span>
        <span>👤 ${s.author}</span>
      </div>
      <h3>${s.title}</h3>
      <div class="skill-block"><strong>📖 简介</strong><p>${s.intro}</p></div>
      <div class="skill-block"><strong>⚙️ 作用</strong><p>${s.effect}</p></div>
      <div class="skill-block"><strong>🔗 公开地址</strong><p><a href="${s.url}" target="_blank" rel="noopener" class="accent">${s.url}</a></p></div>
      <div class="skill-block">
        <strong>💡 使用技巧</strong>
        <div class="prompt-box">
          <button class="copy-btn" data-copy="${encodeURIComponent(s.tips)}" aria-label="复制">📋 复制</button>
          <pre>${esc(s.tips)}</pre>
        </div>
      </div>
    </article>
  `).join('');
}
renderSkills('全部');

// 筛选交互
filterBox.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  filterBox.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSkills(btn.dataset.tag);
});

// 复制交互
grid.addEventListener('click', e => {
  const btn = e.target.closest('.copy-btn');
  if (!btn) return;
  navigator.clipboard.writeText(decodeURIComponent(btn.dataset.copy)).then(() => {
    const original = btn.textContent;
    btn.textContent = '✅ 已复制';
    setTimeout(() => { btn.textContent = original; }, 1500);
  });
});
