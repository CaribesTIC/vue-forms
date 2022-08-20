# Testeando RadioGroup

## `appRadioGroup.spec.ts`

```ts
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppRadio from '@/components/AppRadio.vue'
import AppRadioGroup from '@/components/AppRadioGroup.vue'

describe('AppRadioGroup', () => {
  const factory = (props = {}, shallow = false ) => {
    return mount(AppRadioGroup, {
      global: { components: { AppRadio } },
      props: {
        name:'radioName',
        modelValue: '0', 
        options: [
          { label: 'Yes', value: 1 },
          { label: 'No', value: 0 }
        ],      
        ...props
      },
      shallow
    })
  }

  it('should be vertical', () => {
    const wrapper = factory({ vertical: true} )
    const labels = wrapper.findAll('label')
    const radios = wrapper.findAll('input[type="radio"]')       
    const divs = wrapper.findAll('div')
    const spans = wrapper.findAll('span')
    
    expect(wrapper.props().vertical).toBeTruthy()
    expect(divs.length).toBe(2)
    expect(spans.length).toBe(0)
    expect(labels[0].html()).toContain('Yes')
    expect(radios[0].attributes().value).toEqual('1')
    expect(labels[1].html()).toContain('No')
    expect(radios[1].attributes().value).toBe('0')
  })
  
  it('should be horizontal', () => {
    const wrapper = factory({}, true)
    const radios = wrapper.findAll('app-radio-stub')
    const spans = wrapper.findAll('span')
    const divs = wrapper.findAll('div')
    
    expect(wrapper.props().vertical).toBeFalsy()
    expect(radios.length).toBe(2)
    expect(spans.length).toBe(2)
    expect(divs.length).toBe(0)
    expect(radios[0].attributes().label).toBe('Yes')
    expect(radios[0].attributes().value).toEqual('1')
    expect(radios[1].attributes().label).toBe('No')
    expect(radios[1].attributes().value).toBe('0')
  })

  it('should be checked', async() => {
    const wrapper = factory({})    

    await wrapper.find('input[value="1"]').setChecked()

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual(1)
  })
})
```
