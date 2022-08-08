# Testeando Input

## `baseInputA.spec.js`

```js
import { mount } from '@vue/test-utils'
import BaseInput from '@/components/BaseInput.vue'

describe('BaseInput', () => {
  it('should be initialized blank all and no title', () => {
    const wrapper = mount(BaseInput)
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)      
    expect(wrapper.props()).toEqual({
      error: '',
      label: '',
      modelValue: ''
    })        
  })

  it('should render label by passing property to', () => {
    const wrapper = mount(BaseInput, {
      props: { label: 'Title' }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').html()).toContain('Title')    
    expect(wrapper.find('input').html()).toContain('Title')    
  })

  it('should emit empty string by default when fire', async () => {
    const wrapper = mount(BaseInput)
    const input = wrapper.find('input')
    
    await input.trigger('input')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('')
  })

  it('should emit string which is set manually and fire', async () => {
    const wrapper = mount(BaseInput)
    const input = wrapper.find('input')    
    
    input.element.value = 'My title'    
    await input.trigger('input')
    
    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('My title')
  })

  it('should emit string which is set by property and fire', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'My other title'
      }
    })   

    const input = wrapper.find('input')
    await input.trigger('input')    

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('My other title')  
  })
})
```

## baseInputB.spec.js

```js
import { mount } from '@vue/test-utils'
import BaseInput from '@/components/BaseInput.vue'

describe('BaseInput', () => {
  it('should set the attributes to the input element', () => {  
    const wrapper = mount(BaseInput, {
      attrs: { type: 'text' }
    })        

    expect(wrapper.find('label').exists()).toBe(false)     
    expect(wrapper.find('input').attributes()).toEqual({      
      type: 'text',
      placeholder: '', // without label prop
      class: 'field',
      id: '1' // uuid
    })    
  })

  it('this should set the attributes to the input element too', () => {     
    const wrapper = mount(BaseInput, {
      props: { label: 'Title' },
      attrs: { disabled: '' }
    })     
    
    expect(wrapper.find('label').attributes()).toEqual({ for: '2' })
    expect(wrapper.find('input').attributes()).toEqual({
      disabled: '',      
      placeholder: 'Title', // with label prop
      class: 'field',
      id: '2' // uuid
    })
  })
})
```

