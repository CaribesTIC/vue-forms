# Componente Radio

## `AppRadio.vue`

Ha llegado el momento de abordar el componente `AppRadio`.

Los botones `radio` en HTML tienen una característica única que debemos tener en cuenta antes de comenzar a construir nuestro componente — no funcionan como un solo `input`, como lo haría un `checkbox`. Viven y funcionan como parte de un grupo de botones de radio que tienen un solo estado.

Según el estado del grupo, un botón `radio` puede estar activo o inactivo en relación con los de su propio grupo.

Debido a esta peculiaridad particular en el funcionamiento de los botones `radio`, el componente `AppRadio` también tendrá otro componente para agruparlos, el `AppRadioGroup`.

## Primero, el `AppRadio`

Comenzaremos la lección creando nuestro componente `AppRadio`. El objetivo es tener un componente reutilizable flexible que envuelva una sola instancia de un `<input type='radio'>`, junto con su `<label>`.

Como antes, primero crearemos nuestro archivo de componentes, `AppRadio.vue`, dentro de la carpeta `components`. Luego copie el primer par de `input-label` para una de nuestros `radios` de `ComponentsForm.vue` y péguelo en el bloque `<template>` del componente.


📃`AppRadio.vue`
```vue
<template>
  <input
    type="radio"
    v-model="form.situation"
    :value="0"
    name="situation"
  />
  <label>Unstarted</label>
</template>
```

A continuación, vamos a abordar primero el `label`. Entonces, sigamos adelante y creemos nuestra propiedad `label`, y vincúlelo a el elemento `<label>` como lo hemos hecho en lecciones anteriores.

📃`AppRadio.vue`
```vue{3,5,16}
<script setup lang="ts">
withDefaults(defineProps<{
  label?: string  
}>(), {
  label: ''  
})
</script>

<template>
  <input
    type="radio"
    v-model="form.situation"
    :value="0"
    name="situation"
  />
  <label v-if="label">{{ label }}</label>
</template>
```

Ahora que el `label` es dinámico y está vinculado, avancemos y asegurémonos de que nuestro componente pueda responder a los vínculos de `v-model`.

Comenzaremos creando nuestra propiedad `modelValue`.

📃`AppRadio.vue`

```vue{4,7}
<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  modelValue?: string | number
}>(), {
  label: '',
  modelValue: ''
})
</script>
```

Tenga en cuenta que para `AppRadio` hemos establecido el tipo de `props.modelValue` para que sea `string | number`. Esto le dirá a Vue que esta propiedad puede aceptar valores de cadena o números.

Cuando se trata de botones de `radio`, cada botón tiene el valor que representa en el conjunto. Por ejemplo, si tuviera un grupo de botones de `radio` para seleccionar la situación de la tarea, un botón de `radio` representaría **_'Unstarted'_**, otro representaría **_'Started'_** y otro representaría **_'Completed'_**.

Es común que estos botones también representen valores numéricos. Por ejemplo, al seleccionar un número de huéspedes para una habitación de hotel, o incluso valores booleanos en su formato numérico.

Avancemos ahora y vinculemos nuestra propiedad `modelValue` a nuestro elemento `<input type='radio'>`. De manera similar a los `type='checkbox'`, los botones de radio no se vinculan a la propiedad `value`, sino que usan la propiedad `checkbox` en su lugar. Sin embargo, en el caso particular de los botones de radio, debemos verificar si este botón es el que está seleccionado actualmente o no.

Volvamos a nuestro ejemplo. El valor del modelo de nuestros elementos `AppRadio` contendrá la preferencia del usuario, ya sea _'Unstarted'_, _'Started'_ o _'Completed'_, pero debemos poder decirle a este `<input type='radio'>` cuál de estos valores representa.

Para hacer esto, vamos a agregar una nueva propiedad al componente, el `value`.

📃`AppRadio.vue`
```vue{5}
<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  modelValue?: string | number
  value: string | number
}>(), {
  label: '',
  modelValue: ''
})
</script>
```

Tenga en cuenta que no hemos establecido un valor predeterminado en el caso de la propiedad `value`, sino que elegimos establecer la propiedad como `required`. Si esta propiedad no está establecida, Vue nos enviará una advertencia.

Un botón `radio` simplemente no tiene sentido cuando no tiene un valor adjunto, y un valor predeterminado podría ser potencialmente problemático si el usuario se olvida de establecerlo y varios radios terminan teniendo el mismo valor.

Para saber si nuestro `radio` está :`checked`, buscaremos si el `modelValue` es igual al `value`. Eso significa que **_'Started'_**, por ejemplo, será igual al valor de este `radio` — `checked` o no `checked`.

Avancemos y eliminemos el antiguo vínculo de `v-model` y el atributo _hard-codedado_, y reemplácelo con nuestro vínculo `checked`. También nos aseguraremos de actualizar el vínculo `value` a nuestro nueva propiedad.

📃`AppRadio.vue`
```vue{15,16}
<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  modelValue?: string | number
  value: string | number
}>(), {
  label: '',
  modelValue: ''
})
</script>

<template>
  <input
    type="radio"
    :checked="modelValue === value"
    :value="value"  
    name="situation"
  />
  <label v-if="label">{{ label }}</label>
</template>
```

¡Casi ahí! Ahora necesitamos agregar la segunda parte de nuestro contrato `v-model`, la emisión de eventos `update`. Los botones `radio` desencadenan eventos `change` cuando se convierten en la opción seleccionada, así que configuremos un detector de eventos `change` con nuestra emisión `update:modelValue`.


📃`AppRadio.vue`
```vue{6}
<template>
  <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
      @change="$emit('update:modelValue', value)"
    />
  <label v-if="label">{{ label }}</label>
</template>
```

Asegúrese de prestar mucha atención a la carga útil de nuestro `$emit`. Vamos a emitir la propiedad `value`. Queremos que nuestro receptor `v-model` en el padre mantenga el valor del botón de opción actualmente seleccionado, y debido a que el evento `change` se activará solo cuando el elemento haga la elección seleccionada, podemos activar el valor de forma segura para actualizar al padre sobre la recién seleccionado opción.

Finalmente, debido a que eliminamos el atributo `name` _hard-codedado_, debemos asegurarnos de que el desarrollador que usa este componente pueda establecer atributos como `name` en nuestro `<input>`. Así que usaremos `v-bind="$attrs"` en nuestro `<input>` como aprendimos cuando construimos nuestro componente `AppInput`, para poder permitir la inyección de este atributo en el elemento correcto.

📃`AppRadio.vue`
```vue{17}
<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  modelValue?: string | number
  value: string | number
}>(), {
  label: '',
  modelValue: ''
})
</script>

<template>
  <input
    type="radio"
    :checked="modelValue === value"
    :value="value"
    v-bind="$attrs"
    @change="$emit('update:modelValue', value)"    
  />
  <label v-if="label">{{ label }}</label>
</template>
```
## Actualizando formulario de demostración

Ahora que nuestro componente está listo, podemos volver a nuestro `TasksForm.vue` y reemplazar los tres `<input type='radio'>` con nuestro nuevo y brillante componente `AppRadio`.

📃`TasksForm.vue`
```html
<h3>Task situation</h3>
<div>
  <AppRadio
    v-model="form.situation"
    :value="0"
    label="Unstarted"
    name="situation"
  />
</div>

<div>
  <AppRadio
    v-model="form.situation"
    :value="1"
    label="Started"
    name="situation"
  />
</div>

<div>
  <AppRadio
    v-model="form.situation"
    :value="2"
    label="Completed"
    name="situation"
  />
</div>
```

Solo nos falta declarar `AppRadio.vue` como [complemento global](../guide/app-checkbox.html#complemento-global) para que esto funcione.



## Terminando

Como hemos visto, los botones `radio` tienen algunas peculiaridades que pueden volverlos confusos y difíciles de manejar, pero hemos hecho un gran progreso en la creación de un componente `AppRadio` sólido. En nuestra próxima lección, daremos un paso más y crearemos el componente `AppRadioGroup`, que nos permitirá simplificar aún más la configuración y creación de grupos de botones de opción.

