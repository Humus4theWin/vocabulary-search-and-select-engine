<template>
  <!-- OUTPUTS -->

  <v-card class="ma-3 capIO" color="#3b4453">
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
        @click="
          addCapabilityOutput({
            output: getIOTemplate(),
            outputIndex: -1,
            subOutputIndex: -1,
          })
        "
      >
        <v-icon>mdi-card-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card-text class="text-center">
      <v-col align="center" justify="center">
        <v-row align="center" justify="center">
          <p v-show="outputs().length == 0" style="color: white">
            Use the "+" Button to add your first output.
          </p>
          <draggable
            v-model="outputsSorted"
            :options="{ animation: 150 }"
            style="
              display: flex;
              flex-wrap: wrap;
              align-content: center;
              align-items: center;
              align-self: center;
              justify-content: center;
            "
          >
            <v-card
              v-for="(output, index) in outputs()"
              :key="index"
              class="ma-2"
              color="#5c6473"
            >
              <v-app-bar flat color="#293239">
                <v-toolbar-title class="text-h7 white--text pl-2">
                  {{
                    outputs()[index].kindOfValue.value != null &&
                    outputs()[index].kindOfValue.value != undefined &&
                    outputs()[index].kindOfValue.value != ""
                      ? "Output #" +
                        String(index + 1) +
                        " (" +
                        outputs()[index].kindOfValue.value +
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
                  @click="
                    removeCapabilityOutput({
                      index: index,
                      subIndex: -1,
                      subsubIndex: -1,
                    })
                  "
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-app-bar>
              <v-card-text class="text-left">
                <v-expansion-panels class="pt-2">
                  <v-expansion-panel>
                    <v-expansion-panel-header
                      :class="
                        missingFields().indexOf(outputs()[index].id) !== -1
                          ? 'red--text'
                          : 'black--text'
                      "
                    >
                      Properties
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-col
                        class="ma-0 pa-0"
                        v-for="(parameterValue, parameterName) in outputs()[
                          index
                        ]"
                        :key="parameterName"
                      >
                        <v-col
                          class="ma-0 pa-0 pb-5"
                          v-if="
                            (parameterValue.displayName == 'Kind of Value' ||
                              parameterValue.displayName ==
                                'Data Type (opt.)') &&
                            !(
                              parameterValue.complexCompatible == false &&
                              outputs()[index].complex.value
                            )
                          "
                        >
                          <div
                            :class="
                              parameterValue.optional === false &&
                              (parameterValue.value === undefined ||
                                parameterValue.value === null ||
                                parameterValue.value === '')
                                ? 'red--text'
                                : 'grey--text'
                            "
                          >
                            {{ parameterValue.displayName }}
                          </div>
                          <new-search-field
                            label="'e.g., ' + parameterValue.example"
                            type="input"
                            v-bind:options="{
                              outputIndex: index,
                              subIndex: -1,
                              subsubIndex: -1,
                              propertyKey: parameterName,
                              value: outputs()[index][parameterName],
                            }"
                          ></new-search-field>
                        </v-col>
                        <v-col
                          class="ma-0 pa-0"
                          v-if="
                            typeof parameterValue.value == 'string' &&
                            !(
                              parameterValue.displayName == 'Kind of Value' ||
                              parameterValue.displayName == 'Data Type (opt.)'
                            ) &&
                            !(
                              parameterValue.complexCompatible == false &&
                              outputs()[index].complex.value
                            )
                          "
                        >
                          <div
                            :class="
                              parameterValue.optional === false &&
                              (parameterValue.value === undefined ||
                                parameterValue.value === null ||
                                parameterValue.value === '')
                                ? 'red--text'
                                : 'grey--text'
                            "
                          >
                            {{ parameterValue.displayName }}
                          </div>
                          <v-text-field
                            class="ma-0 pa-0"
                            :label="'e.g., ' + parameterValue.example"
                            v-model="outputs()[index][parameterName].value"
                            @output="
                              changeCapabilityOutputProperty({
                                outputIndex: index,
                                subIndex: -1,
                                subsubIndex: -1,
                                propertyKey: parameterName,
                                value: outputs()[index][parameterName],
                              })
                            "
                          ></v-text-field>
                        </v-col>

                        <v-col
                          class="ma-0 pa-0 pb-2"
                          v-if="
                            typeof parameterValue.value == 'boolean' &&
                            !(
                              parameterValue.complexCompatible == false &&
                              outputs()[index].complex.value
                            )
                          "
                        >
                          <v-row align="center" justify="center">
                            <div
                              :class="
                                parameterValue.optional === false &&
                                (parameterValue.value === undefined ||
                                  parameterValue.value === null ||
                                  parameterValue.value === '')
                                  ? 'red--text mb-3 ml-3'
                                  : 'grey--text mb-3 ml-3'
                              "
                            >
                              {{ parameterValue.displayName }}
                            </div>
                            <v-spacer></v-spacer>
                            <v-checkbox
                              class="mb-0"
                              color="#1d2a36"
                              v-model="outputs()[index][parameterName].value"
                              @change="
                                changeCapabilityOutputProperty({
                                  outputIndex: index,
                                  subIndex: -1,
                                  subsubIndex: -1,
                                  propertyKey: parameterName,
                                  value: outputs()[index][parameterName],
                                })
                              "
                            ></v-checkbox>
                          </v-row>
                        </v-col>
                      </v-col>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-btn
                    v-if="outputs()[index].complex.value == true"
                    class="mt-5 mb-2"
                    x-large
                    color="white"
                    style="min-width: 100%"
                    @click="
                      addCapabilityOutput({
                        output: getIOTemplate(),
                        outputIndex: index,
                        subOutputIndex: -1,
                      })
                    "
                    >Add Sub-Output</v-btn
                  >
                </v-expansion-panels>

                <!-- SUB OUTPUTS -->
                <draggable
                  v-model="outputsSorted[index]['sub']"
                  :options="{ animation: 150 }"
                  style="
                    display: flex;
                    flex-wrap: wrap;
                    align-content: center;
                    align-items: center;
                    align-self: center;
                    justify-content: center;
                  "
                >
                  <v-card
                    v-for="(output, subIndex) in outputs()[index]['sub']"
                    :key="subIndex"
                    class="ma-2"
                    color="#5c6473"
                  >
                    <v-app-bar flat color="#242b31">
                      <v-icon color="#5c6473">mdi-file-tree-outline</v-icon>
                      <v-toolbar-title class="text-h7 white--text pl-2">
                        {{
                          outputs()[index]["sub"][subIndex].kindOfValue.value !=
                            null &&
                          outputs()[index]["sub"][subIndex].kindOfValue.value !=
                            undefined &&
                          outputs()[index]["sub"][subIndex].kindOfValue.value !=
                            ""
                            ? "Output #" +
                              String(index + 1) +
                              "." +
                              String(subIndex + 1) +
                              " (" +
                              outputs()[index]["sub"][subIndex].kindOfValue
                                .value +
                              ")"
                            : "Output #" +
                              String(index + 1) +
                              "." +
                              String(subIndex + 1)
                        }}
                      </v-toolbar-title>
                      <v-spacer></v-spacer>

                      <v-btn
                        class="ma-0"
                        text
                        icon
                        color="white"
                        @click="
                          removeCapabilityOutput({
                            index: index,
                            subIndex: subIndex,
                            subsubIndex: -1,
                          })
                        "
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-app-bar>
                    <v-card-text class="text-left">
                      <v-expansion-panels class="pt-2">
                        <v-expansion-panel>
                          <v-expansion-panel-header
                            :class="
                              missingFields().indexOf(
                                outputs()[index]['sub'][subIndex].id
                              ) !== -1
                                ? 'red--text'
                                : 'black--text'
                            "
                          >
                            Properties
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-col
                              class="ma-0 pa-0"
                              v-for="(
                                parameterValue, parameterName
                              ) in outputs()[index]['sub'][subIndex]"
                              :key="parameterName"
                            >
                              <v-col
                                class="ma-0 pa-0 pb-5"
                                v-if="
                                  (parameterValue.displayName ==
                                    'Kind of Value' ||
                                    parameterValue.displayName ==
                                      'Data Type (opt.)') &&
                                  !(
                                    parameterValue.complexCompatible == false &&
                                    outputs()[index]['sub'][subIndex].complex
                                      .value
                                  )
                                "
                              >
                                <div
                                  :class="
                                    parameterValue.optional === false &&
                                    (parameterValue.value === undefined ||
                                      parameterValue.value === null ||
                                      parameterValue.value === '')
                                      ? 'red--text'
                                      : 'grey--text'
                                  "
                                >
                                  {{ parameterValue.displayName }}
                                </div>
                                <new-search-field
                                  label="'e.g., ' + parameterValue.example"
                                  type="output"
                                  v-bind:options="{
                                    outputIndex: index,
                                    subIndex: subIndex,
                                    subsubIndex: -1,
                                    propertyKey: parameterName,
                                    value:
                                      outputs()[index]['sub'][subIndex][
                                        parameterName
                                      ],
                                  }"
                                ></new-search-field>
                              </v-col>
                              <v-col
                                class="ma-0 pa-0"
                                v-if="
                                  typeof parameterValue.value == 'string' &&
                                  !(
                                    parameterValue.displayName ==
                                      'Kind of Value' ||
                                    parameterValue.displayName ==
                                      'Data Type (opt.)'
                                  ) &&
                                  !(
                                    parameterValue.complexCompatible == false &&
                                    outputs()[index]['sub'][subIndex].complex
                                      .value
                                  )
                                "
                              >
                                <div
                                  :class="
                                    parameterValue.optional === false &&
                                    (parameterValue.value === undefined ||
                                      parameterValue.value === null ||
                                      parameterValue.value === '')
                                      ? 'red--text'
                                      : 'grey--text'
                                  "
                                >
                                  {{ parameterValue.displayName }}
                                </div>
                                <v-text-field
                                  class="ma-0 pa-0"
                                  :label="'e.g., ' + parameterValue.example"
                                  v-model="
                                    outputs()[index]['sub'][subIndex][
                                      parameterName
                                    ].value
                                  "
                                  @output="
                                    changeCapabilityOutputProperty({
                                      outputIndex: index,
                                      subIndex: subIndex,
                                      subsubIndex: -1,
                                      propertyKey: parameterName,
                                      value:
                                        outputs()[index]['sub'][subIndex][
                                          parameterName
                                        ],
                                    })
                                  "
                                ></v-text-field>
                              </v-col>

                              <v-col
                                class="ma-0 pa-0 pb-2"
                                v-if="
                                  typeof parameterValue.value == 'boolean' &&
                                  !(
                                    parameterValue.complexCompatible == false &&
                                    outputs()[index]['sub'][subIndex].complex
                                      .value
                                  )
                                "
                              >
                                <v-row align="center" justify="center">
                                  <div
                                    :class="
                                      parameterValue.optional === false &&
                                      (parameterValue.value === undefined ||
                                        parameterValue.value === null ||
                                        parameterValue.value === '')
                                        ? 'red--text mb-3 ml-3'
                                        : 'grey--text mb-3 ml-3'
                                    "
                                  >
                                    {{ parameterValue.displayName }}
                                  </div>
                                  <v-spacer></v-spacer>
                                  <v-checkbox
                                    class="mb-0"
                                    color="#1d2a36"
                                    v-model="
                                      outputs()[index]['sub'][subIndex][
                                        parameterName
                                      ].value
                                    "
                                    @change="
                                      changeCapabilityOutputProperty({
                                        outputIndex: index,
                                        subIndex: subIndex,
                                        subsubIndex: -1,
                                        propertyKey: parameterName,
                                        value:
                                          outputs()[index]['sub'][subIndex][
                                            parameterName
                                          ],
                                      })
                                    "
                                  ></v-checkbox>
                                </v-row>
                              </v-col>
                            </v-col>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-btn
                          v-if="
                            outputs()[index]['sub'][subIndex].complex.value ==
                            true
                          "
                          class="mt-5 mb-2"
                          x-large
                          color="white"
                          style="min-width: 100%"
                          @click="
                            addCapabilityOutput({
                              output: getIOTemplate(),
                              outputIndex: index,
                              subOutputIndex: subIndex,
                            })
                          "
                          >Add Sub-Sub-Output</v-btn
                        >
                      </v-expansion-panels>

                      <!-- SUB SUB OUTPUTS -->
                      <draggable
                        v-model="outputsSorted[index]['sub'][subIndex]['sub']"
                        :options="{ animation: 150 }"
                        style="
                          display: flex;
                          flex-wrap: wrap;
                          align-content: center;
                          align-items: center;
                          align-self: center;
                          justify-content: center;
                        "
                      >
                        <v-card
                          v-for="(output, subsubIndex) in outputs()[index][
                            'sub'
                          ][subIndex]['sub']"
                          :key="subsubIndex"
                          class="ma-2"
                          color="#5c6473"
                        >
                          <v-app-bar flat color="#1c2124">
                            <v-icon color="#5c6473">mdi-file-tree</v-icon>
                            <v-toolbar-title class="text-h7 white--text pl-2">
                              {{
                                outputs()[index]["sub"][subIndex]["sub"][
                                  subsubIndex
                                ].kindOfValue.value != null &&
                                outputs()[index]["sub"][subIndex]["sub"][
                                  subsubIndex
                                ].kindOfValue.value != undefined &&
                                outputs()[index]["sub"][subIndex]["sub"][
                                  subsubIndex
                                ].kindOfValue.value != ""
                                  ? "Output #" +
                                    String(index + 1) +
                                    "." +
                                    String(subIndex + 1) +
                                    "." +
                                    String(subsubIndex + 1) +
                                    " (" +
                                    outputs()[index]["sub"][subIndex]["sub"][
                                      subsubIndex
                                    ].kindOfValue.value +
                                    ")"
                                  : "Output #" +
                                    String(index + 1) +
                                    "." +
                                    String(subIndex + 1) +
                                    "." +
                                    String(subsubIndex + 1)
                              }}
                            </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-btn
                              class="ma-0"
                              text
                              icon
                              color="white"
                              @click="
                                removeCapabilityOutput({
                                  index: index,
                                  subIndex: subIndex,
                                  subsubIndex: subsubIndex,
                                })
                              "
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </v-app-bar>
                          <v-card-text class="text-left">
                            <v-expansion-panels class="pt-2">
                              <v-expansion-panel>
                                <v-expansion-panel-header
                                  :class="
                                    missingFields().indexOf(
                                      outputs()[index]['sub'][subIndex]['sub'][
                                        subsubIndex
                                      ].id
                                    ) !== -1
                                      ? 'red--text'
                                      : 'black--text'
                                  "
                                >
                                  Properties
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                  <v-col
                                    class="ma-0 pa-0"
                                    v-for="(
                                      parameterValue, parameterName
                                    ) in outputs()[index]['sub'][subIndex][
                                      'sub'
                                    ][subsubIndex]"
                                    :key="parameterName"
                                  >
                                    <v-col
                                      class="ma-0 pa-0 pb-5"
                                      v-if="
                                        (parameterValue.displayName ==
                                          'Kind of Value' ||
                                          parameterValue.displayName ==
                                            'Data Type (opt.)') &&
                                        !(
                                          parameterValue.complexCompatible ==
                                            false &&
                                          outputs()[index]['sub'][subIndex][
                                            'sub'
                                          ][subsubIndex].complex.value
                                        )
                                      "
                                    >
                                      <div
                                        :class="
                                          parameterValue.optional === false &&
                                          (parameterValue.value === undefined ||
                                            parameterValue.value === null ||
                                            parameterValue.value === '')
                                            ? 'red--text'
                                            : 'grey--text'
                                        "
                                      >
                                        {{ parameterValue.displayName }}
                                      </div>
                                      <new-search-field
                                        label="'e.g., ' + parameterValue.example"
                                        type="output"
                                        v-bind:options="{
                                          outputIndex: index,
                                          subIndex: subIndex,
                                          subsubIndex: subsubIndex,
                                          propertyKey: parameterName,
                                          value:
                                            outputs()[index]['sub'][subIndex][
                                              'sub'
                                            ][subsubIndex][parameterName],
                                        }"
                                      ></new-search-field>
                                    </v-col>
                                    <v-col
                                      class="ma-0 pa-0"
                                      v-if="
                                        typeof parameterValue.value ==
                                          'string' &&
                                        !(
                                          parameterValue.displayName ==
                                            'Kind of Value' ||
                                          parameterValue.displayName ==
                                            'Data Type (opt.)'
                                        ) &&
                                        !(
                                          parameterValue.complexCompatible ==
                                            false &&
                                          outputs()[index]['sub'][subIndex][
                                            'sub'
                                          ][subsubIndex].complex.value
                                        )
                                      "
                                    >
                                      <div
                                        :class="
                                          parameterValue.optional === false &&
                                          (parameterValue.value === undefined ||
                                            parameterValue.value === null ||
                                            parameterValue.value === '')
                                            ? 'red--text'
                                            : 'grey--text'
                                        "
                                      >
                                        {{ parameterValue.displayName }}
                                      </div>
                                      <v-text-field
                                        class="ma-0 pa-0"
                                        :label="
                                          'e.g., ' + parameterValue.example
                                        "
                                        v-model="
                                          outputs()[index]['sub'][subIndex][
                                            'sub'
                                          ][subsubIndex][parameterName].value
                                        "
                                        @output="
                                          changeCapabilityOutputProperty({
                                            outputIndex: index,
                                            subIndex: subIndex,
                                            subsubIndex: subsubIndex,
                                            propertyKey: parameterName,
                                            value:
                                              outputs()[index]['sub'][subIndex][
                                                'sub'
                                              ][subsubIndex][parameterName],
                                          })
                                        "
                                      ></v-text-field>
                                    </v-col>

                                    <v-col
                                      class="ma-0 pa-0 pb-2"
                                      v-if="
                                        typeof parameterValue.value ==
                                          'boolean' &&
                                        parameterName != 'complex' &&
                                        !(
                                          parameterValue.complexCompatible ==
                                            false &&
                                          outputs()[index]['sub'][subIndex][
                                            'sub'
                                          ][subsubIndex].complex.value
                                        )
                                      "
                                    >
                                      <v-row align="center" justify="center">
                                        <div
                                          :class="
                                            parameterValue.optional === false &&
                                            (parameterValue.value ===
                                              undefined ||
                                              parameterValue.value === null ||
                                              parameterValue.value === '')
                                              ? 'red--text mb-3 ml-3'
                                              : 'grey--text mb-3 ml-3'
                                          "
                                        >
                                          {{ parameterValue.displayName }}
                                        </div>
                                        <v-spacer></v-spacer>
                                        <v-checkbox
                                          class="mb-0"
                                          color="#1d2a36"
                                          v-model="
                                            outputs()[index]['sub'][subIndex][
                                              'sub'
                                            ][subsubIndex][parameterName].value
                                          "
                                          @change="
                                            changeCapabilityOutputProperty({
                                              outputIndex: index,
                                              subIndex: subIndex,
                                              subsubIndex: subsubIndex,
                                              propertyKey: parameterName,
                                              value:
                                                outputs()[index]['sub'][
                                                  subIndex
                                                ]['sub'][subsubIndex][
                                                  parameterName
                                                ],
                                            })
                                          "
                                        ></v-checkbox>
                                      </v-row>
                                    </v-col>
                                  </v-col>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                          </v-card-text>
                        </v-card>
                      </draggable>
                    </v-card-text>
                  </v-card>
                </draggable>
              </v-card-text>
            </v-card>
          </draggable>
        </v-row>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import draggable from "vuedraggable";
import NewSearchField from "./NewSearchField.vue";
import { uuid } from "vue-uuid";

export default {
  name: "NewCapabilityOutputs",
  components: {
    draggable,
    NewSearchField,
  },
  computed: {
    /** Getter and setter for the newCapOutputs array, which contains the outputs, sub-outputs and sub-sub-outputs of a capability description (needed for the drag-and-drop capability through the vuedraggable package)
     *
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    outputsSorted: {
      get() {
        return this.$store.getters.newCapOutputs;
      },
      set(value) {
        this.$store.commit(
          "newCapReplaceCapabilityOutputsForSequenceChange",
          value
        );
      },
    },
  },
  methods: {
    ...mapGetters({
      outputs: "newCapOutputs", // map `this.outputs()` to `this.$store.dispatch('newCapOutputs')`
      missingFields: "missingCapabilityFields", // map `this.missingFields()` to `this.$store.dispatch('missingCapabilityFields')`
    }),
    ...mapMutations({
      addCapabilityOutput: "newCapAddCapabilityOutput", // map `this.newCapAddCapabilityOutput()` to `this.$store.dispatch('newCapAddCapabilityOutput')`
      removeCapabilityOutput: "newCapRemoveCapabilityOutput", // map `this.newCapRemoveCapabilityOutput()` to `this.$store.dispatch('newCapRemoveCapabilityOutput')`
      changeCapabilityOutputProperty: "newCapChangeCapabilityOutputProperty", // map `this.newCapChangeCapabilityOutputProperty()` to `this.$store.dispatch('newCapChangeCapabilityOutputProperty')`
    }),

    /** This function returns a template from which to create the property fields of an output parameter
     *
     * @returns {object} A template from which to create the property fields of an output parameter
     *
     * @author Dimitri Staufer <staufer@tu-berlin.de>
     */
    getIOTemplate() {
      return {
        id: uuid.v1(),
        name: {
          displayName: "Name",
          example: "px",
          complexCompatible: true,
          value: "",
          optional: false,
        },
        kindOfValue: {
          displayName: "Kind of Value",
          example: "schema.org/width",
          complexCompatible: true,
          value: "",
          optional: false,
        },
        description: {
          displayName: "Description (opt.)",
          example: "required Dots Per Inch value",
          complexCompatible: true,
          value: "",
          optional: true,
        },
        complex: {
          displayName: "Complex (opt.)",
          example: "",
          complexCompatible: true,
          value: false,
          optional: true,
        },
        dataType: {
          displayName: "Data Type (opt.)",
          example: "xs:integer",
          complexCompatible: false,
          value: "",
          optional: true,
        },
        unit: {
          displayName: "Unit (opt.)",
          example: "px",
          complexCompatible: false,
          value: "",
          optional: true,
        },
        encoding: {
          displayName: "Encoding (opt.)",
          example: "image/jpg",
          complexCompatible: false,
          value: "",
          optional: true,
        },
        defaultValue: {
          displayName: "Default Value (opt.)",
          example: "43",
          complexCompatible: false,
          value: "",
          optional: true,
        },
        minValue: {
          displayName: "Minimum Value (opt.)",
          example: "0",
          complexCompatible: false,
          value: "",
          optional: true,
        },
        maxValue: {
          displayName: "Maximum Value (opt.)",
          example: "359",
          complexCompatible: false,
          value: "",
          optional: true,
        },
      };
    },
  },
};
</script>
