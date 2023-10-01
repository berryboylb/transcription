const { openaiApiKey, DEEP_GRAM } = require("./constants");
const axios = require("axios");
const { Deepgram } = require("@deepgram/sdk");

const deepgram = new Deepgram(DEEP_GRAM);

async function transcribeVideo(file) {
  const url = "https://api.openai.com/v1/audio/transcriptions";

  const headers = {
    Authorization: `Bearer ${openaiApiKey}`,
  };

  const data = {
    file,
    language: "en-US",
    model: "whisper-1",
  };

  const response = await axios.post(url, data, { headers });
  return response.data;
}

// async function deepgram(file) {
//   const url = "https://api.deepgram.com/v1/listen?model=nova&punctuate=true";

//   const headers = {
//     Authorization: `Bearer ${DEEP_GRAM}`,
//   };

//   const data = {
//     url: file,
//   };

//   const response = await axios.post(url, data, { headers });
//   return response.data;
// }

// Initializes the Deepgram SDK

const transcribe = async (file) => {
  const ress = await deepgram.transcription.preRecorded(
    { url: file },
    { smart_format: true, model: "nova", language: "en-US" }
  );
  return ress;
};

module.exports = {
  deepgram,
  transcribe,
};
