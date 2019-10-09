const getFiles = require('./lib')

let result = getFiles('/home/smedov/Work/Test_Files/Test_Folder_Files/',{debug:true})

console.log('файлы по дирректории: \n', result.receivedDataFilesPath) // Отобразим массив путей c файлами
console.log('\nСумма во всех файлах по дирректории: ',  result.allSum) // Отобразим полученную сумму в файлах
