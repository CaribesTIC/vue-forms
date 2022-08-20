# Testeando Input

## `appInput.spec.ts`

```ts
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppErrorMessage from '@/components/AppErrorMessage.vue'
import AppInput from '@/components/AppInput.vue'

describe('AppInput with UUID', () => {
  const factory = (props = {}, attrs = {} ) => {
    return mount(AppInput, {
      global: { components: { AppErrorMessage } },
      props: { ...props },
      attrs: { ...attrs }
    })
  }

  it('should be initialized blank all and no title', () => {
    const wrapper = factory()
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.props()).toEqual({ error: '', label: '', modelValue: '' })
    expect(wrapper.find('input').attributes().id).toBe('1')
  })

  it('should render label by passing property to', () => {
    const wrapper = factory({ label: 'Title' })    
    const label = wrapper.find('label')
    const input = wrapper.find('input')

    expect(label.exists()).toBe(true)
    expect(label.html()).toContain('Title')
    expect(input.attributes().placeholder).toBe('Title')
    expect(input.attributes().id).toBe('2')
  })

  it('should emit empty string by default when fire', async () => {
    const wrapper = factory()
    const input = wrapper.find('input')
    
    await input.trigger('input')

    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual('')
    expect(input.attributes().id).toBe('3')
  })

  it('should emit string which is set manually and fire', async () => {
    const wrapper = factory()
    const input = wrapper.find('input')    
    input.element.value = 'My name'

    await input.trigger('input')
    
    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual('My name')
    expect(input.attributes().id).toBe('4')
  })

  it('should emit string which is set by property and fire', async () => {
    const wrapper = factory({ modelValue: 'Other name' })
    const input = wrapper.find('input')

    await input.trigger('input')

    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual('Other name')
    expect(input.attributes().id).toBe('5')
  })

  it('should set the attributes to the input element', () => {
    const wrapper = factory({},{ type: 'text' })

    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.find('input').attributes()).toEqual({
      type: 'text',
      placeholder: '', // without label prop
      class: 'field',
      id: '6' // uuid
    })    
  })

  it('this should set the attributes to the input element too', () => {
    const wrapper = factory({ disabled: '' }, { label: 'Name' })
    
    expect(wrapper.find('label').attributes()).toEqual({for:'7'})
    expect(wrapper.find('input').attributes()).toEqual({
      disabled: '',
      placeholder: 'Name', // with label prop
      class: 'field',
      id: '7' // uuid
    })
  })
})
```

