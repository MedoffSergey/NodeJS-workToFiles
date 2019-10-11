const fs = require('fs');
const path = require('path');

function readDirAsync(directory) { // Функция чтения асинхронно
  return new Promise(function(resolve, reject) { // Возвращает промис
    fs.readdir(directory, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function readFileAsync(directory) { // Функция чтения асинхронно
  return new Promise(function(resolve, reject) { // Возвращает промис
    fs.readFile(directory, { encoding: 'utf8' }, function(err, fileStr) {
      if (err) reject(err);
      else resolve(fileStr);
    });
  });
}

function statAsync(directory) { // Функция чтения асинхронно
  return new Promise(function(resolve, reject) { // Возвращает промис
    fs.stat(directory, function(err, fileStr) {
      if (err) reject(err);
      else resolve(fileStr);
    });
  });
}

function readSumFileASync(localBase) {
  return readFileAsync(localBase)
  .then(fileStr=>{
    let addSum = parseInt(fileStr || 0);
    return Promise.resolve(addSum)
  })
}

function countNumbers(directory) {
  return readDirAsync(directory)
    .then(subFolders => {
      const promArr = subFolders.map(item => {
        let localBase = path.join(directory, item);
        statAsync(localBase) // Сделать асинхроным
        .then(data=>{
          if (data.isDirectory()) {
            return countNumbers(localBase)
          } else {
            return readSumFileASync(localBase)
          }
        }).then(data=>console.log(data))

      })
      return Promise.all(promArr)
    })
    .then(results => {
      let sum = 0;
      results.forEach(addSum => sum += addSum)
      return sum
    })
}

countNumbers('/home/smedov/Work/Test_Files/Test_Folder_Files/') //вызываем функцию countNumbers
  .then(data => console.log(data))
