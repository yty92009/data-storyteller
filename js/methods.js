// 分析方法渲染：methods.html 渲染卡片列表；method-detail.html?id=xxx 渲染详情
// 数据来自 methods-data.js（全局 METHODS）
(function () {
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ---------- 列表页 ----------
  const grid = document.getElementById('methodsGrid');
  if (grid) {
    grid.innerHTML = METHODS.map(m =>
      '<a class="card method-card" href="method-detail.html?id=' + m.id + '">' +
      '  <span class="method-no">' + m.no + '</span>' +
      '  <h3>' + m.icon + ' ' + m.name + '</h3>' +
      '  <p>' + m.oneline + '</p>' +
      '  <span class="method-more">详解与实战案例 →</span>' +
      '</a>'
    ).join('');
  }

  // ---------- 详情页 ----------
  const detail = document.getElementById('methodDetail');
  if (!detail) return;

  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const idx = METHODS.findIndex(m => m.id === id);
  if (idx < 0) {
    detail.innerHTML =
      '<div class="card" style="text-align:center; padding:40px 20px;">' +
      '<p>没有找到这个分析方法。<a href="methods.html" class="accent">返回分析方法列表 →</a></p></div>';
    return;
  }
  const m = METHODS[idx];
  document.title = m.name + ' · 分析方法 · 数据分析知识库';

  const prev = METHODS[(idx - 1 + METHODS.length) % METHODS.length];
  const next = METHODS[(idx + 1) % METHODS.length];

  let fig = '';
  if (typeof METHOD_FIGURES !== 'undefined' && METHOD_FIGURES[m.id]) {
    fig = '<figure class="method-fig">' + METHOD_FIGURES[m.id].svg
      + '<figcaption>' + METHOD_FIGURES[m.id].caption + '</figcaption></figure>';
  }

  detail.innerHTML =
    '<article class="card method-detail-card">' +
    '  <div class="note-meta"><span class="note-tag">' + m.no + ' · ' + m.en + '</span></div>' +
    '  <h3 class="method-detail-title">' + m.icon + ' ' + m.name + '</h3>' +
    '  <p class="term-oneline">' + m.oneline + '</p>' +
    fig +

    '  <div class="skill-block"><strong>📖 详解</strong>' +
    m.intro.map(p => '<p>' + p + '</p>').join('') + '</div>' +

    '  <div class="skill-block"><strong>🎯 适用场景</strong>' +
    '    <div class="tag-list" style="margin-top:10px;">' + m.scenes.map(s => '<li>' + s + '</li>').join('') + '</div></div>' +

    '  <div class="skill-block"><strong>🛠️ 如何应用</strong>' +
    '    <div class="method-steps">' +
    m.steps.map((s, i) =>
      '<div class="stage-item"><span class="stage-no">' + (i + 1) + '</span><div><span>' + s + '</span></div></div>'
    ).join('') +
    '    </div></div>' +

    '  <div class="skill-block"><strong>💡 实战案例</strong>' +
    m.cases.map(c =>
      '<div class="case-card">' +
      '  <div class="note-meta"><span class="note-tag">' + c.tag + '</span><strong class="case-title">' + c.title + '</strong></div>' +
      '  <p>' + c.body + '</p>' +
      '  <p class="case-result">✅ ' + c.result + '</p>' +
      '</div>'
    ).join('') + '</div>' +

    '  <div class="skill-block"><strong>⚠️ 常见陷阱</strong>' +
    '    <ul class="pitfall-list">' + m.pitfalls.map(p => '<li>' + p + '</li>').join('') + '</ul></div>' +

    '  <div class="prev-next">' +
    '    <a class="btn btn-ghost" href="method-detail.html?id=' + prev.id + '">← ' + prev.name + '</a>' +
    '    <a class="btn btn-ghost" href="methods.html">全部方法</a>' +
    '    <a class="btn btn-ghost" href="method-detail.html?id=' + next.id + '">' + next.name + ' →</a>' +
    '  </div>' +
    '</article>';
})();
