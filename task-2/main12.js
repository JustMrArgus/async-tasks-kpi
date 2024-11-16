// Promise.all solution
const promiseBasedFilter = (array, predicateFunc) => {
  const filteredArray = [];

  let promises = array.map((item) => {
    return Promise.resolve(predicateFunc(item))
    .then((result) => {
      if (result) {
        filteredArray.push(item);
      }
    })
  })

  return Promise.all(promises)
  .then(() => {
    return filteredArray;
  })
};

// test cases
const firstArray = [1, 2, 3, 4, 5, 6];
const secondArray = ['a', 'o', 'b', 'w', 'h', 'z'];

promiseBasedFilter(
  firstArray,
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