// 主题切换
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// 移动端菜单
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);

// 「AI 资源」下拉菜单（触屏 / 移动端点击展开，桌面端悬停展开）
document.querySelectorAll('.nav-drop-btn').forEach(btn =>
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const drop = btn.parentElement;
    const wasOpen = drop.classList.contains('open');
    document.querySelectorAll('.nav-drop.open').forEach(d => d.classList.remove('open'));
    if (!wasOpen) drop.classList.add('open');
  })
);
document.addEventListener('click', e => {
  if (!e.target.closest('.nav-drop')) {
    document.querySelectorAll('.nav-drop.open').forEach(d => d.classList.remove('open'));
  }
});

// 滚动渐入动画
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 数据链路环节详情弹窗（仅首页有此模块，二级页面跳过）
const stageModalEl = document.getElementById('stageModal');
const STAGES = {
  acquire: {
    title: '📥 数据获取',
    goal: '目标：多渠道稳定取数，让数据「进得来」',
    items: [
      { name: '数据 API 对接', desc: '对接各业务平台开放接口，处理鉴权、分页拉取与频控限制，实现数据程序化获取。' },
      { name: '数据自动下载', desc: '将人工重复的下载动作脚本化、定时化，配合 RPA 实现无人工干预的每日自动取数。' },
      { name: '数据爬虫', desc: '使用 Python 对无接口的数据源进行采集，应对反爬策略，保证数据的完整与连续。' },
      { name: '数据源管理', desc: '维护数据源清单与可用性监控，新增数据源快速评估与接入。' }
    ]
  },
  develop: {
    title: '🧱 数仓开发',
    goal: '目标：把原始数据加工成可信的分析底表，让数据「用得上」',
    items: [
      { name: '数仓分层设计', desc: '按 ODS → DWD → DWS → ADS 分层建模，职责清晰、复用性强。' },
      { name: 'Snowflake 云数仓', desc: '基于 Snowflake 建模开发，利用存算分离与弹性扩缩容支撑 BI 查询负载。' },
      { name: '数据清洗（SQL / Python）', desc: '去重、补缺、异常值处理与格式标准化，输出可信的分析级数据。' },
      { name: '数据入库', desc: '加工后的数据规范化入库，支持全量与增量两种写入方式。' }
    ]
  },
  schedule: {
    title: '⚙️ 调度与运维',
    goal: '目标：自动化稳定运行，让数据「跑得稳」',
    items: [
      { name: 'Airflow DAG 调度', desc: '用 Airflow 编排每日任务的依赖关系，失败自动重试与告警。' },
      { name: '数据质量门禁', desc: 'DAG 中内置质量关卡：数据缺失或异常直接阻断进入下一步，坏数据不流出。' },
      { name: '每日数据自动化', desc: '核心数据 T+1 自动产出，SLA 可监控、可追溯，无需人工值守。' }
    ]
  },
  govern: {
    title: '🛡️ 数据治理',
    goal: '目标：让数据可信、安全、可追溯',
    items: [
      { name: '跨平台口径统一', desc: '识别不同平台间的字段定义、统计维度与计算口径差异，建立统一映射规则。' },
      { name: '主数据表建设', desc: '沉淀用户、商品、组织等核心维度的主数据表，保证全公司「一份正确的底表」。' },
      { name: '分摊规则设计', desc: '定义成本、收入等数据的分摊维度、比例与例外规则，并推动规则在数仓中落地实现。' },
      { name: '数据血缘管理', desc: '维护表级 / 字段级血缘，影响分析、口径追溯一键可达。' },
      { name: '数据权限管控', desc: '按角色与部门管控数据访问范围，敏感数据分级可见。' }
    ]
  }
};

const modal = stageModalEl;
if (modal) {
  const modalTitle = document.getElementById('modalTitle');
  const modalGoal = document.getElementById('modalGoal');
  const modalList = document.getElementById('modalList');

  function openStage(key) {
    const s = STAGES[key];
    if (!s) return;
    modalTitle.textContent = s.title;
    modalGoal.textContent = s.goal;
    modalList.innerHTML = s.items.map(it =>
      `<li><strong>${it.name}</strong><span>${it.desc}</span></li>`
    ).join('');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeStage() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.pipe-node').forEach(btn =>
    btn.addEventListener('click', () => openStage(btn.dataset.stage))
  );
  modal.querySelectorAll('[data-close]').forEach(el =>
    el.addEventListener('click', closeStage)
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeStage();
  });
}
