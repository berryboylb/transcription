const { openaiApiKey, DEEP_GRAM } = require("./constants");
const { Deepgram } = require("@deepgram/sdk");

const deepgram = new Deepgram(DEEP_GRAM);
const transcribe = async (file) => {
  const ress = await deepgram.transcription.preRecorded(
    { url: file },
    { smart_format: true, model: "nova", language: "en-US" }
  );
  return ress;
};

module.exports = {
  transcribe,
};
