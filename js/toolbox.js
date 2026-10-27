// AI 工具箱数据：日常使用并验证过的 AI 工具
// 新增工具只需在数组里加一项
// 每条固定四块：intro 简介 / effect 作用 / url 公开地址 / tips 使用技巧
// tag 用于分类筛选
const tools = [
  {
    tag: '对话助手',
    title: 'ChatGPT',
    author: 'OpenAI',
    intro: 'OpenAI 出品的对话式 AI 助手，普及度最高的大模型应用，日常问题的第一入口。',
    effect: '思路推演与方案脑暴、代码生成与解释、文档阅读、翻译润色。数据工作中我用它做分析框架拆解、SQL 初稿、报表解读——先跟它过一遍，再自己验证。',
    url: 'https://chatgpt.com',
    tips: `【数据场景技巧】
1. 生成 SQL 前先给表结构 DDL + 2~3 行样例数据，准确率大幅提升
2. 复杂分析拆成多轮对话，每轮只确认一个口径
3. 注意：不上传敏感数据，必要先脱敏（表名、客户信息替换）`
  },
  {
    tag: '对话助手',
    title: 'Claude',
    author: 'Anthropic',
    intro: 'Anthropic 出品的大模型助手，以长上下文和代码能力见长。',
    effect: '长文档研读是它的强项：整份指标口径文档、数仓设计文档可以一次喂进去再提问；代码生成质量高，配合 Claude Code 能直接在终端里完成开发任务。',
    url: 'https://claude.ai',
    tips: `【数据场景技巧】
1. 长上下文适合口径类问题：整份指标字典喂入后直接问「GMV 和营收口径差异」
2. Artifacts 功能可直接预览生成的网页 / 图表，改完即所得
3. 与 ChatGPT 交叉验证关键结论，降低单模型幻觉风险`
  },
  {
    tag: 'AI 编程',
    title: 'AI 编程助手（Claude Code / Cursor）',
    author: 'Anthropic / Anysphere',
    intro: '嵌入开发流程的 AI 编程工具：Claude Code 在终端里理解整个项目，Cursor 是 AI 原生编辑器。',
    effect: '加速数据开发全流程：写 SQL / Python 脚本、调试报错、读懂别人的 DAG 代码、生成测试数据。本网站就是用 AI 编程助手从零搭建的——从页面结构到部署脚本全程 AI 协作。',
    url: 'https://www.anthropic.com/claude-code',
    tips: `【使用心得】
1. 给足上下文：表结构、完整报错信息直接粘贴，别让 AI 猜
2. 小步推进：每次只让 AI 做一件事，做完验证再做下一件
3. 让它「先解释思路再动手」，关键逻辑由人把关
4. Cursor 官网：https://cursor.com`
  },
  {
    tag: '自动化与编排',
    title: 'n8n',
    author: 'n8n',
    intro: '开源的工作流自动化平台：可视化编排定时触发、SQL 查询、条件分支、HTTP 调用与消息推送，也是 AI Agent 的编排底座。',
    effect: '在我的经营异常预警项目中承担核心执行层：定时取数、数据质量检查、Agent 路由、失败重试、钉钉 Webhook 通知和 ERP 反馈回收。确定性流程交给 n8n，AI 只负责理解与判断——稳定可解释。',
    url: 'https://n8n.io',
    tips: `【实战技巧】
1. 明确规则的路由用 Switch / IF 节点，别让 LLM 自由决定——确定性优先
2. 失败重试与告警是工作流的标配，不是可选项
3. 与 RAGFlow 同 Docker 网络时可直接用容器名访问 API`
  },
  {
    tag: '自动化与编排',
    title: '影刀 RPA',
    author: '影刀',
    intro: '国产 RPA 工具：把人工在网页和软件里的重复操作录制成自动化流程，擅长处理没有 API 的系统。',
    effect: '解决「最后一公里」取数问题：平台后台数据下载、报表导出、批量录入等无接口场景，全部由 RPA 定时执行，配合 Python 做批量处理，把人工从重复操作中解放出来。',
    url: 'https://www.yingdao.com',
    tips: `【实战技巧】
1. 先问有没有 API——有接口走接口，没有才用 RPA 兜底
2. 流程要设计异常处理：页面改版、加载超时都要有兜底分支
3. 产出文件统一目录规范，下游自动化才能无缝衔接`
  },
  {
    tag: '网站部署平台',
    title: 'Netlify',
    author: 'Netlify',
    intro: '面向现代 Web 的应用部署平台：连接 Git 仓库后，push 即上线，国内开发者最常用的 GitHub 联动托管方案之一。',
    effect: '自动构建与持续部署：每次 git push 触发重新部署，约 1 分钟全网生效；免费提供 HTTPS 证书、自定义域名绑定与全球 CDN 加速；纯静态网站（HTML/CSS/JS）可以零配置直接部署。适合作为个人网站、作品集与静态项目的发布通道。',
    url: 'https://www.netlify.com',
    tips: `【部署三步】
1. 用 GitHub 账号登录 app.netlify.com
2. Add new site → Import an existing project → 选中仓库
3. 纯静态项目：Build command 留空，Publish directory 填 /

【技巧】
1. Site configuration → Change site name 可把随机子域名改成语义化名称
2. 免费额度：每月 100GB 流量、300 次构建，静态站完全够用
3. 注意：*.netlify.app 域名在国内部分网络环境访问不稳定，建议绑定自定义域名`
  },
  {
    tag: '网站部署平台',
    title: 'Cloudflare Pages',
    author: 'Cloudflare',
    intro: 'Cloudflare 推出的前端部署平台，背靠 Cloudflare 全球 anycast 网络，是同类免费方案中国内可访问性最好的选择之一。',
    effect: '与 Netlify 同样连接 Git 仓库自动部署，但流量不限量、每月 500 次构建；与 Cloudflare 的 DNS、CDN、Workers 生态无缝衔接，绑定自定义域名后国内可达性明显优于 GitHub Pages 和 Netlify。本网站正托管于此。',
    url: 'https://pages.cloudflare.com',
    tips: `【部署三步】
1. dash.cloudflare.com 用 GitHub 账号注册登录
2. Workers & Pages（新改版在左侧 Compute 菜单下）→ Create → Pages → 连接仓库
3. 纯静态项目：Framework preset 选 None，Build command 留空，输出目录填 /

【技巧】
1. 项目名决定子域名：部署时把项目名设成语义化名称，得到 xxx.pages.dev 干净地址
2. 同一仓库可以同时挂 GitHub Pages + Cloudflare Pages，push 一次两边同步更新，互为备份
3. 想再提升国内访问稳定性：买个域名托管到 Cloudflare DNS 并绑定到 Pages 项目`
  }
];

// 渲染分类筛选按钮
const ALL_TAGS = ['全部', ...new Set(tools.map(t => t.tag))];
const filterBox = document.getElementById('skillFilter');
filterBox.innerHTML = ALL_TAGS.map(t =>
  `<button class="filter-btn${t === '全部' ? ' active' : ''}" data-tag="${t}">${t}</button>`
).join('');

// 渲染工具卡片
const grid = document.getElementById('skillGrid');
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function renderTools(tag) {
  const list = tag === '全部' ? tools : tools.filter(t => t.tag === tag);
  grid.innerHTML = list.map(t => `
    <article class="card skill-item">
      <div class="note-meta">
        <span class="note-tag">${t.tag}</span>
        <span>👤 ${t.author}</span>
      </div>
      <h3>${t.title}</h3>
      <div class="skill-block"><strong>📖 简介</strong><p>${t.intro}</p></div>
      <div class="skill-block"><strong>⚙️ 作用</strong><p>${t.effect}</p></div>
      <div class="skill-block"><strong>🔗 公开地址</strong><p><a href="${t.url}" target="_blank" rel="noopener" class="accent">${t.url}</a></p></div>
      <div class="skill-block">
        <strong>💡 使用技巧</strong>
        <div class="prompt-box">
          <button class="copy-btn" data-copy="${encodeURIComponent(t.tips)}" aria-label="复制">📋 复制</button>
          <pre>${esc(t.tips)}</pre>
        </div>
      </div>
    </article>
  `).join('');
}
renderTools('全部');

// 筛选交互
filterBox.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  filterBox.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTools(btn.dataset.tag);
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
