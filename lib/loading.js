const ora = require("ora");

async function loading(message, fn, ...args) {
  const spinner = ora(message);
  spinner.start(); // 开启加载
  let executeRes = await fn(...args);
  spinner.succeed();
  return executeRes;
}

module.exports = loading
