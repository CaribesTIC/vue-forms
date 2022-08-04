# Identificadores

:::info
[Código previo a la lección](https://github.com/CaribesTIC/vue-forms-app/tree/l10-start)
:::

En la lección anterior digimos que hay una manera de relacionar las entradas con las etiquetas usando ientificadores. Esta forma de relacionar elementos **HTML** será útil más adelante cuando veamos los mensajes de `error`. 

Pasemos directamente a nuestro componente `BaseInput` y descubramos cómo crear una relación entre nuestro `<label>` e `<input>` usando un **ID**.

Puede estar pensando que quizás la opción más obvia sería agregar una propiedad, para que el padre pueda determinar la identificación del elemento, y luego no tenemos que preocuparnos por eso dentro de nuestro componente. Y tendría razón... Pero, ¿y si hubiera una forma en que pudiéramos generar dinámicamente identificadores numéricos únicos para cada componente de nuestro formulario sin tener que recurrir a propiedades manuales?

Vamos a crear un componente Vue 3 que nos permita crear estos identificadores únicos dinámicos, o UUID para abreviar. Es un poco un salto del ritmo del curso, pero vamos a hablar un poco sobre la [Composition API](https://vuejs.org/api/composition-api-setup.html) y los [Composables](https://vuejs.org/guide/reusability/composables.html). En cualquier caso, no te preocupes demasiado, va a ser muy sencillo.

Sigamos adelante y creé un archivo UniqueID.js dentro de la carpeta `features`.

Vamos a ver.

📃`UniqueID.js`
```js
let UUID = 0

export default function UniqueID () {
  const getID = () => {
    UUID++
    return UUID
  }

  return {
    getID
  }
}
```

Primero declaramos una variable `let` con un valor predeterminado de `0`. Esto aumentará a medida que creamos más y más componentes: el primer componente tendrá una identificación de `1`, el segundo de `2`, y así sucesivamente.

Vamos a exportar una función `UniqueID`. Cuando se ejecuta, esta función devolverá un objeto que contiene una función bajo la propiedad `getID`. Esta función aumentará en `1` el contador `UUID` global y lo devolverá.

Sepa también que hay muchas bibliotecas de `UUID` que puede usar en lugar de esta solución personalizada, pero queríamos mostrarle lo fácil que puede ser.

Veamos esto en acción para entenderlo mejor, observando `BaseInput.vue`.

Primero, vamos a importar nuestro nuevo composable.






📃`BaseInput.vue`
```vue
<script>
import UniqueID from '../features/UniqueID'

export default {
  // omitted for brevity ...
}
</script>
```

Ahora que lo tenemos listo, podemos generar una nuevo **ID** único dentro del método de `setup` de nuestro componente. Sigamos adelante y hagamos eso.


📃`BaseInput.vue`
```vue
<script>
import UniqueID from '../features/UniqueID'

export default {
  props: {
    // omitted for brevity ...
  },
  setup () {
    const uuid = UniqueID().getID()

    return {
      uuid
    }
  }
}
</script>
```

Tenga en cuenta que estamos ejecutando el composable `UniqueID`  y luego el método `getID` dentro. Esto nos dará un número de identificación completamente único cada vez que se instancia un componente.

Finalmente, devolvemos un objeto con el `uuid` para que podamos usarlo en nuestra plantilla.

Hablando de eso, volvamos al `template`  y atemos el `label` y el `input`.

Para lograr esto, necesitamos darle al elemento `input` un valor de atributo `id`. Vincularemos el `id` a nuestro `uuid`. Una vez que tenemos el `setup` del `input` con su propio **ID** único, ahora podemos decirle al `label` que describe el `input` estableciendo el atributo `for` del `label`.

Nota: Todos estos son atributos de vainilla **HTML**, no hay magia loca de Vue aquí aparte de la facilidad de vincularlos a todos.

📃`BaseInput.vue`
```vue
<template>
  <label :for="uuid" v-if="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    @input="$emit('update:modelValue', $event.target.value)"
    class="field"
    :id="uuid"
  >
</template>
```

Vuelva al navegador. Lo primero que quiero señalarles es que la señal de advertencia en nuestro campo se ha ido. Y si revisamos debajo del `bit` donde dice `relations` dentro de las `accessible properties`, podemos ver ahora que muestra una nueva entrada: etiquetada por: "Título". Si pasa el cursor sobre este elemento, ahora puede ver en el navegador a qué elemento se refiere exactamente. Limpio, ¿verdad?


Todavía necesitamos agregar un `uuid` a nuestros componentes `Checkbox`, `Radio` y `Select`. ¿Estás listo para un desafío? Intenta hacer esto tú mismo. Será tan sencillo como replicar exactamente lo que acabamos de hacer aquí con `BaseInput`.

## Errores accesibles

¿Alguna vez llenó un formulario solo para presionar el botón de enviar y nada parecía funcionar? Claramente no se estaba enviando, y no había ningún error visible en ninguna parte, sin embargo, algo estaba claramente mal. Esta situación no es ajena a la mayoría de los usuarios de Internet, pero imagine la exasperación cuando necesita herramientas accesibles y el formulario no le dice fácilmente cuál es el problema con sus entradas.

Primero vayamos a nuestro componente `BaseInput.vue` y agreguemos una nueva propiedad, `error`, que nos permitirá establecer una cadena con un mensaje de error en caso de que el componente se encuentre en un estado de error.

📃`BaseInput.vue`
```js
props: {
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
},
```

Mostraremos este `error` debajo de nuestro campo `input` cada vez que haya un `error` presente, por lo que si la propiedad de `error` se establece en algo que no sea una cadena vacía.

📃`BaseInput.vue`
```vue
<template>
  <label :for="uuid" v-if="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    @input="$emit('update:modelValue', $event.target.value)"
    class="field"
    :id="uuid"
  >
  <p
    v-if="error"
    class="errorMessage"
  >
    {{ error }}
  </p>
</template>
```

También volveremos a `ComponentsForm.vue` y agregaremos un mensaje de `error` a nuestra entrada "Title", para que podamos ver cómo se comporta en el navegador. Tenga en cuenta que también agregamos una clase de mensaje `error` que simplemente lo coloreará de rojo.


📃`ComponentsForm.vue`
```html
<BaseInput
  v-model="event.title"
  label="Title"
  type="text"
  error="This input has an error!"
/>
```

Ahora echemos un vistazo al navegador, el `error` se muestra correctamente debajo del título una vez que se establece la propiedad `error`. Tenga en cuenta que el `input` "Description", que también es un `BaseInput`, no muestra ningún `error` porque la propiedad `error` no está configurado en nada.

If we open our Accessibility tab in Firefox once again and inspect the input element, we can see that there is nothing tying the error to the actual title input. This is where most forms fall short. Just because the error message is “near” the input doesn’t mean that a screen reader will be able to identify it as part of the error.

Si abrimos nuestra pestaña de **Accessibility** en Firefox una vez más e inspeccionamos el elemento `input`, podemos ver que no hay nada que vincule el `error` con el `input` del título real. Aquí es donde la mayoría de las formas se quedan cortas. El hecho de que el mensaje `error` esté "cerca" del `input` no significa que un lector de pantalla pueda identificarlo como parte del `error`.

Afortunadamente, hay una solución sencilla a este problema: el atributo [`aria-describedby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby). Este atributo nos permite declarar directamente en el elemento de entrada qué otros elementos lo describen.

El atributo puede tomar una lista de cadenas de **ID** para otros elementos **HTML** en la página, así que primero agregaremos una **ID** única a nuestra etiqueta. Por suerte, ya tenemos un número **UUID** asociado a la instancia del componente para hacerlo.

Volvamos a `BaseInput` y agreguemos el vínculo `id` a la etiqueta `p` de `error`.

📃`BaseInput.vue`
```html
<p
  v-if="error"
  class="errorMessage"
  :id="`${uuid}-error`"
>
  {{ error }}
</p>
```

Tenga en cuenta que estamos agregando la cadena `-error` al `UUID`. Necesitamos que este identificador sea único, y el `UUID` en sí mismo ya está en uso por el `input`.

Ahora que nuestro mensaje de error tiene un **ID** único, podemos establecerlo como una "description" para el elemento `input` con el atributo `aria-describedby`.

📃`BaseInput.vue`
```vue
<template>
  <label :for="uuid" v-if="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    @input="$emit('update:modelValue', $event.target.value)"
    class="field"
    :id="uuid"
    :aria-describedby="error ? `${uuid}-error` : null"
  >
  <p
    v-if="error"
    class="errorMessage"
    :id="`${uuid}-error`"
  >
    {{ error }}
  </p>
</template>
```

Tenga en cuenta que estamos agregando una verificación secundaria para ver si se establece un `error`. Esto nos permite un poco de higiene en la relación entre nuestros elementos: cuando no hay ningún `error` presente, no se mostrará ningún mensaje de `error` y la identificación no apuntará a nada.

Si volvemos a revisar nuestro navegador, podemos ver que cuando el `error` está presente, una nueva descripción por entrada está presente en el objeto de relación de la entrada.

Sin embargo, una cosa más... Debido a que estamos usando `v-if` para mostrar esta información de forma intermitente, queremos asegurarnos de que los lectores de pantalla la anuncien o la lean cada vez que se muestre. Para hacer esto, agregaremos un atributo `aria-live="asertive"`. Otra forma sería agregar un atributo `rol` de `"alert"`, pero descubrimos que [`aria-live`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live) tiende a funcionar mejor con un variedad de lectores de pantalla.

📃`BaseInput.vue`
```html
<p
  v-if="error"
  class="errorMessage"
  :id="`${uuid}-error`"
  aria-live="assertive"
>
  {{ error }}
</p>
```

## Estado de entrada explícito

Otra cosa que podemos agregar rápidamente a nuestra entrada para que sea aún más accesible es el atributo [`aria-invalid`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid). Un error que se comete en muchos formularios es tratar de confiar en un borde rojo alrededor de una entrada no válida. Por razones obvias, esto no es accesible.

Ya hemos tomado medidas en errores accesibles, pero asegurémonos de notificar también a los lectores de pantalla sobre el estado no válido de una entrada para proporcionar mejores comentarios a nuestros usuarios.

Vamos a agregar el atributo `aria-invalid` a nuestra entrada, y lo activaremos y desactivaremos dependiendo de si la propiedad `error` está establecida. Cuando la entrada es válida, `null` hará que la propiedad no se agregue al elemento de entrada.

📃`BaseInput.vue`
```html
<input
  v-bind="$attrs"
  :value="modelValue"
  :placeholder="label"
  @input="$emit('update:modelValue', $event.target.value)"
  class="field"
  :id="uuid"
  :aria-describedby="error ? `${uuid}-error` : null"
  :aria-invalid="error ? true : null"
>
```


Si volvemos al navegador e inspeccionamos la entrada usando la herramienta de **Accessibility** en **Firefox**, podemos ver que el estado `"invalid"` ahora se ha agregado a los estados activos del `input`.


Otros estados dignos de mención a los que también podríamos agregar atributos son de `readonly`, `disabled` y `required`. Estos tres se pueden establecer directamente con atributos **HTML5** del mismo nombre, o con sus contrapartes aria: [`aria-readonly`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-readonly), [`aria-disabled`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled) y [`aria-required`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-required).

## No deshabilites el botón de enviar

Si un formulario no es válido, tiene sentido establecer el atributo `disabled` en `true` en el botón `submit` para que el usuario no pueda enviar el formulario, ¿verdad? Incluso podemos diseñar el botón con un color diferente para transmitir que no se podrá hacer click en él.

Sin embargo, hay un gran problema con esto. Los usuarios que confían en los lectores de pantalla no recibirán ningún comentario, el lector de pantalla ignorará por completo el botón al navegar por el formulario. Esto claramente puede ser muy confuso y frustrante.

En su lugar, sugiero que realice todas y cada una de las comprobaciones para asegurarse de que su formulario sea válido antes de enviarlo en el método `sendForm` que creamos en `ComponentsForm`. Si todo sale bien, enviamos el formulario normalmente.

Si algo está mal, establesca los errores necesarios en su formulario con las herramientas que acabamos de aprender para notificar al usuario que algo está mal.

## Terminando

Como puede ver, con unas pocas líneas rápidas de **HTML** y algunos accesorios colocados estratégicamente, logramos convertir nuestro componente **BaseInput** en algo mucho más accesible.

Sin embargo, quiero enfatizar que, en lo que respecta al tema de la accesibilidad, esto solo comienza a arañar la superficie. ¡Pero con estos pocos consejos, deberíamos poder establecer el rumbo para una forma más inclusiva y accesible para nuestros proyectos!

:::info
[Código final de la lección](https://github.com/CaribesTIC/vue-forms-app/tree/l10-end)
:::
