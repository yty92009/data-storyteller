// AI 基础知识速查数据
// 内容参考 Ethan 的学习笔记「ai agent 相关知识」（Obsidian: 10-面试-职业发展）
// 新增概念只需在数组里加一项
// term 中文名 / en 英文原名 / oneline 一句话定义 / detail 展开说明 / example 实战案例（可选）
const basics = [
  {
    term: 'LLM',
    en: 'Large Language Model · 大语言模型',
    oneline: '模型能力本身：擅长理解语言、归纳信息和生成回答，但默认不知道企业内部数据，也不能天然访问数据库。',
    detail: 'LLM 是 ChatGPT、Claude、Kimi 背后的模型本体。要记住三点：它生成的是概率上「像对的」内容，不一定「是对的」（见幻觉）；它只知道训练截止日之前的事；输入质量决定输出质量——所以「喂好上下文」是用 AI 的第一技能。',
    example: '输入：异常数据 + 业务知识 + 工具结果；输出：归因结论、证据和建议。'
  },
  {
    term: 'Prompt',
    en: 'Prompt Engineering · 提示词工程',
    oneline: '你发给 AI 的每一段话就是 Prompt；提示词工程就是把「提需求」变成一门可复用的手艺。',
    detail: 'Prompt 的职责是规定角色、任务、输入、输出和限制。可复用结构：角色（你是资深数据工程师）+ 背景（表 DDL）+ 任务（写环比 SQL）+ 输出格式（只要 SQL，加注释）。把 AI 当成一个很聪明但完全不了解你公司的新同事——它缺什么上下文，你就补什么。',
    example: '要求 Agent 输出原因、证据和置信度，而不是一句笼统结论。'
  },
  {
    term: 'Token',
    en: '词元',
    oneline: 'AI 处理文本的最小单位，一个汉字约 1~2 个 token，也是模型计费和限速的计量单位。',
    detail: '模型的「阅读量」和「写作量」都用 token 计量。理解 token 的实际意义：长文档能不能一次塞进去、多轮对话为什么越聊越贵、为什么要在 Prompt 里「省着说」。'
  },
  {
    term: '上下文窗口',
    en: 'Context Window',
    oneline: '模型一次能「记住」的对话总量上限——相当于 AI 的工作记忆。',
    detail: '窗口内的内容模型都看得见，窗口外的它完全不知道。这就是为什么聊着聊着它「忘了」开头的要求。实操含义：重要约束反复强调，或每次都带上关键背景。'
  },
  {
    term: '幻觉',
    en: 'Hallucination',
    oneline: '模型一本正经地编造事实——引用不存在的字段、编造从未发生的数据，语气还特别自信。',
    detail: '幻觉的根源是 LLM 本质上在做「概率接龙」而不是查事实库。分析师最容易踩的坑：让它写 SQL 时编造不存在的列名、做归因时脑补业务原因。防御三板斧：给真实的表结构和示例数据、要求它标注不确定的地方、关键结论用数据交叉验证。'
  },
  {
    term: 'Agent',
    en: 'AI Agent · 智能体',
    oneline: '以 LLM 为推理核心，结合 Prompt、知识库、RAG、Memory、工具和工作流，围绕一个业务目标完成理解、判断、调用工具、执行动作和反馈闭环的应用系统。',
    detail: 'Agent = LLM + Prompt + RAG + Memory + Tools + 业务流程。它可以决定是否检索知识、调用哪个工具、是否需要人工复核、下一步执行什么动作。两个常见误区：Agent 不等于一个聊天机器人，也不等于「工作流里加一个 AI 节点」。',
    example: '数据质量专家 Agent、Amazon VC 专家 Agent——每个都是围绕一项业务任务搭建的应用层。'
  },
  {
    term: 'Workflow',
    en: '工作流编排',
    oneline: '确定性的流程编排：固定步骤、条件分支、定时触发、失败重试——它不是 Agent，但可以是 Agent 的编排底座。',
    detail: 'Workflow 与 Agent 的分工心法：确定性系统保证事实，Agent 负责理解和编排。平台和业务规则明确时，用工作流的 Switch / IF 节点做分流，比让 LLM 自由决定更稳定、可解释。',
    example: 'n8n 负责定时触发、SQL 查询、条件判断、调用 Agent、失败重试、负责人映射、钉钉 Webhook 通知。'
  },
  {
    term: 'RAG',
    en: 'Retrieval-Augmented Generation · 检索增强生成',
    oneline: '回答之前先检索企业知识库，把相关知识放进 Prompt 再让 LLM 作答——先查资料，再开口。',
    detail: 'RAG 解决的问题是「Agent 当前应该参考哪些企业知识」。入库流程：文档读取 → 文本切分 → Embedding → 写入向量库（标注知识类型、平台、版本、审核状态）。查询流程：生成检索问题 → 向量检索 → 相关知识与实时数据一起发给 LLM。注意边界：RAG 不能替代实时数据库查询，也不能让模型自动学会企业业务。',
    example: '检索利润口径、费用规则、历史案例，与 Hive 实时数据一起交给 LLM 生成归因结果。'
  },
  {
    term: 'Embedding',
    en: '向量化',
    oneline: '把一段文本转换成一组数字向量，让系统能按「语义相似度」而不是关键词匹配来搜索。',
    detail: '「物流费用上涨导致利润下降」→ [0.12, -0.31, 0.88, ...]。语义相近的文本向量距离相近，所以即使用词不同也能检索到相关知识——这是 RAG 能「理解」问题的底层机制。',
    example: '把历史异常案例转换成向量存入知识库，新异常发生时按语义找到相似旧案例。'
  },
  {
    term: '向量数据库',
    en: 'Vector Database',
    oneline: '保存文本片段、向量和元数据，按语义相似度检索知识的数据库。',
    detail: '它不替代实时数据查询，两者各司其职：「今天利润率是多少」→ 查 Hive；「利润率怎么算、哪些因素会影响利润率」→ 查 RAG 知识库。事实归数据库，知识归向量库。',
    example: 'Qdrant、RAGFlow 内置向量引擎。'
  },
  {
    term: 'Memory · Context · State',
    en: '记忆 · 上下文 · 状态',
    oneline: '最简单的区分：RAG = 查资料，Memory = 记事情，Context = 当前正在处理的信息，State = 流程进行到哪一步。',
    detail: 'Context 是当前一次任务送给 LLM 的信息（当前平台、SKU、异常值、SQL 结果）；Memory 保存过去的对话、工具结果和用户反馈；State 记录任务处于哪个阶段（如 QUALITY_PASSED、WAITING_FEEDBACK）。重要状态应落库保存，可追溯、可恢复。',
    example: '状态表：alert_event、agent_run、agent_step、tool_call_log、retrieval_log、agent_result、erp_feedback、validated_case。'
  },
  {
    term: 'Tool',
    en: '工具调用',
    oneline: 'Agent 能够调用的外部能力：查数据库、查元数据、查血缘、发通知——工具执行，Agent 判断。',
    detail: '准确的分工是：工具负责执行查询或检查，Agent 负责理解工具结果并做判断。企业 Agent 的常见工具集：数据查询（Hive / MySQL）、数据质量检查、元数据查询、数据血缘查询、负责人映射、消息推送（Webhook）。',
    example: 'SKU、平台、业务类型 → 负责人 → 钉钉 UserID，一条映射工具链路。'
  },
  {
    term: 'Router',
    en: 'Agent 路由器 · 子 Agent',
    oneline: '分流中枢：根据平台、业务类型、任务状态等条件，把任务交给合适的专家 Agent。',
    detail: '路由优先用确定性规则实现（如 platform = Amazon AND business_type = VC → Amazon_VC_Agent），比让 LLM 自由决定更稳定、可解释。业务越多元，越需要「总控 Agent + 领域专家 Agent」的分层结构。',
    example: '平台路由器把任务分流到 Amazon VC / SC / Temu / TikTok 四个专家 Agent。'
  },
  {
    term: 'Evaluation',
    en: '评估与反馈闭环',
    oneline: '衡量 Agent 结果是否准确、稳定、可解释：误报率、漏报率、归因准确率。',
    detail: '持续改进不是去改基础模型，而是运营闭环：人工反馈 → 发现知识缺口 → 优化规则、Prompt、知识片段和路由 → 离线评估 → 人工审核 → 发布新版本。审核后的反馈沉淀为标准案例进入知识库，供后续检索复用。',
    example: '业务人员在 ERP 确认异常、填写实际原因，审核后同步进 RAGFlow 案例库。'
  },
  {
    term: 'Skill',
    en: 'Agent Skill · 智能体技能',
    oneline: '一个装着「说明书 + 脚本 + 参考资料」的文件夹（核心是 SKILL.md），教会 Agent 一项可复用的专项能力。',
    detail: 'Skill 由 Anthropic 提出、已成开放生态：把某类任务的流程和最佳实践写成 SKILL.md，Agent 遇到相关任务时自动加载这套说明来干活。和 Prompt 的区别：Prompt 是一次性的口头指令，Skill 是沉淀下来的标准作业程序（SOP）——把个人经验流程化，正是数据治理的思路。'
  },
  {
    term: 'MCP',
    en: 'Model Context Protocol · 模型上下文协议',
    oneline: '给 AI 接外部工具和数据源的开放标准——AI 世界的「USB-C 接口」。',
    detail: '由 Anthropic 于 2024 年发布。以前让 AI 读数据库、调 API 要逐个对接；MCP 把「AI 怎么调工具」标准化：工具方实现一次 MCP 服务，所有支持 MCP 的 AI 都能即插即用。对分析师的意义：「AI 直连数仓/BI」有了通用做法——ChatBI、AI 自动取数都建在这类协议上。'
  }
];

// Agent 全景（通栏卡片）
const agentOverview = {
  oneline: 'AI Agent 是以 LLM 为推理核心，结合 Prompt、知识库、RAG、Memory、工具和工作流，围绕业务目标完成「理解 → 判断 → 调用工具 → 执行动作 → 反馈闭环」的应用系统。',
  flow: '业务目标 → Agent 理解任务 → 检索知识 → 调用工具获取事实 → LLM 分析和决策 → 执行动作 → 保存状态和反馈 → 持续评估和优化',
  formula: 'Agent = LLM + Prompt + RAG + Memory + Tools + 业务流程',
  principle: '确定性系统保证事实，Agent 负责理解和编排，RAG 提供知识，工作流负责执行。'
};

// 渲染顶部快速导航
const termNavBox = document.getElementById('termNav');
termNavBox.innerHTML = basics.map((b, i) =>
  `<a class="filter-btn" href="#term-${i}" style="text-decoration: none;">${b.term}</a>`
).join('');

// 渲染概念卡片
const termGridEl = document.getElementById('termGrid');
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function renderTerms() {
  termGridEl.innerHTML = `
    <article class="card term-card overview-card">
      <h3>🤖 AI Agent 全景</h3>
      <p class="term-oneline">${agentOverview.oneline}</p>
      <div class="overview-flow">${esc(agentOverview.flow)}</div>
      <p class="overview-formula">${esc(agentOverview.formula)}</p>
      <p class="term-detail">${agentOverview.principle}</p>
    </article>
  ` + basics.map((b, i) => `
    <article class="card term-card" id="term-${i}">
      <div class="note-meta"><span class="note-tag">${b.term}</span></div>
      <h3>${b.term} <span class="term-en">${b.en}</span></h3>
      <p class="term-oneline">${b.oneline}</p>
      <p class="term-detail">${b.detail}</p>
      ${b.example ? `<p class="term-example">💡 实战：${b.example}</p>` : ''}
    </article>
  `).join('');
}
renderTerms();
