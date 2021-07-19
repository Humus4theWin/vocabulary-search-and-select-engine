<template>
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
          <v-card
            v-for="(output, index) in outputs()"
            :key="index"
            class="ma-3"
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
              <v-btn
                v-if="outputs()[index].complex.value == true"
                class="ma-0"
                text
                icon
                color="white"
                @click="
                  addCapabilityOutput({
                    output: getIOTemplate(),
                    outputIndex: index,
                    subOutputIndex: -1,
                  })
                "
              >
                <v-icon>mdi-card-plus</v-icon>
              </v-btn>
            </v-app-bar>
            <v-card-text class="text-left">
              <v-expansion-panels class="pt-2">
                <v-expansion-panel>
                  <v-expansion-panel-header>
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
                        class="ma-0 pa-0"
                        v-if="
                          (parameterValue.displayName == 'Kind of Value' ||
                            parameterValue.displayName == 'Data Type') &&
                          !(
                            parameterValue.complexCompatible == false &&
                            outputs()[index].complex.value
                          )
                        "
                      >
                        <div class="grey--text">
                          {{ parameterValue.displayName }}
                        </div>
                        <new-search-field
                          label="'e.g., ' + parameterValue.example"
                          type="output"
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
                            parameterValue.displayName == 'Data Type'
                          ) &&
                          !(
                            parameterValue.complexCompatible == false &&
                            outputs()[index].complex.value
                          )
                        "
                      >
                        <div class="grey--text">
                          {{ parameterValue.displayName }}
                        </div>
                        <v-text-field
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
                        class="ma-0 pa-0"
                        v-if="
                          typeof parameterValue.value == 'boolean' &&
                          !(
                            parameterValue.complexCompatible == false &&
                            outputs()[index].complex.value
                          )
                        "
                      >
                        <v-row align="center" justify="center">
                          <div class="grey--text mb-3 ml-3">
                            {{ parameterValue.displayName }}
                          </div>
                          <v-spacer></v-spacer>
                          <v-checkbox
                            class="mb-3"
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
              </v-expansion-panels>

              <!-- SUB OUTPUTS -->

              <v-card
                v-for="(output, subIndex) in outputs()[index]['sub']"
                :key="subIndex"
                class="ma-3"
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
                      outputs()[index]["sub"][subIndex].kindOfValue.value != ""
                        ? "Output #" +
                          String(index + 1) +
                          "." +
                          String(subIndex + 1) +
                          " (" +
                          outputs()[index]["sub"][subIndex].kindOfValue.value +
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
                  <v-btn
                    v-if="
                      outputs()[index]['sub'][subIndex].complex.value == true
                    "
                    class="ma-0"
                    text
                    icon
                    color="white"
                    @click="
                      addCapabilityOutput({
                        output: getIOTemplate(),
                        outputIndex: index,
                        subOutputIndex: subIndex,
                      })
                    "
                  >
                    <v-icon>mdi-card-plus</v-icon>
                  </v-btn>
                </v-app-bar>
                <v-card-text class="text-left">
                  <v-expansion-panels class="pt-2">
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        Properties
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-col
                          class="ma-0 pa-0"
                          v-for="(parameterValue, parameterName) in outputs()[
                            index
                          ]['sub'][subIndex]"
                          :key="parameterName"
                        >
                          <v-col
                            class="ma-0 pa-0"
                            v-if="
                              (parameterValue.displayName == 'Kind of Value' ||
                                parameterValue.displayName == 'Data Type') &&
                              !(
                                parameterValue.complexCompatible == false &&
                                outputs()[index]['sub'][subIndex].complex.value
                              )
                            "
                          >
                            <div class="grey--text">
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
                                parameterValue.displayName == 'Kind of Value' ||
                                parameterValue.displayName == 'Data Type'
                              ) &&
                              !(
                                parameterValue.complexCompatible == false &&
                                outputs()[index]['sub'][subIndex].complex.value
                              )
                            "
                          >
                            <div class="grey--text">
                              {{ parameterValue.displayName }}
                            </div>
                            <v-text-field
                              :label="'e.g., ' + parameterValue.example"
                              v-model="
                                outputs()[index]['sub'][subIndex][parameterName]
                                  .value
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
                            class="ma-0 pa-0"
                            v-if="
                              typeof parameterValue.value == 'boolean' &&
                              !(
                                parameterValue.complexCompatible == false &&
                                outputs()[index]['sub'][subIndex].complex.value
                              )
                            "
                          >
                            <v-row align="center" justify="center">
                              <div class="grey--text mb-3 ml-3">
                                {{ parameterValue.displayName }}
                              </div>
                              <v-spacer></v-spacer>
                              <v-checkbox
                                class="mb-3"
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
                  </v-expansion-panels>

                  <!-- SUB SUB OUTPUTS -->

                  <v-card
                    v-for="(output, subsubIndex) in outputs()[index]['sub'][
                      subIndex
                    ]['sub']"
                    :key="subsubIndex"
                    class="ma-3"
                    color="#5c6473"
                  >
                    <v-app-bar flat color="#1c2124">
                      <v-icon color="#5c6473">mdi-file-tree</v-icon>
                      <v-toolbar-title class="text-h7 white--text pl-2">
                        {{
                          outputs()[index]["sub"][subIndex]["sub"][subsubIndex]
                            .kindOfValue.value != null &&
                          outputs()[index]["sub"][subIndex]["sub"][subsubIndex]
                            .kindOfValue.value != undefined &&
                          outputs()[index]["sub"][subIndex]["sub"][subsubIndex]
                            .kindOfValue.value != ""
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
                          <v-expansion-panel-header>
                            Properties
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-col
                              class="ma-0 pa-0"
                              v-for="(
                                parameterValue, parameterName
                              ) in outputs()[index]['sub'][subIndex]['sub'][
                                subsubIndex
                              ]"
                              :key="parameterName"
                            >
                              <v-col
                                class="ma-0 pa-0"
                                v-if="
                                  (parameterValue.displayName ==
                                    'Kind of Value' ||
                                    parameterValue.displayName ==
                                      'Data Type') &&
                                  !(
                                    parameterValue.complexCompatible == false &&
                                    outputs()[index]['sub'][subIndex]['sub'][
                                      subsubIndex
                                    ].complex.value
                                  )
                                "
                              >
                                <div class="grey--text">
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
                                      outputs()[index]['sub'][subIndex]['sub'][
                                        subsubIndex
                                      ][parameterName],
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
                                    parameterValue.displayName == 'Data Type'
                                  ) &&
                                  !(
                                    parameterValue.complexCompatible == false &&
                                    outputs()[index]['sub'][subIndex]['sub'][
                                      subsubIndex
                                    ].complex.value
                                  )
                                "
                              >
                                <div class="grey--text">
                                  {{ parameterValue.displayName }}
                                </div>
                                <v-text-field
                                  :label="'e.g., ' + parameterValue.example"
                                  v-model="
                                    outputs()[index]['sub'][subIndex]['sub'][
                                      subsubIndex
                                    ][parameterName].value
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
                                class="ma-0 pa-0"
                                v-if="
                                  typeof parameterValue.value == 'boolean' &&
                                  parameterName != 'complex' &&
                                  !(
                                    parameterValue.complexCompatible == false &&
                                    outputs()[index]['sub'][subIndex]['sub'][
                                      subsubIndex
                                    ].complex.value
                                  )
                                "
                              >
                                <v-row align="center" justify="center">
                                  <div class="grey--text mb-3 ml-3">
                                    {{ parameterValue.displayName }}
                                  </div>
                                  <v-spacer></v-spacer>
                                  <v-checkbox
                                    class="mb-3"
                                    color="#1d2a36"
                                    v-model="
                                      outputs()[index]['sub'][subIndex]['sub'][
                                        subsubIndex
                                      ][parameterName].value
                                    "
                                    @change="
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
                                  ></v-checkbox>
                                </v-row>
                              </v-col>
                            </v-col>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-row>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<style lang="scss">
.capIO {
  min-width: 350px;
}
</style>

<script>
import { mapGetters, mapMutations } from "vuex";
import NewSearchField from "./NewSearchField.vue";
//import SearchField from "@/components/SearchField.vue";

export default {
  name: "NewCapabilityOutputs",
  components: {
    //SearchField,
    NewSearchField,
  },
  data() {
    return {
      openedPanel: [],
      openedPanelSub: [],
      openedPanelSubSub: [],
    };
  },
  methods: {
    ...mapGetters({
      outputs: "newCapOutputs", // map `this.newCapOutputs()` to `this.$store.dispatch('newCapOutputs')`
    }),
    ...mapMutations({
      addCapabilityOutput: "newCapAddCapabilityOutput", // map `this.newCapAddCapabilityOutput()` to `this.$store.dispatch('newCapAddCapabilityOutput')`
      removeCapabilityOutput: "newCapRemoveCapabilityOutput", // map `this.newCapRemoveCapabilityOutput()` to `this.$store.dispatch('newCapRemoveCapabilityOutput')`
      changeCapabilityOutputProperty: "newCapChangeCapabilityOutputProperty", // map `this.newCapChangeCapabilityOutputProperty()` to `this.$store.dispatch('newCapChangeCapabilityOutputProperty')`
    }),
    getIOTemplate() {
      return {
        name: {
          displayName: "Name",
          example: "px or options",
          complexCompatible: true,
          value: "",
        },
        kindOfValue: {
          displayName: "Kind of Value",
          example: "schema.org/width",
          complexCompatible: true,
          value: "",
        },
        complex: {
          displayName: "Complex",
          example: "",
          complexCompatible: true,
          value: false,
        },
        dataType: {
          displayName: "Data Type",
          example: "xs:integer",
          complexCompatible: false,
          value: "",
        },
        unit: {
          displayName: "Unit",
          example: "px",
          complexCompatible: false,
          value: "",
        },
        encoding: {
          displayName: "Encoding",
          example: "image/jpg",
          complexCompatible: false,
          value: "",
        },
        defaultValue: {
          displayName: "Default Value",
          example: "43",
          complexCompatible: false,
          value: "",
        },
      };
    },
  },
};
</script>
