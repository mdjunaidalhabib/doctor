"use client";
import {
  FaFacebook,
  FaYoutube,
  FaWhatsapp,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import Link from "next/link";

const socialLinks = [
  {
    href: "tel:+8801788-563988", // 👈 এখানে নিজের ফোন নম্বর বসাও
    icon: <FaPhone className="text-green-800 w-5 h-5" />,
    label: "Call Now",
    bg: "bg-green-50 border-green-300",
  },
  {
    href: "https://wa.me/8801788-563988",
    icon: <FaWhatsapp className="text-green-600 w-5 h-5" />,
    label: "WhatsApp",
    bg: "bg-green-100 border-green-300",
  },
  {
    href: "https://facebook.com/mdjunaidalhabib2006",
    icon: <FaFacebook className="text-blue-600 w-5 h-5" />,
    label: "Facebook",
    bg: "bg-blue-100 border-blue-300",
  },
  {
    href: "https://youtube.com/@yourchannel",
    icon: <FaYoutube className="text-red-600 w-5 h-5" />,
    label: "YouTube",
    bg: "bg-red-100 border-red-300",
  },

  {
    href: "https://linkedin.com/in/yourprofile",
    icon: <FaLinkedin className="text-blue-700 w-5 h-5" />,
    label: "LinkedIn",
    bg: "bg-blue-50 border-blue-300",
  },
];

export default function SocialIcons() {
  return (
    <div className="w-full flex justify-center gap-4 mt-6 py-3 flex-wrap ">
      {socialLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`p-3 rounded-full border ${link.bg} hover:scale-110 active:scale-95 transition-transform duration-200 shadow-sm hover:shadow-md`}
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
}
