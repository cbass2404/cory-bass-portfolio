export const getPathname = () => {
  const location = window.location.pathname;

  const path = location.split('/');

  return path[1];
};
