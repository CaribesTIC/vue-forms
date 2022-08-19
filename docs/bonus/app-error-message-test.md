# Testeando ErrorMessage

## `appErrorMessage.spec.ts`

```ts
import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import AppErrorMessage from '@/components/AppErrorMessage.vue'

test('AppErrorMessage: it should render error message', () => {        
  const wrapper = mount(AppErrorMessage, {
    props: { id: '1-error' },      
    slots: { default: 'Error message' }
  })
    
  expect(wrapper.html()).toContain('Error message')
  expect(wrapper.props().id).toEqual('1-error')
})
```
