import React from "react";

const Services = () => {
  return (
    <section id="services" className="px-6 md:px-10 py-2 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white">
          Services
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto my-4"></div>
        <p className="text-black dark:text-white text-sm sm:text-base">
          Comprehensive Healthcare Services at Dr. Emily Sanchez's Clinic
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
        {/* Service Item */}
        <div className="bg-emerald-200 dark:bg-slate-900 shadow-lg rounded-lg shadow p-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <i className="icofont-laboratory text-3xl text-blue-500"></i>
            <h4 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
              Physical Examination
            </h4>
          </div>
          <p className="text-black dark:text-white text-sm sm:text-base">
            Health assessments tailored to individual needs, including vital
            signs monitoring
          </p>
        </div>

        {/* Service Item */}
        <div className="bg-emerald-200 dark:bg-slate-900 shadow-lg rounded-lg shadow p-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <i className="icofont-heart-beat-alt text-3xl text-red-500"></i>
            <h4 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
              Care and Wellness
            </h4>
          </div>
          <p className="text-black dark:text-white text-sm sm:text-base">
            Preventive care plans to promote overall health and well-being,
            including vaccinations
          </p>
        </div>

        {/* Service Item */}
        <div className="bg-emerald-200 dark:bg-slate-900 shadow-lg rounded-lg shadow p-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <i className="icofont-tooth text-3xl text-yellow-500"></i>
            <h4 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
              Disease Management
            </h4>
          </div>
          <p className="text-black dark:text-white text-sm sm:text-base">
            Treatment plans for managing chronic conditions such as diabetes,
            hypertension, asthma, and arthritis
          </p>
        </div>

        {/* Service Item */}
        <div className="text-center bg-emerald-200 dark:bg-slate-900 shadow-lg rounded-lg shadow p-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <i className="icofont-crutch text-3xl text-purple-500"></i>
            <h4 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
              Medication
            </h4>
          </div>
          <p className="text-black dark:text-white text-sm sm:text-base">
            Personalized medication management plans to ensure safe and
            effective use of prescription medications
          </p>
        </div>

        {/* Service Item */}
        <div className="bg-emerald-200 dark:bg-slate-900 shadow-lg rounded-lg shadow p-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <i className="icofont-brain-alt text-3xl text-green-500"></i>
            <h4 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
              Diagnostic Testing
            </h4>
          </div>
          <p className="text-black dark:text-white text-sm sm:text-base">
            In-house diagnostic testing services, including laboratory tests,
            imaging studies (X-rays, ultrasounds)
          </p>
        </div>

        {/* Service Item */}
        <div className="bg-emerald-200 dark:bg-slate-900 shadow-lg rounded-lg shadow p-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <i className="icofont-dna-alt-1 text-3xl text-pink-500"></i>
            <h4 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
              Nutritional Guidance
            </h4>
          </div>
          <p className="text-black dark:text-white text-sm sm:text-base">
            Personalized dietary assessments and nutritional counseling to
            support optimal health and manage
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
