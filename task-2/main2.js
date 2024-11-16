// async/await solution
const asyncBasedFilter = async (array, predicateFunc) => {
  const filteredArray = []

  for (let i = 0; i < array.length; i++) {
    const result = await predicateFunc(array[i]);
      if (result) {
      filteredArray.push(array[i]);
    }
  }

  return filteredArray;
};

// test cases
const firstArray = [1, 2, 3, 4, 5, 6];
const secondArray = ['a', 'o', 'b', 'w', 'h', 'z'];

asyncBasedFilter(
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

asyncBasedFilter(
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

asyncBasedFilter(
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
