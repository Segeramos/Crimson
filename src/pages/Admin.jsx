// src/pages/Admin.jsx
// Add to App.jsx routes: <Route path="/admin" element={<Admin />} />

import { useEffect, useState } from "react";
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, orderBy, query, serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const TABS = ["webProjects", "seoProjects", "designProjects", "skills", "blog"];

const TAB_LABELS = {
  webProjects:    "Web Projects",
  seoProjects:    "SEO Projects",
  designProjects: "Design Projects",
  skills:         "Skills",
  blog:           "Blog Posts",
};

export default function Admin() {
  const [tab, setTab]   = useState("webProjects");
  const [data, setData] = useState({ webProjects: [], seoProjects: [], designProjects: [], skills: [], blog: [] });
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({});

  useEffect(() => {
    const unsubs = TABS.map(col => {
      const q = query(collection(db, col), orderBy("createdAt", "desc"));
      return onSnapshot(q, snap => {
        setData(prev => ({ ...prev, [col]: snap.docs.map(d => ({ id: d.id, ...d.data() })) }));
      });
    });
    return () => unsubs.forEach(u => u());
  }, []);

  const openAdd  = type => { setForm({}); setModal({ type }); };
  const openEdit = (type, item) => { setForm({ ...item }); setModal({ type, item }); };
  const closeModal = () => { setModal(null); setForm({}); };

  const handleSave = async () => {
    const { type, item } = modal;
    const payload = { ...form };
    if (type === "blog" && !payload.status) payload.status = "draft";

    // Parse level as number for skills
    if (type === "skills" && payload.level) payload.level = parseInt(payload.level);

    // Parse nested stats JSON for SEO projects
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
    <div style={{ minHeight:"100vh", background:"#0a0a0a", color:"#fed7aa", display:"flex" }}>

      {/* Sidebar */}
      <aside style={{ width:200, background:"#0f0f0f", padding:"1.5rem 1rem", borderRight:"1px solid #1f1f1f", flexShrink:0 }}>
        <div style={{ color:"#f97316", fontWeight:600, fontSize:15, marginBottom:"1.5rem" }}>⬡ Portfolio CMS</div>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            display:"block", width:"100%", textAlign:"left",
            padding:"8px 12px", borderRadius:8, border:"none",
            background: tab===t ? "#1f1f1f" : "transparent",
            color: tab===t ? "#f97316" : "#a8a8a8",
            cursor:"pointer", fontSize:13, marginBottom:4,
          }}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </aside>

      {/* Main */}
      <main style={{ flex:1, padding:"2rem", overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1.5rem" }}>
          <h1 style={{ fontSize:20, fontWeight:600 }}>{TAB_LABELS[tab]}</h1>
          <button onClick={() => openAdd(tab)} style={S.addBtn}>+ Add item</button>
        </div>

        {/* Project / Design cards grid */}
        {["webProjects","seoProjects","designProjects"].includes(tab) && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:16 }}>
            {items.map(p => (
              <div key={p.id} style={S.card}>
                {p.image && <img src={p.image} alt={p.title} style={{ width:"100%", height:120, objectFit:"cover", borderRadius:8, marginBottom:10 }} />}
                <div style={S.tag}>{p.stack || tab.replace("Projects","")}</div>
                <div style={S.cardTitle}>{p.title}</div>
                <div style={S.cardDesc}>{p.description}</div>
                {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize:11, color:"#f97316", marginTop:4, display:"block" }}>{p.link}</a>}
                <div style={S.actions}>
                  <button style={S.iconBtn} onClick={() => openEdit(tab, p)}>Edit</button>
                  <button style={{ ...S.iconBtn, ...S.del }} onClick={() => handleDelete(tab, p.id)}>Delete</button>
                </div>
              </div>
            ))}
            {items.length === 0 && <div style={S.empty}>No items yet.</div>}
          </div>
        )}

        {/* Skills */}
        {tab === "skills" && (
          <div>
            {items.map(s => (
              <div key={s.id} style={S.skillRow}>
                <span style={{ minWidth:130, fontSize:14 }}>{s.name}</span>
                <span style={{ fontSize:12, color:"#888", minWidth:80 }}>{s.category}</span>
                <div style={S.barBg}><div style={{ ...S.bar, width:`${s.level}%` }} /></div>
                <span style={{ fontSize:12, color:"#a8a8a8", minWidth:40, textAlign:"right" }}>{s.level}%</span>
                <button style={{ ...S.iconBtn, marginLeft:8 }} onClick={() => openEdit("skills", s)}>Edit</button>
                <button style={{ ...S.iconBtn, ...S.del }} onClick={() => handleDelete("skills", s.id)}>Del</button>
              </div>
            ))}
            {items.length === 0 && <div style={S.empty}>No skills yet.</div>}
          </div>
        )}

        {/* Blog */}
        {tab === "blog" && (
          <div>
            {items.map(b => (
              <div key={b.id} style={S.blogRow}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontSize:11, color:"#666" }}>{b.date}</span>
                  <span style={b.status==="live" ? S.live : S.draft}>{b.status||"draft"}</span>
                </div>
                <div style={S.cardTitle}>{b.title}</div>
                <div style={S.cardDesc}>{b.excerpt}</div>
                <div style={S.actions}>
                  <button style={S.iconBtn} onClick={() => openEdit("blog", b)}>Edit</button>
                  <button style={{ ...S.iconBtn, ...S.del }} onClick={() => handleDelete("blog", b.id)}>Delete</button>
                  <button style={S.iconBtn} onClick={() => togglePublish(b)}>
                    {b.status === "live" ? "Unpublish" : "Publish"}
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && <div style={S.empty}>No posts yet.</div>}
          </div>
        )}
      </main>

      {/* Modal */}
      {modal && (
        <div style={S.overlay} onClick={closeModal}>
          <div style={S.modalBox} onClick={e => e.stopPropagation()}>
            <div style={S.modalTitle}>{modal.item ? "Edit" : "Add"} — {TAB_LABELS[modal.type]}</div>

            {/* Web & Design project fields */}
            {["webProjects","designProjects"].includes(modal.type) && <>
              <Field label="Title"            input={<input style={S.input} {...f("title")} />} />
              <Field label="Description"      input={<textarea style={{ ...S.input, height:70 }} {...f("description")} />} />
              <Field label="Image path (e.g. /portfolio.png)" input={<input style={S.input} {...f("image")} />} />
              <Field label="Live URL"         input={<input style={S.input} {...f("link")} />} />
              {modal.type === "webProjects" &&
                <Field label="Tech stack"     input={<input style={S.input} {...f("stack")} />} />
              }
            </>}

            {/* SEO project fields */}
            {modal.type === "seoProjects" && <>
              <Field label="Title"            input={<input style={S.input} {...f("title")} />} />
              <Field label="Description"      input={<textarea style={{ ...S.input, height:60 }} {...f("description")} />} />
              <Field label="Image path"       input={<input style={S.input} {...f("image")} />} />
              <Field label="Live URL"         input={<input style={S.input} {...f("link")} />} />
              <Field label="Site name"        input={<input style={S.input} {...f("siteName")} />} />
              <Field
                label='Stats JSON (paste the stats object, e.g. {"visits":{"value":"5.5K","change":"+95%","devices":{"desktop":"40%","mobile":"60%"}},...})'
                input={<textarea style={{ ...S.input, height:120, fontFamily:"monospace", fontSize:11 }}
                  value={form.statsRaw ?? (form.stats ? JSON.stringify(form.stats, null, 2) : "")}
                  onChange={e => setForm(p => ({ ...p, statsRaw: e.target.value }))}
                />}
              />
            </>}

            {/* Skills fields */}
            {modal.type === "skills" && <>
              <Field label="Skill name"           input={<input style={S.input} {...f("name")} />} />
              <Field label="Proficiency (0–100)"  input={<input style={S.input} type="number" min="0" max="100" {...f("level")} />} />
              <Field label="Category (e.g. Frontend, SEO)" input={<input style={S.input} {...f("category")} />} />
            </>}

            {/* Blog fields */}
            {modal.type === "blog" && <>
              <Field label="Title"    input={<input style={S.input} {...f("title")} />} />
              <Field label="Excerpt"  input={<textarea style={{ ...S.input, height:60 }} {...f("excerpt")} />} />
              <Field label="Content"  input={<textarea style={{ ...S.input, height:120 }} {...f("content")} />} />
              <Field label="Date"     input={<input style={S.input} {...f("date")} />} />
            </>}

            <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginTop:16 }}>
              <button style={S.cancelBtn} onClick={closeModal}>Cancel</button>
              <button style={S.saveBtn}   onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, input }) {
  return (
    <div style={{ marginBottom:12 }}>
      <label style={{ fontSize:12, color:"#a8a8a8", display:"block", marginBottom:4 }}>{label}</label>
      {input}
    </div>
  );
}

const S = {
  addBtn:    { background:"#c2410c", color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:600, cursor:"pointer" },
  card:      { background:"#141414", border:"1px solid #1f1f1f", borderRadius:12, padding:"1rem 1.25rem" },
  tag:       { fontSize:11, color:"#f97316", fontWeight:600, marginBottom:6, textTransform:"capitalize" },
  cardTitle: { fontSize:15, fontWeight:600, marginBottom:6, color:"#fed7aa" },
  cardDesc:  { fontSize:12, color:"#888", lineHeight:1.5 },
  actions:   { display:"flex", gap:8, marginTop:12 },
  iconBtn:   { border:"1px solid #2a2a2a", borderRadius:6, background:"transparent", color:"#a8a8a8", fontSize:12, padding:"4px 10px", cursor:"pointer" },
  del:       { color:"#dc2626" },
  skillRow:  { display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:"1px solid #1a1a1a" },
  barBg:     { flex:1, height:6, background:"#1f1f1f", borderRadius:4 },
  bar:       { height:6, background:"#c2410c", borderRadius:4 },
  blogRow:   { background:"#141414", border:"1px solid #1f1f1f", borderRadius:10, padding:"1rem 1.25rem", marginBottom:10 },
  live:      { fontSize:10, background:"#14532d", color:"#86efac", padding:"2px 7px", borderRadius:20 },
  draft:     { fontSize:10, background:"#713f12", color:"#fde68a", padding:"2px 7px", borderRadius:20 },
  empty:     { color:"#555", fontSize:13, padding:"2rem 0" },
  overlay:   { position:"fixed", inset:0, background:"rgba(0,0,0,0.65)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 },
  modalBox:  { background:"#141414", border:"1px solid #2a2a2a", borderRadius:14, padding:"1.75rem", width:480, maxWidth:"94vw", maxHeight:"90vh", overflowY:"auto" },
  modalTitle:{ fontSize:16, fontWeight:600, marginBottom:"1.25rem", color:"#fed7aa" },
  input:     { width:"100%", padding:"8px 10px", borderRadius:8, fontSize:13, border:"1px solid #2a2a2a", background:"#0f0f0f", color:"#fed7aa", outline:"none", resize:"vertical", boxSizing:"border-box" },
  cancelBtn: { border:"1px solid #2a2a2a", background:"transparent", color:"#a8a8a8", borderRadius:8, padding:"8px 16px", fontSize:13, cursor:"pointer" },
  saveBtn:   { background:"#c2410c", color:"#fff", border:"none", borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:600, cursor:"pointer" },
};