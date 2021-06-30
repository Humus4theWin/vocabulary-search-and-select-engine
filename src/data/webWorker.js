import rdfParser from "rdf-parse";

// eslint-disable-next-line no-unused-vars
function onmessage(event) {
  let url = event.data[0];
  let type = event.data[1];
  importVocab(url, type);
}

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
    console.log("error: " + url);
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
      window.App.$store.commit("addVocab", vocab);
      console.log("All done!");
      indexVocab(url, vocab.quads);
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
  console.log(quads);
  // add all attributes
  terms = terms.map((term) => {
    let attributes = quads.filter((quad) => {
      return quad.subject.value === term.IRI;
    });

    attributes.forEach((attr) => {
      let val = attr.object.value;
      //if (val.length > this.descriptionLimit) {
      //  val = val.slice(0, this.descriptionLimit) + "...";
      //}
      term[attr.predicate.value] = val;
    });

    return term;
  });
  window.App.$store.commit("addVocabTerms", terms);
  console.log(terms);
}
export default onmessage;
