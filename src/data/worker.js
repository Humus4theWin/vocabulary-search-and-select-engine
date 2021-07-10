/*eslint-disable*/
import rdfParser from "rdf-parse";

addEventListener("message", (event) => {

  let url = event.data[0];
  let type = event.data[1];
  importVocab(url, type);
});

/**
 * imports vocabulary and parses quads; adds it to Vuex
 * @async
 * @param url
 * @param format
 * @return {Promise<void>}
 */
async function importVocab(url, format) {
  let vocab = {};
  vocab.numberOfQuads = 0;
  vocab.sourceURL = url;
  vocab.terms = [];
  vocab.baseURL = "http://" + url.split("/")[2];

  let response;
  try {
    // load from remote server
    response = await fetch(url);
  } catch (ex) {
    // if fails, load via proxy
    response = await fetch("http://localhost:80/proxy", {
      headers: { url: url },
    });
  }
  if (response.ok) {
    vocab.type = response.headers.get("content-type").split(";")[0];
    vocab.data = await response.text();
  } else {
    //console.log("error: " + url);
    return;
  }
  if (format) vocab.type = format;

  // parse vocab data
  let textStream = require("streamify-string")(vocab.data);
  vocab.quads = [];

  await rdfParser
    .parse(textStream, {
      contentType: vocab.type,
      baseIRI: vocab.baseURL,
    })
    .on("data", (quad) => {
      vocab.quads.push(quad);
      vocab.numberOfQuads += 1;
    })
    .on("error", (error) => console.error(error))
    .on("end", () => {
      //post vocabs

      //console.log("All done!");
      indexVocab(url, vocab.quads);
      vocab.quads = undefined
      postMessage(["addVocab",vocab]);
    });
}

/**
 * parses the terms and their attributes and adds those to the existing vocab in Vuex
 * @param url
 * @param quads
 */
function indexVocab(url, quads) {
  //find terms in other Thread
  let terms = quads
    .filter((quad) => quad.predicate.value.includes("label"))
    .map((quad) => {
      return {
        IRI: quad.subject.value,
        label: quad.object.value,
        vocabSourceURL: url,
      };
    });
  //console.log(quads);
  // add all attributes
  terms = terms.map((term) => {
    let attributes = quads.filter((quad) => {
      return quad.subject.value === term.IRI;
    });

    attributes.forEach((attr) => {
      //if (val.length > this.descriptionLimit) {
      //  val = val.slice(0, this.descriptionLimit) + "...";
      //}
      term[attr.predicate.value] = attr.object.value;
    });

    return term;
  });
  postMessage(["addVocabTerms", terms]);
  //console.log(terms);
}
export default onmessage;
