"use strict";
const fsP = require("fs/promises");

/**Takes a path and boolean -> logs the contents of that file. */
async function cat(path, log = true) {
  let contents;
  try {
    contents = await fsP.readFile(path, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  if (log) {
    console.log(contents);
  } else {
    return contents;
  }
}

/**Takes a url and logs the response of a fetch request to that url*/
async function webCat(url, log) {
  let resp;
  try {
    resp = await fetch(url);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  const text = await resp.text(); //outside of try block
  if (log) {
    console.log(text);
  } else {
    return text;
  }
}


/**
 * Takes two files, writes content of the second file into the first file.
 */

async function writeOutput(newFile, inputText) {
  let content;
  if (URL.canParse(inputText)) {
    content = await webCat(inputText, false);
  } else {
    content = await cat(inputText, false);
  }
  try {
    await fsP.writeFile(newFile, content, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Success.');
}


/**If flag --out is included, writes URL or HTML to file
 * If URL, and true --> logs to console.
 * Reads file --> logs to console.
 */
if (process.argv[2] === '--out') {
  writeOutput(process.argv[3], process.argv[4]);
} else if (URL.canParse(process.argv[2])) {
  webCat(process.argv[2]);
} else {
  cat(process.argv[2]);
}


