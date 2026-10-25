// 学习笔记数据：新增笔记只需在数组里加一项即可
const notes = [
  {
    date: '2026-10-25',
    tag: '方法论',
    title: '如何搭建一个业务指标体系',
    summary: '从业务目标出发，用 OSM 模型拆解：目标（GMV）→ 策略（拉新/转化/复购）→ 度量（对应北极星指标与指标树），再校验每个指标是否有 owner、有口径文档。'
  },
  {
    date: '2026-10-25',
    tag: 'SQL',
    title: '窗口函数实战：连续登录用户',
    summary: '用 row_number() over (partition by user_id order by dt) 与日期差值分组，即可算出连续 N 天登录的用户数。注意先去重再分组。'
  },
  {
    date: '2026-10-25',
    tag: 'AI',
    title: '让 LLM 写 SQL 的 Prompt 模板',
    summary: '关键三要素：完整表结构 DDL + 每字段业务含义注释 + 2~3 行示例数据。输出要求「只给 SQL，不要解释」，准确率明显提升。'
  }
  // 新笔记在这里继续添加……
];

const list = document.getElementById('notesList');
list.innerHTML = notes.map(n => `
  <article class="card note">
    <div class="note-meta">
      <span class="note-tag">${n.tag}</span><span>${n.date}</span>
    </div>
    <h3>${n.title}</h3>
    <p>${n.summary}</p>
  </article>
`).join('');

document.getElementById('statNotes').textContent = notes.length + ' 篇';
