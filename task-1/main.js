const CallbackBasedFilter = (userArray, userFilter, finalCallback) => {
  const filteredArray = [];
  let elementsLeft = userArray.length;

  for (let i = 0; i < userArray.length; i++) {
    userFilter(userArray[i], (error, isMatch) => {

      if (error) {
        finalCallback(error, null);
        return;
      }

      if (isMatch) {
        filteredArray.push(userArray[i]);
      }
      
      elementsLeft--;
      if (elementsLeft === 0) {
        finalCallback(null, filteredArray);
      }
    });
  }
}

// Test cases
const firstArray = [1, 2, 3, 4, 5, 6];
const secondArray = ['a', 'o', 'b', 'w', 'h', 'z'];

CallbackBasedFilter(
  firstArray,
  (x, cb) => {
    setTimeout(() => {
      cb(null, x % 2 === 0);
    }, 1000);
  },
  (error, filter) => {
    if (error) {
      console.log("Error occurred:", error);
    } 
    else {
      console.log("Filtered Array:", filter);
    }
  }
);

CallbackBasedFilter(
  secondArray,
  (x, cb) => {
    setTimeout(() => {
      cb(null, 'hello world'.split('').includes(x));
    }, 1000);
  },
  (error, filter) => {
    if (error) {
      console.log("Error occurred:", error);
    } 
    else {
      console.log("Filtered Array:", filter);
    }
  }
);

CallbackBasedFilter(
  firstArray,
  (x, cb) => {
    setTimeout(() => {
      if (x === 3) {
        cb(new Error("Test error"), null);
      } 
      else {
        cb(null, x > 2);
      }
    }, 1000);
  },
  (error, filter) => {
    if (error) {
      console.log("Error occurred:", error);
    } 
    else {
      console.log("Filtered Array:", filter);
    }
  }
);

CallbackBasedFilter(
  firstArray,
  (x, cb) => {
    setTimeout(() => {
      cb(null, x > 2);
    }, 1000);
  },
  (error, filter) => {
    if (error) {
      console.log("Error occurred:", error);
    } 
    else {
      console.log("Filtered Array:", filter);
    }
  }
);