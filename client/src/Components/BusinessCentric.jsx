 
function BusinessCentric() {
  return (
    <div className="px-2 py-14">
  <div className="flex flex-col sm:flex-row px-6 sm:px-12 items-center justify-center sm:justify-evenly rounded-xl py-16 mx-6 my-10 bg-white shadow-2xl">
    
    {/* Left Side - Text */}
    <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
      <p className="text-4xl font-train pb-4 text-[#dc2626] bg-clip-text relative group">
        Why Choose JIITECH?
      </p>
      <p className="text-lg sm:text-xl font-sm leading-relaxed mb-6 text-customBlue text-justify">
        JIITECH was conceived out of a deep passion for both Japan and India by our peers, who bring over three decades of experience in learning and performing in both countries. We aim to blend Japan is values of patience, punctuality, perfection, perseverance, and professionalism with the energy, elegance, and innovation of India is dynamic young minds. Our programs go beyond academics—they are designed to nurture creativity, problem-solving, and intercultural understanding from both Indian and Japanese perspectives, fostering opportunities for exchange in education, recruitment, and business on both sides.
      </p>
    </div>

    {/* Right Side - Image */}
    <div className="sm:w-2/5 sm:mt-0 mt-8 flex justify-center relative">
      <div className="absolute inset-0 opacity-20 rounded-lg blur-sm"></div>
      <img className="rounded-xl transform transition duration-500 hover:scale-110 hover:rotate-3" src="/why choose us.png" alt="Why Choose JIITECH" />
    </div>

  </div>
</div>



  );
}

export default BusinessCentric;
