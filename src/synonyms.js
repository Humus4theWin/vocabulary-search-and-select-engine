const WordNet = require("node-wordnet");
const wordnet = new WordNet("../node_modules/wordnet-db/dict");

function getSynonyms(searchString) {
  console.log("it works");
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
}
export default getSynonyms;
