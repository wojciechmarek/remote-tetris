const signalingServer = (() => {
  const events = {};

  return {
    emit(event, data) {
      if (events[event]) {
        events[event].forEach((callback) => callback(data));
      }
    },
    on(event, callback) {
      if (!events[event]) {
        events[event] = [];
      }
      events[event].push(callback);
    },
  };
})();
