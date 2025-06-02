import React from "react";

const About = () => {
  return (
    <section id="about" className="py-12 px-6 md:px-10 py-2 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col justify-center h-full text-justify">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
              About Dr. Md Junaid Al Habib
            </h2>
            <p className="text-sm sm:text-base text-black dark:text-white mb-4">
              Dr. Emily Sanchez is a highly skilled and compassionate physician
              with over 15 years of experience in internal medicine. She
              obtained her medical degree from Harvard Medical School, where she
              graduated with honors, showcasing her dedication to academic
              excellence.
            </p>
            <p className="text-sm sm:text-base text-black dark:text-white mb-4">
              Dr. Sanchez completed her residency training at Massachusetts
              General Hospital, one of the nation's top-ranked hospitals, where
              she honed her clinical expertise and developed a deep
              understanding of complex medical conditions.
            </p>
            <p className="text-sm sm:text-base text-black dark:text-white mb-4">
              Known for her warm bedside manner and empathetic approach, Dr.
              Sanchez takes the time to listen to her patients' concerns and
              collaborates with them to develop personalized treatment plans.
              She believes in the importance of holistic care, addressing not
              only the physical aspects of illness but also the emotional and
              psychological well-being of her patients.
            </p>
            <p className="lg:hidden text-sm sm:text-base text-black dark:text-white">
              In her spare time, Dr. Sanchez enjoys hiking in the great outdoors
              and spending quality time with her family. She brings a genuine
              passion for healing and a deep sense of compassion to her
              practice, earning the trust and admiration of her patients and
              colleagues alike.
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/images/profile-1.jpg"
            alt="Dr."
            className="rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md mb-6 lg:mb-0"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
