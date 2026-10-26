// AI Skill 收藏数据：新增技能只需在数组里加一项
// tag 用于分类筛选；prompt 为可直接复制使用的内容（模板、指令、技巧说明）
const skills = [
  {
    tag: '提示词',
    title: 'SQL 生成器',
    desc: '让 LLM 按我的表结构生成可靠的 SQL。实测准确率最高的结构。',
    prompt: `你是一名资深数据工程师。请根据以下信息编写 SQL：
1. 表结构（DDL + 字段业务含义）：
【粘贴建表语句】
2. 示例数据（2~3 行）：
【粘贴样例】
3. 需求：【用业务语言描述，说明口径】
要求：只输出 SQL，不要解释；SQL 中用注释标出每个关键过滤条件；如果需求有歧义，先列出你的假设。`
  },
  {
    tag: '提示词',
    title: '指标异动归因助手',
    desc: '让 AI 按维度拆解思路辅助定位异动，输出结构化的排查清单。',
    prompt: `核心指标【指标名】从【A】降到【B】，降幅 X%。
可用维度：【时间/地区/渠道/品类…】
请帮我：
1. 给出按维度拆解的排查顺序（优先级 + 理由）
2. 每一步需要什么数据，给出对应 SQL 思路
3. 列出 3 个最可能的业务原因假设`
  },
  {
    tag: '提示词',
    title: '数据周报初稿生成',
    desc: '把关键指标数据喂给 AI，生成结构化周报初稿，人只做洞察提炼。',
    prompt: `你是我的数据分析助理。以下是我负责业务的本周核心数据：
【粘贴指标数据：本周值 / 上周值 / 环比】
请生成周报初稿，结构：
1. 整体概况（一段话）
2. 指标异动提示（环比变化超 X% 的项）
3. 待关注的 3 个问题（附数据依据）
语气：客观、简洁、面向管理层。不要编造数据之外的原因。`
  },
  {
    tag: '工作流',
    title: 'AI 辅助代码审查',
    desc: '提交 DAG 任务前，把 SQL/Python 代码丢给 AI 做一次预审查。',
    prompt: `请审查这段数据处理代码，重点检查：
1. 空值与异常值是否处理
2. 重复数据风险（join 导致的膨胀）
3. 时间边界与口径是否一致
4. 性能问题（全表扫描、数据倾斜）
代码：【粘贴】`
  },
  {
    tag: '工作流',
    title: '新数据源快速理解',
    desc: '接手陌生表/新数据源时，用 AI 快速摸清结构和业务含义。',
    prompt: `这是一个我不熟悉的数据表：
【粘贴 DDL + 样例数据】
请帮我推断：
1. 这张表的主键和粒度（一行代表什么）
2. 每个字段的业务含义猜测
3. 可能的数据质量问题（列出不放心、需要验证的点）`
  },
  {
    tag: '工具技巧',
    title: '让 AI 学会你的口径',
    desc: '把公司的指标口径文档做成「口径卡片」，每次对话先贴给 AI，回答口径问题不再跑偏。',
    prompt: `【长期复用】把下面内容存成片段，每次涉及指标计算时先发送：
我们公司的指标口径如下：
- GMV = 下游订单金额，含取消，不含退款
- 活跃用户 = 当日产生订单行为（不含浏览）
- ……
基于以上口径回答我的问题，口径冲突时以本卡片为准。`
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
  grid.innerHTML = list.map((s, i) => `
    <article class="card skill-item">
      <div class="note-meta"><span class="note-tag">${s.tag}</span></div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <div class="prompt-box">
        <button class="copy-btn" data-idx="${skills.indexOf(s)}" aria-label="复制">📋 复制</button>
        <pre>${esc(s.prompt)}</pre>
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
  const idx = Number(btn.dataset.idx);
  navigator.clipboard.writeText(skills[idx].prompt).then(() => {
    const original = btn.textContent;
    btn.textContent = '✅ 已复制';
    setTimeout(() => { btn.textContent = original; }, 1500);
  });
});
