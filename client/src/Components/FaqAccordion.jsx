import { useState } from "react";
import PropTypes from "prop-types";

import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";

const FaqAccordion = ({ title, anss }) => {
  const [faq, setFaq] = useState(false);
  return (
    <div className="py-2">
      <div className="flex flex-col text-start font-medium justify-center sm:px-8 px-4 gap-4">
        <div className="w-full">
          <div className="bg-white border border-gray-300 shadow-md rounded-xl transition-all duration-300">
            {/* Header */}
            <div
              className="flex justify-between items-center bg-gradient-to-r from-red-500 to-red-300 text-white py-4 px-6 cursor-pointer hover:from-purple-red hover:to-red-600 rounded-t-xl"
              onClick={() => setFaq(!faq)}
            >
              <p className="text-lg">{title}</p>
              {faq ? (
                <IoMdArrowDropupCircle size={28} color="white" />
              ) : (
                <IoMdArrowDropdownCircle size={28} color="white" />
              )}
            </div>

            {/* Content */}
            <div
              className={`${faq ? "max-h-full opacity-100" : "max-h-0 opacity-0"
                } bg-gray-50 text-gray-700 py-4 px-6 text-sm font-light overflow-hidden transition-all duration-500`}
            >
              <span>{anss}</span>
            </div>
          </div>
        </div>
      </div>
    </div>



  );
};

FaqAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  anss: PropTypes.string.isRequired,
};

export default FaqAccordion;
