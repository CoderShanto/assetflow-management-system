import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

/* ─── shared design tokens matching the screenshot ─── */
const T = {
  bg: "#0d1117",
  sidebar: "#0f1420",
  surface: "#141b2d",
  surfaceAlt: "#1a2236",
  border: "rgba(255,255,255,0.07)",
  accent: "#7c3aed",
  accentSoft: "rgba(124,58,237,0.15)",
  accentBorder: "rgba(124,58,237,0.35)",
  indigo: "#6366f1",
  text: "#e2e8f0",
  muted: "#64748b",
  faint: "#1e293b",
};

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "○", path: "/admin/dashboard" },
  { id: "products", label: "Products", icon: "◆", path: "/admin/products" },
  { id: "users", label: "Users", icon: "◎", path: "/admin/users" },
  { id: "requests", label: "Requests", icon: "◷", path: "/admin/requests" },
  { id: "issues", label: "Issues", icon: "△", path: "/admin/issues" },
  { id: "assigned-assets", label: "Assigned Assets", icon: "⊞", path: "/admin/assigned-assets" },
];

function Sidebar({ active, navigate, onLogout }) {
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
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px", marginBottom: 28, minWidth: 0 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            flexShrink: 0,
            background: "linear-gradient(135deg,#7c3aed,#6366f1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 17,
            boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
          }}
        >
          ⬡
        </div>

        {open && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap", minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: T.text, fontFamily: "'Sora',sans-serif" }}>
              AssetFlow
            </div>
            <div style={{ fontSize: 9, color: T.muted, letterSpacing: "1px", textTransform: "uppercase" }}>
              Admin
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
          title={open ? "Collapse" : "Expand"}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = T.text;
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = T.muted;
            e.currentTarget.style.borderColor = T.border;
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
            background: "linear-gradient(135deg,#7c3aed,#6366f1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          A
        </div>

        {open && (
          <>
            <div style={{ overflow: "hidden", whiteSpace: "nowrap", minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>Admin</div>
              <div style={{ fontSize: 10, color: T.muted }}>Full access</div>
            </div>
            <div style={{ marginLeft: "auto", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Sign out"
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
              )}
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
          const isActive = active === item.id;
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
                background: isActive ? T.accentSoft : "transparent",
                color: isActive ? "#a78bfa" : T.muted,
                fontWeight: isActive ? 600 : 400,
                fontSize: 13,
                fontFamily: "'Sora',sans-serif",
                borderLeft: isActive ? `3px solid ${T.accent}` : "3px solid transparent",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = T.text;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = T.muted;
                }
              }}
            >
              <span style={{ fontSize: 15, width: 22, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              {open && <span>{item.label}</span>}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

function StatusBadge({ status }) {
  const isReturned = status === "RETURNED";
  return (
    <span
      style={{
        padding: "4px 12px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        background: isReturned ? "rgba(16,185,129,0.12)" : "rgba(99,102,241,0.15)",
        color: isReturned ? "#34d399" : "#818cf8",
        border: `1px solid ${isReturned ? "rgba(16,185,129,0.25)" : "rgba(99,102,241,0.3)"}`,
      }}
    >
      {status}
    </span>
  );
}

function AssignedAssetsPage() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await API.get("/asset-assignments");
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch assigned assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleReturn = async (id) => {
    try {
      await API.put(`/asset-assignments/${id}/return`);
      fetchAssignments();
    } catch (err) {
      console.error(err);
      alert("Failed to return asset");
    }
  };

  const filtered = assignments.filter(
    (a) =>
      !search ||
      a.assetName?.toLowerCase().includes(search.toLowerCase()) ||
      a.userName?.toLowerCase().includes(search.toLowerCase()) ||
      a.department?.toLowerCase().includes(search.toLowerCase())
  );

  const assigned = assignments.filter((a) => a.status === "ASSIGNED").length;
  const returned = assignments.filter((a) => a.status === "RETURNED").length;

  const COLS = ["ID", "Asset", "Category", "Serial No.", "Employee", "Email", "Department", "Assigned", "Returned", "Status", "Action"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Sora',sans-serif; background:${T.bg}; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(124,58,237,0.3); border-radius:10px; }
        .trow { transition:background 0.15s; }
        .trow:hover { background:rgba(255,255,255,0.025) !important; }
        .ret-btn {
          padding:5px 14px; border-radius:8px; font-size:12px; font-weight:600;
          background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25);
          color:#fca5a5; cursor:pointer; transition:all 0.15s; font-family:'Sora',sans-serif;
        }
        .ret-btn:hover { background:rgba(239,68,68,0.2); }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: "'Sora',sans-serif" }}>
        <Sidebar active="assigned-assets" navigate={navigate} onLogout={handleLogout} />

        <main style={{ flex: 1, padding: "36px 32px", overflowY: "auto", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <p
                style={{
                  fontSize: 11,
                  color: "#7c3aed",
                  fontFamily: "'JetBrains Mono',monospace",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  marginBottom: 6,
                }}
              >
                Asset Management
              </p>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: T.text, letterSpacing: "-0.5px" }}>Assigned Assets</h1>
              <p style={{ fontSize: 13, color: T.muted, marginTop: 5 }}>Track which exact asset is assigned to which employee</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => navigate("/admin/dashboard")}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Sora',sans-serif",
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid ${T.border}`,
                  color: T.muted,
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
              >
                ← Back
              </button>
              <button
                onClick={() => navigate("/admin/assign-asset")}
                style={{
                  padding: "10px 20px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Sora',sans-serif",
                  background: "linear-gradient(135deg,#7c3aed,#6366f1)",
                  border: "none",
                  color: "#fff",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                }}
              >
                + Assign New Asset
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
            {[
              { label: "Total Assignments", val: assignments.length, color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
              { label: "Currently Assigned", val: assigned, color: "#818cf8", bg: "rgba(99,102,241,0.08)" },
              { label: "Returned", val: returned, color: "#34d399", bg: "rgba(16,185,129,0.08)" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  padding: "14px 22px",
                  borderRadius: 14,
                  background: s.bg,
                  border: `1px solid ${T.border}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</span>
                <span style={{ fontSize: 26, fontWeight: 800, color: s.color, fontFamily: "'Sora',sans-serif" }}>
                  {loading ? "–" : s.val}
                </span>
              </div>
            ))}
          </div>

          <div style={{ background: T.surface, borderRadius: 18, border: `1px solid ${T.border}`, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: `1px solid ${T.border}` }}>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: T.muted,
                    fontSize: 14,
                    pointerEvents: "none",
                  }}
                >
                  🔍
                </span>
                <input
                  placeholder="Search asset, employee, department…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    paddingLeft: 36,
                    paddingRight: 14,
                    paddingTop: 9,
                    paddingBottom: 9,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.04)",
                    border: `1px solid ${T.border}`,
                    color: T.text,
                    fontSize: 13,
                    width: 300,
                    fontFamily: "'Sora',sans-serif",
                    outline: "none",
                  }}
                />
              </div>
              <button
                onClick={fetchAssignments}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${T.border}`,
                  color: T.muted,
                  padding: "8px 16px",
                  borderRadius: 9,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'Sora',sans-serif",
                }}
              >
                ↻ Refresh
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: T.surfaceAlt }}>
                    {COLS.map((c) => (
                      <th
                        key={c}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: 10,
                          fontWeight: 700,
                          color: T.muted,
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          whiteSpace: "nowrap",
                          borderBottom: `1px solid ${T.border}`,
                        }}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <tr key={i}>
                        {COLS.map((c) => (
                          <td key={c} style={{ padding: "14px 16px" }}>
                            <div
                              style={{
                                height: 14,
                                borderRadius: 6,
                                background: "rgba(255,255,255,0.04)",
                                width: c === "Email" ? "140px" : c === "Action" ? "60px" : "80px",
                              }}
                            />
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan="11" style={{ padding: "48px 16px", textAlign: "center", color: T.muted, fontSize: 14 }}>
                        No assigned assets found
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item, idx) => (
                      <tr
                        key={item.id}
                        className="trow"
                        style={{ borderBottom: `1px solid ${T.border}`, background: idx % 2 === 0 ? "transparent" : T.surfaceAlt + "55" }}
                      >
                        <td style={{ padding: "13px 16px", fontSize: 12, color: T.muted, fontFamily: "'JetBrains Mono',monospace" }}>#{item.id}</td>
                        <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap" }}>{item.assetName}</td>
                        <td style={{ padding: "13px 16px" }}>
                          <span
                            style={{
                              fontSize: 11,
                              padding: "3px 10px",
                              borderRadius: 20,
                              background: "rgba(99,102,241,0.1)",
                              color: "#818cf8",
                              border: "1px solid rgba(99,102,241,0.2)",
                              fontWeight: 600,
                            }}
                          >
                            {item.assetCategory}
                          </span>
                        </td>
                        <td style={{ padding: "13px 16px", fontSize: 12, color: T.muted, fontFamily: "'JetBrains Mono',monospace" }}>{item.serialNumber}</td>
                        <td style={{ padding: "13px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div
                              style={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                background: `hsl(${((item.userName?.charCodeAt(0) || 0) * 47) % 360},60%,45%)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 11,
                                fontWeight: 700,
                                color: "#fff",
                                flexShrink: 0,
                              }}
                            >
                              {(item.userName || "?")[0].toUpperCase()}
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 600, color: T.text, whiteSpace: "nowrap" }}>{item.userName}</span>
                          </div>
                        </td>
                        <td style={{ padding: "13px 16px", fontSize: 12, color: T.muted }}>{item.userEmail}</td>
                        <td style={{ padding: "13px 16px", fontSize: 12, color: T.muted }}>{item.department || "—"}</td>
                        <td style={{ padding: "13px 16px", fontSize: 11, color: T.muted, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>
                          {item.assignedDate ? String(item.assignedDate).replace("T", " ").substring(0, 16) : "—"}
                        </td>
                        <td style={{ padding: "13px 16px", fontSize: 11, color: T.muted, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>
                          {item.returnedDate ? String(item.returnedDate).replace("T", " ").substring(0, 16) : "—"}
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          <StatusBadge status={item.status} />
                        </td>
                        <td style={{ padding: "13px 16px" }}>
                          {item.status === "ASSIGNED" ? (
                            <button className="ret-btn" onClick={() => handleReturn(item.id)}>
                              Return
                            </button>
                          ) : (
                            <span style={{ fontSize: 12, color: T.muted }}>Completed</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div
              style={{
                padding: "14px 22px",
                borderTop: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 12, color: T.muted }}>
                Showing {filtered.length} of {assignments.length} records
              </span>
              <span style={{ fontSize: 11, color: T.muted, fontFamily: "'JetBrains Mono',monospace" }}>AssetFlow · Admin</span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AssignedAssetsPage;