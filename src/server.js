const readDirSync = require('./lib')

readDirSync('/home/smedov/Work/Test_Files/Test_Folder_Files/')
  .then(data => {
    console.log('файлы по дирректории: \n', data.receivedDataFilesPath) // Отобразим массив путей c файлами
    console.log('\nСумма во всех файлах по дирректории: ', data.allSum) // Отобразим полученную сумму в файлах
  })
