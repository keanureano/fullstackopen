const LOCAL_STORAGE_USER_KEY = "localStorageUser";

const set = (user) => {
  window.localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
};

const get = () => {
  const localStorageUser = window.localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  if (!localStorageUser) {
    return null;
  }
  const user = JSON.parse(localStorageUser);
  return user;
};

const clear = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
};

export default { set, get, clear };
