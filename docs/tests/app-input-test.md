# Testeando Input

## `appInputA.spec.ts`

```ts
import { mount } from '@vue/test-utils'
import AppInput from '@/components/AppInput.vue'

describe('AppInput', () => {
  it('should be initialized blank all and no title', () => {
    const wrapper = mount(AppInput)
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)      
    expect(wrapper.props()).toEqual({ error: '', label: '', modelValue: '' })        
  })

  it('should render label by passing property to', () => {
    const wrapper = mount(AppInput, {
      props: { label: 'Title' }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').html()).toContain('Title')    
    expect(wrapper.find('input').html()).toContain('Title')    
  })

  it('should emit empty string by default when fire', async () => {
    const wrapper = mount(AppInput)
    const input = wrapper.find('input')
    
    await input.trigger('input')

    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual('')
  })

  it('should emit string which is set manually and fire', async () => {
    const wrapper = mount(AppInput)
    const input = wrapper.find('input')    
    
    input.element.value = 'My title'    
    await input.trigger('input')
    
    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual('My title')
  })

  it('should emit string which is set by property and fire', async () => {
    const wrapper = mount(AppInput, {
      props: {
        modelValue: 'My other title'
      }
    })   

    const input = wrapper.find('input')
    await input.trigger('input')    

    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual('My other title')  
  })
})
```

## appInputB.spec.ts

```ts
import { mount } from '@vue/test-utils'
import AppInput from '@/components/AppInput.vue'

describe('AppInput', () => {
  it('should set the attributes to the input element', () => {  
    const wrapper = mount(AppInput, {
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
    const wrapper = mount(AppInput, {
      props: { label: 'Title' },
      attrs: { disabled: '' }
    })     
    
    expect(wrapper.find('label').attributes()).toEqual({for:'2'})
    expect(wrapper.find('input').attributes()).toEqual({
      disabled: '',      
      placeholder: 'Title', // with label prop
      class: 'field',
      id: '2' // uuid
    })
  })
})
```

