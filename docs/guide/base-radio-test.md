# Testeando Input

:::info
Esta lección requiere tener conocimientos mínimos de pruebas automatizadas. Si aún no está familiarizado puede aprender de esto en nuestro tutorial de [Vue(TDD)](https://caribestic.github.io/vue-tdd/).
:::

## `baseRadio.spec.js`


## Todas las pruebas juntas

Finalmente, aquí están juntas todas las pruebas que acabamos de hacer. Puede copiarla y pegarla en su proyecto para probar su componente que hizo en la lección anterior.

📃`baseRadio.spec.js`
```js
import { mount } from '@vue/test-utils'
import BaseRadio from '@/components/BaseRadio.vue'

describe('BaseCheckbox', () => {
  it('should be initialized blank and no title', () => {
    const wrapper = mount(BaseRadio,{
      props:{ value: '0' }
    })
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.props()).toEqual(
      { label: '', modelValue: '', value: '0' }
    )
  })

  it('should render label by passing property to', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        label: 'Title',
        value: '0'
      }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').html()).toContain('Title')    
    expect(wrapper.props().label).toEqual('Title')    
  })

  it('should emit 0 value by default when fire', async () => {
    const wrapper = mount(BaseRadio, {
      props:{ value: '0' }
    })
    //const radioInput = wrapper.find('input[type="radio"]')
    const radioInput = wrapper.find('input')

    await radioInput.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('0')
  })

  it('should be truthy when set checked', async () => {
    const wrapper = mount(BaseRadio, {           
      props: { value: '0' }      
    })    
    const radioInput = wrapper.find('input')

    await radioInput.setChecked()
    
    expect(radioInput.element.checked).toBeTruthy()
  })

  it('should be truthy when value is equal to modelValue', async () => {
    const wrapper = mount(BaseRadio, {               
      props: {
        value: '0',
        modelValue: '0'                   
      }      
    })    
    const radioInput = wrapper.find('input')    
    
    expect(radioInput.element.checked).toBeTruthy()    
  })

  it('should be falsy when value is not equal to modelValue', async () => {
    const wrapper = mount(BaseRadio, {               
      props: {
        value: '0',
        modelValue: '1'                   
      }      
    })    
    const radioInput = wrapper.find('input')    
    
    expect(radioInput.element.checked).toBeFalsy()    
  })

  it('should be truthy when value is checked', async () => {
    const wrapper = mount(BaseRadio, {
      attrs: { checked: true },
      props: { value: '0' }      
    })    
    const radioInput = wrapper.find('input')    
    
    expect(radioInput.element.checked).toBeTruthy()    
  })
  
  it('should be falsy when value is unchecked', async () => {
    const wrapper = mount(BaseRadio, {
      attrs: { checked: false },
      props: { value: '0' }      
    })    
    const radioInput = wrapper.find('input')    
    
    expect(radioInput.element.checked).toBeFalsy()    
  })  
})
```
