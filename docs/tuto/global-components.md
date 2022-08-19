# Componentes Globales

En nuestras últimas dos lecciones, importamos nuestros componentes `AppInput` y `AppSelect` manualmente. Recordemos que cuanto más componentes  reutilizables que vayamos a utilizar, repetidas veces, a lo largo de nuestro proyecto es conveniente pasarlos a Vue como complementos. Es decir, convertirlos en **Componentes Globales**.

Hay varias maneras de hacerlo, una bién ordenada y limpia es la que usamos en nuestro _scaffolding_ [LaraVuel-ApiSpa](https://caribestic.github.io/laravuel-apispa/vue/vue-global-plugins.html), separando los distintos tipos de complementos en módulos e importándolos solo cuando sea necesario de manera asíncrona.

Otra forma, mucho más mágica implementando una librería de terceros ([Lodash](https://lodash.com/)), es la que está en el [repositorio](https://github.com/Code-Pop/Vue-3-Forms/blob/master/src/main.js) donde nació este tutoríal.

Pero, para no alejarnos del objetivo del tutorial vamos hacerlo de la manera más simple.

## El archivo `main.ts`

Vayamos al archivo principal y echemos un vistazo a lo que está allí.

📃`main.ts`
```ts
import { createApp } from 'vue'
import App from './App.vue'

import './index.css'

createApp(App).mount('#app')
```



Practicamente, el archivo luce como si justo acabaramos de crear un proyecto nuevo.

Entonces, avancemos agregando las dos importaciones que venimos haciendo y pasemos estos componentes como complementos de Vue. 

```ts{3,4,9,10}
import { createApp } from 'vue'
import App from './App.vue'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'

import './index.css'

createApp(App)
  .component('AppInput', AppInput)
  .component('AppSelect', AppSelect)  
  .mount('#app')
```
>No olvidemos eliminar estas importaciones del archivo `TasksForm.vue` ya que ahí no las necesitaremos.

Desde este momento, cada que vez construyamos un componente genérico vendremos a este archivo y lo agregamos. De esta forma nos ahorraremos muchas líneas de código.

## Terminando

Ya descubrimos que hay varias formas de agregar componentes globales pasándolos como complementos a Vue. Desde la manera más básica, como otras más ordenadas y asíncronas. Hasta llegar a las super mágicas. Usted decidirá cual de ellas utilizar en su momento.

Pero una vez que los agrega, aquí en el archivo `main.ts`, puede olvidarse de ellos y dejar que Vue se encargue de todo el trabajo de importar componentes globales por usted. Solo necesita ser consciente de lo que está haciendo y comprender los beneficios que puede aportar el registro global de componentes.

En nuestra próxima lección, seguiremos construyendo componentes, esta vez, `AppCheckbox`.

