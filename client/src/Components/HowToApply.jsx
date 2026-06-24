import { useState } from "react";
import Navbar from "./Navbar"; // Adjust path if required
import Footer from "./Footer";

import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function HowToApply() {
  const [formData, setFormData] = useState({
    fullName: "",
    school: "",
    email: "",
    phoneNumber: "",
    enquiry: ""
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!formData.school.trim()) {
      newErrors.school = "School Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\+\d{1,4}\d{6,14}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number format";
      isValid = false;
    }

    if (!formData.enquiry.trim()) {
      newErrors.enquiry = "Enquiry cannot be empty";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit Function
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8000/howtoapply", formData);

      if (response.data.success) {
        toast.success("Application submitted successfully!");

        // Reset form
        setFormData({
          fullName: "",
          school: "",
          email: "",
          phoneNumber: "",
          enquiry: "",
        });

        toggleModal();
      } else {
        toast.warn(response.data.message || "Failed to submit application.");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      toast.error("Something went wrong! Try again.");
    }

  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <div className="h-80 relative flex items-center justify-center overflow-hidden">
        <img
          src="./how-to-apply.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="How To Apply Banner"
        />
        <div className="absolute text-[#dc2626] text-2xl sm:text-5xl font-train flex flex-col h-full justify-center text-center items-center w-full">
          How To Apply
        </div>
      </div>



      {/* join the jiitech journy  */}

      <div className="bg-white min-h-screen  flex items-center justify-center p-6">
        <div className="bg-customBlue text-white shadow-xl rounded-lg max-w-9xl mx-auto p-8 ">
          <div className="text-center">

            <div className="flex justify-center mb-6">
              <img
                src="./joinjurny.jpg"
                alt="India and Japan Flags"
                className="w-1/2 h-35 rounded-lg shadow-lg transform transition duration-300 hover:scale-110"
              />
            </div>

            <h1 className="text-4xl font-bold uppercase tracking-wide mb-4">
              Join the JIITECH Journey
            </h1>

            <p className="text-lg leading-relaxed mb-6  text-center ">
              We invite you to be part of this transformative experience, where knowledge meets exploration and education meets adventure. Whether you’re a student looking to broaden your horizons, an educator seeking enriching exchange opportunities, or a school administrator ready to take your institution global—JIITECH has a place for you.

              Embark on the next chapter of learning, innovation, and cultural discovery today.
              .
            </p>

            <p className="text-white/90 italic mb-4">
              Embark on your next chapter of learning, innovation, and cultural
              discovery today.
            </p>

          </div>
        </div>
      </div>

      {/* join the jiitech journy end  */}
      {/* new steps  */}
      <div className="bg-white">
        <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
          <div className="text-center">
            {/* Optional header content */}
          </div>
          <div className="mt-5 sm:mt-20">
            <ul className="space-y-10">
              <li className="text-left">
                <div
                  className="flex flex-col sm:flex-row items-start animate-fade-in"
                >
                  <div
                    className="flex flex-col items-center justify-center sm:mr-5 mb-4 sm:mb-0 animate-scale-up"
                  >
                    <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-customBlue text-white border-4 border-white text-xl font-semibold transform hover:scale-110 transition-transform duration-300">
                      <span className="text-blue-500 text-2xl sm:text-3xl">📋</span>
                    </div>
                    <span className="text-gray-500 mt-2">STEP 1</span>
                  </div>
                  <div className="bg-gray-100 p-3 pb-10 rounded-lg shadow-md w-full transform hover:scale-105 transition-transform duration-300">
                    <h4 className="text-lg sm:text-xl leading-6 font-semibold text-gray-900 uppercase">
                      Fill Out the Interest Form
                    </h4>
                    <p className="mt-2 text-base leading-6 text-black">

                      If you are interested, please fill out the form using
                      <span className="font-bold text-customBlue">‘Apply Now’</span>
                      at the end of instructions
                    </p>
                  </div>
                </div>
              </li>
              <li className="text-left">
                <div className="flex flex-col sm:flex-row items-start animate-fade-in">
                  <div
                    className="flex flex-col items-center justify-center sm:mr-5 mb-5 sm:mb-0 animate-scale-up"
                  >
                    <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-customBlue text-white border-4 border-white text-xl font-semibold transform hover:scale-110 transition-transform duration-300">
                      <span className="text-green-500 text-2xl sm:text-3xl">📹</span>
                    </div>
                    <span className="text-gray-500 mt-2">STEP 2</span>
                  </div>
                  <div className="bg-gray-100 p-3 pb-10 rounded-lg shadow-md w-full transform hover:scale-105 transition-transform duration-300">
                    <h4 className="text-lg sm:text-xl leading-6 font-semibold text-gray-900 uppercase">
                      Orientation & Consultation
                    </h4>
                    <p className="mt-2 text-base leading-6 text-black">
                      Our team will reach out to schedule an orientation session—either virtual or in-person. We’ll cover program details, customization options, fees, and address any questions you may have.
                    </p>
                  </div>
                </div>
              </li>
              <li className="text-left">
                <div className="flex flex-col sm:flex-row items-start animate-fade-in">
                  <div
                    className="flex flex-col items-center justify-center sm:mr-5 mb-5 sm:mb-0 animate-scale-up"
                  >
                    <div className="flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-customBlue text-white border-4 border-white text-xl font-semibold transform hover:scale-110 transition-transform duration-300">
                      <span className="text-yellow-500 text-2xl sm:text-3xl">🤝</span>
                    </div>
                    <span className="text-gray-500 mt-2">STEP 3</span>
                  </div>
                  <div className="bg-gray-100 p-3 pb-10 rounded-lg shadow-md w-full transform hover:scale-105 transition-transform duration-300">
                    <h4 className="text-lg sm:text-xl leading-6 font-semibold text-gray-900 uppercase">
                      Confirm Your Enrolment
                    </h4>
                    <p className="mt-2 text-base leading-6 text-black">
                      Once you are ready, complete your registration by submitting the required documents and payment details. You all then receive a welcome kit with your program is itinerary and pre-departure guidelines to ensure a smooth and exciting journey ahead!
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>








      {/* new button  */}
      <div className="flex items-center justify-center mt-3 mb-3 bg-white">

        <button
          className="bg-customBlue text-white px-6 py-3 rounded-md font-semibold transition-all hover:bg-red-700 animate-zoom"
          onClick={toggleModal}
        >
          Apply Now
        </button>

        <style>{`
        @keyframes zoom {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes pulse-zoom {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.8;
          }
        }

        @keyframes breathe-zoom {
          0%, 100% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.05);
          }
          60% {
            transform: scale(0.95);
          }
        }

        .animate-zoom {
          animation: zoom 2s infinite ease-in-out;
        }

   
        .animate-pulse-zoom {
          animation: pulse-zoom 3s infinite ease-in-out;
        }

        .animate-breathe-zoom {
          animation: breathe-zoom 4s infinite ease-in-out;
        }

         
        button:hover {
          animation: none;
          transform: scale(1.1);
          transition: all 0.3s ease;
        }
      `}</style>
      </div>
      {/* new button end */}
      <div className="relative flex items-center justify-center bg-gray-100">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Apply Now</h2>
                <button onClick={toggleModal} className="text-gray-500 hover:text-red-800">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input className={`h-12 border-b ${errors.fullName ? "border-red-500" : "border-gray-300"} px-3`} type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name*" />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

                <input className={`h-12 border-b ${errors.school ? "border-red-500" : "border-gray-300"} px-3`} type="text" name="school" value={formData.school} onChange={handleChange} placeholder="School Name*" />
                {errors.school && <p className="text-red-500 text-sm">{errors.school}</p>}

                <input className={`h-12 border-b ${errors.email ? "border-red-500" : "border-gray-300"} px-3`} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address*" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                <input className={`h-12 border-b ${errors.phoneNumber ? "border-red-500" : "border-gray-300"} px-3`} type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number (+Country Code)*" />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

                <textarea className={`block w-full h-28 border-b ${errors.enquiry ? "border-red-500" : "border-gray-300"} px-3 py-2 resize-none`} name="enquiry" value={formData.enquiry} onChange={handleChange} placeholder="Enquiry*"></textarea>
                {errors.enquiry && <p className="text-red-500 text-sm">{errors.enquiry}</p>}

                <button type="submit" className="w-full bg-customBlue text-white py-3 rounded-md hover:bg-red-700 transition-all duration-300 font-semibold">Submit</button>
              </form>
            </div>
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default HowToApply;
