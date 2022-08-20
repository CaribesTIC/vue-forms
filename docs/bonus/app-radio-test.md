# Testeando Radio

## `appRadio.spec.ts`

```ts
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppRadio from '@/components/AppRadio.vue'

describe('AppRadio', () => {
  const factory = (props = {}, attrs = {} ) => {
    return mount(AppRadio, {
      props: {
        value: '0',
        ...props
      },
      attrs: { ...attrs } 
    })
  }
  
  it('should be initialized blank and no title', () => {
    const wrapper = factory()

    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)
    expect(wrapper.props()).toEqual(
      { label: '', modelValue: '', value: '0' }
    )
  })

  it('should render label by passing property to', () => {
    const wrapper = factory({ label: 'Title' })
    const label = wrapper.find('label')

    expect(label.exists()).toBe(true)
    expect(label.html()).toContain('Title')
    expect(wrapper.props().label).toEqual('Title')
  })

  it('should emit 0 value by default when fire', async () => {
    const wrapper = factory()
    //const radio = wrapper.find('input[type="radio"]')
    const radio = wrapper.find('input')

    await radio.trigger('change')

    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('0')
  })

  it('should be truthy when set checked', async () => {
    const wrapper = factory()
    const radio = wrapper.find('input')

    await radio.setChecked()

    expect(radio.element.checked).toBeTruthy()
  })

  it('should be truthy when value is equal to modelValue', async () => {
    const wrapper = factory({ modelValue: '0' }) 
    const radio = wrapper.find('input')

    expect(radio.element.checked).toBeTruthy()
  })

  it('should be falsy when value is not equal to modelValue', async () => {
    const wrapper = factory({ modelValue: '1' })
    const radio = wrapper.find('input')

    expect(radio.element.checked).toBeFalsy()
  })

  it('should be truthy when value is checked', async () => {
    const wrapper = factory({}, { checked: true })
    const radio = wrapper.find('input')

    expect(radio.element.checked).toBeTruthy()
  })

  it('should be falsy when value is unchecked', async () => {
    const wrapper = factory({}, { checked: false })
    const radio = wrapper.find('input')

    expect(radio.element.checked).toBeFalsy()
  })

  it('should set the attributes to the input-radio element', () => {
    const wrapper = factory({ label: 'label' }, { name: 'name' })    
    const label = wrapper.find('label')
    const radio = wrapper.find('input')

    expect(radio.attributes().name).toEqual('name')
    expect(label.attributes()).toEqual({})
  })
})
```
