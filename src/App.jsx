import { useState, useEffect, useRef } from "react";

const CHALLENGES = [
  { id:1, title:"Smart Waste Management System", domain:"IoT", difficulty:"Hard", deadline:"Jun 30", team:"2-5", points:500, desc:"Build an AI-powered system to optimize urban waste collection routes and reduce landfill usage by 40%.", category:"Smart Cities", org:"Municipal Corp", applicants:134 },
  { id:2, title:"AI Traffic Optimization", domain:"AI/ML", difficulty:"Hard", deadline:"Jul 15", team:"3-6", points:750, desc:"Develop ML models to predict traffic congestion and dynamically adjust signal timings in real-time.", category:"Smart Cities", org:"Transport Dept", applicants:210 },
  { id:3, title:"Smart Irrigation for Farmers", domain:"IoT", difficulty:"Medium", deadline:"Jun 25", team:"2-4", points:400, desc:"Create affordable IoT sensors + mobile app to help small-scale farmers optimize water usage.", category:"Agriculture", org:"Agri Ministry", applicants:89 },
  { id:4, title:"Flood Prediction Using AI", domain:"AI/ML", difficulty:"Hard", deadline:"Jul 10", team:"3-5", points:650, desc:"Train predictive models on historical rainfall and terrain data to forecast flood zones 48hrs ahead.", category:"Climate Tech", org:"NDMA", applicants:156 },
  { id:5, title:"Women Safety Monitoring App", domain:"Mobile", difficulty:"Medium", deadline:"Jun 20", team:"2-5", points:350, desc:"Build a real-time safety app with SOS features, location sharing, and emergency response integration.", category:"Healthcare", org:"NGO SafeCity", applicants:203 },
  { id:6, title:"Mental Health Support Platform", domain:"AI/ML", difficulty:"Medium", deadline:"Jul 5", team:"2-4", points:450, desc:"Create an empathetic AI chatbot + peer support platform for students dealing with anxiety and stress.", category:"Healthcare", org:"WHO India", applicants:178 },
  { id:7, title:"Smart Energy Consumption Tracker", domain:"IoT", difficulty:"Medium", deadline:"Jul 20", team:"2-4", points:380, desc:"Develop a dashboard that monitors household energy usage and provides AI-driven savings recommendations.", category:"Renewable Energy", org:"MNRE", applicants:97 },
  { id:8, title:"Plastic Pollution Reduction", domain:"Sustainability", difficulty:"Easy", deadline:"Jun 28", team:"2-6", points:300, desc:"Design gamified community apps that incentivize plastic waste collection and recycling behavior.", category:"Sustainability", org:"Green Earth NGO", applicants:241 },
  { id:9, title:"Rural Healthcare Accessibility", domain:"Mobile", difficulty:"Hard", deadline:"Jul 25", team:"3-5", points:600, desc:"Build telemedicine platform with offline-first design for remote villages with limited connectivity.", category:"Healthcare", org:"AIIMS", applicants:122 },
  { id:10, title:"AI Crop Disease Detection", domain:"AI/ML", difficulty:"Medium", deadline:"Jul 8", team:"2-4", points:500, desc:"Train computer vision models to detect crop diseases from smartphone photos with 90%+ accuracy.", category:"Agriculture", org:"ICAR", applicants:167 },
  { id:11, title:"Blockchain Voting System", domain:"Blockchain", difficulty:"Hard", deadline:"Aug 1", team:"3-6", points:800, desc:"Implement a transparent, tamper-proof digital voting system using blockchain for local elections.", category:"FinTech", org:"Election Commission", applicants:145 },
  { id:12, title:"Water Quality Monitoring", domain:"IoT", difficulty:"Medium", deadline:"Jul 12", team:"2-4", points:420, desc:"Deploy low-cost sensor networks to monitor drinking water quality and alert authorities about contamination.", category:"Smart Cities", org:"Jal Jeevan", applicants:88 },
  { id:13, title:"AI-Based Career Guidance", domain:"AI/ML", difficulty:"Easy", deadline:"Jun 22", team:"1-3", points:280, desc:"Build personalized career recommendation engine that matches students' skills to emerging job markets.", category:"Education", org:"NCS Portal", applicants:312 },
  { id:14, title:"Smart Public Transport System", domain:"IoT", difficulty:"Hard", deadline:"Jul 30", team:"3-6", points:700, desc:"Create real-time bus tracking app with predictive arrival times and route optimization for cities.", category:"Smart Cities", org:"DIMTS", applicants:133 },
  { id:15, title:"Sustainable Urban Farming", domain:"IoT", difficulty:"Medium", deadline:"Jul 18", team:"2-5", points:440, desc:"Design vertical farm management systems with automated nutrient delivery and yield optimization.", category:"Agriculture", org:"NABARD", applicants:76 },
  { id:16, title:"Digital Education for Rural Students", domain:"Education", difficulty:"Easy", deadline:"Jun 30", team:"2-4", points:320, desc:"Build offline-capable learning app with vernacular language support for students in low-bandwidth areas.", category:"Education", org:"DIKSHA", applicants:289 },
  { id:17, title:"Smart Air Pollution Monitoring", domain:"IoT", difficulty:"Medium", deadline:"Jul 22", team:"2-4", points:410, desc:"Network low-cost AQI sensors across cities to provide hyper-local air quality maps and health alerts.", category:"Climate Tech", org:"CPCB", applicants:104 },
  { id:18, title:"Elderly Healthcare Assistant", domain:"AI/ML", difficulty:"Medium", deadline:"Jul 15", team:"2-4", points:470, desc:"Create voice-first AI companion for elderly that monitors vitals, reminds medication, and contacts family.", category:"Healthcare", org:"HelpAge India", applicants:91 },
  { id:19, title:"Renewable Energy Optimization", domain:"AI/ML", difficulty:"Hard", deadline:"Aug 5", team:"3-5", points:720, desc:"Use ML to predict solar/wind output and optimize grid load balancing for renewable energy plants.", category:"Renewable Energy", org:"SECI", applicants:118 },
  { id:20, title:"Smart Disaster Response System", domain:"AI/ML", difficulty:"Hard", deadline:"Jul 28", team:"3-6", points:680, desc:"Build AI triage system that processes disaster zone data and coordinates emergency response teams.", category:"Climate Tech", org:"NDRF", applicants:141 },
];

const USERS = [
  { name:"Priya Sharma", role:"Full Stack Dev", college:"IIT Bombay", points:2840, rank:1, badges:12, avatar:"PS", color:"#f59e0b" },
  { name:"Arjun Mehta", role:"ML Engineer", college:"NIT Trichy", points:2510, rank:2, badges:9, avatar:"AM", color:"#3b82f6" },
  { name:"Kavya Reddy", role:"IoT Specialist", college:"BITS Pilani", points:2230, rank:3, badges:8, avatar:"KR", color:"#10b981" },
  { name:"Rohan Das", role:"Blockchain Dev", college:"VIT Vellore", points:1980, rank:4, badges:7, avatar:"RD", color:"#8b5cf6" },
  { name:"Nisha Patel", role:"Product Designer", college:"IIIT Hyderabad", points:1760, rank:5, badges:6, avatar:"NP", color:"#ef4444" },
];

const ACTIVITY_DATA = [40, 65, 80, 55, 90, 75, 95];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const DOMAINS = ["All","AI/ML","IoT","Smart Cities","Agriculture","Healthcare","Sustainability","FinTech","Education","Climate Tech","Renewable Energy","Blockchain","Mobile"];
const DIFFICULTIES = ["All","Easy","Medium","Hard"];

const diffColor = { Easy:"#10b981", Medium:"#f59e0b", Hard:"#ef4444" };
const domainIcons = {
  "AI/ML":"🤖", "IoT":"📡", "Smart Cities":"🏙️", "Agriculture":"🌾", "Healthcare":"❤️",
  "Sustainability":"♻️", "FinTech":"💰", "Education":"📚", "Climate Tech":"🌍", "Renewable Energy":"⚡",
  "Blockchain":"⛓️", "Mobile":"📱", "Cybersecurity":"🔒", "Robotics":"🦾"
};

const FEED_POSTS = [
  { user:"Priya Sharma", avatar:"PS", color:"#f59e0b", time:"2h ago", content:"Just won the AI Traffic Optimization challenge! Built a reinforcement learning model that reduced congestion by 35% 🚦", likes:48, comments:12, challenge:"AI Traffic Optimization" },
  { user:"Arjun Mehta", avatar:"AM", color:"#3b82f6", time:"5h ago", content:"Our team is looking for a UI/UX designer for the Smart Waste Management challenge. DM if interested!", likes:23, comments:8, challenge:null },
  { user:"InnoVent Industries", avatar:"IV", color:"#8b5cf6", time:"1d ago", content:"Excited to announce 3 new internship positions for top performers in our sustainability challenges! Apply through your achievement page.", likes:156, comments:34, challenge:null },
];

const ACHIEVEMENTS = [
  { title:"First Solve", icon:"🏆", desc:"Submitted your first solution", earned:true },
  { title:"Team Player", icon:"🤝", desc:"Collaborated with 5+ members", earned:true },
  { title:"Speed Coder", icon:"⚡", desc:"Solved in under 24 hours", earned:true },
  { title:"Top 10%", icon:"🎯", desc:"Ranked top 10% in a challenge", earned:true },
  { title:"Innovation Star", icon:"⭐", desc:"Solution selected by industry", earned:false },
  { title:"Hackathon Hero", icon:"🦸", desc:"Won a hackathon event", earned:false },
  { title:"Domain Expert", icon:"🎓", desc:"Solved 5 challenges in one domain", earned:false },
  { title:"Community Builder", icon:"🌐", desc:"Helped 10+ users in forums", earned:false },
];

export default function SolutionSphere() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [domainFilter, setDomainFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedChallenges, setSavedChallenges] = useState([]);
  const [appliedChallenges, setAppliedChallenges] = useState([]);
  const [notification, setNotification] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeTab, setActiveTab] = useState("trending");
  const canvasRef = useRef(null);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleSave = (id) => {
    setSavedChallenges(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
    showNotif(savedChallenges.includes(id) ? "Removed from saved" : "Challenge saved!");
  };

  const applyChallenge = (id, title) => {
    if (!appliedChallenges.includes(id)) {
      setAppliedChallenges(p => [...p,id]);
      showNotif(`Applied to "${title}"!`);
    }
  };

  const filteredChallenges = CHALLENGES.filter(c => {
    const domMatch = domainFilter === "All" || c.domain === domainFilter || c.category === domainFilter;
    const diffMatch = diffFilter === "All" || c.difficulty === diffFilter;
    const searchMatch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.domain.toLowerCase().includes(searchQuery.toLowerCase()) || c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return domMatch && diffMatch && searchMatch;
  });

  const bg = darkMode ? "#0a0e1a" : "#f8fafc";
  const card = darkMode ? "#111827" : "#ffffff";
  const cardBorder = darkMode ? "#1e2a3a" : "#e2e8f0";
  const text = darkMode ? "#e2e8f0" : "#1e293b";
  const textMuted = darkMode ? "#94a3b8" : "#64748b";
  const accent = "#f97316";
  const blue = "#3b82f6";
  const purple = "#8b5cf6";

  const styles = {
    app: { minHeight:"100vh", background:bg, color:text, fontFamily:"'Segoe UI', system-ui, sans-serif", transition:"all 0.3s" },
    nav: { position:"sticky", top:0, zIndex:100, background:darkMode?"rgba(10,14,26,0.95)":"rgba(248,250,252,0.95)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${cardBorder}`, padding:"0 2rem", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 },
    logo: { display:"flex", alignItems:"center", gap:10, cursor:"pointer" },
    logoText: { fontSize:22, fontWeight:800, background:"linear-gradient(135deg,#f97316,#3b82f6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" },
    btn: { padding:"8px 20px", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, fontSize:14, transition:"all 0.2s" },
    btnPrimary: { background:"linear-gradient(135deg,#f97316,#ea580c)", color:"#fff" },
    btnOutline: { background:"transparent", border:`1px solid ${cardBorder}`, color:text },
    btnBlue: { background:"linear-gradient(135deg,#3b82f6,#1d4ed8)", color:"#fff" },
    card: { background:card, border:`1px solid ${cardBorder}`, borderRadius:12, padding:"1.25rem", transition:"all 0.2s" },
    sidebar: { width:sidebarOpen?220:64, background:darkMode?"#0d1117":"#f1f5f9", borderRight:`1px solid ${cardBorder}`, minHeight:"calc(100vh - 64px)", padding:"1rem 0", transition:"width 0.3s", overflow:"hidden", flexShrink:0 },
    sideItem: { display:"flex", alignItems:"center", gap:12, padding:"10px 16px", cursor:"pointer", borderRadius:8, margin:"2px 8px", transition:"all 0.15s", fontSize:14, whiteSpace:"nowrap" },
    badge: { display:"inline-flex", alignItems:"center", padding:"3px 10px", borderRadius:20, fontSize:12, fontWeight:600 },
    input: { background:darkMode?"#1e2a3a":"#f1f5f9", border:`1px solid ${cardBorder}`, borderRadius:8, padding:"10px 14px", color:text, width:"100%", fontSize:14, outline:"none" },
    heroGrad: { background:"linear-gradient(135deg,rgba(249,115,22,0.15),rgba(59,130,246,0.15),rgba(139,92,246,0.1))", borderRadius:16, padding:"3rem 2.5rem" },
  };

  // Landing Page
  const LandingPage = () => (
    <div style={{ overflow:"hidden" }}>
      {/* Hero */}
      <section style={{ ...styles.heroGrad, margin:"2rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, right:-40, width:300, height:300, background:"radial-gradient(circle,rgba(249,115,22,0.2),transparent)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, left:"40%", width:250, height:250, background:"radial-gradient(circle,rgba(59,130,246,0.15),transparent)", borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ maxWidth:700, position:"relative", zIndex:1 }}>
          <div style={{ ...styles.badge, background:"rgba(249,115,22,0.15)", color:accent, marginBottom:16, fontSize:13 }}>🚀 Next-Gen Innovation Platform</div>
          <h1 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:900, lineHeight:1.15, margin:"0 0 1rem", color:text }}>
            Empowering Ideas,<br />
            <span style={{ background:"linear-gradient(135deg,#f97316,#3b82f6,#8b5cf6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Elevating Communities</span>
          </h1>
          <p style={{ fontSize:18, color:textMuted, lineHeight:1.7, marginBottom:"2rem", maxWidth:560 }}>
            Solution Sphere connects Students, Innovators, Startups, and Industries through real-world problem statements, hackathons, and collaborative innovation challenges.
          </p>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button style={{ ...styles.btn, ...styles.btnPrimary, padding:"12px 28px", fontSize:16 }} onClick={() => { setAuthMode("signup"); setPage("auth"); }}>
              Join Now →
            </button>
            <button style={{ ...styles.btn, ...styles.btnOutline, padding:"12px 28px", fontSize:16 }} onClick={() => { setUser({name:"Bharath M",role:"Student",college:"Sri Sairam Engineering College",points:1240,rank:47,avatar:"BM",color:"#3b82f6"}); setPage("dashboard"); }}>
              Explore Challenges
            </button>
            <button style={{ ...styles.btn, padding:"12px 28px", fontSize:16, background:"rgba(139,92,246,0.2)", color:purple, border:`1px solid ${purple}` }}>
              Start Innovating ⚡
            </button>
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display:"flex", gap:"1.5rem", marginTop:"2.5rem", flexWrap:"wrap" }}>
          {[["50K+","Students"],["2K+","Challenges"],["500+","Companies"],["₹2Cr+","Rewards"]].map(([n,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:28, fontWeight:800, color:accent }}>{n}</div>
              <div style={{ fontSize:13, color:textMuted }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:"2rem" }}>
        <h2 style={{ textAlign:"center", fontSize:28, fontWeight:800, marginBottom:"0.5rem" }}>Why Solution Sphere?</h2>
        <p style={{ textAlign:"center", color:textMuted, marginBottom:"2rem" }}>Everything you need to innovate, collaborate, and grow</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"1rem" }}>
          {[
            { icon:"🎯", title:"Real-World Challenges", desc:"Access 2000+ curated problem statements from industries, govt bodies, and NGOs.", color:"#f97316" },
            { icon:"🤝", title:"Collaborate & Build", desc:"Form teams, chat in real-time, assign tasks, and build solutions together.", color:"#3b82f6" },
            { icon:"🏆", title:"Get Recognized", desc:"Earn badges, certificates, and featured placements on top innovator boards.", color:"#f59e0b" },
            { icon:"💼", title:"Career Opportunities", desc:"Get discovered by 500+ recruiters based on your innovation track record.", color:"#10b981" },
            { icon:"🤖", title:"AI Recommendations", desc:"Our AI matches you with challenges perfectly suited to your skill profile.", color:"#8b5cf6" },
            { icon:"🌍", title:"SDG Impact", desc:"Contribute to UN Sustainable Development Goals through your innovations.", color:"#ef4444" },
          ].map(f => (
            <div key={f.title} style={{ ...styles.card, cursor:"default" }}>
              <div style={{ fontSize:32, marginBottom:10 }}>{f.icon}</div>
              <div style={{ fontWeight:700, fontSize:16, marginBottom:6, color:f.color }}>{f.title}</div>
              <div style={{ fontSize:13, color:textMuted, lineHeight:1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Challenges Preview */}
      <section style={{ padding:"2rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
          <h2 style={{ fontSize:24, fontWeight:800 }}>🔥 Trending Challenges</h2>
          <button style={{ ...styles.btn, ...styles.btnOutline, fontSize:13 }} onClick={() => { setUser({name:"Bharath M",role:"Student",college:"Sri Sairam Engineering College",points:1240,rank:47,avatar:"BM",color:"#3b82f6"}); setPage("challenges"); }}>View All →</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1rem" }}>
          {CHALLENGES.slice(0,6).map(c => (
            <ChallengeCard key={c.id} c={c} compact />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding:"2rem", background:darkMode?"#0d1117":"#f8fafc", margin:"0 0 2rem" }}>
        <h2 style={{ textAlign:"center", fontSize:24, fontWeight:800, marginBottom:"2rem" }}>Success Stories</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:"1rem" }}>
          {[
            { name:"Priya Sharma", role:"SDE at Google", quote:"Solution Sphere helped me land my dream job by showcasing my real problem-solving skills, not just my degree!", avatar:"PS", color:"#f59e0b" },
            { name:"Rajesh Kumar", role:"Founder, AgriTech", quote:"I found my co-founders and first clients through Solution Sphere challenges. The platform literally built my startup!", avatar:"RK", color:"#3b82f6" },
            { name:"Anita Singh", role:"Research at ISRO", quote:"The AI challenges here are miles ahead of typical coding platforms. Real impact, real problems, real solutions.", avatar:"AS", color:"#10b981" },
          ].map(t => (
            <div key={t.name} style={{ ...styles.card }}>
              <div style={{ fontSize:24, color:accent, marginBottom:8 }}>"</div>
              <p style={{ color:textMuted, lineHeight:1.7, fontSize:14, marginBottom:16 }}>{t.quote}</p>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:36, height:36, borderRadius:"50%", background:t.color, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, color:"#fff" }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>{t.name}</div>
                  <div style={{ fontSize:12, color:textMuted }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background:darkMode?"#0d1117":"#1e293b", color:"#94a3b8", padding:"2rem", textAlign:"center" }}>
        <div style={{ ...styles.logoText, fontSize:24, marginBottom:8, display:"block" }}>💡 Solution Sphere</div>
        <p style={{ fontSize:13, marginBottom:16 }}>Innovate · Collaborate · Impact</p>
        <p style={{ fontSize:12 }}>© 2026 Solution Sphere | Sri Sairam Engineering College | Bharath M, Aravind D, Suseedharan KS</p>
      </footer>
    </div>
  );

  // Challenge Card Component
  const ChallengeCard = ({ c, compact }) => {
    const saved = savedChallenges.includes(c.id);
    const applied = appliedChallenges.includes(c.id);
    return (
      <div style={{ ...styles.card, cursor:"pointer", position:"relative" }} onClick={() => { if(!compact){ setSelectedChallenge(c); } }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            <span style={{ ...styles.badge, background:darkMode?"#1e2a3a":"#f1f5f9", color:textMuted, fontSize:11 }}>{domainIcons[c.domain]||"💡"} {c.domain}</span>
            <span style={{ ...styles.badge, background:`${diffColor[c.difficulty]}20`, color:diffColor[c.difficulty], fontSize:11 }}>{c.difficulty}</span>
          </div>
          <button onClick={(e)=>{e.stopPropagation(); toggleSave(c.id);}} style={{ background:"none", border:"none", cursor:"pointer", fontSize:18, color:saved?accent:textMuted }}>
            {saved?"🔖":"🔖"}
          </button>
        </div>
        <h3 style={{ fontSize:15, fontWeight:700, marginBottom:6, lineHeight:1.4 }}>{c.title}</h3>
        <p style={{ fontSize:13, color:textMuted, lineHeight:1.6, marginBottom:12, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{c.desc}</p>
        <div style={{ display:"flex", gap:"0.75rem", fontSize:12, color:textMuted, marginBottom:12, flexWrap:"wrap" }}>
          <span>⏰ {c.deadline}</span>
          <span>👥 {c.team}</span>
          <span>👤 {c.applicants} applied</span>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontWeight:700, color:accent, fontSize:15 }}>⭐ {c.points} pts</span>
          {!compact && (
            <button
              onClick={(e)=>{e.stopPropagation(); applyChallenge(c.id, c.title);}}
              style={{ ...styles.btn, ...(applied?{}:styles.btnPrimary), padding:"6px 16px", fontSize:13, background:applied?"#10b981":undefined, color:applied?"#fff":undefined }}
            >
              {applied?"✓ Applied":"Apply Now"}
            </button>
          )}
        </div>
      </div>
    );
  };

  // Auth Page
  const AuthPage = () => {
    const roles = ["Student","Innovator","Recruiter","Industry","Startup","NGO"];
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", background:`linear-gradient(135deg,${darkMode?"#0a0e1a,#0d1117":"#f8fafc,#e2e8f0"})` }}>
        <div style={{ ...styles.card, width:"100%", maxWidth:480, padding:"2.5rem" }}>
          <div style={{ textAlign:"center", marginBottom:"2rem" }}>
            <div style={{ fontSize:32 }}>💡</div>
            <h2 style={{ fontSize:26, fontWeight:800, margin:"0.5rem 0" }}>
              {authMode==="login"?"Welcome Back!":"Join Solution Sphere"}
            </h2>
            <p style={{ color:textMuted, fontSize:14 }}>{authMode==="login"?"Continue your innovation journey":"Start solving real-world challenges"}</p>
          </div>

          {authMode==="signup" && (
            <div style={{ marginBottom:"1.5rem" }}>
              <p style={{ fontSize:13, fontWeight:600, marginBottom:10, color:textMuted }}>SELECT YOUR ROLE</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                {roles.map(r => (
                  <button key={r} onClick={()=>setSelectedRole(r)} style={{ padding:"10px 8px", borderRadius:8, border:`2px solid ${selectedRole===r?accent:cardBorder}`, background:selectedRole===r?`${accent}15`:"transparent", color:selectedRole===r?accent:text, cursor:"pointer", fontSize:13, fontWeight:600, transition:"all 0.2s" }}>
                    {r==="Student"?"🎓":r==="Innovator"?"💡":r==="Recruiter"?"💼":r==="Industry"?"🏭":r==="Startup"?"🚀":"🌍"} {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {authMode==="signup" && <input placeholder="Full Name" style={{ ...styles.input, marginBottom:12 }} />}
          <input placeholder="Email address" style={{ ...styles.input, marginBottom:12 }} />
          <input type="password" placeholder="Password" style={{ ...styles.input, marginBottom:"1.5rem" }} />

          <button
            style={{ ...styles.btn, ...styles.btnPrimary, width:"100%", padding:14, fontSize:16 }}
            onClick={() => {
              setUser({name:"Bharath M",role:selectedRole||"Student",college:"Sri Sairam Engineering College",points:1240,rank:47,avatar:"BM",color:"#3b82f6"});
              setPage("dashboard");
              showNotif("Welcome to Solution Sphere! 🚀");
            }}
          >
            {authMode==="login"?"Sign In":"Create Account"} →
          </button>

          <p style={{ textAlign:"center", marginTop:16, fontSize:14, color:textMuted }}>
            {authMode==="login"?"Don't have an account? ":"Already have an account? "}
            <span style={{ color:accent, cursor:"pointer", fontWeight:600 }} onClick={()=>setAuthMode(authMode==="login"?"signup":"login")}>
              {authMode==="login"?"Sign Up":"Sign In"}
            </span>
          </p>
        </div>
      </div>
    );
  };

  // Dashboard
  const Dashboard = () => (
    <div style={{ display:"flex", gap:0 }}>
      {/* Sidebar */}
      <div style={{ ...styles.sidebar }}>
        {[
          ["🏠","Home","dashboard"],["⚡","Challenges","challenges"],["👥","Teams","teams"],
          ["🗂️","Projects","projects"],["🏆","Achievements","achievements"],["👤","Profile","profile"],
          ["💬","Messages","messages"],["⚙️","Settings","settings"],
        ].map(([icon,label,pg]) => (
          <div key={label} onClick={()=>setPage(pg)} style={{ ...styles.sideItem, background:page===pg?`${accent}15`:"transparent", color:page===pg?accent:textMuted, fontWeight:page===pg?600:400 }}>
            <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
            {sidebarOpen && <span>{label}</span>}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex:1, padding:"1.5rem", overflowX:"hidden" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
          <div>
            <h2 style={{ fontSize:24, fontWeight:800, margin:0 }}>Welcome back, {user?.name?.split(" ")[0]}! 👋</h2>
            <p style={{ color:textMuted, fontSize:14, margin:"4px 0 0" }}>{new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}</p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ ...styles.btn, ...styles.btnPrimary, padding:"8px 16px" }} onClick={()=>setPage("challenges")}>+ New Challenge</button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"1rem", marginBottom:"1.5rem" }}>
          {[
            {label:"Innovation Points",val:"1,240",icon:"⭐",color:accent,delta:"+120 this week"},
            {label:"Challenges Solved",val:"7",icon:"✅",color:"#10b981",delta:"2 in progress"},
            {label:"Global Rank",val:"#47",icon:"🏆",color:purple,delta:"↑ 12 positions"},
            {label:"Team Members",val:"3",icon:"👥",color:blue,delta:"1 invite pending"},
          ].map(s => (
            <div key={s.label} style={{ ...styles.card }}>
              <div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontSize:24, fontWeight:800, color:s.color }}>{s.val}</div>
              <div style={{ fontSize:13, color:textMuted, marginTop:2 }}>{s.label}</div>
              <div style={{ fontSize:11, color:s.color, marginTop:4 }}>{s.delta}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:"1.5rem" }}>
          {/* Left Column */}
          <div>
            {/* Activity Graph */}
            <div style={{ ...styles.card, marginBottom:"1.5rem" }}>
              <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:16 }}>📊 Weekly Activity</h3>
              <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:80 }}>
                {ACTIVITY_DATA.map((v,i) => (
                  <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                    <div style={{ width:"100%", height:`${v}%`, background:`linear-gradient(180deg,${accent},${accent}60)`, borderRadius:"4px 4px 0 0", transition:"height 0.5s", minHeight:4 }} />
                    <span style={{ fontSize:11, color:textMuted }}>{DAYS[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Feed */}
            <div style={{ ...styles.card, marginBottom:"1.5rem" }}>
              <div style={{ display:"flex", gap:8, marginBottom:"1rem" }}>
                {["trending","following","industry"].map(t => (
                  <button key={t} onClick={()=>setActiveTab(t)} style={{ ...styles.btn, padding:"6px 14px", fontSize:13, background:activeTab===t?`${accent}20`:"transparent", color:activeTab===t?accent:textMuted, border:`1px solid ${activeTab===t?accent:cardBorder}` }}>
                    {t.charAt(0).toUpperCase()+t.slice(1)}
                  </button>
                ))}
              </div>
              {FEED_POSTS.map((p,i) => (
                <div key={i} style={{ borderBottom:`1px solid ${cardBorder}`, paddingBottom:"1rem", marginBottom:"1rem" }}>
                  <div style={{ display:"flex", gap:10, marginBottom:8 }}>
                    <div style={{ width:36,height:36,borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,color:"#fff",flexShrink:0 }}>{p.avatar}</div>
                    <div>
                      <span style={{ fontWeight:600, fontSize:14 }}>{p.user}</span>
                      <span style={{ color:textMuted, fontSize:12, marginLeft:8 }}>{p.time}</span>
                      {p.challenge && <div style={{ ...styles.badge, background:`${accent}15`, color:accent, fontSize:11, marginTop:3, display:"inline-flex" }}>🔗 {p.challenge}</div>}
                    </div>
                  </div>
                  <p style={{ fontSize:14, color:textMuted, lineHeight:1.6, margin:"0 0 8px" }}>{p.content}</p>
                  <div style={{ display:"flex", gap:16, fontSize:13, color:textMuted }}>
                    <span style={{ cursor:"pointer" }}>❤️ {p.likes}</span>
                    <span style={{ cursor:"pointer" }}>💬 {p.comments}</span>
                    <span style={{ cursor:"pointer" }}>↗️ Share</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommended Challenges */}
            <div style={{ ...styles.card }}>
              <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:16 }}>🤖 AI Recommended For You</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
                {CHALLENGES.slice(0,3).map(c => (
                  <div key={c.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0.75rem", background:darkMode?"#0d1117":"#f8fafc", borderRadius:8, cursor:"pointer" }} onClick={()=>{setPage("challenges"); setSelectedChallenge(c);}}>
                    <div>
                      <div style={{ fontWeight:600, fontSize:14, marginBottom:3 }}>{c.title}</div>
                      <div style={{ fontSize:12, color:textMuted }}>{c.domain} · {c.difficulty} · ⭐ {c.points} pts</div>
                    </div>
                    <button style={{ ...styles.btn, ...styles.btnPrimary, padding:"5px 12px", fontSize:12, flexShrink:0 }} onClick={(e)=>{e.stopPropagation(); applyChallenge(c.id,c.title);}}>
                      {appliedChallenges.includes(c.id)?"✓":"Apply"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div>
            {/* User Card */}
            <div style={{ ...styles.card, marginBottom:"1rem", textAlign:"center" }}>
              <div style={{ width:64,height:64,borderRadius:"50%",background:`linear-gradient(135deg,${blue},${purple})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:22,color:"#fff",margin:"0 auto 12px" }}>
                {user?.avatar}
              </div>
              <div style={{ fontWeight:700, fontSize:17 }}>{user?.name}</div>
              <div style={{ color:accent, fontSize:13, margin:"4px 0" }}>{user?.role}</div>
              <div style={{ color:textMuted, fontSize:12, marginBottom:12 }}>{user?.college}</div>
              <div style={{ display:"flex", justifyContent:"center", gap:16 }}>
                <div style={{ textAlign:"center" }}><div style={{ fontWeight:700, color:accent }}>1,240</div><div style={{ fontSize:11,color:textMuted }}>Points</div></div>
                <div style={{ textAlign:"center" }}><div style={{ fontWeight:700, color:blue }}>7</div><div style={{ fontSize:11,color:textMuted }}>Solved</div></div>
                <div style={{ textAlign:"center" }}><div style={{ fontWeight:700, color:purple }}>#47</div><div style={{ fontSize:11,color:textMuted }}>Rank</div></div>
              </div>
            </div>

            {/* Top Innovators */}
            <div style={{ ...styles.card, marginBottom:"1rem" }}>
              <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:15 }}>🏆 Top Innovators</h3>
              {USERS.map((u,i) => (
                <div key={u.name} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <span style={{ fontSize:16, width:20, textAlign:"center" }}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</span>
                  <div style={{ width:32,height:32,borderRadius:"50%",background:u.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,color:"#fff" }}>{u.avatar}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600 }}>{u.name}</div>
                    <div style={{ fontSize:11, color:textMuted }}>{u.role}</div>
                  </div>
                  <span style={{ fontWeight:700, color:accent, fontSize:13 }}>{u.points.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Upcoming Hackathons */}
            <div style={{ ...styles.card }}>
              <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:15 }}>⚡ Upcoming Hackathons</h3>
              {[
                {name:"SIH 2026",date:"Aug 1-2",prize:"₹1L",tag:"National"},
                {name:"SmartCity Hack",date:"Jul 15",prize:"₹50K",tag:"Online"},
                {name:"AgriThon 2026",date:"Jul 22",prize:"₹75K",tag:"Hybrid"},
              ].map(h => (
                <div key={h.name} style={{ marginBottom:12, padding:"0.75rem", background:darkMode?"#0d1117":"#f8fafc", borderRadius:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <span style={{ fontWeight:600, fontSize:14 }}>{h.name}</span>
                    <span style={{ ...styles.badge, background:`${accent}15`, color:accent, fontSize:11 }}>{h.tag}</span>
                  </div>
                  <div style={{ fontSize:12, color:textMuted, marginTop:4 }}>📅 {h.date} · 🏆 {h.prize}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Challenges Page
  const ChallengesPage = () => (
    <div style={{ display:"flex", gap:0 }}>
      <div style={{ ...styles.sidebar }}>
        {[["🏠","Home","dashboard"],["⚡","Challenges","challenges"],["👥","Teams","teams"],["🗂️","Projects","projects"],["🏆","Achievements","achievements"],["👤","Profile","profile"]].map(([icon,label,pg]) => (
          <div key={label} onClick={()=>setPage(pg)} style={{ ...styles.sideItem, background:page===pg?`${accent}15`:"transparent", color:page===pg?accent:textMuted, fontWeight:page===pg?600:400 }}>
            <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
            {sidebarOpen && <span>{label}</span>}
          </div>
        ))}
      </div>
      <div style={{ flex:1, padding:"1.5rem" }}>
        <h2 style={{ fontSize:24, fontWeight:800, marginBottom:"0.5rem" }}>⚡ Challenge Marketplace</h2>
        <p style={{ color:textMuted, marginBottom:"1.5rem" }}>{filteredChallenges.length} challenges available · {appliedChallenges.length} applied</p>

        {/* Filters */}
        <div style={{ ...styles.card, marginBottom:"1.5rem", display:"flex", gap:12, flexWrap:"wrap", alignItems:"center" }}>
          <input placeholder="🔍 Search challenges..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} style={{ ...styles.input, width:220 }} />
          <select value={domainFilter} onChange={e=>setDomainFilter(e.target.value)} style={{ ...styles.input, width:160, cursor:"pointer" }}>
            {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={diffFilter} onChange={e=>setDiffFilter(e.target.value)} style={{ ...styles.input, width:130, cursor:"pointer" }}>
            {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <button onClick={()=>{setSearchQuery("");setDomainFilter("All");setDiffFilter("All");}} style={{ ...styles.btn, ...styles.btnOutline, fontSize:13 }}>Clear</button>
        </div>

        {/* Domain pills */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:"1.5rem" }}>
          {DOMAINS.slice(1).map(d => (
            <button key={d} onClick={()=>setDomainFilter(d===domainFilter?"All":d)} style={{ ...styles.badge, padding:"6px 14px", cursor:"pointer", background:domainFilter===d?`${accent}20`:`${darkMode?"#1e2a3a":"#f1f5f9"}`, color:domainFilter===d?accent:textMuted, border:`1px solid ${domainFilter===d?accent:"transparent"}`, transition:"all 0.15s" }}>
              {domainIcons[d]||"💡"} {d}
            </button>
          ))}
        </div>

        {/* Challenge Grid */}
        {selectedChallenge ? (
          <div style={{ ...styles.card }}>
            <button onClick={()=>setSelectedChallenge(null)} style={{ ...styles.btn, ...styles.btnOutline, marginBottom:"1.5rem", fontSize:13 }}>← Back to Challenges</button>
            <div style={{ display:"flex", gap:12, marginBottom:16, flexWrap:"wrap" }}>
              <span style={{ ...styles.badge, background:`${diffColor[selectedChallenge.difficulty]}20`, color:diffColor[selectedChallenge.difficulty] }}>{selectedChallenge.difficulty}</span>
              <span style={{ ...styles.badge, background:darkMode?"#1e2a3a":"#f1f5f9", color:textMuted }}>{domainIcons[selectedChallenge.domain]||"💡"} {selectedChallenge.domain}</span>
              <span style={{ ...styles.badge, background:darkMode?"#1e2a3a":"#f1f5f9", color:textMuted }}>📂 {selectedChallenge.category}</span>
            </div>
            <h2 style={{ fontSize:24, fontWeight:800, marginBottom:12 }}>{selectedChallenge.title}</h2>
            <p style={{ color:textMuted, lineHeight:1.8, marginBottom:24, fontSize:16 }}>{selectedChallenge.desc}</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:"1rem", marginBottom:24 }}>
              {[["⏰ Deadline",selectedChallenge.deadline],["👥 Team Size",selectedChallenge.team],["👤 Applicants",selectedChallenge.applicants],["🏛️ Posted By",selectedChallenge.org],["⭐ Reward",`${selectedChallenge.points} pts`]].map(([l,v]) => (
                <div key={l} style={{ background:darkMode?"#0d1117":"#f8fafc", borderRadius:8, padding:"0.75rem" }}>
                  <div style={{ fontSize:12, color:textMuted }}>{l}</div>
                  <div style={{ fontWeight:700, fontSize:16, marginTop:4 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:12 }}>
              <button onClick={()=>applyChallenge(selectedChallenge.id, selectedChallenge.title)} style={{ ...styles.btn, ...(appliedChallenges.includes(selectedChallenge.id)?{}:styles.btnPrimary), padding:"12px 28px", fontSize:16, background:appliedChallenges.includes(selectedChallenge.id)?"#10b981":undefined, color:appliedChallenges.includes(selectedChallenge.id)?"#fff":undefined }}>
                {appliedChallenges.includes(selectedChallenge.id)?"✓ Applied Successfully":"Apply Now →"}
              </button>
              <button onClick={()=>toggleSave(selectedChallenge.id)} style={{ ...styles.btn, ...styles.btnOutline, padding:"12px 20px", fontSize:16, color:savedChallenges.includes(selectedChallenge.id)?accent:undefined }}>
                {savedChallenges.includes(selectedChallenge.id)?"🔖 Saved":"🔖 Save"}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:"1rem" }}>
            {filteredChallenges.length === 0 ? (
              <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"3rem", color:textMuted }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
                <p>No challenges found matching your filters</p>
              </div>
            ) : filteredChallenges.map(c => <ChallengeCard key={c.id} c={c} />)}
          </div>
        )}
      </div>
    </div>
  );

  // Profile Page
  const ProfilePage = () => (
    <div style={{ display:"flex", gap:0 }}>
      <div style={{ ...styles.sidebar }}>
        {[["🏠","Home","dashboard"],["⚡","Challenges","challenges"],["👥","Teams","teams"],["🗂️","Projects","projects"],["🏆","Achievements","achievements"],["👤","Profile","profile"]].map(([icon,label,pg]) => (
          <div key={label} onClick={()=>setPage(pg)} style={{ ...styles.sideItem, background:page===pg?`${accent}15`:"transparent", color:page===pg?accent:textMuted, fontWeight:page===pg?600:400 }}>
            <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
            {sidebarOpen && <span>{label}</span>}
          </div>
        ))}
      </div>
      <div style={{ flex:1, padding:"1.5rem" }}>
        {/* Profile Header */}
        <div style={{ ...styles.heroGrad, marginBottom:"1.5rem", display:"flex", gap:24, alignItems:"flex-start", flexWrap:"wrap" }}>
          <div style={{ width:90,height:90,borderRadius:"50%",background:`linear-gradient(135deg,${blue},${purple})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:28,color:"#fff",flexShrink:0 }}>
            {user?.avatar}
          </div>
          <div style={{ flex:1 }}>
            <h2 style={{ fontSize:26, fontWeight:800, margin:"0 0 4px" }}>{user?.name}</h2>
            <p style={{ color:accent, fontSize:15, margin:"0 0 8px" }}>{user?.role} · {user?.college}</p>
            <p style={{ color:textMuted, fontSize:14, margin:"0 0 12px", maxWidth:500 }}>
              "Innovation distinguishes between a leader and a follower." — Passionate about using technology to solve real-world challenges across AI/ML and IoT domains.
            </p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              {["🐙 GitHub","🔗 LinkedIn","🌐 Portfolio"].map(s => (
                <button key={s} style={{ ...styles.btn, ...styles.btnOutline, fontSize:12, padding:"5px 12px" }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:"1rem" }}>
            {[["⭐","1,240","Points"],["✅","7","Solved"],["🏆","#47","Rank"],["🤝","4","Badges"]].map(([icon,val,label]) => (
              <div key={label} style={{ textAlign:"center" }}>
                <div style={{ fontSize:20 }}>{icon}</div>
                <div style={{ fontWeight:800, fontSize:18, color:accent }}>{val}</div>
                <div style={{ fontSize:11, color:textMuted }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
          {/* Skills */}
          <div style={{ ...styles.card }}>
            <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:16 }}>🛠️ Skills</h3>
            {[["Python",88],["React.js",75],["Machine Learning",70],["Node.js",65],["IoT/Arduino",60]].map(([skill,pct]) => (
              <div key={skill} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:5 }}>
                  <span style={{ fontWeight:600 }}>{skill}</span><span style={{ color:textMuted }}>{pct}%</span>
                </div>
                <div style={{ height:6, background:darkMode?"#1e2a3a":"#f1f5f9", borderRadius:3 }}>
                  <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${accent},${blue})`, borderRadius:3, transition:"width 1s" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div style={{ ...styles.card }}>
            <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:16 }}>🏆 Achievements</h3>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {ACHIEVEMENTS.map(a => (
                <div key={a.title} style={{ padding:"0.75rem", borderRadius:8, background:a.earned?`${accent}10`:darkMode?"#0d1117":"#f8fafc", border:`1px solid ${a.earned?accent:cardBorder}`, opacity:a.earned?1:0.5 }}>
                  <div style={{ fontSize:22, marginBottom:4 }}>{a.icon}</div>
                  <div style={{ fontWeight:600, fontSize:12 }}>{a.title}</div>
                  <div style={{ fontSize:11, color:textMuted, marginTop:2 }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon History */}
          <div style={{ ...styles.card }}>
            <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:16 }}>⚡ Hackathon History</h3>
            {[
              { name:"NEXORA 2k25", result:"Finalist", date:"Jun 2025", prize:"Certificate" },
              { name:"KALAM'24", result:"Runner Up", date:"Sep 2024", prize:"Cash + Trophy" },
              { name:"Ideathon 3.0", result:"Pre-Finals", date:"Nov 2024", prize:"Certificate" },
              { name:"Wadhwani NEN", result:"Registered Venture", date:"2025", prize:"Mentorship" },
            ].map(h => (
              <div key={h.name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, paddingBottom:10, borderBottom:`1px solid ${cardBorder}` }}>
                <div>
                  <div style={{ fontWeight:600, fontSize:14 }}>{h.name}</div>
                  <div style={{ fontSize:12, color:textMuted }}>{h.date} · {h.prize}</div>
                </div>
                <span style={{ ...styles.badge, background:`${accent}15`, color:accent, fontSize:11 }}>{h.result}</span>
              </div>
            ))}
          </div>

          {/* Dream Company */}
          <div style={{ ...styles.card }}>
            <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:16 }}>💼 Career Goals</h3>
            <div style={{ padding:"1rem", background:darkMode?"#0d1117":"#f8fafc", borderRadius:8, marginBottom:12 }}>
              <div style={{ fontSize:12, color:textMuted, marginBottom:4 }}>DREAM COMPANY</div>
              <div style={{ fontWeight:700, fontSize:20 }}>Google / Microsoft</div>
              <div style={{ fontSize:13, color:textMuted, marginTop:4 }}>Software Engineer (AI/ML)</div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["SDE","AI Engineer","Product Manager","Startup Founder","Research Scientist"].map(r => (
                <span key={r} style={{ ...styles.badge, background:darkMode?"#1e2a3a":"#f1f5f9", color:textMuted, fontSize:12 }}>{r}</span>
              ))}
            </div>
            <div style={{ marginTop:16 }}>
              <button style={{ ...styles.btn, ...styles.btnPrimary, width:"100%", fontSize:13 }}>📄 Upload Resume</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Achievements Page
  const AchievementsPage = () => (
    <div style={{ display:"flex", gap:0 }}>
      <div style={{ ...styles.sidebar }}>
        {[["🏠","Home","dashboard"],["⚡","Challenges","challenges"],["👥","Teams","teams"],["🗂️","Projects","projects"],["🏆","Achievements","achievements"],["👤","Profile","profile"]].map(([icon,label,pg]) => (
          <div key={label} onClick={()=>setPage(pg)} style={{ ...styles.sideItem, background:page===pg?`${accent}15`:"transparent", color:page===pg?accent:textMuted, fontWeight:page===pg?600:400 }}>
            <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
            {sidebarOpen && <span>{label}</span>}
          </div>
        ))}
      </div>
      <div style={{ flex:1, padding:"1.5rem" }}>
        <h2 style={{ fontSize:24, fontWeight:800, marginBottom:"0.5rem" }}>🏆 Achievements & Certificates</h2>
        <p style={{ color:textMuted, marginBottom:"2rem" }}>Your innovation journey milestones</p>

        {/* Reputation Score */}
        <div style={{ ...styles.heroGrad, marginBottom:"2rem", display:"flex", alignItems:"center", gap:24, flexWrap:"wrap" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:64, fontWeight:900, background:`linear-gradient(135deg,${accent},${blue})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>847</div>
            <div style={{ color:textMuted, fontSize:15 }}>Innovation Score</div>
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
              {[["🎯 Problem Solving","92%"],["🤝 Collaboration","78%"],["💡 Creativity","85%"],["⚡ Speed","70%"]].map(([label,val]) => (
                <div key={label} style={{ padding:"0.75rem", background:darkMode?"rgba(0,0,0,0.2)":"rgba(255,255,255,0.5)", borderRadius:8 }}>
                  <div style={{ fontSize:13, color:textMuted, marginBottom:4 }}>{label}</div>
                  <div style={{ fontWeight:700, color:accent }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:18 }}>🎖️ Badges</h3>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
          {ACHIEVEMENTS.map(a => (
            <div key={a.title} style={{ ...styles.card, textAlign:"center", opacity:a.earned?1:0.4, border:`2px solid ${a.earned?accent:cardBorder}`, transform:a.earned?"none":"scale(0.97)" }}>
              <div style={{ fontSize:40, marginBottom:8 }}>{a.icon}</div>
              <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>{a.title}</div>
              <div style={{ fontSize:12, color:textMuted }}>{a.desc}</div>
              {a.earned && <div style={{ marginTop:8, ...styles.badge, background:`${accent}15`, color:accent, fontSize:11, justifyContent:"center" }}>✓ Earned</div>}
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:18 }}>🌐 Global Leaderboard</h3>
        <div style={{ ...styles.card }}>
          <table style={{ width:"100%", borderCollapse:"collapse" }}>
            <thead>
              <tr style={{ borderBottom:`1px solid ${cardBorder}` }}>
                {["Rank","User","Role","Points","Badges","Trend"].map(h => (
                  <th key={h} style={{ textAlign:"left", padding:"8px 12px", fontSize:12, color:textMuted, fontWeight:600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USERS.map((u,i) => (
                <tr key={u.name} style={{ borderBottom:`1px solid ${cardBorder}` }}>
                  <td style={{ padding:"12px 12px", fontWeight:700 }}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}</td>
                  <td style={{ padding:"12px 12px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:32,height:32,borderRadius:"50%",background:u.color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,color:"#fff" }}>{u.avatar}</div>
                      <div>
                        <div style={{ fontWeight:600, fontSize:14 }}>{u.name}</div>
                        <div style={{ fontSize:12, color:textMuted }}>{u.college}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding:"12px 12px", fontSize:13, color:textMuted }}>{u.role}</td>
                  <td style={{ padding:"12px 12px", fontWeight:700, color:accent }}>{u.points.toLocaleString()}</td>
                  <td style={{ padding:"12px 12px" }}><span style={{ ...styles.badge, background:`${accent}15`, color:accent, fontSize:12 }}>🎖️ {u.badges}</span></td>
                  <td style={{ padding:"12px 12px", color:"#10b981", fontSize:13 }}>↑ Rising</td>
                </tr>
              ))}
              <tr style={{ background:`${accent}08` }}>
                <td style={{ padding:"12px 12px", fontWeight:700, color:blue }}>#47</td>
                <td style={{ padding:"12px 12px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:32,height:32,borderRadius:"50%",background:blue,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,color:"#fff" }}>BM</div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:14 }}>Bharath M <span style={{ color:accent,fontSize:11 }}>(You)</span></div>
                      <div style={{ fontSize:12, color:textMuted }}>Sri Sairam Engineering College</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding:"12px 12px", fontSize:13, color:textMuted }}>Student</td>
                <td style={{ padding:"12px 12px", fontWeight:700, color:accent }}>1,240</td>
                <td style={{ padding:"12px 12px" }}><span style={{ ...styles.badge, background:`${accent}15`, color:accent, fontSize:12 }}>🎖️ 4</span></td>
                <td style={{ padding:"12px 12px", color:"#10b981", fontSize:13 }}>↑ +12</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Teams Page
  const TeamsPage = () => (
    <div style={{ display:"flex", gap:0 }}>
      <div style={{ ...styles.sidebar }}>
        {[["🏠","Home","dashboard"],["⚡","Challenges","challenges"],["👥","Teams","teams"],["🗂️","Projects","projects"],["🏆","Achievements","achievements"],["👤","Profile","profile"]].map(([icon,label,pg]) => (
          <div key={label} onClick={()=>setPage(pg)} style={{ ...styles.sideItem, background:page===pg?`${accent}15`:"transparent", color:page===pg?accent:textMuted, fontWeight:page===pg?600:400 }}>
            <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
            {sidebarOpen && <span>{label}</span>}
          </div>
        ))}
      </div>
      <div style={{ flex:1, padding:"1.5rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
          <div>
            <h2 style={{ fontSize:24, fontWeight:800, margin:0 }}>👥 Teams & Collaboration</h2>
            <p style={{ color:textMuted, fontSize:14, marginTop:4 }}>Build and manage your innovation teams</p>
          </div>
          <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={()=>showNotif("Team created!")}>+ Create Team</button>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
          {/* My Team */}
          <div style={{ ...styles.card }}>
            <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:16 }}>⚡ My Active Team</h3>
            <div style={{ padding:"1rem", background:darkMode?"#0d1117":"#f8fafc", borderRadius:8, marginBottom:"1rem" }}>
              <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>Team Alpha — Smart Farming</div>
              <div style={{ fontSize:13, color:textMuted }}>Working on: AI Crop Disease Detection</div>
              <div style={{ display:"flex", gap:6, marginTop:8 }}>
                <span style={{ ...styles.badge, background:`${accent}15`, color:accent, fontSize:11 }}>Active</span>
                <span style={{ ...styles.badge, background:darkMode?"#1e2a3a":"#f1f5f9", color:textMuted, fontSize:11 }}>3 Members</span>
              </div>
            </div>
            {["Bharath M","Aravind D","Suseedharan KS"].map((name,i) => (
              <div key={name} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ width:36,height:36,borderRadius:"50%",background:[blue,accent,"#10b981"][i],display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,color:"#fff" }}>
                  {name.split(" ").map(w=>w[0]).join("")}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:600, fontSize:14 }}>{name}</div>
                  <div style={{ fontSize:12, color:textMuted }}>{["Lead Dev (You)","Backend Dev","UI/UX Designer"][i]}</div>
                </div>
                {i===0 && <span style={{ ...styles.badge, background:`${accent}15`, color:accent, fontSize:11 }}>Leader</span>}
              </div>
            ))}
            <div style={{ display:"flex", gap:8, marginTop:"1rem" }}>
              <button style={{ ...styles.btn, ...styles.btnOutline, fontSize:13, flex:1 }} onClick={()=>showNotif("Invite sent!")}>+ Invite</button>
              <button style={{ ...styles.btn, ...styles.btnPrimary, fontSize:13, flex:1 }}>💬 Chat</button>
            </div>
          </div>

          {/* Task Board */}
          <div style={{ ...styles.card }}>
            <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:16 }}>📋 Task Board</h3>
            {[
              { task:"Dataset collection & preprocessing", status:"Done", assignee:"BM", color:"#10b981" },
              { task:"Model training (ResNet-50)", status:"In Progress", assignee:"AD", color:accent },
              { task:"Mobile app UI design", status:"In Progress", assignee:"SK", color:accent },
              { task:"API integration", status:"To Do", assignee:"BM", color:textMuted },
              { task:"Testing & evaluation report", status:"To Do", assignee:"All", color:textMuted },
            ].map((t,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, padding:"0.75rem", background:darkMode?"#0d1117":"#f8fafc", borderRadius:8 }}>
                <span style={{ fontSize:16 }}>{t.status==="Done"?"✅":t.status==="In Progress"?"🔄":"⬜"}</span>
                <span style={{ flex:1, fontSize:14, color:t.status==="Done"?textMuted:text }}>{t.task}</span>
                <span style={{ ...styles.badge, background:`${t.color}20`, color:t.color, fontSize:11 }}>{t.status}</span>
                <div style={{ width:28,height:28,borderRadius:"50%",background:blue,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:"#fff" }}>{t.assignee}</div>
              </div>
            ))}
          </div>

          {/* Find Teams */}
          <div style={{ ...styles.card, gridColumn:"1/-1" }}>
            <h3 style={{ fontWeight:700, marginBottom:"1rem", fontSize:16 }}>🔍 Find Open Teams</h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1rem" }}>
              {[
                { name:"DataDriven Squad", challenge:"AI Traffic Optimization", looking:"ML Engineer, Data Analyst", members:2, max:5 },
                { name:"EcoTech Builders", challenge:"Plastic Pollution Reduction", looking:"App Developer, UX Designer", members:3, max:6 },
                { name:"RuralConnect Team", challenge:"Digital Education for Rural Students", looking:"Backend Dev", members:2, max:4 },
              ].map(t => (
                <div key={t.name} style={{ padding:"1rem", background:darkMode?"#0d1117":"#f8fafc", borderRadius:8, border:`1px solid ${cardBorder}` }}>
                  <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>{t.name}</div>
                  <div style={{ fontSize:12, color:accent, marginBottom:6 }}>📋 {t.challenge}</div>
                  <div style={{ fontSize:12, color:textMuted, marginBottom:8 }}>Looking for: {t.looking}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:12, color:textMuted }}>👥 {t.members}/{t.max}</span>
                    <button style={{ ...styles.btn, ...styles.btnPrimary, fontSize:12, padding:"5px 12px" }} onClick={()=>showNotif("Request sent!")}>Join Request</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render current page
  const renderPage = () => {
    if (page === "landing") return <LandingPage />;
    if (page === "auth") return <AuthPage />;
    if (page === "dashboard") return <Dashboard />;
    if (page === "challenges") return <ChallengesPage />;
    if (page === "profile") return <ProfilePage />;
    if (page === "achievements") return <AchievementsPage />;
    if (page === "teams") return <TeamsPage />;
    return (
      <div style={{ display:"flex", gap:0 }}>
        <div style={{ ...styles.sidebar }}>
          {[["🏠","Home","dashboard"],["⚡","Challenges","challenges"],["👥","Teams","teams"],["🗂️","Projects","projects"],["🏆","Achievements","achievements"],["👤","Profile","profile"]].map(([icon,label,pg]) => (
            <div key={label} onClick={()=>setPage(pg)} style={{ ...styles.sideItem, background:page===pg?`${accent}15`:"transparent", color:page===pg?accent:textMuted, fontWeight:page===pg?600:400 }}>
              <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
              {sidebarOpen && <span>{label}</span>}
            </div>
          ))}
        </div>
        <div style={{ flex:1, padding:"3rem", textAlign:"center", color:textMuted }}>
          <div style={{ fontSize:64 }}>🚧</div>
          <h2 style={{ color:text, marginTop:16 }}>{page.charAt(0).toUpperCase()+page.slice(1)} Page</h2>
          <p>Coming soon in the next sprint!</p>
          <button style={{ ...styles.btn, ...styles.btnPrimary, marginTop:16 }} onClick={()=>setPage("dashboard")}>← Back to Dashboard</button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.app}>
      {/* Notification */}
      {notification && (
        <div style={{ position:"fixed", top:80, right:24, zIndex:999, background:accent, color:"#fff", padding:"12px 20px", borderRadius:10, fontWeight:600, fontSize:14, boxShadow:"0 4px 20px rgba(249,115,22,0.4)", animation:"slideIn 0.3s ease" }}>
          ✓ {notification}
        </div>
      )}

      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={()=>setPage(user?"dashboard":"landing")}>
          <span style={{ fontSize:28 }}>💡</span>
          <span style={styles.logoText}>Solution Sphere</span>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {user && page !== "landing" && (
            <button onClick={()=>setSidebarOpen(p=>!p)} style={{ ...styles.btn, ...styles.btnOutline, padding:"6px 10px", fontSize:16 }}>☰</button>
          )}
          {["landing","auth"].includes(page) ? (
            <>
              {page !== "auth" && (
                <button style={{ ...styles.btn, ...styles.btnOutline, fontSize:14 }} onClick={()=>{setAuthMode("login");setPage("auth");}}>Sign In</button>
              )}
              <button style={{ ...styles.btn, ...styles.btnPrimary, fontSize:14 }} onClick={()=>{setAuthMode("signup");setPage("auth");}}>Join Now</button>
            </>
          ) : (
            <>
              <div style={{ display:"flex", gap:6 }}>
                {[["⚡","challenges"],["🏆","achievements"]].map(([icon,pg]) => (
                  <button key={pg} onClick={()=>setPage(pg)} style={{ ...styles.btn, padding:"6px 10px", background:page===pg?`${accent}20`:"transparent", border:`1px solid ${page===pg?accent:cardBorder}`, color:page===pg?accent:textMuted }}>
                    {icon}
                  </button>
                ))}
              </div>
              <button onClick={()=>setDarkMode(p=>!p)} style={{ ...styles.btn, ...styles.btnOutline, padding:"6px 10px" }}>{darkMode?"☀️":"🌙"}</button>
              <div style={{ width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${blue},${purple})`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:14,color:"#fff",cursor:"pointer" }} onClick={()=>setPage("profile")}>
                {user?.avatar}
              </div>
              <button style={{ ...styles.btn, ...styles.btnOutline, fontSize:13 }} onClick={()=>{setUser(null);setPage("landing");}}>Sign Out</button>
            </>
          )}
        </div>
      </nav>

      {renderPage()}

      <style>{`
        @keyframes slideIn { from { transform: translateX(100px); opacity:0; } to { transform: translateX(0); opacity:1; } }
        * { box-sizing: border-box; }
        select option { background: #111827; color: #e2e8f0; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius:3px; }
      `}</style>
    </div>
  );
}
