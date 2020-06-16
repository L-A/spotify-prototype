export const storeItem = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
export const getStoredItem = (key) => JSON.parse(localStorage.getItem(key));
