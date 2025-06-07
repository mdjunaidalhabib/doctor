"use client";
import React, { useState, useEffect } from "react";
import SocialIcons from "./SocialIcons";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (emailSubmitted) {
      const timer = setTimeout(() => {
        setEmailSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [emailSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const email = e.target.email.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;

    // Simple validation
    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    const data = { email, subject, message };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      setEmailSubmitted(true);

      // Clear only the input fields, keep the form visible
      e.target.email.value = "";
      e.target.subject.value = "";
      e.target.message.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
      setErrorMessage("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="my-15 mt-20 text-black dark:text-white">
      <h2 className=" text-center text-4xl font-bold ">Contact me</h2>
      <section className="grid md:grid-cols-2 my-4 md:my-4 py-5 gap-4 relative">
        <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>

        <div className="z-10 text-center">
          <h5 className="text-xl font-bold  my-2">Let&apos;s Connect</h5>
          <p className=" mb-4 max-w-md mx-auto">
            I&apos;m currently looking for new opportunities, my inbox is always
            open. Whether you have a question or just want to say hi, I&apos;ll
            try my best to get back to you!
          </p>
          <SocialIcons />
        </div>

        <div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {emailSubmitted && (
              <div className="text-green-500 text-lg font-semibold mb-4 animate-fade-in">
                ✅ Email sent successfully!
              </div>
            )}
            {errorMessage && (
              <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
            )}

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium"
                aria-label="Your email"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="jacob@google.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className=" block text-sm mb-2 font-medium"
                aria-label="Subject"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Subject"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm mb-2 font-medium"
                aria-label="Message"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-0 lg:px-3 inline-block py-1 w-full shadow-xl lg:m-3 sm:w-fit rounded-full bg-violet-700 hover:bg-fuchsia-600 text-white mt-3 text-center"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EmailSection;
