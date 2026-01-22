import NavBar from "./navBar";
import LandingPage from "./landingPage";
import Work from "./work";
import Services from "./services";
import ContactUs from "./contactUs";
import Testimonial from "./testimonial";


export default function Homepage() {
  console.log("hellow");
  return (
    <div className="flex flex-col h-auto bg-gray-200 w-full">
      <NavBar />
      <LandingPage />
      <Work />
      <Testimonial />
      <Services />
      <ContactUs />
    </div>
  );
}
