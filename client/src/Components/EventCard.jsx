import "./EventCard.css";
import PropTypes from "prop-types";
import { resolveImageUrl } from "../api/events";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const tagClass = (category) => `tag-${category.replace(/\s+/g, "")}`;

export default function EventCard({ event, onOpen }) {
  const photoCount = event.images?.length || 0;

  return (
    <button className="event-card" onClick={() => onOpen(event)}>
      <span className="tape" aria-hidden="true" />
      <div className="event-photo">
        <img src={resolveImageUrl(event.coverImage)} alt={event.title} loading="lazy" />
        {photoCount > 0 && <span className="photo-badge">{photoCount} photos</span>}
      </div>
      <div className="event-info">
        <span className={`category-tag ${tagClass(event.category)}`}>{event.category}</span>
        <h3 className="event-title">{event.title}</h3>
        <p className="event-meta">
          {formatDate(event.date)}
          {event.location ? ` · ${event.location}` : ""}
        </p>
      </div>
    </button>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    images: PropTypes.array,
    coverImage: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    location: PropTypes.string,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
};
