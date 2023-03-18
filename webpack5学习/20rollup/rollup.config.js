import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/main.js",
  output: [
    {
      format: "umd", //模块化方式
      name: "saber",
      file: "dist/bundle.normal.js",
      globals: {
        lodash: "_",
      },
    },
    {
      format: "cjs", //模块化方式
      file: "dist/bundle.common.js",
    },
  ],
  //排除loadsh
  external: ["lodash"],
  plugins: [
    commonjs(),
    resolve(),
    babel({
      babelHelpers: "bundled", //消除一个警告
    }),
    terser(),
  ],
};
