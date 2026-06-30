import React, { useEffect } from "react";
import { Linkedin, Github, Mail, Phone } from "lucide-react";
import "./Sidebar.css";

const links = [
  {
    href: "https://www.linkedin.com/in/jack-spinola-0a835927b/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  { href: "https://github.com/kokas340", label: "GitHub", Icon: Github },
  { href: "mailto:jackspinola198@hotmail.com", label: "Email", Icon: Mail },
  {
    href: "https://api.whatsapp.com/send/?phone=4591450703&text&type=phone_number&app_absent=0",
    label: "WhatsApp",
    Icon: Phone,
  },
];

function Sidebar() {
  useEffect(() => {
    document.querySelector(".sidebar")?.classList.add("show");
  }, []);

  return (
    <div className="sidebar">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="sidebar-link"
        >
          <Icon size={20} strokeWidth={2} />
        </a>
      ))}
    </div>
  );
}

export default Sidebar;
