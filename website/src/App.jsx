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
    title: "大语言模型",
    en: "Large Language Models",
    icon: Brain,
    question: "如何让语言模型真正理解复杂任务，而不只是生成看似合理的答案？",
    method: "我们关注训练、推理与评测方法，研究模型能力的边界、可靠性与高效适配。",
    value: "让语言智能成为能够被验证、复现和持续改进的研究工具。",
  },
  {
    number: "02",
    title: "智能体",
    en: "Agent",
    icon: Robot,
    question: "模型怎样才能主动规划、调用工具，并在真实环境中完成长期任务？",
    method: "我们探索任务分解、记忆、工具使用、多智能体协作与环境反馈机制。",
    value: "构建能够行动、反思并与人协同的下一代智能系统。",
  },
  {
    number: "03",
    title: "多模态",
    en: "Multimodal Intelligence",
    icon: CirclesThreePlus,
    question: "机器如何像人一样联合理解文字、图像、声音与真实世界信号？",
    method: "我们研究跨模态表示、对齐、生成与推理，让不同信息来源相互补充。",
    value: "帮助 AI 从单一文本走向对复杂世界的整体理解。",
  },
  {
    number: "04",
    title: "医学人工智能",
    en: "AI for Medicine",
    icon: Heartbeat,
    question: "AI 如何从医学数据中学习，并为真实的临床与健康问题提供可信帮助？",
    method: "我们连接医学影像、多模态数据与临床问题，关注可解释、可泛化的医学智能。",
    value: "以严谨的方法推动 AI 在医学研究与健康场景中的可靠应用。",
  },
];

const leaders = [
  { name: "林景豪", summary: "字节跳动", url: "", image: "" },
  { name: "王淏", summary: "悉尼大学", url: "", image: "" },
];

const members = [
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
    title: "Language-Guided Medical Image Segmentation with Target-Informed Multi-Level Contrastive Alignments",
    pub: "Expert Systems with Applications, Article 133507",
    authors: "Mingjian Li, Mingyuan Meng, Shuchang Ye, Mingye Zou, Michael Fulham, Lei Bi, Jinman Kim",
    url: "https://doi.org/10.1016/j.eswa.2026.133507",
  },
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
    title: "A Causal Approach to Mitigate Modality Preference Bias in Medical Visual Question Answering",
    pub: "1st International Workshop on Vision-Language Models for Biomedical Applications (VLM4Bio ’24), 13–17",
    authors: "Shuchang Ye, Usman Naseem, Mingyuan Meng, Dagan Feng, Jinman Kim",
    url: "https://doi.org/10.1145/3689096.3689459",
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
  const { href } = useSiteLinks(currentPage);

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
      <a className="brand" href={href()} aria-label="JLULLM 首页">
        <strong>JLULLM</strong><span aria-hidden="true">·</span><span>吉林大学 AI 科研社区</span>
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
  const { href } = useSiteLinks(currentPage);
  return (
    <footer>
      <div className="footer-main">
        <a className="brand footer-brand" href={href()}><strong>JLULLM</strong><span>吉林大学 AI 科研社区</span></a>
        <p>以同行连接想法，以研究抵达更远。</p>
      </div>
      <nav className="footer-nav" aria-label="页脚导航">
        {routes.slice(1).map((route) => <a key={route.id} href={href(route.slug)}>{route.en}</a>)}
      </nav>
      <p className="copyright">© {new Date().getFullYear()} JLULLM Community</p>
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
        <p className="eyebrow">JLULLM · AI Research Community</p>
        <h1 id="home-title">科研，<br />不必一个人开始</h1>
        <p className="hero-lede">和志同道合的同学，<br />一起把 AI 想法做成真正的研究。</p>
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
        description="我们围绕语言、行动、多模态与医学四个方向开展探索。方向会演进，但问题意识、实验事实与可复现性始终是共同的方法。"
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
        description="JLULLM 面向所有高校招募对 AI 研究有持续兴趣的同学。我们在线协作，不以已有论文或成熟课题作为加入门槛。"
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
          <p>围绕明确的问题组成小组，通过定期讨论、论文阅读、实验复现与写作审阅共同推进。参与者来自不同高校，协作以可靠、透明和长期投入为基础。</p>
          <div className="process-list">
            <div><span>01</span><strong>提交申请</strong><p>介绍你的背景、兴趣与可投入时间。</p></div>
            <div><span>02</span><strong>相互了解</strong><p>围绕研究兴趣进行一次线上交流。</p></div>
            <div><span>03</span><strong>加入协作</strong><p>匹配方向与伙伴，从小而清晰的问题开始。</p></div>
          </div>
          <button className="button button-disabled" type="button" disabled>问卷准备中</button>
          <p className="pending-note">在线申请问卷将在准备完成后开放。</p>
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
        <p>如果你希望与 JLULLM 探讨研究合作、学术交流或社区共建，欢迎通过公开邮箱与我们联系。</p>
        <button className="contact-placeholder" type="button" disabled>
          <EnvelopeSimple size={25} weight="light" aria-hidden="true" />
          <span><small>PUBLIC EMAIL</small>邮箱准备中</span>
        </button>
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
