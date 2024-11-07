const CallbackBasedFilter = (userArray, callback) => {
  const filteredArray = [];
  let arrayIndex = 0;

  const nextElementCheck = () => {
    if (arrayIndex < userArray.length) {
      const element = userArray[arrayIndex++];

      setTimeout(() => {
        if (callback(element)) {
          filteredArray.push(element);
        }
        nextElementCheck();
      }, 200);

    } 
    else {
      console.log(filteredArray);
    }
  };

  nextElementCheck();
};

// Test cases
let firstArray = [1, 2, 3, 4, 5, 6];
let secondArray = ['a', 'b', 'c', 'd', 'h', 'w'];

CallbackBasedFilter(
  firstArray,
  (x) => x % 2 === 0
);

CallbackBasedFilter(
  firstArray,
  (y) => y > 2
)

CallbackBasedFilter(
  secondArray,
  (n) => 'hello world'.split('').includes(n)
)
