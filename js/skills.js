// AI Skill 收藏数据：收录实用的开源 Agent Skill（SKILL.md）
// 新增技能只需在数组里加一项
// tag 用于分类筛选；url 为技能来源仓库；usage 为安装/使用方式（可复制）
const skills = [
  {
    tag: '需求澄清',
    title: 'Grill Me',
    author: 'Matt Pocock',
    url: 'https://github.com/mattpocock/skills',
    desc: '在动手写任何代码之前，AI 会用 10~15 个针对性问题「拷问」你的想法——把模糊的意图盘问成一份明确的 spec，确认后才开工。杜绝 AI 自作主张、减少返工。',
    why: '数据需求最常见的坑就是「需求方自己也没想清楚」。用它澄清分析需求和数据开发任务，盘完往往省掉一半沟通成本。',
    usage: `安装：把仓库中的 skills/grill-me 目录复制到 ~/.claude/skills/

使用：在 Claude Code 对话中输入
/grill-me 我想做一个销售额异动监控看板

AI 会逐个提问澄清口径、维度、触发条件……
直到产出一份双方确认的简短 spec，再开始实现。`
  },
  {
    tag: '设计美化',
    title: 'Taste',
    author: 'Leonxlnx',
    url: 'https://github.com/leonxlnx/taste-skill',
    desc: '给 coding agent 注入「设计品味」：从你的 brief 推断设计方向，主动约束字体、配色、布局与组件选择，让 AI 生成的网页和应用界面摆脱千篇一律的模板感（AI slop）。',
    why: '分析师做看板、做汇报页面经常被说「不像人做的」。这个技能让 AI 真正去「设计」而不是「拼凑」，是我做 BI 界面的秘密武器。',
    usage: `安装：
git clone https://github.com/leonxlnx/taste-skill
把其中的技能目录复制到 ~/.claude/skills/

使用：让 agent 设计网站 / 界面时自动生效，
也可在提示中明确指定按 Taste 的设计流程执行。`
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
        <span>👤 <a href="${s.url}" target="_blank" rel="noopener" class="accent">${s.author}</a></span>
      </div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <p><strong style="color: var(--text);">💡 为什么收藏：</strong>${s.why}</p>
      <div class="prompt-box">
        <button class="copy-btn" data-copy="${encodeURIComponent(s.usage)}" aria-label="复制">📋 复制</button>
        <pre>${esc(s.usage)}</pre>
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
