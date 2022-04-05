import React, { useEffect, useRef } from 'react';
import { createIntersection } from './util';

export interface InfiniteScrollProps {
  children: React.ReactNode;
  loadFn: () => void;
  hasMore: boolean;
  threshold?: number;
}

function InfiniteScroll({ children, loadFn, hasMore, threshold }: InfiniteScrollProps) {
  const intersectionRef = useRef<IntersectionObserver>(null);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const intersection = createIntersection({
      onIntersecting: loadFn,
    });

    (intersectionRef.current as unknown) = intersection;

    return () => {
      intersection.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!elementRef.current || !intersectionRef.current) return;
    if (!hasMore) {
      intersectionRef.current?.unobserve(elementRef.current);
      return;
    }

    intersectionRef.current.observe(elementRef.current);
  }, [intersectionRef.current, elementRef.current, hasMore]);

  return (
    <>
      {children}
      <span
        ref={elementRef}
        style={{
          position: 'relative',
          top: threshold ? `-${threshold}px` : 0,
          display: 'block',
        }}
      />
    </>
  );
}

InfiniteScroll.defaultProps = {
  threshold: 0,
};

export default InfiniteScroll;
