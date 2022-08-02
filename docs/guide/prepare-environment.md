# Preparar Entorno

## Instalando Vue 3 con Vite

Para arrancar con este curso crearemos un proyecto nuevo de Vue 3 con Vite. Por lo tanto, ya debemos tener instalado [Node](https://nodejs.org/es/).

Así que, nos dirigimos a la carpeta donde queremos crear el proyecto y ejecutamos el siguiente comando:

```
npm init vite@latest
```
:::info
Para este curso estamos usando [npm](https://www.npmjs.com/) para el manejo de paquetes. Siéntase libre de usar [yarn](https://yarnpkg.com) si lo desea. 
:::

Nos preguntará por el nombre del nuevo proyecto. Nosotros le pondremos `vue-form-app`. Puede colocar el mismo o cambiarlo a su gusto.
```
$ npm init vite@latest
? Project name: › vue-form-app
```

Por supuesto Vue.

```{5}
$ npm init vite@latest
✔ Project name: … vue-form-app
? Select a framework: › - Use arrow-keys. Return to submit.
    vanilla
❯   vue
    react
    preact
    lit
    svelte
```

Para el objetivo de este curso no necesitaremos TypeScript (por ahora), así que continuamos:

```{5}
$ npm init vite@latest
✔ Project name: … vue-form-app
✔ Select a framework: › vue
? Select a variant: › - Use arrow-keys. Return to submit.
❯   vue
    vue-ts
```

Seguimos con los pasos que nos indica el terminal.

```{10,11,12}
$ npm init vite@latest
✔ Project name: … vue-form-app
✔ Select a framework: › vue
✔ Select a variant: › vue

Scaffolding project in /vue-form-app...

Done. Now run:

  cd vue-form-app
  npm install
  npm run dev

$
```

Entremos a nuestro archivo `vite.config.js` ubicado en la raíz del proyecto y agregaremos las siguientes líneas resaltadas:

```js{3,8,9,10,11}
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
```

Ahora, ya podemos crear un simple formulario que nos servira de ejemplo para este curso.

