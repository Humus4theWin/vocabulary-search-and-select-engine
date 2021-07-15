<template>
  <!-- INPUTS -->

  <v-card class="ma-3 capIO" color="#3b4453">
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
        @click="
          addCapabilityInput({
            input: getIOTemplate(),
            inputIndex: -1,
            subInputIndex: -1,
          })
        "
      >
        <v-icon>mdi-card-plus</v-icon>
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
            class="ma-2"
            color="#5c6473"
          >
            <v-app-bar flat color="#293239">
              <v-icon
                v-show="inputs()[index].required.value == true"
                color="#5c6473"
                >mdi-hexagram</v-icon
              >
              <v-toolbar-title class="text-h7 white--text pl-2">
                {{
                  inputs()[index].kindOfValue.value != null &&
                  inputs()[index].kindOfValue.value != undefined &&
                  inputs()[index].kindOfValue.value != ""
                    ? "Input #" +
                      String(index + 1) +
                      " (" +
                      inputs()[index].kindOfValue.value +
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
                @click="
                  removeCapabilityInput({
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
                  <v-expansion-panel-header>
                    Properties
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-col
                      class="ma-0 pa-0"
                      v-for="(parameterValue, parameterName) in inputs()[index]"
                      :key="parameterName"
                    >
                      <v-col
                        class="ma-0 pa-0"
                        v-if="
                          typeof parameterValue.value == 'string' &&
                          !(
                            parameterValue.complexCompatible == false &&
                            inputs()[index].complex.value
                          )
                        "
                      >
                        <div class="grey--text">
                          {{ parameterValue.displayName }}
                        </div>
                        <v-text-field
                          class="ma-0 pa-0"
                          :label="'e.g., ' + parameterValue.example"
                          v-model="inputs()[index][parameterName].value"
                          @input="
                            changeCapabilityInputProperty({
                              inputIndex: index,
                              subIndex: -1,
                              subsubIndex: -1,
                              propertyKey: parameterName,
                              value: inputs()[index][parameterName],
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
                            inputs()[index].complex.value
                          )
                        "
                      >
                        <v-row align="center" justify="center">
                          <div class="grey--text mb-3 ml-3">
                            {{ parameterValue.displayName }}
                          </div>
                          <v-spacer></v-spacer>
                          <v-checkbox
                            class="mb-0"
                            color="#1d2a36"
                            v-model="inputs()[index][parameterName].value"
                            @change="
                              changeCapabilityInputProperty({
                                inputIndex: index,
                                subIndex: -1,
                                subsubIndex: -1,
                                propertyKey: parameterName,
                                value: inputs()[index][parameterName],
                              })
                            "
                          ></v-checkbox>
                        </v-row>
                      </v-col>
                    </v-col>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-btn
                  v-if="inputs()[index].complex.value == true"
                  class="mt-5 mb-2"
                  x-large
                  color="white"
                  style="min-width: 100%"
                  @click="
                    addCapabilityInput({
                      input: getIOTemplate(),
                      inputIndex: index,
                      subInputIndex: -1,
                    })
                  "
                  >Add Sub-Input</v-btn
                >
              </v-expansion-panels>

              <!-- SUB INPUTS -->

              <v-card
                v-for="(input, subIndex) in inputs()[index]['sub']"
                :key="subIndex"
                class="ma-2"
                color="#5c6473"
              >
                <v-app-bar flat color="#242b31">
                  <v-icon
                    v-show="
                      inputs()[index]['sub'][subIndex].required.value == true
                    "
                    color="#5c6473"
                    >mdi-hexagram</v-icon
                  >
                  <v-icon color="#5c6473">mdi-file-tree-outline</v-icon>
                  <v-toolbar-title class="text-h7 white--text pl-2">
                    {{
                      inputs()[index]["sub"][subIndex].kindOfValue.value !=
                        null &&
                      inputs()[index]["sub"][subIndex].kindOfValue.value !=
                        undefined &&
                      inputs()[index]["sub"][subIndex].kindOfValue.value != ""
                        ? "Input #" +
                          String(index + 1) +
                          "." +
                          String(subIndex + 1) +
                          " (" +
                          inputs()[index]["sub"][subIndex].kindOfValue.value +
                          ")"
                        : "Input #" +
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
                      removeCapabilityInput({
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
                      <v-expansion-panel-header>
                        Properties
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-col
                          class="ma-0 pa-0"
                          v-for="(parameterValue, parameterName) in inputs()[
                            index
                          ]['sub'][subIndex]"
                          :key="parameterName"
                        >
                          <v-col
                            class="ma-0 pa-0"
                            v-if="
                              typeof parameterValue.value == 'string' &&
                              !(
                                parameterValue.complexCompatible == false &&
                                inputs()[index]['sub'][subIndex].complex.value
                              )
                            "
                          >
                            <div class="grey--text">
                              {{ parameterValue.displayName }}
                            </div>
                            <v-text-field
                              class="ma-0 pa-0"
                              :label="'e.g., ' + parameterValue.example"
                              v-model="
                                inputs()[index]['sub'][subIndex][parameterName]
                                  .value
                              "
                              @input="
                                changeCapabilityInputProperty({
                                  inputIndex: index,
                                  subIndex: subIndex,
                                  subsubIndex: -1,
                                  propertyKey: parameterName,
                                  value:
                                    inputs()[index]['sub'][subIndex][
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
                                inputs()[index]['sub'][subIndex].complex.value
                              )
                            "
                          >
                            <v-row align="center" justify="center">
                              <div class="grey--text mb-3 ml-3">
                                {{ parameterValue.displayName }}
                              </div>
                              <v-spacer></v-spacer>
                              <v-checkbox
                                class="mb-0"
                                color="#1d2a36"
                                v-model="
                                  inputs()[index]['sub'][subIndex][
                                    parameterName
                                  ].value
                                "
                                @change="
                                  changeCapabilityInputProperty({
                                    inputIndex: index,
                                    subIndex: subIndex,
                                    subsubIndex: -1,
                                    propertyKey: parameterName,
                                    value:
                                      inputs()[index]['sub'][subIndex][
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
                        inputs()[index]['sub'][subIndex].complex.value == true
                      "
                      class="mt-5 mb-2"
                      x-large
                      color="white"
                      style="min-width: 100%"
                      @click="
                        addCapabilityInput({
                          input: getIOTemplate(),
                          inputIndex: index,
                          subInputIndex: subIndex,
                        })
                      "
                      >Add Sub-Sub-Input</v-btn
                    >
                  </v-expansion-panels>

                  <!-- SUB SUB INPUTS -->

                  <v-card
                    v-for="(input, subsubIndex) in inputs()[index]['sub'][
                      subIndex
                    ]['sub']"
                    :key="subsubIndex"
                    class="ma-2"
                    color="#5c6473"
                  >
                    <v-app-bar flat color="#1c2124">
                      <v-icon
                        v-show="
                          inputs()[index]['sub'][subIndex]['sub'][subsubIndex]
                            .required.value == true
                        "
                        color="#5c6473"
                        >mdi-hexagram</v-icon
                      >
                      <v-icon color="#5c6473">mdi-file-tree</v-icon>
                      <v-toolbar-title class="text-h7 white--text pl-2">
                        {{
                          inputs()[index]["sub"][subIndex]["sub"][subsubIndex]
                            .kindOfValue.value != null &&
                          inputs()[index]["sub"][subIndex]["sub"][subsubIndex]
                            .kindOfValue.value != undefined &&
                          inputs()[index]["sub"][subIndex]["sub"][subsubIndex]
                            .kindOfValue.value != ""
                            ? "Input #" +
                              String(index + 1) +
                              "." +
                              String(subIndex + 1) +
                              "." +
                              String(subsubIndex + 1) +
                              " (" +
                              inputs()[index]["sub"][subIndex]["sub"][
                                subsubIndex
                              ].kindOfValue.value +
                              ")"
                            : "Input #" +
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
                          removeCapabilityInput({
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
                              ) in inputs()[index]['sub'][subIndex]['sub'][
                                subsubIndex
                              ]"
                              :key="parameterName"
                            >
                              <v-col
                                class="ma-0 pa-0"
                                v-if="
                                  typeof parameterValue.value == 'string' &&
                                  !(
                                    parameterValue.complexCompatible == false &&
                                    inputs()[index]['sub'][subIndex]['sub'][
                                      subsubIndex
                                    ].complex.value
                                  )
                                "
                              >
                                <div class="grey--text">
                                  {{ parameterValue.displayName }}
                                </div>
                                <v-text-field
                                  class="ma-0 pa-0"
                                  :label="'e.g., ' + parameterValue.example"
                                  v-model="
                                    inputs()[index]['sub'][subIndex]['sub'][
                                      subsubIndex
                                    ][parameterName].value
                                  "
                                  @input="
                                    changeCapabilityInputProperty({
                                      inputIndex: index,
                                      subIndex: subIndex,
                                      subsubIndex: subsubIndex,
                                      propertyKey: parameterName,
                                      value:
                                        inputs()[index]['sub'][subIndex]['sub'][
                                          subsubIndex
                                        ][parameterName],
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
                                    inputs()[index]['sub'][subIndex]['sub'][
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
                                    class="mb-0"
                                    color="#1d2a36"
                                    v-model="
                                      inputs()[index]['sub'][subIndex]['sub'][
                                        subsubIndex
                                      ][parameterName].value
                                    "
                                    @change="
                                      changeCapabilityInputProperty({
                                        inputIndex: index,
                                        subIndex: subIndex,
                                        subsubIndex: subsubIndex,
                                        propertyKey: parameterName,
                                        value:
                                          inputs()[index]['sub'][subIndex][
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
//import SearchField from "@/components/SearchField.vue";

export default {
  name: "NewCapabilityInputs",
  components: {
    //SearchField,
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
      inputs: "newCapInputs", // map `this.newCapInputs()` to `this.$store.dispatch('newCapInputs')`
    }),
    ...mapMutations({
      addCapabilityInput: "newCapAddCapabilityInput", // map `this.newCapAddCapabilityInput()` to `this.$store.dispatch('newCapAddCapabilityInput')`
      removeCapabilityInput: "newCapRemoveCapabilityInput", // map `this.newCapRemoveCapabilityInput()` to `this.$store.dispatch('newCapRemoveCapabilityInput')`
      changeCapabilityInputProperty: "newCapChangeCapabilityInputProperty", // map `this.newCapChangeCapabilityInputProperty()` to `this.$store.dispatch('newCapChangeCapabilityInputProperty')`
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
        required: {
          displayName: "Required",
          example: "",
          complexCompatible: true,
          value: false,
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
