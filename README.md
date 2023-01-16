## Open AI API chat applcation

Simple chat app that lets you access the open ai api to use AI models. This is built off openai-api node wrapper. You can find the original github here: 'https://github.com/Njerschow/openai-api'. I used this youtube video to assist me building this application: 'https://www.youtube.com/watch?v=2FeymQoKvrk&t=3197s' shout out to JavaScript Mastery, very good video.

## Instillation


Enter your OpenAI API Key in the .env file along with the port number you'd like to use; 5000 by default.
You can find your api key here https://beta.openai.com/account/api-keys


from the CLI install dependencies
`npm install`

in root start the back end
`npm run dev`

open a 2nd terminal and navigate to the client directory
`cd client`

run the front end client
`npm run vite`

visit 'http://localhost:5000'

Chat with Code-Davinci--002 model by default. It is primed with a pre-prompt to provide detailed responses on code with snipits and documentation.

## Modifying Settings

You can edit the settings of the model in the 'server/server.ts' file to customize the types of responses you will get. I find pre priming it with a prompt to be more or less verbose and the topic you want a response on is fairly successful.
Unfortunately the model currently doesnt have access to a data base to store the context of conversation so every prompt is a one shot answer. Provide as much context as possible. I have the model preset to let you work with 500 tokens (roughly 700 words) with a response length of 3500 tokens. Adjust them as you need.
'Stop!' will stop the application if it seems like it is caught in a loop or is giving too long of a response.


## TODO

 add database with chat history
 add UI controls for params
 add multi user
 add multi room
 upgrade UI looks
 create a panel of pre-prompt presets and a field to enter custom pre-prompts
 get perms to have it access a data base for context

## Openai-api

## Overview

This package is a tiny node wrapper for the openAI API, if you find any issue please feel free to message me or open a PR :).

A few words from GPT-3
If you have any ideas on how to improve the library feel free to let me know as well!

You can also visit the Issue tracker for more information or open a new issue.

This project is not affiliated with OpenAI and was written purely out of interest.

## Installation

`npm i openai-api`

## Usage

## Initializing

`const OpenAI = require('openai-api');

// Load your key from an environment variable or secret management service
// (do not include your key directly in your code)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI(OPENAI_API_KEY);`

## Completion API call

`(async () => {
    const gptResponse = await openai.complete({
        engine: 'davinci',
        prompt: 'this is a test',
        maxTokens: 5,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n', "testing"]
    });

    console.log(gptResponse.data);
})();`

## Example of a successful completion response:

`{
    id: 'some-long-id',
    object: 'text_completion',
    created: 1616791508,
    model: 'davinci:2020-05-03',
    choices: [
        {
          text: " predicted text...",
          index: 0,
          logprobs: null,
          finish_reason: 'length'
        }
    ]
}`

## Search API call

`(async () => {
    const gptResponse = await openai.search({
        engine: 'davinci',
        documents: ["White House", "hospital", "school"],
        query: "the president"
    });

    console.log(gptResponse.data);
})();`

## Answers API call

`(async () => {
    const gptResponse = await openai.answers({
      "documents": ["Puppy A is happy.", "Puppy B is sad."],
      "question": "which puppy is happy?",
      "search_model": "ada",
      "model": "curie",
      "examples_context": "In 2017, U.S. life expectancy was 78.6 years.",
      "examples": [["What is human life expectancy in the United States?", "78 years."]],
      "max_tokens": 5,
      "stop": ["\n", "<|endoftext|>"],
    });

    console.log(gptResponse.data);
})();`

## Classification API call

`(async () => {
  const gptResponse = await openai.classification({
    "examples": [
      ["A happy moment", "Positive"],
      ["I am sad.", "Negative"],
      ["I am feeling awesome", "Positive"]
    ],
    "labels": ["Positive", "Negative", "Neutral"],
    "query": "It is a raining day :(",
    "search_model": "ada",
    "model": "curie"
  });

  console.log(gptResponse.data);
})();`

## Engines API call

`(async () => {
    const gptResponse = await openai.engines();

    console.log(gptResponse.data);
})();`

## Embeddings API call

Documentation: https://beta.openai.com/docs/api-reference/embeddings

`(async () => {
  const gptResponse = await openai.embeddings({
    "engine": "text-similarity-babbage-001",
    "input": [
      "A happy moment",
      "I am sad.",
      "I am feeling awesome"
    ],
  });

  console.log(gptResponse.data); // see index.d.ts interface Embedding
})();`

## Get number of tokens for string

Not supported as of 4/21. See issue #20
The token limit is 2048 for completions using the OpenAI API. This method allows you to get the number of tokens in your prompt. This is done offline (no API call is made).

`openai.encode('This is an encoding test. Number of tokens is not necessarily the same as word count.').then((result) => {
     console.log("Number of tokens for string:" + result.length);
 });`
