# Testeando Checkbox

## `baseCheckbox.spec.js`

```js
import { mount } from '@vue/test-utils'
import BaseCheckbox from '@/components/BaseCheckbox.vue'

describe('BaseCheckbox', () => {
  it('should be initialized blank and no title', () => {
    const wrapper = mount(BaseCheckbox)
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.props()).toEqual(
      { label: '', modelValue: false }
    )
  })
  
  it('should render label by passing property to', () => {
    const wrapper = mount(BaseCheckbox, {
      props: { label: 'Title' }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').html()).toContain('Title')    
    expect(wrapper.props().label).toEqual('Title')    
  })
  
  it('should emit empty value by default when fire', async () => {
    const wrapper = mount(BaseCheckbox)
    // const checkboxInput = wrapper.find('input[type="checkbox"]')
    const checkboxInput = wrapper.find('input')

    await checkboxInput.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual(false)
  })
  
  it('should emit value which is set manually and fire', async () => {
    const wrapper = mount(BaseCheckbox)    
    const checkboxInput = wrapper.find('input')    
    await checkboxInput.setValue(true)

    await checkboxInput.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual(true)
  })
  
  it('should emit value which is set by property and fire', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {      
        modelValue: true
      }
    })
    const checkboxInput = wrapper.find('input')
    
    await checkboxInput.trigger('change')    

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual(true)
  })

  it('should set the attributes to the input element', () => {
    const wrapper = mount(BaseCheckbox, {     
      props: { label:'Title' }      
    })
    const checkboxInput = wrapper.find('input')
    const label = wrapper.find('label')
    
    expect(label.attributes()).toEqual({})
    expect(checkboxInput.attributes()).toEqual(
      { class: 'field', type: 'checkbox' }
    )
  })

  it('this should set the attributes to the input element too', () => {
    const wrapper = mount(BaseCheckbox, {
      attrs: { id: '#id' },
      props: { label:'Title' }      
    })
    const checkboxInput = wrapper.find('input')
    const label = wrapper.find('label')    
    
    expect(label.attributes()).toEqual({})
    expect(checkboxInput.attributes()).toEqual(
      { class: 'field', id: '#id', type: 'checkbox' }
    )
  })
})
```
