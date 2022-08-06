# Testeando Input

:::info
Esta lección requiere tener conocimientos mínimos de pruebas automatizadas. Si aún no está familiarizado puede aprender de esto en nuestro tutorial de [Vue(TDD)](https://caribestic.github.io/vue-tdd/).
:::

## `baseInput.spec.js`

Empezaremos creando el archivo `test/components/baseInput.spec.js` donde construiremos las respectivas pruebas. En él haremos todas las pruebas relacionadas al componente `BaseInput`. Vamos a copiar en él este código para arrancar:

📃`baseInput.spec.js`
```js
import { mount } from '@vue/test-utils'
import BaseInput from '@/components/BaseInput.vue'

describe('BaseInput', () => {

})
```

## Nuestra primera prueba.

El objetivo de esta prueba es que aquí debe inicializar todas las propiedades en blanco y sin título por defecto. Note que no estamos pasando propiedades al componente.

📃`baseInput.spec.js`
```js
// omitted for brevity ...

describe('BaseInput', () => {
  it('should be initialized blank and no title', () => {
    const wrapper = mount(BaseInput)
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)      
    expect(wrapper.props()).toEqual({ label: '', modelValue: '' })        
  })
})
```

## Renderizar el elemento `label`

Seguimos con esta otra prueba. Aquí el componente `BaseInput` debe renderizar el elemento `label` pasándo este como propiedad.

📃`baseInput.spec.js`
```js
  // omitted for brevity ...

  it('should render label by passing property to', () => {
    const wrapper = mount(BaseInput, {
      props: { label: 'Title' }
    })

    expect(wrapper.find('label').exists()).toBe(true)
    expect(wrapper.find('label').html()).toContain('Title')    
    expect(wrapper.find('input').html()).toContain('Title')    
  })

  // omitted for brevity ...
```

## Emitir cadena vacía por defecto

Esta otra prueba debe emitir una cadena vacía por defecto cuando es disparado el evento `input` sin haber escrito algo en él.

📃`baseInput.spec.js`
```js
  // omitted for brevity ...

  it('should emit empty string by default when fire', async () => {
    const wrapper = mount(BaseInput)
    const input = wrapper.find('input')
    
    await input.trigger('input')

    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual('')
  })

  // omitted for brevity ...
```
## Cadena establecida manualmente

Continuamos probando que el componente `BaseInput` debe emitir una cadena que se establece manualmente y luego es disparada.

📃`baseInput.spec.js`
```js
  // omitted for brevity ...

  it('should emit string which is set manually and fire', async () => {
    const wrapper = mount(BaseInput)
    const input = wrapper.find('input')    
    
    input.element.value = 'My title'    
    await input.trigger('input')
    
    expect(
      wrapper.emitted()['update:modelValue'][0][0]
    ).toEqual('My title')
  })

  // omitted for brevity ...
```
## Establecida desde la propiedad

Al contrario, la siguiente prueba debe emitir una cadena establecida por la propiedad y entonces disparada.

📃`baseInput.spec.js`
```js
  // omitted for brevity ...

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

  // omitted for brevity ...
```

## Los atributos al `input`

Ahora vamos con los atributos. Esta prueba debe vincular los atributos al correspondiente elemento `input`.

📃`baseInput.spec.js`
```js
  // omitted for brevity ...

  it('should set the attributes to the input element', () => {
  
    const attrs = {
        id: 'hello',
        disabled: '',
        type: 'text',
        placeholder: '',
        class: 'field'
    }
    const wrapper = mount(BaseInput, { attrs })   

    const input = wrapper.find('input')    
    expect(input.attributes()).toEqual(attrs)    

  })

  // omitted for brevity ...
```

Esta otra prueba debe vincular también los atributos al elemento `input`.

Aunque se establezca la propiedad `label`, los atributos siempre deberán ser vinculados únicamente al elemento `input`.

📃`baseInput.spec.js`
```js
  // omitted for brevity ...

  it('this should set the attributes to the input element too', () => {     
    const wrapper = mount(BaseInput, {
      props: { label: 'Title' },
      attrs: {
        id: 'hello',
        disabled: '',
        type: 'text',
        // placeholder: '', by default      
        class: 'field'
      }
    })   

    const input = wrapper.find('input')
    expect(input.attributes()).toEqual({
        id: 'hello',
        disabled: '',
        type: 'text',
        placeholder: 'Title',
        class: 'field'
    })
    
    const label = wrapper.find('label')
    expect(label.attributes()).toEqual({})
  })

  // omitted for brevity ...
```

Tenga en cuenta que al establecer la propiedad `label` su valor será establecido en el atributo `placeholder` del elemento `input`.

## Todas las pruebas juntas

Finalmente, aquí están juntas todas las pruebas que acabamos de hacer. Puede copiarla y pegarla en su proyecto para probar su componente que hizo en la lección anterior.

📃`baseInput.spec.js`
```js
import { mount } from '@vue/test-utils'
import BaseInput from '@/components/BaseInput.vue'

describe('BaseInput', () => {
  it('should be initialized blank and no title', () => {
    const wrapper = mount(BaseInput)
    
    expect(wrapper.html()).not.toContain('Title')
    expect(wrapper.find('label').exists()).toBe(false)      
    expect(wrapper.props()).toEqual({ label: '', modelValue: '' })        
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

    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual('')
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
  
  it('should set the attributes to the input element', () => {
  
    const attrs = {
        id: 'hello',
        disabled: '',
        type: 'text',
        placeholder: '',
        class: 'field'
    }
    const wrapper = mount(BaseInput, { attrs })   

    const input = wrapper.find('input')    
    expect(input.attributes()).toEqual(attrs)    

  })

  it('this should set the attributes to the input element too', () => {     
    const wrapper = mount(BaseInput, {
      props: { label: 'Title' },
      attrs: {
        id: 'hello',
        disabled: '',
        type: 'text',
        // placeholder: '', by default      
        class: 'field'
      }
    })   

    const input = wrapper.find('input')
    expect(input.attributes()).toEqual({
        id: 'hello',
        disabled: '',
        type: 'text',
        placeholder: 'Title',
        class: 'field'
    })
    
    const label = wrapper.find('label')
    expect(label.attributes()).toEqual({})
  })
})
```
