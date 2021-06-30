import { shallowMount } from "@vue/test-utils";
import Nav from "@/components/Navigation.vue";

describe("Nav Bar", () => {
  it("is rendered.", () => {
    const wrapper = shallowMount(Nav);
    //console.log(wrapper.html())
    expect(wrapper.exists()).toBe(true);
  });
});
