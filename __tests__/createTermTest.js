import { shallowMount } from "@vue/test-utils";
import CreaTerm from "vocabulary-search-and-select-engine/src/views/CreateTerm.vue";

describe("CreateTerm", () => {
  const wrapper = shallowMount(CreaTerm);
  //console.log(wrapper.html())
  it("is rendered.", () => {
    expect(wrapper.exists()).toBe(true);
  });
  it("has an empty title", () => {
    expect(wrapper.vm.title).toMatch("");
  });

  it("has a text-field component.", () => {
    expect(wrapper.find("v-text-field-stub").exists()).toBe(true);
  });
  it("has the hint", () => {
    expect(wrapper.find("v-text-field-stub").vm.hint).toMatch(
      "Your created IRI is: https://rdf.proceed-labs.org/"
    );
  });
  it("has the hint with abc", async () => {
    //changes the data: of the component
    await wrapper.setData({ title: "abc" });
    expect(wrapper.find("v-text-field-stub").vm.hint).toMatch(
      "Your created IRI is: https://rdf.proceed-labs.org/abc"
    );
  });
});
