import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

/* ── Design tokens ── */
const T = {
  bg:"#0d1117", sidebar:"#0f1420", surface:"#141b2d", surfaceAlt:"#1a2236",
  border:"rgba(255,255,255,0.07)", accent:"#7c3aed", accentSoft:"rgba(124,58,237,0.15)",
  text:"#e2e8f0", muted:"#64748b",
};

const NAV_ITEMS = [
  { id:"dashboard",       label:"Dashboard",       icon:"○", path:"/admin/dashboard" },
  { id:"products",        label:"Products",        icon:"◆", path:"/admin/products" },
  { id:"users",           label:"Users",           icon:"◎", path:"/admin/users" },
  { id:"requests",        label:"Requests",        icon:"◷", path:"/admin/requests" },
  { id:"issues",          label:"Issues",          icon:"△", path:"/admin/issues" },
  { id:"assigned-assets", label:"Assigned Assets", icon:"⊞", path:"/admin/assigned-assets" },
];

/* ── Sidebar ── */
function Sidebar({ active, navigate, onLogout }) {
  const [open, setOpen] = useState(true);
  return (
    <aside style={{
      width:open?220:68, minHeight:"100vh", background:T.sidebar,
      borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column",
      padding:"22px 10px", transition:"width 0.25s cubic-bezier(.4,0,.2,1)",
      flexShrink:0, position:"sticky", top:0, height:"100vh", overflowY:"auto", overflowX:"hidden",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 6px", marginBottom:28, minWidth:0 }}>
        <div style={{ width:34, height:34, borderRadius:9, flexShrink:0, background:"linear-gradient(135deg,#7c3aed,#6366f1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, boxShadow:"0 4px 14px rgba(124,58,237,0.4)" }}>⬡</div>
        {open && <div style={{ overflow:"hidden", whiteSpace:"nowrap", minWidth:0 }}>
          <div style={{ fontWeight:800, fontSize:14, color:T.text, fontFamily:"'Sora',sans-serif" }}>AssetFlow</div>
          <div style={{ fontSize:9, color:T.muted, letterSpacing:"1px", textTransform:"uppercase" }}>Admin</div>
        </div>}
        <button onClick={()=>setOpen(o=>!o)} title={open?"Collapse":"Expand"} style={{ marginLeft:"auto", flexShrink:0, width:26, height:26, borderRadius:7, background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted, cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}
          onMouseEnter={e=>{e.currentTarget.style.color=T.text;e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}
          onMouseLeave={e=>{e.currentTarget.style.color=T.muted;e.currentTarget.style.borderColor=T.border;}}
        >{open?"‹":"›"}</button>
      </div>

      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px", borderRadius:12, background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, marginBottom:22, minWidth:0, overflow:"hidden" }}>
        <div style={{ width:30, height:30, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg,#7c3aed,#6366f1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff" }}>A</div>
        {open && <>
          <div style={{ overflow:"hidden", whiteSpace:"nowrap", minWidth:0 }}>
            <div style={{ fontSize:12, fontWeight:700, color:T.text }}>Admin</div>
            <div style={{ fontSize:10, color:T.muted }}>Full access</div>
          </div>
          <div style={{ marginLeft:"auto", flexShrink:0, display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:"#10b981" }} />
            {onLogout && <button onClick={onLogout} title="Sign out" style={{ background:"none", border:"none", color:"#ef4444", cursor:"pointer", fontSize:14, lineHeight:1, padding:0 }}>⎋</button>}
          </div>
        </>}
      </div>

      {open && <div style={{ fontSize:9, color:T.muted, letterSpacing:"1.5px", textTransform:"uppercase", padding:"0 8px", marginBottom:6 }}>Navigation</div>}

      <nav style={{ flex:1 }}>
        {NAV_ITEMS.map(item => {
          const isActive = active===item.id;
          return (
            <div key={item.id} onClick={()=>navigate(item.path)} title={!open?item.label:undefined}
              style={{ display:"flex", alignItems:"center", gap:open?10:0, justifyContent:open?"flex-start":"center", padding:open?"10px 12px":"11px 0", borderRadius:10, marginBottom:2, cursor:"pointer", transition:"background 0.15s, color 0.15s", background:isActive?T.accentSoft:"transparent", color:isActive?"#a78bfa":T.muted, fontWeight:isActive?600:400, fontSize:13, fontFamily:"'Sora',sans-serif", borderLeft:isActive?`3px solid ${T.accent}`:"3px solid transparent", whiteSpace:"nowrap", overflow:"hidden" }}
              onMouseEnter={e=>{if(!isActive){e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.color=T.text;}}}
              onMouseLeave={e=>{if(!isActive){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.muted;}}}
            >
              <span style={{ fontSize:15, width:22, textAlign:"center", flexShrink:0 }}>{item.icon}</span>
              {open && <span>{item.label}</span>}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

/* ── Charts ── */
const CHART_COLORS = ["#6366f1","#10b981","#f59e0b","#ef4444","#8b5cf6"];
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#0f172a", color:T.text, fontSize:12, padding:"8px 14px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 8px 24px rgba(0,0,0,0.4)" }}>
      <p style={{ fontWeight:700, marginBottom:4 }}>{label}</p>
      <p>Count: <span style={{ color:"#818cf8", fontWeight:700 }}>{payload[0].value}</span></p>
    </div>
  );
};

const StatCard = ({ label, value, sub, gradient, icon, loading }) => (
  <div style={{ background:gradient, borderRadius:18, padding:"22px 24px", color:"#fff", position:"relative", overflow:"hidden", boxShadow:"0 8px 28px rgba(0,0,0,0.3)" }}>
    <div style={{ position:"absolute", top:-20, right:-20, width:90, height:90, borderRadius:"50%", background:"rgba(255,255,255,0.07)" }} />
    <div style={{ position:"absolute", bottom:-10, right:10, width:55, height:55, borderRadius:"50%", background:"rgba(255,255,255,0.05)" }} />
    <p style={{ fontSize:10, fontWeight:600, textTransform:"uppercase", letterSpacing:"1.5px", opacity:0.75, marginBottom:4 }}>{label}</p>
    <h2 style={{ fontSize:44, fontWeight:800, letterSpacing:"-2px", margin:"6px 0", fontFamily:"'Sora',sans-serif" }}>
      {loading ? <span style={{ display:"inline-block", width:60, height:40, background:"rgba(255,255,255,0.15)", borderRadius:8 }} /> : value}
    </h2>
    <p style={{ fontSize:12, opacity:0.65, marginTop:4 }}>{sub}</p>
    <div style={{ position:"absolute", top:18, right:18, fontSize:26, opacity:0.2, userSelect:"none" }}>{icon}</div>
  </div>
);

/* ── Page ── */
function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalAssets:0, totalUsers:0, pendingRequests:0, openIssues:0, assetStatusChart:[], requestStatusChart:[] });
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    try { setLoading(true); const res = await API.get("/dashboard/admin-stats"); setStats(res.data); }
    catch (err) { console.error("Failed to load dashboard stats:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDashboardStats(); }, []);

  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("role"); navigate("/"); };

  const safeAssetChart   = useMemo(() => stats.assetStatusChart   || [], [stats.assetStatusChart]);
  const safeRequestChart = useMemo(() => stats.requestStatusChart || [], [stats.requestStatusChart]);
  const hasAssetData     = safeAssetChart.some(i => i.value > 0);
  const hasRequestData   = safeRequestChart.some(i => i.value > 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Sora',sans-serif; background:${T.bg}; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(124,58,237,0.3); border-radius:10px; }
        .glass { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); }
        .qbtn { display:block; width:100%; text-align:left; padding:13px 15px; border-radius:12px; font-size:13px; font-weight:600; border:1px solid rgba(255,255,255,0.07); transition:all 0.17s; cursor:pointer; background:rgba(255,255,255,0.03); color:${T.text}; font-family:'Sora',sans-serif; }
        .qbtn:hover { background:rgba(124,58,237,0.12); border-color:rgba(124,58,237,0.35); color:#a78bfa; transform:translateX(3px); }
        .qbtn-sub { font-size:11px; font-weight:400; color:${T.muted}; margin-top:3px; }
        @keyframes pulse-ring { 0%{box-shadow:0 0 0 0 rgba(16,185,129,0.45);} 70%{box-shadow:0 0 0 8px rgba(16,185,129,0);} 100%{box-shadow:0 0 0 0 rgba(16,185,129,0);} }
        .live-dot { width:8px; height:8px; border-radius:50%; background:#10b981; animation:pulse-ring 1.6s infinite; flex-shrink:0; }
      `}</style>

      <div style={{ display:"flex", minHeight:"100vh", background:T.bg, fontFamily:"'Sora',sans-serif" }}>
        <Sidebar active="dashboard" navigate={navigate} onLogout={handleLogout} />

        <main style={{ flex:1, padding:"32px 28px", overflowY:"auto", minWidth:0 }}>
          {/* Header */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:30 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <div className="live-dot" />
                <span style={{ fontSize:11, color:"#10b981", fontFamily:"'JetBrains Mono',monospace", letterSpacing:"1px" }}>LIVE</span>
              </div>
              <h1 style={{ fontSize:28, fontWeight:800, color:"#f1f5f9", letterSpacing:"-0.8px", lineHeight:1.1 }}>Admin Dashboard</h1>
              <p style={{ fontSize:13, color:T.muted, marginTop:5 }}>{new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={fetchDashboardStats} style={{ background:"rgba(124,58,237,0.12)", border:"1px solid rgba(124,58,237,0.3)", color:"#a78bfa", padding:"9px 18px", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(124,58,237,0.22)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(124,58,237,0.12)"}
              >↻ Refresh</button>
              <button onClick={handleLogout} style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.22)", color:"#fca5a5", padding:"9px 18px", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif" }}>Sign Out</button>
            </div>
          </div>

          {/* Stat cards */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:16, marginBottom:22 }}>
            <StatCard label="Total Assets"      value={stats.totalAssets}     sub="All assets in system"  gradient="linear-gradient(135deg,#4f46e5,#6366f1)" icon="◆" loading={loading} />
            <StatCard label="Total Users"       value={stats.totalUsers}      sub="Employees & admins"    gradient="linear-gradient(135deg,#059669,#10b981)" icon="◎" loading={loading} />
            <StatCard label="Pending Requests"  value={stats.pendingRequests} sub="Awaiting review"       gradient="linear-gradient(135deg,#d97706,#f59e0b)" icon="◷" loading={loading} />
            <StatCard label="Open Issues"       value={stats.openIssues}      sub="Reported & active"     gradient="linear-gradient(135deg,#dc2626,#ef4444)" icon="△" loading={loading} />
          </div>

          {/* Charts */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:18 }}>
            <div className="glass" style={{ borderRadius:18, padding:22 }}>
              <h2 style={{ fontSize:15, fontWeight:700, color:T.text, marginBottom:2 }}>Asset Status</h2>
              <p style={{ fontSize:12, color:T.muted, marginBottom:16 }}>Breakdown by current status</p>
              <div style={{ height:220 }}>
                {hasAssetData ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={safeAssetChart} barSize={32}>
                      <XAxis dataKey="name" tick={{ fill:T.muted, fontSize:11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill:T.muted, fontSize:11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill:"rgba(124,58,237,0.05)" }} />
                      <Bar dataKey="value" radius={[7,7,0,0]}>
                        {safeAssetChart.map((_,i) => <Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:"#334155", fontSize:13 }}>No asset data yet</div>}
              </div>
            </div>

            <div className="glass" style={{ borderRadius:18, padding:22 }}>
              <h2 style={{ fontSize:15, fontWeight:700, color:T.text, marginBottom:2 }}>Request Status</h2>
              <p style={{ fontSize:12, color:T.muted, marginBottom:16 }}>Workflow distribution</p>
              <div style={{ height:220 }}>
                {hasRequestData ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={safeRequestChart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                        {safeRequestChart.map((_,i) => <Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]} />)}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize:12, color:T.muted }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <div style={{ height:"100%", display:"flex", alignItems:"center", justifyContent:"center", color:"#334155", fontSize:13 }}>No request data yet</div>}
              </div>
            </div>
          </div>

          {/* Quick Actions + System Info */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 270px", gap:16 }}>
            <div className="glass" style={{ borderRadius:18, padding:22 }}>
              <h2 style={{ fontSize:15, fontWeight:700, color:T.text, marginBottom:2 }}>Quick Actions</h2>
              <p style={{ fontSize:12, color:T.muted, marginBottom:14 }}>Jump to any module instantly</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
                {[
                  { label:"Manage Products",  sub:"Add, edit & delete products",              path:"/admin/products",        icon:"◆", color:"#6366f1" },
                  { label:"Manage Users",     sub:"View all registered users",                path:"/admin/users",           icon:"◎", color:"#10b981" },
                  { label:"Manage Requests",  sub:"Approve or reject requests",               path:"/admin/requests",        icon:"◷", color:"#f59e0b" },
                  { label:"Manage Issues",    sub:"Review reported issues",                   path:"/admin/issues",          icon:"△", color:"#ef4444" },
                ].map(btn => (
                  <button key={btn.path} onClick={()=>navigate(btn.path)} className="qbtn">
                    <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
                      <span style={{ color:btn.color, fontSize:13 }}>{btn.icon}</span>
                      <span>{btn.label}</span>
                    </div>
                    <div className="qbtn-sub">{btn.sub}</div>
                  </button>
                ))}
                <button onClick={()=>navigate("/admin/assigned-assets")} className="qbtn" style={{ gridColumn:"1 / -1" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3 }}>
                    <span style={{ color:"#8b5cf6", fontSize:13 }}>⊞</span>
                    <span>Assigned Assets</span>
                  </div>
                  <div className="qbtn-sub">Track which asset is assigned to which employee</div>
                </button>
              </div>
            </div>

            <div className="glass" style={{ borderRadius:18, padding:22 }}>
              <h2 style={{ fontSize:15, fontWeight:700, color:T.text, marginBottom:14 }}>System Info</h2>
              {[
                { label:"Role",        value:"ADMINISTRATOR", color:"#a78bfa" },
                { label:"Access Level",value:"Full Control",  color:"#6ee7b7" },
                { label:"Project",     value:"AssetFlow v1.0",color:"#fcd34d" },
                { label:"Key Feature", value:"Asset Tracking",color:"#f9a8d4" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ padding:"10px 12px", borderRadius:10, background:"rgba(255,255,255,0.02)", border:`1px solid ${T.border}`, marginBottom:8 }}>
                  <div style={{ fontSize:10, color:T.muted, textTransform:"uppercase", letterSpacing:"0.5px", fontFamily:"'JetBrains Mono',monospace" }}>{label}</div>
                  <div style={{ fontSize:13, fontWeight:700, color, marginTop:3 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;