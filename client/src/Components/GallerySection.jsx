/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════
   CINEMATIC GALLERY MODAL
   - Fixed fullscreen overlay (position:fixed)
   - Background: dark + heavy blur
   - Card-stack 3D image showcase
══════════════════════════════════════════════ */
export function GalleryModal({ event, onClose }) {
  const images = [event.image, ...(event.thumbnails || [])].filter(Boolean);
  const total = images.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [animDir, setAnimDir]     = useState(null);   // 'next' | 'prev'
  const [isAnim, setIsAnim]       = useState(false);
  const [mouse, setMouse]         = useState({ x: 0, y: 0 });
  const sceneRef = useRef(null);
  const timerRef = useRef(null);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* Escape key to close */
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  /* Go to specific index */
  const goTo = useCallback((idx, dir) => {
    if (isAnim || idx === activeIdx) return;
    setAnimDir(dir);
    setIsAnim(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActiveIdx(idx);
      setIsAnim(false);
      setAnimDir(null);
    }, 480);
  }, [isAnim, activeIdx]);

  const goNext = useCallback(() => goTo((activeIdx + 1) % total, "next"), [activeIdx, total, goTo]);
  const goPrev = useCallback(() => goTo((activeIdx - 1 + total) % total, "prev"), [activeIdx, total, goTo]);

  /* Arrow key navigation */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [goNext, goPrev]);

  /* Mouse parallax */
  const onMouseMove = useCallback((e) => {
    const r = sceneRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({
      x: ((e.clientX - r.left) / r.width  - 0.5) * 2,
      y: ((e.clientY - r.top)  / r.height - 0.5) * 2,
    });
  }, []);

  /* Card stack styles */
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

  const incomingIdx =
    animDir === "next"
      ? (activeIdx + 1) % total
      : (activeIdx - 1 + total) % total;

  return (
    <>
      <style>{MODAL_CSS}</style>

      {/* ── Fullscreen overlay ── */}
      <div
        className="gm-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={`${event.title} Gallery`}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* Blurred dark backdrop */}
        <div className="gm-backdrop" />

        {/* ✕ Close */}
        <button className="gm-close" onClick={onClose} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Header */}
        <div className="gm-header">
          <span className="gm-badge">{event.location}</span>
          <h2 className="gm-title">{event.title}</h2>
          <p  className="gm-date">{event.date} · {event.location}</p>
        </div>

        {/* ── 3-D Card Stack Scene ── */}
        <div
          className="gm-scene"
          ref={sceneRef}
          onMouseMove={onMouseMove}
          onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        >
          {/* Stack layers (rendered back → front) */}
          {[2, 1, 0].map((offset) => {
            const imgIdx  = (activeIdx + offset) % total;
            const isActive = offset === 0;
            return (
              <div
                key={`layer-${offset}`}
                className={`gm-card-layer${isActive && isAnim ? ` gm-exit-${animDir}` : ""}`}
                style={stackStyle(offset)}
              >
                <div className={`gm-card-inner${isActive ? " gm-card-front" : ""}`}>
                  <img
                    src={images[imgIdx]}
                    alt={`${event.title} ${imgIdx + 1}`}
                    className="gm-card-img"
                    loading="lazy"
                    style={{
                      transform: isActive
                        ? `scale(1.07) translate(${mouse.x * -9}px, ${mouse.y * -9}px)`
                        : "scale(1)",
                    }}
                  />
                  {/* Glass shimmer */}
                  <div
                    className="gm-shimmer"
                    style={isActive ? {
                      background: `radial-gradient(ellipse at ${50 + mouse.x * 30}% ${50 + mouse.y * 30}%,
                        rgba(255,255,255,0.14) 0%, transparent 68%)`,
                    } : {}}
                  />
                  {/* Bottom bar */}
                  {isActive && (
                    <div className="gm-card-bar">
                      <span className="gm-counter">{activeIdx + 1} / {total}</span>
                      <span className="gm-card-name">{event.title}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Incoming card during transition */}
          {isAnim && (
            <div
              className={`gm-card-layer gm-enter-${animDir}`}
              style={{ position: "absolute", inset: 0, zIndex: 25 }}
            >
              <div className="gm-card-inner gm-card-front">
                <img
                  src={images[incomingIdx]}
                  alt={event.title}
                  className="gm-card-img"
                  loading="lazy"
                />
                <div className="gm-shimmer" />
                <div className="gm-card-bar">
                  <span className="gm-counter">{incomingIdx + 1} / {total}</span>
                  <span className="gm-card-name">{event.title}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Navigation row ── */}
        <div className="gm-nav">
          <button className="gm-nav-btn" onClick={goPrev} disabled={isAnim} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="gm-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`gm-dot${i === activeIdx ? " gm-dot-on" : ""}`}
                onClick={() => goTo(i, i > activeIdx ? "next" : "prev")}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>

          <button className="gm-nav-btn" onClick={goNext} disabled={isAnim} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* ── Thumbnail strip ── */}
        <div className="gm-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={`gm-thumb${i === activeIdx ? " gm-thumb-on" : ""}`}
              onClick={() => goTo(i, i > activeIdx ? "next" : "prev")}
              aria-label={`Photo ${i + 1}`}
            >
              <img src={img} alt={`thumb ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════
   GALLERY SECTION  (main export)
   Keeps the EXACT same card layout as before,
   only adds the modal trigger on "View Gallery"
══════════════════════════════════════════════ */
export default function GallerySection({ events = [] }) {
  const [modalEvent, setModalEvent] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-10 overflow-hidden px-2 pt-4">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 animate-slide-in-left border border-gray-100 flex flex-col"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Main Image */}
            <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                {event.location}
              </div>
            </div>

            {/* Thumbnails Row */}
            <div className="px-6 -mt-6 sm:-mt-8 relative z-20 flex gap-2">
              {event.thumbnails.slice(0, 3).map((thumb, tIdx) => (
                <div key={tIdx} className="flex-1 h-12 sm:h-16 rounded-xl overflow-hidden border-2 border-white shadow-md bg-gray-100 relative group/thumb">
                  <img src={thumb} alt="thumbnail" className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300" />
                </div>
              ))}
              {/* Fill empty slots if less than 3 thumbnails */}
              {Array.from({ length: Math.max(0, 3 - event.thumbnails.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-1 h-12 sm:h-16 rounded-xl border-2 border-white shadow-md bg-gray-50" />
              ))}
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6 pt-3 sm:pt-4 flex flex-col flex-grow relative bg-white z-20">
              <div className="absolute -top-10 sm:-top-12 right-6 bg-[#dc2626] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl shadow-lg font-bold text-xs sm:text-sm">
                {event.date}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#dc2626] transition-colors duration-300 pr-16 sm:pr-20">
                {event.title}
              </h3>
              <div className="mb-4 sm:mb-6">
                <p className={`text-gray-500 text-xs sm:text-sm leading-relaxed ${expandedCards[event.id] ? '' : 'line-clamp-3'}`}>
                  {event.description}
                </p>
                <button 
                  onClick={() => toggleExpand(event.id)}
                  className="text-[#dc2626] text-xs sm:text-sm font-semibold mt-1 hover:underline text-left cursor-pointer"
                >
                  {expandedCards[event.id] ? 'Show less' : 'Read more'}
                </button>
              </div>

              {/* VIEW GALLERY BUTTON */}
              <button
                className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm font-medium text-gray-400 hover:text-[#dc2626] transition-colors duration-300 w-full bg-transparent cursor-pointer outline-none"
                onClick={() => setModalEvent(event)}
                aria-label={`View gallery for ${event.title}`}
              >
                <span>View Gallery ({event.thumbnails.length + 1} photos)</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-2 transition-transform duration-300"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal renders here */}
      {modalEvent && (
        <GalleryModal event={modalEvent} onClose={() => setModalEvent(null)} />
      )}
    </>
  );
}

/* ══════════════════════════════════════════════
   ALL MODAL CSS  (self-contained in <style>)
══════════════════════════════════════════════ */
const MODAL_CSS = `
/* ── Overlay (fixed, covers everything) ── */
.gm-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  animation: gmFadeIn 0.4s cubic-bezier(0.23,1,0.32,1) both;
  padding: 60px 16px;
  box-sizing: border-box;
  overflow-y: auto;
}
@keyframes gmFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* ── Blurred dark backdrop ── */
.gm-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.80);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  z-index: 0;
}

/* ── Close button ── */
.gm-close {
  position: fixed;
  top: 18px; right: 18px;
  z-index: 200;
  width: 42px; height: 42px;
  border-radius: 50%;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.22);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.22s, transform 0.28s;
  backdrop-filter: blur(6px);
}
.gm-close:hover {
  background: rgba(220,38,38,0.75);
  transform: rotate(90deg) scale(1.12);
}
.gm-close svg { width: 20px; height: 20px; }

/* ── Header ── */
.gm-header {
  position: relative; z-index: 10;
  text-align: center;
  margin-bottom: 20px;
  animation: gmSlideDown 0.5s cubic-bezier(0.23,1,0.32,1) 0.08s both;
}
@keyframes gmSlideDown {
  from { opacity:0; transform: translateY(-18px); }
  to   { opacity:1; transform: translateY(0); }
}
.gm-badge {
  display: inline-block;
  background: linear-gradient(135deg,#dc2626,#b91c1c);
  color: #fff;
  border-radius: 999px;
  padding: 4px 16px;
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  margin-bottom: 9px;
}
.gm-title {
  color: #fff;
  font-size: clamp(1.3rem, 4vw, 2rem);
  font-weight: 800; line-height: 1.2;
  margin: 0 0 4px;
  text-shadow: 0 2px 20px rgba(0,0,0,0.5);
}
.gm-date {
  color: rgba(255,255,255,0.5);
  font-size: 0.8rem; font-weight: 500;
  letter-spacing: 0.03em;
}

/* ── 3-D Scene container ── */
.gm-scene {
  position: relative;
  z-index: 10;
  width: min(86vw, 650px);
  height: min(63vw, 450px);
}

/* ── Each card layer ── */
.gm-card-layer {
  position: absolute;
  inset: 0;
  transform-origin: center bottom;
}
.gm-card-inner {
  width: 100%; height: 100%;
  border-radius: 22px;
  overflow: hidden;
  position: relative;
  background: #0a0a0a;
  box-shadow: 0 28px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07);
}
.gm-card-front {
  box-shadow: 0 40px 100px rgba(0,0,0,0.75),
              0 0 0 1px rgba(255,255,255,0.13),
              0 0 60px rgba(220,38,38,0.12);
}
.gm-card-img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
  transition: transform 0.45s cubic-bezier(0.23,1,0.32,1);
  will-change: transform;
}
.gm-shimmer {
  position: absolute; inset: 0; z-index: 2;
  pointer-events: none; border-radius: 22px;
  transition: background 0.12s;
}
.gm-card-bar {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 5;
  background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%);
  display: flex; align-items: center; justify-content: space-between;
  padding: 30px 18px 14px;
}
.gm-counter {
  font-size: 0.78rem; font-weight: 600;
  color: rgba(255,255,255,0.6);
  background: rgba(0,0,0,0.45);
  padding: 3px 10px; border-radius: 999px;
}
.gm-card-name {
  font-size: 0.76rem; font-weight: 700;
  color: rgba(255,255,255,0.65);
  max-width: 55%; overflow: hidden;
  white-space: nowrap; text-overflow: ellipsis;
}

/* ── Enter / Exit keyframes ── */
@keyframes gmEnterNext {
  from { opacity:0; transform: perspective(1200px) translateY(110px) translateZ(70px) rotateX(10deg) scale(0.88); }
  to   { opacity:1; transform: perspective(1200px) translateY(0) translateZ(0) rotateX(0) scale(1); }
}
@keyframes gmExitNext {
  from { opacity:1; transform: perspective(1200px) scale(1); }
  to   { opacity:0; transform: perspective(1200px) translateY(-55px) translateZ(-75px) scale(0.87) rotateX(-6deg); }
}
@keyframes gmEnterPrev {
  from { opacity:0; transform: perspective(1200px) translateY(-110px) translateZ(70px) rotateX(-10deg) scale(0.88); }
  to   { opacity:1; transform: perspective(1200px) translateY(0) translateZ(0) rotateX(0) scale(1); }
}
@keyframes gmExitPrev {
  from { opacity:1; transform: perspective(1200px) scale(1); }
  to   { opacity:0; transform: perspective(1200px) translateY(55px) translateZ(-75px) scale(0.87) rotateX(6deg); }
}
.gm-enter-next { animation: gmEnterNext 0.5s cubic-bezier(0.23,1,0.32,1) both; }
.gm-exit-next  { animation: gmExitNext  0.42s cubic-bezier(0.55,0,1,0.45) both; }
.gm-enter-prev { animation: gmEnterPrev 0.5s cubic-bezier(0.23,1,0.32,1) both; }
.gm-exit-prev  { animation: gmExitPrev  0.42s cubic-bezier(0.55,0,1,0.45) both; }

/* ── Navigation row ── */
.gm-nav {
  position: relative; z-index: 10;
  display: flex; align-items: center; gap: 18px;
  margin-top: 20px;
  animation: gmSlideUp 0.5s cubic-bezier(0.23,1,0.32,1) 0.12s both;
}
@keyframes gmSlideUp {
  from { opacity:0; transform: translateY(18px); }
  to   { opacity:1; transform: translateY(0); }
}
.gm-nav-btn {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.20);
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: background 0.2s, transform 0.2s, border-color 0.2s;
}
.gm-nav-btn:hover:not(:disabled) {
  background: rgba(220,38,38,0.72);
  border-color: rgba(220,38,38,0.45);
  transform: scale(1.1);
}
.gm-nav-btn:disabled { opacity: 0.35; cursor: default; }
.gm-nav-btn svg { width: 20px; height: 20px; }

/* Dot indicators */
.gm-dots { display: flex; align-items: center; gap: 7px; }
.gm-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.28);
  border: none; cursor: pointer; padding: 0;
  transition: background 0.22s, width 0.32s cubic-bezier(0.23,1,0.32,1);
}
.gm-dot-on {
  background: #dc2626;
  width: 26px;
  border-radius: 999px;
}

/* ── Thumbnail strip ── */
.gm-thumbs {
  position: relative; z-index: 10;
  display: flex; gap: 9px;
  margin-top: 14px;
  max-width: min(90vw, 680px);
  overflow-x: auto;
  padding-bottom: 4px;
  animation: gmSlideUp 0.5s cubic-bezier(0.23,1,0.32,1) 0.18s both;
}
.gm-thumbs::-webkit-scrollbar { display: none; }
.gm-thumb {
  width: 66px; height: 50px;
  border-radius: 12px; overflow: hidden;
  flex-shrink: 0;
  border: 2px solid transparent;
  background: rgba(255,255,255,0.08);
  cursor: pointer; padding: 0;
  transition: border-color 0.22s, transform 0.22s;
}
.gm-thumb img { width:100%; height:100%; object-fit:cover; display:block; transition: transform 0.3s; }
.gm-thumb:hover { transform: scale(1.07); }
.gm-thumb:hover img { transform: scale(1.1); }
.gm-thumb-on {
  border-color: #dc2626 !important;
  transform: scale(1.09);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.28), 0 6px 18px rgba(0,0,0,0.45);
}

/* ── Responsive ── */
@media (max-width: 640px) {
  .gm-scene  { width: 93vw; height: 70vw; }
  .gm-thumbs { max-width: 93vw; }
  .gm-thumb  { width: 54px; height: 40px; }
  .gm-header { margin-bottom: 12px; }
}
@media (min-width: 1400px) {
  .gm-scene { width: min(76vw, 780px); height: min(56vw, 540px); }
}
`;
