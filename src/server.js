const getFiles = require('./lib')

const result = getFiles('/home/smedov/Work/Test-Folder-Files/',{debug:true})



// const fs = require('fs');     // Модуль для работы с файлами
// const path = require('path'); // Модуль path позволяет указывать пути к дирректориям
//
// //______________Вспомогательные Функции)__________________
// function filesInDirectory(filesInDirectory) { // функция разбивает папку на массив файлов и массив папок
//   let filesArr = [] // Массив для хранения txt файлов
//   let folderArr = [] // Массив для хранения папок
//
//   for (let i = 0; i < filesInDirectory.length; i++) {
//     if (filesInDirectory[i].substr(-4, 4) === '.txt') filesArr.push(filesInDirectory[i]) // Если формат файла .txt то пушим его в массив с файлами
//     else folderArr.push(filesInDirectory[i]) // Иначе пушим в массив с папками
//   }
//   return { // Вернем обьект папки это или .txt
//     filesArr,
//     folderArr
//   }
// }
//
//
// function keeperArray(folderArr, directory) {
//     let dirArr = []
//     function dataInFolders(folderArr, directory) {
//         let filesCurrentDirectory = [] // Массив для хранения данных полученных с дирректории
//         for (let i = 0; i < folderArr.length; i++) {
//             filesCurrentDirectory[i] = fs.readdirSync(directory + folderArr[i]); // Прочитываем файлы из текущей директории
//             let filesOrFolder = filesInDirectory(filesCurrentDirectory[i]) // Распарсим полученные данные на папки и файлы
//
//             dataInFolders(filesOrFolder.folderArr, directory + folderArr[i] + '/')
//             dirArr.push(directory+folderArr[i])
//         }
//        return dirArr
//     }
//    return dataInFolders(folderArr, directory)
// }
// //______________Главная Функция)__________________
// function getFiles(directory,opts = {}) {
//   let filesCurrentDirectory = fs.readdirSync(directory); //Прочитываем файлы из текущей директории
//   let filesOrFolder = filesInDirectory(filesCurrentDirectory);
//
//   let dir = keeperArray(filesOrFolder.folderArr,directory)
//   console.log(dir)
// }
//
// module.exports = getFiles;
//


//--------------------------
// const fs = require('fs'); // Модуль для работы с файлами
// const path = require('path'); // Модуль path позволяет указывать пути к дирректориям
//
//
// function thisIsFile(directory) {
//   return fs.statSync(directory).isFile()
// }
//
// function filesInDirectory(filesInDirectory, directory) { // функция разбивает папку на массив файлов и массив папок
//   let filesArr = [] // Массив для хранения txt файлов
//   let folderArr = [] // Массив для хранения папок
//
//   for (let i = 0; i < filesInDirectory.length; i++) {
//     if (thisIsFile(directory + filesInDirectory[i]) == true) filesArr.push(filesInDirectory[i]) // Если формат файла .txt то пушим его в массив с файлами
//     else folderArr.push(filesInDirectory[i]) // Иначе пушим в массив с папками
//   }
//
//   return { // Вернем обьект папки это или .txt
//     filesArr,
//     folderArr
//   }
// }
//
//
//
//
//
//
// function getFiles(directory, opts = {}) {
//   let filesCurrentDirectory = fs.readdirSync(directory); //Прочитываем файлы из текущей директории
//   let filesOrFolder = filesInDirectory(filesCurrentDirectory, directory)
//
//   return filesOrFolder
// }
//
//
//
//
// module.exports = getFiles;
