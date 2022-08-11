# Formulario Simple

## Nuestro formulario de demostración

A lo largo de este curso, estamos creando un conjunto de componentes de formulario reutilizables y explorando las mejores prácticas en el camino. Para construirlos, necesitaremos un formulario de demostración para usar como punto de partida.

Hemos preparado un formulario simple para que podamos saltar directamente a él.

Sin embargo, antes debemos considerar cierto escenario.

## Componente `App.vue`

Imagine que estamos dentro de una aplicación más grande que seguramente usa otros complementos como VueRouter y Pinia.

Entonces, el principal componente `App.vue` será donde se renderizarán las distintas vistas o páginas.

En este ejemplo, simplemente construiremos una vista llamada `Tasks` la cual envolverá el formulario que nos servirá para lograr el objetivo del tutorial.

Avancemos borrando el contenido de este archivo y coloquemos el siguiente código.

📃`App.vue`
```vue
<script setup lang="ts">
 import Tasks from '@/views/Tasks.vue'
</script>

<template>
  <div id="app">
    <Tasks />
  </div>
</template>
```

## Componente `Tasks.vue`

Continuamos con el contenido del componente `Tasks.vue` el cual será creado dentro de una carpeta llamada `views`.

>Recordemos que se trata de una vista ó página - que algunos prefieren llamarla `pages` -. Para los efectos de este tutorial su nombre será `views`.

Sigamos y copiemos el siguiente código.

📃`Tasks.vue`
```vue
<script setup lang="ts">
import useTasks from '@/composables/useTasks'
import TasksForm from '@/components/TasksForm.vue'

const { categories, task } = useTasks()
</script>

<template>
  <div>
    <h1>Create an task</h1>
    <TasksForm
      :task='task'
      :categories='categories'      
    />
    <pre>{{ task }}</pre>
  </div>
</template>
```

Tenga en cuenta que empezamos a implementar dos conceptos útiles de diseño:

1. Regla de negocio separada de la interfaz de usuario (UI)
2. Formulario encapsulado en el componente `TasksForm.vue`

Avancemos revisando de qué se trata la regla de negocio inyectada al formulario.

## Composable `useTasks.ts`

En el código anterior vimos que se ha importado el _composable_ `useTasks` el cual es desestructurado en `categories` y `task`.

Ahora avancemos dándole una lectura.

📃`useTasks.ts`
```ts
import { reactive } from "vue"

export default () => {   
  const task = reactive({
    category: '',
    title: '',
    description: '',
    location: '',
    pets: 1,
    extras: {
      catering: false,
      music: false
    }
  })

  // this could be set from an http request service
  const categories = [
    'sustainability',
    'nature',
    'animal welfare',
    'housing',
    'education',
    'food',
    'community'
  ]

  return {
    categories,
    task
  }
}
```

Aquí se puede ver que estamos importando dos constantes. Tenga en cuenta lo siguiente:

- La constante `task` es un objeto reactivo y se trata de los datos que serán cargados en el formulario. Seguramente luego serán enviados y guardados a una API en particular.

- La constante `categories` es un arreglo que no necesita reactividad, ya que simplemente será útil para impulsar el elemento `select`.

## Componente `TasksForm.vue`

El componente `TasksForm.vue` lo guardaremos en la carpeta `components` ya que no se trata de una vista o pagina llamada desde el enrutador. Sino todo lo contrario, es un componente hijo importado por la vista padre `Tasks.vue`.


📃`TasksForm.vue`

```vue
<script setup lang="ts">
import { reactive } from "vue"

const props = defineProps<{
  task: object,
  categories: array
}>()

const form = reactive(props.task)
</script>

<template>
  <form>
    <label>Select a category</label>
    <select v-model="form.category">
      <option
        v-for="option in categories"
        :value="option"
        :key="option"
        :selected="option === form.category"
      >{{ option }}</option>
    </select>

    <h3>Name & describe your form</h3>

    <label>Title</label>
    <input
      v-model="form.title"
      type="text"
      placeholder="Title"
      class="field"
    >

    <label>Description</label>
    <input
      v-model="form.description"
      type="text"
      placeholder="Description"
      class="field"
    />

    <h3>Where is your form?</h3>

    <label>Location</label>
    <input
      v-model="form.location"
      type="text"
      placeholder="Location"
      class="field"
    />

    <h3>Are pets allowed?</h3>
    <div>
      <input
        type="radio"
        v-model="form.pets"
        :value="1"
        name="pets"
      />
      <label>Yes</label>
    </div>

    <div>
      <input
        type="radio"
        v-model="form.pets"
        :value="0"
        name="pets"
      />
      <label>No</label>
    </div>

    <h3>Extras</h3>
    <div>
      <input
        type="checkbox"
        v-model="form.extras.catering"
        class="field"
      />
      <label>Catering</label>
    </div>

    <div>
      <input
        type="checkbox"
        v-model="form.extras.music"
        class="field"
      />
      <label>Live music</label>
    </div>

    <button class="button -fill-gradient" type="submit">Submit</button>
  </form>    
</template>
```
Tenga en cuenta que estamos recibiendo las dos propiedades como era de esperarse: el objeto `task` y el arreglo `categories`.


A su vez se declaró la constante `form` reactiva a partir de la propiedad `task`. Esto con el objetivo de no forzar la reactividad en las propiedades.

Finalmente, ya tenemos un formulario simple funcioando que podemos probar en el navegador. Así que estamos listos para crear nuestro primer componente.
