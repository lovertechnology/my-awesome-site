import { useState, useEffect } from "react"; // ⚡️ 新增：并入了 useEffect 监听器

// 📂 1. 全局配置：导航栏清单
const NAV_ITEMS = [
  { id: "features", label: "核心技术" },
  { id: "stats", label: "工业指标" },
  { id: "careers", label: "加入我们" },
  { id: "contact", label: "商务合作" },
];

// 📂 2. 首页大疆电影级全屏大图配置表
const DJI_HERO_SECTIONS = [
  {
    id: "inspire3",
    tag: "全新旗舰级影视航拍机",
    title: "DJI INSPIRE 3",
    desc: "大师之作，始于天地。首款全画幅 8K 电影感航拍无人机，开启一体化空中电影机的全新时代。",
    imgUrl: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1920&q=80",
    btnText: "查看核心技术体系",
    align: "left",
  },
  {
    id: "avata2",
    tag: "第一人称视角飞行机",
    title: "DJI AVATA 2",
    desc: "一键翻转，畅快丝滑。沉浸式穿梭体验，零基础也能轻松驾驭的掌上硬核大片制造机。",
    imgUrl: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1920&q=80",
    btnText: "申请加入我们",
    align: "right",
    targetPage: "careers"
  },
  {
    id: "mavic3pro",
    tag: "旗舰航拍新标杆",
    title: "DJI MAVIC 3 PRO",
    desc: "三摄航拍时代，就此开启。引领多焦段航拍系统革新，哈苏主摄配合双焦段长焦，让视界大有可观。",
    imgUrl: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1920&q=80",
    btnText: "即刻建立商务合作",
    align: "left",
    targetPage: "contact"
  }
];

const BRAND_INFO = {
  name: "NEXUS LABS",
};

// 🎯 【精准狙击】直接写在组件外面！
// 这样网页刚打开、脚本刚加载时只会雷鸣般输出一次，后续雷打不动！
console.log("哈哈哈");

export default function App() {
  // 🔍 辅助函数：从浏览器的 URL 地址栏里精准切出当前的 Hash 值（形如 #careers -> careers）
  const getPageFromHash = () => {
    const hash = window.location.hash.replace("#", "");
    return hash || "home"; // 如果没有 hash，默认就是主页 home
  };

  // 🕹️ 核心状态机：初始化时直接读取 URL，防止刷新错位
  const [currentPage, setCurrentPage] = useState<string>(getPageFromHash);

  // 📡 [✨核心改动✨] 建立全双工网络雷达，监听浏览器的“前进、后退”按钮
  useEffect(() => {
    const handleBrowserNavigation = () => {
      // 当用户点击上一页/下一页时，捕获新地址，强制同步给 React 状态机
      setCurrentPage(getPageFromHash());
    };

    // 绑定浏览器原生哈希变更事件
    window.addEventListener("hashchange", handleBrowserNavigation);
    
    // 组件销毁时解绑，防止内存泄漏（良好的 C++ 式清理习惯）
    return () => window.removeEventListener("hashchange", handleBrowserNavigation);
  }, []);

  // 🚀 统一跳转中枢：不再硬改状态，而是直接去修改浏览器的 URL 地址
  const navigateTo = (pageId: string) => {
    window.location.hash = pageId === "home" ? "" : pageId;
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 font-sans antialiased flex flex-col justify-between selection:bg-blue-600/30">
      
      {/* 🛸 顶导：大厂极简白底黑字 */}
      <nav className="fixed top-0 inset-x-0 h-16 bg-white/80 backdrop-blur-xl z-50 flex items-center justify-between px-6 md:px-12 border-b border-zinc-200/80 shadow-sm">
        
        {/* 左侧 Logo 区 */}
        <div 
          onClick={() => navigateTo("home")} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold tracking-tighter text-white group-hover:scale-105 transition-transform">N</div>
          <span className="text-sm font-bold tracking-widest text-zinc-900">{BRAND_INFO.name}</span>
        </div>
        
        {/* 中间菜单区 */}
        <div className="hidden md:flex items-center space-x-8 text-xs tracking-wide uppercase font-medium">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`transition-colors duration-200 ${
                currentPage === item.id ? "text-blue-600 font-semibold" : "text-zinc-500 hover:text-black"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 右侧按钮 */}
        <button 
          onClick={() => navigateTo("contact")} 
          className="text-xs px-4 py-2 bg-zinc-900 hover:bg-black text-white font-semibold rounded-md transition-all shadow-sm"
        >
          取得联系
        </button>
      </nav>

      {/* 🎬 动态画布 */}
      <main className="flex-1">
        {currentPage === "home" && <HeroPage onNavigate={navigateTo} />}
        {currentPage === "features" && <FeaturesPage />}
        {currentPage === "stats" && <StatsPage />}
        {currentPage === "careers" && <CareersPage onApply={() => navigateTo("contact")} />}
        {currentPage === "contact" && <ContactPage />}
      </main>

      {/* 🗺️ 底部 */}
      <footer className="border-t border-zinc-900 py-8 text-center text-[11px] text-zinc-600 tracking-wider uppercase font-light bg-black/40 z-10 relative">
        © 2026 NEXUS ENGINE. INDUSTRIAL COMMERCIAL LICENSE.
      </footer>

    </div>
  );
}

/* ==========================================================================
   📄 独立页面组件群
   ========================================================================== */
function HeroPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <div className="w-full animate-fade-in">
      {DJI_HERO_SECTIONS.map((section, index) => {
        return (
          <section 
            key={section.id} 
            className={`relative w-full h-screen overflow-hidden flex p-8 md:p-24 ${
              section.align === "left" ? "items-end justify-start" : "items-end justify-end"
            } ${index > 0 ? "border-t border-zinc-900" : ""}`}
          >
            <img 
              src={section.imgUrl} 
              alt={section.title} 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className={`relative z-10 max-w-xl space-y-4 ${section.align === "right" ? "text-right" : "text-left"}`}>
              <span className="text-xs tracking-widest uppercase font-semibold text-zinc-400">{section.tag}</span>
              <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white font-sans">
                {section.title}
              </h1>
              <p className="text-sm md:text-base text-zinc-300 font-light leading-relaxed">
                {section.desc}
              </p>
              <div className={`pt-4 flex ${section.align === "right" ? "justify-end" : "justify-start"}`}>
                <button 
                  onClick={() => section.targetPage ? onNavigate(section.targetPage) : onNavigate("features")}
                  className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 text-sm font-medium transition-all rounded-sm shadow-xl"
                >
                  {section.btnText}
                </button>
              </div>
            </div>

            {index === 0 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1 opacity-60">
                <span className="text-[10px] tracking-widest uppercase font-light">滑动探索</span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent animate-pulse" />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function FeaturesPage() {
  const SERVICES = [
    { id: "ser1", title: "三维实时渲染管线", desc: "自研 WebGL/WebGL2 高清物理渲染引擎，无缝承载千万级网格体高频同步更新。", icon: "⚡" },
    { id: "ser2", title: "控制理论与算法中枢", desc: "基于 Nyquist 稳定判据优化的时滞补偿算法，实现秒级物理实体逆向控制。", icon: "📐" },
    { id: "ser3", title: "多智能体协同系统", desc: "分布式 MCP 协议架构，支持跨地域、多终端工业设备的低时延全双工协同作业。", icon: "🤖" }
  ];
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-16">
        <span className="text-xs font-bold text-blue-500 font-mono uppercase tracking-widest">Capabilities</span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mt-2">打通物理与数字的孪生枢纽</h2>
        <p className="text-zinc-500 text-sm font-light max-w-xl mt-4">沉淀多年底层控制工程经验，每一行组件都为极端工业现场的高频交付而生。</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service) => (
          <div key={service.id} className="group relative rounded-xl border border-zinc-900 bg-zinc-950/30 p-8 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-950/60">
            <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
            <h3 className="text-lg font-medium text-zinc-200 mb-3">{service.title}</h3>
            <p className="text-zinc-500 text-sm font-light leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsPage() {
  const STATS = [
    { id: "s1", value: "99.8%", label: "工业级系统稳定性" },
    { id: "s2", value: "100+", label: "国家级专利与核心软著" },
    { id: "s3", value: "24/7", label: "多智能体高并发控制" },
  ];
  return (
    <section className="py-24 max-w-7xl mx-auto text-center animate-fade-in flex flex-col justify-center min-h-[60vh]">
      <div className="mb-12">
        <span className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-widest">Data Verification</span>
        <h2 className="text-3xl font-semibold tracking-tight mt-2">以严苛指标，定义工业标准</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-900 rounded-2xl bg-zinc-950/10 backdrop-blur-sm divide-y md:divide-y-0 md:divide-x divide-zinc-900 overflow-hidden">
        {STATS.map((stat) => (
          <div key={stat.id} className="p-12 space-y-3 hover:bg-zinc-900/20 transition-colors">
            <div className="text-4xl md:text-6xl font-bold tracking-tight text-white font-mono">{stat.value}</div>
            <div className="text-xs text-zinc-500 uppercase tracking-widest font-light">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CareersPage({ onApply }: { onApply: () => void }) {
  const OPEN_POSITIONS = [
    { id: "job-1", title: "高级数字孪生研发工程师", department: "算法与渲染工程部", location: "广州/深圳", tags: ["Unity 3D", "WebGL", "C++"], desc: "负责电网及大型工业场景的数字孪生 system 架构设计，深度优化大体量网格体在多端的实时渲染效率与数字流同步。" },
    { id: "job-2", title: "工业控制算法专家", department: "核心理论实验室", location: "广州", tags: ["控制理论", "时滞补偿", "MATLAB"], desc: "负责逆向控制算法的数学模型建立与稳定性分析，解决分布式智能体在复杂网络环境下的高精度高并发控制问题。" },
    { id: "job-3", title: "全栈应用开发工程师", department: "数字资产 product 部", location: "远程 / 广州", tags: ["React", "TypeScript", "Node.js"], desc: "负责下一代云端数字化看板及多智能体协同控制台的前后端平台架构研发，极致追求多端数据传递的低时延。" }
  ];
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto animate-fade-in">
      <div className="text-center mb-16 space-y-4">
        <span className="text-xs font-bold text-indigo-500 font-mono uppercase tracking-widest">Join Our Node</span>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">寻找极客：与顶尖头脑同行</h2>
        <p className="text-zinc-500 text-sm font-light">我们不在乎死板的教条，我们只寻找能用代码、数学和实时管线改变物理世界秩序的同路人。</p>
      </div>
      <div className="space-y-4">
        {OPEN_POSITIONS.map((job) => (
          <div key={job.id} className="group border border-zinc-900 bg-zinc-950/40 rounded-xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-950/80">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">{job.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">{job.department}</span>
              </div>
              <p className="text-sm text-zinc-500 font-light leading-relaxed">{job.desc}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {job.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] font-mono text-zinc-400 opacity-60">#{tag}</span>
                ))}
              </div>
            </div>
            <button onClick={onApply} className="text-center text-xs px-5 py-2.5 border border-zinc-800 hover:border-zinc-600 hover:bg-white hover:text-black rounded-md font-medium transition-all whitespace-nowrap">
              申请投递
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <section className="py-24 max-w-3xl mx-auto text-center px-6 space-y-8 min-h-[60vh] flex flex-col justify-center animate-fade-in">
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">准备好加入我们的数字 network 了吗？</h2>
      <p className="text-zinc-400 text-sm font-light max-w-xl mx-auto">留下你的企业邮箱，我们的全栈架构师将在 24 小时内与你建立安全通信。</p>
      <div className="max-w-md mx-auto w-full p-6 rounded-2xl border border-zinc-900 bg-black/50 backdrop-blur-sm">
        {!isSubmitted ? (
          <form onSubmit={(e) => { e.preventDefault(); if(email.trim()) setIsSubmitted(true); }} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email" required placeholder="name@company.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors whitespace-nowrap">递交通路</button>
          </form>
        ) : (
          <div className="py-4 text-center space-y-2">
            <div className="text-blue-500 text-2xl">✓</div>
            <div className="text-sm font-medium text-zinc-200">通信信道已建立</div>
            <div className="text-xs text-zinc-500 font-light">系统已安全记录：{email}</div>
          </div>
        )}
      </div>
    </section>
  );
}