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

function SelectField({ label, name, value, onChange, children, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display:"block", fontSize:11, fontWeight:600, color:T.muted, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:7, fontFamily:"'Sora',sans-serif" }}>{label}{required&&<span style={{ color:"#ef4444", marginLeft:3 }}>*</span>}</label>
      <select name={name} value={value} onChange={onChange} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} required={required} style={{ width:"100%", padding:"11px 16px", borderRadius:11, background:T.surfaceAlt, border:`1px solid ${focused?"#ef4444":T.border}`, color:value?T.text:T.muted, fontSize:13, fontFamily:"'Sora',sans-serif", outline:"none", cursor:"pointer", transition:"border-color 0.15s", boxShadow:focused?"0 0 0 3px rgba(239,68,68,0.07)":"none", appearance:"none", backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat:"no-repeat", backgroundPosition:"right 14px center", paddingRight:38 }}>{children}</select>
    </div>
  );
}

export default function ReportIssuePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ productId:"", title:"", description:"" });
  const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [submitting, setSubmitting] = useState(false);

  const fetchProducts = async () => {
    try { const res = await API.get("/products"); setProducts(res.data); }
    catch (err) { console.error(err); setError("Failed to load products"); }
  };
  useEffect(()=>{ fetchProducts(); },[]);

  const handleChange = e => setFormData({...formData,[e.target.name]:e.target.value});
  const handleSubmit = async e => {
    e.preventDefault(); setMessage(""); setError(""); setSubmitting(true);
    try {
      await API.post("/issues", { productId:Number(formData.productId), title:formData.title, description:formData.description });
      setMessage("Issue reported successfully!"); setFormData({productId:"",title:"",description:""});
      setTimeout(()=>navigate("/employee/issues"),1200);
    } catch (err) { console.error(err); setError("Failed to report issue"); } finally { setSubmitting(false); }
  };

  const selectedProduct = products.find(p=>String(p.id)===String(formData.productId));

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Sora',sans-serif;background:${T.bg};}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.3);border-radius:10px;}select option{background:#1a2236;color:#e2e8f0;}@keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}.form-card{animation:fadeUp 0.35s ease forwards;}`}</style>
      <div style={{ display:"flex", minHeight:"100vh", background:T.bg, fontFamily:"'Sora',sans-serif" }}>
        <Sidebar active="report-issue" navigate={navigate} />
        <main style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 28px", minWidth:0 }}>
          <div className="form-card" style={{ width:"100%", maxWidth:520 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:22, fontSize:12, color:T.muted }}>
              <span style={{ cursor:"pointer", color:"#10b981" }} onClick={()=>navigate("/employee/dashboard")}>Dashboard</span>
              <span>›</span><span style={{ cursor:"pointer", color:"#10b981" }} onClick={()=>navigate("/employee/issues")}>My Issues</span>
              <span>›</span><span style={{ color:T.text }}>Report Issue</span>
            </div>
            <div style={{ background:T.surface, borderRadius:20, border:`1px solid ${T.border}`, overflow:"hidden" }}>
              {/* Header */}
              <div style={{ padding:"22px 26px 18px", borderBottom:`1px solid ${T.border}`, background:"linear-gradient(135deg,rgba(239,68,68,0.07),rgba(190,18,60,0.03))" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:12, background:"linear-gradient(135deg,#ef4444,#dc2626)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, boxShadow:"0 4px 16px rgba(239,68,68,0.25)" }}>⚑</div>
                  <div><h2 style={{ fontSize:19, fontWeight:800, color:T.text, letterSpacing:"-0.3px" }}>Report an Issue</h2><p style={{ fontSize:12, color:T.muted, marginTop:2 }}>Flag a problem with a product or asset</p></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ padding:"26px" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
                  <SelectField label="Product" name="productId" value={formData.productId} onChange={handleChange} required>
                    <option value="">Select the affected product…</option>
                    {products.map(p=><option key={p.id} value={p.id}>{p.name} — {p.type}</option>)}
                  </SelectField>

                  {/* Product preview */}
                  {selectedProduct && (
                    <div style={{ padding:"12px 16px", borderRadius:12, background:T.surfaceAlt, border:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:34, height:34, borderRadius:9, background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>⚑</div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{selectedProduct.name}</div>
                        <div style={{ fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>{selectedProduct.type}</div>
                      </div>
                    </div>
                  )}

                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:600, color:T.muted, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:7, fontFamily:"'Sora',sans-serif" }}>Issue Title <span style={{ color:"#ef4444" }}>*</span></label>
                    <input type="text" name="title" placeholder="Brief summary of the issue…" value={formData.title} onChange={handleChange} required style={{ width:"100%", padding:"11px 16px", borderRadius:11, background:T.surfaceAlt, border:`1px solid ${T.border}`, color:T.text, fontSize:13, fontFamily:"'Sora',sans-serif", outline:"none", transition:"border-color 0.15s" }} onFocus={e=>e.target.style.borderColor="#ef4444"} onBlur={e=>e.target.style.borderColor=T.border} />
                  </div>

                  <div>
                    <label style={{ display:"block", fontSize:11, fontWeight:600, color:T.muted, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:7, fontFamily:"'Sora',sans-serif" }}>Description <span style={{ color:"#ef4444" }}>*</span></label>
                    <textarea name="description" placeholder="Describe the problem in detail…" value={formData.description} onChange={handleChange} required rows={5} style={{ width:"100%", padding:"11px 16px", borderRadius:11, background:T.surfaceAlt, border:`1px solid ${T.border}`, color:T.text, fontSize:13, fontFamily:"'Sora',sans-serif", outline:"none", resize:"vertical", transition:"border-color 0.15s" }} onFocus={e=>e.target.style.borderColor="#ef4444"} onBlur={e=>e.target.style.borderColor=T.border} />
                  </div>

                  {message && <div style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 15px", borderRadius:10, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", color:"#34d399", fontSize:13, fontWeight:600 }}>✓ {message}</div>}
                  {error   && <div style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 15px", borderRadius:10, background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", color:"#fca5a5", fontSize:13, fontWeight:600 }}>✕ {error}</div>}

                  <div style={{ display:"flex", gap:11, marginTop:4 }}>
                    <button type="button" onClick={()=>navigate("/employee/issues")} style={{ flex:1, padding:"12px", borderRadius:11, background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif" }} onMouseEnter={e=>{e.currentTarget.style.color=T.text;e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";}} onMouseLeave={e=>{e.currentTarget.style.color=T.muted;e.currentTarget.style.borderColor=T.border;}}>Cancel</button>
                    <button type="submit" disabled={submitting} style={{ flex:2, padding:"12px", borderRadius:11, background:submitting?"rgba(239,68,68,0.4)":"linear-gradient(135deg,#ef4444,#dc2626)", border:"none", color:"#fff", fontSize:13, fontWeight:700, cursor:submitting?"not-allowed":"pointer", fontFamily:"'Sora',sans-serif", boxShadow:submitting?"none":"0 4px 18px rgba(239,68,68,0.25)" }}>{submitting?"Submitting…":"Submit Report →"}</button>
                  </div>
                </div>
              </form>
            </div>
            {/* Stats strip */}
            <div style={{ display:"flex", gap:10, marginTop:14 }}>
              <div style={{ flex:1, padding:"10px 14px", borderRadius:12, background:"rgba(255,255,255,0.03)", border:`1px solid ${T.border}`, textAlign:"center" }}>
                <div style={{ fontSize:18, fontWeight:800, color:"#6ee7b7" }}>{products.length}</div>
                <div style={{ fontSize:10, color:T.muted, marginTop:2 }}>Available Products</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}