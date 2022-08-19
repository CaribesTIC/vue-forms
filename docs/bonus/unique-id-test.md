# Testeando UniqueID

## `useUniqueId.spec.ts`

```ts 
import { expect, test } from 'vitest'
import useUniqueId from '@/composables/useUniqueId'

test('useUniqueId should be a counter', () => {
  const arr:string[] = []
  arr[0] = useUniqueId().getID()
  arr[1] = useUniqueId().getID()
  arr[2] = useUniqueId().getID()

  expect(arr).toEqual([ '1', '2', '3' ])
})
```
