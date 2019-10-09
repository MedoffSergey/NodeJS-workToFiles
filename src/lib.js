const fs = require('fs'); // Модуль для работы с файлами
const path = require('path'); // Модуль path позволяет указывать пути к дирректориям

function filesInDirectory(filesInDirectory) { // функция разбивает папку на массив файлов и массив папок
  let filesArr = [] // Массив для хранения txt файлов
  let folderArr = [] // Массив для хранения папок

  for (let i = 0; i < filesInDirectory.length; i++) {
    if (filesInDirectory[i].substr(-4, 4) === '.txt') filesArr.push(filesInDirectory[i]) // Если формат файла .txt то пушим его в массив с файлами
    else folderArr.push(filesInDirectory[i]) // Иначе пушим в массив с папками
  }
  return { // Вернем обьект папки это или .txt
    filesArr,
    folderArr
  }
}

function folderPaths(folderArr, directory) {  //эта фкнцкия получает путь к папкам
  let dirArr = [] // массив для хранения полученных всех путей

  function dataInFolders(folderArr, directory) {
    let filesCurrentDirectory = [] // Массив для хранения данных полученных с дирректории
    for (let i = 0; i < folderArr.length; i++) {
      filesCurrentDirectory[i] = fs.readdirSync(directory + folderArr[i]); // Прочитываем файлы из текущей директории
      let filesOrFolder = filesInDirectory(filesCurrentDirectory[i]) // Распарсим полученные данные на папки и файлы

      dataInFolders(filesOrFolder.folderArr, directory + folderArr[i] + '/')
      dirArr.push(directory + folderArr[i])
    }
    return dirArr
  }
  return dataInFolders(folderArr, directory)
}

function showFiles(directory) {
  let totalSum = 0
  let files = [];
  for (let i = 0; i < directory.length; i++) {
    let filesCurrentDirectory = fs.readdirSync(directory[i])
    let filesOrFolder = filesInDirectory(filesCurrentDirectory);
    totalSum += sum(filesOrFolder.filesArr,directory[i]+'/')
    for (let j = 0; j < filesOrFolder.filesArr.length; j++) {
      files.push(directory[i] + '/' + filesOrFolder.filesArr[j])
    }
  }
  return {files,totalSum}
}

function sum(filesArr, directory) { //вычисление суммы значений в файлах
  let sum = 0;
  for (let i = 0; i < filesArr.length; i++) {
    let str = fs.readFileSync(directory + filesArr[i], 'utf8') //прочитываем что находиться в текущем файле
    sum += Number(str);
  }
  return sum
}

//______________Главная Функция)__________________
function getFiles(directory, opts = {}) {
  let filesCurrentDirectory = fs.readdirSync(directory); //Прочитываем файлы из текущей директории
  let filesOrFolder = filesInDirectory(filesCurrentDirectory); // Распарсим полученные данные на папки и файлы
  let filesPathArray = []
  let totalSum = 0

  for (let i = 0; i < filesOrFolder.filesArr.length; i++) {
    filesPathArray.push(directory + filesOrFolder.filesArr[i]) //пушим файлы из главной дирректории
    amount0lvl = sum(filesOrFolder.filesArr,directory)  // посчитаем сумму в главной директории
  }

  let path = folderPaths(filesOrFolder.folderArr, directory)  //получимс все пути в папках
  let filesByPath = showFiles(path) // Файлы по пути в папках
  filesPathArray.push(filesByPath.files)  //запушим их в массив для того чтоб обьеденить с файлами по главной директории

  let receivedDataFilesPath = filesPathArray.join().split(',')
  let allSum = amount0lvl + filesByPath.totalSum
  return {receivedDataFilesPath,allSum}
}

module.exports = getFiles
