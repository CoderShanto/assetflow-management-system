import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

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
function Sidebar({ active, navigate, onLogout }) {
  const [open, setOpen] = useState(true);
  return (
    <aside style={{ width:open?220:68, minHeight:"100vh", background:T.sidebar, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", padding:"22px 10px", transition:"width 0.25s cubic-bezier(.4,0,.2,1)", flexShrink:0, position:"sticky", top:0, height:"100vh", overflowY:"auto", overflowX:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 6px", marginBottom:28, minWidth:0 }}>
        <div style={{ width:34, height:34, borderRadius:9, flexShrink:0, background:"linear-gradient(135deg,#7c3aed,#6366f1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, boxShadow:"0 4px 14px rgba(124,58,237,0.4)" }}>⬡</div>
        {open && <div style={{ overflow:"hidden", whiteSpace:"nowrap", minWidth:0 }}>
          <div style={{ fontWeight:800, fontSize:14, color:T.text, fontFamily:"'Sora',sans-serif" }}>AssetFlow</div>
          <div style={{ fontSize:9, color:T.muted, letterSpacing:"1px", textTransform:"uppercase" }}>Admin</div>
        </div>}
        <button onClick={()=>setOpen(o=>!o)} title={open?"Collapse":"Expand"} style={{ marginLeft:"auto", flexShrink:0, width:26, height:26, borderRadius:7, background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted, cursor:"pointer", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" }}
          onMouseEnter={e=>{e.currentTarget.style.color=T.text;e.currentTarget.style.borderColor="rgba(255,255,255,0.18)";}}
          onMouseLeave={e=>{e.currentTarget.style.color=T.muted;e.currentTarget.style.borderColor=T.border;}}>{open?"‹":"›"}</button>
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
            ><span style={{ fontSize:15, width:22, textAlign:"center", flexShrink:0 }}>{item.icon}</span>{open&&<span>{item.label}</span>}</div>
          );
        })}
      </nav>
    </aside>
  );
}

const STATUS_CFG = {
  APPROVED:{ bg:"rgba(16,185,129,0.12)",  border:"rgba(16,185,129,0.25)",  color:"#34d399",  dot:"#10b981" },
  REJECTED:{ bg:"rgba(239,68,68,0.1)",    border:"rgba(239,68,68,0.25)",   color:"#fca5a5",  dot:"#ef4444" },
  PENDING: { bg:"rgba(245,158,11,0.1)",   border:"rgba(245,158,11,0.25)",  color:"#fcd34d",  dot:"#f59e0b" },
};

function RequestsPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState("ALL");

  const fetchRequests = async () => {
    try { setLoading(true); const res = await API.get("/requests"); setRequests(res.data); }
    catch (err) { console.error(err); alert("Failed to fetch requests"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleApprove = async id => {
    try { await API.put(`/requests/${id}/approve`); fetchRequests(); }
    catch (err) { console.error(err); alert("Failed to approve request"); }
  };
  const handleReject = async id => {
    try { await API.put(`/requests/${id}/reject`); fetchRequests(); }
    catch (err) { console.error(err); alert("Failed to reject request"); }
  };
  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("role"); navigate("/"); };

  const counts = {
    ALL:      requests.length,
    PENDING:  requests.filter(r=>r.status==="PENDING").length,
    APPROVED: requests.filter(r=>r.status==="APPROVED").length,
    REJECTED: requests.filter(r=>r.status==="REJECTED").length,
  };
  const filtered = filter==="ALL" ? requests : requests.filter(r=>r.status===filter);

  const FILTERS = [
    { id:"ALL",      label:"All",      color:"#a78bfa" },
    { id:"PENDING",  label:"Pending",  color:"#fcd34d" },
    { id:"APPROVED", label:"Approved", color:"#34d399" },
    { id:"REJECTED", label:"Rejected", color:"#fca5a5" },
  ];
  const COLS = ["ID","Employee","Email","Asset Type","Reason","Status","Actions"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'Sora',sans-serif;background:${T.bg};}
        ::-webkit-scrollbar{width:5px;height:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(124,58,237,0.3);border-radius:10px;}
        .trow{transition:background 0.12s;}.trow:hover{background:rgba(255,255,255,0.025)!important;}
      `}</style>

      <div style={{ display:"flex", minHeight:"100vh", background:T.bg, fontFamily:"'Sora',sans-serif" }}>
        <Sidebar active="requests" navigate={navigate} onLogout={handleLogout} />

        <main style={{ flex:1, padding:"36px 32px", overflowY:"auto", minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:28 }}>
            <div>
              <p style={{ fontSize:11, color:"#7c3aed", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:6 }}>Admin · Requests</p>
              <h1 style={{ fontSize:28, fontWeight:800, color:T.text, letterSpacing:"-0.5px" }}>Manage Requests</h1>
              <p style={{ fontSize:13, color:T.muted, marginTop:5 }}>Approve or reject employee asset requests</p>
            </div>
            <button onClick={fetchRequests} style={{ padding:"10px 16px", borderRadius:10, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted, transition:"all 0.15s" }}
              onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.muted}>↻ Refresh</button>
          </div>

          {/* Stat chips */}
          <div style={{ display:"flex", gap:14, marginBottom:24 }}>
            {[
              { label:"Total",    val:counts.ALL,      color:"#818cf8", bg:"rgba(99,102,241,0.1)" },
              { label:"Pending",  val:counts.PENDING,  color:"#fcd34d", bg:"rgba(245,158,11,0.08)" },
              { label:"Approved", val:counts.APPROVED, color:"#34d399", bg:"rgba(16,185,129,0.08)" },
              { label:"Rejected", val:counts.REJECTED, color:"#fca5a5", bg:"rgba(239,68,68,0.08)" },
            ].map(s => (
              <div key={s.label} style={{ padding:"14px 22px", borderRadius:14, background:s.bg, border:`1px solid ${T.border}`, display:"flex", flexDirection:"column", gap:4 }}>
                <span style={{ fontSize:10, color:T.muted, textTransform:"uppercase", letterSpacing:"1px" }}>{s.label}</span>
                <span style={{ fontSize:26, fontWeight:800, color:s.color }}>{loading?"–":s.val}</span>
              </div>
            ))}
          </div>

          <div style={{ background:T.surface, borderRadius:18, border:`1px solid ${T.border}`, overflow:"hidden" }}>
            {/* Toolbar */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", padding:"16px 22px", borderBottom:`1px solid ${T.border}` }}>
              <div style={{ display:"flex", gap:6, background:"rgba(255,255,255,0.03)", padding:4, borderRadius:10, border:`1px solid ${T.border}` }}>
                {FILTERS.map(f => (
                  <button key={f.id} onClick={()=>setFilter(f.id)}
                    style={{ padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.15s", background:filter===f.id?T.accentSoft:"transparent", color:filter===f.id?f.color:T.muted, border:filter===f.id?`1px solid rgba(124,58,237,0.3)`:"1px solid transparent" }}
                  >{f.label} <span style={{ opacity:0.7 }}>{counts[f.id]}</span></button>
                ))}
              </div>
            </div>

            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:T.surfaceAlt }}>
                    {COLS.map(c => <th key={c} style={{ padding:"12px 16px", textAlign:"left", fontSize:10, fontWeight:700, color:T.muted, textTransform:"uppercase", letterSpacing:"1px", whiteSpace:"nowrap", borderBottom:`1px solid ${T.border}` }}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({length:5}).map((_,i) => (
                      <tr key={i}>{COLS.map(c => <td key={c} style={{ padding:"14px 16px" }}><div style={{ height:13, borderRadius:6, background:"rgba(255,255,255,0.04)", width:"80px" }} /></td>)}</tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan="7" style={{ padding:"48px 16px", textAlign:"center", color:T.muted, fontSize:14 }}>No requests found</td></tr>
                  ) : (
                    filtered.map((req, idx) => {
                      const sc = STATUS_CFG[req.status]||STATUS_CFG.PENDING;
                      return (
                        <tr key={req.id} className="trow" style={{ borderBottom:`1px solid ${T.border}`, background:idx%2===0?"transparent":T.surfaceAlt+"55" }}>
                          <td style={{ padding:"13px 16px", fontSize:12, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>#{req.id}</td>
                          <td style={{ padding:"13px 16px", fontSize:13, fontWeight:600, color:T.text, whiteSpace:"nowrap" }}>{req.user?.name}</td>
                          <td style={{ padding:"13px 16px", fontSize:12, color:T.muted }}>{req.user?.email}</td>
                          <td style={{ padding:"13px 16px" }}>
                            <span style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:"rgba(99,102,241,0.1)", color:"#818cf8", border:"1px solid rgba(99,102,241,0.2)", fontWeight:600, whiteSpace:"nowrap" }}>{req.assetType}</span>
                          </td>
                          <td style={{ padding:"13px 16px", fontSize:12, color:T.muted, maxWidth:180, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{req.reason}</td>
                          <td style={{ padding:"13px 16px" }}>
                            <span style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:700, textTransform:"uppercase", background:sc.bg, color:sc.color, border:`1px solid ${sc.border}` }}>
                              <span style={{ width:6, height:6, borderRadius:"50%", background:sc.dot, flexShrink:0 }} />
                              {req.status}
                            </span>
                          </td>
                          <td style={{ padding:"13px 16px" }}>
                            {req.status==="PENDING" ? (
                              <div style={{ display:"flex", gap:8 }}>
                                <button onClick={()=>handleApprove(req.id)} style={{ padding:"5px 14px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", color:"#34d399", transition:"all 0.15s" }}
                                  onMouseEnter={e=>e.currentTarget.style.background="rgba(16,185,129,0.2)"}
                                  onMouseLeave={e=>e.currentTarget.style.background="rgba(16,185,129,0.1)"}>✓ Approve</button>
                                <button onClick={()=>handleReject(req.id)} style={{ padding:"5px 14px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", color:"#fca5a5", transition:"all 0.15s" }}
                                  onMouseEnter={e=>e.currentTarget.style.background="rgba(239,68,68,0.2)"}
                                  onMouseLeave={e=>e.currentTarget.style.background="rgba(239,68,68,0.1)"}>✕ Reject</button>
                              </div>
                            ) : <span style={{ fontSize:12, color:T.muted }}>Completed</span>}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ padding:"14px 22px", borderTop:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize:12, color:T.muted }}>Showing {filtered.length} of {requests.length} requests</span>
              <span style={{ fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>AssetFlow · Admin</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default RequestsPage;