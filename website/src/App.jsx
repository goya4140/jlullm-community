import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  CirclesThreePlus,
  EnvelopeSimple,
  Heartbeat,
  List,
  Robot,
  UsersThree,
  X,
} from "@phosphor-icons/react";

const routes = [
  { id: "home", zh: "首页", en: "Home", slug: "" },
  { id: "research", zh: "研究", en: "Research", slug: "research" },
  { id: "publication", zh: "论文", en: "Publication", slug: "publication" },
  { id: "members", zh: "成员", en: "Members", slug: "members" },
  { id: "recruitment", zh: "招募", en: "Recruitment", slug: "recruitment" },
  { id: "contact", zh: "联系", en: "Contact", slug: "contact" },
];

const researchAreas = [
  {
    number: "01",
    title: "智能体系统工程",
    en: "Agent Harness",
    icon: Robot,
    question: "像 Codex 这样的智能体系统是如何构建的，又为何能够充分释放基础模型的潜力？",
    method: "我们研究上下文组织、工具调用、任务规划、记忆、反馈回路与运行环境，分析模型能力如何被可靠地转化为长期行动。",
    value: "形成可复现、可评测的智能体系统方法，让强大的模型能力真正服务于复杂任务。",
  },
  {
    number: "02",
    title: "智能体训练",
    en: "Agent Training",
    icon: Brain,
    question: "模型如何从随机初始化的参数出发，通过数据与训练算法逐步获得推理、行动与协作能力？",
    method: "我们关注预训练、后训练、强化学习、过程监督与合成数据，探索智能体能力形成和持续提升的机制。",
    value: "理解并改进智能体的学习过程，让模型在真实任务中更聪明、更稳定，也更容易被验证。",
  },
  {
    number: "03",
    title: "可信医学视觉语言推理",
    en: "Reliable Medical VLM Reasoning",
    icon: Heartbeat,
    question: "医学视觉语言模型如何依据临床指南与可追溯证据进行推理，而不是给出缺乏依据的诊断？",
    method: "我们通过指南对齐、证据检索、推理过程监督与可靠性评测，训练模型将医学影像、临床信息和权威知识联系起来。",
    value: "让模型的诊断建议更有依据、更可解释，并能够接受临床人员的审查与验证。",
  },
  {
    number: "04",
    title: "边缘适配医学视觉语言模型",
    en: "Edge-Adaptation Medical VLM",
    icon: CirclesThreePlus,
    question: "医院如何在保护本地数据的前提下，让通用医学模型快速适配特定疾病、设备与人群？",
    method: "我们设计轻量参数更新、数据高效学习与本地部署框架，使模型能够利用有限院内数据快速完成专病适配。",
    value: "降低医学模型落地与维护成本，让不同医院都能构建贴合自身临床场景的智能工具。",
  },
];

const leaders = [
  { name: "林景豪", summary: "腾讯", url: "", image: "" },
  { name: "王淏", summary: "悉尼大学", url: "", image: "" },
];

const members = [
  { name: "王邻皓", summary: "吉林大学", url: "", image: "" },
  { name: "胡锦琛", summary: "吉林大学", url: "", image: "" },
  { name: "黎俊杰", summary: "中国科学院", url: "", image: "" },
  { name: "吴天润", summary: "浙江大学", url: "", image: "" },
  { name: "郭媛媛", summary: "中山大学", url: "", image: "" },
  { name: "李昱辰", summary: "清华大学", url: "", image: "" },
  { name: "颜毅", summary: "南京大学 LAMDA", url: "", image: "" },
  { name: "曾琦崴", summary: "悉尼大学 RA", url: "", image: "" },
  { name: "陈国庆", summary: "字节跳动", url: "", image: "" },
  { name: "常智德", summary: "腾讯", url: "", image: "" },
  { name: "曹相", summary: "阿里巴巴", url: "", image: "" },
];

const recruitmentCriteria = [
  ["保持好奇", "愿意从真实问题出发，持续阅读、提问并形成自己的判断。"],
  ["持续投入", "能够为一个研究问题留出稳定时间，接受研究中的反复与不确定。"],
  ["尊重事实", "重视实验、记录与复现，让结论经得起讨论和验证。"],
  ["开放协作", "愿意分享过程、回应反馈，也愿意帮助伙伴把工作共同推进。"],
];

const publications = [
  {
    year: "2026",
    title: "Group-wise Data Ordering: Enhancing Instruction Tuning of Large Language Models via Embedding Proximity",
    pub: "International Conference on Machine Learning (ICML 2026)",
    authors: "Yiwen Ye, Boyuan Jiang, Xiaobin Hu, Shengzhi Wang, Xiaozhong Ji, Jinghao Lin, Deli Yu, Jiale Chen, Kai Wu, Haihua Yang, Yong Xia",
    url: "https://icml.cc/virtual/2026/poster/62875",
  },
  {
    year: "2026",
    title: "Dynamic Traceback Learning for Medical Report Generation",
    pub: "IEEE Transactions on Multimedia, Early Access",
    authors: "Shuchang Ye, Mingyuan Meng, Mingjian Li, Dagan Feng, Usman Naseem, Jinman Kim",
    url: "https://doi.org/10.1109/TMM.2026.3668644",
  },
  {
    year: "2026",
    title: "Enhancing LLM-Based Recommendation with Semantic-Aligned Collaborative Knowledge",
    pub: "Database Systems for Advanced Applications (DASFAA 2026), LNCS 16535, 405–421",
    authors: "Zihan Wang, Jinghao Lin, Xiaocui Yang, Yongkang Liu, Shi Feng, Daling Wang, Yifei Zhang, Ge Yu",
    url: "https://doi.org/10.1007/978-981-92-0363-5_25",
  },
  {
    year: "2025",
    title: "Alleviating Textual Reliance in Medical Language-Guided Segmentation via Prototype-Driven Semantic Approximation",
    pub: "IEEE/CVF International Conference on Computer Vision (ICCV 2025), 22316–22326",
    authors: "Shuchang Ye, Usman Naseem, Mingyuan Meng, Jinman Kim",
    url: "https://doi.org/10.1109/ICCV51701.2025.02072",
  },
  {
    year: "2025",
    title: "RRHF-V: Ranking Responses to Mitigate Hallucinations in Multimodal Large Language Models with Human Feedback",
    pub: "31st International Conference on Computational Linguistics (COLING 2025), 6798–6815",
    authors: "Guoqing Chen, Fu Zhang, Jinghao Lin, Chenglong Lu, Jingwei Cheng",
    url: "https://aclanthology.org/2025.coling-main.454/",
  },
  {
    year: "2024",
    title: "SALMON: A Structure-Aware Language Model with Logicality and Densification Strategy for Temporal Knowledge Graph Reasoning",
    pub: "Findings of the Association for Computational Linguistics: EMNLP 2024, 8761–8774",
    authors: "Fu Zhang, Jinghao Lin, Jingwei Cheng",
    url: "https://doi.org/10.18653/v1/2024.findings-emnlp.511",
  },
  {
    year: "2024",
    title: "Enabling Text-Free Inference in Language-Guided Segmentation of Chest X-Rays via Self-guidance",
    pub: "Medical Image Computing and Computer Assisted Intervention (MICCAI 2024), LNCS 15008, 242–252",
    authors: "Shuchang Ye, Mingyuan Meng, Mingjian Li, Dagan Feng, Jinman Kim",
    url: "https://doi.org/10.1007/978-3-031-72111-3_23",
  },
  {
    year: "2024",
    title: "Joint Framework for Tensor Decomposition-Based Temporal Knowledge Graph Completion",
    pub: "Information Sciences, 654:119853",
    authors: "Fu Zhang, Hongzhi Chen, Yuzhe Shi, Jingwei Cheng, Jinghao Lin",
    url: "https://doi.org/10.1016/j.ins.2023.119853",
  },
];

function getCurrentPage() {
  const segment = window.location.pathname.split("/").filter(Boolean).at(-1) || "";
  return routes.find((route) => route.slug === segment)?.id || "home";
}

function useSiteLinks(currentPage) {
  const root = currentPage === "home" ? "./" : "../";
  return {
    root,
    href: (slug = "") => `${root}${slug ? `${slug}/` : ""}`,
  };
}

function Header({ currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { href, root } = useSiteLinks(currentPage);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    const closeWithEscape = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.classList.remove("menu-is-open");
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" aria-label="主导航">
      <a className="brand" href={href()} aria-label="LifeLibra Lab 首页">
        <span className="brand-logo" aria-hidden="true"><img src={`${root}lifelibra-logo.png`} alt="" /></span>
        <span className="brand-tagline">开放 AI 科研社区</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X size={23} /> : <List size={24} />}
      </button>
      <nav id="site-navigation" className={menuOpen ? "nav-links is-open" : "nav-links"}>
        {routes.map((route) => (
          <a
            key={route.id}
            href={href(route.slug)}
            className={currentPage === route.id ? "is-active" : ""}
            aria-current={currentPage === route.id ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <span>{route.zh}</span><small>{route.en}</small>
          </a>
        ))}
      </nav>
    </header>
  );
}

function Footer({ currentPage }) {
  const { href, root } = useSiteLinks(currentPage);
  return (
    <footer>
      <div className="footer-main">
        <a className="brand footer-brand" href={href()} aria-label="LifeLibra Lab 首页">
          <span className="brand-logo" aria-hidden="true"><img src={`${root}lifelibra-logo.png`} alt="" /></span>
          <span className="brand-tagline">开放 AI 科研社区</span>
        </a>
        <p>以同行连接想法，以研究抵达更远。</p>
      </div>
      <nav className="footer-nav" aria-label="页脚导航">
        {routes.slice(1).map((route) => <a key={route.id} href={href(route.slug)}>{route.en}</a>)}
      </nav>
      <p className="copyright">© {new Date().getFullYear()} LifeLibra Lab</p>
    </footer>
  );
}

function PageHero({ kicker, title, description }) {
  return (
    <section className="page-hero">
      <p className="page-kicker">{kicker}</p>
      <h1>{title}</h1>
      <p className="page-description">{description}</p>
    </section>
  );
}

function HomePage() {
  const { href, root } = useSiteLinks("home");
  return (
    <section className="hero hero-home" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="eyebrow">LifeLibra Lab · Open AI Research Community</p>
        <h1 id="home-title">科研，<br />不必一个人开始</h1>
        <p className="hero-lede">和志同道合的伙伴，<br />一起把 AI 想法做成真正的研究。</p>
        <div className="hero-actions">
          <a className="button button-primary" href={href("recruitment")}>申请加入 <ArrowRight size={18} weight="bold" /></a>
          <a className="text-link" href={href("research")}>了解研究 <ArrowRight size={17} /></a>
        </div>
      </div>
      <div className="hero-visual">
        <img src={`${root}hero-research-table.png`} alt="共享研究桌上的论文、代码、公式草稿与实验笔记" />
      </div>
    </section>
  );
}

function ResearchPage() {
  return (
    <div className="page page-research">
      <PageHero
        kicker="Research · 研究"
        title={<>从值得追问的问题，<br />走向可靠的研究。</>}
        description="我们围绕智能体系统、训练方法、可信医学推理与本地快速适配开展探索。方向会演进，但问题意识、实验事实与可复现性始终是共同的方法。"
      />
      <section className="research-grid" aria-label="研究方向">
        {researchAreas.map(({ number, title, en, icon: Icon, question, method, value }) => (
          <article className="research-card" key={number}>
            <div className="research-card-top"><span>{number}</span><Icon size={30} weight="light" aria-hidden="true" /></div>
            <p className="card-en">{en}</p><h2>{title}</h2>
            <p className="research-question">{question}</p>
            <dl><div><dt>方法</dt><dd>{method}</dd></div><div><dt>价值</dt><dd>{value}</dd></div></dl>
          </article>
        ))}
      </section>
    </div>
  );
}

function PublicationPage() {
  const years = [...new Set(publications.map(({ year }) => year))];

  return (
    <div className="page page-publication">
      <PageHero
        kicker="Publication · 论文"
        title={<>让每一次探索，<br />留下可被验证的成果。</>}
        description="这里收录社区成员参与完成并已正式发表的论文与研究工作，按发表时间由近及远排列。"
      />
      <section className="publication-list" aria-label="论文列表">
        {years.map((year) => (
          <section className="publication-year" key={year} aria-labelledby={`publication-${year}`}>
            <header className="publication-year-heading">
              <p>PUBLICATIONS</p>
              <h2 id={`publication-${year}`}>{year}</h2>
              <span>{publications.filter((paper) => paper.year === year).length} PAPERS</span>
            </header>
            <div className="publication-rows">
              {publications.filter((paper) => paper.year === year).map((paper, index) => (
                <article className="publication-row" key={paper.title}>
                  <span className="publication-index">{String(index + 1).padStart(2, "0")}</span>
                  <div className="publication-main">
                    <h3><a href={paper.url} target="_blank" rel="noreferrer">{paper.title}<ArrowUpRight size={18} aria-hidden="true" /></a></h3>
                    <dl>
                      <div><dt>Pub</dt><dd>{paper.pub}</dd></div>
                      <div><dt>Authors</dt><dd>{paper.authors}</dd></div>
                    </dl>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>
    </div>
  );
}

function MemberCard({ member }) {
  const { name, summary, url, image } = member;
  return (
    <article className="member-card">
      <div className="member-avatar">
        {image ? <img src={image} alt={`${name}的照片`} /> : <span aria-label={`${name}的占位头像`}>{name}</span>}
      </div>
      <div className="member-info"><h3>{name}</h3><p>{summary}</p></div>
      {url && <a href={url} target="_blank" rel="noreferrer" aria-label={`访问${name}的个人页面`}><ArrowUpRight size={19} /></a>}
    </article>
  );
}

function MemberGroup({ title, en, people }) {
  return (
    <section className="member-group">
      <div className="group-heading"><p>{en}</p><h2>{title}</h2><span>{people.length} 位</span></div>
      <div className="member-grid">{people.map((person) => <MemberCard key={person.name} member={person} />)}</div>
    </section>
  );
}

function MembersPage() {
  return (
    <div className="page page-members">
      <PageHero
        kicker="Members · 成员"
        title={<>优秀的同行，<br />是社区最好的证明。</>}
        description="我们因共同的研究兴趣相遇，在开放协作中学习、实验与成长。去向不是终点，而是同行经历留下的坐标。"
      />
      <MemberGroup title="负责人" en="LEADERS" people={leaders} />
      <MemberGroup title="成员" en="MEMBERS" people={members} />
    </div>
  );
}

function RecruitmentPage() {
  return (
    <div className="page page-recruitment">
      <PageHero
        kicker="Recruitment · 招募"
        title={<>带着好奇心来，<br />和我们一起把问题做深。</>}
        description="LifeLibra Lab 面向所有对 AI 研究有持续兴趣的人。我们在线协作，不限制学校、专业或当前身份，也不以已有论文或成熟课题作为加入门槛。"
      />
      <section className="recruitment-layout">
        <div className="criteria-panel">
          <p className="panel-label">What we value · 我们看重</p>
          {recruitmentCriteria.map(([title, copy]) => (
            <article className="criterion" key={title}><Check size={18} weight="bold" aria-hidden="true" /><div><h2>{title}</h2><p>{copy}</p></div></article>
          ))}
        </div>
        <div className="collaboration-panel">
          <p className="panel-label">How we work · 如何协作</p>
          <h2>线上实验室，<br />真实的研究协作。</h2>
          <p>围绕明确的问题组成小组，通过定期讨论、论文阅读、实验复现与写作审阅共同推进。参与者可以来自不同地区、专业与职业阶段，协作以可靠、透明和长期投入为基础。</p>
          <div className="process-list">
            <div><span>01</span><strong>提交申请</strong><p>介绍你的背景、兴趣与可投入时间。</p></div>
            <div><span>02</span><strong>相互了解</strong><p>围绕研究兴趣进行一次线上交流。</p></div>
            <div><span>03</span><strong>加入协作</strong><p>匹配方向与伙伴，从小而清晰的问题开始。</p></div>
          </div>
          <a
            className="button button-primary application-link"
            href="https://docs.qq.com/form/page/DUkFIbHhKV3NjUnRE"
            target="_blank"
            rel="noreferrer"
          >
            填写申请 <ArrowUpRight size={17} weight="bold" aria-hidden="true" />
          </a>
          <p className="pending-note">申请信息将通过腾讯文档收集，请按表单提示填写。</p>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="page page-contact">
      <section className="contact-stage">
        <p className="page-kicker">Contact · 联系</p>
        <h1>让一个值得研究的想法，<br />成为合作的开始。</h1>
        <p>如果你希望与 LifeLibra Lab 探讨研究合作、学术交流或社区共建，欢迎通过公开邮箱与我们联系。</p>
        <a className="contact-email" href="mailto:wanglinhao4140@gmail.com">
          <EnvelopeSimple size={25} weight="light" aria-hidden="true" />
          <span><small>PUBLIC EMAIL</small>wanglinhao4140@gmail.com</span>
          <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
        </a>
      </section>
      <aside className="contact-aside" aria-label="合作理念">
        <UsersThree size={32} weight="light" aria-hidden="true" />
        <p>我们相信，好的合作始于坦诚的问题、清晰的投入和彼此尊重的长期同行。</p>
      </aside>
    </div>
  );
}

const pages = {
  home: HomePage,
  research: ResearchPage,
  publication: PublicationPage,
  members: MembersPage,
  recruitment: RecruitmentPage,
  contact: ContactPage,
};

export function App() {
  const currentPage = getCurrentPage();
  const CurrentPage = pages[currentPage];
  return (
    <div className={`site-shell page-${currentPage}-shell`}>
      <Header currentPage={currentPage} />
      <main><CurrentPage /></main>
      <Footer currentPage={currentPage} />
    </div>
  );
}
