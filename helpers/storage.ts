export const storeItem = (key: string, value: any) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getStoredItem = (key: string) =>
  JSON.parse(localStorage.getItem(key));
