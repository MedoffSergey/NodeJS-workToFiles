const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

function readSumFileASync(localBase) {
  return new Promise(function(resolve, reject) {
    fsPromises.readFile(localBase).then(result => {
      let addSum = parseInt(result || 0);
      return resolve(addSum)
    });
  });
}

function countNumbers(directory) {
  return fsPromises.readdir(directory) //читаем текущую папку
    .then(subFolders => {
      const promArr = subFolders.map(item => { //массив
        let localBase = path.join(directory, item); //новое имя папки/файла
        return fsPromises.stat(localBase).then(state => { //получаем свойства
          if (state.isDirectory()) {
            return countNumbers(localBase) //рекурсия
          } else {
            return readSumFileASync(localBase) //если не папка, то считываем файл
          }
        })
      });
      return Promise.all(promArr) //возвращаем массив промиссов
    })
    .then(results => {
      let sum = 0;
      results.forEach(addSum => sum += addSum); //суммируем все
      return sum
    })
}

countNumbers('/home/smedov/Work/Test_Files/Test_Folder_Files/') //вызываем функцию countNumbers
  .then(data => console.log(data))
