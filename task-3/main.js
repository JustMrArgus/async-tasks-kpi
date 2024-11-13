// Promise.all solution
const promiseBasedFilter = (array, signal, predicateFunc) => {
  const filteredArray = new Array(array.length).fill(null);

  let promises = array.map((item, index) => {
    return Promise.resolve(predicateFunc(item, signal))
    .then((result) => {
      if (signal.aborted) throw new Error('Operation aborted');
      if (result) {
        filteredArray[index] = item;
      }
    });
  });

  return Promise.all(promises)
  .then(() => {
    if (signal.aborted) throw new Error('Operation aborted');
    return filteredArray.filter((elem) => elem !== null);
  });
};

// test cases
const controller = new AbortController();
const mySignal = controller.signal;

const firstArray = [1, 2, 3, 4, 5, 6];
const secondArray = ['a', 'o', 'b', 'w', 'h', 'z'];

setTimeout(() => controller.abort(), 800);

promiseBasedFilter(
  firstArray,
  mySignal,
  (elem) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(elem % 2 === 0);
      }, 1000);
    })
  })
.then(result => {
  console.log(result);
})
.catch(error => {
  console.error(error);
});

promiseBasedFilter(
  secondArray,
  mySignal,
  (elem) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('hello world'.split('').includes(elem));
      }, 1000);
    })
  })
.then(result => {
  console.log(result);
}).
catch(error => {
  console.error(error);
});

promiseBasedFilter(
  secondArray,
  mySignal,
  (elem) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Test error"));
      }, 1000);
    })
  })
.then(result => {
  console.log(result);
})
.catch(error => {
  console.error(error);
});

promiseBasedFilter(
  firstArray,
  mySignal,
  (elem) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(elem > 2);
      }, 1000);
    })
  })
.then(result => {
  console.log(result);
})
.catch(error => {
  console.error(error);
});