const assert = require("assert");

describe("webpack.base.js test case", () => {
    const baseConfig = require("../../lib/webpack.base");
    it("entry", () => {
        assert.equal(baseConfig.entry.index, "/Users/wangliqin/Documents/chenwentao/geektime-webpack-course/code/chapter04/demo/build-webpack-cwt/test/smoke/template/src/index/index.js")
        assert.equal(baseConfig.entry.search, "/Users/wangliqin/Documents/chenwentao/geektime-webpack-course/code/chapter04/demo/build-webpack-cwt/test/smoke/template/src/search/index.js")
    })
})