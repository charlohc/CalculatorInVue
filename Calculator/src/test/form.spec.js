import { describe, it, expect } from "vitest";

import {mount, shallowMount} from "@vue/test-utils";
import Calculator from "../views/reviews.vue";

//kommandoer: npm run test:unit
describe('CalculatorTESTS', () => {
    it("should render", () => {
        const wrapper = mount(Calculator)
    })


    it('checks name', async () => {
        const wrapper = shallowMount(Calculator);
        await wrapper.setData({name: 'Charlotte'});
        expect(wrapper.vm.name).toBe('Charlotte');

    });
})