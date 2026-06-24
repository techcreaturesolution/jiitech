import "./BulletinHero.css";
import { resolveImageUrl } from "../api/events";
import PropTypes from "prop-types";

export default function BulletinHero({ events }) {
  const pinned = events.slice(0, 4);
  const photoCount = events.reduce((sum, e) => sum + (e.images?.length || 1), 0);

  return (
    <header className="hero">
      <div className="hero-cork">
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">— the noticeboard —</p>
            <h1 className="hero-title">SCHOOL EVENTS BOARD</h1>
            <p className="hero-sub">
              Every sports day, fest, and field trip, pinned up for the whole school to relive.
            </p>
            {events.length > 0 && (
              <p className="hero-count">
                {photoCount} photos pinned across {events.length} events
              </p>
            )}
          </div>

          <div className="hero-pins">
            {pinned.map((ev, i) => (
              <figure className={`pin pin-${i}`} key={ev._id}>
                <span className="pin-dot" aria-hidden="true" />
                <img src={resolveImageUrl(ev.coverImage)} alt={ev.title} />
                <figcaption>{ev.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

BulletinHero.propTypes = {
  events: PropTypes.array.isRequired,
};
