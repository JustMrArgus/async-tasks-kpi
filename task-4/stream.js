// Stream realisation

const fs = require('fs');

const replaceWord = (oldFilePath, newFilePath, oldWord, newWord) => {
  return new Promise((resolve, reject) => {

    const readStream = fs.createReadStream(oldFilePath, { encoding: 'utf8' });
    const writeStream = fs.createWriteStream(newFilePath, { encoding: 'utf8' });

    readStream
      .on('data', chunk => {
        const replacedChunk = chunk.replace(new RegExp(`\\b${oldWord}\\b`, 'g'), newWord);
        writeStream.write(replacedChunk);
      })
      .on('end', () => {
        resolve("Replaced, have fun OwO");
      })
      .on('error', (error) => {
        readStream.destroy();
        writeStream.end("Oops... Error has been occured UwU");
        reject(error);
      })
    });
}

// test cases

replaceWord("./task-4/stream-example.txt", "./task-4/stream-result1.txt", "Lorem", "Hello World")
  .then(result => console.log(result))
  .catch(error => console.error('Error occured:', error));

replaceWord("./task-4/stream-example.txt", "./task-4/stream-result2.txt", "ipsum", "Hello world")
  .then(result => console.log(result))
  .catch(error => console.error('Error occured:', error));

replaceWord("./task-3/stream-example.txt", "./task-4/stream-result3.txt", "ipsum", "Hello world")
  .then(result => console.log(result))
  .catch(error => console.error('Error occured:', error));