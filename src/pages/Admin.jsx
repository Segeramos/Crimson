// src/pages/Admin.jsx
import { useEffect, useState, useRef } from "react";
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, orderBy, query, serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

const ADMIN_PASSWORD = "crimson2026"; // 🔐 Change this to your own password

const TABS = ["webProjects", "seoProjects", "designProjects", "skills", "blog"];
const TAB_LABELS = {
  webProjects:    "Web Projects",
  seoProjects:    "SEO Projects",
  designProjects: "Design Projects",
  skills:         "Skills",
  blog:           "Blog Posts",
};
const TAB_ICONS = {
  webProjects:    "◈",
  seoProjects:    "◎",
  designProjects: "◻",
  skills:         "▲",
  blog:           "✦",
};

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [show, setShow]         = useState(false);
  const [shaking, setShaking]   = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("cms_auth", "1");
      onLogin();
    } else {
      setError("Incorrect password.");
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      setPassword("");
    }
  };

  return (
    <>
      <style>{`
        .login-wrap {
          min-height: 100vh; background: #0a0a0a;
          display: flex; align-items: center; justify-content: center; padding: 1rem;
        }
        .login-card {
          background: #141414; border: 1px solid #1f1f1f; border-radius: 20px;
          padding: 2.5rem 2rem; width: 100%; max-width: 380px; text-align: center;
        }
        .login-logo { font-size: 32px; margin-bottom: 0.5rem; }
        .login-title { color: #dc2626; font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .login-sub { color: #666; font-size: 13px; margin-bottom: 2rem; }
        .login-field { position: relative; margin-bottom: 1rem; }
        .login-input {
          width: 100%; padding: 12px 44px 12px 14px; border-radius: 12px;
          border: 1px solid #2a2a2a; background: #0f0f0f; color: #fed7aa;
          font-size: 15px; outline: none; transition: border-color 0.2s;
        }
        .login-input:focus { border-color: #dc2626; }
        .login-input.shake {
          animation: shake 0.4s ease;
        }
        .eye-btn {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: transparent; border: none; color: #666; cursor: pointer; font-size: 16px;
        }
        .login-error {
          color: #f87171; font-size: 12px; margin-bottom: 1rem;
          background: #2d1515; border-radius: 8px; padding: 8px 12px;
        }
        .login-btn {
          width: 100%; background: #991b1b; color: #fff; border: none;
          border-radius: 12px; padding: 13px; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: background 0.2s;
        }
        .login-btn:hover { background: #7f1d1d; }
        .login-hint { color: #444; font-size: 11px; margin-top: 1.5rem; }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-logo">⬡</div>
          <div className="login-title">Portfolio CMS</div>
          <div className="login-sub">Enter your password to continue</div>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <input
                className={`login-input ${shaking ? "shake" : ""}`}
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(""); }}
                autoFocus
              />
              <button type="button" className="eye-btn" onClick={() => setShow(s => !s)}>
                {show ? "🙈" : "👁"}
              </button>
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="login-btn">Unlock CMS</button>
          </form>

          <div className="login-hint">Only you should know this URL and password.</div>
        </div>
      </div>
    </>
  );
}

// ─── Main Admin ───────────────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("cms_auth") === "1");

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;
  return <AdminPanel onLogout={() => { sessionStorage.removeItem("cms_auth"); setAuthed(false); }} />;
}

function AdminPanel({ onLogout }) {
  const [tab, setTab]           = useState("webProjects");
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData]         = useState({ webProjects:[], seoProjects:[], designProjects:[], skills:[], blog:[] });
  const [modal, setModal]       = useState(null);
  const [form, setForm]         = useState({});
  const [uploading, setUploading]       = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl]     = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const unsubs = TABS.map(col => {
      const q = query(collection(db, col), orderBy("createdAt", "desc"));
      return onSnapshot(q, snap => {
        setData(prev => ({ ...prev, [col]: snap.docs.map(d => ({ id: d.id, ...d.data() })) }));
      });
    });
    return () => unsubs.forEach(u => u());
  }, []);

  const openAdd  = type => { setForm({}); setPreviewUrl(null); setModal({ type }); };
  const openEdit = (type, item) => { setForm({ ...item }); setPreviewUrl(item.image || null); setModal({ type, item }); };
  const closeModal = () => { setModal(null); setForm({}); setPreviewUrl(null); setUploadProgress(0); };

  const handleImagePick = async e => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    const storageRef = ref(storage, `design/${Date.now()}_${file.name}`);
    const task = uploadBytesResumable(storageRef, file);
    task.on("state_changed",
      snap => setUploadProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
      err => { console.error(err); setUploading(false); },
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        setForm(p => ({ ...p, image: url }));
        setUploading(false);
        setUploadProgress(100);
      }
    );
  };

  const handleSave = async () => {
    if (uploading) return;
    const { type, item } = modal;
    const payload = { ...form };
    if (type === "blog" && !payload.status) payload.status = "draft";
    if (type === "skills" && payload.level) payload.level = parseInt(payload.level);
    if (type === "seoProjects" && payload.statsRaw) {
      try { payload.stats = JSON.parse(payload.statsRaw); } catch(e) {}
      delete payload.statsRaw;
    }
    if (item) {
      await updateDoc(doc(db, type, item.id), payload);
    } else {
      await addDoc(collection(db, type), { ...payload, createdAt: serverTimestamp() });
    }
    closeModal();
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteDoc(doc(db, type, id));
  };

  const togglePublish = async post => {
    await updateDoc(doc(db, "blog", post.id), {
      status: post.status === "live" ? "draft" : "live",
    });
  };

  const f = key => ({
    value: form[key] ?? "",
    onChange: e => setForm(p => ({ ...p, [key]: e.target.value })),
  });

  const items = data[tab] || [];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        .admin-wrap { min-height: 100vh; background: #0a0a0a; color: #fed7aa; display: flex; flex-direction: column; }
        .topnav { display: flex; align-items: center; justify-content: space-between; background: #0f0f0f; padding: 14px 16px; border-bottom: 1px solid #1f1f1f; position: sticky; top: 0; z-index: 50; }
        .topnav-brand { color: #dc2626; font-weight: 700; font-size: 15px; }
        .topnav-right { display: flex; gap: 8px; align-items: center; }
        .hamburger { background: transparent; border: 1px solid #2a2a2a; border-radius: 8px; color: #a8a8a8; padding: 6px 10px; cursor: pointer; font-size: 18px; }
        .logout-btn { background: transparent; border: 1px solid #2a2a2a; border-radius: 8px; color: #a8a8a8; padding: 6px 12px; cursor: pointer; font-size: 12px; }
        .logout-btn:hover { color: #dc2626; border-color: #dc2626; }
        .drawer-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 60; }
        .drawer { position: fixed; top: 0; left: 0; bottom: 0; width: 240px; background: #0f0f0f; padding: 1.5rem 1rem; z-index: 70; border-right: 1px solid #1f1f1f; transform: translateX(-100%); transition: transform 0.25s ease; }
        .drawer.open { transform: translateX(0); }
        .drawer-brand { color: #dc2626; font-weight: 700; font-size: 15px; margin-bottom: 1.5rem; }
        .drawer-close { position: absolute; top: 14px; right: 14px; background: transparent; border: none; color: #a8a8a8; font-size: 20px; cursor: pointer; }
        .nav-item { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; padding: 10px 12px; border-radius: 10px; border: none; background: transparent; color: #a8a8a8; cursor: pointer; font-size: 14px; margin-bottom: 4px; transition: all 0.15s; }
        .nav-item.active { background: #1f1f1f; color: #dc2626; font-weight: 600; }
        .nav-icon { font-size: 16px; width: 20px; text-align: center; }
        .sidebar { display: none; width: 220px; background: #0f0f0f; padding: 1.5rem 1rem; border-right: 1px solid #1f1f1f; flex-shrink: 0; flex-direction: column; justify-content: space-between; }
        .sidebar-brand { color: #dc2626; font-weight: 700; font-size: 15px; margin-bottom: 1.5rem; }
        .sidebar-logout { display: flex; align-items: center; gap: 8px; width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid #2a2a2a; background: transparent; color: #666; cursor: pointer; font-size: 13px; margin-top: 1rem; transition: all 0.15s; }
        .sidebar-logout:hover { color: #dc2626; border-color: #dc2626; }
        .main-content { flex: 1; padding: 1.25rem; overflow-y: auto; }
        .tab-pills { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 1.25rem; scrollbar-width: none; }
        .tab-pills::-webkit-scrollbar { display: none; }
        .tab-pill { flex-shrink: 0; padding: 6px 14px; border-radius: 20px; border: 1px solid #2a2a2a; background: transparent; color: #a8a8a8; font-size: 12px; cursor: pointer; white-space: nowrap; transition: all 0.15s; }
        .tab-pill.active { background: #991b1b; color: #fff; border-color: #991b1b; font-weight: 600; }
        .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; gap: 8px; }
        .page-title { font-size: 18px; font-weight: 600; }
        .add-btn { background: #991b1b; color: #fff; border: none; border-radius: 10px; padding: 9px 16px; font-size: 13px; font-weight: 600; cursor: pointer; white-space: nowrap; flex-shrink: 0; }
        .cards-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        .card { background: #141414; border: 1px solid #1f1f1f; border-radius: 14px; padding: 1rem; overflow: hidden; }
        .card-img { width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 10px; }
        .card-tag { font-size: 11px; color: #dc2626; font-weight: 600; margin-bottom: 5px; text-transform: capitalize; }
        .card-title { font-size: 15px; font-weight: 600; color: #fed7aa; margin-bottom: 5px; }
        .card-desc { font-size: 12px; color: #888; line-height: 1.5; margin-bottom: 8px; }
        .card-link { font-size: 11px; color: #dc2626; display: block; margin-bottom: 8px; word-break: break-all; }
        .card-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .icon-btn { border: 1px solid #2a2a2a; border-radius: 8px; background: transparent; color: #a8a8a8; font-size: 12px; padding: 6px 12px; cursor: pointer; }
        .icon-btn.del { color: #dc2626; }
        .skill-row { padding: 12px 0; border-bottom: 1px solid #1a1a1a; display: flex; flex-direction: column; gap: 6px; }
        .skill-row-top { display: flex; justify-content: space-between; align-items: center; }
        .skill-name { font-size: 14px; font-weight: 500; }
        .skill-cat { font-size: 11px; color: #888; }
        .skill-pct { font-size: 12px; color: #a8a8a8; }
        .bar-bg { width: 100%; height: 6px; background: #1f1f1f; border-radius: 4px; }
        .bar-fill { height: 6px; background: #991b1b; border-radius: 4px; }
        .skill-actions { display: flex; gap: 8px; margin-top: 4px; }
        .blog-row { background: #141414; border: 1px solid #1f1f1f; border-radius: 12px; padding: 1rem; margin-bottom: 10px; }
        .blog-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap; }
        .blog-date { font-size: 11px; color: #666; }
        .badge-live { font-size: 10px; background: #14532d; color: #86efac; padding: 2px 8px; border-radius: 20px; }
        .badge-draft { font-size: 10px; background: #713f12; color: #fde68a; padding: 2px 8px; border-radius: 20px; }
        .blog-title { font-size: 15px; font-weight: 600; color: #fed7aa; margin-bottom: 4px; }
        .blog-excerpt { font-size: 12px; color: #888; margin-bottom: 10px; }
        .empty { color: #555; font-size: 13px; padding: 2rem 0; text-align: center; }
        .upload-zone { border: 2px dashed #2a2a2a; border-radius: 12px; padding: 1.5rem; text-align: center; cursor: pointer; transition: border-color 0.2s; background: #0f0f0f; position: relative; }
        .upload-zone:hover { border-color: #dc2626; }
        .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
        .upload-preview { width: 100%; height: 160px; object-fit: cover; border-radius: 10px; margin-bottom: 8px; }
        .upload-label { font-size: 13px; color: #a8a8a8; }
        .upload-label span { color: #dc2626; font-weight: 600; }
        .progress-bar-bg { width: 100%; height: 4px; background: #1f1f1f; border-radius: 4px; margin-top: 8px; overflow: hidden; }
        .progress-bar-fill { height: 4px; background: #dc2626; border-radius: 4px; transition: width 0.3s; }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: flex-end; justify-content: center; z-index: 100; }
        .modal-sheet { background: #141414; border: 1px solid #2a2a2a; border-radius: 20px 20px 0 0; padding: 1.5rem; width: 100%; max-width: 540px; max-height: 90vh; overflow-y: auto; }
        .modal-handle { width: 40px; height: 4px; background: #2a2a2a; border-radius: 4px; margin: 0 auto 1.25rem; }
        .modal-title { font-size: 16px; font-weight: 600; color: #fed7aa; margin-bottom: 1.25rem; text-transform: capitalize; }
        .form-group { margin-bottom: 12px; }
        .form-label { font-size: 12px; color: #a8a8a8; display: block; margin-bottom: 4px; }
        .form-input { width: 100%; padding: 10px 12px; border-radius: 10px; font-size: 14px; border: 1px solid #2a2a2a; background: #0f0f0f; color: #fed7aa; outline: none; resize: vertical; }
        .form-input:focus { border-color: #dc2626; }
        .modal-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; }
        .btn-cancel { border: 1px solid #2a2a2a; background: transparent; color: #a8a8a8; border-radius: 10px; padding: 10px 18px; font-size: 13px; cursor: pointer; }
        .btn-save { background: #991b1b; color: #fff; border: none; border-radius: 10px; padding: 10px 18px; font-size: 13px; font-weight: 600; cursor: pointer; }
        .btn-save:disabled { background: #7a2c08; cursor: not-allowed; }
        @media (min-width: 768px) {
          .admin-wrap { flex-direction: row; }
          .topnav { display: none; }
          .tab-pills { display: none; }
          .sidebar { display: flex; }
          .main-content { padding: 2rem; }
          .cards-grid { grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
          .overlay { align-items: center; }
          .modal-sheet { border-radius: 16px; margin-bottom: 0; }
          .modal-handle { display: none; }
          .skill-row { flex-direction: row; align-items: center; gap: 12px; }
          .skill-row-top { flex-direction: column; align-items: flex-start; min-width: 130px; gap: 2px; }
          .bar-bg { flex: 1; }
          .skill-actions { margin-top: 0; }
        }
      `}</style>

      <div className="admin-wrap">
        {/* Mobile top nav */}
        <nav className="topnav">
          <span className="topnav-brand">⬡ Portfolio CMS</span>
          <div className="topnav-right">
            <button className="logout-btn" onClick={onLogout}>Lock</button>
            <button className="hamburger" onClick={() => setMenuOpen(true)}>☰</button>
          </div>
        </nav>

        {/* Mobile drawer */}
        {menuOpen && <div className="drawer-overlay" onClick={() => setMenuOpen(false)} />}
        <div className={`drawer ${menuOpen ? "open" : ""}`}>
          <div className="drawer-brand">⬡ Portfolio CMS</div>
          <button className="drawer-close" onClick={() => setMenuOpen(false)}>✕</button>
          {TABS.map(t => (
            <button key={t} className={`nav-item ${tab===t?"active":""}`}
              onClick={() => { setTab(t); setMenuOpen(false); }}>
              <span className="nav-icon">{TAB_ICONS[t]}</span>{TAB_LABELS[t]}
            </button>
          ))}
          <button className="sidebar-logout" onClick={onLogout}>🔒 Lock CMS</button>
        </div>

        {/* Desktop sidebar */}
        <aside className="sidebar">
          <div>
            <div className="sidebar-brand">⬡ Portfolio CMS</div>
            {TABS.map(t => (
              <button key={t} className={`nav-item ${tab===t?"active":""}`} onClick={() => setTab(t)}>
                <span className="nav-icon">{TAB_ICONS[t]}</span>{TAB_LABELS[t]}
              </button>
            ))}
          </div>
          <button className="sidebar-logout" onClick={onLogout}>🔒 Lock CMS</button>
        </aside>

        {/* Main */}
        <main className="main-content">
          <div className="tab-pills">
            {TABS.map(t => (
              <button key={t} className={`tab-pill ${tab===t?"active":""}`} onClick={() => setTab(t)}>
                {TAB_ICONS[t]} {TAB_LABELS[t]}
              </button>
            ))}
          </div>

          <div className="page-header">
            <h1 className="page-title">{TAB_LABELS[tab]}</h1>
            <button className="add-btn" onClick={() => openAdd(tab)}>+ Add item</button>
          </div>

          {["webProjects","seoProjects","designProjects"].includes(tab) && (
            <div className="cards-grid">
              {items.map(p => (
                <div key={p.id} className="card">
                  {p.image && <img src={p.image} alt={p.title} className="card-img" />}
                  <div className="card-tag">{p.stack || tab.replace("Projects","")}</div>
                  <div className="card-title">{p.title}</div>
                  <div className="card-desc">{p.description}</div>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="card-link">{p.link}</a>}
                  <div className="card-actions">
                    <button className="icon-btn" onClick={() => openEdit(tab, p)}>Edit</button>
                    <button className="icon-btn del" onClick={() => handleDelete(tab, p.id)}>Delete</button>
                  </div>
                </div>
              ))}
              {items.length === 0 && <div className="empty">No items yet.</div>}
            </div>
          )}

          {tab === "skills" && (
            <div>
              {items.map(s => (
                <div key={s.id} className="skill-row">
                  <div className="skill-row-top">
                    <span className="skill-name">{s.name}</span>
                    <span className="skill-cat">{s.category}</span>
                  </div>
                  <div className="bar-bg"><div className="bar-fill" style={{ width:`${s.level}%` }} /></div>
                  <span className="skill-pct">{s.level}%</span>
                  <div className="skill-actions">
                    <button className="icon-btn" onClick={() => openEdit("skills", s)}>Edit</button>
                    <button className="icon-btn del" onClick={() => handleDelete("skills", s.id)}>Del</button>
                  </div>
                </div>
              ))}
              {items.length === 0 && <div className="empty">No skills yet.</div>}
            </div>
          )}

          {tab === "blog" && (
            <div>
              {items.map(b => (
                <div key={b.id} className="blog-row">
                  <div className="blog-meta">
                    <span className="blog-date">{b.date}</span>
                    <span className={b.status==="live"?"badge-live":"badge-draft"}>{b.status||"draft"}</span>
                  </div>
                  <div className="blog-title">{b.title}</div>
                  <div className="blog-excerpt">{b.excerpt}</div>
                  <div className="card-actions">
                    <button className="icon-btn" onClick={() => openEdit("blog", b)}>Edit</button>
                    <button className="icon-btn del" onClick={() => handleDelete("blog", b.id)}>Delete</button>
                    <button className="icon-btn" onClick={() => togglePublish(b)}>
                      {b.status==="live" ? "Unpublish" : "Publish"}
                    </button>
                  </div>
                </div>
              ))}
              {items.length === 0 && <div className="empty">No posts yet.</div>}
            </div>
          )}
        </main>

        {modal && (
          <div className="overlay" onClick={closeModal}>
            <div className="modal-sheet" onClick={e => e.stopPropagation()}>
              <div className="modal-handle" />
              <div className="modal-title">{modal.item ? "Edit" : "Add"} — {TAB_LABELS[modal.type]}</div>

              {["webProjects","designProjects"].includes(modal.type) && <>
                <Field label="Title"       input={<input className="form-input" {...f("title")} />} />
                <Field label="Description" input={<textarea className="form-input" style={{ height:70 }} {...f("description")} />} />
                {modal.type === "designProjects" ? (
                  <div className="form-group">
                    <label className="form-label">Image — tap to upload from gallery</label>
                    <div className="upload-zone">
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImagePick} />
                      {previewUrl
                        ? <img src={previewUrl} alt="preview" className="upload-preview" />
                        : <div className="upload-label">📷 <span>Choose image</span> from gallery</div>
                      }
                      {uploading && <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width:`${uploadProgress}%` }} /></div>}
                      {uploading && <p style={{ fontSize:11, color:"#a8a8a8", marginTop:6 }}>Uploading... {uploadProgress}%</p>}
                      {!uploading && uploadProgress===100 && <p style={{ fontSize:11, color:"#86efac", marginTop:6 }}>✓ Upload complete</p>}
                    </div>
                  </div>
                ) : (
                  <Field label="Image path (e.g. /portfolio.png)" input={<input className="form-input" {...f("image")} />} />
                )}
                <Field label="Live URL" input={<input className="form-input" {...f("link")} />} />
                {modal.type === "webProjects" &&
                  <Field label="Tech stack" input={<input className="form-input" {...f("stack")} />} />
                }
              </>}

              {modal.type === "seoProjects" && <>
                <Field label="Title"       input={<input className="form-input" {...f("title")} />} />
                <Field label="Description" input={<textarea className="form-input" style={{ height:60 }} {...f("description")} />} />
                <Field label="Image path"  input={<input className="form-input" {...f("image")} />} />
                <Field label="Live URL"    input={<input className="form-input" {...f("link")} />} />
                <Field label="Site name"   input={<input className="form-input" {...f("siteName")} />} />
                <Field label="Stats JSON"
                  input={<textarea className="form-input" style={{ height:120, fontFamily:"monospace", fontSize:11 }}
                    value={form.statsRaw ?? (form.stats ? JSON.stringify(form.stats, null, 2) : "")}
                    onChange={e => setForm(p => ({ ...p, statsRaw: e.target.value }))}
                  />}
                />
              </>}

              {modal.type === "skills" && <>
                <Field label="Skill name"          input={<input className="form-input" {...f("name")} />} />
                <Field label="Proficiency (0–100)" input={<input className="form-input" type="number" min="0" max="100" {...f("level")} />} />
                <Field label="Category"            input={<input className="form-input" {...f("category")} />} />
              </>}

              {modal.type === "blog" && <>
                <Field label="Title"   input={<input className="form-input" {...f("title")} />} />
                <Field label="Excerpt" input={<textarea className="form-input" style={{ height:60 }} {...f("excerpt")} />} />
                <Field label="Content" input={<textarea className="form-input" style={{ height:120 }} {...f("content")} />} />
                <Field label="Date"    input={<input className="form-input" {...f("date")} />} />
              </>}

              <div className="modal-actions">
                <button className="btn-cancel" onClick={closeModal}>Cancel</button>
                <button className="btn-save" onClick={handleSave} disabled={uploading}>
                  {uploading ? `Uploading ${uploadProgress}%...` : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function Field({ label, input }) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {input}
    </div>
  );
}