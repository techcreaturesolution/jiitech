import Navbar from "./Navbar";
 

import { motion } from "framer-motion"
function HeroCarousel() {


   return (
    <div className="relative w-full">
      <Navbar />

      <div className="mt-40 pb-40 flex flex-col-reverse  items-center justify-between bg-white py-16 px-4 sm:px-8 md:px-12 lg:py-24 lg:px-16 xl:py-28 xl:px-32 max-w-[1400px] mx-auto flex justify-center items-center text-center">


        <motion.h1
          className="text-xl  sm:text-2xl md:text-3xl xl:text-5xl 2xl:text-5xl text-[#dc2626] font-train text-center leading-snug overflow-hidden whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.16, ease: "easeOut" }}
        >
          IGNITE CURIOSITY <p>EXPLORE THE WORLD</p>
        </motion.h1>


      </div>



       <div className="flex  justify-center mt-0  pb-0">
        <img
          src="/1.png"
          alt="Picture with file"
          className="w-full max-w-full"
        />
      </div>

    </div>
  );
}

export default HeroCarousel;
