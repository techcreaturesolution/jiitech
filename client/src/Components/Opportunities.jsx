import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Opportunities = () => {

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar />

      {/* Banner */}
      <div className="h-80 flex relative">
        <img
          src="/opportunities-banner.webp"
          className="w-full object-cover opacity-20"
          alt="Opportunities"
        />
        <div className="absolute text-[#dc2626] text-2xl sm:text-5xl font-train flex flex-col h-full justify-center items-center w-full">
          <p>Opportunities</p>
        </div>
      </div>

      {/* Opportunities Section */}
      <div className="bg-gray-100 py-16 px-4 sm:px-8 min-h-[50vh] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm w-full max-w-5xl p-10 sm:p-16 flex flex-col items-center justify-center">
          <h2 className="text-center text-2xl sm:text-4xl md:text-5xl font-train text-[#dc2626] mb-6">
            OIST Research Internship In<br className="hidden sm:block" /> Japan(Fully Funded)
          </h2>
          
          <p className="text-center text-[#dc2626] text-sm sm:text-lg mb-10 max-w-3xl leading-relaxed">
            Spring 2026 Internship October 15th, 2025, 23:59 (JST UTC+9) Late December
            2025 Between April 1st, 2026 - September 30th, 2026
          </p>

          <a
            href="https://www.oist.jp/admissions/research-internship/apply-research-internship"
            target="_blank"
            rel="noreferrer"
            className="bg-customBlue text-white px-6 py-3 rounded-md font-semibold transition-all hover:bg-red-700 animate-zoom"
          >
            Click Here
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Opportunities;
