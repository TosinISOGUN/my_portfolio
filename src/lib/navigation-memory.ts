const CASE_STUDY_RETURN_KEY = "portfolio-case-study-return";
const CASE_STUDY_PENDING_RESTORE_KEY = "portfolio-case-study-pending-restore";

export type CaseStudyReturnPoint = {
  url: string;
  x: number;
  y: number;
};

const getCurrentUrl = () =>
  `${window.location.pathname}${window.location.search}${window.location.hash}`;

export const rememberCaseStudyReturn = () => {
  if (typeof window === "undefined") return;

  try {
    const returnPoint: CaseStudyReturnPoint = {
      url: getCurrentUrl(),
      x: window.scrollX,
      y: window.scrollY,
    };
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
    if (!persist) sessionStorage.removeItem(CASE_STUDY_PENDING_RESTORE_KEY);
    return true;
  } catch {
    return false;
  }
};
