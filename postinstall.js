// const fs = require('fs');
// const chalk = require('chalk');
// const inquirer = require('inquirer');
// const package = require('./package.json');
// const path = require('path');

// const getSuccesText = lan => {
//   const { name, version } = package;
//   return lan === 'cn'
//     ? `恭喜您！${name} V${version} 下载成功!`
//     : `congratulations! ${name} V${version} download successfully!`;
// };

// const writePackageLanguage = language => {
//   package.language = language;
//   const str = JSON.stringify(package);
//   try {
//     const packagePath = path.resolve(__dirname, './dist/package.json');
//     fs.writeFileSync(packagePath, str);
//     console.log(chalk.white.bgGreen.bold(getSuccesText(language)));
//   } catch (error) {
//     console.log(error);
//   }
// };

// const asdSelect = async () => {
//   const questions = [
//     {
//       name: 'language',
//       type: 'list',
//       message: '您需要选择的语言是?(Please select the language you need?)',
//       choices: ['简体中文(Chinese)', '英文(English)'],
//       filter(val) {
//         return val === '英文(English)' ? 'en' : 'cn';
//       },
//     },
//   ];

//   // 创建一个 Promise，用于处理 SIGINT 信号
//   const sigintHandler = new Promise((resolve, reject) => {
//     process.on('SIGINT', () => {
//       console.log('Received SIGINT. Exiting...');
//       process.exit(); // 或者执行任何需要的清理工作
//     });
//   });

//   const { language } = await Promise.race([inquirer.prompt(questions), sigintHandler]);
//   console.log(language, '------')
//   if(language)writePackageLanguage(language);
// };

// asdSelect();

console.log('安装成功，可以开始使用了！（您可以使用asd select -lang 选择语言）')