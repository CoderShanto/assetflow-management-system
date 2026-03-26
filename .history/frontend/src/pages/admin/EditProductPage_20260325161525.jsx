import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";

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

function InputField({ label, name, value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{ display:"block", fontSize:12, fontWeight:600, color:T.muted, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:8, fontFamily:"'Sora',sans-serif" }}>
        {label} {required && <span style={{ color:"#7c3aed" }}>*</span>}
      </label>
      <input name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ width:"100%", padding:"12px 16px", borderRadius:12, background:T.surfaceAlt, border:`1px solid ${focused?T.accent:T.border}`, color:T.text, fontSize:14, fontFamily:"'Sora',sans-serif", outline:"none", transition:"border-color 0.15s", boxShadow:focused?"0 0 0 3px rgba(124,58,237,0.1)":"none" }}
      />
    </div>
  );
}

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name:"", type:"", place:"", warranty:"" });
  const [submitting, setSubmitting] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setFormData({ name:res.data.name||"", type:res.data.type||"", place:res.data.place||"", warranty:res.data.warranty||"" });
    } catch (err) { console.error(err); alert("Failed to load product"); }
  };

  useEffect(() => { fetchProduct(); }, [id]);

  const handleLogout = () => { localStorage.removeItem("token"); localStorage.removeItem("role"); navigate("/"); };
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await API.put(`/products/${id}`, formData);
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) { console.error(err); alert("Failed to update product"); }
    finally { setSubmitting(false); }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Sora',sans-serif; background:${T.bg}; }
        ::-webkit-scrollbar { width:5px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:rgba(124,58,237,0.3); border-radius:10px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px);} to{opacity:1;transform:translateY(0);} }
        .form-card { animation:fadeUp 0.35s ease forwards; }
      `}</style>

      <div style={{ display:"flex", minHeight:"100vh", background:T.bg, fontFamily:"'Sora',sans-serif" }}>
        <Sidebar active="products" navigate={navigate} onLogout={handleLogout} />

        <main style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 32px", minWidth:0 }}>
          <div className="form-card" style={{ width:"100%", maxWidth:540 }}>

            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:24, fontSize:12, color:T.muted }}>
              <span style={{ cursor:"pointer", color:"#7c3aed" }} onClick={()=>navigate("/admin/products")}>Products</span>
              <span>›</span>
              <span style={{ color:T.text }}>Edit Product #{id}</span>
            </div>

            <div style={{ background:T.surface, borderRadius:20, border:`1px solid ${T.border}`, overflow:"hidden" }}>
              <div style={{ padding:"24px 28px 20px", borderBottom:`1px solid ${T.border}`, background:"linear-gradient(135deg,rgba(124,58,237,0.08) 0%,rgba(99,102,241,0.04) 100%)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:42, height:42, borderRadius:12, background:"linear-gradient(135deg,#f59e0b,#d97706)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, boxShadow:"0 4px 16px rgba(245,158,11,0.3)" }}>✎</div>
                  <div>
                    <h2 style={{ fontSize:20, fontWeight:800, color:T.text, letterSpacing:"-0.3px" }}>Edit Product</h2>
                    <p style={{ fontSize:12, color:T.muted, marginTop:2 }}>Update product details</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ padding:28 }}>
                <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                  <InputField label="Product Name"    name="name"     value={formData.name}     onChange={handleChange} placeholder="e.g. MacBook Pro 14"         required />
                  <InputField label="Type / Category" name="type"     value={formData.type}     onChange={handleChange} placeholder="e.g. Laptop, Monitor, Phone" required />
                  <InputField label="Location / Place"name="place"    value={formData.place}    onChange={handleChange} placeholder="e.g. Head Office, IT Room"   required />
                  <InputField label="Warranty"        name="warranty" value={formData.warranty} onChange={handleChange} placeholder="e.g. 2 Years"                 required />

                  <div style={{ display:"flex", gap:12, marginTop:4 }}>
                    <button type="button" onClick={()=>navigate("/admin/products")}
                      style={{ flex:1, padding:"13px", borderRadius:12, background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.15s" }}
                      onMouseEnter={e=>{e.currentTarget.style.color=T.text;e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";}}
                      onMouseLeave={e=>{e.currentTarget.style.color=T.muted;e.currentTarget.style.borderColor=T.border;}}
                    >Cancel</button>
                    <button type="submit" disabled={submitting}
                      style={{ flex:2, padding:"13px", borderRadius:12, background:submitting?"rgba(245,158,11,0.4)":"linear-gradient(135deg,#f59e0b,#d97706)", border:"none", color:"#fff", fontSize:14, fontWeight:700, cursor:submitting?"not-allowed":"pointer", fontFamily:"'Sora',sans-serif", boxShadow:submitting?"none":"0 4px 20px rgba(245,158,11,0.3)", transition:"all 0.2s" }}
                    >{submitting ? "Updating…" : "Update Product →"}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default EditProductPage;