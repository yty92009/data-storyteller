// Agent 项目实战数据：归纳自 Ethan 的学习项目（Obsidian: AI Agents 教程/实战项目-电商问数）
// 新增项目只需在数组里加一项；detailPage 为三级详情页链接（可选）
const projects = [
  {
    name: '电商问数',
    en: 'E-commerce NL2SQL Agent',
    status: '实战学习中',
    statusColor: '#ea580c',
    tagline: '把「人能看懂的问题」翻译成「数据库能执行的 SQL」——一套围绕元数据知识库构建与检索增强的 NL2SQL 智能体项目，也是我 BI + AI 转型方向的第一落地实战。',
    repo: 'https://github.com/didilili/shopkeeper-agent',
    detailPage: 'agent-project-eshop.html',
    highlights: [
      { k: '业务问题', v: '业务同学不会写 SQL，分析师记不住所有表结构和指标口径；用自然语言提问，系统自动定位表、字段、指标，生成并执行 SQL 返回分析结果。' },
      { k: '技术架构', v: '五层设计：MySQL 教学数仓（维度建模）→ 元数据知识库 → Qdrant 语义检索 + ES 取值检索（双路混合召回）→ LangGraph 多阶段工作流 → FastAPI + SSE 流式交付。' },
      { k: '智能体设计', v: '九步闭环工作流：关键词抽取 → 三路并行召回（字段/指标/取值）→ 合并 → 过滤补全 → 生成 SQL → 校验 → 条件分支校正 → 执行 → 流式返回。' },
      { k: '核心认知', v: '大模型不能裸写 SQL：选表靠元数据检索、条件值靠取值映射、三类信息分开建索引、召回结果要过滤补全、SQL 生成后必须校验纠错——「生成不等于正确」。' }
    ],
    stages: [
      { name: '数据与基础设施', detail: '第 1~6 章：数仓基础 · 整体架构 · 环境准备 · Qdrant / ES / MySQL / Embedding 接入' },
      { name: '元数据知识库', detail: '第 7~9 章：知识库总览 · 表与字段同步入库 · 字段与指标检索能力构建' },
      { name: '问数智能体', detail: '第 10~14 章：LangGraph 工作流骨架 · 关键词抽取与多路召回 · 上下文构建 · SQL 生成与执行闭环' },
      { name: '服务交付', detail: '第 15~17 章：FastAPI 接口 · 查询接口与依赖组装 · 前后端联调与日志追踪' }
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
      ${p.highlights.map(s => `
        <div class="skill-block">
          <strong>${s.k}</strong>
          <p>${s.v}</p>
        </div>
      `).join('')}
      <div class="skill-block">
        <strong>🗺️ 学习路径（${p.stages.length} 个阶段 · 17 章）</strong>
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
      ${p.detailPage ? `<div style="margin-top: 18px; text-align: center;"><a class="btn btn-primary" href="${p.detailPage}">查看完整拆解：架构图 · 全流程 · 逐章笔记 →</a></div>` : ''}
    </article>
  `).join('');
}
renderProjects();
