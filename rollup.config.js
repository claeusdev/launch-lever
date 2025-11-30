import sourceMaps from "rollup-plugin-sourcemaps";
import { readFileSync } from "fs";

const packageJSON = JSON.parse(readFileSync("./package.json", "utf-8"));

export default {
  input: "dist/index.js",
  output: {
    file: packageJSON.main,
    format: "umd",
    name: "LaunchLever",
    sourcemap: true,
    exports: "named",
  },
  plugins: [sourceMaps()],
};
