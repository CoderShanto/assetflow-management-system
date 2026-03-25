// ─── MyIssuesPage.jsx ─────────────────────────────────────────────────────────
import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const T = {
  bg:"#0d1117", sidebar:"#0f1420", surface:"#141b2d", surfaceAlt:"#1a2236",
  border:"rgba(255,255,255,0.07)", accent:"#10b981", accentSoft:"rgba(16,185,129,0.12)",
  text:"#e2e8f0", muted:"#64748b",
};
const NAV_ITEMS = [
  { id:"dashboard",       label:"Dashboard",       icon:"○", path:"/employee/dashboard" },
  { id:"assets",          label:"My Assets",       icon:"◆", path:"/employee/assets" },
  { id:"request-product", label:"Request Product", icon:"✦", path:"/employee/request-product" },
  { id:"requests",        label:"My Requests",     icon:"◷", path:"/employee/requests" },
  { id:"report-issue",    label:"Report Issue",    icon:"⚑", path:"/employee/report-issue" },
  { id:"issues",          label:"My Issues",       icon:"△", path:"/employee/issues" },
];
function Sidebar({ active, navigate }) {
  const [open, setOpen] = useState(true);
  return (
    <aside style={{ width:open?220:68, minHeight:"100vh", background:T.sidebar, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", padding:"22px 10px", transition:"width 0.25s cubic-bezier(.4,0,.2,1)", flexShrink:0, position:"sticky", top:0, height:"100vh", overflowY:"auto", overflowX:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 6px", marginBottom:28, minWidth:0 }}>
        <div style={{ width:34, height:34, borderRadius:9, flexShrink:0, background:"linear-gradient(135deg,#10b981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, boxShadow:"0 4px 14px rgba(16,185,129,0.35)" }}>⬡</div>
        {open && <div style={{ overflow:"hidden", whiteSpace:"nowrap", minWidth:0 }}><div style={{ fontWeight:800, fontSize:14, color:T.text, fontFamily:"'Sora',sans-serif" }}>AssetFlow</div><div style={{ fontSize:9, color:T.muted, letterSpacing:"1px", textTransform:"uppercase" }}>Employee</div></div>}
        <button onClick={()=>setOpen(o=>!o)} style={{ marginLeft:"auto", flexShrink:0, width:26, height:26, borderRadius:7, background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted, cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center" }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.muted}>{open?"‹":"›"}</button>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px", borderRadius:12, background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, marginBottom:22, minWidth:0, overflow:"hidden" }}>
        <div style={{ width:30, height:30, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg,#10b981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff" }}>E</div>
        {open && <><div style={{ overflow:"hidden", whiteSpace:"nowrap", minWidth:0 }}><div style={{ fontSize:12, fontWeight:700, color:T.text }}>Employee</div><div style={{ fontSize:10, color:T.muted }}>Personal access</div></div><div style={{ marginLeft:"auto", width:7, height:7, borderRadius:"50%", background:"#10b981" }} /></>}
      </div>
      {open && <div style={{ fontSize:9, color:T.muted, letterSpacing:"1.5px", textTransform:"uppercase", padding:"0 8px", marginBottom:6 }}>Navigation</div>}
      <nav style={{ flex:1 }}>
        {NAV_ITEMS.map(item=>{const a=active===item.id;return <div key={item.id} onClick={()=>navigate(item.path)} title={!open?item.label:undefined} style={{ display:"flex", alignItems:"center", gap:open?10:0, justifyContent:open?"flex-start":"center", padding:open?"10px 12px":"11px 0", borderRadius:10, marginBottom:2, cursor:"pointer", transition:"background 0.15s,color 0.15s", background:a?T.accentSoft:"transparent", color:a?"#6ee7b7":T.muted, fontWeight:a?600:400, fontSize:13, fontFamily:"'Sora',sans-serif", borderLeft:a?`3px solid ${T.accent}`:"3px solid transparent", whiteSpace:"nowrap", overflow:"hidden" }} onMouseEnter={e=>{if(!a){e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.color=T.text;}}} onMouseLeave={e=>{if(!a){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.muted;}}}><span style={{ fontSize:15, width:22, textAlign:"center", flexShrink:0 }}>{item.icon}</span>{open&&<span>{item.label}</span>}</div>;})}
      </nav>
    </aside>
  );
}

function StatusBadge({ status }) {
  const cfg = {
    RESOLVED:    { bg:"rgba(16,185,129,0.12)", border:"rgba(16,185,129,0.25)", color:"#34d399" },
    IN_PROGRESS: { bg:"rgba(99,102,241,0.12)", border:"rgba(99,102,241,0.28)", color:"#818cf8" },
    OPEN:        { bg:"rgba(239,68,68,0.1)",   border:"rgba(239,68,68,0.25)",  color:"#fca5a5" },
  }[status] || { bg:"rgba(100,116,139,0.1)", border:"rgba(100,116,139,0.2)", color:"#94a3b8" };
  return <span style={{ padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:"0.4px", textTransform:"uppercase", background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}` }}>{status}</span>;
}

const COLS = ["ID","Product","Title","Description","Status","Reported On"];

export default function MyIssuesPage() {
  const [issues, setIssues] = useState([]); const [loading, setLoading] = useState(true); const [filter, setFilter] = useState("ALL");
  const navigate = useNavigate();
  const fetchMyIssues = async () => {
    try { setLoading(true); const res = await API.get("/issues/my"); setIssues(res.data); }
    catch (err) { console.error(err); alert("Failed to load your issues"); } finally { setLoading(false); }
  };
  useEffect(()=>{ fetchMyIssues(); },[]);
  const counts = { ALL:issues.length, OPEN:issues.filter(i=>i.status==="OPEN").length, IN_PROGRESS:issues.filter(i=>i.status==="IN_PROGRESS").length, RESOLVED:issues.filter(i=>i.status==="RESOLVED").length };
  const filtered = issues.filter(i => filter==="ALL" || i.status===filter);
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Sora',sans-serif;background:${T.bg};}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.3);border-radius:10px;}.trow{transition:background 0.12s;}.trow:hover{background:rgba(255,255,255,0.022)!important;}`}</style>
      <div style={{ display:"flex", minHeight:"100vh", background:T.bg, fontFamily:"'Sora',sans-serif" }}>
        <Sidebar active="issues" navigate={navigate} />
        <main style={{ flex:1, padding:"36px 28px", overflowY:"auto", minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:28 }}>
            <div>
              <p style={{ fontSize:11, color:"#10b981", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:6 }}>Employee · Issues</p>
              <h1 style={{ fontSize:28, fontWeight:800, color:T.text, letterSpacing:"-0.5px" }}>My Issues</h1>
              <p style={{ fontSize:13, color:T.muted, marginTop:5 }}>Track all your reported issues</p>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={fetchMyIssues} style={{ padding:"9px 16px", borderRadius:10, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.muted}>↻ Refresh</button>
              <button onClick={()=>navigate("/employee/report-issue")} style={{ padding:"9px 18px", borderRadius:10, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Sora',sans-serif", background:"linear-gradient(135deg,#10b981,#059669)", border:"none", color:"#fff", boxShadow:"0 4px 14px rgba(16,185,129,0.3)" }}>+ New Issue</button>
              <button onClick={()=>navigate("/employee/dashboard")} style={{ padding:"9px 18px", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.muted}>← Back</button>
            </div>
          </div>
          <div style={{ display:"flex", gap:14, marginBottom:22, flexWrap:"wrap" }}>
            {[{label:"Total",val:counts.ALL,color:"#6ee7b7",bg:"rgba(16,185,129,0.08)"},{label:"Open",val:counts.OPEN,color:"#fca5a5",bg:"rgba(239,68,68,0.08)"},{label:"In Progress",val:counts.IN_PROGRESS,color:"#818cf8",bg:"rgba(99,102,241,0.08)"},{label:"Resolved",val:counts.RESOLVED,color:"#34d399",bg:"rgba(16,185,129,0.08)"}].map(s=>(
              <div key={s.label} style={{ padding:"12px 20px", borderRadius:13, background:s.bg, border:`1px solid ${T.border}`, display:"flex", flexDirection:"column", gap:3, minWidth:110 }}>
                <span style={{ fontSize:10, color:T.muted, textTransform:"uppercase", letterSpacing:"1px" }}>{s.label}</span>
                <span style={{ fontSize:24, fontWeight:800, color:s.color, fontFamily:"'Sora',sans-serif" }}>{loading?"–":s.val}</span>
              </div>
            ))}
          </div>
          <div style={{ background:T.surface, borderRadius:18, border:`1px solid ${T.border}`, overflow:"hidden" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", borderBottom:`1px solid ${T.border}`, flexWrap:"wrap", gap:10 }}>
              <div style={{ display:"flex", gap:6, background:"rgba(255,255,255,0.03)", padding:4, borderRadius:10, border:`1px solid ${T.border}` }}>
                {["ALL","OPEN","IN_PROGRESS","RESOLVED"].map(f=>(
                  <button key={f} onClick={()=>setFilter(f)} style={{ padding:"6px 13px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.15s", background:filter===f?T.accentSoft:"transparent", color:filter===f?"#6ee7b7":T.muted, border:filter===f?`1px solid rgba(16,185,129,0.3)`:"1px solid transparent" }}>
                    {f.replace("_"," ")} <span style={{ fontSize:10, opacity:0.7 }}>{counts[f]??""}</span>
                  </button>
                ))}
              </div>
              <span style={{ fontSize:12, color:T.muted }}>{filtered.length} issues</span>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr style={{ background:T.surfaceAlt }}>{COLS.map(c=><th key={c} style={{ padding:"11px 16px", textAlign:"left", fontSize:10, fontWeight:700, color:T.muted, textTransform:"uppercase", letterSpacing:"1px", whiteSpace:"nowrap", borderBottom:`1px solid ${T.border}` }}>{c}</th>)}</tr></thead>
                <tbody>
                  {loading ? Array.from({length:4}).map((_,i)=><tr key={i}>{COLS.map(c=><td key={c} style={{ padding:"13px 16px" }}><div style={{ height:13, borderRadius:6, background:"rgba(255,255,255,0.04)", width:"80px" }} /></td>)}</tr>) :
                   filtered.length===0 ? <tr><td colSpan="6" style={{ padding:"48px 16px", textAlign:"center", color:T.muted, fontSize:14 }}>No issues found</td></tr> :
                   filtered.map((issue,idx)=>(
                    <tr key={issue.id} className="trow" style={{ borderBottom:`1px solid ${T.border}`, background:idx%2===0?"transparent":T.surfaceAlt+"55" }}>
                      <td style={{ padding:"13px 16px", fontSize:12, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>#{issue.id}</td>
                      <td style={{ padding:"13px 16px" }}><span style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:"rgba(16,185,129,0.1)", color:"#6ee7b7", border:"1px solid rgba(16,185,129,0.2)", fontWeight:600 }}>{issue.productName||"—"}</span></td>
                      <td style={{ padding:"13px 16px", fontSize:13, fontWeight:600, color:T.text, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{issue.title}</td>
                      <td style={{ padding:"13px 16px", fontSize:12, color:T.muted, maxWidth:220, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{issue.description}</td>
                      <td style={{ padding:"13px 16px" }}><StatusBadge status={issue.status} /></td>
                      <td style={{ padding:"13px 16px", fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>{issue.createdAt?String(issue.createdAt).replace("T"," ").substring(0,16):"—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding:"13px 20px", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:12, color:T.muted }}>Showing {filtered.length} of {issues.length}</span>
              <span style={{ fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>AssetFlow · Employee</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}