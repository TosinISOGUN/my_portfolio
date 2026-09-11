import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useLocation,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { restorePendingCaseStudyReturn } from "../lib/navigation-memory";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oluwatomisin Isogun",
  jobTitle: "Frontend Developer",
  email: "mailto:oluwatomisinisogun@gmail.com",
  url: "https://github.com/TosinISOGUN",
  sameAs: [
    "https://github.com/TosinISOGUN",
    "https://www.linkedin.com/in/oluwatomisin-isogun-a38740356/",
  ],
  knowsAbout: [
    "React",
    "TypeScript",
    "Frontend Engineering",
    "Product Engineering",
    "Dashboard Interfaces",
    "Booking Platforms",
    "Atlassian Forge",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Frontend development for product teams",
    },
  },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Oluwatomisin Isogun Portfolio" },
      {
        name: "description",
        content: "Portfolio of Oluwatomisin Isogun, frontend developer.",
      },
      { name: "author", content: "Oluwatomisin Isogun" },
      { property: "og:title", content: "Oluwatomisin Isogun Portfolio" },
      {
        property: "og:description",
        content: "Frontend work across booking platforms, dashboards, and marketplace products.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],

  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollManager />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

function ScrollManager() {
  const location = useLocation({
    select: ({ pathname, hash }) => ({ pathname, hash }),
  });
  const hasMounted = useRef(false);
  const latestLocation = useRef(location);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if (!hasMounted.current) {
      hasMounted.current = true;
      latestLocation.current = location;

      if (location.pathname === "/" && !location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        });
      }

      return;
    }

    latestLocation.current = location;

    const hash = location.hash?.replace(/^#/, "");

    const restoreCaseStudyReturn = () => {
      const restored = restorePendingCaseStudyReturn({ persist: true });
      if (restored) {
        window.requestAnimationFrame(() => {
          restorePendingCaseStudyReturn({ persist: true });
          window.setTimeout(() => restorePendingCaseStudyReturn({ persist: true }), 80);
          window.setTimeout(() => restorePendingCaseStudyReturn(), 240);
        });
      }
      return restored;
    };

    if (restoreCaseStudyReturn()) {
      return;
    }

    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.hash, location.pathname]);

  return null;
}
