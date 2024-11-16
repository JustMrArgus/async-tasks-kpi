// Promise-based solution
const promiseBasedFilter = (array, predicateFunc) => {
  return new Promise((resolve, reject) => {

      const filteredArray = [];

      let completed = 0;

      if (array.length === 0) {
          resolve([]);
          return;
      }

      for (let i = 0; i < array.length; i++) {
          let item = array[i];

          Promise.resolve(predicateFunc(item))
          .then((result) => {
              if (result) {
                filteredArray.push(item);
              }
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            completed++;
              if (completed === array.length) {
                  resolve(filteredArray);
              }
          });
      }
  });
}

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
