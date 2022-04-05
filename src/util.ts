export interface IntersectionOptions {
  onIntersecting?: (entry: IntersectionObserverEntry) => void;
}

export const createIntersection = ({ onIntersecting }: IntersectionOptions = {}) => {
  const intersection = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && typeof onIntersecting === 'function') {
        onIntersecting(entry);
      }
    });
  });

  return intersection;
};
