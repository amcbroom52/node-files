"use strict";
const fsP = require("fs/promises");

/**Takes a path to a file and logs the contents of that file */
async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(contents);
}

cat(process.argv[2]);