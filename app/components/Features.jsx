import React from "react";

const Features = () => {
  return (
    <section className="relative z-10  px-6 md:px-10 md:-mt-30 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-pink-200 rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition duration-300 text-center lg:text-left">
            <div className="text-blue-600 text-4xl mb-4">
              <i className="icofont icofont-surgeon-alt"></i>
            </div>
            <span className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
              24 Hours Service
            </span>
            <h4 className="text-2xl font-bold mt-2 mb-4 text-gray-800">
              Online Appointment
            </h4>
            <p className="text-gray-600 mb-6">
              We've implemented the principle of family medicine, ensuring
              continuous care and support for you and your loved ones.
            </p>
            <a
              href="appoinment.html"
              className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Make an appointment
            </a>
          </div>

          {/* Feature 2 */}
          <div className="bg-pink-200 rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition duration-300 text-center lg:text-left">
            <div className="text-blue-600 text-4xl mb-4">
              <i className="icofont icofont-ui-clock"></i>
            </div>
            <span className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
              Timing Schedule
            </span>
            <h4 className="text-2xl font-bold mt-2 mb-4 text-gray-800">
              Working Hours
            </h4>
            <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
              <li className="flex justify-between border-b pb-1">
                <span>Sun - Wed:</span> <span>7:00 - 18:00</span>
              </li>
              <li className="flex justify-between border-b pb-1">
                <span>Thu - Fri:</span> <span>8:00 - 18:00</span>
              </li>
              <li className="flex justify-between">
                <span>Sat - Sun:</span> <span>9:00 - 18:00</span>
              </li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-pink-200 rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-lg transition duration-300 text-center lg:text-left">
            <div className="text-blue-600 text-4xl mb-4">
              <i className="icofont icofont-support"></i>
            </div>
            <span className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
              Emergency Cases
            </span>
            <h4 className="text-2xl font-bold mt-2 mb-4 text-gray-800">
              2-990-770-5550
            </h4>
            <p className="text-gray-600">
              Experience all-time support for emergencies. We embrace the
              principle of family medicine, ensuring continuous care. Connect
              with us for any urgent need.
            </p>
          </div>
        </div>
    </section>
  );
};

export default Features;
