 import {   FaPlaneArrival, } from "react-icons/fa";
 
import { FaPersonHiking, } from "react-icons/fa6";
import { GrTechnology } from "react-icons/gr";
import { LiaIndustrySolid } from "react-icons/lia";






function WhyArisezen() {






  return (
    <div className="py-10">
    
      <div className=" text-black flex flex-col justify-center items-center md:px-48 mx-3 ">
      
        <p className="text-4xl font-train pb-4   text-[#dc2626] bg-clip-text relative group">
          Itinerary Highlights
          {/* <div className="opacity-30"><img width={300} src="/underline.png" alt="" /></div> */}
        </p>

        <p className="text-center text-xl font-light ">
        Our exchange programs offer an itinerary crafted to maximize learning and cultural exchange. Here is a sample itinerary showcasing the exciting experiences included.

        </p>
      </div>

      


      {/* new cards style   */}
      <div className="h-full mt-4 min-h-full w-full bg-customBlue pt-12 p-4">
      
        <div className="grid gap-14 md:grid-cols-2 md:gap-5">
          {/* Service Card 1 */}
          
          <div className="rounded-xl bg-white p-8 text-center shadow-xl hover:scale-105 hover:shadow-2xl transform transition-all duration-300">
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full bg-teal-400 shadow-lg shadow-teal-500/40 hover:bg-teal-500 transition-all duration-300">
              <FaPlaneArrival size={45} className="text-white" />
            </div>
            <h1 className="text-darken mb-3 uppercase text-xl font-medium lg:px-14">Day 1-3: Arrival and Introduction</h1>
            <p className="px-4 text-gray-800 text-justify">
            Arrival and a warm welcome session, followed by an orientation workshop to introduce you to the host culture. Enjoy a city tour visiting iconic landmarks and cultural hotspots.
            </p>
          </div>

          {/* Service Card 2 */}
          <div className="rounded-xl bg-white p-8 text-center shadow-xl hover:scale-105 hover:shadow-2xl transform transition-all duration-300" data-aos-delay="150">
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-rose-500 shadow-rose-500/40 hover:bg-rose-600 transition-all duration-300">
              <GrTechnology size={45} className="text-white" />
            </div>
            <h1 className="text-darken mb-3 uppercase text-xl font-medium lg:px-14">Day 4-6: Academic & Technological Exploration</h1>
            <p className="px-4 text-gray-800 text-justify">
            Participate in workshops and lectures at partnering institutions, gaining hands-on experience with local technological innovations. Engage in interactive sessions with local students and educators.
            </p>
          </div>

          {/* Service Card 3 */}
          <div className="rounded-xl bg-white p-8 text-center shadow-xl hover:scale-105 hover:shadow-2xl transform transition-all duration-300" data-aos-delay="300">
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-sky-500 shadow-sky-500/40 hover:bg-sky-600 transition-all duration-300">
              <LiaIndustrySolid size={45} className="text-white" />
            </div>
            <h1 className="text-darken mb-3 uppercase text-xl font-medium lg:px-14">
              Day 7-9: Cultural Activities & Industry Visits
            </h1>
            <p className="px-4 text-gray-800 text-justify">
            Attend a traditional festival or ceremony, visit leading companies in technology, manufacturing, and other relevant sectors, and explore local cuisine while learning about traditional food preparations.
            </p>
          </div>

          {/* Service Card 4 */}
          <div className="rounded-xl bg-white p-8 text-center shadow-xl hover:scale-105 hover:shadow-2xl transform transition-all duration-300" data-aos-delay="300">
            <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-full shadow-lg bg-[#aa81a1] shadow-purple-500/40 hover:bg-[#8a6191] transition-all duration-300">
              <FaPersonHiking size={45} className="text-white" />
            </div>
            <h1 className="text-darken mb-3 uppercase text-xl font-medium lg:px-14">
              Day 10-11: Adventure and Cultural Integration
            </h1>
            <p className="px-4 text-gray-800 text-justify">
            Day trips to nearby scenic or historic locations, enjoy adventure activities like hiking or local cultural performances, and conclude with group discussions and reflections on the experience.
            </p>
          </div>
        </div>
      </div>

          </div>
  );
}

export default WhyArisezen;
