import  { useEffect } from "react";
 
 import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);




  //  our crew 
  const teamMembers = [
    {
      name: "Jinal Patel",
      role: " Founder",
      image: "./jinalpatel.jpg",
      description: "The CEO's role in raising a company's corporate IQ is to establish an atmosphere that promotes knowledge sharing and collaboration.",
      social: {
      facebook: "#",
      linkdin: "https://in.linkedin.com/in/jinal-patel-24396751",
      twitter: "https://x.com/Jinal_patel1207?t=z1kHYUujMaborXrh79ms6w&s=08",
      instagram: "https://www.instagram.com/jinalacrosstheworld?igsh=d2ZseHNhNWg5enky",
    },
    },
    {
      name: "Nitin Jain",
      role: "Founder",
      image: " ./nitinjain.jpeg",
      description: "The emphasis on innovation and technology in our companies has resulted in a few of them establishing global benchmarks in product design and development.",
      social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
    },
    {
      name: "Taichi Ikeda",
      role: "President",
      image: "./taichiikeda.jpeg",
      description: "Our services encompass the assessment and repair of property damage caused by water, fire, smoke, or mold. We can also be a part of the restoration.",
      social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
    },
    }
  ];

  //  our crew end


  //  our mentors 
  const team = [
    {
      name: "Dr. Renu Wadhwa",
      role: "Prime Senior Researcher & Head AIST-INDIA DAILAB",
      role2: "National Institute of Advanced Industrial Science and Technology (AIST), Japan",
      image: "./renuwadhwa.png",

    },
    {
      name: "Dr. Shanuja Beri",
      role: "Associate Professor",
      role2: "University of Delhi, India",
      image: " ./shanuja.png",

    },
    {
      name: "Dr. Sunil Kaul",
      role: "Senior Research Scientist",
      role2: "National Institute of Advanced Industrial Science and Technology (AIST), Japan",
      image: "./Sunil.png",

    },
    {
      name: "Dr. Yoshihiro Ohmiya",
      role: "Principal Researcher",
      role2: "National Institute of Advanced Industrial Science & Technology (AIST) Biomedical Research Institute, Japan",
      image: "./Yoshihiro.png",

    }
  ];

  //  our mentors end


  // const team = [
  //   {
  //     name: "Matheus Ferrero",
  //     role: "Marketing Expert",
  //     image: "https://randomuser.me/api/portraits/women/1.jpg",
  //   },
  //   {
  //     name: "Stuard Ferrel",
  //     role: "Digital Marketer",
  //     image: "https://randomuser.me/api/portraits/women/2.jpg",
  //   },
  //   {
  //     name: "Eva Hudson",
  //     role: "Creative Designer",
  //     image: "https://randomuser.me/api/portraits/women/3.jpg",
  //   },
  //   {
  //     name: "Jackie Sanders",
  //     role: "SEO Expert",
  //     image: "https://randomuser.me/api/portraits/women/4.jpg",
  //   },
  // ];
  return (
    <div className="">
      <div>
        <Navbar />
      </div>

      <div className="h-80 flex relative ">
        <img
          src="/about us.jpg"
          className="w-full object-cover opacity-20"
          alt="About Us"
        />
        <div className="absolute text-[#dc2626] text-2xl sm:text-5xl font-train flex flex-col h-full justify-center text-center items-center w-full">
          <p>About Us</p>

        </div>
      </div>



      {/* new box  */}
      <div className="px-2  py-14 mt-0 bg-gradient-to-b from-gray-100 to-gray-200" >
        <div className="flex flex-col sm:flex-row-reverse px-6 sm:px-12 items-center justify-center sm:justify-evenly rounded-xl py-16 mx-6 my-10 bg-white shadow-2xl">

          <div className="lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <p className="text-4xl font-train pb-4   text-[#dc2626] bg-clip-text relative group">
              Who We Are

            </p>
            <p className="text-sm sm:text-xl font-sm leading-relaxed mb-6 text-customBlue  text-justify">

              JIITECH is a team of professionals specializing in education, science, technology, and culture from Japan and India. Our mission is to promote mutual understanding and foster new partnerships across these sectors, contributing to job creation, economic growth, and the development of a supportive environment for an aging society. We specialize in organizing student immersion programs, workshops, cultural experiences, and educational opportunities that empower the youth of both countries. By connecting students, educators, and innovators, we aim to shape a brighter future through collaboration and cultural exchange. Additionally, we assist industries in discovering new business opportunities, including R&D and marketing, on both sides.

            </p>



          </div>
          <div className="sm:w-2/5 sm:mt-0 mt-8 flex justify-center relative">
            <div className="absolute inset-0  opacity-20  blur-sm"></div>
            <img className="   transform transition duration-500 hover:scale-110 hover:rotate-3" src="./whoweare.jpg" alt="Our Mission" />
          </div>
        </div>
      </div>
      {/* new box end */}

      <div className="py-12 sm:px-24 bg-gradient-to-b from-gray-100 to-gray-200">

        <section className="w-full relative bg-gradient-to-r from-gray-50 to-gray-100 py-20 px-6 lg:px-10 xl:px-20 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-36 h-36 sm:w-72 sm:h-72 bg-pink-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-48 h-48 sm:w-96 sm:h-96 bg-red-400 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Content Section */}
            <div className="flex flex-col lg:flex-row items-center gap-10">
              {/* Image Section */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="./highfi.jpeg" // Replace with your image URL
                    alt="Cultural Exchange"
                    className="object-cover w-full h-64 sm:h-80 md:h-96 lg:h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2 space-y-16">
                <p className="text-base sm:text-lg md:text-xl text-black-700 leading-relaxed text-justify">
                  At <span className="font-bold text-customBlue">JIITECH</span>, our passion lies in fostering global education to build bridges between cultures, nurture future-ready leaders, and unlock the limitless potential of young minds.
                </p>
                <ul className="space-y-4 text-justify">
                  {[
                    "Expand your worldview and global awareness",
                    "Develop essential problem-solving and innovation skills",
                    "Discover powerful career and higher-education pathways",
                    "Forge lifelong international friendships",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center bg-customBlue text-white rounded-full shadow-md transform transition-transform duration-300 hover:scale-110">
                          ✓
                        </div>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700">{item}</p>
                    </li>
                  ))}
                </ul>
                <p className="text-base sm:text-lg md:text-xl text-black-700 leading-relaxed">
                  We don’t just teach about the world; we bring the world into the classroom—empowering every student to explore their interests, gain fresh insights, and dream beyond borders.
                </p>
                {/* Call-to-Action */}
                {/* <div className="pt-4">
                  <button className="bg-red-500 text-sm sm:text-base md:text-lg text-white py-2 px-4 md:py-3 md:px-6 rounded-lg shadow-lg hover:bg-customBlue transition-all duration-300">
                    Learn More
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </section>






        {/* new team section end */}



      </div>

      {/* our crew */}
      {/* <div className="w-full min-h-full bg-gradient-to-b from-gray-100 to-gray-200 py-12 mt-10 mb-10">
        <div className="container mx-auto px-4">
         
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-4xl font-train pb-4   text-[#dc2626] bg-clip-text relative group">
              Our Crew
            </p>

          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-10 auto-rows-fr">
            {teamMembers.map((member, index) => (
              <div key={index} className="relative h-full flex">
                <div className="bg-customBlue bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col w-full h-full transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300">
              
                  <div className="relative mt-6   flex justify-center -mb-1">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full  shadow-lg object-cover"
                    />
                  </div>
 
                  <div className="px-6 pt-10 pb-8 text-center flex flex-col flex-grow">
                    <h3 className="text-xl md:text-md font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-white text-sm mb-4">{member.role}</p>

                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}





      <section className="w-full min-h-full bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-4xl font-train pb-10 text-[#dc2626] bg-clip-text relative group">
            Our  Crew
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-12 auto-rows-fr place-items-center">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-customBlue text-white p-6 rounded-2xl shadow-lg flex flex-col items-center transform transition duration-300 hover:scale-105 w-full max-w-xs h-100"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white -mt-20 mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-center opacity-80">{member.role}</p>
              {/* Social Links */}
              <div className="flex space-x-3 mt-4">
                {/* <a
                  href={member.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 text-2xl"
                >
                  <FaFacebookF  />
                </a> */}
                 <a
                  href={member.social.linkdin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 text-2xl"
                >
                  <FaLinkedin  />
                </a> 
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 text-2xl"
                >
                  <FaXTwitter />
                </a>
                <a
                  href={member.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 text-2xl"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* our crew end */}


      {/* Team Mentor  */}
      {/* <div className="w-full mb-10 min-h-full bg-gradient-to-b from-gray-100 to-gray-200 py-12">
        <div className="container mx-auto px-4">
      
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-4xl font-train pb-4   text-[#dc2626] bg-clip-text relative group">
              Our Mentors
            </p>

          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 auto-rows-fr">
            {team.map((member, index) => (
              <div key={index} className="relative h-full flex">
                <div className="bg-customBlue bg-opacity-90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden flex flex-col w-full h-full transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300">
                  
                  <div className="relative mt-6   flex justify-center -mb-1">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full  shadow-lg object-cover"
                    />
                  </div>

                  
                  <div className="px-6 pt-10 pb-8 text-center flex flex-col flex-grow">
                    <h3 className="text-xl md:text-md font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-white text-sm mb-4">{member.role}</p>

                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {/* Team Mentor  */}





      {/* try team component  */}
      {/* <section className="w-full mb-20 min-h-full bg-gradient-to-b from-gray-100 to-gray-200 gap-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-4xl font-train pb-10   text-[#dc2626] bg-clip-text relative group">
            Our Mentors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 auto-rows-fr  ">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-customBlue text-white p-6 rounded-2xl shadow-lg flex flex-col items-center transform transition duration-300 hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white -mt-20 mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm opacity-80">{member.role}</p>
              <div className="flex space-x-3 mt-4">
                <a href="#" className="text-white text-xl hover:text-gray-300">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-white text-xl hover:text-gray-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-white text-xl hover:text-gray-300">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      <section className="w-full min-h-full bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-4xl font-train pb-10 text-[#dc2626] bg-clip-text relative group">
            Our Mentors
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12 auto-rows-fr place-items-center">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-customBlue text-white p-6 rounded-2xl shadow-lg flex flex-col items-center transform transition duration-300 hover:scale-105 w-full max-w-xs h-100"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white -mt-20 mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-center opacity-80 text-justify">{member.role}</p>
              <p className="text-sm text-center opacity-80 text-justify">{member.role2}</p>
               
            </div>
          ))}
        </div>
      </section>

      {/* try team component end */}
      <Footer />
    </div>
  );
};

export default About;
