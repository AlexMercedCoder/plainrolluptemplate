/////////////////////
// Plugin Imports
////////////////////
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import htmlTemplate from "rollup-plugin-generate-html-template";
import scss from "rollup-plugin-scss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from "@rollup/plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

///////////////////////
// Config Object - Production
///////////////////////

const config = {
  input: "src/index.js",
  output: {
    file: "build/bundle.js",
    format: "umd",
    plugins: [terser()],
  },
  plugins: [
    json(),
    htmlTemplate({
      template: "src/index.html",
      target: "build/index.html",
    }),
    scss({
      output: true,
      // Filename to write all styles to
      output: "build/bundle.css",
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
  ],
};

///////////////////////
// Config Object - Development
///////////////////////

const develop = {
  input: "src/index.js",
  output: {
    file: "dev/dev.js",
    format: "umd",
  },
  plugins: [
    json(),
    htmlTemplate({
      template: "src/index.html",
      target: "dev/index.html",
    }),
    scss({
      output: true,
      // Filename to write all styles to
      output: "dev/bundle.css",
    }),
    babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    serve({
      open: true,
      contentBase: "dev",
      host: "localhost",
      port: process.env.PORT,
    }),
    livereload("dev"),
  ],
};

///////////////////////
// Export Config Object
///////////////////////

export default process.env.NODE_ENV === "production" ? config : develop;
