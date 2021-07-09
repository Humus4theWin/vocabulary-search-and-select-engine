<template>
  <v-col class="pa-8">
    <v-row align="center" justify="center">
      <v-card class="ma-5 capabilityCard">
        <v-app-bar flat color="#1d2a36">
          <v-toolbar-title
            class="text-h6 white--text pl-2"
            style="font-weight: 400"
          >
            Kind of Capability
          </v-toolbar-title>
        </v-app-bar>
        <SearchField searchLabel='e.g., "schema.org/PhotographAction"' />
      </v-card>

      <v-card class="ma-5 capabilityCard">
        <v-app-bar flat color="#1d2a36">
          <v-toolbar-title
            class="text-h6 white--text pl-2"
            style="font-weight: 400"
          >
            File Name
          </v-toolbar-title>
        </v-app-bar>
        <v-card-text class="text-left">
          <v-text-field label='e.g., "index.js"' required></v-text-field>
        </v-card-text>
      </v-card>

      <v-card class="ma-5 capabilityCard">
        <v-app-bar flat color="#1d2a36">
          <v-toolbar-title
            class="text-h6 white--text pl-2"
            style="font-weight: 400"
          >
            Function Name (optional)
          </v-toolbar-title>
        </v-app-bar>
        <v-card-text class="text-left">
          <v-text-field label='e.g., "takePhoto()"' required></v-text-field>
        </v-card-text>
      </v-card>

      <!-- INPUTS -->

      <v-card class="ma-5 capabilityCard">
        <v-app-bar flat color="#1d2a36">
          <v-toolbar-title
            class="text-h6 white--text pl-2"
            style="font-weight: 400"
          >
            Same As (optional)
          </v-toolbar-title>
        </v-app-bar>
        <SearchField searchLabel='e.g., "schema.org/OtherAction"' />
      </v-card>

      <v-card class="ma-5 capIO" color="#3b4453">
        <v-app-bar flat color="#1d2a36">
          <v-toolbar-title
            class="text-h6 white--text pl-2"
            style="font-weight: 400"
          >
            Inputs
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-0"
            text
            icon
            color="white"
            @click="addCapabilityInput({})"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-text class="text-center">
          <v-col align="center" justify="center">
            <v-row align="center" justify="center">
              <p v-show="inputs().length == 0" style="color: white">
                Use the "+" Button to add your first input.
              </p>
              <v-card
                v-for="(input, index) in inputs()"
                :key="index"
                class="ma-3"
                color="#5c6473"
              >
                <v-app-bar flat color="#1d2a36">
                  <v-toolbar-title class="text-h7 white--text pl-2">
                    {{
                      inputs()[index].parameterName != null &&
                      inputs()[index].parameterName != undefined &&
                      inputs()[index].parameterName != ""
                        ? "Input #" +
                          String(index + 1) +
                          " (" +
                          inputs()[index].parameterName +
                          ")"
                        : "Input #" + String(index + 1)
                    }}
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="ma-0"
                    text
                    icon
                    color="white"
                    @click="removeCapabilityInput(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-app-bar>
                <v-card-text class="text-left">
                  <v-expansion-panels class="pt-2">
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        Default Properties
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-col>
                          <div class="grey--text mb-3">Parameter Name</div>
                          <v-text-field
                            label='e.g., "w" or "width"'
                            v-model="inputs()[index].parameterName"
                            @input="
                              changeCapabilityInputProperty({
                                inputIndex: index,
                                propertyKey: 'parameterName',
                                value: inputs()[index].parameterName,
                              })
                            "
                          ></v-text-field>
                        </v-col>

                        <v-col>
                          <v-row align="center" justify="center">
                            <div class="grey--text mb-3 ml-3">Required</div>
                            <v-spacer></v-spacer>
                            <v-checkbox
                              class="mb-3"
                              color="#1d2a36"
                            ></v-checkbox>
                          </v-row>
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">Kind of Value</div>
                          <SearchField
                            searchLabel='e.g., "schema.org/width"'
                            class="ma-2"
                          />
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">Data Type</div>
                          <SearchField
                            searchLabel='e.g., "xs:integer"'
                            class="ma-2"
                          />
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">Unit</div>
                          <v-text-field label='e.g., "px"'></v-text-field>
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">Encoding</div>
                          <SearchField
                            searchLabel='e.g., "image/jpg"'
                            class="ma-2"
                          />
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">Default Value</div>
                          <v-text-field label='e.g., "43"'></v-text-field>
                        </v-col>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        Additional Properties
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Michael's job
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </v-card>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>

      <!-- OUTPUTS -->

      <v-card class="ma-5 capIO" color="#3b4453">
        <v-app-bar flat color="#1d2a36">
          <v-toolbar-title
            class="text-h6 white--text pl-2"
            style="font-weight: 400"
          >
            Outputs
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            class="ma-0"
            text
            icon
            color="white"
            @click="addCapabilityOutput({})"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-text class="text-center">
          <v-col align="center" justify="center">
            <v-row align="center" justify="center">
              <p v-show="outputs().length == 0" style="color: white">
                Use the "+" Button to add your first output.
              </p>
              <v-card
                v-for="(output, index) in outputs()"
                :key="index"
                class="ma-3"
                color="#5c6473"
              >
                <v-app-bar flat color="#1d2a36">
                  <v-toolbar-title class="text-h7 white--text pl-2">
                    {{
                      outputs()[index].parameterName != null &&
                      outputs()[index].parameterName != undefined &&
                      outputs()[index].parameterName != ""
                        ? "Output #" +
                          String(index + 1) +
                          " (" +
                          outputs()[index].parameterName +
                          ")"
                        : "Output #" + String(index + 1)
                    }}
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn
                    class="ma-0"
                    text
                    icon
                    color="white"
                    @click="removeCapabilityOutput(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-app-bar>
                <v-card-text class="text-left">
                  <v-expansion-panels class="pt-2">
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        Default Properties
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-col>
                          <div class="grey--text mb-3">Parameter Name</div>
                          <v-text-field
                            label='e.g., "w" or "width"'
                            v-model="outputs()[index].parameterName"
                            @input="
                              changeCapabilityOutputProperty({
                                outputIndex: index,
                                propertyKey: 'parameterName',
                                value: outputs()[index].parameterName,
                              })
                            "
                          ></v-text-field>
                        </v-col>

                        <v-col>
                          <v-row align="center" justify="center">
                            <div class="grey--text mb-3 ml-3">Required</div>
                            <v-spacer></v-spacer>
                            <v-checkbox
                              class="mb-3"
                              color="#1d2a36"
                            ></v-checkbox>
                          </v-row>
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">Kind of Value</div>
                          <SearchField
                            searchLabel='e.g., "schema.org/width"'
                            class="ma-2"
                          />
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">Data Type</div>
                          <SearchField
                            searchLabel='e.g., "xs:integer"'
                            class="ma-2"
                          />
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">Unit</div>
                          <v-text-field label='e.g., "px"'></v-text-field>
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">Encoding</div>
                          <SearchField
                            searchLabel='e.g., "image/jpg"'
                            class="ma-2"
                          />
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">Default Value</div>
                          <v-text-field label='e.g., "43"'></v-text-field>
                        </v-col>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        Additional Properties
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        Michael's job
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </v-card>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>

      <v-btn
        class="mt-5"
        x-large
        color="white"
        style="min-width: 100%"
        @click="generateJSON()"
        >Generate JSON-LD File</v-btn
      >
    </v-row>
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
import SearchField from "@/components/SearchField.vue";

let parametersTemplate = [];

let jsFunctionTemplate = {
  "@id": null,
  "@type": "fnoi:JavaScriptFunction",
  "dbpedia-owl:filename": null,
};

let mappingTemplate = {
  "@id": null,
  "@type": "fno:Mapping",
  "fno:function": null,
  "fno:implementation": null,
  "fno:parameterMapping": [],
  "fno:returnMapping": [],
};

export default {
  name: "NewCapability",
  components: {
    SearchField,
  },

  computed: {},
  methods: {
    ...mapGetters({
      kindOfCapability: "newCapKindOfCapability", // map `this.newCapKindOfCapability()` to `this.$store.dispatch('newCapKindOfCapability')`
      fileName: "newCapFileName", // map `this.newCapFileName()` to `this.$store.dispatch('newCapFileName')`
      functionName: "newCapFunctionName", // map `this.newCapFunctionName()` to `this.$store.dispatch('newCapFunctionName')`
      sameAs: "newCapSameAs", // map `this.newCapSameAs()` to `this.$store.dispatch('newCapSameAs')`
      inputs: "newCapInputs", // map `this.newCapInputs()` to `this.$store.dispatch('newCapInputs')`
      outputs: "newCapOutputs", // map `this.newCapOutputs()` to `this.$store.dispatch('newCapOutputs')`
    }),
    ...mapMutations({
      changeKindOfCapability: "newCapChangeKindOfCapability", // map `this.newCapChangeKindOfCapability()` to `this.$store.dispatch('newCapChangeKindOfCapability')`
      changeFileName: "newCapChangeFileName", // map `this.newCapChangeFileName()` to `this.$store.dispatch('newCapChangeFileName')`
      changeFunctionName: "newCapChangeFunctionName", // map `this.newCapChangeFunctionName()` to `this.$store.dispatch('newCapChangeFunctionName')`
      changeSameAs: "newCapChangeSameAs", // map `this.newCapChangeSameAs()` to `this.$store.dispatch('newCapChangeSameAs')`
      addCapabilityInput: "newCapAddCapabilityInput", // map `this.newCapAddCapabilityInput()` to `this.$store.dispatch('newCapAddCapabilityInput')`
      removeCapabilityInput: "newCapRemoveCapabilityInput", // map `this.newCapRemoveCapabilityInput()` to `this.$store.dispatch('newCapRemoveCapabilityInput')`
      addCapabilityOutput: "newCapAddCapabilityOutput", // map `this.newCapAddCapabilityOutput()` to `this.$store.dispatch('newCapAddCapabilityOutput')`
      removeCapabilityOutput: "newCapRemoveCapabilityOutput", // map `this.newCapRemoveCapabilityOutput()` to `this.$store.dispatch('newCapRemoveCapabilityOutput')`
      changeCapabilityInputProperty: "newCapChangeCapabilityInputProperty", // map `this.newCapChangeCapabilityInputProperty()` to `this.$store.dispatch('newCapChangeCapabilityInputProperty')`
      changeCapabilityOutputProperty: "newCapChangeCapabilityOutputProperty", // map `this.newCapChangeCapabilityOutputProperty()` to `this.$store.dispatch('newCapChangeCapabilityOutputProperty')`
    }),
    generateJSON() {
      this.ioToJson();

      // eslint-disable-next-line no-unused-vars
      let outputTemplate = {
        "@context": {
          // eslint-disable-next-line prettier/prettier
          schema: "https://schema.org/",
          // eslint-disable-next-line prettier/prettier
          fno: "https://w3id.org/function/ontology#",
          // eslint-disable-next-line prettier/prettier
          fnoi: "https://w3id.org/function/vocabulary/implementation",
          "dbpedia-owl": "http://dbpedia.org/ontology/",
        },
        "@graph": [
          {
            "@id": "_:capability",
            "schema:potentialAction": { "@id": null, "@type": [] },
          },
          {
            "@id": null,
            "fno:expects": { "@list": [] },
            "fno:returns": { "@list": [] },
          },
          parametersTemplate,
          jsFunctionTemplate,
          mappingTemplate,
        ],
      };

      // For now, show the generated JSON as string in a new tab for debugging
      let jsonOutputTest = window.open(
        "data:text/json," +
          encodeURIComponent(JSON.stringify(outputTemplate, null, 2)),
        "_blank"
      );
      jsonOutputTest.focus();
    },
    ioToJson() {
      parametersTemplate = [];
      for (let i = 0; i < this.inputs().length; i++) {
        parametersTemplate.push({
          "@id": "_:" + this.inputs()[i].parameterName + "Parameter",
          "fno:predicate": [],
          "@type": [],
          "fno:required": null,
        });
      }
      for (let i = 0; i < this.outputs().length; i++) {
        parametersTemplate.push({
          "@id": "_:" + this.outputs()[i].parameterName + "Parameter",
          "fno:predicate": [],
          "@type": [],
          "fno:required": null,
        });
      }
    },
  },
};
</script>
