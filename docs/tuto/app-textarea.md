# Componente Textarea

Llegamos al último de nuestros componentes de formulario para este curso.

Con todo lo que hemos aprendido en este tutorial veremos lo fácil que es construir el `AppTextarea` ya que prácticamente es muy parecido al componente `AppInput`.

**¡Vamos a sumergirnos!**

## Crear el Archivo `AppTextarea.vue`

Como hemos venido haciendo, vamos a crear un nuevo archivo de componente llamado `AppTextarea.vue` y copiaremos el elemento `textarea`, junto con su respectivo `label`, en el nuevo archivo dentro de una etiqueta `template`.

📃`AppTextarea.vue`
```vue
<template>
  <label>Description</label>
  <textarea
    v-model="form.description"
    placeholder="Description"
    class="field"
  ></textarea>
</template>
```

Como hemos venido haciendo permitiremos que nuestro componente reciba una propiedad `label` del padre. Para hacer esto, vamos a crear una propiedad `label`. Esta propiedad se usará no solo para nuestro elemento `<label>`, sino también como `placeholder`, por lo que es muy conveniente que solo tengamos que definirlo una vez en el padre.

📃`AppTextarea.vue`
```vue
<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: ''
})
</script>
```

Como hemos venido haciendo, la propiedad `label` es de tipo `string`. Su valor por defecto será una cadena vacia en caso de no ser suministrada.

Ahora podemos usar nuestra nueva propiedad `label` a través de la interpolación dentro del elemento `<label>` de nuestro `template`.
Vinculemos también el atributo `placeholder` a nuestra propiedad `label`.

Esto asegurará que tanto el texto de `placeholder`, dentro del elemento `<textarea>`, como el `label` estén coordinados y sean reactivos.

📃`AppTextarea.vue`
```vue{10,13}
<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: ''
})
</script>

<template>
  <label v-if="label">{{ label }}</label>
  <textarea                        
    v-model="form.description"
    :placeholder="label"
    class="field"
  ></textarea>
</template>
```

## `v-model`: Vinculando valor

Ahora que nuestro componente tiene su estructura básica, podemos pasar a agregar la capacidad para que nuestro componente esté listo para el `v-model`.

Avancemos y agreguemos esta nueva propiedad, y luego vincúlela al atributo `value` de nuestro elemento `<textarea>`.

Lo usaremos por defecto como una cadena vacía, pero especificaremos `string` y `number` como los tipos permitidos.

📃`AppTextarea.vue`
```vue{4,7,14}
<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  modelValue?: string | number
}>(), {
  label: '',
  modelValue: ''
})
</script>

<template>
  <label v-if="label">{{ label }}</label>
  <textarea                        
    :value="modelValue"
    :placeholder="label"
    class="field"
  ></textarea>
</template>
```

Ahora hagamos la segunda parte del enlace bidireccional del `v-model`: emitir el evento.

## `v-model`: Emitir el `update:modelValue`

Al igual que hicimos con el componente `AppInput`, avancemos y agreguemos un detector de eventos `@input` a nuestro elemento `<textarea>` y emitamos un evento `update:modelValue` cada vez que ocurra un evento de entrada.

📃`AppTextarea.vue`
```vue{6}
<template>
  <label v-if="label">{{ label }}</label>
  <textarea    
    :value="modelValue"
    :placeholder="label"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    class="field"   
  ></textarea>
</template>
```

Agregar un detector `@input` a nuestro elemento `textarea` nos permite activar el evento requerido cada vez que el usuario escribe algo en el campo `textarea`.

Tenga en cuenta que estamos pasando el `$event.target.value` como la carga útil del evento. Este es el valor que el `v-modelo` recibirá en el padre.

## Asignando los `$attrs` al `textarea`

En el caso de nuestro componente `AppTextArea.vue`, también queremos poder inyectar atributos directamente en el `textarea`, por lo que debemos vincular manualmente el objeto `$attrs`.

Avancemos y hagámoslo agregando `v-bind="$attrs"` a nuestro elemento `<textarea>`.

📃`AppTextarea.vue`
```vue{4}
<template>
  <label v-if="label">{{ label }}</label>
  <textarea    
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"    
    class="field"
  ></textarea>
</template>
```

Con este pequeño cambio, los elementos `<textarea>` ahora recibirán correctamente los vínculos `cols` y `rows` del padre y se aplicarán nuestras clases CSS.

## Componente padre `TaskForm.vue`

Regresemos a nuestro formulario y usemos nuestro nuevo componente `AppTextarea.vue` en lugar de nuestro elemento nativo para probar nuestro código.

Reemplacemos el `textarea` entrada de `Description` en nuestro formulario con nuestro nuevo componente.

```html
<AppTextarea
  v-model="form.description"
  label="Description"      
/>
```

Solo nos falta declarar `AppTextarea.vue` como [complemento global](../tuto/app-checkbox.html#complemento-global) para que esto funcione.
    
## Terminando

Con la finalización de nuestro componente `AppTextarea`, culminamos la creación de nuestros componentes de formulario. ¡Buen trabajo en lograrlo hasta el final!

En la siguiente lección, daremos un pequeño giro y veremos cómo podemos manejar el envío de formularios correctamente en Vue aprovechando el poder de una biblioteca ampliamente utilizada para realizar solicitudes HTTP: Axios.
    
    
