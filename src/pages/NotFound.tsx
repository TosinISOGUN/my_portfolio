import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <p className="text-8xl font-black text-primary/20 mb-2 font-mono">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-3">Page not found</h1>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all hover:translate-y-[-2px]"
        >
          <Home size={16} />
          Back to Home
        </a>
        <button
          onClick={() => window.history.back()}
          className="ml-3 inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-bold text-sm hover:border-foreground/40 transition-all"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
