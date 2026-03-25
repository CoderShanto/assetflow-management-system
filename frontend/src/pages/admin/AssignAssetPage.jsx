import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

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

function SelectField({ label, name, value, onChange, children, required }) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: T.muted,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: 8,
          fontFamily: "'Sora',sans-serif",
        }}
      >
        {label} {required && <span style={{ color: "#7c3aed" }}>*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: 12,
          background: T.surfaceAlt,
          border: `1px solid ${focused ? T.accent : T.border}`,
          color: value ? T.text : T.muted,
          fontSize: 14,
          fontFamily: "'Sora',sans-serif",
          outline: "none",
          cursor: "pointer",
          transition: "border-color 0.15s",
          boxShadow: focused ? `0 0 0 3px rgba(124,58,237,0.1)` : "none",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          paddingRight: 38,
        }}
      >
        {children}
      </select>
    </div>
  );
}

function AssignAssetPage() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ assetId: "", userId: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [assetsRes, employeesRes] = await Promise.all([
        API.get("/asset-assignments/available-assets"),
        API.get("/asset-assignments/employees"),
      ]);
      setAssets(assetsRes.data);
      setEmployees(employeesRes.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load assets or employees");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      await API.post("/asset-assignments", {
        assetId: Number(formData.assetId),
        userId: Number(formData.userId),
      });
      setMessage("Asset assigned successfully!");
      setTimeout(() => navigate("/admin/assigned-assets"), 1200);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to assign asset");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedAsset = assets.find((a) => String(a.id) === String(formData.assetId));
  const selectedEmployee = employees.find((e) => String(e.id) === String(formData.userId));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Sora',sans-serif; background:${T.bg}; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(124,58,237,0.3); border-radius:10px; }
        select option { background:#1a2236; color:#e2e8f0; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .form-card { animation: fadeUp 0.35s ease forwards; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: "'Sora',sans-serif" }}>
        <Sidebar active="assigned-assets" navigate={navigate} onLogout={handleLogout} />

        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px", minWidth: 0 }}>
          <div className="form-card" style={{ width: "100%", maxWidth: 540 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 12, color: T.muted }}>
              <span style={{ cursor: "pointer", color: "#7c3aed" }} onClick={() => navigate("/admin/assigned-assets")}>
                Assigned Assets
              </span>
              <span>›</span>
              <span style={{ color: T.text }}>Assign New</span>
            </div>

            <div style={{ background: T.surface, borderRadius: 20, border: `1px solid ${T.border}`, overflow: "hidden" }}>
              <div
                style={{
                  padding: "24px 28px 20px",
                  borderBottom: `1px solid ${T.border}`,
                  background: "linear-gradient(135deg, rgba(124,58,237,0.08) 0%, rgba(99,102,241,0.04) 100%)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: "linear-gradient(135deg,#7c3aed,#6366f1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                    }}
                  >
                    ⊞
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, letterSpacing: "-0.3px" }}>Assign Asset</h2>
                    <p style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Link an available asset to an employee</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ padding: "28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <SelectField label="Select Asset" name="assetId" value={formData.assetId} onChange={handleChange} required>
                    <option value="">Choose an available asset…</option>
                    {assets.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} — {a.category} · {a.serialNumber}
                      </option>
                    ))}
                  </SelectField>

                  <SelectField label="Assign To Employee" name="userId" value={formData.userId} onChange={handleChange} required>
                    <option value="">Choose an employee…</option>
                    {employees.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} — {u.email}
                      </option>
                    ))}
                  </SelectField>

                  {(selectedAsset || selectedEmployee) && (
                    <div style={{ background: T.surfaceAlt, borderRadius: 14, padding: "16px 18px", border: `1px solid ${T.border}` }}>
                      <p style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>
                        Assignment Preview
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {selectedAsset && (
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 12, color: T.muted }}>Asset</span>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{selectedAsset.name}</div>
                              <div style={{ fontSize: 11, color: "#818cf8", fontFamily: "'JetBrains Mono',monospace" }}>{selectedAsset.serialNumber}</div>
                            </div>
                          </div>
                        )}

                        {selectedAsset && selectedEmployee && <div style={{ height: 1, background: T.border }} />}

                        {selectedEmployee && (
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 12, color: T.muted }}>Employee</span>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div
                                style={{
                                  width: 26,
                                  height: 26,
                                  borderRadius: "50%",
                                  background: `hsl(${(selectedEmployee.name?.charCodeAt(0) || 0) * 47 % 360},60%,45%)`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 11,
                                  fontWeight: 700,
                                  color: "#fff",
                                }}
                              >
                                {(selectedEmployee.name || "?")[0].toUpperCase()}
                              </div>
                              <div style={{ textAlign: "right" }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{selectedEmployee.name}</div>
                                <div style={{ fontSize: 11, color: T.muted }}>{selectedEmployee.email}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {message && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px 16px",
                        borderRadius: 10,
                        background: "rgba(16,185,129,0.1)",
                        border: "1px solid rgba(16,185,129,0.25)",
                        color: "#34d399",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      ✓ {message}
                    </div>
                  )}

                  {error && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px 16px",
                        borderRadius: 10,
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#fca5a5",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      ✕ {error}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                    <button
                      type="button"
                      onClick={() => navigate("/admin/assigned-assets")}
                      style={{
                        flex: 1,
                        padding: "13px",
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.04)",
                        border: `1px solid ${T.border}`,
                        color: T.muted,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "'Sora',sans-serif",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = T.text;
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = T.muted;
                        e.currentTarget.style.borderColor = T.border;
                      }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      style={{
                        flex: 2,
                        padding: "13px",
                        borderRadius: 12,
                        background: submitting ? "rgba(124,58,237,0.4)" : "linear-gradient(135deg,#7c3aed,#6366f1)",
                        border: "none",
                        color: "#fff",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: submitting ? "not-allowed" : "pointer",
                        fontFamily: "'Sora',sans-serif",
                        boxShadow: submitting ? "none" : "0 4px 20px rgba(124,58,237,0.35)",
                        transition: "all 0.2s",
                      }}
                    >
                      {submitting ? "Assigning…" : "Assign Asset →"}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <div
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${T.border}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800, color: "#818cf8" }}>{assets.length}</div>
                <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>Available Assets</div>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${T.border}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18, fontWeight: 800, color: "#34d399" }}>{employees.length}</div>
                <div style={{ fontSize: 10, color: T.muted, marginTop: 2 }}>Employees</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AssignAssetPage;