export const getDebounce = () => {
  let timeoutId: number | null = null;

  return (callback: () => void, delay: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      callback();
      timeoutId = null;
    }, delay);
  };
};
