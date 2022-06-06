export const getLSItem = (key) => {
  return localStorage.getItem(key);
};

export const setLSItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeLSItem = (key) => {
  localStorage.removeItem(key);
};
