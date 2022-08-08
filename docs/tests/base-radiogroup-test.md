# Testeando RadioGroup

## `baseRadioGroup.spec.js`

```js
import { mount } from '@vue/test-utils'
import BaseRadio from '@/components/BaseRadio.vue'
import BaseRadioGroup from '@/components/BaseRadioGroup.vue'

describe('BaseRadioGroup', () => {
  it('should be', () => {
    const wrapper = mount(BaseRadioGroup,{
      global: { components: { BaseRadio } },    
      props:{
        name:'radioName',
        modelValue: '0', 
        options: [
          { label: 'Yes', value: 1 },
          { label: 'No', value: 0 }
        ],
        vertical:true
      },
      shallow: true      
    })
    
    const divs = wrapper.findAll('div')
    const spans = wrapper.findAll('span')
    
    expect(wrapper.props().vertical).toBeTruthy()
    expect(divs.length).toBe(2)
    expect(spans.length).toBe(0)

  })
  
  it('should be', () => {
    const wrapper = mount(BaseRadioGroup,{
      global: { components: { BaseRadio } },    
      props:{
        name:'radioName',
        modelValue: '0', 
        options: [
          { label: 'Yes', value: 1 },
          { label: 'No', value: 0 }
        ]
      },
      shallow: true      
    })    

    const radioInputs = wrapper.findAll('base-radio-stub')
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
    const wrapper = mount(BaseRadioGroup,{
      global: { components: { BaseRadio } },
      props:{
        name:'radioName',
        modelValue: '0', 
        options: [
          { label: 'Yes', value: 1 },
          { label: 'No', value: 0 }
        ]
      }
    })    

    await wrapper.find('input[value="1"]').setChecked()

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual(1)
  })  
  
})
```

📃`baseRadioGroup.spec.js`
```js
import { mount } from '@vue/test-utils'
import BaseRadio from '@/components/BaseRadio.vue'
import BaseRadioGroup from '@/components/BaseRadioGroup.vue'


const factory = (props = {}, shallow = false ) => {
  return mount(BaseRadioGroup, {
    global: { components: { BaseRadio } },
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

describe('BaseCheckbox', () => {
  it('should be', () => {
    const wrapper = factory({ vertical:true }, true )
    
    const divs = wrapper.findAll('div')
    const spans = wrapper.findAll('span')
    
    expect(wrapper.props().vertical).toBeTruthy()
    expect(divs.length).toBe(2)
    expect(spans.length).toBe(0)

  })
  
  it('should be', () => {
    const wrapper = factory({}, true )   

    const radioInputs = wrapper.findAll('base-radio-stub')
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
