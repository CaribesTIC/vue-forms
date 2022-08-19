# Formulario Simple

## Nuestro formulario de demostración

A lo largo de este curso, estamos creando un conjunto de componentes de formulario reutilizables y explorando las mejores prácticas en el camino. Para construirlos, necesitaremos un formulario de demostración para usar como punto de partida.

## Componente `App`

>Hemos preparado un formulario simple para que podamos saltar directamente a él. Sin embargo, antes debemos considerar cierto escenario.

Imagine que estamos dentro de una SPA más grande que seguramente usa otros complementos como **VueRouter** y **Pinia**. Entonces, el principal componente `App.vue` será donde se renderizarán las distintas vistas o páginas.

Avancemos borrando el contenido de este archivo y coloquemos el siguiente código.

📃`App.vue`
```vue
<script setup lang="ts">
 import Tasks from '@/views/Tasks.vue'
</script>

<template>
  <div id="app" class="section">
    <Tasks />
  </div>
</template>
```

En este ejemplo, habrá una sección donde simplemente construiremos una vista llamada `Tasks` la cual envolverá el formulario que nos servirá para lograr el objetivo del tutorial.

## Componente `Tasks`

Continuamos con el contenido del componente `Tasks.vue` el cual será creado dentro de una carpeta llamada `views`.

>`Tasks.vue` se trata de una vista ó página - que algunos prefieren llamarlas `pages` -. Recuerde, para los efectos de este tutorial su nombre será siempre `views`.

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

## Composable `useTasks`

En el código anterior vimos que se ha importado el _composable_ `useTasks.ts` el cual es desestructurado en `{ frequencies, task }`.

Ahora avancemos dándole una lectura.

📃`useTasks.ts`
```ts
import { reactive } from 'vue'

export default () => {   
  const task = reactive({
    frequency: '',
    name: '',
    description: '',    
    situation: 0,
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

En este código se puede ver que estamos retornando dos constantes. Tenga en cuenta lo siguiente:

1. La constante `task` es un objeto reactivo y se trata de los datos que serán cargados en el formulario. Seguramente luego serán enviados y guardados a una API en particular.
2. La constante `frequencies` es un arreglo que no necesita reactividad, ya que simplemente será útil para impulsar el elemento `select`.

>Copie este código, péguelo dentro de una carpeta que llamaremos `composables` y continuemos.

Tenga en cuenta además, que el IDE infiere automáticamente el tipo de constantes respectivamente. En el caso de la constante `frequencies` infiere el tipo `string[]`, y para la constante reactiva `task` infiere un tipo de objeto particular.

Ambos tipos serán requeridos más adelante por nuestro IDE cuando declaremos las propiedades del formulario. Por lo tanto, para el caso del objeto particular `Task` es conveniente establecer su correspondiente tipo en un archivo aparte y exportarlo.

## Tipo de objeto `Task`

Avancemos y creemos entonces el archivo `Task.ts` con la declaración y exportación del objeto respectivo el cual será importado más adelante como uno de los tipos de propiedades del formulario. Lo colocaremos en una nueva carpeta `types` en la raiz de nuestro proyecto.

📃`Tasks.ts`

```ts
interface Task {
  frequency: string
  name: string
  description: string
  situation: number
  supervision: {
    reviewed: boolean,
    approved: boolean
  }
}

export default Task
```

Con esta declaración y exportación de tipo estamos prácticamente listos para completar el formulario simple `TasksForm.vue` que nos servirá de ejemplo para el tutorial.


## Componente `TasksForm`

Avancemos con el componente `TasksForm.vue` que colocaremos en la carpeta `components` ya que no se trata de una vista (o pagina) llamada desde el enrutador. Sino todo lo contrario, es un componente hijo importado por la vista padre `Tasks.vue`.


📃`TasksForm.vue`

```vue{6,7,10}
<script setup lang="ts">
import { reactive } from "vue"
import type Task from "@/types/Task"

const props = defineProps<{
  task: Task,
  frequencies: string[]
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
      v-model="form.description"
      placeholder="Description"
      class="field"
    ></textarea>

    <h3>Task situation</h3>
    <div>
      <input
        type="radio"
        v-model="form.situation"
        :value="0"
        name="situation"
      />
      <label>Unstarted</label>
    </div>

    <div>
      <input
        type="radio"
        v-model="form.situation"
        :value="1"
        name="situation"
      />
      <label>Started</label>
    </div>    
    
    <div>
      <input
        type="radio"
        v-model="form.situation"
        :value="2"
        name="situation"
      />
      <label>Completed</label>
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
      class="btn btn-primary"
      type="submit"
    >
      Submit
    </button>
  </form>    
</template>
```
Tenga en cuenta que estamos recibiendo las dos propiedades como era de esperarse: el objeto `task` tipo `Task` y el arreglo `frequencies` tipo `string[]`. Note también que las declaramos de [la manera recomendada por Vue cuando se hace uso de `<script setup>` y TypeScript](https://vuejs.org/guide/typescript/composition-api.html#typing-component-props). A su vez se declaró la constante `form` reactiva a partir de la propiedad `task`. Esto con el objetivo de no forzar la reactividad en las propiedades.

El formulario simple `TasksForm.vue` ya es funcional pero aún falta agregar el estilo, vamos a eso.

## El `Style`

Para dar un poco de estilo con Tailwind a nuestro formulario actualicemos el archivo `app.css` ubicado en la carpeta `assets` con lo siguiente.

📃`index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.section {
  @apply flex justify-center min-h-screen font-sans;
}

h1 {
  @apply text-4xl font-semibold my-5;
}

h3 {
  @apply text-2xl font-semibold my-4;
}

input[type="text"],
textarea,
select {
  @apply block w-full rounded-sm border border-gray-300 shadow-sm p-2;
}

.btn {
  @apply text-white py-1 px-4 rounded transition m-5;
}

.btn-primary {
  @apply bg-blue-500 hover:bg-blue-700;
}

label {
  @apply text-gray-600 mx-1;
}

.errorMessage {
  @apply text-red-500 text-sm mt-1;
}
```

Finalmente, ya tenemos un formulario simple funcioando que podemos probar en el navegador. Así que estamos listos para crear nuestro primer componente.
