# Testeando Button

## `appButton.spec.ts`

```ts
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '@/components/AppButton.vue'

describe('AppButton', () => {
  it('it should render submit button', () => {
    const wrapper = mount(AppButton, {
      attrs: { type: 'submit' },
      slots: { default: 'Submit' }
    })

    expect(wrapper.html()).toContain('Submit')
    expect(wrapper.attributes().type).toEqual('submit')
  })

  it('it should render action button ', () => {
    const wrapper = mount(AppButton, {
      attrs: {
        type: 'button',
        click: () => 'My return action'
      },
      slots: { default: 'Action button' }
    })

    expect(wrapper.html()).toContain('Action button')
    expect(wrapper.attributes().type).toEqual('button')
    expect(wrapper.wrapperElement.click()).toEqual('My return action')
  })
})
```
