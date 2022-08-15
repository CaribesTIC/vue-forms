# Testeando Checkbox

## `appCheckbox.spec.ts`

```ts
import { mount } from '@vue/test-utils'
import AppCheckbox from '@/components/AppCheckbox.vue'

describe('AppCheckbox', () => {
  it('should be initialized blank and no title', () => {
    const wrapper = mount(AppCheckbox)
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.props()).toEqual(
      { label: '', modelValue: false }
    )
  })
  
  it('should render label by passing property to', () => {
    const wrapper = mount(AppCheckbox, {
      props: { label: 'Title' }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').html()).toContain('Title')    
    expect(wrapper.props().label).toEqual('Title')    
  })
  
  it('should emit empty value by default when fire', async () => {
    const wrapper = mount(AppCheckbox)
    // const checkboxInput = wrapper.find('input[type="checkbox"]')
    const checkboxInput = wrapper.find('input')

    await checkboxInput.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual(false)
  })
  
  it('should emit value which is set manually and fire', async () => {
    const wrapper = mount(AppCheckbox)    
    const checkboxInput = wrapper.find('input')    
    await checkboxInput.setValue(true)

    await checkboxInput.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual(true)
  })
  
  it('should emit value which is set by property and fire', async () => {
    const wrapper = mount(AppCheckbox, {
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
    const wrapper = mount(AppCheckbox, {     
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
    const wrapper = mount(AppCheckbox, {
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
