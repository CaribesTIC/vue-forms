# Formulario Simple

## Nuestro formulario de demostración

A lo largo de este curso, estamos creando un conjunto de componentes de formulario base reutilizables y explorando las mejores prácticas en el camino. Para construirlos, necesitaremos un formulario de demostración para usar como punto de partida, que dividiremos en estos componentes base. 

He preparado uno para que podamos saltar directamente a él.

El formulario ya incluye `v-model` en un estado reactivo y una matriz `categories` para impulsar el elemento de selección.

Lo llamaremos `SimpleForm.vue` y lo guardaremos en la carpeta `views/`.


📃`SimpleForm.vue`

```vue
<template>
  <div>
    <h1>Create an event</h1>
    <form>

      <label>Select a category</label>
      <select v-model="event.category">
        <option
          v-for="option in categories"
          :value="option"
          :key="option"
          :selected="option === event.category"
        >{{ option }}</option>
      </select>

      <h3>Name & describe your event</h3>

      <label>Title</label>
      <input
        v-model="event.title"
        type="text"
        placeholder="Title"
        class="field"
      >

      <label>Description</label>
      <input
        v-model="event.description"
        type="text"
        placeholder="Description"
        class="field"
      />

      <h3>Where is your event?</h3>

      <label>Location</label>
      <input
        v-model="event.location"
        type="text"
        placeholder="Location"
        class="field"
      />

      <h3>Are pets allowed?</h3>
      <div>
        <input
            type="radio"
            v-model="event.pets"
            :value="1"
            name="pets"
          />
        <label>Yes</label>
      </div>

      <div>
        <input
          type="radio"
          v-model="event.pets"
          :value="0"
          name="pets"
        />
        <label>No</label>
      </div>

      <h3>Extras</h3>
      <div>
        <input
          type="checkbox"
          v-model="event.extras.catering"
          class="field"
        />
        <label>Catering</label>
      </div>

      <div>
        <input
          type="checkbox"
          v-model="event.extras.music"
          class="field"
        />
        <label>Live music</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      event: {
        category: '',
        title: '',
        description: '',
        location: '',
        pets: 1,
        extras: {
          catering: false,
          music: false
        }
      }
    }
  }
}
</script>
```

:::info
El componente `HelloWorld.vue` no lo necesitamos, así que lo podemos eliminar.
:::

Avancemos y remplacemos el contenido del archivo `@/src/App.vue` con el siguiente código:

📃`App.vue`
```vue
<template>
  <div id="app">
    <SimpleForm />
  </div>
</template>

<script>
import SimpleForm from '@/views/SimpleForm.vue'

export default {
  components: {
    SimpleForm
  }
}
</script>
```

Ya tenemos un formulario simple funcioando que podemos probar en el navegador. Este será nuestro respaldo y a partir de él hagamos una copia el cual llamaremos `ComponentsForm.vue` guardándolo en la misma carpeta `views/`, en este último es donde haremos las modificaciones respectivas. 

Finalmente, importemos el componente recien creado y comentemos el componente anterior:

📃`App.vue`
```vue
<template>
  <div id="app">
    <!--SimpleForm /-->
    <hr>
    <ComponentsForm />
  </div>
</template>

<script>
//import SimpleForm from '@/views/SimpleForm.vue'
import ComponentsForm from '@/views/ComponentsForm.vue'

export default {
  components: {
    //SimpleForm,
    ComponentsForm
  }
}
</script>

</script>
```

Todo debe estar funcionando igual, así que ya estamos listos para crear nuestro primer componente.
