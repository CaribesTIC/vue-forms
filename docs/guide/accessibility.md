# Accesibilidad

:::info
[Código previo a la lección](https://github.com/CaribesTIC/vue-forms-app/tree/l9-start)
:::

Al final de la última lección, discutimos la importancia de incorporar la accesibilidad en su primera ronda de desarrollo. 

>**No podemos enfatizar esto lo suficiente:** la accesibilidad no es una tarea secundaria a la que regresa después de que su aplicación está funcionando. Es una preocupación principal que debe abordarse como parte de su proceso de desarrollo.

En este curso, decidimos mantenerlo separado por razones educativas, introduciendo un concepto a la vez y construyendo sobre esos conceptos de manera incremental. Ahora tenemos la base conceptual establecida para agregar nuestras funciones de accesibilidad.

Repasaremos lo que consideramos algunos de los conceptos básicos de accesibilidad que debe tener en cuenta al desarrollar formularios. Estos conceptos no son técnicamente específicos de Vue, pero aprenderemos cómo aplicarlos en el contexto de nuestros componentes de formulario Vue.

**Vamos a sumergirnos.**

## Tipos apropiados

En **HTML** tenemos una amplia variedad de elementos de entrada para crear nuestros formularios, pero un elemento en particular los gobierna a todos. La entrada **_'atrapalotodo'_** nos permite la flexibilidad de crear entradas de texto, pero también podemos transformarla en casillas de verificación y botones de opción con la propiedad type.

- `<input type="text">`
- `<input type="checkbox">`
- `<input type="radio">`

Un error común es ignorar esta propiedad de tipo al crear entradas de texto. La mayoría de nosotros conocemos y usamos comúnmente dos regularmente: `type="email"` y `type="password"`.

Cuando usamos un tipo específico en un elemento de entrada, no solo obtenemos un mejor autocompletado para nuestro formulario, sino que también permite a los lectores de pantalla comprender mejor qué tipo de datos queremos recuperar del usuario. Un tipo `tel`, por ejemplo, proporcionará al usuario en un teléfono móvil un práctico teclado numérico con símbolos de teléfono como `+ * #`.

¡Tus usuarios con problemas de movilidad definitivamente te lo agradecerán!

En pocas palabras: no olvide establecer su `type`, incluso cuando el `input` no sea del tipo `password` o `email`.

Aquí hay una lista de los tipos disponibles para un elemento de entrada:

- [`button`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button)
- [`checkbox`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)
- [`color`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color)
- [`date`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date)
- [`datetime-local`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local)
- [`email`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email)
- [`file`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)
- [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/hidden)
- [`image`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image)
- [`month`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month)
- [`number`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number)
- [`password`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password)
- [`radio`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio)
- [`range`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)
- [`reset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/reset)
- [`search`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search)
- [`submit`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit)
- [`tel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel)
- [`text`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text)
- [`time`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time)
- [`url`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url)
- [`week`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week)

## Usar Conjunto de Campos y Leyenda

Dos elementos a menudo pasados por alto o poco enseñados en **HTML** son el `fieldset` y la `legend`.

En los formularios, generalmente agrupamos nuestroas entradas de forma lógica. Por ejemplo, normalmente codificaría su formulario para que primero le pida al usuario sus datos personales como Nombre, Apellido y Teléfono. Más adelante, otra sección puede pedirles una dirección de envío.

Para los usuarios accesibles, es posible que esta información no esté disponible inmediatamente sin tener que pasar por todo el formulario, aquí es donde entran en juego `<fieldset>` y `<legend>`.

Siempre debe intentar envolver secciones de su formulario dentro de un elemento `fieldset`. Esto agrupará lógicamente las entradas dentro de él. Luego, el primer elemento del conjunto de campos será un elemento `legend` que proporcionará un Título para ese conjunto de campos en particular.

Si por alguna razón no desea que la leyenda se muestre en su formulario (generalmente por razones de diseño), siempre puede colocarla de manera absoluta, fuera de la pantalla visible.

Para nuestro formulario actual en `ComponentsForm.vue`, podemos envolver nuestras secciones lógicas dentro de `fieldset` como en el siguiente ejemplo:

📃`ComponentsForm.vue`
```vue
<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="sendForm">
      <BaseSelect
        :options="categories"
        v-model="event.category"
        label="Select a category"
      />

      <fieldset>
        <legend>Name & describe your event</legend>

        <BaseInput
          v-model="event.title"
          label="Title"
          type="text"
        />

        <BaseInput
          v-model="event.description"
          label="Description"
          type="text"
        />
      </fieldset>

      <fieldset>
        <legend>Where is your event?</legend>

        <BaseInput
          v-model="event.location"
          label="Location"
          type="text"
        />
      </fieldset>

      <fieldset>
        <legend>Pets</legend>

        <p>Are pets allowed?</p>
        <div>
          <BaseRadioGroup
            v-model="event.pets"
            name="pets"
            :options="petOptions"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Extras</legend>
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
      </fieldset>

      <button type="submit">Submit</button>
    </form>

    <pre>{{ event }}</pre>
  </div>
</template>
```

Podemos agregar una etiqueta de estilo para eliminar los bordes y márgenes predeterminados, y diseñar las etiquetas de leyenda como teníamos antes con los encabezados.

📃`ComponentsForm.vue`
```vue
<style>
fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}

legend {
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
}
</style>
```

Cabe señalar que **FireFox** tiene una herramienta de inspección de `accessibility` muy buena. Revisando la pestaña de `accessibility`, puede ver como ahora la agrupación lógica de nuestro formulario será entendida por los lectores de pantalla.

## NO confíe en `placeholders`

Un patrón de diseño popular que surgió hace unos años usaba el atributo `placeholders` de las entradas para describir el tipo de contenido que esperaba el elemento. Lamentablemente, esto todavía se usa a veces en la actualidad en lugar de una etiqueta adecuada.

Los `placeholders` solo deben usarse para describir el valor previsto, pero no como reemplazo de una etiqueta descriptiva. Los `placeholders` desaparecen cada vez que un usuario comienza a escribir en el campo, lo que obliga al usuario a tener en cuenta lo que esperaba ese campo. Además, algunos usuarios pueden tener problemas para diferenciar entre un campo con un `placeholders` y un campo que tiene contenido rellenado o rellenado previamente.

En lo que respecta a los lectores de pantalla, cada lector de pantalla puede tratar el atributo `placeholders` de manera diferente, pero siempre que haya una `lebel` establecido correctamente, no debería ser una gran preocupación dejarla.

## Labels

Hablando de etiquetas, hablemos de una característica de accesibilidad realmente poderosa que, lamentablemente, se usa muy poco o mal en los formularios.

Si navegamos a **FireFox** nuevamente en la pestaña de `accessibility` e inspeccionamos nuestra entrada de Title, podemos ver un ícono ⚠️ justo al lado. Esto significa que tenemos un problema.

Echemos un vistazo al panel de información. La sección de Comprobaciones ya nos dice el problema: **_“Form elements should have a visible text label”_**.

Esto puede ser una sorpresa, ya que nuestro campo Title claramente tiene una etiqueta encima que describe lo que pretendemos para esta entrada.


Para nuestros usuarios videntes, sin embargo, esto no es evidente. Todavía no hemos vinculado estos dos elementos **HTML**, y esa es una suposición que un lector de pantalla no puede darse el lujo de hacer. ¡Afortunadamente, esta es una solución muy fácil!

Hay algunas formas de vincular un elemento `input` con su `label`, la primera es anidar el `input` dentro del elemento de `label`.

```html
<label>
  Title
  <input />
</label>
```

Esta es una de las formas más fáciles de asegurarse de que su `input` siempre esté correctamente vinculada a el `label` relacionado, pero queremos profundizar en la segunda y generalmente más _"común"_ forma de relacionar elementos **HTML** porque será útil más adelante cuando veamos los mensajes de `error`. Este método implica el uso de identificaciones.

:::info
[Código final de la lección](https://github.com/CaribesTIC/vue-forms-app/tree/l9-end)
:::