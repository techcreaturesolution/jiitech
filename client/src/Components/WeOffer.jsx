import { useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Weoffer = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className=" h-80  flex relative ">
        <img
          src="https://img.freepik.com/premium-photo/japanese-teacher-organizing-classroom-library_868783-55464.jpg"
          className=" w-full object-cover opacity-40"
        />
        <div className="absolute text-[#dc2626] text-2xl sm:text-5xl font-train flex flex-col h-full justify-center text-center items-center w-full opacity-100">
          <p> What We Offer</p>
        </div>
      </div>



      <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen py-10 px-6 sm:px-10 text-justify">
        {/* JUKU Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 mb-10 transition-transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-customBlue mb-6">
            JUKU: A Unique Immersion Experience Tailored for Young Learners
          </h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-1/3">
              <img
                src="./familycraft.jpg"
                alt="Students doing origami"
                className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              />
            </div>
            <div className="md:w-2/3">
              <ul className="space-y-4 text-gray-800 text-justify">
                <li>
                  <strong>Eye-Opening Encounters:</strong> Immerse yourself in culturally rich sessions where Indian and Japanese values come together.
                </li>
                <li>
                  <strong>Skills That Matter:</strong> Dive into the principles of Kaizen (continuous improvement), sustainability, and real-world problem-solving during an intensive 1-2 week program.
                </li>
                <li>
                  <strong>Pathway to Higher Education:</strong> Connect with mentors from Japan and explore international universities, scholarships, and career opportunities.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* JOIIN Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 mb-10 transition-transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-customBlue mb-6">
            JOIIN: JIITECH’s Open Innovation & Internation Networking
          </h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-1/3">
              <img
                src="./INNOVATION.jpg"
                alt="Students in a futuristic lab"
                className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              />
            </div>
            <div className="md:w-2/3">
              <ul className="space-y-4 text-gray-800">
                <li>
                  <strong>Global R&D Exposure:</strong> Explore Japan’s cutting-edge infrastructure, advanced research centers, and high-tech industries.
                </li>
                <li>
                  <strong>Innovation-Focused Learning:</strong> Broaden your horizons in  science, technology, engineering, and more, unlocking global internship and career opportunities.
                </li>
                <li>
                  <strong>Holistic Development:</strong> Foster curiosity, critical thinking, and teamwork—skills essential for shaping tomorrow’s leaders.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cultural & Industrial Visits Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 mb-10 transition-transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-customBlue mb-6">
            Cultural & Industrial Visits
          </h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-1/3">
              <img
                src="./Industrial.jpg"
                alt="Students touring a factory"
                className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              />
            </div>
            <div className="md:w-2/3">
              <ul className="space-y-4 text-gray-800">
                <li>
                  <strong>School Visits & Cultural Events:</strong> Engage in interactive exchanges with Japanese students, attend cherry blossom festivals, learn origami and calligraphy, and experience the tranquillity of traditional Japanese tea ceremonies.
                </li>
                <li>
                  <strong>Industry Explorations:</strong> Witness state-of-the-art manufacturing, robotics, and technology hubs that are shaping the future
                </li>
                <li>
                  <strong>Hands-On Workshops:</strong> Participate in sessions with martial arts champions, learn essential survival skills, and observe the renowned workplace ethics of Japan.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Customized Training & Internships Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 transition-transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-customBlue mb-6">
            Customized Trainings & Workshops
          </h2>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-1/3">
              <img
                src="./resume.jpg"
                alt="Cross-cultural professionalism"
                className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
              />
            </div>
            <div className="md:w-2/3">
              <ul className="space-y-4 text-gray-800">
                <li>
                  <strong>Skill Development:</strong> Strengthen professional etiquette, communication, and leadership skills tailored to the Japanese business environment.
                </li>
                <li>
                  <strong>Career Advancement:</strong> Intern with leading organizations, gain insight into global work cultures, and unlock career opportunities in India, Japan, or anywhere around the world.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Weoffer;
