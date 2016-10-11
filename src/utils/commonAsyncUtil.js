export const commonAsyncUtil = (promise) => {
  return promise
    .then(() => {
      // TODO : to add success action
    })
    .catch(() => {
      document.location.reload(true);
    });
};
