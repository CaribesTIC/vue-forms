# Testeando Select

## `appSelect.spec.ts`

```ts
import { mount } from '@vue/test-utils'
import AppSelect from '@/components/AppSelect.vue'

describe('AppSelect', () => {
  it('should be initialized blank and no title', () => {
    const wrapper = mount(AppSelect, {
      props: { options: [] }
    })
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.props()).toEqual(
      { options: [], label: '', modelValue: '' }
    )
  })
  
  it('should render label by passing property to', () => {
    const wrapper = mount(AppSelect, {
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
    const wrapper = mount(AppSelect, {
      props: { options: [] }
    })
    const select = wrapper.find('select')   

    await select.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('')
  })
  
  it('should emit value which is set manually and fire', async () => {
    const wrapper = mount(AppSelect, {
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
    const wrapper = mount(AppSelect, {
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
    const wrapper = mount(AppSelect, {     
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
    const wrapper = mount(AppSelect, {
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
    const wrapper = mount(AppSelect,{
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
