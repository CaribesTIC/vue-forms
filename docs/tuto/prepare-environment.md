# Preparar Entorno

## Instalando Vue y TypeScript

Para arrancar con este tutorial crearemos un proyecto nuevo con **Vite** de **Vue** + **TypeScript** + **Tailwindcss** . Por lo tanto, ya debemos tener instalado [Node](https://nodejs.org/es/).

:::info Nota
Si todavía no está familiarizado con [TypeScript](https://www.typescriptlang.org/) y [Tailwindcss](https://tailwindcss.com/), no hay que preocuperse demasiado por ello, va a ser muy sencillo.
:::

Así que, en la terminal nos dirigimos a la carpeta donde queremos crear el proyecto y ejecutamos el siguiente comando:

```
npm init vue@latest
```

>Como habrá notado, para este curso estamos usando [npm](https://www.npmjs.com/) para el manejo de paquetes. Siéntase libre de usar [yarn](https://yarnpkg.com) si lo desea.


Inmediatamente se establecerá un diálogo con el terminal:

```
Vue.js - The Progressive JavaScript Framework

? Project name: › vue-project
```

Lo primero que nos preguntará será definir el nombre del proyecto, en mi caso le colocaré `vue-forms`, usted puede colocar el nombre que desee:

```
Vue.js - The Progressive JavaScript Framework

? Project name: › vue-forms
```

Luego el terminal nos hará una serie de preguntas a las cuales responderemos afirmativamente solo para seleccionar lo que está aquí resaltado (**TypeScript** y **Vitest**), lo demás no lo necesitaremos para el objetivo de este tutorial.

```{4,7}
Vue.js - The Progressive JavaScript Framework

✔ Project name: … vue-forms
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? › No / Yes
✔ Add Vitest for Unit Testing? › No / Yes
✔ Add Cypress for End-to-End testing? › No / Yes
✔ Add ESLint for code quality? › No / Yes
```
Finlamente, seguimos las siguientes intrucciones:

```
Scaffolding project in ../vue-forms...

Done. Now run:

  cd vue-forms
  npm install
  npm run dev
```

## Instalando Tailwind

Instale tailwindcss y sus dependencias de pares a través de `npm` y luego ejecute el comando `init` para generar tanto `tailwind.config.js` como `postcss.config.js`.

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

A continuación, agregue las rutas a todos sus archivos de plantilla en su archivo `tailwind.config.js`.

```js{3,4,5,6}
/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Ahora cree un archivo `./src/assets/app.css` y agregue las directivas @tailwind para cada una de las capas de Tailwind.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Importe el archivo `./src/index.css` recién creado en su archivo `./src/main.ts`. 

```ts
import { createApp } from 'vue'
import App from './App.vue'

//import './assets/main.css'
import './assets/app.css'

createApp(App).mount('#app')
```

Note que para el objetivo del tutorial no necesitaremos el archivo `./assets/main.css`.


## Instalando Vue Test Utils

Para instalar Vue Test Utils, simplemente ejecute en su terminal el siguiente comando.

```
npm i -D @vue/test-utils@next
```























