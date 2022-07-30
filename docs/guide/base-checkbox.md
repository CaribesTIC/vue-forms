# Componente Checkbox

:::info
[Código previo a la lección](https://github.com/CaribesTIC/vue-forms-app/tree/l5-start)
:::

## `BaseCheckbox.vue`

Anteriormente, en este curso, creamos componentes reutilizables para dos entradas HTML importantes: `BaseInput` y `BaseSelect` para los elementos `input` y `select`, respectivamente.

En esta lección, asumimos el nuevo desafío de crear un componente base reutilizable para nuestros `inputs` de `checkbox`. El objetivo sigue siendo el mismo, el componente debe ser altamente reutilizable y capaz de aceptar vinculaciones de `v-model`.

**¡Vamos a sumergirnos!**

Primero, crearemos un nuevo archivo, `BaseCheckbox.vue` dentro de la carpeta de componentes.

Vamos a agregar un bloque de plantilla y copiar la entrada con la casilla de verificación de tipo en nuestro archivo `ComponentsForm.vue` que contiene el control para el `"Catering"`.

📃`BaseCheckbox.vue`
```vue
<template>
  <input
    type="checkbox"
    v-model="event.extras.catering"
    class="field"
  />
  <label>Catering</label>
</template>
```

## Primero el `label`

Como hemos hecho en nuestros otros componentes, vamos a abordar primero el `label`. Necesitamos asegurarnos de que tenemos una forma de inyectar un `label` en este componente, por lo que vamos a agregar una propiedad `label` para que el padre pueda pasarla a nuestro componente.

Avancemos y agreguemos esa propiedad y vinculémosla al `label`.

📃`BaseCheckbox.vue`
```vue{7,13,14,15,16}
<template>
  <input
    type="checkbox"
    v-model="event.extras.catering"
    class="field"
  />
  <label v-if="label">{{ label }}</label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
```

Tenga en cuenta que hemos agregado una condición `v-if` para verificar que la propiedad `label` esté establecida antes de representar el elemento `<label>`. No hay una razón real para representar un elemento `<label>` vacío y, lo que es peor, ¡no queremos etiquetarlo como una cadena vacía!

Hay varias consideraciones de accesibilidad cuando se habla de `labels` e `inputs`, y lo que hemos estado haciendo hasta ahora en su mayoría no será accesible. Sin embargo, en una lección posterior revisaremos estos componentes cuando echemos un vistazo a los conceptos básicos de accesibilidad en los formularios.

## Haciéndolo compatible con `v-model`

Ahora que nuestro `label` ha sido configurado, pasemos a hacerlo para que el componente pueda aceptar vínculos de `v-model`.

Las casillas de verificación tienen algunas peculiaridades que debemos tener en cuenta antes de comenzar a configurar nuestros vínculos. La primera es que las entradas de casillas de verificación vinculan su estado a una propiedad `checked`, y no directamente al `value`.

La propiedad `value` de casillas de verificación generalmente no se usa en el frontend, ya que su objetivo principal es proporcionar un `value` cuando se envía al backend a través de un botón `submit`. Si se omite, este valor está activado de manera predeterminada, lo que está bien para la mayoría de las aplicaciones, ya que la mayoría de los formularios se manejarán a través de una publicación asincrónica y las variables pasadas al backend están controladas por el código del frontend.

La segunda cosa que debemos tener en cuenta es que las entradas tipo `checkbox` no activan eventos `input`, pero cambian los eventos cada vez que se seleccionan y deseleccionan.

Ahora que estamos armados con este conocimiento, agreguemos nuestra propiedad `modelValue`, que contendrá la primera parte de nuestro vínculo bidireccional: permitir que el padre inyecte un estado para el `checkbox`.

📃`BaseCheckbox.vue`
```js{6,7,8,9}
props: {
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    default: false
  }
}
```

A continuación, vayamos al `template` y reemplacemos el vínculo del `v-model` que se copió y pegó desde el formulario de demostración anterior con nuestro nuevo vínculo `:checked` en nuestra propiedad `modelValue`.

```vue{4}
<template>
  <input
    type="checkbox"
    :checked="modelValue"
    class="field"
  />
  <label v-if="label">{{ label }}</label>
</template>
```

Finalmente, debemos emitir `update:modelValue` cada vez que queramos alertar al padre que la casilla de verificación se ha activado. Escucharemos el evento `@change` en el elemento de entrada y emitiremos el nuevo estado comprobado de nuestro elemento cada vez que se active.

📃`BaseCheckbox.vue`
```html
<input
  type="checkbox"
  :checked="modelValue"
  @change="$emit('update:modelValue', $event.target.checked)"
  class="field"
/>
```

Tenga en cuenta que para las casillas de verificación no estamos emitiendo el `value` del `target’s` a través de `$event.target.value`, sino el estado de `checked` a través de `$event.target.checked`.


## Usando nuestro nuevo componente

Ahora que nuestro componente está listo, podemos volver a `ComponentsForm.vue` y reemplazar las casillas de verificación `"Catering"` y `"Live music"` con nuestro nuevo componente `BaseCheckbox`.

📃`ComponentsForm.vue`
```html
<h3>Extras</h3>
<div>
  <BaseCheckbox
    v-model="event.extras.catering"
    label="Catering"
  />
</div>

<div>
  <BaseCheckbox
    v-model="event.extras.music"
    label="Live music"
  />
</div>
```
## Complemento Global
Solo falta importarlo globalmente, igual como se dijo en la [lección anterior](../guide/importing-components.html).

```js{6,10}
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'

createApp(App)
  .component('BaseInput', BaseInput)
  .component('BaseSelect', BaseSelect)  
  .component('BaseCheckbox', BaseCheckbox)
  .mount('#app')
```

Vayamos a nuestro navegador y activemos y desactivemos las casillas de verificación para asegurarnos de que los vínculos funcionen.

## Terminando

Las casillas de verificación tienen algunas peculiaridades que tuvimos que aprender para crear nuestro componente `BaseCheckbox`.

En nuestra próxima lección, abordaremos nuestro componente final, `BaseRadio` para botones de radio, y veremos qué los hace especiales y, a veces, difíciles de manejar.

:::info
[Código final de la lección](https://github.com/CaribesTIC/vue-forms-app/tree/l5-end)
:::



