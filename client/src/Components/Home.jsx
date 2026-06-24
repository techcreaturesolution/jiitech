import { useEffect } from "react";
import HeroCarousel from "./HeroCarousel";
import OurProduct from "./OurProduct";
import WhyArisezen from "./WhyArisezen";
import Contact from "./Contact";
import BusinessCentric from "./BusinessCentric";
import Footer from "./Footer";
import OurMission from "./OurMission";
const Home = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <>
      <HeroCarousel />
      <OurMission/>
      <BusinessCentric />
      <OurProduct />
      <Contact />
      {/* <Services /> */}
      <WhyArisezen />
      {/* <Faq /> */}
      <Footer />
    </>
  );
};

export default Home;
