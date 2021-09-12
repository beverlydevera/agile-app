import { mount } from '@vue/test-utils'
import HeaderComponent from '@/components/layout/HeaderComponent.vue'

describe('HeaderComponent', () => {
    let wrapper = mount(HeaderComponent);
    expect(wrapper.exists()).toBe(true);

    // test if header exists
    test("Check if header exists", () => {
        const header = wrapper.findAll('.header');
        expect(header.length).toBe(1);
    });
})
  