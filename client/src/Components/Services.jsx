import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const services = [
  {
    id: "student-immersion",
    title: "Student Immersion Program",
    subtitle:
      "JIITECH’s Student Immersion Program offers young learners a once in a lifetime opportunity to explore Japan’s culture, innovation, and global education ecosystem.",
    features: [
      {
        title: "Cultural Connection",
        description:
          "Immerse yourself in Japan’s timeless beauty. Participate and engage in student exchange activities that blend Indian and Japanese values.",
      },
      {
        title: "Innovation Exposure",
        description:
          "Visit world-class R&D centers, robotics labs, and high-tech industries. Witness Japan’s leadership in automation, sustainability, and futuristic problem-solving.",
      },
      {
        title: "Personal Growth",
        description:
          "Learn the art of Kaizen (continuous improvement), sustainability, and teamwork through experiential sessions designed to shape global thinkers.",
      },
      {
        title: "Academic Pathways",
        description:
          "Connect with mentors and leaders in Japan. Explore study opportunities, scholarships, and career prospects in globally recognized institutions.",
      },
      {
        title: "Professional Readiness",
        description:
          "Gain exposure to Japanese workplace culture, communication styles, and leadership values through practical workshops and on-ground training sessions.",
      },
    ],
    why: [
      "Authentic cross-cultural immersion",
      "Access to Japan’s innovation ecosystem",
      "Hands-on learning and mentorship",
      "End-to-end guidance — from travel to training",
    ],
  },
  {
    id: "events-venues",
    title: "Events & Venues",
    subtitle:
      "We collaborate with trusted venues and vendors across India to deliver smooth, high-quality events that reflect Japanese precision and hospitality.",
    features: [
      {
        title: "Venue Scouting & Booking",
        description:
          "We identify and secure venues that align perfectly with your event’s theme, objectives, and audience profile, ensuring an ideal setting that enhances the overall experience.",
      },
      {
        title: "Event Concept Design & On-Site Management",
        description:
          "Our team develops bespoke event concepts and oversees every aspect of on-site execution, ensuring seamless coordination, impactful presentation, and flawless delivery.",
      },
      {
        title: "Local Coordination & Logistics",
        description:
          "We manage all local operations, including transportation, scheduling, vendor coordination, and compliance, to guarantee a smooth and efficient event flow from start to finish.",
      },
      {
        title: "Branding & Hospitality Support",
        description:
          "JIITECH provides tailored branding solutions and comprehensive hospitality services to ensure clear communication and a professional, culturally aligned experience.",
      },
    ],
  },
  {
    id: "business-setup",
    title: "Business Setup & End-to-End Support",
    subtitle:
      "Entering the Indian market can be complex — we simplify the process and help Japanese companies set up, launch, and operate successfully in India.",
    features: [
      {
        title: "Market Research & Feasibility Analysis",
        description:
          "We conduct in-depth market studies and feasibility assessments to help you make informed decisions, identify opportunities, and minimize risks before entering the Indian market.",
      },
      {
        title: "Company Registration & Business Licensing",
        description:
          "Our experts manage all regulatory procedures, from company incorporation to obtaining necessary licenses and permits, ensuring full compliance with local business laws.",
      },
      {
        title: "Legal, Tax & Compliance Guidance",
        description:
          "We provide end-to-end advisory on legal frameworks, taxation, and compliance requirements to help your business operate seamlessly within India’s regulatory environment.",
      },
      {
        title: "Office Space Identification & Setup",
        description:
          "We assist in identifying, negotiating, and setting up office spaces that align with your operational needs, budget, and strategic goals.",
      },
      {
        title: "Recruitment & HR Assistance",
        description:
          "Our HR specialists support you in sourcing, recruiting, and onboarding skilled talent while establishing compliant and effective HR policies tailored to the Indian workforce.",
      },
      {
        title: "Vendor & Partner Identification",
        description:
          "We connect you with reliable local vendors, distributors, and strategic partners, building networks that support your long-term business growth and collaboration in India.",
      },
    ],
  },
  {
    id: "digital-expansion",
    title: "Digital Expansion & Brand Communication",
    subtitle:
      "We help companies establish their digital footprint in India through professional, localized, and conversion-oriented online platforms.",
    features: [
      {
        title: "Corporate Website Design & Development",
        description:
          "We design and develop professional corporate websites that reflect your brand values, enhance user experience, and communicate effectively with your target audience.",
      },
      {
        title: "Localization of Content",
        description:
          "Our team adapts your website and marketing content to suit the Indian market — ensuring cultural relevance, accurate translation, and meaningful audience engagement.",
      },
      {
        title: "SEO & Digital Marketing for the Indian Market",
        description:
          "We implement region-specific SEO strategies, paid campaigns, and digital marketing initiatives to increase your brand visibility and attract the right audience in India.",
      },
      {
        title: "Online Branding & Customer Engagement Strategies",
        description:
          "We craft data-driven branding and engagement strategies to strengthen your digital presence, foster trust, and build long-term relationships with your customers.",
      },
    ],
  },
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="h-80 relative flex items-center justify-center overflow-hidden">
        <img
          src="https://img.freepik.com/premium-photo/business-man-touching-service-screen_218381-4148.jpg?semt=ais_hybrid&w=740&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Services Hero"
        />
        <div className="absolute text-[#dc2626] text-2xl sm:text-5xl font-train flex flex-col h-full justify-center text-center items-center w-full opacity-100">
          Our Services
        </div>
      </div>

      {/* Main Section */}
      <main className="min-h-screen bg-gradient-to-b from-red-50 to-white py-16 px-4 sm:px-8 lg:px-16">
        {/* Intro */}
        <section className="max-w-5xl mx-auto text-center mb-12">
          <p className="text-justify mt-5 text-gray-700 leading-relaxed text-base sm:text-lg">
            At JIITECH, we specialize in fostering strong connections between Japan and India.
            With a deep understanding of both cultures and business ecosystems, we provide
            comprehensive solutions for organizations, institutions, and professionals aiming
            to explore opportunities and build meaningful partnerships across borders.
          </p>
        </section>

        {/* Accordion Section */}
        <section className="max-w-5xl mx-auto space-y-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left hover:bg-red-50 transition"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500">{service.subtitle}</p>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-[#dc2626]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {/* Accordion Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-[1500px] p-6 sm:p-8" : "max-h-0 p-0"
                }`}
              >
                <div className="text-gray-700 space-y-5">
                  {service.features.map((f, i) => (
                    <div key={i}>
                      <h4 className="font-semibold text-[#dc2626] text-base sm:text-lg">
                        {f.title}
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed">{f.description}</p>
                    </div>
                  ))}
                </div>

                {/* Only the first service has "Why Choose JIITECH?" */}
                {index === 0 && (
                  <div className="mt-6 bg-red-50 p-6 sm:p-8 rounded-xl">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                      Why Choose JIITECH?
                    </h4>
                    <ul className="list-disc ml-5 space-y-2 text-gray-700 text-sm sm:text-base">
                      {service.why.map((reason, i) => (
                        <li key={i}>{reason}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Why JIITECH Section */}
        <section className="max-w-6xl mx-auto mt-20 bg-white border border-gray-200 rounded-3xl shadow-md p-8 sm:p-12">
          <div className="md:flex md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Why JIITECH
              </h2>
              <ul className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                <li>• Deep understanding of Japanese standards and Indian dynamics</li>
                <li>• On-ground teams in Japan and India</li>
                <li>• Transparent communication and reporting</li>
                <li>
                  • Trusted by education institutions, corporations, and government organizations
                </li>
              </ul>
            </div>

            <div className="mt-10 md:mt-0">
              <Link
                to="/contactus"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#dc2626] text-white text-base font-semibold rounded-xl shadow hover:bg-red-500 transition-all focus:ring-2 focus:ring-red-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Services;
