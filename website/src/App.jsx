import { useEffect, useState } from "react";
import {
  ArrowRight,
  Flask,
  Check,
  Copy,
  FileText,
  List,
  MagnifyingGlass,
  UsersThree,
  X,
} from "@phosphor-icons/react";

const stages = [
  { icon: UsersThree, title: "找到伙伴", copy: "跨专业、跨方向，扫描兴趣，找到合拍的人。" },
  { icon: MagnifyingGlass, title: "形成问题", copy: "从真实好奇出发，碰撞想法，确定可研究的问题。" },
  { icon: Flask, title: "实验验证", copy: "共享资源与方法，动手验证，快速迭代。" },
  { icon: FileText, title: "共同发表", copy: "打磨写作与复现，彼此审阅，把工作发表出来。" },
];

const researchAreas = [
  ["01", "大语言模型", "从训练、推理到评测，理解并推进语言智能。"],
  ["02", "Agent", "探索能规划、调用工具并在环境中学习的智能体。"],
  ["03", "多模态", "让模型联合理解语言、图像、声音与真实世界。"],
  ["04", "AI for Medicine", "用人工智能连接医学数据、临床问题与健康研究。"],
];

const members = [
  ["吴天润", "浙江大学"],
  ["郭媛媛", "中山大学"],
  ["李昱辰", "清华大学"],
  ["颜毅", "南京大学 LAMDA"],
  ["曾琦崴", "悉尼大学 RA"],
  ["陈国庆", "字节跳动"],
  ["常智德", "腾讯"],
  ["曹相", "阿里巴巴"],
];

const navItems = [
  ["首页", "home"],
  ["我们在做什么", "research"],
  ["成员", "members"],
  ["加入", "join"],
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -58%", threshold: [0.1, 0.4, 0.7] },
    );
    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const copyApplication = async () => {
    const template = [
      "JLULLM 社区申请",
      "姓名 / 年级 / 专业：",
      "关注的 AI 研究方向：",
      "最近在读的一篇论文：",
      "希望一起探索的问题：",
      "每周可投入的时间：",
    ].join("\n");
    await navigator.clipboard.writeText(template);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="site-shell">
      <header className="site-header" aria-label="主导航">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="JLULLM 首页">
          <strong>JLULLM</strong><span aria-hidden="true">·</span><span>吉林大学 AI 科研社区</span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={23} /> : <List size={24} />}
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"}>
          {navItems.map(([label, id]) => (
            <a key={id} href={`#${id}`} className={activeSection === id ? "is-active" : ""} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <h1>科研，<br />不必一个人开始</h1>
            <p className="hero-lede">和志同道合的吉林大学同学，<br />一起把 AI 想法做成真正的研究。</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#join">申请加入 <ArrowRight size={18} weight="bold" /></a>
              <a className="text-link" href="#members">查看社区故事 <ArrowRight size={17} /></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="由论文、代码与实验笔记构成的共享研究桌">
            <img src="./hero-research-table.png" alt="共享研究桌上的论文、代码、公式草稿与实验笔记" />
          </div>
          <div className="research-path" aria-label="社区科研路径">
            {stages.map(({ icon: Icon, title, copy }, index) => (
              <article className="path-step" key={title}>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="step-heading"><Icon size={27} aria-hidden="true" /><h2>{title}</h2></div>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="proof-strip" aria-label="成员去向概览">
          <div className="proof-destinations">
            <div className="proof-heading"><h2>从 JLULLM 出发</h2><ArrowRight size={22} aria-hidden="true" /></div>
            <p className="proof-label">我们的共同目的地</p>
            <p>985 高校 · 海外高校 · 科技大厂</p>
          </div>
          <div className="proof-members">
            <p className="proof-label">我们的成员来自于</p>
            <p>吉林大学 · 浙江大学 · 中山大学 · 清华大学 · 南京大学 · 悉尼大学 · 字节跳动 · 腾讯 · 阿里巴巴</p>
          </div>
        </section>

        <section className="research-section" id="research">
          <div className="section-intro">
            <p className="section-kicker">我们在做什么</p><h2>从一个值得追问的问题开始。</h2>
            <p>我们不是课程社群，也不是比赛组队群。这里更关心长期的研究兴趣、可靠的实验和能够被验证的结论。</p>
          </div>
          <div className="area-list">
            {researchAreas.map(([number, title, description]) => (
              <article className="area-row" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{description}</p><ArrowRight size={22} aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="members-section" id="members">
          <div className="section-intro">
            <p className="section-kicker">社区成员</p><h2>优秀的同行，是社区最好的证明。</h2>
            <p>过去参与社区建设的成员，继续在高校与产业一线探索 AI。去向不是终点，而是共同成长留下的坐标。</p>
          </div>
          <div className="member-list" role="list" aria-label="社区成员与去向">
            {members.map(([name, destination]) => (
              <div className="member-row" role="listitem" key={name}>
                <strong>{name}</strong><span>{destination}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="join-section" id="join">
          <div><p className="section-kicker">加入 JLULLM</p><h2>带着你的好奇心来。</h2></div>
          <div className="join-copy">
            <p>不要求你已经有论文或成熟课题。我们更期待：愿意长期投入、尊重实验事实、乐于分享，也愿意和伙伴一起把问题做深。</p>
            <ul><li>吉林大学在读同学</li><li>对 AI 研究有持续兴趣</li><li>愿意稳定投入并开放协作</li></ul>
            <button className="button button-primary copy-button" type="button" onClick={copyApplication}>
              {copied ? <Check size={19} weight="bold" /> : <Copy size={19} />}{copied ? "申请模板已复制" : "复制申请模板"}
            </button>
            <p className="join-note">申请入口即将公布；你可以先准备好这份简短自我介绍。</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand"><strong>JLULLM</strong><span>吉林大学 AI 科研社区</span></div>
        <p>以同行连接想法，以研究抵达更远。</p><p>© {new Date().getFullYear()} JLULLM Community</p>
      </footer>
    </div>
  );
}
