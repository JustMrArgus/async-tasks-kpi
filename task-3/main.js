const promiseBasedFilter = (array, userSignal, predicateFunc) => {
  const filteredArray = [];

  let promises = array.map((item) => {
    return Promise.resolve(predicateFunc(item, userSignal))
      .then((result) => {
        if (result) {
          filteredArray.push(item);
        }
      });
  });

  return Promise.all(promises)
    .then(() => filteredArray);
};

// Test cases
const controller = new AbortController();
const mySignal = controller.signal;

const firstArray = [1, 2, 3, 4, 5, 6];
const secondArray = ['a', 'o', 'b', 'w', 'h', 'z'];

setTimeout(() => controller.abort(), 800);

promiseBasedFilter(
  firstArray,
  mySignal,
  (elem, signal) => {
    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new Error("Aborted"));
        return;
      }

      const onAbort = () => {
        clearTimeout(timeout);
        reject(new Error("Aborted"));
      };

      signal.addEventListener('abort', onAbort);

      const timeout = setTimeout(() => {
        signal.removeEventListener('abort', onAbort);
        resolve(elem % 2 === 0);
      }, 1000);
    });
  }
)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });

promiseBasedFilter(
  secondArray,
  mySignal,
  (elem, signal) => {
    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new Error("Aborted"));
        return;
      }

      const onAbort = () => {
        clearTimeout(timeout);
        reject(new Error("Aborted"));
      };

      signal.addEventListener('abort', onAbort);

      const timeout = setTimeout(() => {
        signal.removeEventListener('abort', onAbort);
        resolve('hello world'.split('').includes(elem));
      }, 1000);
    });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

promiseBasedFilter(
  secondArray,
  mySignal,
  (elem, signal) => {
    return new Promise((resolve, reject) => {
      if (signal.aborted) {
        reject(new Error("Aborted"));
        return;
      }

      const onAbort = () => {
        clearTimeout(timeout);
        reject(new Error("Aborted"));
      };

      signal.addEventListener('abort', onAbort);

      const timeout = setTimeout(() => {
        reject(new Error("Test error"));
      }, 1000);
    });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });