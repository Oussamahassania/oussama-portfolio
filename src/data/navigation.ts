export type NavItem = {
  label: string;
  href: string;
  index: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home", index: "00" },
  { label: "About", href: "#about", index: "01" },
  { label: "Skills", href: "#skills", index: "02" },
  { label: "Projects", href: "#projects", index: "03" },
  { label: "Experience", href: "#experience", index: "04" },
  { label: "Certifications", href: "#certifications", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
];
