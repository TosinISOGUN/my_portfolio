const CASE_STUDY_RETURN_KEY = "portfolio-case-study-return";
const CASE_STUDY_PENDING_RESTORE_KEY = "portfolio-case-study-pending-restore";

export type CaseStudyReturnPoint = {
  url: string;
  x: number;
  y: number;
  view?: string;
  scrollRoot?: string;
  rootX?: number;
  rootY?: number;
};

const getCurrentUrl = () =>
  `${window.location.pathname}${window.location.search}${window.location.hash}`;

const getScrollRoot = () =>
  document.querySelector<HTMLElement>("[data-case-study-scroll-root]");

const getScrollRootName = (scrollRoot: HTMLElement) =>
  scrollRoot.dataset.caseStudyScrollRoot || "primary";

const getReturnView = (scrollRoot?: HTMLElement | null) =>
  scrollRoot?.dataset.caseStudyReturnView ||
  document.querySelector<HTMLElement>("[data-case-study-return-view]")
    ?.dataset.caseStudyReturnView;

export const rememberCaseStudyReturn = () => {
  if (typeof window === "undefined") return;

  try {
    const scrollRoot = getScrollRoot();
    const returnPoint: CaseStudyReturnPoint = {
      url: getCurrentUrl(),
      x: window.scrollX,
      y: window.scrollY,
    };
    const returnView = getReturnView(scrollRoot);

    if (returnView) returnPoint.view = returnView;

    if (
      scrollRoot &&
      scrollRoot.scrollHeight > scrollRoot.clientHeight &&
      window.getComputedStyle(scrollRoot).overflowY !== "visible"
    ) {
      returnPoint.scrollRoot = getScrollRootName(scrollRoot);
      returnPoint.rootX = scrollRoot.scrollLeft;
      returnPoint.rootY = scrollRoot.scrollTop;
    }

    sessionStorage.setItem(CASE_STUDY_RETURN_KEY, JSON.stringify(returnPoint));
  } catch {
    // Ignore storage failures in private or restricted browser contexts.
  }
};

export const prepareCaseStudyReturnRestore = () => {
  if (typeof window === "undefined") return false;

  try {
    const savedReturn = sessionStorage.getItem(CASE_STUDY_RETURN_KEY);
    if (!savedReturn) return false;

    sessionStorage.setItem(CASE_STUDY_PENDING_RESTORE_KEY, savedReturn);
    return true;
  } catch {
    return false;
  }
};

export const getPendingCaseStudyReturnView = () => {
  if (typeof window === "undefined") return undefined;

  try {
    const savedReturn = sessionStorage.getItem(CASE_STUDY_PENDING_RESTORE_KEY);
    if (!savedReturn) return undefined;

    const returnPoint = JSON.parse(savedReturn) as Partial<CaseStudyReturnPoint>;
    if (returnPoint.url !== getCurrentUrl()) return undefined;

    return returnPoint.view;
  } catch {
    return undefined;
  }
};

export const restorePendingCaseStudyReturn = ({ persist = false } = {}) => {
  if (typeof window === "undefined") return false;

  try {
    const savedReturn = sessionStorage.getItem(CASE_STUDY_PENDING_RESTORE_KEY);
    if (!savedReturn) return false;

    const returnPoint = JSON.parse(savedReturn) as Partial<CaseStudyReturnPoint>;
    if (
      returnPoint.url !== getCurrentUrl() ||
      !Number.isFinite(returnPoint.x) ||
      !Number.isFinite(returnPoint.y)
    ) {
      return false;
    }

    window.scrollTo({ top: returnPoint.y, left: returnPoint.x, behavior: "auto" });

    if (returnPoint.scrollRoot) {
      const scrollRoot = document.querySelector<HTMLElement>(
        `[data-case-study-scroll-root="${returnPoint.scrollRoot}"]`,
      );

      if (!scrollRoot) return false;

      scrollRoot.scrollTo({
        top: Number(returnPoint.rootY) || 0,
        left: Number(returnPoint.rootX) || 0,
        behavior: "auto",
      });
    }

    if (!persist) sessionStorage.removeItem(CASE_STUDY_PENDING_RESTORE_KEY);
    return true;
  } catch {
    return false;
  }
};
