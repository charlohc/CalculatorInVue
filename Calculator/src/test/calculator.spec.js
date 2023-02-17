import { describe, it, expect } from "vitest";

import {mount, shallowMount} from "@vue/test-utils";
import Calculator from "../views/calculator.vue";

//kommandoer: npm run test:unit
describe('CalculatorTESTS', () => {
    it("should render", () => {
        const wrapper = mount(Calculator)
    })


    it('should add two numbers', async () => {
        const wrapper = shallowMount(Calculator);
        wrapper.setData({ calculatorValue: '2' });
        wrapper.vm.clicked('+');
        wrapper.setData({ calculatorValue: '3' });
        wrapper.vm.clicked('=');
        expect(wrapper.vm.calculatorValue).toBe(5);

    });
})
