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

One more thing though… Because we are using v-if to display this information on and off, we want to make sure that screen readers announce/read it whenever it becomes displayed. To do this, we’re going to add an attribute of aria-live="assertive. Another way would be to add a role attribute of “alert”, but I’ve found that the aria-live tends to work better with a variety of screen readers.

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

## Explicit input state

Another thing we can quickly add to our input to make it even more accessible is the aria-invalid attribute. A mistake that I’ve seen many forms make is to try and rely on a red border around an invalid input. For obvious reasons, this is not accessible.

We’ve already taken steps into accessible errors, but let’s make sure to also notify screen readers on the invalid state of an input to provide better feedback for our users.

We are going to add the aria-invalid attribute to our input, and toggle it off and on depending on whether the error prop is set. When the input is valid, null will make it so that the attribute is not added to the input element.

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

If we go back to the browser and inspect the input using the Accessibility tool on Firefox, we can see that the state of “invalid” has now been added to the active states of the input.


Other noteworthy states that we could also add attributes for are readonly, disabled and required. These three can be set directly with HTML5 attributes of the same name, or with their aria counterparts: aria-readonly, aria-disabled, and aria-required.
Don’t disable the submit button

If a form is not valid, then it makes sense to set the disabled attribute to true on the submit button so that the user can’t submit the form, right? We can even style the button with a different color to convey that it won’t be clickable.

There’s a big problem with this though. Users that rely on screen readers will not get any feedback at all, the button will be completely ignored by the screen reader when tabbing through the form. This clearly can be very confusing and frustrating.

I suggest instead that you make any and all checks to make sure your form is valid before submitting it on the sendForm method that we created on the SimpleForm component. If everything checks out, we submit the form normally.

If something is wrong, then set the necessary errors in your form with the tools that we just learned to notify the user that something is wrong.
Wrapping up

As you can see, with a few quick lines of HTML and some strategically placed props, we managed to turn around our BaseInput component into something a lot more accessible.

I do want to stress though, that as far as the topic of accessibility goes, this only begins to scratch the surface. But with these few tips, you should be able to set the course for a more inclusive and accessible form for your projects!



:::info
[Código final de la lección](https://github.com/CaribesTIC/vue-forms-app/tree/l10-end)
:::
