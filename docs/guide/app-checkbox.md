# Componente Checkbox

Anteriormente, en este tutorial, creamos componentes reutilizables para dos entradas HTML importantes: `AppInput` y `AppSelect` para los elementos `input` y `select`, respectivamente.

En esta lección, asumimos el nuevo desafío de crear un componente reutilizable para nuestras entradas de `checkbox`. El objetivo sigue siendo el mismo, el componente debe ser altamente reutilizable y capaz de aceptar vinculaciones de `v-model`.

**¡Vamos a sumergirnos!**

## `AppCheckbox.vue`

Primero, crearemos un nuevo archivo, `AppCheckbox.vue` dentro de la carpeta de componentes.

Vamos a agregar un bloque `template` y copiar el `input` con `type="checkbox"` de nuestro archivo `TasksForm.vue` que contiene el control para el `"Reviewed"`.

📃`AppCheckbox.vue`
```vue
<template>
  <input
    type="checkbox"
    v-model="form.supervision.reviewed"
    class="field"
  />
  <label>Reviewed</label>
</template>
```

## Primero el `label`

Como hemos hecho en nuestros otros componentes, vamos a abordar primero el `label`. Necesitamos asegurarnos de que tenemos una forma de inyectar un `label` en este componente, por lo que vamos a agregar una propiedad `label` para que el padre pueda pasarla a nuestro componente.

Avancemos y agreguemos esa propiedad y vinculémosla al `label`.

📃`AppCheckbox.vue`
```vue{3,5,15}
<script setup lang="ts">
withDefaults(defineProps<{
  label?: string  
}>(), {
  label: ''  
})
</script>

<template>
  <input
    type="checkbox"
    v-model="form.supervision.reviewed"
    class="field"
  />
  <label v-if="label">{{ label }}</label>
</template>

```

Tenga en cuenta que hemos agregado una condición `v-if` para verificar que la propiedad `label` esté establecida antes de representar el elemento `<label>`. No hay una razón real para representar un elemento `<label>` vacío y, lo que es peor, ¡no queremos etiquetarlo como una cadena vacía!

Hay varias consideraciones de accesibilidad cuando se habla de etiquetas y entradas, y lo que hemos estado haciendo hasta ahora en su mayoría no será accesible. Sin embargo, en una lección posterior revisaremos estos componentes cuando echemos un vistazo a los conceptos básicos de accesibilidad en los formularios.

## Haciéndolo compatible con `v-model`

Ahora que nuestro `label` ha sido configurado, pasemos a hacerlo para que el componente pueda aceptar vínculos de `v-model`.

Las casillas de verificación tienen algunas peculiaridades que debemos tener en cuenta antes de comenzar a configurar nuestros vínculos. La primera es que las entradas de casillas de verificación vinculan su estado a una propiedad `checked`, y no directamente al `value`.

La propiedad `value` de casillas de verificación generalmente no se usa en el _frontend_, ya que su objetivo principal es proporcionar un `value` cuando se envía al _backend_ a través de un botón `submit`. Si se omite, este valor está activado de manera predeterminada, lo que está bien para la mayoría de las aplicaciones, ya que la mayoría de los formularios se manejarán a través de un _post_ asíncrono y las variables pasadas al _backend_ están controladas por el código del _frontend_.

La segunda cosa que debemos tener en cuenta es que las entradas tipo `checkbox` no activan eventos `input`, sino eventos `change` cada vez que se seleccionan y deseleccionan.

Ahora que estamos armados con este conocimiento, agreguemos nuestra propiedad `modelValue`, que contendrá la primera parte de nuestro vínculo bidireccional: permitir que el padre inyecte un estado para el `checkbox`.

📃`AppCheckbox.vue`
```ts{3,6}
withDefaults(defineProps<{
  label?: string
  modelValue?: boolean 
}>(), {
  label: '',
  modelValue: false
})
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

Finalmente, debemos emitir `update:modelValue` cada vez que queramos alertar al padre que la casilla de verificación se ha activado. Escucharemos el evento `@change` en el elemento `input` y emitiremos el nuevo estado comprobado de nuestro elemento cada vez que se active.

Tenga en cuenta que para las casillas de verificación no estamos emitiendo el `value` de `target` a través de `$event.target.value`, sino el estado de `checked` a través de `$event.target.checked`.

📃`AppCheckbox.vue`
```html
<input
  v-bind="$attrs"
  type="checkbox"
  :checked="modelValue"
  @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
  class="field"
/>
```

A su vez avanzamos y agregamos `v-bind="$attrs"` a nuestro elemento para poder permitir la inyección de atributos en el elemento correcto. Ahora recibirán correctamente el vínculo del padre.

## Usando nuestro nuevo componente

Ahora que nuestro componente está listo, podemos volver a `TasksForm.vue` y reemplazar las casillas de verificación `Reviewed` y `Approved` con nuestro nuevo componente `AppCheckbox`.

📃`TasksForm.vue`
```html
<h3>Supervision</h3>
<div>
  <AppCheckbox
    v-model="form.supervision.reviewed"
    label="Reviewed"
  />
</div>

<div>
  <AppCheckbox
    v-model="form.supervision.approved"
    label="Approved"
  />
</div>
```

Solo falta importarlo como complemento.

## Complemento Global

Vamos a importarlo globalmente, igual como se dijo en la [lección anterior](../guide/importing-components.html).

📃`main.ts`
```ts{5,12}
import { createApp } from 'vue'
import App from './App.vue'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'

import './index.css'

createApp(App)
  .component('AppInput', AppInput)
  .component('AppSelect', AppSelect)
  .component('AppCheckbox', AppCheckbox)
  .mount('#app')
```

Vayamos a nuestro navegador y activemos y desactivemos las casillas de verificación para asegurarnos de que los vínculos funcionen.

## Terminando

Las casillas de verificación tienen algunas peculiaridades que tuvimos que aprender para crear nuestro componente `AppCheckbox`.

En nuestra próxima lección, abordaremos nuestro componente, `AppRadio` para botones de `radio`, y veremos qué los hace especiales y, a veces, difíciles de manejar.

