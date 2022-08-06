# Testeando Select

:::info
Esta lección requiere tener conocimientos mínimos de pruebas automatizadas. Si aún no está familiarizado puede aprender de esto en nuestro tutorial de [Vue(TDD)](https://caribestic.github.io/vue-tdd/).
:::

## `baseSelect.spec.js`



## Todas las pruebas juntas

Finalmente, aquí están juntas todas las pruebas que acabamos de hacer. Puede copiarla y pegarla en su proyecto para probar su componente que hizo en la lección anterior.

📃`baseSelect.spec.js`
```js
import { mount } from '@vue/test-utils'
import BaseSelect from '@/components/BaseSelect.vue'

describe('BaseSelect', () => {
  it('should be initialized blank and no title', () => {
    const wrapper = mount(BaseSelect, {
      props: { options: [] }
    })
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.props()).toEqual(
      { options: [], label: '', modelValue: '' }
    )
  })
  
  it('should render label by passing property to', () => {
    const wrapper = mount(BaseSelect, {
      props: {
        label: 'Title',
        options: []        
      }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').html()).toContain('Title')    
    expect(wrapper.props().label).toEqual('Title')    
  })
  
  it('should emit empty value by default when fire', async () => {
    const wrapper = mount(BaseSelect, {
      props: { options: [] }
    })
    const select = wrapper.find('select')   

    await select.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('')
  })
  
  it('should emit value which is set manually and fire', async () => {
    const wrapper = mount(BaseSelect, {
      props: {
        options: ['bar', 'baz', 'foo']
      }
    })    
    const select = wrapper.find('select')    
    await select.setValue('baz')

    await select.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('baz')
  })
  
  it('should emit value which is set by property and fire', async () => {
    const wrapper = mount(BaseSelect, {
      props: {      
        modelValue: 'baz',
        options: ['bar', 'baz', 'foo']
      }
    })
    const select = wrapper.find('select')
    
    await select.trigger('change')    

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('baz')
  })
  
  it('should set the attributes to the select element', () => {
    const wrapper = mount(BaseSelect, {     
      props: {
        label:'Title',
        options: []
      }      
    })
    const select = wrapper.find('select')
    const label = wrapper.find('label')
    
    expect(label.attributes()).toEqual({})
    expect(select.attributes()).toEqual(
      { class: 'field' }
    )
  })
  
  it('this should set the attributes to the input element too', () => {
    const wrapper = mount(BaseSelect, {
      attrs: {
        id: '#id'
      },
      props: {
        label:'Title',
        options: []
      }      
    })
    const select = wrapper.find('select')
    const label = wrapper.find('label')    
    
    expect(label.attributes()).toEqual({})
    expect(select.attributes()).toEqual(
      { class: 'field', id: '#id' }
    )
  })
  
  it('setSelected demo', async () => {
    const wrapper = mount(BaseSelect,{
      props: {      
        modelValue: 'baz',
        options: ['bar', 'baz', 'foo']
      }
    })
    const options = wrapper.find('select').findAll('option')

    await options.at(1).setSelected()

    expect(wrapper.find('option:checked').element.value).toBe('baz')
  })
 
})
```
