const getFiles = require('./lib')

let result = getFiles('/home/smedov/Work/Test-Folder-Files/',{debug:true})

console.log('файлы по дирректории: \n', result.receivedDataFilesPath) //отобразим массив путей c файлами
console.log('\nСумма во всех файлах по дирректории: ',  result.allSum)
