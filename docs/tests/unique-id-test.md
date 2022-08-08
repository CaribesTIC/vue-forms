# Testeando UniqueID

## `UniqueID.spec.js`

```js 
import UniqueID from '@/composables/UniqueID'

test('UniqueID should be a counter', () => {
  const arr = []
  arr[0] = UniqueID().getID()
  arr[1] = UniqueID().getID()
  arr[2] = UniqueID().getID()

  expect(arr).toEqual([ 1, 2, 3 ])
})
```
