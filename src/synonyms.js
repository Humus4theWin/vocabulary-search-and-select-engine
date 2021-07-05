//import WordNet from "node-wordnet";

console.log("it works");
const WordNet = require("node-wordnet");
// wndb-with-exceptions funktioniert nicht  --> should be a WordNet data module
// wordnet directory
const wordnet = new WordNet("../node_modules/wordnet-db/dict");

module.exports = function getSynonyms(searchString) {
  let synonyms = [];
  wordnet.lookup(searchString, (results) => {
    results.forEach((result) => {
      console.log("------------------------------------");
      console.log(result.synsetOffset);
      console.log(result.pos);
      console.log(result.lemma);
      console.log(result.synonyms);
      console.log(result.pos);
      console.log(result.gloss);
      synonyms.push(result.synonyms);
    });
  });
  return synonyms.flat();
};

let syn = [];
// example: search astring
wordnet.lookup("photo", (results) => {
  results.forEach((result) => {
    console.log("lookup function");
    console.log("------------------------------------");
    console.log(result.synsetOffset);
    console.log(result.pos);
    console.log(result.lemma);
    console.log(result.synonyms);
    console.log(result.pos);
    console.log(result.gloss);
    syn.push(result.synonyms);
    console.log(syn.flat());
  });
});
console.log("und?");
console.log(syn);

// example: get a certain position in the WordNet Database
wordnet.get(2086723, "n", (result) => {
  console.log("get " + "Function");
  console.log("------------------------------------");
  console.log(result.lemma);
  console.log(result.pos);
  console.log(result.gloss);
  console.log(result.synonyms);
});
