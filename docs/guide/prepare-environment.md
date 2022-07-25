# Preparar Entorno

```
npm init vite@latest
```

```
$ npm init vite@latest
? Project name: › vue-form-app
```

```
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

```
$ npm init vite@latest
✔ Project name: … vue-form-app
✔ Select a framework: › vue
? Select a variant: › - Use arrow-keys. Return to submit.
❯   vue
    vue-ts
```

```
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

```js
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

```js
// main.js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

```vue
<template>
  <div id="app">
    <SimpleForm />
  </div>
</template>

<script>
import SimpleForm from '@/views/SimpleForm.vue'

export default {
  components: { SimpleForm }
}
</script>
```

