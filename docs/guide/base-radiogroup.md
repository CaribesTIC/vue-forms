# Componente RadioGroup

## `BaseRadioGroup.vue`

En nuestra última lección, creamos nuestro componente de formulario base final para este curso, `BaseRadio`.

Sin embargo, nos quedamos con un componente que es completamente flexible y reutilizable, pero a veces un poco difícil de comprender. Para alguien que no está familiarizado con el funcionamiento interno de `BaseRadio`, un grupo de todos ellos apuntando al mismo estado `v-model` puede ser confuso. También pueden ocurrir errores si uno olvida agregar un atributo `name` a cierta parte del grupo.

Sería mejor si tuviéramos un componente envoltorio que manejara toda la lógica de administrar las conexiones del `v-model` para nuestro usuario, de modo que solo tengan que recordar hacerlo una vez - como lo hacen en la mayoría de los demás, y sea más fácil de entender de un vistazo.

## ¡Entra en `BaseRadioGroup`!

Como mencionamos en la última lección, realmente no tiene sentido cuando los botones de opción están solos, ya que en realidad no brindan opciones al usuario, que es una característica clave de los botones de opción. Por lo tanto, casi siempre desea proporcionar al menos dos radios por cada grupo.

Habiendo dicho esto, dado que siempre queremos tener nuestros elementos `BaseRadio` agrupados, tiene sentido crear un componente que contenga la lógica para esta agrupación: `BaseRadioGroup`.

**¡Vamos a sumergirnos!**

## Creando nuestro `BaseRadioGroup`

Comencemos yendo a nuestra carpeta de componentes y creando un nuevo archivo, `BaseRadioGroup.vue`, que albergará nuestro nuevo componente. Esta vez no copiaremos y pegaremos el código del formulario de demostración, ya que tendremos que hacer un poco más de trabajo personalizado.

📃`BaseRadioGroup.vue`
```vue
<template>
  <div>

  </div>
</template>

<script>
export default {
  
}
</script>
```

Para comenzar, necesitamos crear una propiedad que permita al usuario de este componente pasar una matriz de opciones entre las que desea que el usuario pueda elegir. También queremos asegurarnos de que usemos los `data` dentro de esta nueva propiedad de opciones para recorrer completamente los objetos que los contienen y crear una nueva instancia del componente `BaseRadio` para cada uno.

La propiedad de opciones será una matriz de objetos, y querremos que cada uno de los objetos dentro contenga al menos dos propiedades: el `lavel` y el `value`.

Por ejemplo:

```js
const radioOptions = [
  { label: 'Gud boi', value: 'dog' },
  { label: 'Angri boi', value: 'cat' }
]
```

Luego usaremos el `lavel` como la etiqueta de cada uno de nuestros radios, y el `value` como el valor de cada radio.

📃`BaseRadioGroup.vue`
```vue
<template>
  <BaseRadio 
    v-for="option in options"
    :key="option.value"
    :label="option.label"
    :value="option.value"
  />
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  }
}
</script>
```

Tenga en cuenta que declaramos la propiedad `options` como `required`, ya que este componente simplemente no funcionará sin él.

Como aprendimos en la última lección, todos los grupos de radio están unidos como un grupo por la propiedad `name`.

Todas los radios de un grupo deben tener el mismo `name` para que el navegador sepa que deben agruparse.

Por lo tanto, sigamos adelante y agreguemos nuestra segunda propiedadaccesorio, la propiedad `name`, y asegurémonos de que esté vínculado correctamente en nuestros componentes `BaseRadio`.

📃`BaseRadioGroup.vue`
```vue{7,18,19,20,21}
<template>
  <BaseRadio 
    v-for="option in options"
    :key="option.value"
    :label="optio.label"
    :value="option.value"
    :name="name"
  />
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}
</script>
```

Una vez más, estamos declarando nuestra propiedad como `required`, ya que sin un atributo `name`, las entradas de radio no se agruparán correctamente.

Ahora que estamos recorriendo correctamente nuestros componentes radio, probablemente sepa lo que sigue después de construir varios de estos componentes básicos. Es hora de permitir que este componente maneje el vínculo bidireccional del `v-model`. Como siempre, agregaremos la propiedad `modelValue`.

📃`BaseRadioGroup.vue`
```vue{7,23,24,25,26}
<template>
  <BaseRadio 
    v-for="option in options"
    :key="option.value"
    :label="option.label"
    :value="option.value"
    :modelValue="modelValue"
    :name="name"
  />
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
```

Esta vez vamos a hacer tambíen la propiedad `required`, ya que los grupos de radio sin nada seleccionado no tienen mucho sentido; no hay realmente un estado de `"nothing selected"` cuando se usa este tipo de entrada de formulario.

¡No olvide vincular también la propiedad `modelValue` a cada elemento `BaseRadio` en el bucle!.

A continuación, comencemos a escuchar el evento `update:modelValue` de cada uno de los elementos `BaseRadio` y emitámoslo directamente al padre de `BaseRadioGroup`.

📃`BaseRadioGroup.vue`
```vue{9}
<template>
  <BaseRadio 
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

Ahora volvamos a nuestro `ComponentsForm.vue` y reemplacemos los elementos `BaseRadio` de la sección `"Are pets allowed?"` con un nuevo `BaseRadioGroup`.

📃`ComponentsForm.vue`
```html
<h3>Are pets allowed?</h3>
<div>
  <BaseRadioGroup
    v-model="event.pets"
    name="pets"
    :options="petOptions"
  />
</div>
```
También vamos a agregar una nueva matriz `petOptions` a nuestra `data` del componente. Estará vinculado a la propiedad de `options` en nuestro `BaseRadioGroup` para este conjunto de radios.

📃`ComponentsForm.vue`
```vue
<script>
export default {
  data () {
    return {
      categories: [
        // omitted for brevity ...
      ],
      event: [
        // omitted for brevity ...
      ],
      petOptions: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 }
      ]
    }
  }
}
</script> 
```
Ahora podemos ir al navegador y disfrutar de la gloria de nuestro grupo de radios de aspecto no muy agradable. Pero antes, recuerde importar el componente `BaseRadioGroup` globalmente como lo hicimos en [lecciones anteriores](../guide/base-checkbox.html#complemento-global).

🤔 parece que vamos a tener que hacer un poco de trabajo extra para que quede bien!

## Permitiendo diferentes diseños

Antes de que reemplazáramos nuestros componentes `BaseRadio` en `ComponentsForm.vue`, cada uno estaba envuelto en un `div`. Debido a la naturaleza de bloque de las etiquetas `div`, las separaba cada una en su propia línea.

Nuestro componente `BaseRadio` es independiente de la presentación, es solo un elemento `<input>` y un elemento `<label>` al final. Es nuestro trabajo como usuarios determinar cómo deben presentarse en la pantalla.

Para nuestro `BaseRadioGroup` me gustaría crear la posibilidad de alinear las radios tanto horizontal como verticalmente.

Para que su uso sea lo más sencillo posible, todos estos cambios estarán controlados por una sola propiedad nueva, `vertical`. Por defecto, el diseño de los radios en nuestro `BaseRadioGroup` será horizontal, por lo que esta propiedad será de tipo booleano y, por defecto, será `false`.

Es una práctica muy común cuando se crean componentes para establecer propiedades que están destinados a activarse y desactivarse (también conocidos como `"flags"`) a un valor predeterminado `false`. Eso nos permite poder establecerlos en `"on"` con una sintaxis muy limpia en la instancia del componente. Por ejemplo, con nuestra propiedad `vertical`, si el usuario desea que su grupo se distribuya verticalmente, simplemente agregaría la palabra clave a la instancia de la siguiente manera:

```html
<BaseRadioGroup
  v-model="event.pets"
  vertical
/>
```

Se supone que las propiedades booleanas en Vue que no están vinculadas específicamente son verdaderas. Entonces, en el ejemplo anterior, `vertical` es lo mismo que `:vertical="true"`.

Volvamos a `BaseRadioGroup.vue` y agreguemos nuestra propiedad `vertical` y comencemos a establecer esta nueva funcionalidad.

📃`BaseRadioGroup.vue`
```vue{16,17,18,19}
<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: [String, Number],
      required: true
    },
    vertical: {
      type: Boolean,
      default: false
    }
  }
}
</script>
```

Ahora, para usar nuestra propiedad `vertical`, tenemos que envolver nuestro bucle `RadioGroup` en un componente propio. Cuando los radios son verticales queremos que sea un `div`, y cuando son horizontales usaremos un `span`.

Por supuesto, hay muchas maneras de resolver este problema en particular, pero esta solución en particular me permite mostrarle cómo aprovechar el poder de `<component :is>` para sus componentes de formulario dinámico. Comenzaremos envolviendo todo en un elemento `<component>` y moviendo el bucle `v-for` sobre él.

📃`BaseRadioGroup.vue`
```vue
<template>
  <component
    v-for="option in options"
    :key="option.value"
    :is=""
  >
    <BaseRadio
      :label="option.label"
      :value="option.value"
      :modelValue="modelValue"
      :name="name"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </component>
</template>
```

(No olvidemos traer también la vinculación `:key` junto con el `v-for`).


Ahora tenemos que determinar la lógica de la propiedad `is` del componente `component`. Cualquiera que sea la cadena que pasemos allí, será lo que Vue use al renderizar el componente. Entonces, si establecemos la propiedad `is` en `div`, este componente envolvente será un elemento `<div>`, y si lo establecemos en `span`, será, por supuesto, un elemento `<span>`.

📃`BaseRadioGroup.vue`
```html
<component
  v-for="option in options"
  :key="option.value"
  :is="vertical ? 'div' : 'span'"
>
```

Dado que esta no es una lógica muy compleja, podemos salirnos con la nuestra dejándolo todo en el `template`. Aquí estamos comprobando si la propiedad `vertical` es `true`, luego establecemos un `div` si no un `span` como determinamos hace un momento.

Tenga en cuenta que tanto `'div'` como `'span'` están envueltas entre comillas simples, ya que deben ser cadenas.

Si establecemos la bandera `vertical` para nuestro `BaseRadioGroup` ahora en `ComponentsForm.vue` y lo verificamos en el navegador, todo parece funcionar como se esperaba.

Sin embargo, hay un ajuste más que debemos hacer para el diseño horizontal. Necesitamos agregar un poco de estilo para separar un poco los elementos.

Agreguemos una clase css `horizontal` y aplíquela cuando el elemento use un diseño `horizontal`. O en términos de código, cuando no es `vertical`.

📃`BaseRadioGroup.vue`
```vue{6,7,8,25,26,27}
<template>
  <component
    v-for="option in options"
    :key="option.value"
    :is="vertical ? 'div' : 'span'"
    :class="{
      horizontal: !vertical
    }"
  >
    <BaseRadio
      :label="option.label"
      :value="option.value"
      :modelValue="modelValue"
      :name="name"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </component>
</template>

<script>
// omitted for brevity ...
</script>

<style scoped>
.horizontal {
  margin-right: 20px;
}
</style>
```

Dentro de la etiqueta del componente, estamos configurando un nuevo vínculo de clase y usando la sintaxis del objeto para activar y desactivar las clases.

Siempre que la condición `!vertical` se evalúe como `true`, entonces, cuando `vertical` sea `false`, querremos aplicar nuestra clase CSS `horizontal`.

Eliminemos la bandera `vertical` de nuestro `BaseRadioGroup` de `ComponentsForm.vue` y luego verifiquemos el navegador una vez más.

¡Parece que todo está funcionando bien!

## Terminando

Con la finalización de nuestro componente `BaseRadioGroup`, finalizamos la creación de nuestros componentes de formulario base. ¡Buen trabajo en lograrlo hasta el final!

En la siguiente lección, daremos un pequeño giro y veremos cómo podemos manejar el envío de formularios correctamente en Vue aprovechando el poder de una biblioteca ampliamente utilizada para realizar solicitudes HTTP: **Axios**.

