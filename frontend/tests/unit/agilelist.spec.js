import { mount, createLocalVue } from '@vue/test-utils'
import vmodal from 'vue-js-modal'
import VueRouter from 'vue-router'

import AgileComponent from '@/components/AgileComponent.vue'
import AddAgileComponent from '@/components/AddAgileComponent.vue'
import EditAgileComponent from '@/components/EditAgileComponent.vue'

const localVue = createLocalVue()
localVue.use(vmodal)
localVue.use(VueRouter)
const router = new VueRouter()

let mockGet = jest.fn()
jest.mock('axios', () => ({
    get: () => mockGet()
}))

describe('AgileComponent', () => {
    mockGet = jest.fn()
    const wrapper = mount(AgileComponent, { 
        localVue,
        router,
        data: () => {
            return {
                type: 0,
                typeName: "",
                agileList: []
            }
        }
    })
    expect(wrapper.exists()).toBe(true);

    // Check if all components included are existing
    test('check if components are existing', async () => {
        expect(wrapper.findComponent(AddAgileComponent).exists()).toBe(true)
        expect(wrapper.findComponent(EditAgileComponent).exists()).toBe(true)
    })

    // set data to be used
    test('check setting of data', async () => {
        await wrapper.setData({ type: '1' })
        expect(wrapper.vm.type).toBe('1')

        await wrapper.setData({ typeName: 'values' })
        expect(wrapper.vm.typeName).toBe('values')
        
        await wrapper.setData({ agileList: '[]' })
        expect(wrapper.vm.agileList).toBe('[]')
    })

    // test if it makes an api call
    it('makes an api call', async () => {
        expect(mockGet).toHaveBeenCalled()
    })
})
  