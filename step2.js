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

/**Takes a url and logs the response of a fetch request to that url*/
async function webCat(url) {
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  const text = await resp.text(); //outside of try block
  console.log(text);
}

if (URL.canParse(process.argv[2])) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}