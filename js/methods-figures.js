// 每个分析方法的配套示意图（内联 SVG，颜色用 CSS 变量，自动适配深浅色主题）
// caption 为图下方的说明文字
const METHOD_FIGURES = {
  '5w2h': {
    caption: '七个问题对应七个必须与需求方对齐的信息点',
    svg: '<svg viewBox="0 0 640 210" role="img" aria-label="5W2H 七问示意图">'
      + '<g font-size="14">'
      + box(22, 26, 140, 64, 'What', '什么问题', .85)
      + box(174, 26, 140, 64, 'Why', '为什么·目的', .72)
      + box(326, 26, 140, 64, 'Who', '谁·涉及谁', .6)
      + box(478, 26, 140, 64, 'When', '何时发生', .5)
      + box(98, 122, 140, 64, 'Where', '哪个环节', .72)
      + box(250, 122, 140, 64, 'How', '怎么发生', .6)
      + box(402, 122, 140, 64, 'How much', '影响多大', .5)
      + '</g></svg>'
  },
  dupont: {
    caption: '核心指标逐层拆解成可行动的因子树（以净利润为例）',
    svg: '<svg viewBox="0 0 640 300" role="img" aria-label="杜邦指标树">'
      + line(320, 50, 140, 108) + line(320, 50, 320, 108) + line(320, 50, 500, 108)
      + line(140, 150, 70, 208) + line(140, 150, 190, 208)
      + line(320, 150, 270, 208) + line(320, 150, 380, 208)
      + line(500, 150, 480, 208) + line(500, 150, 560, 208)
      + node(250, 10, 140, 40, '净利润', .9)
      + node(60, 110, 160, 40, '销售收入', .7)
      + node(240, 110, 160, 40, '各项成本', .7)
      + node(420, 110, 160, 40, '平台费用', .7)
      + node(20, 210, 100, 36, '销量', .5)
      + node(140, 210, 100, 36, '客单价', .5)
      + node(220, 210, 100, 36, '采购成本', .5)
      + node(330, 210, 100, 36, '头程物流', .5)
      + node(430, 210, 100, 36, '广告费', .5)
      + node(530, 210, 100, 36, '仓储费', .5)
      + '</svg>'
  },
  funnel: {
    caption: '流量漏斗示意（示例数据）：宽度直观呈现各阶段规模，右侧为层间转化率',
    svg: (function () {
      var layers = [
        { w1: 560, w2: 430, name: '曝光', op: .9 },
        { w1: 430, w2: 310, name: '点击', op: .74 },
        { w1: 310, w2: 200, name: '访问', op: .58 },
        { w1: 200, w2: 120, name: '加购', op: .42 },
        { w1: 120, w2: 60, name: '支付', op: .28 }
      ];
      var rates = ['↓ 42%', '↓ 43%', '↓ 33%', '↓ 40%'];
      var cx = 320, h = 44, gap = 28, y0 = 16;
      var s = '<svg viewBox="0 0 640 352" role="img" aria-label="流量漏斗图"><g font-size="15">';
      for (var i = 0; i < layers.length; i++) {
        var L = layers[i], y = y0 + i * (h + gap);
        s += '<polygon points="' + (cx - L.w1 / 2) + ',' + y + ' ' + (cx + L.w1 / 2) + ',' + y + ' '
          + (cx + L.w2 / 2) + ',' + (y + h) + ' ' + (cx - L.w2 / 2) + ',' + (y + h)
          + '" fill="var(--accent)" opacity="' + L.op + '"/>';
        s += '<text x="' + cx + '" y="' + (y + 29) + '" text-anchor="middle" fill="var(--bg)" font-weight="700">' + L.name + '</text>';
        if (i < rates.length) {
          s += '<text x="' + cx + '" y="' + (y + h + 20) + '" text-anchor="middle" fill="var(--muted)" font-size="13">' + rates[i] + '</text>';
        }
      }
      return s + '</g></svg>';
    })()
  },
  rfm: {
    caption: 'R 最近消费 × F 频次 × M 金额，三维度组合出 8 类用户，每层对应不同运营动作',
    svg: '<svg viewBox="0 0 640 240" role="img" aria-label="RFM 八类用户分层">'
      + '<text x="320" y="22" text-anchor="middle" fill="var(--muted)" font-size="13">R ↑ 最近消费近 · F ↑ 频次高 · M ↑ 金额大 → 价值越高</text>'
      + '<g font-size="14">'
      + rfmCell(25, 44, '重要价值客户', 'R↑ F↑ M↑', .85)
      + rfmCell(175, 44, '重要发展客户', 'R↑ F↓ M↑', .68)
      + rfmCell(325, 44, '重要保持客户', 'R↓ F↑ M↑', .68)
      + rfmCell(475, 44, '重要挽留客户', 'R↓ F↓ M↑', .5)
      + rfmCell(25, 136, '一般价值客户', 'R↑ F↑ M↓', .42)
      + rfmCell(175, 136, '一般发展客户', 'R↑ F↓ M↓', .34)
      + rfmCell(325, 136, '一般保持客户', 'R↓ F↑ M↓', .34)
      + rfmCell(475, 136, '一般挽留客户', 'R↓ F↓ M↓', .26)
      + '</g></svg>'
  },
  aarrr: {
    caption: '五个阶段的北极星指标示例——先定位最弱环节，再集中资源',
    svg: (function () {
      var stages = [
        { name: '获客', metric: 'CAC / 线索量', op: .85 },
        { name: '激活', metric: '首单转化率', op: .72 },
        { name: '留存', metric: '次月留存率', op: .6 },
        { name: '变现', metric: 'ARPU', op: .48 },
        { name: '推荐', metric: '邀请率', op: .38 }
      ];
      var s = '<svg viewBox="0 0 640 160" role="img" aria-label="AARRR 五阶段"><g font-size="15">';
      for (var i = 0; i < stages.length; i++) {
        var x = 10 + i * 124, y = 24, st = stages[i];
        s += '<polygon points="' + x + ',' + y + ' ' + (x + 100) + ',' + y + ' ' + (x + 118) + ',' + (y + 35) + ' '
          + (x + 100) + ',' + (y + 70) + ' ' + x + ',' + (y + 70) + ' ' + (x + 18) + ',' + (y + 35)
          + '" fill="var(--accent)" opacity="' + st.op + '"/>';
        s += '<text x="' + (x + 60) + '" y="' + (y + 41) + '" text-anchor="middle" fill="var(--bg)" font-weight="700">' + st.name + '</text>';
        s += '<text x="' + (x + 60) + '" y="' + (y + 96) + '" text-anchor="middle" fill="var(--muted)" font-size="12">' + st.metric + '</text>';
      }
      return s + '</g></svg>';
    })()
  },
  abtest: {
    caption: '随机分流 → 同期运行 → 统计检验 → 按显著性决策（勿中途停止）',
    svg: '<svg viewBox="0 0 640 320" role="img" aria-label="A/B 实验流程">'
      + node(230, 12, 180, 42, '用户随机分流', .85)
      + line(320, 54, 190, 118) + line(320, 54, 450, 118)
      + node(100, 120, 180, 56, 'A 组 · 对照', .55) + t(190, 152, '现行策略', 12)
      + node(360, 120, 180, 56, 'B 组 · 实验', .85) + t(450, 152, '新策略', 12)
      + line(190, 176, 300, 228) + line(450, 176, 340, 228)
      + '<rect x="210" y="230" width="220" height="44" rx="10" fill="none" stroke="var(--accent)" stroke-dasharray="5 4"/>'
      + t(320, 257, '核心指标对比 + 统计检验', 14)
      + '<text x="180" y="305" text-anchor="middle" fill="#16a34a" font-size="13" font-weight="700">显著 → B 全量上线</text>'
      + '<text x="460" y="305" text-anchor="middle" fill="var(--muted)" font-size="13">不显著 → 保持 A，迭代假设</text>'
      + '</svg>'
  },
  cohort: {
    caption: '同期群三角矩阵（示例数据）：横向对比看新群质量，纵向看生命周期衰减',
    svg: (function () {
      var rows = [
        { name: '1 月群', vals: [100, 42, 31, 24] },
        { name: '2 月群', vals: [100, 45, 33] },
        { name: '3 月群', vals: [100, 47] },
        { name: '4 月群', vals: [100] }
      ];
      var x0 = 130, y0 = 46, w = 110, h = 40, g = 8;
      var s = '<svg viewBox="0 0 640 268" role="img" aria-label="同期群留存矩阵"><g font-size="14">';
      for (var c = 0; c < 4; c++) s += t(x0 + c * (w + g) + w / 2, y0 - 10, 'M' + c, 13);
      for (var r = 0; r < rows.length; r++) {
        var row = rows[r];
        s += t(x0 - 14, y0 + r * (h + g) + h / 2 + 5, row.name, 13, 'end');
        for (var j = 0; j < row.vals.length; j++) {
          var v = row.vals[j], x = x0 + j * (w + g), y = y0 + r * (h + g);
          s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="var(--accent)" opacity="' + (0.15 + v / 100 * 0.7) + '"/>';
          s += t(x + w / 2, y + h / 2 + 5, v + '%', 13, 'middle', v > 55 ? 'var(--bg)' : 'var(--text)');
        }
      }
      return s + '</g></svg>';
    })()
  },
  attribution: {
    caption: '指标异动的维度贡献拆解（示例数据）：先定位最大贡献项，再继续下钻',
    svg: (function () {
      var items = [
        { name: '头程物流费', v: -1.4 },
        { name: '广告花费', v: -0.9 },
        { name: '仓储费', v: -0.6 },
        { name: '退货损失', v: -0.3 },
        { name: '售价结构', v: 0.4 }
      ];
      var cx = 330, y0 = 36, bh = 30, gap = 15;
      var s = '<svg viewBox="0 0 640 244" role="img" aria-label="维度贡献拆解">'
        + t(320, 18, '净利润率环比 -2.8pp 的维度贡献（pp）', 13);
      for (var i = 0; i < items.length; i++) {
        var it = items[i], y = y0 + i * (bh + gap);
        var bw = Math.abs(it.v) / 1.4 * 240;
        var color = it.v < 0 ? '#dc2626' : '#16a34a';
        s += t(cx - 12, y + bh / 2 + 5, it.name, 13, 'end');
        s += '<rect x="' + (it.v < 0 ? cx - bw : cx) + '" y="' + y + '" width="' + bw + '" height="' + bh
          + '" rx="6" fill="' + color + '" opacity="0.78"/>';
        s += t(it.v < 0 ? cx - bw - 8 : cx + bw + 8, y + bh / 2 + 5, (it.v > 0 ? '+' : '') + it.v, 13,
          it.v < 0 ? 'end' : 'start', color);
      }
      s += '<line x1="' + cx + '" y1="' + (y0 - 6) + '" x2="' + cx + '" y2="' + (y0 + 5 * (bh + gap)) + '" stroke="var(--border)"/>';
      return s + '</svg>';
    })()
  },
  compare: {
    caption: '三组对比定位异常 → 沿贡献最大的路径层层下钻 → 找到可行动的根因',
    svg: '<svg viewBox="0 0 640 310" role="img" aria-label="对比与下钻">'
      + '<g font-size="14">'
      + node(30, 24, 150, 42, '环比 · 短期变化', .6)
      + node(30, 92, 150, 42, '同比 · 排季节', .6)
      + node(30, 160, 150, 42, 'vs 竞对 · 找差距', .6)
      + node(30, 228, 150, 42, 'vs 目标 · 看达成', .6)
      + '</g>'
      + '<text x="215" y="150" text-anchor="middle" fill="var(--accent)" font-size="22">→</text>'
      + '<text x="215" y="175" text-anchor="middle" fill="var(--muted)" font-size="12">发现异常</text>'
      + node(270, 24, 150, 42, '全平台利润', .8)
      + line(345, 66, 425, 94)
      + node(400, 96, 150, 42, '华东区', .65)
      + line(475, 138, 505, 164)
      + node(460, 166, 150, 42, '某店铺', .5)
      + line(535, 208, 545, 234)
      + node(480, 236, 150, 42, '具体 SKU', .9)
      + '<text x="360" y="60" text-anchor="middle" fill="var(--muted)" font-size="12">下钻</text>'
      + '</svg>'
  }
};

// ---------- 小工具函数 ----------
function node(x, y, w, h, label, op) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="var(--accent)" opacity="' + op + '"/>'
    + '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 5) + '" text-anchor="middle" fill="var(--bg)" font-weight="700">' + label + '</text>';
}
function box(x, y, w, h, en, cn, op) {
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="var(--accent)" opacity="' + op + '"/>'
    + '<text x="' + (x + w / 2) + '" y="' + (y + 27) + '" text-anchor="middle" fill="var(--bg)" font-weight="700">' + en + '</text>'
    + '<text x="' + (x + w / 2) + '" y="' + (y + 48) + '" text-anchor="middle" fill="var(--bg)" font-size="12">' + cn + '</text>';
}
function rfmCell(x, y, name, cond, op) {
  return '<rect x="' + x + '" y="' + y + '" width="140" height="70" rx="10" fill="var(--accent)" opacity="' + op + '"/>'
    + '<text x="' + (x + 70) + '" y="' + (y + 31) + '" text-anchor="middle" fill="var(--bg)" font-weight="700">' + name + '</text>'
    + '<text x="' + (x + 70) + '" y="' + (y + 52) + '" text-anchor="middle" fill="var(--bg)" font-size="11">' + cond + '</text>';
}
function line(x1, y1, x2, y2) {
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--accent)" stroke-width="1.5" opacity="0.55"/>';
}
function t(x, y, str, size, anchor, color) {
  return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || 'middle') + '" fill="' + (color || 'var(--text)') + '" font-size="' + size + '">' + str + '</text>';
}
