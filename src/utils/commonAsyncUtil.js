export const commonAsyncUtil = (promise) => {
  promise
    .then(() => {
      // TODO : to add success action
    })
    .catch(() => {
      document.location.reload(true);
    });
};
