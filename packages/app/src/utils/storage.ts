export const storage = {
  get: (key: string) => {
    try {
      return global.localStorage?.getItem(key);
    } catch (error) {
      console.log("localStorage error: ", error);
    }
  },
  set: (key: string, val: string) => {
    try {
      return global.localStorage?.setItem(key, val);
    } catch (error) {
      console.log("localStorage error: ", error);
    }
  },
};
