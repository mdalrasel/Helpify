import { FaArrowRight } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import banner01 from "../../src/assets/banner01.jpg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div
      className=" min-h-[50vh]  rounded-2xl bg-cover bg-center flex items-center text-white px-6 mx-4"
      style={{
        backgroundImage: `url(${banner01})`,
      }}
    >
      <div data-aos="fade-up" className="p-8 ">
        <h1 data-aos="fade-right" className="text-3xl md:text-5xl font-bold mb-4 ">
          <span className="text-green-200 ">Welcome to</span> <br />
          The World’s Best{" "}
          <span className="text-green-900 block min-h-[60px]">
            <Typewriter
              words={[
                "Learning Platform",
                "Online Course Hub",
                "Global Knowledge Base",
                "Future Skills Academy",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h1>
        <p className="mt-2 text-lg" data-aos="fade-left">
          Learn from top instructors and gain real-world skills from anywhere in the world.
        </p>
        <button className="custom-btn custom-btn:hover mt-5 ">
          <Link to="/allPost" data-aos="zoom-in" className=" rounded-full flex items-center gap-2 mx-auto">
            Explore More <FaArrowRight />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Banner;
