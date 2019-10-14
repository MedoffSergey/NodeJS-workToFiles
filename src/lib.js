const fs = require('fs');
const path = require('path');

function readDirAsync(directory) { // Функция чтения дирректории асинхронно
  return new Promise(function(resolve, reject) { // Возвращает промис
    fs.readdir(directory, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function readFileAsync(directory) { // Функция чтения файлы асинхронно
  return new Promise(function(resolve, reject) { // Возвращает промис
    fs.readFile(directory, { encoding: 'utf8' }, function(err, fileStr) {
      if (err) reject(err);
      else resolve(fileStr);
    });
  });
}

function statAsync(directory) { // Функция понимания диретория это или файл
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
  //  console.log('addSum',addSum)
    return Promise.resolve(addSum)
  })
}

// function countNumbers (directory) {
//   return readDirAsync(directory)
//     .then(subFolders => {
//       const promArr = subFolders.map(item => {
//         let localBase = path.join(directory, item);
//         let state = fs.statSync(localBase);
//         if (state.isDirectory()) {
//           return countNumbers(localBase)
//         } else{
//           return readSumFileASync(localBase)
//         }
//       })
//       return Promise.all(promArr)
//     })
//     .then(results => {
//       let sum = 0;
//       results.forEach(addSum => sum+=addSum)
//       return sum
//     })
// }

function countNumbers(directory) {
  return readDirAsync(directory)
    .then(subFolders => {
      const promArr = subFolders.map(item => {
        let localBase = path.join(directory, item);
        return statAsync(localBase) // Сделать асинхроным
        .then(data=>{
          if (data.isDirectory()) {
            return countNumbers(localBase)
          } else {
            return readSumFileASync(localBase)
          }
        })
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
