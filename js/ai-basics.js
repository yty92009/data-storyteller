// AI 基础知识速查数据：新增概念只需在数组里加一项
// term 中文名 / en 英文原名 / oneline 一句话定义 / detail 展开说明（面向数据分析师）
const basics = [
  {
    term: 'LLM',
    en: 'Large Language Model · 大语言模型',
    oneline: '读完了海量文本后训练出来的「下一个词预测机器」，却因此涌现出了推理、写作、写代码的能力。',
    detail: 'LLM 是 ChatGPT、Claude、Kimi 背后的模型本体。对分析师要记住三点：它生成的是概率上「像对的」内容，不一定「是对的」（见幻觉）；它只知道训练截止日之前的事，不知道你公司今天的数；它的能力上限取决于你给它的输入质量——所以「喂好上下文」是分析师用 AI 的第一技能。'
  },
  {
    term: 'Prompt',
    en: 'Prompt Engineering · 提示词工程',
    oneline: '你发给 AI 的每一段话就是 Prompt；提示词工程就是把「提需求」变成一门可复用的手艺。',
    detail: '同一个模型，Prompt 写得好坏结果天差地别。可复用的结构：角色（你是资深数据工程师）+ 背景（这是我们表的 DDL）+ 任务（写环比 SQL）+ 输出格式（只要 SQL，加注释）。经验法则：把 AI 当成一个很聪明但完全不了解你公司的新同事——它缺什么上下文，你就补什么。'
  },
  {
    term: 'Token',
    en: '词元',
    oneline: 'AI 处理文本的最小单位，一个汉字约 1~2 个 token，也是模型计费和限速的计量单位。',
    detail: '模型的「阅读量」和「写作量」都用 token 计量：你发给它的一段表结构可能消耗几千 token，它回答的 SQL 又消耗几百。理解 token 的实际意义是：长文档能不能一次塞进去、多轮对话为什么越聊越贵、为什么要在 Prompt 里「省着说」。'
  },
  {
    term: '上下文窗口',
    en: 'Context Window',
    oneline: '模型一次能「记住」的对话总量上限，以 token 计——相当于 AI 的工作记忆。',
    detail: '窗口内的内容模型都看得见，窗口外的它完全不知道。这就是为什么聊着聊着它「忘了」开头的要求（对话超长了），为什么整份指标口径文档可以一次喂给 Claude（长窗口）而 GPT 早期版本不行。实操含义：重要约束放在对话里反复强调，或者干脆每次都带上关键背景。'
  },
  {
    term: '幻觉',
    en: 'Hallucination',
    oneline: '模型一本正经地编造事实——引用不存在的字段、编造从未发生的数据，语气还特别自信。',
    detail: '幻觉的根源是 LLM 本质上在做「概率接龙」而不是查事实库。分析师最容易踩的坑：让它写 SQL 时编造不存在的列名、做归因时脑补业务原因。防御三板斧：给真实的表结构和示例数据（不给它编的空间）、要求它标注不确定的地方、关键结论用数据交叉验证。'
  },
  {
    term: 'Agent',
    en: 'AI Agent · 智能体',
    oneline: 'LLM + 工具 + 循环 = Agent：不只回答问题，还能自己调工具、看结果、决定下一步，直到把任务做完。',
    detail: '普通对话是「一问一答」，Agent 是「给目标、自己干」：它能执行代码、查数据库、读文件，根据每步结果决定下一步动作。例：你对分析 Agent 说「查一下上月华东区销售额异动原因」，它会自己拆维度、跑 SQL、看中间结果、换角度再查——像带了一个实习生。你搭的数仓和数据体系，正是 Agent 干活的地基。'
  },
  {
    term: 'Skill',
    en: 'Agent Skill · 智能体技能',
    oneline: '一个装着「说明书 + 脚本 + 参考资料」的文件夹（核心是 SKILL.md），教会 Agent 一项可复用的专项能力。',
    detail: 'Skill 由 Anthropic 提出、已成开放生态：把某类任务的流程和最佳实践写成 SKILL.md，Agent 遇到相关任务时自动加载这套说明来干活。比如 PPT Master 就是一个教 Agent「怎么生成专业 PPT」的技能。和 Prompt 的区别：Prompt 是一次性的口头指令，Skill 是沉淀下来的标准作业程序（SOP）——这对做数据治理的你应该很熟悉：把个人经验流程化，才能复用。'
  },
  {
    term: 'MCP',
    en: 'Model Context Protocol · 模型上下文协议',
    oneline: '给 AI 接外部工具和数据源的开放标准——AI 世界的「USB-C 接口」。',
    detail: '由 Anthropic 于 2024 年发布。以前让 AI 读你的数据库、调你的 API，每个工具都要单独写对接；MCP 把「AI 怎么调工具」标准化了：工具方实现一次 MCP 服务，所有支持 MCP 的 AI（Claude、Cursor 等）都能即插即用。对分析师的意义：意味着「AI 直连你的数仓/BI」有了通用做法——ChatBI、AI 自动取数都建在这类协议上，值得关注。'
  },
  {
    term: 'RAG',
    en: 'Retrieval-Augmented Generation · 检索增强生成',
    oneline: '回答问题前，先去知识库里检索相关资料，再让 LLM 基于资料作答——先查资料，再开口。',
    detail: '解决两个痛点：模型不知道你的私有数据（指标口径、业务规则），以及直接问它会幻觉。做法是把文档切块、存进向量库，用户提问时先检索最相关的片段塞进上下文，模型照着资料答。企业里的「智能问数」「口径助手」大多就是 RAG + 指标字典的组合——想做 ChatBI 的你，RAG 是必修课。'
  }
];

// 渲染顶部快速导航
const nav = document.getElementById('termNav');
nav.innerHTML = basics.map((b, i) =>
  `<a class="filter-btn" href="#term-${i}" style="text-decoration: none;">${b.term}</a>`
).join('');

// 渲染概念卡片
const grid = document.getElementById('termGrid');
function renderTerms() {
  grid.innerHTML = basics.map((b, i) => `
    <article class="card term-card" id="term-${i}">
      <div class="note-meta"><span class="note-tag">${b.term}</span></div>
      <h3>${b.term} <span class="term-en">${b.en}</span></h3>
      <p class="term-oneline">${b.oneline}</p>
      <p class="term-detail">${b.detail}</p>
    </article>
  `).join('');
}
renderTerms();
