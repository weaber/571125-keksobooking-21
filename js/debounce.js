'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 500;
  let lastTimeout;

  const debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    debounce
  };
})();
