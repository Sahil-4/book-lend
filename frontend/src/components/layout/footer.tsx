import Link from "next/link";
import styles from "@/styles/components/layout/footer.module.css";

const Footer = () => {
  const quickLinks = [
    { key: "101", name: "Home", href: "/" },
    { key: "102", name: "Browse Books", href: "/browse" },
    { key: "103", name: "Lend Your Book", href: "/add" },
    { key: "104", name: "How It Works", href: "/how" },
    { key: "105", name: "Accounts Settings", href: "/user/settings" },
  ];

  const supportLinks = [
    { key: "201", href: "/contact", name: "Contact Us" },
    { key: "202", href: "/faqs", name: "FAQs" },
    { key: "203", href: "/privacy-policy", name: "Privacy Policy" },
    { key: "204", href: "/terms", name: "Terms of Services" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_section_1}>
        <span>About Us</span>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer
          took a galley of type
        </p>
      </div>
      <div className={styles.footer_section_2}>
        <span>Quick Links</span>
        <ul>
          {quickLinks.map((qLink) => {
            return (
              <li key={qLink.key}>
                <Link href={qLink.href}>{qLink.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.footer_section_3}>
        <span>Support Links</span>
        <ul>
          {supportLinks.map((sLink) => {
            return (
              <li key={sLink.key}>
                <Link href={sLink.href}>{sLink.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
