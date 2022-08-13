# Componente Radio

## `BaseRadio.vue`

Ha llegado el momento de abordar el componente `BaseRadio`.

Los botones `radio` en HTML tienen una característica única que debemos tener en cuenta antes de comenzar a construir nuestro componente — no funcionan como un solo `input`, como lo haría un `checkbox`. Viven y funcionan como parte de un grupo de botones de radio que tienen un solo estado.

Según el estado del grupo, un botón `radio` puede estar activo o inactivo en relación con los de su propio grupo.

Debido a esta peculiaridad particular en el funcionamiento de los botones `radio`, el componente `BaseRadio` también tendrá otro componente para agruparlos, el `BaseRadioGroup`.

## Primero, el `BaseRadio`

Comenzaremos la lección creando nuestro componente `BaseRadio`. El objetivo es tener un componente reutilizable flexible que envuelva una sola instancia de un `<input type='radio'>`, junto con su `<label>`.

Como antes, primero crearemos nuestro archivo de componentes, `BaseRadio.vue`, dentro de la carpeta `components`. Luego copie el par de `input-label` para una de nuestros `radios` de `ComponentsForm.vue` y péguelo en el bloque `<template>` del componente.


📃`BaseRadio.vue`
```vue
<template>
  <input
      type="radio"
      v-model="event.pets"
      :value="1"
      name="pets"
    />
  <label>Yes</label>
</template>
```

A continuación, vamos a abordar primero el `label`. Entonces, sigamos adelante y creemos nuestra propiedad `label`, y vincúlelo a el elemento `<label>` como lo hemos hecho en lecciones anteriores.

📃`BaseRadio.vue`
```vue{8,14,15,16}
<template>
  <input
      type="radio"
      v-model="event.pets"
      :value="1"
      name="pets"
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

Ahora que el `label` es dinámico y está vinculado, avancemos y asegurémonos de que nuestro componente pueda responder a los vínculos de `v-model`.

Comenzaremos creando nuestra propiedad `modelValue`.

📃`BaseRadio.vue`

```vue{8,9,10,11}
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>
```

Tenga en cuenta que para `BaseRadio` hemos establecido la `props.modelValue.type` para que sea `[String, Number]`. Esto le dirá a Vue que esta propiedad puede aceptar valores de cadena o números.

Cuando se trata de botones de `radio`, cada botón tiene el valor que representa en el conjunto. Por ejemplo, si tuviera un grupo de botones de `radio` para seleccionar su mascota favorita, un botón de `radio` representaría un `dog` y otro representaría un `cat`.

Es común que estos botones también representen valores numéricos. Por ejemplo, al seleccionar un número de huéspedes para una habitación de hotel, o incluso valores booleanos en su formato numérico.

Avancemos ahora y vinculemos nuestra propiedad `modelValue` a nuestro elemento `<input type='radio'>`. De manera similar a los `type='checkbox'`, los botones de radio no se vinculan a la propiedad `value`, sino que usan la propiedad `checkbox` en su lugar. Sin embargo, en el caso particular de los botones de radio, debemos verificar si este botón es el que está seleccionado actualmente o no.

Volvamos a nuestro ejemplo favorito de mascotas. El valor del modelo de nuestros elementos `BaseRadio` contendrá la preferencia del usuario, ya sea `cat` o `dog`, pero debemos poder decirle a este `<input type='radio'>` cuál de estos valores representa.

Para hacer esto, vamos a agregar una nueva propiedad al componente, el `value`.

📃`BaseRadio.vue`
```vue{12,13,14,15}
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
```

Tenga en cuenta que no hemos establecido un valor predeterminado en el caso de la propiedad `value`, sino que elegimos establecer la propiedad en `required`. Si esta propiedad no está establecida, Vue nos enviará una advertencia.

Un botón `radio` simplemente no tiene sentido cuando no tiene un valor adjunto, y un valor predeterminado podría ser potencialmente problemático si el usuario se olvida de establecerlo y varios radios terminan teniendo el mismo valor.

Para saber si nuestro `radio` está :`checked`, buscaremos si el `modelValue` es igual al `value`. Eso significa que la preferencia del usuario, "`dog`", por ejemplo, será igual al valor de esta `radio` o no — `checked` o no `checked`.

Avancemos y eliminemos el antiguo vínculo de `v-model` y la atributo _hard-codedado_, y reemplácelo con nuestro vínculo `checked`. También nos aseguraremos de actualizar el vínculo `value` a nuestro nueva propiedad.

📃BaseRadio.vue
```vue{4,5}
<template>
  <input
      type="radio"
      :checked="modelValue === value"
      :value="value"
    />
  <label v-if="label">{{ label }}</label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
```

¡Casi ahí! Ahora necesitamos agregar la segunda parte de nuestro contrato `v-model`, la emisión de eventos `update`. Los botones `radio` desencadenan eventos `change` cuando se convierten en la opción seleccionada, así que configuremos un detector de eventos `change` con nuestra emisión `update:modelValue`.


📃`BaseRadio.vue`
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

Finalmente, debido a que eliminamos el atributo `name` _hard-codedado_, debemos asegurarnos de que el desarrollador que usa este componente pueda establecer atributos como `name` en nuestro `<input>`. Así que usaremos `v-bind="$attrs"` en nuestro `<input>` como aprendimos cuando construimos nuestro componente `BaseInput`, para poder permitir la inyección de este atributo en el elemento correcto.

📃`BaseRadio.vue`
```vue{6}
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

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
```
## Actualizando formulario de demostración

Ahora que nuestro componente está listo, podemos volver a nuestro `ComponentsForm.vue` y reemplazar los dos `<input type='radio'>` con nuestro nuevo y brillante componente `BaseRadio`.

📃`ComponentsForm.vue`
```html
<h3>Are pets allowed?</h3>
<div>
  <BaseRadio
    v-model="event.pets"
    :value="1"
    label="Yes"
    name="pets"
  />
</div>

<div>
  <BaseRadio
    v-model="event.pets"
    :value="0"
    label="No"
    name="pets"
  />
</div>
```

Solo nos falta declarar `BaseRadio.vue` como [complemento global](../guide/app-checkbox.html#complemento-global) para que esto funcione.



## Terminando

Como hemos visto, los botones `radio` tienen algunas peculiaridades que pueden volverlos confusos y difíciles de manejar, pero hemos hecho un gran progreso en la creación de un componente `BaseRadio` sólido. En nuestra próxima lección, daremos un paso más y crearemos el componente `BaseRadioGroup`, que nos permitirá simplificar aún más la configuración y creación de grupos de botones de opción.

