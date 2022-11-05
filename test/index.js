const path = require("path");

process.chdir(path.join(__dirname, './smoke/template'));

console.log(process.cwd());

describe("unit test webpack.base.js", () => {
    require("./unit/webpack-base-test");

})