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
        {NAV_ITEMS.map(item=>{const a=active===item.id;return <div key={item.id} onClick={()=>navigate(item.path)} title={!open?item.label:undefined} style={{ display:"flex", alignItems:"center", gap:open?10:0, justifyContent:open?"flex-start":"center", padding:open?"10px 12px":"11px 0", borderRadius:10, marginBottom:2, cursor:"pointer", transition:"background 0.15s, color 0.15s", background:a?T.accentSoft:"transparent", color:a?"#6ee7b7":T.muted, fontWeight:a?600:400, fontSize:13, fontFamily:"'Sora',sans-serif", borderLeft:a?`3px solid ${T.accent}`:"3px solid transparent", whiteSpace:"nowrap", overflow:"hidden" }} onMouseEnter={e=>{if(!a){e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.color=T.text;}}} onMouseLeave={e=>{if(!a){e.currentTarget.style.background="transparent";e.currentTarget.style.color=T.muted;}}}><span style={{ fontSize:15, width:22, textAlign:"center", flexShrink:0 }}>{item.icon}</span>{open&&<span>{item.label}</span>}</div>;})}
      </nav>
    </aside>
  );
}

function StatusBadge({ status }) {
  const cfg = {
    ASSIGNED:  { bg:"rgba(99,102,241,0.12)",  border:"rgba(99,102,241,0.28)",  color:"#818cf8" },
    AVAILABLE: { bg:"rgba(16,185,129,0.12)",  border:"rgba(16,185,129,0.25)",  color:"#34d399" },
    IN_REPAIR: { bg:"rgba(245,158,11,0.12)",  border:"rgba(245,158,11,0.25)",  color:"#fcd34d" },
    LOST:      { bg:"rgba(239,68,68,0.1)",    border:"rgba(239,68,68,0.25)",   color:"#fca5a5" },
    RETIRED:   { bg:"rgba(100,116,139,0.1)",  border:"rgba(100,116,139,0.2)",  color:"#94a3b8" },
  }[status] || { bg:"rgba(100,116,139,0.1)", border:"rgba(100,116,139,0.2)", color:"#94a3b8" };
  return <span style={{ padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:700, letterSpacing:"0.4px", textTransform:"uppercase", background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, whiteSpace:"nowrap" }}>{status||"—"}</span>;
}

const COLS = ["ID","Name","Category","Brand","Serial No.","Location","Condition","Status","Purchase Date","Warranty Expiry"];

export default function MyAssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchMyAssets = async () => {
    try { setLoading(true); const res = await API.get("/assets/my"); setAssets(res.data); }
    catch (err) { console.error(err); alert("Failed to load your assets"); } finally { setLoading(false); }
  };
  useEffect(()=>{ fetchMyAssets(); },[]);

  const filtered = assets.filter(a => !search || a.name?.toLowerCase().includes(search.toLowerCase()) || a.category?.toLowerCase().includes(search.toLowerCase()) || a.brand?.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Sora',sans-serif;background:${T.bg};}::-webkit-scrollbar{width:5px;height:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.3);border-radius:10px;}.trow{transition:background 0.12s;}.trow:hover{background:rgba(255,255,255,0.022)!important;}`}</style>
      <div style={{ display:"flex", minHeight:"100vh", background:T.bg, fontFamily:"'Sora',sans-serif" }}>
        <Sidebar active="assets" navigate={navigate} />
        <main style={{ flex:1, padding:"36px 28px", overflowY:"auto", minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:28 }}>
            <div>
              <p style={{ fontSize:11, color:"#10b981", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:6 }}>Employee · Assets</p>
              <h1 style={{ fontSize:28, fontWeight:800, color:T.text, letterSpacing:"-0.5px" }}>My Assets</h1>
              <p style={{ fontSize:13, color:T.muted, marginTop:5 }}>All assets currently assigned to you</p>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={fetchMyAssets} style={{ padding:"9px 16px", borderRadius:10, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.muted}>↻ Refresh</button>
              <button onClick={()=>navigate("/employee/dashboard")} style={{ padding:"9px 18px", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted }} onMouseEnter={e=>e.currentTarget.style.color=T.text} onMouseLeave={e=>e.currentTarget.style.color=T.muted}>← Back</button>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:14, marginBottom:22 }}>
            {[{label:"Total Assets",val:assets.length,color:"#6ee7b7",bg:"rgba(16,185,129,0.08)"},{label:"Assigned",val:assets.filter(a=>a.status==="ASSIGNED").length,color:"#818cf8",bg:"rgba(99,102,241,0.08)"},{label:"In Repair",val:assets.filter(a=>a.status==="IN_REPAIR").length,color:"#fcd34d",bg:"rgba(245,158,11,0.08)"}].map(s=>(
              <div key={s.label} style={{ padding:"12px 20px", borderRadius:13, background:s.bg, border:`1px solid ${T.border}`, display:"flex", flexDirection:"column", gap:3 }}>
                <span style={{ fontSize:10, color:T.muted, textTransform:"uppercase", letterSpacing:"1px" }}>{s.label}</span>
                <span style={{ fontSize:24, fontWeight:800, color:s.color, fontFamily:"'Sora',sans-serif" }}>{loading?"–":s.val}</span>
              </div>
            ))}
          </div>

          {/* Table card */}
          <div style={{ background:T.surface, borderRadius:18, border:`1px solid ${T.border}`, overflow:"hidden" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:`1px solid ${T.border}` }}>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", color:T.muted, fontSize:13, pointerEvents:"none" }}>🔍</span>
                <input placeholder="Search name, category, brand…" value={search} onChange={e=>setSearch(e.target.value)} style={{ paddingLeft:34, paddingRight:14, paddingTop:8, paddingBottom:8, borderRadius:10, background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.text, fontSize:13, width:260, fontFamily:"'Sora',sans-serif", outline:"none" }} />
              </div>
              <span style={{ fontSize:12, color:T.muted }}>{filtered.length} of {assets.length} assets</span>
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:T.surfaceAlt }}>
                    {COLS.map(c=><th key={c} style={{ padding:"11px 16px", textAlign:"left", fontSize:10, fontWeight:700, color:T.muted, textTransform:"uppercase", letterSpacing:"1px", whiteSpace:"nowrap", borderBottom:`1px solid ${T.border}` }}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {loading ? Array.from({length:4}).map((_,i)=><tr key={i}>{COLS.map(c=><td key={c} style={{ padding:"13px 16px" }}><div style={{ height:13, borderRadius:6, background:"rgba(255,255,255,0.04)", width:"80px" }} /></td>)}</tr>) :
                   filtered.length===0 ? <tr><td colSpan="10" style={{ padding:"48px 16px", textAlign:"center", color:T.muted, fontSize:14 }}>No assets assigned to you</td></tr> :
                   filtered.map((asset,idx)=>(
                    <tr key={asset.id} className="trow" style={{ borderBottom:`1px solid ${T.border}`, background:idx%2===0?"transparent":T.surfaceAlt+"55" }}>
                      <td style={{ padding:"13px 16px", fontSize:12, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>#{asset.id}</td>
                      <td style={{ padding:"13px 16px", fontSize:13, fontWeight:600, color:T.text, whiteSpace:"nowrap" }}>{asset.name}</td>
                      <td style={{ padding:"13px 16px" }}><span style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:"rgba(16,185,129,0.1)", color:"#6ee7b7", border:"1px solid rgba(16,185,129,0.2)", fontWeight:600 }}>{asset.category||"—"}</span></td>
                      <td style={{ padding:"13px 16px", fontSize:12, color:T.muted }}>{asset.brand||"—"}</td>
                      <td style={{ padding:"13px 16px", fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>{asset.serialNumber||"—"}</td>
                      <td style={{ padding:"13px 16px", fontSize:12, color:T.muted }}>{asset.location||"—"}</td>
                      <td style={{ padding:"13px 16px", fontSize:12, color:T.muted }}>{asset.assetCondition||"—"}</td>
                      <td style={{ padding:"13px 16px" }}><StatusBadge status={asset.status} /></td>
                      <td style={{ padding:"13px 16px", fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>{asset.purchaseDate||"—"}</td>
                      <td style={{ padding:"13px 16px", fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>{asset.warrantyExpiry||"—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ padding:"13px 20px", borderTop:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between" }}>
              <span style={{ fontSize:12, color:T.muted }}>Showing {filtered.length} assets</span>
              <span style={{ fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>AssetFlow · Employee</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}