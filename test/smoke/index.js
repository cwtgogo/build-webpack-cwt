const webpack = require("webpack");
const path = require("path");
const rimraf = require("rimraf");
const Mocha = require("mocha");

// 进入template目录
process.chdir(path.join(__dirname, 'template'));
console.log(process.cwd())

const mocha = new Mocha({
    timeout: "10000ms"
});

// 删除template下的dist目录
rimraf("./dist", () => {
    // 执行webpack
    const prodConfig = require('../../lib/webpack.prod.js');
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
        }));

        console.log("Webpack build success,begin run test.")

        mocha.addFile(path.join(__dirname, "html-test.js"));
        mocha.addFile(path.join(__dirname, "css-js-test.js"));

        mocha.run();
    })
})