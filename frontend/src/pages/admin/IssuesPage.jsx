import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const T = {
  bg:           "#0d1117",
  sidebar:      "#0f1420",
  surface:      "#141b2d",
  surfaceAlt:   "#1a2236",
  border:       "rgba(255,255,255,0.07)",
  accent:       "#7c3aed",
  accentSoft:   "rgba(124,58,237,0.15)",
  text:         "#e2e8f0",
  muted:        "#64748b",
};

const NAV_ITEMS = [
  { id: "dashboard",       label: "Dashboard",      icon: "○", path: "/admin/dashboard" },
  { id: "products",        label: "Products",       icon: "◆", path: "/admin/products" },
  { id: "users",           label: "Users",          icon: "◎", path: "/admin/users" },
  { id: "requests",        label: "Requests",       icon: "◷", path: "/admin/requests" },
  { id: "issues",          label: "Issues",         icon: "△", path: "/admin/issues" },
  { id: "assigned-assets", label: "Assigned Assets",icon: "⊞", path: "/admin/assigned-assets" },
];

/* ── Sidebar: identical to UsersPage ── */
function Sidebar({ active, navigate, onLogout }) {
  const [open, setOpen] = useState(true);
  return (
    <aside style={{
      width: open ? 220 : 68,
      minHeight: "100vh",
      background: T.sidebar,
      borderRight: `1px solid ${T.border}`,
      display: "flex",
      flexDirection: "column",
      padding: "22px 10px",
      transition: "width 0.25s cubic-bezier(.4,0,.2,1)",
      flexShrink: 0,
      position: "sticky",
      top: 0,
      height: "100vh",
      overflowY: "auto",
      overflowX: "hidden",
    }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"0 6px", marginBottom:28, minWidth:0 }}>
        <div style={{
          width:34, height:34, borderRadius:9, flexShrink:0,
          background:"linear-gradient(135deg,#7c3aed,#6366f1)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:17, boxShadow:"0 4px 14px rgba(124,58,237,0.4)",
        }}>⬡</div>
        {open && (
          <div style={{ overflow:"hidden", whiteSpace:"nowrap", minWidth:0 }}>
            <div style={{ fontWeight:800, fontSize:14, color:T.text, fontFamily:"'Sora',sans-serif" }}>AssetFlow</div>
            <div style={{ fontSize:9, color:T.muted, letterSpacing:"1px", textTransform:"uppercase" }}>Admin</div>
          </div>
        )}
        <button
          onClick={() => setOpen(o => !o)}
          title={open ? "Collapse" : "Expand"}
          style={{
            marginLeft:"auto", flexShrink:0,
            width:26, height:26, borderRadius:7,
            background:"rgba(255,255,255,0.04)",
            border:`1px solid ${T.border}`,
            color:T.muted, cursor:"pointer", fontSize:13,
            display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = T.text; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = T.border; }}
        >{open ? "‹" : "›"}</button>
      </div>

      {/* Admin card */}
      <div style={{
        display:"flex", alignItems:"center", gap:10,
        padding:"10px", borderRadius:12,
        background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`,
        marginBottom:22, minWidth:0, overflow:"hidden",
      }}>
        <div style={{
          width:30, height:30, borderRadius:"50%", flexShrink:0,
          background:"linear-gradient(135deg,#7c3aed,#6366f1)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:13, fontWeight:700, color:"#fff",
        }}>A</div>
        {open && (
          <>
            <div style={{ overflow:"hidden", whiteSpace:"nowrap", minWidth:0 }}>
              <div style={{ fontSize:12, fontWeight:700, color:T.text }}>Admin</div>
              <div style={{ fontSize:10, color:T.muted }}>Full access</div>
            </div>
            <div style={{ marginLeft:"auto", flexShrink:0, display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:"#10b981" }} />
              {onLogout && (
                <button onClick={onLogout} title="Sign out"
                  style={{ background:"none", border:"none", color:"#ef4444", cursor:"pointer", fontSize:14, lineHeight:1, padding:0 }}
                >⎋</button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Nav label */}
      {open && (
        <div style={{ fontSize:9, color:T.muted, letterSpacing:"1.5px", textTransform:"uppercase", padding:"0 8px", marginBottom:6 }}>
          Navigation
        </div>
      )}

      {/* Nav items */}
      <nav style={{ flex:1 }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              title={!open ? item.label : undefined}
              style={{
                display:"flex", alignItems:"center",
                gap: open ? 10 : 0,
                justifyContent: open ? "flex-start" : "center",
                padding: open ? "10px 12px" : "11px 0",
                borderRadius:10, marginBottom:2,
                cursor:"pointer", transition:"background 0.15s, color 0.15s",
                background: isActive ? T.accentSoft : "transparent",
                color: isActive ? "#a78bfa" : T.muted,
                fontWeight: isActive ? 600 : 400,
                fontSize:13, fontFamily:"'Sora',sans-serif",
                borderLeft: isActive ? `3px solid ${T.accent}` : "3px solid transparent",
                whiteSpace:"nowrap", overflow:"hidden",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = T.text; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = T.muted; } }}
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

/* ── Status badge ── */
function StatusBadge({ status }) {
  const cfg = {
    RESOLVED:    { bg:"rgba(16,185,129,0.12)",  border:"rgba(16,185,129,0.25)",  color:"#34d399",  label:"Resolved" },
    IN_PROGRESS: { bg:"rgba(99,102,241,0.12)",  border:"rgba(99,102,241,0.28)",  color:"#818cf8",  label:"In Progress" },
    OPEN:        { bg:"rgba(239,68,68,0.1)",    border:"rgba(239,68,68,0.25)",   color:"#fca5a5",  label:"Open" },
  }[status] || { bg:"rgba(100,116,139,0.1)", border:"rgba(100,116,139,0.2)", color:T.muted, label:status };
  return (
    <span style={{
      padding:"4px 12px", borderRadius:20, fontSize:11, fontWeight:700,
      letterSpacing:"0.4px", textTransform:"uppercase",
      background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`,
      whiteSpace:"nowrap",
    }}>{cfg.label}</span>
  );
}

/* ── Action button ── */
function ActionBtn({ label, color, hoverBg, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding:"5px 12px", borderRadius:8, fontSize:11, fontWeight:700,
        cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.15s",
        border:`1px solid ${color}44`,
        background: hov ? hoverBg : `${color}14`,
        color, letterSpacing:"0.3px",
      }}
    >{label}</button>
  );
}

const COLS = ["ID","Employee","Email","Product","Title","Description","Status","Reported","Actions"];

/* ── Main page ── */
function IssuesPage() {
  const [issues, setIssues]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("ALL");
  const navigate = useNavigate();

  const fetchIssues = async () => {
    try {
      setLoading(true);
      const res = await API.get("/issues");
      setIssues(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIssues(); }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/issues/${id}/status?status=${status}`);
      fetchIssues();
    } catch (err) {
      console.error(err);
      alert("Failed to update issue status");
    }
  };

  const filtered = issues.filter(i => {
    const matchSearch = !search ||
      i.userName?.toLowerCase().includes(search.toLowerCase()) ||
      i.title?.toLowerCase().includes(search.toLowerCase()) ||
      i.productName?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || i.status === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    ALL:         issues.length,
    OPEN:        issues.filter(i => i.status === "OPEN").length,
    IN_PROGRESS: issues.filter(i => i.status === "IN_PROGRESS").length,
    RESOLVED:    issues.filter(i => i.status === "RESOLVED").length,
  };

  const FILTERS = [
    { id:"ALL",         label:"All",         color:"#a78bfa" },
    { id:"OPEN",        label:"Open",        color:"#fca5a5" },
    { id:"IN_PROGRESS", label:"In Progress", color:"#818cf8" },
    { id:"RESOLVED",    label:"Resolved",    color:"#34d399" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Sora', sans-serif; background: ${T.bg}; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.3); border-radius: 10px; }
        .trow { transition: background 0.12s; }
        .trow:hover { background: rgba(255,255,255,0.022) !important; }
      `}</style>

      <div style={{ display:"flex", minHeight:"100vh", background:T.bg, fontFamily:"'Sora',sans-serif" }}>

        {/* ── Sidebar ── */}
        <Sidebar active="issues" navigate={navigate} onLogout={handleLogout} />

        {/* ── Main ── */}
        <main style={{ flex:1, padding:"36px 32px", overflowY:"auto", minWidth:0 }}>

          {/* Header */}
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:28 }}>
            <div>
              <p style={{ fontSize:11, color:"#7c3aed", fontFamily:"'JetBrains Mono',monospace", textTransform:"uppercase", letterSpacing:"1.5px", marginBottom:6 }}>Admin · Issue Tracker</p>
              <h1 style={{ fontSize:28, fontWeight:800, color:T.text, letterSpacing:"-0.5px" }}>Manage Issues</h1>
              <p style={{ fontSize:13, color:T.muted, marginTop:5 }}>Review and update all employee reported issues</p>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={fetchIssues}
                style={{ padding:"10px 16px", borderRadius:10, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted, transition:"all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = T.text}
                onMouseLeave={e => e.currentTarget.style.color = T.muted}
              >↻ Refresh</button>
              <button onClick={() => navigate("/admin/dashboard")}
                style={{ padding:"10px 18px", borderRadius:10, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.muted, transition:"all 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.color = T.text}
                onMouseLeave={e => e.currentTarget.style.color = T.muted}
              >← Back</button>
            </div>
          </div>

          {/* Stat pills */}
          <div style={{ display:"flex", gap:14, marginBottom:24, flexWrap:"wrap" }}>
            {[
              { label:"Total Issues",  val:counts.ALL,         color:"#a78bfa", bg:"rgba(124,58,237,0.08)" },
              { label:"Open",          val:counts.OPEN,        color:"#fca5a5", bg:"rgba(239,68,68,0.08)" },
              { label:"In Progress",   val:counts.IN_PROGRESS, color:"#818cf8", bg:"rgba(99,102,241,0.08)" },
              { label:"Resolved",      val:counts.RESOLVED,    color:"#34d399", bg:"rgba(16,185,129,0.08)" },
            ].map(s => (
              <div key={s.label} style={{ padding:"14px 22px", borderRadius:14, background:s.bg, border:`1px solid ${T.border}`, display:"flex", flexDirection:"column", gap:4, minWidth:130 }}>
                <span style={{ fontSize:10, color:T.muted, textTransform:"uppercase", letterSpacing:"1px" }}>{s.label}</span>
                <span style={{ fontSize:26, fontWeight:800, color:s.color, fontFamily:"'Sora',sans-serif" }}>{loading ? "–" : s.val}</span>
              </div>
            ))}
          </div>

          {/* Table card */}
          <div style={{ background:T.surface, borderRadius:18, border:`1px solid ${T.border}`, overflow:"hidden" }}>

            {/* Toolbar */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 22px", borderBottom:`1px solid ${T.border}`, flexWrap:"wrap", gap:12 }}>
              <div style={{ position:"relative" }}>
                <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:T.muted, fontSize:13, pointerEvents:"none" }}>🔍</span>
                <input
                  placeholder="Search by employee, title, product…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ paddingLeft:36, paddingRight:14, paddingTop:9, paddingBottom:9, borderRadius:10, background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, color:T.text, fontSize:13, width:290, fontFamily:"'Sora',sans-serif", outline:"none" }}
                />
              </div>
              <div style={{ display:"flex", gap:6, background:"rgba(255,255,255,0.03)", padding:4, borderRadius:10, border:`1px solid ${T.border}` }}>
                {FILTERS.map(f => (
                  <button key={f.id} onClick={() => setFilter(f.id)}
                    style={{ padding:"6px 14px", borderRadius:8, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'Sora',sans-serif", transition:"all 0.15s", background:filter===f.id ? T.accentSoft : "transparent", color:filter===f.id ? f.color : T.muted, border:filter===f.id ? `1px solid rgba(124,58,237,0.3)` : "1px solid transparent" }}
                  >
                    {f.label} <span style={{ marginLeft:4, fontSize:10, opacity:0.7 }}>{counts[f.id]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:T.surfaceAlt }}>
                    {COLS.map(c => (
                      <th key={c} style={{ padding:"12px 16px", textAlign:"left", fontSize:10, fontWeight:700, color:T.muted, textTransform:"uppercase", letterSpacing:"1px", whiteSpace:"nowrap", borderBottom:`1px solid ${T.border}` }}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length:5 }).map((_,i) => (
                      <tr key={i}>
                        {COLS.map(c => (
                          <td key={c} style={{ padding:"14px 16px" }}>
                            <div style={{ height:13, borderRadius:6, background:"rgba(255,255,255,0.04)", width: c==="Actions"?"120px":c==="Description"?"160px":"80px" }} />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ padding:"52px 16px", textAlign:"center", color:T.muted, fontSize:14 }}>No issues found</td>
                    </tr>
                  ) : (
                    filtered.map((issue, idx) => (
                      <tr key={issue.id} className="trow" style={{ borderBottom:`1px solid ${T.border}`, background: idx%2===0 ? "transparent" : T.surfaceAlt+"55" }}>
                        <td style={{ padding:"13px 16px", fontSize:12, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>#{issue.id}</td>

                        <td style={{ padding:"13px 16px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                            <div style={{
                              width:28, height:28, borderRadius:"50%", flexShrink:0,
                              background:`hsl(${(issue.userName?.charCodeAt(0)||0)*47%360},60%,42%)`,
                              display:"flex", alignItems:"center", justifyContent:"center",
                              fontSize:11, fontWeight:700, color:"#fff",
                            }}>{(issue.userName||"?")[0].toUpperCase()}</div>
                            <span style={{ fontSize:13, fontWeight:600, color:T.text, whiteSpace:"nowrap" }}>{issue.userName}</span>
                          </div>
                        </td>

                        <td style={{ padding:"13px 16px", fontSize:12, color:T.muted, whiteSpace:"nowrap" }}>{issue.userEmail}</td>

                        <td style={{ padding:"13px 16px" }}>
                          <span style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:"rgba(99,102,241,0.1)", color:"#818cf8", border:"1px solid rgba(99,102,241,0.2)", fontWeight:600, whiteSpace:"nowrap" }}>
                            {issue.productName}
                          </span>
                        </td>

                        <td style={{ padding:"13px 16px", fontSize:13, fontWeight:600, color:T.text, maxWidth:160, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                          {issue.title}
                        </td>

                        <td style={{ padding:"13px 16px", fontSize:12, color:T.muted, maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                          {issue.description}
                        </td>

                        <td style={{ padding:"13px 16px" }}>
                          <StatusBadge status={issue.status} />
                        </td>

                        <td style={{ padding:"13px 16px", fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace", whiteSpace:"nowrap" }}>
                          {issue.createdAt ? String(issue.createdAt).replace("T"," ").substring(0,16) : "—"}
                        </td>

                        <td style={{ padding:"13px 16px" }}>
                          <div style={{ display:"flex", gap:6, flexWrap:"nowrap" }}>
                            <ActionBtn label="Open"        color="#fca5a5" hoverBg="rgba(239,68,68,0.2)"   onClick={() => updateStatus(issue.id,"OPEN")} />
                            <ActionBtn label="In Progress" color="#818cf8" hoverBg="rgba(99,102,241,0.22)" onClick={() => updateStatus(issue.id,"IN_PROGRESS")} />
                            <ActionBtn label="Resolved"    color="#34d399" hoverBg="rgba(16,185,129,0.18)" onClick={() => updateStatus(issue.id,"RESOLVED")} />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div style={{ padding:"14px 22px", borderTop:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <span style={{ fontSize:12, color:T.muted }}>Showing {filtered.length} of {issues.length} issues</span>
              <span style={{ fontSize:11, color:T.muted, fontFamily:"'JetBrains Mono',monospace" }}>AssetFlow · Admin</span>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}

export default IssuesPage;