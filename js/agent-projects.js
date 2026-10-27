// Agent 项目实战数据：归纳自 Ethan 的学习项目（Obsidian: AI Agents 教程/实战项目-电商问数）
// 新增项目只需在数组里加一项
const projects = [
  {
    name: '电商问数',
    en: 'E-commerce NL2SQL Agent',
    status: '实战学习中',
    statusColor: '#ea580c',
    tagline: '把「人能看懂的问题」翻译成「数据库能执行的 SQL」——一套围绕元数据知识库构建与检索增强的 NL2SQL 智能体项目。',
    repo: 'https://github.com/didilili/shopkeeper-agent',
    sections: [
      {
        icon: '🎯',
        title: '它解决什么问题',
        body: '业务同学不会写 SQL，分析师也记不住所有表结构和指标口径。「电商问数」让用户直接用自然语言提问（如「华北地区各品牌销售总额」），系统自动定位相关表、字段和指标，生成并执行 SQL，返回分析结果——即 ChatBI / 智能问数的核心场景，也正是我 BI + AI 转型方向的第一落地项目。'
      },
      {
        icon: '🧱',
        title: '技术架构（五层）',
        body: '数据层：MySQL 模拟教学数仓（维度建模：事实表 + 维度表）；知识层：元数据知识库统一管理表、字段、指标、字段取值；检索层：Qdrant 做字段与指标的语义向量检索，Elasticsearch 做字段真实取值的全文检索，双路混合召回；智能体层：LangGraph 编排多阶段问数工作流；服务层：FastAPI + SSE 流式推送执行过程，前端实时可见每一步。'
      },
      {
        icon: '⚙️',
        title: '智能体工作流（九步闭环）',
        body: '用户提问 → 关键词抽取 → 召回字段信息 / 指标信息 / 字段取值（多路召回）→ 合并召回信息 → 过滤与补全上下文 → 生成 SQL → 校验与纠错 → 执行 SQL → 结果与过程流式返回。前端能看到 LangGraph 每一步的执行进度，而不是黑盒等待。'
      },
      {
        icon: '💡',
        title: '关键认知：为什么不能让大模型裸写 SQL',
        body: '① 多张事实表和维度表，模型怎么知道该查哪张——靠元数据检索选表；② 用户说「华北」「黄金会员」「苹果品牌」，要定位到真实的字段和字段值——靠取值检索做映射；③ 字段、指标、字段取值必须分开建索引，因为它们的检索方式完全不同；④ 召回的信息不能直接丢给模型——要合并、过滤、补全成模型好用的上下文；⑤ 生成的 SQL 要先校验纠错再执行——生成不等于正确。'
      }
    ],
    stages: [
      { name: '数据与基础设施', detail: '数仓基础 · 架构设计 · 环境准备 · Qdrant/ES/MySQL/Embedding 接入' },
      { name: '元数据知识库', detail: '表与字段同步入库 · 字段与指标检索能力构建' },
      { name: '问数智能体', detail: 'LangGraph 工作流骨架 · 多路召回 · 上下文构建 · SQL 生成与执行闭环' },
      { name: '服务交付', detail: 'FastAPI 接口 · SSE 流式推送 · 前后端联调 · 日志追踪' }
    ],
    takeaway: '这个项目最大的价值不是「会用 LangGraph」，而是看懂一个智能问数系统是怎么一层层长出来的：数据层保事实、知识层保口径、检索层保准确、智能体层保推理、服务层保交付——和我在数据治理里「口径先行」的思路完全同构。'
  }
];

// 渲染项目卡片
const projectList = document.getElementById('projectList');
function renderProjects() {
  projectList.innerHTML = projects.map(p => `
    <article class="card project-card">
      <div class="note-meta">
        <span class="note-tag">${p.en}</span>
        <span class="project-status" style="color: ${p.statusColor}; border-color: ${p.statusColor};">● ${p.status}</span>
      </div>
      <h3 class="project-name">${p.name}</h3>
      <p class="term-oneline">${p.tagline}</p>
      ${p.sections.map(s => `
        <div class="skill-block">
          <strong>${s.icon} ${s.title}</strong>
          <p>${s.body}</p>
        </div>
      `).join('')}
      <div class="skill-block">
        <strong>🗺️ 学习路径（${p.stages.length} 个阶段）</strong>
        <div class="project-stages">
          ${p.stages.map((s, i) => `
            <div class="stage-item">
              <span class="stage-no">${i + 1}</span>
              <div><strong>${s.name}</strong><span>${s.detail}</span></div>
            </div>
          `).join('')}
        </div>
      </div>
      <p class="term-example">✍️ 我的收获：${p.takeaway}</p>
      <p class="term-example">🔗 源码仓库：<a href="${p.repo}" target="_blank" rel="noopener" class="accent">${p.repo}</a></p>
    </article>
  `).join('');
}
renderProjects();
