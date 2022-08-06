# Testeando Checkbox

:::info
Esta lección requiere tener conocimientos mínimos de pruebas automatizadas. Si aún no está familiarizado puede aprender de esto en nuestro tutorial de [Vue(TDD)](https://caribestic.github.io/vue-tdd/).
:::

## `baseCheckbox.spec.js`



## Todas las pruebas juntas

Finalmente, aquí están juntas todas las pruebas que acabamos de hacer. Puede copiarla y pegarla en su proyecto para probar su componente que hizo en la lección anterior.

📃`baseCheckbox.spec.js`
```js
import { mount } from '@vue/test-utils'
import BaseCheckbox from '@/components/BaseCheckbox.vue'

describe("BaseCheckbox", () => {
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
      props: { label: "Title" }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').html()).toContain('Title')    
    expect(wrapper.props().label).toEqual('Title')    
  })
  
  it('should emit empty value by default when fire', async () => {
    const wrapper = mount(BaseCheckbox)
    // const checkbox = wrapper.find('input[type="checkbox"]')
    const checkbox = wrapper.find('input')

    await checkbox.trigger('change')

    expect(
      wrapper.emitted()["update:modelValue"][0][0]
    ).toEqual(false)
  })
  
  it('should emit value which is set manually and fire', async () => {
    const wrapper = mount(BaseCheckbox)    
    const checkbox = wrapper.find('input')    
    await checkbox.setValue(true)

    await checkbox.trigger('change')

    expect(
      wrapper.emitted()["update:modelValue"][0][0]
    ).toEqual(true)
  })
  
  it('should emit value which is set by property and fire', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {      
        modelValue: true
      }
    })
    const checkbox = wrapper.find('input')
    
    await checkbox.trigger('change')    

    expect(
      wrapper.emitted()["update:modelValue"][0][0]
    ).toEqual(true)
  })

  it('should set the attributes to the input element', () => {
    const wrapper = mount(BaseCheckbox, {     
      props: { label:'Title' }      
    })
    const checkbox = wrapper.find('input')
    const label = wrapper.find('label')
    
    expect(label.attributes()).toEqual({})
    expect(checkbox.attributes()).toEqual(
      { class: 'field', type: 'checkbox' }
    )
  })

  it('this should set the attributes to the input element too', () => {
    const wrapper = mount(BaseCheckbox, {
      attrs: { id: '#id' },
      props: { label:'Title' }      
    })
    const checkbox = wrapper.find('input')
    const label = wrapper.find('label')    
    
    expect(label.attributes()).toEqual({})
    expect(checkbox.attributes()).toEqual(
      { class: 'field', id: '#id', type: 'checkbox' }
    )
  })
})
```
