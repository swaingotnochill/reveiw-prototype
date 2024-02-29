const axios = require("axios");

// Repository I am using.
const repo = "https://github.com/tursodatabase/libsql/pull/";
const PR = 1104;

const project = "tursodatabase/libsql/";
// Construct the final url.
const prUrl = repo + PR + ".patch";

// tursodatabase/libsql/pull/1104.patch
const actualURL = "https://patch-diff.githubusercontent.com/raw/" + project +
  "pull/" + PR + ".patch";

axios.get(actualURL).then((response) => {
  console.log(response.data);
}).catch((err) => console.log(err)).finally();


