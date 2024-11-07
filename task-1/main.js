const callbackFilter = (userArray, callback) => {
  const filteredAray = [];
  for (element of userArray) {
    if (callback(element) === true) {
      filteredAray.push(element);
    }
  }
  return filteredAray;
}