// AI Skill 收藏数据：收录实用的开源 Agent Skill（SKILL.md）
// 新增技能只需在数组里加一项
// 每条技能固定四块：intro 简介 / effect 作用 / url 公开地址 / tips 使用技巧
// tag 用于分类筛选
const skills = [
  {
    tag: '需求澄清',
    title: 'Grill Me',
    author: 'Matt Pocock',
    intro: '一个「拷问式」需求澄清技能。核心理念：AI 动手之前，人必须先想清楚——它把这一步变成了强制流程。',
    effect: '在 AI 开始任何实现之前，用 10~15 个针对性问题逐层盘问你的想法：目标是什么、边界在哪里、例外怎么处理……直到产出一份双方确认的简短 spec，然后才开工。有效杜绝 AI 自作主张、理解偏差导致的返工。',
    url: 'https://github.com/mattpocock/skills',
    tips: `【安装】把仓库中的 skills/grill-me 目录复制到 ~/.claude/skills/

【调用】在 Claude Code 对话中输入：
/grill-me 我想做一个销售额异动监控看板

【技巧】
1. 需求越模糊，越该先用它——被问到答不上来的地方，就是需求里没想清楚的地方
2. 数据类需求搭配指标口径文档一起给，它盘问的维度会更准
3. 结束时让它输出一份 spec 存档，作为开发依据和后续验收标准`
  },
  {
    tag: '设计美化',
    title: 'Taste',
    author: 'Leonxlnx',
    intro: '一个给 coding agent 注入「设计品味」的技能，专治 AI 生成界面的千篇一律。',
    effect: '让 AI 从你的 brief 主动推断设计方向，并严格约束字体、配色、布局与组件选择，生成真正「被设计过」的网页和应用界面，摆脱一眼就能看穿的 AI 模板感（AI slop）。',
    url: 'https://github.com/leonxlnx/taste-skill',
    tips: `【安装】
git clone https://github.com/leonxlnx/taste-skill
把其中的技能目录复制到 ~/.claude/skills/

【调用】agent 设计网站 / 看板 / 汇报页面时自动生效

【技巧】
1. brief 里给出现众与场景（如「给高管看的经营看板」），它选的配色和布局会明显更贴切
2. 丢 1~2 个你觉得好看的参考网站，它会对齐那种审美风格
3. 不满意就让它「换个设计方向重推」，多轮迭代后产出稳定得多`
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
