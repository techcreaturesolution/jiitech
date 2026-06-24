import { FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { IoCallSharp, IoMailOpenSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
const Footer = () => {
  const usefulLinks = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "about" },
    { name: "What We Offer", link: "/weoffer" },
    { name: "How to Apply", link: "/howtoapply" },
    { name: "Contact Us", link: "/contactus" },
  ];

  const services = [

    { name: "Student Immersion Program", link: "/ourproducts" },
  ];
  return (
    <div className="w-full  md:px-12 lg:px-20 py-10 bg-gray-100">
      <div className="max-w-[1400px]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols- lg:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="flex justify-center sm:justify-start w-100 h-24">
          <img src="JIITECH.png" alt="Company Logo" className="w-56 sm:w-56" />
        </div>

        {/* Useful Links */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-4 bg-customBlue text-white py-2 px-4 rounded-lg text-center mx-auto">
            Useful Links
          </h3>
          <ul className="space-y-3 text-black text-sm px-3">
            {usefulLinks.map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="hover:text-customBlue transition duration-300"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div className="w-full">
          <h3 className="text-xl font-semibold mb-4 bg-customBlue text-white py-2 px-4 rounded-lg text-center mx-auto">
            Our Services
          </h3>
          <ul className="space-y-3 text-sm px-3">
            {services.map((service, index) => (
              <li key={index}>
                <a
                  href={service.link}
                  className="hover:text-customBlue transition duration-300"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </div>



        <div className="w-full md:col-span-1">
          <h3 className="text-xl font-semibold mb-4 bg-customBlue text-white py-2 px-4 rounded-lg text-center mx-auto">
            Contact
          </h3>

          <div className="text-sm text-black flex flex-col gap-4 sm:flex-col px-3">
            {/* Japan Office */}
            <div className="w-full flex flex-col items-start gap-2">
              <p className="flex items-center gap-x-2">
                <FaMapMarkerAlt /> <strong>Japan:</strong>
              </p>
              <p className="flex items-center gap-x-2">
                <IoCallSharp /> +81-8064262379
              </p>
              <p className="flex items-center gap-x-2">
                <IoMailOpenSharp /> info@jiitech.jp
              </p>
              <p className="flex items-center gap-x-2">
                <FaLinkedin size={20} />
                <Link to="https://www.linkedin.com/company/jiitech-japan/">JIITECH Japan</Link>
              </p>
            </div>
            {/* India Office */}
            <div className="w-full flex flex-col items-start gap-2">
              <p className="flex items-center gap-x-2">
                <FaMapMarkerAlt /> <strong>India:</strong>
              </p>
              <p className="flex items-center gap-x-2">
                <IoCallSharp /> +91-9327123451
              </p>
              <p className="flex items-center gap-x-2">
                <IoCallSharp /> +91-9033211100
              </p>
              <p className="flex items-center gap-x-2">
                <IoMailOpenSharp /> info@jiitech.jp
              </p>
              <p className="flex items-center gap-x-2">
                <FaLinkedin size={20} />
                <Link to="https://www.linkedin.com/company/jiitech-japan/">JIITECH Japan</Link>
              </p>
            </div>



          </div>
        </div>



      </div>
    </div>
  );
};

export default Footer;
