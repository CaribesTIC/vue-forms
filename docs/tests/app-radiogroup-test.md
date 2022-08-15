# Testeando RadioGroup

## `appRadioGroup.spec.js`

```ts
import { mount } from '@vue/test-utils'
import AppRadio from '@/components/AppRadio.vue'
import AppRadioGroup from '@/components/AppRadioGroup.vue'

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

describe('AppRadioGroup', () => {
  it('should be 1', () => {
    const wrapper = factory({ vertical:true }, true )
    
    const divs = wrapper.findAll('div')
    const spans = wrapper.findAll('span')
    
    expect(wrapper.props().vertical).toBeTruthy()
    expect(divs.length).toBe(2)
    expect(spans.length).toBe(0)

  })
  
  it('should be 2', () => {
    const wrapper = factory({}, true )   

    const radioInputs = wrapper.findAll('app-radio-stub')
    const spans = wrapper.findAll('span')
    const divs = wrapper.findAll('div')
    
    expect(wrapper.props().vertical).toBeFalsy()
    expect(radioInputs.length).toBe(2)
    expect(spans.length).toBe(2)
    expect(divs.length).toBe(0)
    expect(radioInputs[0].attributes().label).toBe('Yes')
    expect(radioInputs[0].attributes().value).toEqual('1')
    expect(radioInputs[1].attributes().label).toBe('No')
    expect(radioInputs[1].attributes().value).toBe('0')
  })

  it('should be', async() => {
    const wrapper = factory({})    

    await wrapper.find('input[value="1"]').setChecked()

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual(1)
  }) 
})
```
