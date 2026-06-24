/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance, { getImageUrl } from "../api/Api";
import Navbar from "./Navbar";
import Footer from "./Footer";

/* ══════════════════════════════════════════════
   CINEMATIC MODAL
══════════════════════════════════════════════ */
export function CollabModal({ item, onClose }) {
  const images = [item.image].filter(Boolean).map(
    (src) => getImageUrl(src)
  );

  const total = images.length;
  const [activeIdx, setActiveIdx] = useState(0);
  const [animDir, setAnimDir]     = useState(null);
  const [isAnim,  setIsAnim]      = useState(false);
  const [mouse,   setMouse]       = useState({ x: 0, y: 0 });
  const sceneRef  = useRef(null);
  const timerRef  = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const goTo = useCallback((idx, dir) => {
    if (isAnim || idx === activeIdx || total <= 1) return;
    setAnimDir(dir);
    setIsAnim(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveIdx(idx);
      setIsAnim(false);
      setAnimDir(null);
    }, 480);
  }, [isAnim, activeIdx, total]);

  const onMouseMove = useCallback((e) => {
    const r = sceneRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: ((e.clientX - r.left) / r.width  - 0.5) * 2,
      y: ((e.clientY - r.top)  / r.height - 0.5) * 2,
    });
  }, []);

  const stackStyle = (offset) => ({
    transform: `
      perspective(1200px)
      translateY(${offset * -26}px)
      translateZ(${offset * -55}px)
      scale(${1 - offset * 0.055})
      rotateX(${offset === 0 ? mouse.y * -5 : 0}deg)
      rotateY(${offset === 0 ? mouse.x *  5 : 0}deg)
    `,
    opacity:      1 - offset * 0.25,
    zIndex:       20 - offset,
    pointerEvents: offset === 0 ? "auto" : "none",
    transition:   "transform 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.5s cubic-bezier(0.23,1,0.32,1)",
    willChange:   "transform, opacity",
  });

  return (
    <>
      <style>{MODAL_CSS}</style>
      <div
        className="gm-overlay"
        role="dialog" aria-modal="true"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="gm-backdrop" />

        <button className="gm-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="gm-header">
          <span className="gm-badge">Collaboration</span>
          <h2 className="gm-title">{item.title}</h2>
          {item.date && <p className="gm-date">{item.date}</p>}
        </div>

        {images.length > 0 && (
          <div
            className="gm-scene-single"
            ref={sceneRef}
            onMouseMove={onMouseMove}
            onMouseLeave={() => setMouse({ x: 0, y: 0 })}
          >
            <div 
              className="gm-card-inner gm-card-front"
              style={{
                transform: `perspective(1200px) rotateX(${mouse.y * -5}deg) rotateY(${mouse.x * 5}deg)`,
                transition: "transform 0.1s ease-out"
              }}
            >
              <img
                src={images[0]}
                alt={item.title}
                className="gm-card-img-single"
                loading="lazy"
                style={{
                  transform: `scale(1.03) translate(${mouse.x * -4}px, ${mouse.y * -4}px)`,
                  transition: "transform 0.1s ease-out"
                }}
              />
              <div
                className="gm-shimmer"
                style={{
                  background: `radial-gradient(ellipse at ${50 + mouse.x * 30}% ${50 + mouse.y * 30}%,
                    rgba(255,255,255,0.14) 0%, transparent 68%)`,
                }}
              />
            </div>
          </div>
        )}

        {item.description && (
          <div className="gm-desc-wrap">
            <p className="gm-desc">{item.description}</p>
          </div>
        )}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   COLLABORATION CARD
══════════════════════════════════════════════ */
function CollabCard({ item, index, onView }) {
  const [hovered, setHovered] = useState(false);
  const [mouse,   setMouse]   = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef(null);

  const imgSrc = item.image
    ? getImageUrl(item.image)
    : null;

  const onMouseMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const tiltX   = hovered ? (mouse.y - 0.5) * -12 : 0;
  const tiltY   = hovered ? (mouse.x - 0.5) *  12 : 0;
  const shadowX = hovered ? (mouse.x - 0.5) * 30  : 0;
  const shadowY = hovered ? (mouse.y - 0.5) * 20  : 8;

  return (
    <div
      ref={cardRef}
      className="collab-card"
      style={{
        animationDelay: `${index * 120}ms`,
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(${hovered ? -10 : 0}px)`,
        boxShadow: hovered
          ? `${shadowX}px ${shadowY + 20}px 60px -10px rgba(220,38,38,0.22), 0 2px 40px rgba(0,0,0,0.15)`
          : "0 4px 24px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouse({ x: 0.5, y: 0.5 }); }}
      onMouseMove={onMouseMove}
    >
      {/* Image */}
      <div className="collab-img-wrap">
        <div className="collab-img-overlay" />
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={item.title}
            className="collab-img"
            loading="lazy"
            style={{ transform: hovered ? "scale(1.09)" : "scale(1)" }}
          />
        ) : (
          <div className="collab-img-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(220,38,38,0.4)" strokeWidth="1.5" className="w-16 h-16">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        )}
        {hovered && (
          <div
            className="collab-shimmer"
            style={{
              background: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, rgba(255,255,255,0.18) 0%, transparent 65%)`,
            }}
          />
        )}
        <div className="collab-badge">Collaboration</div>
      </div>

      {/* Content */}
      <div className="collab-content">
        {item.date && <div className="collab-date">{item.date}</div>}
        <h3 className="collab-title">{item.title}</h3>
        <p className="collab-desc">{item.description}</p>
        <button
          className="collab-cta"
          onClick={() => onView(item)}
          aria-label={`View ${item.title}`}
        >
          <span>View Details</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN COLLABORATION PAGE
══════════════════════════════════════════════ */
function Collaboration() {
  const [collaborations, setCollaborations] = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [modalItem,      setModalItem]      = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    axiosInstance.get("/v1/collaboration")
      .then(res => setCollaborations(res.data.data || []))
      .catch(err => console.error("Error fetching collaborations:", err))
      .finally(() => setLoading(false));
  }, []);

  const displayData = collaborations;

  return (
    <>
      <style>{CARD_CSS}</style>
      <Navbar />

      {/* Hero — same style as Services */}
      <div className="h-80 relative flex items-center justify-center overflow-hidden">
        <img
          src="/collaboration.png"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Collaboration Banner"
        />
        <div className="absolute text-[#dc2626] text-2xl sm:text-5xl font-train flex flex-col h-full justify-center text-center items-center w-full">
          Collaboration
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl text-[#dc2626] font-bold mb-2">
              Collaboration Made Easy
            </h2>
            <p className="text-gray-500 text-sm">Our global partnerships and collaborations</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="w-10 h-10 border-4 border-[#dc2626] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="collab-grid">
              {displayData.length > 0 ? (
                displayData.map((item, index) => (
                  <CollabCard
                    key={item._id}
                    item={item}
                    index={index}
                    onView={setModalItem}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">No Collaborations Found</h3>
                  <p className="text-gray-500">New collaborations and partnerships will appear here soon.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {modalItem && (
        <CollabModal item={modalItem} onClose={() => setModalItem(null)} />
      )}

      <Footer />
    </>
  );
}

export default Collaboration;

/* ══════════════════════════════════════════════
   CARD CSS
══════════════════════════════════════════════ */
const CARD_CSS = `
.collab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding-bottom: 2.5rem;
}
.collab-card {
  position: relative;
  background: #fff;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  transition: transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s cubic-bezier(0.23,1,0.32,1);
  transform-style: preserve-3d;
  will-change: transform, box-shadow;
  animation: collabFadeIn 0.7s cubic-bezier(0.23,1,0.32,1) both;
}
@keyframes collabFadeIn {
  from { opacity:0; transform: translateY(40px) scale(0.96); }
  to   { opacity:1; transform: translateY(0) scale(1); }
}
.collab-img-wrap {
  position: relative;
  height: 220px;
  overflow: hidden;
  flex-shrink: 0;
}
.collab-img-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.3));
  z-index: 2; pointer-events: none;
}
.collab-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.7s cubic-bezier(0.23,1,0.32,1);
  will-change: transform;
}
.collab-img-placeholder {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #fef2f2, #fff5f5);
  display: flex; align-items: center; justify-content: center;
}
.collab-shimmer {
  position: absolute; inset: 0; z-index: 3;
  pointer-events: none;
}
.collab-badge {
  position: absolute;
  top: 14px; left: 14px; z-index: 10;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: #fff;
  border-radius: 999px;
  padding: 4px 12px;
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.06em; text-transform: uppercase;
}
.collab-content {
  flex: 1;
  padding: 16px 22px 20px;
  position: relative;
  background: #fff;
  z-index: 20;
  display: flex;
  flex-direction: column;
}
.collab-date {
  position: absolute;
  top: -16px; right: 20px;
  background: linear-gradient(135deg, #dc2626, #b91c1c);
  color: #fff;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 12px; font-weight: 700;
  box-shadow: 0 4px 16px rgba(220,38,38,0.32);
}
.collab-title {
  font-size: 1rem;
  font-weight: 800;
  color: #111827;
  margin: 12px 0 8px;
  line-height: 1.35;
  transition: color 0.2s;
}
.collab-card:hover .collab-title { color: #dc2626; }
.collab-desc {
  font-size: 0.8rem;
  color: #6b7280;
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 14px;
  flex: 1;
}
.collab-cta {
  margin-top: auto;
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
  border-left: none; border-right: none; border-bottom: none;
  font-size: 0.82rem; font-weight: 600;
  color: #9ca3af;
  background: none; cursor: pointer; width: 100%;
  transition: color 0.2s;
}
.collab-cta:hover { color: #dc2626; }
.collab-cta svg { transition: transform 0.3s cubic-bezier(0.23,1,0.32,1); flex-shrink: 0; }
.collab-cta:hover svg { transform: translateX(5px); }
@media (max-width: 640px) {
  .collab-grid { grid-template-columns: 1fr; gap: 1.25rem; }
}
`;

/* ══════════════════════════════════════════════
   MODAL CSS
══════════════════════════════════════════════ */
const MODAL_CSS = `
.gm-overlay {
  position: fixed; inset: 0; z-index: 99999;
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start;
  animation: gmFadeIn 0.4s cubic-bezier(0.23,1,0.32,1) both;
  padding: 60px 16px; box-sizing: border-box; overflow-y: auto;
}
@keyframes gmFadeIn { from{opacity:0} to{opacity:1} }
.gm-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.82);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  z-index: 0;
}
.gm-close {
  position: fixed; top: 18px; right: 18px; z-index: 200;
  width: 42px; height: 42px; border-radius: 50%;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.22);
  color: #fff; display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.22s, transform 0.28s;
  backdrop-filter: blur(6px);
}
.gm-close:hover { background: rgba(220,38,38,0.75); transform: rotate(90deg) scale(1.12); }
.gm-close svg { width: 20px; height: 20px; }
.gm-header {
  position: relative; z-index: 10;
  text-align: center; margin-bottom: 20px;
  animation: gmSlideDown 0.5s cubic-bezier(0.23,1,0.32,1) 0.08s both;
  max-width: min(86vw, 650px);
}
@keyframes gmSlideDown { from{opacity:0;transform:translateY(-18px)} to{opacity:1;transform:translateY(0)} }
.gm-badge {
  display: inline-block;
  background: linear-gradient(135deg,#dc2626,#b91c1c);
  color:#fff; border-radius:999px; padding:4px 16px;
  font-size:11px; font-weight:700; letter-spacing:0.1em;
  text-transform:uppercase; margin-bottom:9px;
}
.gm-title {
  color:#fff; font-size:clamp(1rem,3vw,1.7rem);
  font-weight:800; line-height:1.25; margin:0 0 4px;
  text-shadow:0 2px 20px rgba(0,0,0,0.5);
}
.gm-date { color:rgba(255,255,255,0.5); font-size:0.8rem; font-weight:500; }
.gm-scene-single {
  position: relative; z-index: 10;
  width: min(86vw, 650px);
  flex-shrink: 0;
}
.gm-card-inner {
  width:100%; height:100%; border-radius:22px; overflow:hidden;
  position:relative; background:#ffffff;
  box-shadow:0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07);
}
.gm-card-front {
  box-shadow:0 40px 100px rgba(0,0,0,0.75),
             0 0 0 1px rgba(255,255,255,0.13),
             0 0 60px rgba(220,38,38,0.12);
}
.gm-card-img-single { 
  width:100%; height:auto; object-fit:contain; display:block; 
  padding: 24px; box-sizing: border-box; 
}
.gm-shimmer { position:absolute; inset:0; z-index:2; pointer-events:none; border-radius:22px; }
.gm-card-bar {
  position:absolute; bottom:0; left:0; right:0; z-index:5;
  background:linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 100%);
  display:flex; align-items:center; justify-content:space-between;
  padding:30px 18px 14px;
}
.gm-counter { font-size:0.78rem; font-weight:600; color:rgba(255,255,255,0.6);
  background:rgba(0,0,0,0.45); padding:3px 10px; border-radius:999px; }
.gm-card-name { font-size:0.76rem; font-weight:700; color:rgba(255,255,255,0.65);
  max-width:55%; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.gm-desc-wrap {
  position: relative; z-index: 10;
  max-width: min(86vw, 650px);
  background: rgba(255,255,255,0.96);
  border: 1px solid rgba(255,255,255,0.9);
  border-radius: 16px; padding: 18px 22px; margin-top: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  animation: gmSlideDown 0.5s cubic-bezier(0.23,1,0.32,1) 0.18s both;
}
.gm-desc {
  color: #374151; font-size: 0.84rem;
  line-height: 1.75; white-space: pre-line; margin: 0;
}
@media (max-width:640px) {
  .gm-scene{width:93vw;height:70vw;}
  .gm-desc-wrap{max-width:93vw;}
}
@media (min-width:1400px) {
  .gm-scene{width:min(76vw,780px);height:min(56vw,520px);}
}
`;
