#! /usr/bin/env node

// enter
const { program } = require("commander"); // 命令行
const chalk = require("chalk"); // 命令行美化
const create = require("../lib/create")

const { name, version } = require("../package.json");

// console.log(process.argv)
program.name(`${name}`).usage(`<command> [option]`);
program.version(`${name} ${version}`);

// console.log(`hello ${chalk.blue("world")}`);

program
  .arguments("<project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action((projectName, cmd) => {
    console.log(`开始创建项目： ${chalk.green(projectName)}`);
    // 使用 create 模块，并传入参数
    create(projectName, cmd);
  });


// 解析用户执行时输入的参数
// process.argv 是 nodejs 提供的属性
// npm run server --port 3000
// 后面的 --port 3000 就是用户输入的参数
program.parse(process.argv);
