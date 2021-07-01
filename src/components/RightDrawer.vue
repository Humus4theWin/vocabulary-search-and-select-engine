<template>
  <v-col class="newCapabilityMenu">
    <v-col class="pa-8">
      <h1 class="mb-10 white--text" style="line-height: 1.3 !important">
        New Capability
      </h1>

      <v-card class="mx-auto mb-5">
        <v-app-bar flat color="#74b559">
          <v-toolbar-title class="text-h6 white--text pl-0">
            Name (e.g. schema:PhotographAction)
          </v-toolbar-title>
        </v-app-bar>
        <SearchField />
      </v-card>

      <v-card class="mx-auto mb-5">
        <v-app-bar flat color="#74b559">
          <v-toolbar-title class="text-h6 white--text pl-0">
            Same As (optional)
          </v-toolbar-title>
        </v-app-bar>
        <SearchField />
      </v-card>

      <v-card class="mx-auto mb-5">
        <v-app-bar flat color="#74b559">
          <v-toolbar-title class="text-h6 white--text pl-0">
            JavaScript Filename
          </v-toolbar-title>
        </v-app-bar>
        <v-card-text class="text-left">
          <v-text-field
            v-model="firstname"
            :rules="nameRules"
            label='Default: "Index.js"'
            required
          ></v-text-field>
        </v-card-text>
      </v-card>

      <v-card class="mx-auto mb-5">
        <v-app-bar flat color="#1d2a36">
          <v-toolbar-title class="text-h6 white--text pl-0">
            Inputs
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn class="ma-0" text icon color="white">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-app-bar>
        <v-card-text class="text-left">
          <v-col>
            <v-row>
              <v-card class="mx-auto mb-5" style="width: 50%">
                <v-app-bar flat color="#1d2a36">
                  <v-toolbar-title class="text-h7 white--text pl-0">
                    schema:width
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn class="ma-0" text icon color="white">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-app-bar>
                <v-card-text class="text-left">
                  <v-expansion-panels class="pt-4">
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        Properties
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <v-col>
                          <v-row align="center" justify="center">
                            <div class="grey--text mb-3">Required</div>
                            <v-spacer></v-spacer>
                            <v-checkbox
                              class="mb-3"
                              color="#1d2a36"
                            ></v-checkbox>
                          </v-row>
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">
                            Kind of Value aka. fno:predicate (e.g. schema:width)
                          </div>
                          <SearchField class="ma-2" />
                        </v-col>

                        <v-col>
                          <div class="grey--text mb-3">
                            Data Type aka. foo:parameter (e.g. schema:Integer)
                          </div>
                          <SearchField class="ma-2" />
                        </v-col>
                      </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        Custom Properties
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        We can use this: https://he-tree-vue.phphe.com/
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </v-card>
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col fill-height align="end" class="pa-8">
      <v-btn x-large color="white">Generate JSON-LD</v-btn>
    </v-col>
  </v-col>
</template>

<style lang="scss">
.newCapabilityMenu {
  background-color: #343c4a;
  transition: all 0.5s;
  transition-timing-function: ease-out;
  height: 100%;
}
</style>

<script>
import { mapGetters, mapMutations } from "vuex";
import SearchField from "@/components/SearchField.vue";

export default {
  name: "RightDrawer",
  components: {
    SearchField,
  },
  computed: {
    ...mapGetters({
      drawer: "rightDrawerState", // map `this.rightDrawerState()` to `this.$store.dispatch('rightDrawerState')`
    }),
    drawerState: {
      get() {
        return this.drawer;
      },
      set(drawerState) {
        if (!drawerState) {
          this.toggleRightDrawerState();
        }
        return drawerState;
      },
    },
  },
  methods: {
    ...mapMutations({
      toggleRightDrawerState: "toggleRightDrawerState", // map `this.toggleRightDrawerState()` to `this.$store.dispatch('toggleRightDrawerState')`
    }),
  },
};
</script>
