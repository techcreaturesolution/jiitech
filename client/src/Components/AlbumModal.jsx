import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./AlbumModal.css";
import { resolveImageUrl } from "../api/events";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default function AlbumModal({ event, onClose }) {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        activeIndex !== null ? setActiveIndex(null) : onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, onClose]);

  if (!event) return null;

  const images = event.images?.length ? event.images : [{ url: event.coverImage, caption: "" }];

  return (
    <div className="album-overlay" onClick={onClose}>
      <div className="album-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="album-close" onClick={onClose} aria-label="Close album">
          ×
        </button>

        <div className="album-header">
          <h2>{event.title}</h2>
          <p>
            {formatDate(event.date)}
            {event.location ? ` · ${event.location}` : ""}
          </p>
          {event.description && <p className="album-desc">{event.description}</p>}
        </div>

        <div className="album-grid">
          {images.map((img, i) => (
            <figure className="album-item" key={i} onClick={() => setActiveIndex(i)}>
              <img src={resolveImageUrl(img.url)} alt={img.caption || event.title} loading="lazy" />
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <div className="lightbox" onClick={() => setActiveIndex(null)}>
          <img src={resolveImageUrl(images[activeIndex].url)} alt={images[activeIndex].caption || event.title} />
          {images[activeIndex].caption && <p className="lightbox-caption">{images[activeIndex].caption}</p>}
        </div>
      )}
    </div>
  );
}

AlbumModal.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    location: PropTypes.string,
    description: PropTypes.string,
    coverImage: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        caption: PropTypes.string,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
};
