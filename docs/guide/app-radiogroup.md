# Componente RadioGroup

## `AppRadioGroup.vue`

En la anterior lección, creamos nuestro componente de formulario `AppRadio`.

Sin embargo, nos quedamos con un componente que es completamente flexible y reutilizable, pero a veces un poco difícil de comprender. Para alguien que no está familiarizado con el funcionamiento interno de `AppRadio`, un grupo de todos ellos apuntando al mismo estado `v-model` puede ser confuso. También pueden ocurrir errores si uno olvida agregar un atributo `name` a cierta parte del grupo.

Sería mejor si tuviéramos un componente envoltorio que manejara toda la lógica de administrar las conexiones del `v-model` para nuestro usuario, de modo que solo tengan que recordar hacerlo una vez - como lo hacen en la mayoría de los demás, y sea más fácil de entender de un vistazo.

## ¡Entra en `AppRadioGroup`!

Como mencionamos en la última lección, realmente no tiene sentido cuando los botones de opción están solos, ya que en realidad no brindan opciones al usuario, que es una característica clave de los botones de opción. Por lo tanto, casi siempre desea proporcionar al menos dos radios por cada grupo.

Habiendo dicho esto, dado que siempre queremos tener nuestros elementos `AppRadio` agrupados, tiene sentido crear un componente que contenga la lógica para esta agrupación: `AppRadioGroup`.

**¡Vamos a sumergirnos!**

## Creando nuestro `AppRadioGroup`

Comencemos yendo a nuestra carpeta de componentes y creando un nuevo archivo, `AppRadioGroup.vue`, que albergará nuestro nuevo componente. Esta vez no copiaremos y pegaremos el código del formulario de demostración, ya que tendremos que hacer un poco más de trabajo personalizado.

📃`AppRadioGroup.vue`
```vue
<script setup lang="ts">
</script>

<template>
</template>
```

## Arreglo `options`

Para comenzar, necesitamos crear una propiedad que permita al usuario de este componente pasar un arreglo de opciones entre las que desea que el usuario pueda elegir. También queremos asegurarnos de que usemos los datos dentro de esta nueva propiedad de opciones para recorrer completamente los objetos que los contienen y crear una nueva instancia del componente `AppRadio` para cada uno.

La propiedad de opciones será un arreglo de objetos, y querremos que cada uno de los objetos dentro contenga al menos dos propiedades: el `lavel` y el `value`. 

Por ejemplo:

```ts
const radioOptions = [
  { label: 'Unstarted', value: '0' },
  { label: 'Started', value: '1' },
  { label: 'Completed', value: '2' }
]
```

Luego usaremos el `label` como la etiqueta de cada uno de nuestros radios, y el `value` como el valor de cada radio.

📃`AppRadioGroup.vue`
```vue{3,9,11,12}
<script setup lang="ts">
defineProps<{
 options: { label: string; value: number; }[]  
}>()  
</script>

<template>
  <AppRadio 
    v-for="option in options"
    :key="option.value"
    :label="option.label"
    :value="option.value"
  />
</template>

```

Tenga en cuenta que declaramos la propiedad `options` como `required`, ya que este componente simplemente no funcionará sin él.

## Propiedad `name`

Como aprendimos en la última lección, todos los grupos de radio están unidos como un grupo por la propiedad `name`. Todos los radios de un grupo deben tener el mismo `name` para que el navegador sepa que deben agruparse.

Por lo tanto, sigamos adelante y agreguemos nuestra segunda propiedad, la propiedad `name`, y asegurémonos de que esté vínculado correctamente en nuestros componentes `AppRadio`.

📃`AppRadioGroup.vue`
```vue{4,14}
<script setup lang="ts">
defineProps<{
  options: { label: string; value: number; }[]
  name: string
}>()
</script>

<template>
  <AppRadio 
    v-for="option in options"
    :key="option.value"
    :label="option.label"
    :value="option.value"
    :name="name"
  />
</template>
```

Una vez más, estamos declarando nuestra propiedad como `required`, ya que sin un atributo `name`, las entradas de radio no se agruparán correctamente.

Ahora que estamos recorriendo correctamente nuestros componentes radio, probablemente sepa lo que sigue después de construir varios de estos componentes básicos. Es hora de permitir que este componente maneje el vínculo bidireccional del `v-model`.


## Propiedad `modelValue`

Como siempre, agregaremos la propiedad `modelValue`.

📃`AppRadioGroup.vue`
```vue{5,15}
<script setup lang="ts">
defineProps<{
  options: { label: string; value: number; }[]
  name: string
  modelValue: string | number
}>()
</script>

<template>
  <AppRadio 
    v-for="option in options"
    :key="option.value"
    :label="option.label"
    :value="option.value"
    :modelValue="modelValue"
    :name="name"
  />
</template>
```

Esta vez vamos a hacer tambíen la propiedad `required`, ya que los grupos de radio sin nada seleccionado no tienen mucho sentido; no hay realmente un estado de `"nothing selected"` cuando se usa este tipo de entrada de formulario.

¡No olvide vincular también la propiedad `modelValue` a cada elemento `AppRadio` en el bucle!.

## Evento `update:modelValue`

A continuación, comencemos a escuchar el evento `update:modelValue` de cada uno de los elementos `AppRadio` y emitámoslo directamente al padre de `AppRadioGroup`.

📃`AppRadioGroup.vue`
```vue{9}
<template>
  <AppRadio 
    v-for="option in options"
    :key="option.value"
    :label="option.label"
    :value="option.value"
    :modelValue="modelValue"
    :name="name"
    @update:modelValue="$emit('update:modelValue', $event)"
  />
</template>
```

## Formulario `TasksForm.vue`

Ahora volvamos a nuestro `TasksForm.vue` y reemplacemos los elementos `AppRadio` de la sección **_'Task situation'_** con un nuevo `AppRadioGroup`.

📃`TasksForm.vue`
```html
<h3>Task situation</h3>
<div>
  <AppRadioGroup
    v-model="form.situation"
    name="situation"
    :options="situationOptions"
  />
</div>
```
También vamos a agregar una nuevo arreglo `situationOptions` **no reactivo** a nuestro componente. Estará vinculado a la propiedad de `options` en nuestro `AppRadioGroup` para este conjunto de radios.

📃`TaskForm.vue`
```vue{10,11,12,13,14}
<script setup lang="ts">
import { reactive } from "vue"

const props = defineProps<{
  // omitted for brevity ...
}>()

const form = reactive(props.task)

const situationOptions = [
  { label: 'Unstarted', value: 0 },
  { label: 'Started', value: 1 },
  { label: 'Completed', value: 2 }
]
</script>
```
Ahora podemos ir al navegador y disfrutar de la gloria de nuestro grupo de radios de aspecto no muy agradable. Pero antes, recuerde importar el componente `AppRadioGroup` globalmente como lo hicimos en [lecciones anteriores](../guide/app-checkbox.html#complemento-global).

![app-radio-group](./img/app-radio-group1.jpg)

🤔 parece que vamos a tener que hacer un poco de trabajo extra para que quede bien!

## Permitiendo diferentes diseños

Antes de que reemplazáramos nuestros componentes `AppRadio` en `TasksForm.vue`, cada uno estaba envuelto en un `div`. Debido a la naturaleza de bloque de las etiquetas `div`, las separaba cada una en su propia línea.

Nuestro componente `AppRadio` es independiente de la presentación, es solo un elemento `<input>` y un elemento `<label>` al final. Es nuestro trabajo como usuarios determinar cómo deben presentarse en la pantalla.

Para nuestro `AppRadioGroup` nos gustaría crear la posibilidad de alinear las radios tanto horizontal como verticalmente.

Para que su uso sea lo más sencillo posible, todos estos cambios estarán controlados por una sola propiedad nueva, `vertical`. Por defecto, el diseño de los radios en nuestro `AppRadioGroup` será horizontal, por lo que esta propiedad será de tipo `boolean` y, por defecto, será `false`.

>Es una práctica muy común cuando se crean componentes para establecer propiedades que están destinados a activarse y desactivarse - también conocidos como **_'flags'_** - a un valor predeterminado en `false`. Eso nos permite poder establecerlos en `"on"` con una sintaxis muy limpia en la instancia del componente.

Por ejemplo, con nuestra propiedad `vertical`, si el usuario desea que su grupo se distribuya verticalmente, simplemente agregaría la palabra clave a la instancia de la siguiente manera:

```html{3}
<AppRadioGroup
  v-model="form.situation"
  vertical
/>
```

Se supone que las propiedades booleanas en Vue que no están vinculadas específicamente son verdaderas. Entonces, en el ejemplo anterior, `vertical` es lo mismo que `:vertical="true"`.

Volvamos a `AppRadioGroup.vue` y agreguemos nuestra propiedad `vertical` y comencemos a establecer esta nueva funcionalidad.

📃`AppRadioGroup.vue`
```vue{6,8}
<script setup lang="ts">
withDefaults(defineProps<{
  options: { label: string; value: number; }[]
  name: string
  modelValue: string | number
  vertical?: boolean
}>(), {
  vertical: false  
})
</script>
```

Ahora, para usar nuestra propiedad `vertical`, tenemos que envolver nuestro bucle `AppRadioGroup` en un componente propio. Cuando los radios son verticales queremos que sea un `div`, y cuando son horizontales usaremos un `span`.

Por supuesto, hay muchas maneras de resolver este problema peculiar, pero esta solución en particular nos permite mostrarle cómo aprovechar el poder de `<component :is>` para sus [componentes dinámicos](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components) de formulario.

Comenzaremos envolviendo todo en un elemento `<component>` y moviendo el bucle `v-for` sobre él.

📃`AppRadioGroup.vue`
```vue{3,4}
<template>
  <component
    v-for="option in options"
    :key="option.value"
    :is=""
  >
    <AppRadio
      :label="option.label"
      :value="option.value"
      :modelValue="modelValue"
      :name="name"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </component> 
</template>
```

**No olvidemos traer también la vinculación `:key` junto con el `v-for`.**


Ahora tenemos que determinar la lógica de la propiedad `is` del `component`. Cualquiera que sea la cadena que pasemos allí, será lo que Vue use al renderizar el componente. Entonces, si establecemos la propiedad `is` en `'div'`, este componente envolvente será un elemento `<div>`, y si lo establecemos en `'span'`, será, por supuesto, un elemento `<span>`.

📃`AppRadioGroup.vue`
```html
<component
  v-for="option in options"
  :key="option.value"
  :is="vertical ? 'div' : 'span'"
>
```

Dado que esta no es una lógica muy compleja, podemos salirnos con la nuestra dejándolo todo en el `template`. Aquí estamos comprobando si la propiedad `vertical` es `true`, luego establecemos un `div` sino un `span` como determinamos hace un momento.

>Tenga en cuenta que tanto `'div'` como `'span'` están envueltas entre comillas simples, ya que deben ser cadenas.

Si establecemos la bandera `vertical` para nuestro `AppRadioGroup` ahora en `TaskForm.vue` y lo verificamos en el navegador, todo parece funcionar como se esperaba.

Sin embargo, hay un ajuste más que debemos hacer para el diseño horizontal. Necesitamos agregar un poco de estilo para separar un poco los elementos.

Agreguemos una clase CSS `horizontal` para aplicarla cuando el elemento use un diseño `horizontal`. O en términos de código, cuando no es `vertical`.

📃`AppRadioGroup.vue`
```vue{10,11,12,25,26,27}
<script setup lang="ts">
// omitted for brevity ...
</script>

<template>
  <component
    v-for="option in options"
    :key="option.value"
    :is="vertical ? 'div' : 'span'"
    :class="{
      horizontal: !vertical
    }"
  >
    <AppRadio
      :label="option.label"
      :value="option.value"
      :modelValue="modelValue"
      :name="name"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </component> 
</template>

<style scoped>
.horizontal {
  @apply mr-5;
}
</style>
```

Dentro de la etiqueta `component`, estamos configurando un nuevo vínculo `class` y usando la sintaxis de objeto para activarlo y desactivarlo.

Siempre que la condición `!vertical` se evalúe como `true`, entonces, cuando `vertical` sea `false`, querremos aplicar nuestra clase CSS `horizontal`.

Eliminemos la bandera `vertical` de nuestro `AppRadioGroup` de `TasksForm.vue` y luego verifiquemos el navegador una vez más.

![app-radio-group](./img/app-radio-group2.jpg)

¡Parece que todo está funcionando bien!

## Terminando

Realizado al componente `AppRadioGroup`, estamos más que preparados para construir el componente `AppTextarea`. Veremos que solo se trata de un poco más de lo que ya hemos visto hasta aquí. 
