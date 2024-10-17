const debounce = (closure, waitInMiliseconds) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        closure.apply(this, args);
    }, waitInMiliseconds);
  };
}

export default debounce;
