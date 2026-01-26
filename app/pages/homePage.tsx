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
      <p className="text-black text-center p-3 m-3 text-xs ">
        <a href="https://x-dev.site" target="_blank" rel="noopener noreferrer">
          Made By{" "}
          <span className="underline decoration-green-600 text-pink-600">
            X.developer</span>{" "}💕
        </a>
      </p>
    </div>
  );
}
