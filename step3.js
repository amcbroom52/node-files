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
  return contents;
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
  return text;
}



/**
 * Takes two files, writes content of the second file into the first file.
 */
async function writeOutput(files) {
  let content;
  if (URL.canParse(files[1])) {
    content = await webCat(files[1]);
  } else {
    content = await cat(files[1]);
  }
  try {
    await fsP.writeFile(files[0], content, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Success.');
}



if (URL.canParse(process.argv[2])) {
  webCat(process.argv[2]);
} else if (process.argv[2] === '--out') {
  writeOutput(process.argv.slice(3, 5));
} else {
  cat(process.argv[2]);
}


