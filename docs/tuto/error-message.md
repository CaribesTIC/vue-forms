# Componente ErrorMessage

>Ya hemos construidos los componentes de formularios de mayor complejidad.
Sin embargo, hay otros más simples pero no menos importantes como `AppErrorMessage` y `AppButton`.

## AppErrorMessage

Vamos a crear el archivo `AppErrorMessage.vue` en la carpeta `components` y copiaremos dentro de la sección `template` la parte del código del componente `AppInput.vue` que renderiza el mensaje de `error`.

```vue
<template>
  <p
    v-if="error"
    class="errorMessage"
    :id="`${uuid}-error`"
    aria-live="assertive"
  >
    {{ error }}
  </p>
</template>
```

Empezaremos borrando la condición `v-if` porque que no la necesitamos aquí. Esta condición es potestá exclusiva del elemento padre `AppInput`. Tambien remplazaremos la interpolación `error` por un [`<slot />`](https://vuejs.org/guide/components/slots.html).

```html
<p    
  class="errorMessage"
  :id="`${uuid}-error`"
  aria-live="assertive"
>
  <slot />
</p>
```

Avancemos estableciendo la propiedad `id` injectada como `required` desde el componente padre. Ahora, ya tenemos listo nuestro componente `AppErrorMessage.vue`

```vue{3,10}
<script setup lang="ts">
defineProps<{
  id: string | number  
}>()
</script>

<template>
  <p    
    class="errorMessage"
    :id="id"
    aria-live="assertive"
  >
    <slot />
  </p>
</template>
```

Finalmente solo nos falta remplazar, en el componente padre, el correspondiente código por el `<AppErrorMessage />`

📃`AppInput.vue`
```vue{20,21,22,23,24,25}
<script setup lang="ts">
  // omitted for brevity ...
</script>

<template>
  <label :for="uuid" v-if="label">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    @input="$emit(
      'update:modelValue',
      ($event.target as HTMLInputElement).value
    )"
    class="field"
    :id="uuid"
    :aria-describedby="error ? `${uuid}-error` : undefined"
    :aria-invalid="error ? true : undefined"
  >
  <AppErrorMessage
    v-if="error"
    :id="`${uuid}-error`"
  >
    {{ error }}
  </AppErrorMessage>
</template>
```

Solo nos falta declarar `AppErrorMessage.vue` como [complemento global](../tuto/app-checkbox.html#complemento-global) para que esto funcione.

## Componente Button

El `AppButton.vue` es más fácil aún, solo tenemos que crear el siguiente archivo. Tome en cuenta que cualquier atributo que reciba este componente será inyectado al elemento `<button>`.

📃`AppButton.vue`
```vue
<template>
  <button class="button">
    <slot/>
  </button>
</template>
```

Y listo, ya podemos volver a nuestro `TasksForm.vue` y reemplazar el elemento `<button>` con nuestro nuevo componente `AppButton`.

📃`TasksForm.vue`
```html
<AppButton
  class="btn btn-primary"
  type="submit"
>
  Submit
</AppButton>
```

Recuerde declarar `AppButton.vue` como [complemento global](../tuto/app-checkbox.html#complemento-global).

## Terminando

**!! En enhorabuena y parabién hemos llegado al final de este tutorial !!**

Nos despedimos, no sin antes invitarle a disfrutar del [**Bonus**](../bonus/testing-components.html) que hemos preparado especialmente para ti...
