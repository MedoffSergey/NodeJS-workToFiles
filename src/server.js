  const fs = require('fs');
  const path = require('path'); //модуль path позволяет указывать пути к дирректориям

  const directory = '/home/smedov/Work/Test-Folder-Files/'; //Указываем путь текущей дериктории

  //______________FILES________________

  function filesInDirectory(filesInDirectory) {
    let filesArr = [] //массив для хранения txt файлов
    let folderArr = [] //массив для хранения папок

    for (let i = 0; i < filesInDirectory.length; i++) {
      if (filesInDirectory[i].substr(-4, 4) === '.txt') filesArr.push(filesInDirectory[i])
      else folderArr.push(filesInDirectory[i])
    }
    return {
      filesArr,
      folderArr
    }
  }

  function dataInFolders(folderArr, directory) {
    let filesCurrentDirectory = {}
    let allSum = 0
    let finalFilesArr = []

    for (let i = 0; i < folderArr.length; i++) {
      filesCurrentDirectory[i] = fs.readdirSync(directory + folderArr[i]); //Прочитываем файлы из текущей директории
      let filesOrFolder = filesInDirectory(filesCurrentDirectory[i])
      finalFilesArr.push(filesOrFolder.filesArr)

      if (filesOrFolder.folderArr) {
        // console.log(filesOrFolder.filesArr,directory+folderArr[i]+'/')
        // allSum += sum(filesOrFolder.filesArr, directory + folderArr[i] + '/')
        dataInFolders(filesOrFolder.folderArr, directory + folderArr[i] + '/')
        //  console.log( filesOrFolder.filesArr , directory)
      }
    }
    if (finalFilesArr != '') {
      let a = finalFilesArr.join().split(',')
      console.log(a)
    }
  }

  // function sum(filesArr, directory) { //вычисление суммы значений в файлах
  //   let sum = 0;
  //   for (let i = 0; i < filesArr.length; i++) {
  //     let str = fs.readFileSync(directory + filesArr[i], 'utf8') //прочитываем что находиться в текущем файле
  //     sum += Number(str);
  //   }
  //   return sum
  // }

  function files() {
    let filesCurrentDirectory = fs.readdirSync(directory); //Прочитываем файлы из текущей директории
    let filesOrFolder = filesInDirectory(filesCurrentDirectory) // разбиваем все файлы из дирректории на  файлы и папки
    //  let sumCount = sum(filesOrFolder.filesArr, directory) // посчитаем сумму
    dataInFolders(filesOrFolder.folderArr, directory) //заходим внутрь папок
    console.log("\n Файлы в исходой папке: ", filesOrFolder)
    //  console.log("Сумма в исходой папке: ", sumCount)
  }

  files()
