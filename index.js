const axios = require("axios");
const { OpenAI } = require("openai");
const dotenv = require("dotenv");
dotenv.config();
// Repository I am using.
const repo = "https://github.com/tursodatabase/libsql/pull/";
const PR = 1104;

const project = "tursodatabase/libsql/";

// tursodatabase/libsql/pull/1104.patch
const actualURL = "https://patch-diff.githubusercontent.com/raw/" + project +
  "pull/" + PR + ".patch";

async function getPRData(url) {
  try {
    const response = await axios.get(url);
    // console.log("Reponse is :\n", response);
    return response;
  } catch (err) {
    console.error(err);
  }
}

const systemMessage =
  `You are an experienced software developer. You will be provided a git .patch file which contains the diff of the code changes made. Please provide whatever code review,
constructive comments, and optimization that can be possible. Since you don't have access to the whole codebase, refrain from making suggestions if you do not understand the use completly. In such cases
where you are unsure, just reply: "I do not have access to the entire codebase so cannot review, comment or optimize this code bit."`;

async function makeOpenAIQuery(query, systemMessage) {
  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: OPENAI_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    n: 1,
    messages: [
      {
        role: "system",
        content: `${systemMessage}`,
      },
      {
        role: "user",
        content: query,
      },
    ],
  });
  return completion.choices[0].message?.content;
}

console.log("Output from OpenAI: \n");

getPRData(actualURL).then(async function (response) {
  const query = response.data;
  const data = await makeOpenAIQuery(query, systemMessage);
  console.log(data);
}).catch(function (err) {
  console.log("ERROR: ", err);
});
