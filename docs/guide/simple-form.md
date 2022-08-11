# Formulario Simple

## Nuestro formulario de demostración

A lo largo de este curso, estamos creando un conjunto de componentes de formulario base reutilizables y explorando las mejores prácticas en el camino. Para construirlos, necesitaremos un formulario de demostración para usar como punto de partida, que dividiremos en estos componentes base. 

He preparado uno para que podamos saltar directamente a él. Sin embargo, antes debemos considerar cierto escenario.

## Componente App

Imagine que estamos dentro de una aplicación más grande que seguramente usa otros complementos como VueRouter y Pinia. Entonces, el principal componente `App.vue` será el encargado de llamar las distintas vistas (o páginas). En este ejemplo, simplemente construiremos una vista llamada `Tasks` la cual envolverá el formulario que nos servirá para lograr el objetivo del tutorial. Así que procedamos a borrar el contenido de ste archivo y coloquemos el siguiente código.

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

## Componente Tasks

Como es de suponenr, ahora avanzaremos con el contenido del componente `Tasks.vue`.

Recordemos que se trata de una vista ó página, por lo tanto, lo crearemos dentro de una carpeta que llamaremos `views`- para los efectos de este tutorial, algunos prefieren llamar este directorio `pages` -. Avancemos y copiemos el siguiente código.

📃`Tasks.vue`
```vue
<script setup lang="ts">
import useTasks from '@/composables/useTasks'
import TasksForm from '@/components/TasksForm.vue'

const { task, sendForm } = useTasks()
</script>

<template>
  <div>
    <h1>Create an task</h1>
    <TasksForm
      :task='task'
      @sendForm="sendForm"
    />
    <pre>{{ task }}</pre>
  </div>
</template>
```
:::danger
TODO Explicar brevemente código anterior
:::

## Composable useTasks

:::danger
TODO Introducción...
:::

```ts
import { reactive } from "vue"
import axios from 'axios'

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
 
  const sendForm = ()=> {
    axios.post(
      'https://my-json-server.typicode.com/CaribesTIC/vue-forms-app/posts',
      task
    )
    .then(function (response) {
      console.log('Response', response)
    }).catch(function (err) {
      console.log('Error', err)
    })
  }

  return { task, sendForm }

}
```

:::danger
TODO Explicar brevemente código anterior
:::

## Componente TasksForm

El formulario ya incluye `v-model` en un estado reactivo y una matriz `categories` para impulsar el elemento de selección.

Lo llamaremos `TasksForm.vue` y lo guardaremos en la carpeta `views/`.


📃`TasksForm.vue`

```vue
<script setup lang="ts">
import { reactive } from "vue"

const props = defineProps<{
  task: object
}>()

defineEmits<{
  (e: 'sendForm', form: object): void
}>()

const form = reactive(props.task)

const sendForm = () => emit('sendForm', form)

const categories = [
  'sustainability',
  'nature',
  'animal welfare',
  'housing',
  'education',
  'food',
  'community'
]
const petOptions = [
  { label: 'Yes', value: 1 },
  { label: 'No', value: 0 }
]
</script>

<template>
  <form @submit.prevent="$emit('sendForm', form)">
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

Ya tenemos un formulario simple funcioando que podemos probar en el navegador. Así que ya estamos listos para crear nuestro primer componente.
