## Importando Componentes

:::info
[Código previo a la lección](https://github.com/CaribesTIC/vue-forms-app/tree/l4-start)
:::

En nuestras últimas dos lecciones, importamos nuestros componentes `BaseInput` y `BaseSelect` manualmente. Recordemos que cuanto más componentes  reutilizables que vayamos a utilizar, repetidas veces, a lo largo de nuestro proyecto es conveniente pasarlos a Vue como complementos. Es decir, convertirlos en **Componentes Globales**.

Hay varias maneras de hacerlo, una bién ordenada y limpia es la que usamos en nuestro proyecto [LaraVuel-ApiSpa](https://caribestic.github.io/laravuel-apispa/vue/vue-global-plugins.html), separando los distintos tipos de complementos en módulos e importándolos de manera asíncrona solo cuando sea necesario.

Otra forma, mucho más mágica e implementando una librería de terceros ([Lodash](https://lodash.com/)), es la que está en el [código fuente](https://github.com/Code-Pop/Vue-3-Forms/blob/master/src/main.js) de donde nace este tutoríal. Pero, para no alejarnos del objetivo principal vamos hacerlo de la manera más simple.

## `main.js`

Vayamos al archivo `main.js` y echemos un vistazo a lo que está allí.

```js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```
Practicamente, el archivo luce como si justo acabaramos de crear un proyecto nuevo.

Entonces, avancemos agregando las dos importaciones que venimos haciendo y pasemos estos componentes como complementos de Vue. 

```js{4,5,8,9}
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'

createApp(App)
  .component('BaseInput', BaseInput)
  .component('BaseSelect', BaseSelect)  
  .mount('#app')
```
>No olvidemos eliminar estas importaciones del archivo `ComponentsForm.vue` ya que ahí no las necesitaremos.

Desde este momento, cada que vez construyamos un componente genérico vendremos a este archivo y lo agregamos. De esta forma nos ahorramos muchas líneas de código.

## Terminando

Ya descubrimos que hay varias formas de agregar componentes globales pasándolos como complementos a Vue. Desde la manera más básica, como otras más ordenadas y asíncronas. Hasta llegar a las super mágicas. Usted decidirá cual de ellas utilizar en su momento.

Pero una vez que los agrega, aquí en el archivo `main.js`, puede olvidarse de ellos y dejar que Vue se encargue de todo el trabajo de importar componentes globales por usted. Solo necesita ser consciente de lo que está haciendo y comprender los beneficios que puede aportar al registro global de componentes.

En nuestra próxima lección, seguiremos construyendo componentes, esta vez, `BaseCheckbox`.

:::info
[Código final de la lección](https://github.com/CaribesTIC/vue-forms-app/tree/l4-end)
:::
