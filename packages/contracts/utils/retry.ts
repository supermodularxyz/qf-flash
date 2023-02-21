export const retry = (fn: any, ms = 500) =>
  new Promise((resolve) => {
    fn()
      .then(resolve)
      .catch(() => {
        setTimeout(() => {
          console.log("retrying...");
          retry(fn, ms).then(resolve);
        }, ms);
      });
  });
