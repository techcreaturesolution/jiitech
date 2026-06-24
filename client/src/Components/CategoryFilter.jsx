import PropTypes from "prop-types";
import "./CategoryFilter.css";

const CATEGORIES = ["All", "Sports", "Cultural", "Academic", "Annual Day", "Field Trip", "Other"];

export default function CategoryFilter({ active, onChange }) {
  return (
    <nav className="filter-bar container" aria-label="Filter events by category">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          className={`filter-pill ${active === cat ? "is-active" : ""}`}
          onClick={() => onChange(cat)}
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}

CategoryFilter.propTypes = {
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
