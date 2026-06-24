import { useState} from "react";


import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";


const AdminNavbar = () => {
  const [navbar, setNavbar] = useState(false);
  // console.log(isHamTrue.service);

  const changeBackground = () => {
    if (window.scrollY >= 2) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  // useEffect(() => {
  //   Ensure the Google Translate script initializes
  //   if (window.google && window.google.translate) {
  //     window.googleTranslateElementInit();
  //   }
  // }, []);


  return (
    <div>
      {isOpenMenu && (
        <div className="sm:hidden fixed z-20 inset-0 bg-red-800">
          <div className="relative text-end mr-4 mt-6">
            <button className="" onClick={() => setIsOpenMenu(false)}>
              <ImCross color="white" size={45} />
            </button>
          </div>

          <div className="flex flex-col pt-8 text-white text-3xl font-[20px]  text-center gap-4 ">
            <Link to={"/admin-dashboard"}>DASHBOARD</Link>


            <p>
              <Link to={"/addgallary"}> ADD GALLARY </Link>
            </p>
            <p>
              <Link to={"/collaborationform"}> COLLABORATION FORM </Link>
            </p>
            <p>
              <Link to={"/opportunityform"}> OPPORTUNITY FORM </Link>
            </p>
            <p>
              <Link to={"/admin-login"}>LOGOUT</Link>
            </p>


            {/* <p>
              <Link to={"/howtoapply"}> HOW TO APPLY </Link>
            </p> */}


           
            {/* <p>
              <Link to={"/opportunities"}>OPPORTUNITIES</Link>
            </p> */}
             {/* <p>
              <Link to={"/collaboration"}>COLLABORATION </Link>
            </p> */}
            {/* <p>
              <Link to={"/contactus"}> CONTACT US </Link>
            </p> */}

          </div>
        </div>
      )}

      <div
        className={
          navbar
            ? "bg-white duration-300 fixed top-0 flex w-full z-10 items-center py-2 shadow-md"
            : "duration-300 fixed top-0 flex w-full z-10 items-center py-2 shadow-md"
        }
      >
        <div className="flex items-center sm:pl-12">
          <a href="/">

            <img
              src="/JIITECH.png"
              alt="Logo"
              className="w-60 sm:w-auto max-h-24"
            />
          </a>

        </div>

        <div className="sm:hidden mr-4 flex justify-end w-full">
          <button onClick={() => setIsOpenMenu(true)}>
            <GiHamburgerMenu size={40} color="black" />
          </button>
        </div>

        <div className="hidden sm:flex text-black font-bold  text-sm gap-3 pr-8 w-full justify-end">
          <p className="hover:text-red-700">
            <Link to={"/admin-dashboard"}> DASHBOARD</Link>
          </p>
          <p className="hover:text-red-700">
            <Link to={"/addgallary"}>ADD GALLARY</Link>
          </p>
          <p className="hover:text-red-700">
            <Link to={"/collaborationform"}>COLLABORATION FORM</Link>
          </p>
          <p className="hover:text-red-700">
            <Link to={"/opportunityform"}>OPPORTUNITY FORM</Link>
          </p>
          <p className="hover:text-red-700">
            <Link to={"/admin-login"}>LOGOUT</Link>
          </p>




          
          {/* <p className="hover:text-red-700">
            <Link to={"/howtoapply"}>HOW TO APPLY</Link>
          </p> */}

          {/* <p className="hover:text-red-700">
            <Link to={"/opportunities"}>OPPORTUNITIES</Link>
          </p> */}
          {/* <p className="hover:text-red-700">
            <Link to={"/collaboration"}>COLLABORATION </Link>
          </p> */}


          {/* <p className="hover:text-red-700">
            <Link to={"/contactus"}>CONTACT US</Link>
          </p> */}



        </div>
      </div>

    </div>
  );
};

export default AdminNavbar;
