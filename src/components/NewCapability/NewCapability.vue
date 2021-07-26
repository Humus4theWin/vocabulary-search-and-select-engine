<template>
  <v-col class="mb-16">
    <v-row>
      <h1
        class="ma-8 white--text"
        :style="{
          color: kindOfCapability().value
            ? 'white !important'
            : '#808080 !important',
        }"
      >
        {{ kindOfCapability().value || "Unnamed Capability" }}
      </h1>
      <v-spacer></v-spacer>
      <v-btn class="ma-8" text icon color="white" @click="clearCapability()">
        <v-icon x-large>mdi-delete-empty</v-icon>
      </v-btn>
    </v-row>

    <v-col class="pa-8">
      <v-row align="center" justify="center">
        <v-card class="ma-3 capabilityCard">
          <v-app-bar
            flat
            :color="
              missingFields().indexOf('kindOfCapability') !== -1
                ? '#8b0000'
                : '#1d2a36'
            "
          >
            <v-toolbar-title
              class="text-h6 white--text pl-2"
              style="font-weight: 400"
            >
              Kind of Capability
            </v-toolbar-title>
          </v-app-bar>
          <v-card-text class="text-left">
            <new-search-field
              label='e.g., "schema.org/PhotographAction"'
              type="kindOfCapability"
              @SearchValue="changedSearchInput"
            ></new-search-field>
          </v-card-text>
        </v-card>

        <v-card class="ma-3 capabilityCard">
          <v-app-bar
            flat
            :color="
              missingFields().indexOf('functionName') !== -1
                ? '#8b0000'
                : '#1d2a36'
            "
          >
            <v-toolbar-title
              class="text-h6 white--text pl-2"
              style="font-weight: 400"
            >
              Function Name
            </v-toolbar-title>
          </v-app-bar>
          <v-card-text class="text-left">
            <v-text-field
              label='e.g., "takePhoto()"'
              required
              v-model="functionName().value"
              @input="
                changeFunctionName(functionName().value);
                validateCapability();
              "
            ></v-text-field>
          </v-card-text>
        </v-card>

        <new-capability-inputs ref="capInputs"></new-capability-inputs>
        <new-capability-outputs ref="capOutputs"></new-capability-outputs>

        <v-btn
          :class="
            missingFields().length == 0
              ? 'mt-5 black--text'
              : 'mt-5 white--text'
          "
          x-large
          :color="missingFields().length == 0 ? 'white' : '#8b0000'"
          style="min-width: 100%"
          @click="generateJSON()"
          >{{
            missingFields().length == 0
              ? "Generate JSON-LD File"
              : "Generate JSON-LD File (missing fields)"
          }}</v-btn
        >
      </v-row>
    </v-col>
  </v-col>
</template>

<style lang="scss">
.capabilityCard {
  width: 100%;
  max-width: 350px;
}
.capIO {
  min-width: 350px;
}
</style>

<script>
import { mapGetters, mapMutations } from "vuex";
import NewCapabilityInputs from "./NewCapabilityInputs.vue";

// eslint-disable-next-line no-unused-vars
import { prettyPrintJson } from "pretty-print-json";
import NewCapabilityOutputs from "./NewCapabilityOutputs.vue";
import NewSearchField from "./NewSearchField.vue";

export default {
  name: "NewCapability",
  components: {
    NewCapabilityInputs,
    NewCapabilityOutputs,
    NewSearchField,
  },
  methods: {
    ...mapGetters({
      kindOfCapability: "newCapKindOfCapability", // map `this.kindOfCapability()` to `this.$store.dispatch('newCapKindOfCapability')`
      fileName: "newCapFileName", // map `this.fileName()` to `this.$store.dispatch('newCapFileName')`
      functionName: "newCapFunctionName", // map `this.functionName()` to `this.$store.dispatch('newCapFunctionName')`
      inputs: "newCapInputs", // map `this.inputs()` to `this.$store.dispatch('newCapInputs')`
      outputs: "newCapOutputs", // map `this.outputs()` to `this.$store.dispatch('newCapOutputs')`
      missingFields: "missingCapabilityFields", // map `this.missingFields()` to `this.$store.dispatch('missingCapabilityFields')`
    }),
    ...mapMutations({
      changeKindOfCapability: "newCapChangeKindOfCapability", // map `this.changeKindOfCapability()` to `this.$store.dispatch('newCapChangeKindOfCapability')`
      changeFileName: "newCapChangeFileName", // map `this.changeFileName()` to `this.$store.dispatch('newCapChangeFileName')`
      changeFunctionName: "newCapChangeFunctionName", // map `this.changeFunctionName()` to `this.$store.dispatch('newCapChangeFunctionName')`
      clearCapability: "newCapClear", // map `this.clearCapability()` to `this.$store.dispatch('newCapClear')`
      replaceMissingFields: "replaceMissingCapabilityFields", // map `this.replaceMissingFields()` to `this.$store.dispatch('replaceMissingCapabilityFields')`
    }),
    /** This function calls other helper function to put together and validate the valid JSON-LD description of the capability as defined in https://docs.proceed-labs.org/concepts/capability-description and then outputs this description as json file to the user
     *
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    generateJSON() {
      let additionalVocabularies; // TO DO: - add additional Vocabularies

      let outputTemplate = {
        "@context": {
          schema: "https://schema.org/",
          fno: "https://w3id.org/function/ontology#",
          fnoi: "https://w3id.org/function/vocabulary/implementation",
          fnom: "https://w3id.org/function/vocabulary/mapping#",
          "dbpedia-owl": "http://dbpedia.org/ontology/",
          xsd: "http://www.w3.org/2001/XMLSchema#",
          ...(additionalVocabularies ? { additionalVocabularies } : {}),
        },
        "@graph": [
          {
            "@id": "_:capability",
            "schema:potentialAction": {
              "@id":
                this.kindOfCapability().value == ""
                  ? "_:UnnamedCapabilityDefinition"
                  : "_:" + this.kindOfCapability().value + "Definition",
              "@type":
                typeof this.kindOfCapability().value == Array
                  ? [...this.kindOfCapability().value, "fno:Function"]
                  : [this.kindOfCapability().value, "fno:Function"],
            },
          },
          {
            "@id":
              this.kindOfCapability().value == ""
                ? "_:UnnamedCapabilityDefinition"
                : "_:" + this.kindOfCapability().value + "Definition",
            "fno:expects": {
              "@list": this.ioToJson(this.inputs(), true).map((entry) => ({
                "@id": entry["@id"],
              })),
            },
            "fno:returns": {
              "@list": this.ioToJson(this.outputs(), false).map((entry) => ({
                "@id": entry["@id"],
              })),
            },
          },
          ...this.ioToJson(this.inputs(), true),
          ...this.ioToJson(this.outputs(), false),
          {
            "@id":
              this.kindOfCapability().value == ""
                ? "_:UnnamedCapabilityImplementation"
                : "_:" + this.kindOfCapability().value + "Implementation",
            "@type": "fnoi:JavaScriptFunction",
            "dbpedia-owl:filename": this.fileName().value || "index.js",
          },
          this.generateMappings(),
        ],
      };

      if (this.validateCapability().length == 0) {
        // Only output the final JSON-LD all required information has been provided by the user
        // For now, show the generated JSON as colorful HTML in a new tab for debugging
        var win = window.open("", "_blank");
        win.document.body.innerHTML =
          "<link rel=stylesheet href=https://cdn.jsdelivr.net/npm/pretty-print-json@0.0/dist/pretty-print-json.css>" +
          "<pre>" +
          prettyPrintJson.toHtml(outputTemplate) +
          "</pre>";

        // This is the actual JSON file export function
        //this.downloadJSONFile(JSON.stringify(outputTemplate));
      }
    },
    /** This function creates the function input parameter or function output list as defined in https://docs.proceed-labs.org/concepts/capability-description depending on whether isInput is true or false
     *
     * @param {array} io An array of the function inputs or outputs from the Vuex Store
     * @param {boolean} isInput A boolean value, if true then input parameter - if false then output
     *
     * @return {object} the capability's input parameters and outputs, alongside their properites as defined in https://docs.proceed-labs.org/concepts/capability-description
     *
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    ioToJson(io, isInput) {
      let parameters = [];
      for (let i = 0; i < io.length; i++) {
        let properties;

        if (io[i].complex.value) {
          properties = {
            "@id": "_:" + io[i].kindOfValue.value + "Parameter",
            "fno:predicate": [{ "@type": io[i].kindOfValue.value }],
            "@type": isInput
              ? ["fno:Parameter", "xsd:complexType"]
              : ["fno:Output", "xsd:complexType"],
            ...(io[i].description.value
              ? { "schema:description": io[i].description.value }
              : {}),
            ...(io[i].minValue.value
              ? { "schema:minValue": io[i].minValue.value }
              : {}),
            ...(io[i].maxValue.value
              ? { "schema:maxValue": io[i].maxValue.value }
              : {}),
            "terms:hasPart": {
              "@list":
                io[i]["sub"] != null && io[i]["sub"].length > 0
                  ? [...this.ioToJson(io[i]["sub"], isInput)]
                  : [],
            },
            ...(isInput ? { "fno:required": io[i].required.value } : {}),
          };
        } else {
          properties = {
            "@id": "_:" + io[i].kindOfValue.value + "Parameter",
            "fno:predicate": [{ "@type": io[i].kindOfValue.value }],
            "@type": isInput
              ? io[i].dataType.value != ""
                ? Array.from(
                    new Set([...["fno:Parameter"], ...[io[i].dataType.value]])
                  )
                : ["fno:Parameter"]
              : io[i].dataType.value != ""
              ? Array.from(
                  new Set([...["fno:Output"], ...[io[i].dataType.value]])
                )
              : ["fno:Output"],
            ...(io[i].description.value
              ? { "schema:description": io[i].description.value }
              : {}),
            ...(io[i].defaultValue.value
              ? { "schema:defaultValue": io[i].defaultValue.value }
              : {}),
            ...(io[i].minValue.value
              ? { "schema:minValue": io[i].minValue.value }
              : {}),
            ...(io[i].maxValue.value
              ? { "schema:maxValue": io[i].maxValue.value }
              : {}),
            ...(io[i].encoding.value
              ? { "schema:encodingFormat": io[i].encoding.value }
              : {}),
            ...(isInput ? { "fno:required": io[i].required.value } : {}),
          };
        }

        parameters.push(properties);
      }
      return parameters;
    },
    /** This function creates the property mapping fields as defined in https://docs.proceed-labs.org/concepts/capability-description
     *
     * @return {object} the mapping values for the capability description as defined in https://docs.proceed-labs.org/concepts/capability-description
     *
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    generateMappings() {
      let flatInputs = [];
      let flatOutputs = [];

      for (let i = 0; i < this.inputs().length; i++) {
        let functionParameter =
          "_:" + this.inputs()[i].kindOfValue.value + "Parameter";
        let implementationProperty = this.inputs()[i].name.value;

        flatInputs.push({
          "@type": "fnom:PropertyParameterMapping",
          "fnom:functionParameter": functionParameter,
          "fnom:implementationProperty": implementationProperty,
        });

        for (let j = 0; j < this.inputs()[i]["sub"].length; j++) {
          let subFunctionParameter = [
            functionParameter,
            "_:" + this.inputs()[i]["sub"][j].kindOfValue.value + "Parameter",
          ];
          let subImplementationProperty =
            implementationProperty +
            "/" +
            this.inputs()[i]["sub"][j].name.value;

          flatInputs.push({
            "@type": "fnom:PropertyParameterMapping",
            "fnom:functionParameter": subFunctionParameter,
            "fnom:implementationProperty": subImplementationProperty,
          });

          for (let k = 0; k < this.inputs()[i]["sub"][j]["sub"].length; k++) {
            let subsubFunctionParameter = [
              ...subFunctionParameter,
              "_:" +
                this.inputs()[i]["sub"][j]["sub"][k].kindOfValue.value +
                "Parameter",
            ];
            let subsubImplementationProperty =
              subImplementationProperty +
              "/" +
              this.inputs()[i]["sub"][j]["sub"][k].name.value;

            flatInputs.push({
              "@type": "fnom:PropertyParameterMapping",
              "fnom:functionParameter": subsubFunctionParameter,
              "fnom:implementationProperty": subsubImplementationProperty,
            });
          }
        }
      }

      for (let i = 0; i < this.outputs().length; i++) {
        let functionParameter =
          "_:" + this.outputs()[i].kindOfValue.value + "Parameter";
        let implementationProperty = this.outputs()[i].name.value;

        flatOutputs.push({
          "@type": "fnom:DefaultReturnMapping",
          "fnom:functionParameter": functionParameter,
          "fnom:implementationProperty": implementationProperty,
        });

        for (let j = 0; j < this.outputs()[i]["sub"].length; j++) {
          let subFunctionParameter = [
            functionParameter,
            "_:" + this.outputs()[i]["sub"][j].kindOfValue.value + "Parameter",
          ];
          let subImplementationProperty =
            implementationProperty +
            "/" +
            this.outputs()[i]["sub"][j].name.value;

          flatOutputs.push({
            "@type": "fnom:DefaultReturnMapping",
            "fnom:functionParameter": subFunctionParameter,
            "fnom:implementationProperty": subImplementationProperty,
          });

          for (let k = 0; k < this.outputs()[i]["sub"][j]["sub"].length; k++) {
            let subsubFunctionParameter = [
              ...subFunctionParameter,
              "_:" +
                this.outputs()[i]["sub"][j]["sub"][k].kindOfValue.value +
                "Parameter",
            ];
            let subsubImplementationProperty =
              subImplementationProperty +
              "/" +
              this.outputs()[i]["sub"][j]["sub"][k].name.value;

            flatOutputs.push({
              "@type": "fnom:DefaultReturnMapping",
              "fnom:functionParameter": subsubFunctionParameter,
              "fnom:implementationProperty": subsubImplementationProperty,
            });
          }
        }
      }

      let mapping = {
        "@id":
          this.kindOfCapability().value == ""
            ? "_:UnnamedCapabilityMapping"
            : "_:" + this.kindOfCapability().value + "Mapping",
        "@type": "fno:Mapping",
        "fno:function":
          this.kindOfCapability().value == ""
            ? "_:UnnamedCapabilityDefinition"
            : "_:" + this.kindOfCapability().value + "Definition",
        "fno:implementation":
          this.kindOfCapability().value == ""
            ? "_:UnnamedCapabilityImplementation"
            : "_:" + this.kindOfCapability().value + "Implementation",
        "fno:parameterMapping": [...flatInputs],
        "fno:returnMapping": [...flatOutputs],
      };

      return mapping;
    },
    /** This function makes sure that the kindOfCapability and functionName fields, as well as non-optional input/outputs properties contain data and if not, adds their unique identifier to a list of missing fields
     *
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    validateCapability() {
      let localMissingFields = [];
      if (
        this.kindOfCapability().value == null ||
        this.kindOfCapability().value == undefined ||
        this.kindOfCapability().value == ""
      ) {
        localMissingFields.push("kindOfCapability");
      }

      if (
        this.functionName().value == null ||
        this.functionName().value == undefined ||
        this.functionName().value == ""
      ) {
        localMissingFields.push("functionName");
      }

      // Check Inputs
      for (let i = 0; i < this.inputs().length; i++) {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(this.inputs()[i])) {
          if (
            value.optional === false &&
            (value.value === undefined ||
              value.value === null ||
              value.value === "")
          ) {
            localMissingFields.push(this.inputs()[i].id);
          }
        }

        for (let j = 0; j < this.inputs()[i]["sub"].length; j++) {
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(
            this.inputs()[i]["sub"][j]
          )) {
            if (
              value.optional === false &&
              (value.value === undefined ||
                value.value === null ||
                value.value === "")
            ) {
              localMissingFields.push(this.inputs()[i]["sub"][j].id);
            }
          }

          for (let k = 0; k < this.inputs()[i]["sub"][j]["sub"].length; k++) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(
              this.inputs()[i]["sub"][j]["sub"][k]
            )) {
              if (
                value.optional === false &&
                (value.value === undefined ||
                  value.value === null ||
                  value.value === "")
              ) {
                localMissingFields.push(
                  this.inputs()[i]["sub"][j]["sub"][k].id
                );
              }
            }
          }
        }
      }

      // Check Outputs
      for (let i = 0; i < this.outputs().length; i++) {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(this.outputs()[i])) {
          if (
            value.optional === false &&
            (value.value === undefined ||
              value.value === null ||
              value.value === "")
          ) {
            localMissingFields.push(this.outputs()[i].id);
          }
        }

        for (let j = 0; j < this.outputs()[i]["sub"].length; j++) {
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(
            this.outputs()[i]["sub"][j]
          )) {
            if (
              value.optional === false &&
              (value.value === undefined ||
                value.value === null ||
                value.value === "")
            ) {
              localMissingFields.push(this.outputs()[i].id);
            }
          }

          for (let k = 0; k < this.outputs()[i]["sub"][j]["sub"].length; k++) {
            // eslint-disable-next-line no-unused-vars
            for (const [key, value] of Object.entries(
              this.outputs()[i]["sub"][j]["sub"][k]
            )) {
              if (
                value.optional === false &&
                (value.value === undefined ||
                  value.value === null ||
                  value.value === "")
              ) {
                localMissingFields.push(this.outputs()[i].id);
              }
            }
          }
        }
      }

      console.log(localMissingFields);
      this.replaceMissingFields(localMissingFields);
      return localMissingFields;
    },
    /** This function creates a data Blob from a json input, injects it into an 'a' element and clicks said element to start the download of the json file from the user's browser
     *
     * @param {object} json A json file containing the capability description to be downloaded
     *
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    downloadJSONFile: function (json) {
      const blob = new Blob([json], { type: "text/json" });
      const aElement = document.createElement("a");
      aElement.href = window.URL.createObjectURL(blob);
      aElement.download =
        (this.kindOfCapability().value || "UnnamedCapability") + ".json";
      aElement.dataset.downloadurl = [
        "text/json",
        (this.kindOfCapability().value || "UnnamedCapability") + ".json",
        aElement.href,
      ].join(":");

      const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });

      aElement.dispatchEvent(evt);
      aElement.remove();
    },
    /**
     *prints input of searchfield over given event
     *@param { Type, IRI} eventInput contains data of the search output as Type=  the prop type and IRI like the IRI of the choosen Term in the Search field
     */
    changedSearchInput: function (eventInput) {
      //later on changed to switch case maybe
      if (eventInput.type == "kindOfCapability") {
        //an dieser Stelle in den Store schreiben bitte ;)
        this.changeKindOfCapability(eventInput.IRI);
      }
      this.validateCapability();
    },
  },
};
</script>
