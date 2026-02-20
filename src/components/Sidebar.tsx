import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Layers, Wrench, Mail, Menu, X, Briefcase, GraduationCap, FolderOpen, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import myPhoto from "@/assets/my-photo.jpg";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "stacks", label: "Stacks", icon: Layers },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "experience", label: "Work", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail },
];

const Sidebar = () => {
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.getBoundingClientRect().top <= 150) {
          setActive(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile controls */}
      <div className="fixed top-5 right-5 z-50 flex items-center gap-3 lg:hidden">
        {/* Mobile Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-card border border-border text-foreground shadow-md transition-all duration-300"
          aria-label="Toggle theme"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </motion.div>
        </button>

        {/* Mobile Menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md bg-card border border-border text-foreground shadow-md"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 z-40 h-full w-20 bg-card/80 backdrop-blur-md border-r border-border flex-col items-center py-6 gap-1 transition-transform duration-300
          lg:flex ${mobileOpen ? "flex" : "hidden"}`}
      >
        {/* Logo */}
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 mb-6 group cursor-pointer hover:border-primary transition-all duration-300" onClick={() => scrollTo('home')}>
          <img
            src={myPhoto}
            alt="OI"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-col gap-0.5 flex-1 justify-center overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`group relative flex flex-col items-center justify-center w-14 h-12 rounded-lg mx-auto transition-all duration-300 ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
              >
                <Icon size={18} />
                <span className="text-[9px] mt-0.5 font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Theme toggle (Desktop) */}
        <button
          onClick={toggleTheme}
          className="hidden lg:flex w-10 h-10 rounded-xl bg-secondary border border-border items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 mt-2"
          aria-label="Toggle theme"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </motion.div>
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
