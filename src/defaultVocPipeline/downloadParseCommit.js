/**
 * @file Pipeline file to downloads and parse a hard-coded collection of vocabularies and commit them to our repository if changes occur.
 * @author Dimitri Jan Staufer <staufer@tu-berlin.de>
 */

const rdfParser = require("rdf-parse").default;
const defaultVocabularies = require("./defaultVocabularies.json");
let downloadedVocabularies = [];
let parsedVocabularies = [];
let indexedVocabularies = [];

runPipeline();

async function runPipeline() {
  await downloadVocabularies(defaultVocabularies.vocabularyList);
  await parseVocabularies(downloadedVocabularies, 0);
}

/** This function downloads a list of vocabularies
 *
 * @param {Dictionary} downloadList - A list of dictionaries containing the name and download URL of RDF vocabularies
 *
 * @author Dimitri Staufer <staufer@tu-berlin.de>
 */
async function downloadVocabularies(downloadList = defaultVocabularies) {
  for (let i = 0; i < downloadList.length; i++) {
    let vocab = {};
    let url = downloadList[i].downloadURL;
    vocab.amount = 0;
    vocab.name = downloadList[i].name;
    vocab.url = downloadList[i].downloadURL;
    vocab.terms = [];
    vocab.baseURL = "http://" + url.split("/")[2];

    let response;
    try {
      // load from remote server
      response = await fetch(url);
      if (response.ok) {
        //console.log("Downloaded Vocabulary: " + downloadList[i].name);
        vocab.type = response.headers.get("content-type").split(";")[0];
        vocab.data = await response.text();
        downloadedVocabularies.push(vocab);
      }
    } catch (ex) {
      // if it fails, ignore this vocabulary for now
    }
  }
}

/** This recursive function parses a list of downloaded vocabularies and when complete calls indexVocabularies()
 *
 * @param {Dictionary} downloadedVocabularies - A list of vocabulary dictionaries as defined by Linus in src/components/AddVocab.vue
 * @param {Number} index - The index of the vocabulary to parse
 *
 * @author Dimitri Staufer <staufer@tu-berlin.de>
 */
async function parseVocabularies(downloadedVocabularies, index) {
  // RECURSIVE
  if (downloadedVocabularies.length >= index + 1) {
    let vocab = downloadedVocabularies[index];

    // parse vocab data
    let textStream = require("streamify-string")(vocab.data);
    vocab.quads = [];

    rdfParser
      .parse(textStream, {
        contentType: vocab.type,
        baseIRI: vocab.baseURL,
      })
      .on("data", (quad) => {
        vocab.quads.push(quad);
        vocab.amount += 1;
      })
      // eslint-disable-next-line no-unused-vars
      .on("error", (error) => {
        parseVocabularies(downloadedVocabularies, index + 1);
      })
      .on("end", () => {
        //console.log("Parsed Vocabulary: " + vocab.name);
        parsedVocabularies.push(vocab);
        parseVocabularies(downloadedVocabularies, index + 1);
      });
  } else {
    indexVocabularies();
  }
}

/** This function indexes a list of vocabularies as defined by Linus in src/components/AddVocab.vue
 *
 * @author Dimitri Staufer <staufer@tu-berlin.de>
 */
function indexVocabularies() {
  for (let i = 0; i < parsedVocabularies.length; i++) {
    let name = parsedVocabularies[i].name;
    let url = parsedVocabularies[i].url;
    let quads = parsedVocabularies[i].quads;

    let terms = quads
      .filter((quad) => quad.predicate.value.includes("label"))
      .map((quad) => {
        return {
          url: quad.subject.value,
          label: quad.object.value,
        };
      });
    // add all attributes
    terms = terms.map((term) => {
      let attributes = quads.filter((quad) => {
        return quad.subject.value === term.url;
      });

      attributes.forEach((attr) => {
        let val = attr.object.value;
        if (val.length > this.descriptionLimit) {
          val = val.slice(0, this.descriptionLimit) + "...";
        }
        term[attr.predicate.value] = val;
      });

      return term;
    });
    indexedVocabularies.push({ name: name, url: url, terms: terms });
  }
  console.log(JSON.stringify(indexedVocabularies));
}
