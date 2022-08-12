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

const { frequencies, task } = useTasks()
</script>

<template>
  <div>
    <h1>Create an task</h1>
    <TasksForm
      :task='task'
      :frequencies='frequencies'      
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

En el código anterior vimos que se ha importado el _composable_ `useTasks` el cual es desestructurado en `frequencies` y `task`.

Ahora avancemos dándole una lectura.

📃`useTasks.ts`
```ts
import { reactive } from 'vue'

export default () => {   
  const task = reactive({
    frequency: '',
    name: '',
    description: '',    
    completed: 0,
    supervision: {
      reviewed: false,
      approved: false
    }
  })

  // this could be set from an http request service
  const frequencies = [
    'annual',
    'biannual',
    'biweekly',
    'daily',
    'eventual',
    'monthly',
    'quarterly',
    'weekly'
  ]

  return { frequencies, task }
}
```

Aquí se puede ver que estamos importando dos constantes. Tenga en cuenta lo siguiente:

- La constante `task` es un objeto reactivo y se trata de los datos que serán cargados en el formulario. Seguramente luego serán enviados y guardados a una API en particular.

- La constante `frequencies` es un arreglo que no necesita reactividad, ya que simplemente será útil para impulsar el elemento `select`.

## Componente `TasksForm.vue`

El componente `TasksForm.vue` lo guardaremos en la carpeta `components` ya que no se trata de una vista o pagina llamada desde el enrutador. Sino todo lo contrario, es un componente hijo importado por la vista padre `Tasks.vue`.


📃`TasksForm.vue`

```vue
<script setup lang="ts">
import { reactive } from "vue"

const props = defineProps<{
  task: object,
  frequencies: array
}>()

const form = reactive(props.task)
</script>

<template>
  <form>
    <label>Select a frequency</label>
    <select v-model="form.frequency">
      <option
        v-for="option in frequencies"
        :value="option"
        :key="option"
        :selected="option === form.frequency"
      >{{ option }}</option>
    </select>

    <h3>Name & describe your task</h3>
    <label>Name</label>
    <input
      v-model="form.name"
      type="text"
      placeholder="Name"
      class="field"
    >

    <label>Description</label>
    <textarea
      class="field"                    
      v-model="form.description"
      placeholder="Description"
    ></textarea>

    <h3>Task completed ?</h3>
    <div>
      <input
        type="radio"
        v-model="form.completed"
        :value="0"
        name="completed"
      />
      <label>Nothing (0%)</label>
    </div>

    <div>
      <input
        type="radio"
        v-model="form.completed"
        :value="1"
        name="completed"
      />
      <label>A quarter (15%)</label>
    </div>    
    
    <div>
      <input
        type="radio"
        v-model="form.completed"
        :value="2"
        name="completed"
      />
      <label>Half (50%)</label>
    </div>

    <div>
      <input
        type="radio"
        v-model="form.completed"
        :value="3"
        name="completed"
      />
      <label>Three quarters (75%)</label>
    </div>
    
    <div>
      <input
        type="radio"
        v-model="form.completed"
        :value="4"
        name="completed"
      />
      <label>Full (100%)</label>
    </div>

    <h3>Supervision</h3>
    <div>
      <input
        type="checkbox"
        v-model="form.supervision.reviewed"
        class="field"
      />
      <label>Reviewed</label>
    </div>

    <div>
      <input
        type="checkbox"
        v-model="form.supervision.approved"
        class="field"
      />
      <label>Approved</label>
    </div>

    <button
      class="button -fill-gradient"
      type="submit"
    >
      Submit
    </button>
  </form>    
</template>
```
Tenga en cuenta que estamos recibiendo las dos propiedades como era de esperarse: el objeto `task` y el arreglo `frequencies`.

A su vez se declaró la constante `form` reactiva a partir de la propiedad `task`. Esto con el objetivo de no forzar la reactividad en las propiedades.

Finalmente, ya tenemos un formulario simple funcioando que podemos probar en el navegador. Así que estamos listos para crear nuestro primer componente.
