import { useEffect, useState } from "react";

function OurProduct() {
  const [objects, setObjects] = useState([]);

  const tab = [
    <div key="immersion" className="pt-16 p-4 flex items-center justify-center flex-row flex-wrap gap-2 relative  py-20 px-6 lg:px-10 xl:px-20 overflow-hidden">

      <div className="relative group w-full bg-gradient-to-br from-red-100 via-red-200 to-green-300 rounded-3xl p-12 shadow-xl overflow-hidden">
      <div className="absolute inset-0">
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-br from-orange-400 via-red-300 to-green-400 opacity-20 rounded-full"></div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-green-400 via-red-300 to-orange-400 opacity-25 rounded-full"></div>
          </div>

         
        <div className="text-center mb-4">
          <p className="text-4xl font-train pb-4   text-[#dc2626] bg-clip-text relative group">
            Program We Offer

          </p>
        </div>
        <div className="relative">
           
          <h3 className="text-xl sm:text-4xl font-bold text-gray-900 mb-8 tracking-wide text-center group-hover:text-red-700 transition-colors duration-500">
            Student Immersion Program
          </h3>


          <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed text-center font-sm  mx-auto mb-8">
          Our set of Student Immersion Programs are designed to provide students a life-changing opportunity to learn, grow, and experience another culture. Participants will immerse themselves in an environment known for its exceptional infrastructure, cleanliness, discipline, and safety. Our academic and cultural activity programs are thoughtfully designed not only to foster educational growth but also to create lasting friendships and memories.
          </p>

          <div className="mt-12 text-justify">
            <div className=" text-justify grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 md:grid-cols-2 md:gap-5">
              {[
                {
                  icon: "🌍",
                  title: "Cultural Immersion",
                  description:
                    "Explore local traditions, food, festivals, and customs for an authentic cultural experience.",
                },
                {
                  icon: "🎓",
                  title: "Academic Exposure",
                  description:
                    "Attend lectures, seminars, and workshops to understand the educational approaches of Japan or India. Visit schools, universities, and research institutes. Engage in group and one-on-one interactions to satisfy your curiosities and gain insights into the local living and work cultures.",
                },
                {
                  icon: "💡",
                  title: "Innovation & Technology Workshops",
                  description:
                    "Participate in hands-on sessions to explore cutting-edge technologies and innovations shaping the future. Gain the opportunity to intern with prestigious companies, gaining real-world experience.",
                },
                {
                  icon: "🏢",
                  title: "Industry Visits",
                  description:
                    "Gain insight into leading industries through company visits and talks with professionals.",
                },
                {
                  icon: "🏠",
                  title: "Homestays",
                  description:
                    "Experience local hospitality firsthand through homestay options, offering students a unique opportunity to understand family life in a different culture.",
                },
                {
                  icon: "🤝",
                  title: "Study, Networking & Business Opportunities",
                  description:
                    "Empowering individuals through education, global connections, and opportunities for professional growth.",
                },
              ].map((highlight, index) => (
                <div
                  key={index}
                  className={`relative bg-white bg-opacity-70 rounded-xl p-3 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 backdrop-blur text-justify`}
                >
                  <div className="text-3xl sm:text-4xl text-center mb-4 text-red-500 group-hover:scale-125 transition-transform duration-500">
                    {highlight.icon}
                  </div>
                  <h5 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 text-center">
                    {highlight.title}
                  </h5>
                  <p className="text-sm sm:text-base text-gray-700 text-center text-justify">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 sm:mt-16 text-center">
            <button className="px-4 sm:px-6 py-2 mb-3 sm:py-3 bg-red-600 text-white text-sm sm:text-lg font-semibold rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <a href="/weoffer">Learn More →</a>

            </button>
          </div>
        </div>
      </div>
    </div>,


// new 
// new end
  ];

  useEffect(() => {
    setObjects(tab[0]);
  }, []);

  return (
    <>
      <div className="mx-6">
        

        <div> {objects}</div>

        <div></div>
      </div>
    </>
  );
}

export default OurProduct;




 