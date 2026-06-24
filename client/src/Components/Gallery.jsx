import { useEffect, useState } from "react";
import axiosInstance from "../api/Api";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GallerySection from "../Components/GallerySection";

const FESTIVAL_PILLS = [
  "All", "Independence Day", "Republic Day", "Annual Function Day",
  "Diwali", "Holi", "Navratri", "Dussehra", "Onam", "Pongal", "Eid",
  "Cherry Blossom Festival", "Tanabata", "Gion Matsuri", "Japanese New Year",
  "Other"
];

const ACADEMIC_YEARS = [];
for (let year = 2025; year >= 1999; year--) {
  ACADEMIC_YEARS.push({ label: `${year} - ${year + 1}`, start: year, end: year + 1 });
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeYear, setActiveYear] = useState("2025 - 2026");

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await axiosInstance.get("/v1/gallery");
        if (res.data.success) {
          setGalleries(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch galleries:", error);
      }
    };
    fetchGalleries();
  }, []);

  // Filter by academic year (ignoring spaces to handle older uploads)
  const normalizeStr = (str) => (str || "").replace(/\s+/g, "");
  const yearFiltered = galleries.filter(g => normalizeStr(g.academicYear) === normalizeStr(activeYear));

  // Filter by pill (event type)
  const filteredGalleries = activeFilter === "All" 
    ? yearFiltered 
    : yearFiltered.filter(g => g.event === activeFilter);

  // Map backend data to match the UI format perfectly
  const eventsToDisplay = filteredGalleries.map((g) => ({
    id: g._id,
    title: g.title,
    date: g.date,
    location: g.location || "Jiitech",
    image: `http://localhost:5000${g.images[0]}`,
    thumbnails: g.images.slice(1).map(img => `http://localhost:5000${img}`),
    description: g.description
  }));

  return (
    <>
      <Navbar />

      {/* Hero Banner — same style as Services page */}
      <div className="h-80 relative flex items-center justify-center overflow-hidden">
        <img
          src="/student-experience-bg.png"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          alt="Student Experience Background"
        />
        <div className="absolute text-[#dc2626] text-2xl sm:text-5xl font-train flex flex-col h-full justify-center text-center items-center w-full">
          Student Experience
        </div>
      </div>

      {/* Main Section */}
      <div className="bg-gray-50 min-h-screen py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Mobile: Horizontal scrollable year tabs */}
          <div className="md:hidden mb-6">
            <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-3">Academic Year</p>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {ACADEMIC_YEARS.map((yr) => {
                const isActive = activeYear === yr.label;
                return (
                  <button
                    key={yr.label}
                    onClick={() => { setActiveYear(yr.label); setActiveFilter("All"); }}
                    className={`shrink-0 px-5 py-3 rounded-xl border font-semibold text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-[#dc2626] text-white border-[#dc2626] shadow-md"
                        : "bg-white text-gray-700 border-gray-200"
                    }`}
                  >
                    {yr.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">

            {/* Desktop: Left Sidebar — Year Selection */}
            <aside className="hidden md:block w-72 shrink-0">
              <div className="sticky top-28 flex flex-col items-center">
                <h3 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4 w-full text-center">
                  Academic Year
                </h3>
                <div
                  className="w-full h-[80px] overflow-y-auto scrollbar-hide snap-y snap-mandatory rounded-2xl shadow-xl border border-gray-100 bg-white"
                  onScroll={(e) => {
                    const index = Math.round(e.target.scrollTop / 80);
                    if (ACADEMIC_YEARS[index]) {
                      const year = ACADEMIC_YEARS[index].label;
                      if (year !== activeYear) {
                        setActiveYear(year);
                        setActiveFilter("All");
                      }
                    }
                  }}
                >
                  {ACADEMIC_YEARS.map((yr) => {
                    const isActive = activeYear === yr.label;
                    return (
                      <div
                        key={yr.label}
                        className={`h-[80px] w-full snap-center shrink-0 flex items-center justify-center font-bold text-2xl select-none transition-colors duration-300 ${
                          isActive ? "bg-[#dc2626] text-white" : "bg-white text-gray-400"
                        }`}
                      >
                        {yr.label}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-col items-center gap-1 opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">Scroll to change</span>
                </div>
              </div>
            </aside>

            {/* Right Content */}
            <div className="flex-grow min-w-0">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Events</h2>
                <span className="text-sm text-gray-400 font-mono">{activeYear}</span>
              </div>

              {/* Festival Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-6 md:mb-8 overflow-x-auto pb-1">
                {FESTIVAL_PILLS.map((pill) => (
                  <button
                    key={pill}
                    onClick={() => setActiveFilter(pill)}
                    className={`shrink-0 px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                      activeFilter === pill
                        ? "bg-[#dc2626] text-white border-[#dc2626]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#dc2626] hover:text-[#dc2626]"
                    }`}
                  >
                    {pill}
                  </button>
                ))}
              </div>

              {/* Gallery Cards */}
              {eventsToDisplay.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-lg">No gallery events found for the selected criteria.</p>
                </div>
              ) : (
                <GallerySection events={eventsToDisplay} />
              )}
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
