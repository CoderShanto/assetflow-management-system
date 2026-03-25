import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

const T = {
  bg: "#0d1117",
  sidebar: "#0f1420",
  surface: "#141b2d",
  surfaceAlt: "#1a2236",
  border: "rgba(255,255,255,0.07)",
  accent: "#10b981",
  accentSoft: "rgba(16,185,129,0.12)",
  text: "#e2e8f0",
  muted: "#64748b",
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "○", path: "/employee/dashboard" },
  { id: "assets", label: "My Assets", icon: "◆", path: "/employee/assets" },
  { id: "request-product", label: "Request Product", icon: "✦", path: "/employee/request-product" },
  { id: "requests", label: "My Requests", icon: "◷", path: "/employee/requests" },
  { id: "report-issue", label: "Report Issue", icon: "⚑", path: "/employee/report-issue" },
  { id: "issues", label: "My Issues", icon: "△", path: "/employee/issues" },
];

const getEmployeeName = () => {
  return localStorage.getItem("name") || "Employee";
};

const getInitials = (name) => {
  if (!name || name === "Employee") return "E";

  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();

  return (parts[0][0] + parts[1][0]).toUpperCase();
};

function Sidebar({ active, navigate, onLogout, employeeName, employeeInitials }) {
  const [open, setOpen] = useState(true);

  return (
    <aside
      style={{
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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 6px",
          marginBottom: 28,
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            flexShrink: 0,
            background: "linear-gradient(135deg,#10b981,#059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            boxShadow: "0 4px 14px rgba(16,185,129,0.35)",
          }}
        >
          ⬡
        </div>

        {open && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap", minWidth: 0 }}>
            <div
              style={{
                fontWeight: 800,
                fontSize: 14,
                color: T.text,
                fontFamily: "'Sora',sans-serif",
              }}
            >
              AssetFlow
            </div>
            <div
              style={{
                fontSize: 9,
                color: T.muted,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Employee
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          style={{
            marginLeft: "auto",
            flexShrink: 0,
            width: 26,
            height: 26,
            borderRadius: 7,
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${T.border}`,
            color: T.muted,
            cursor: "pointer",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s",
          }}
        >
          {open ? "‹" : "›"}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "10px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${T.border}`,
          marginBottom: 22,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            flexShrink: 0,
            background: "linear-gradient(135deg,#10b981,#059669)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          {employeeInitials}
        </div>

        {open && (
          <>
            <div style={{ overflow: "hidden", whiteSpace: "nowrap", minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>
                {employeeName}
              </div>
              <div style={{ fontSize: 10, color: T.muted }}>Personal access</div>
            </div>

            <div
              style={{
                marginLeft: "auto",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#10b981",
                }}
              />
              <button
                onClick={onLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontSize: 14,
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ⎋
              </button>
            </div>
          </>
        )}
      </div>

      {open && (
        <div
          style={{
            fontSize: 9,
            color: T.muted,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            padding: "0 8px",
            marginBottom: 6,
          }}
        >
          Navigation
        </div>
      )}

      <nav style={{ flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const a = active === item.id;
          return (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              title={!open ? item.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: open ? 10 : 0,
                justifyContent: open ? "flex-start" : "center",
                padding: open ? "10px 12px" : "11px 0",
                borderRadius: 10,
                marginBottom: 2,
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
                background: a ? T.accentSoft : "transparent",
                color: a ? "#6ee7b7" : T.muted,
                fontWeight: a ? 600 : 400,
                fontSize: 13,
                fontFamily: "'Sora',sans-serif",
                borderLeft: a ? `3px solid ${T.accent}` : "3px solid transparent",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!a) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = T.text;
                }
              }}
              onMouseLeave={(e) => {
                if (!a) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = T.muted;
                }
              }}
            >
              <span style={{ fontSize: 15, width: 22, textAlign: "center", flexShrink: 0 }}>
                {item.icon}
              </span>
              {open && <span>{item.label}</span>}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

const StatCard = ({ label, value, sub, gradient, icon, loading }) => (
  <div
    style={{
      background: gradient,
      borderRadius: 18,
      padding: "22px 24px",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 8px 28px rgba(0,0,0,0.3)",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -20,
        right: -20,
        width: 90,
        height: 90,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.07)",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: -10,
        right: 10,
        width: 55,
        height: 55,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.05)",
      }}
    />
    <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", opacity: 0.75, marginBottom: 4 }}>
      {label}
    </p>
    <h2 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-2px", margin: "6px 0", fontFamily: "'Sora',sans-serif" }}>
      {loading ? (
        <span style={{ display: "inline-block", width: 60, height: 40, background: "rgba(255,255,255,0.15)", borderRadius: 8 }} />
      ) : (
        value
      )}
    </h2>
    <p style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>{sub}</p>
    <div style={{ position: "absolute", top: 18, right: 18, fontSize: 26, opacity: 0.2, userSelect: "none" }}>
      {icon}
    </div>
  </div>
);

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ myAssets: 0, myRequests: 0, myIssues: 0 });
  const [loading, setLoading] = useState(true);

  const employeeName = useMemo(() => getEmployeeName(), []);
  const employeeInitials = useMemo(() => getInitials(employeeName), [employeeName]);

  const fetchEmployeeStats = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard/employee-stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    navigate("/");
  };

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  const ACTIONS = [
    { label: "View My Assets", sub: "Assets currently assigned to you", path: "/employee/assets", icon: "◆", color: "#3b82f6" },
    { label: "Request a Product", sub: "Submit a new product request", path: "/employee/request-product", icon: "✦", color: "#10b981" },
    { label: "My Requests", sub: "Track all submitted requests", path: "/employee/requests", icon: "◷", color: "#f59e0b" },
    { label: "Report an Issue", sub: "Flag a problem with an asset", path: "/employee/report-issue", icon: "⚑", color: "#ef4444" },
    { label: "My Issues", sub: "Review issues you've reported", path: "/employee/issues", icon: "△", color: "#8b5cf6" },
  ];

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Sora',sans-serif;background:${T.bg};}::-webkit-scrollbar{width:5px;height:5px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.3);border-radius:10px;}.glass{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);}.act-btn{display:flex;align-items:center;gap:14px;width:100%;text-align:left;padding:14px 16px;border-radius:13px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);color:${T.text};cursor:pointer;transition:all 0.18s;font-family:'Sora',sans-serif;}.act-btn:hover{background:rgba(16,185,129,0.07);border-color:rgba(16,185,129,0.25);transform:translateX(4px);}@keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(16,185,129,0.45);}70%{box-shadow:0 0 0 8px rgba(16,185,129,0);}100%{box-shadow:0 0 0 0 rgba(16,185,129,0);}}.live-dot{width:8px;height:8px;border-radius:50%;background:#10b981;animation:pulse-ring 1.6s infinite;flex-shrink:0;}`}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: "'Sora',sans-serif" }}>
        <Sidebar active="dashboard" navigate={navigate} onLogout={handleLogout} employeeName={employeeName} employeeInitials={employeeInitials} />

        <main style={{ flex: 1, padding: "32px 28px", overflowY: "auto", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 30 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <div className="live-dot" />
                <span style={{ fontSize: 11, color: "#10b981", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "1px" }}>
                  {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                </span>
              </div>

              <h1 style={{ fontSize: 28, fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.8px", lineHeight: 1.1 }}>
                {greeting()}, <span style={{ color: "#10b981" }}>{employeeName}</span> 👋
              </h1>

              <p style={{ fontSize: 13, color: T.muted, marginTop: 5 }}>Overview of your assets, requests and issues.</p>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={fetchEmployeeStats} style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#6ee7b7", padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>
                ↻ Refresh
              </button>
              <button onClick={handleLogout} style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", color: "#fca5a5", padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora',sans-serif" }}>
                Sign Out
              </button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 22 }}>
            <StatCard label="My Assets" value={stats.myAssets} sub="Assigned to you" gradient="linear-gradient(135deg,#1d4ed8,#3b82f6)" icon="◆" loading={loading} />
            <StatCard label="My Requests" value={stats.myRequests} sub="Requests submitted" gradient="linear-gradient(135deg,#b45309,#f59e0b)" icon="◷" loading={loading} />
            <StatCard label="My Issues" value={stats.myIssues} sub="Issues reported" gradient="linear-gradient(135deg,#be123c,#f43f5e)" icon="△" loading={loading} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 270px", gap: 16 }}>
            <div className="glass" style={{ borderRadius: 18, padding: 22 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 2 }}>Quick Actions</h2>
              <p style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>Everything you need, right here</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {ACTIONS.map((a) => (
                  <button key={a.path} onClick={() => navigate(a.path)} className="act-btn">
                    <div style={{ width: 38, height: 38, borderRadius: 11, background: `${a.color}18`, border: `1px solid ${a.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                      {a.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{a.label}</div>
                      <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{a.sub}</div>
                    </div>
                    <div style={{ marginLeft: "auto", color: "#334155", fontSize: 16 }}>›</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass" style={{ borderRadius: 18, padding: 22 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 16 }}>My Profile</h2>
              {[
                { label: "Name", value: employeeName, color: "#93c5fd" },
                { label: "Role", value: "EMPLOYEE", color: "#6ee7b7", mono: true },
                { label: "Access", value: "Personal Workflows", color: "#a5b4fc" },
                { label: "Module", value: "Dashboard", color: "#fcd34d" },
                { label: "Project", value: "AssetFlow v1.0", color: "#f9a8d4" },
              ].map(({ label, value, color, mono }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", letterSpacing: "0.5px", fontFamily: "'JetBrains Mono',monospace" }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color, fontFamily: mono ? "'JetBrains Mono',monospace" : "'Sora',sans-serif" }}>{value}</span>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: "12px 14px", borderRadius: 12, background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.15)" }}>
                <p style={{ fontSize: 11, color: T.muted, marginBottom: 5 }}>💡 Tip</p>
                <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>Report issues early for faster resolution.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}