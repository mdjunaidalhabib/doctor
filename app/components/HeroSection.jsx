import React from "react";

const HeroBanner = () => {
  return (
    <section className="md:bg-[url('/images/slider-bg-1.jpg')] bg-cover bg-center bg-no-repeat my-14  h-auto md:h-[700px] flex items-center text-white">
      <div className="container px-6 md:px-10 max-w-7xl mx-auto md:-mt-25">
        <div className="grid grid-cols-1 lg:grid-cols-2 text-left">
          <div>
            <div className="hidden sm:block h-1 w-20 bg-blue-600 my-6 "></div>
            <h3 className="uppercase mt-3 text-sm tracking-widest text-blue-600 font-semibold">
              Professional Care For Your Health
            </h3>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-600 my-2 leading-snug md:leading-tight">
              Good Health Moves Us Forward
            </h1>
            <p className="text-blue-600 text-base md:text-lg mb-8 text-justify">
              Humanity stands as a cornerstone of professionalism for any
              doctor. Here at our clinic, we prioritize your holistic
              well-being, nurturing both your mental and physical health with
              meticulous care.
            </p>
            <a
              href="../appointment"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300"
            >
              Make appointment
              <i className="icofont icofont-simple-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
