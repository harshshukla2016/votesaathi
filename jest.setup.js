import '@testing-library/jest-dom';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    __esModule: true,
    ...actual,
    AnimatePresence: ({ children }) => <>{children}</>,
    motion: {
      div: require('react').forwardRef(({ children, ...props }, ref) => {
        const { initial, animate, exit, whileInView, viewport, transition, ...validProps } = props;
        return <div ref={ref} {...validProps}>{children}</div>;
      }),
      span: require('react').forwardRef(({ children, ...props }, ref) => {
        const { initial, animate, exit, whileInView, viewport, transition, ...validProps } = props;
        return <span ref={ref} {...validProps}>{children}</span>;
      }),
      p: require('react').forwardRef(({ children, ...props }, ref) => {
        const { initial, animate, exit, whileInView, viewport, transition, ...validProps } = props;
        return <p ref={ref} {...validProps}>{children}</p>;
      }),
    },
  };
});
