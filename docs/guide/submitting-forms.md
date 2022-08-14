# Enviando Formularios

## ¡Bienvenido de nuevo!

Con todos los componentes que hemos construido en las últimas lecciones, podemos construir cualquier tipo de formularios basados en componentes. Pero, ¿de qué sirve un formulario a menos que podamos enviar las entradas del usuario para que sean procesadas o almacenadas en nuestro _backend_?

En el estado actual del desarrollo de interfaz, el enfoque más común para enviar datos de formulario a nuestro servidor es a través de **XMLHTTPRequests** o **XHR** para abreviar. Hablaremos más sobre esto en un momento, pero por ahora solo sepa que [Axios](https://axios-http.com/docs/intro) es una biblioteca que le permitirá crear solicitudes **XHR** sin tener que lidiar con la **API JavaScript Vanilla XHR**, que es un poco engorrosa.

## Primero lo primero

Hay algunos conceptos básicos de formularios que debemos aprender y comprender antes de sumergirnos en conectar **Axios** a nuestra aplicación para comenzar a realizar nuestras solicitudes **XHR**. Analicemos los valores predeterminados del comportamiento de los formularios y algunos conceptos fundamentales de accesibilidad.

El comportamiento predeterminado de un formulario en **HTML** es enviar un montón de datos a una **URL** específica activando un evento de navegación del navegador. Lo que esto significa es que sin el uso de una biblioteca como **Axios**, sus formularios **HTML** harán que el navegador cargue una página completamente nueva de forma predeterminada.

En la era de las **SPA** _(Single Page Applications)_ en las que queremos brindar una navegación fluida al usuario sin la constante recarga completa de las páginas, esta no es una gran experiencia.

Cada formulario individual, necesita una etiqueta envolvente `<form>`. Los lectores de pantalla a menudo cambian al **"Forms Mode"** cuando procesan contenido dentro de un elemento `<form>`. Esto brinda a los usuarios que usan tecnologías accesibles una mejor experiencia al navegar los formularios, y no hay razón para no hacerlo.

Hay muchas formas de activar el envío de un formulario. Un usuario puede hacer `click` o tabular en un botón de envío y hacer `click` en él o pulsar `Intro`. Un usuario también puede presionar la tecla `Intro` dentro de uno de nuestros campos. Los lectores de pantalla buscarán botones con el tipo `type="submit"` en ellos.

Entonces, ¿cómo capturamos correctamente el intento del usuario de enviar nuestro formulario?

## El evento `submit`

Cada vez que un usuario envía un formulario dentro de una etiqueta de formulario envolvente, esta etiqueta de formulario emite un evento de envío que podemos escuchar, y aunque es una práctica común configurar un detector de `click` en el botón de envío de un formulario, esto debe evitarse.

Escuchar el evento `click` de un botón dentro de la etiqueta del formulario (y evitar su comportamiento predeterminado) bloquea efectivamente el comportamiento predeterminado del formulario **HTML**, que es enviar este evento de envío y luego enviar los datos dentro de dicho formulario. Sin embargo, no nos cubre de otras formas posibles de presentar dicho formulario, como las que hemos conocido anteriormente.

## Navegue a nuestro `TasksForm.vue`

Como puede ver, ya tenemos nuestro botón de envío establecido con el tipo `submit`. Cada vez que se hace `click` en un botón con el tipo de envío que se encuentra dentro de un elemento de formulario envolvente, se activa el evento `submit` de ese formulario envolvente. Este es el comportamiento que queremos para nuestros formularios.

Quizás se esté preguntando, ¿qué sucede si olvidamos agregar este tipo `submit` a uno de nuestros botones dentro del formulario?

Los navegadores asumirán que los botones dentro de las etiquetas de formulario que no tienen un tipo establecido están destinados a enviar el formulario; sin embargo, la especificidad adicional ayudará a las herramientas de accesibilidad a identificarlo como el botón destinado a enviar nuestro formulario.

Si nuestro formulario requería otros tipos de botones, como un botón `Cancel`, por ejemplo, agregarle el `type="button"` específico evitará que active el evento `submit` del formulario.

Ahora podemos ir a nuestra etiqueta de formulario y comenzar a escuchar el evento `@submit` de nuestro formulario.

📃`TasksForm.vue`
```html
<form @submit.prevent="sendForm">
  <!-- omitted for brevity ... -->
</form>
```

Tenga en cuenta que estamos usando el modificador de eventos `.prevent` en el detector de eventos `@submit`. Este modificador llamará a [`preventDefault`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) en el evento `submit` para nosotros, de modo que nuestro método `sendForm` pueda enfocarse exclusivamente en la lógica de envío de nuestro formulario, y no en el manejo de eventos.

Establecer `preventDefault` en un evento `submit` para un elemento `form` bloqueará el comportamiento predeterminado de hacer que el formulario envíe los datos por sí mismo y vuelva a cargar el navegador. Queremos mantener el control sobre cómo se procesa nuestro formulario y queremos hacer `post` de nuestros datos usando **Axios** — por lo que evitar este comportamiento predeterminado es exactamente lo que necesitamos.

Ahora que estamos escuchando el evento, avancemos y agreguemos nuestro nuevo método `sendForm` dentro de la sección `script` de nuestro componente.

📃`TasksForm.vue`
```vue{14,15,16}
<script setup lang="ts">
import { reactive } from "vue"

const props = defineProps<{
  // omitted for brevity ...
}>()

const form = reactive(props.task)

const situationOptions = [
  // omitted for brevity ...
]

const sendForm = () => {

}
</script>
```

Es el momento de recordar las premisas útiles de diseño que implementamos cuando empezamos a construir la vista `Tasks.vue`:

1. Regla de negocio separada de la interfaz de usuario (UI)
2. Formulario encapsulado en el componente TasksForm.vue

En este sentido se preguntará **¿qué lógica ocupará el método `sendForm`?**

La respuesta nos lleva a pensar que la responsabilidad del componente `TasksForm.vue` es la un formulario como tal. Por lo que la regla de negocio es transparente. Al efecto, su responsabilidad será emitir la carga útil al componente padre.

## Emitiendo `sendForm`

Avancemos definiendo el método `sendForm` cómo `emit` recibiendo un objeto `task` copo carga útil. Luego ocupamos el método `sendForm` invocando la emisión del dicho método y pasando la carga útil, el objeto `form`.

📃`TasksForm.vue`
```vue{2,14,15,16,18,19,20}
<script setup lang="ts">
import { reactive, toRaw } from "vue"

const props = defineProps<{
  // omitted for brevity ...
}>()

const form = reactive(props.task)

const situationOptions = [
  // omitted for brevity ...
]

const emit = defineEmits<{
  (e: 'sendForm', task): void
}>()

const sendForm = () => {
  emit('sendForm', toRaw(form))
}
</script>
```

Tenga presente que en este caso la carga útil no necesita ser reactiva. Por ello envolvimos el objeto reactivo `form` dentro del método [`toRaw`](https://vuejs.org/api/reactivity-advanced.html#toraw) cuando emitimos `sendForm`. Ahora si nos ocuparemos de la regla de negocio que nos interesa.

## Volviendo a `useTask.ts`

Afortunadamente la Composition API de Vue nos permite encapsular la regla de negocio separandola de la UI.

Así que continuamos y situaremos nuestro método `sendForm` en nuestro composable. 

📃`userTasks.ts`
```ts{13,14,15,21}
import { reactive } from 'vue'

export default () => {   
  const task = reactive({
    // omitted for brevity ...
  })

  // this could be set from an http request service
  const frequencies = [
    // omitted for brevity ...
  ]
  
  const sendForm = (payload) => {

  }

  return {
    frequencies,
    task,

    sendForm
  }
}
```

Será aquí donde ocuparemos la correspondiente regla de negocio retornandola al componente padre `Tasks.vue`.

## El TasksService

Continuando con la idea de separación de conceptos, destinaremos un archivo específico que reunirá las peticiones a nuestra API.

Crearemos una carpeta `services` en la raíz donde colocaremos nuestros archivos de servicios, en este caso el archivo `TasksService.ts`

📃`TasksService.ts`
```ts{1,5,13,14,15}
import axios from "axios";

const httpRqst = axios.create({
  // baseURL: process.env.VUE_APP_API_URL,
  baseURL: 'https://my-json-server.typicode.com/CaribesTIC/vue-forms-app'  
});

httpRqst.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const postTask = (payload) => {
  return httpRqst.post('/posts', payload)  
}

// export const getTasks = () => {
//  return httpRqst.get('/get-all-tasks')
// }
```

📃`useTasks.ts`
```ts{2,15,16,17,18,19}
import { reactive } from 'vue'
import { postTask } from '@/services/TaskService'

export default () => {   
  const task = reactive({
    // omitted for brevity ...
  })

  // this could be set from an http request service
  const frequencies = [
    // omitted for brevity ...
  ]
  
  const sendForm = (payload) => {    
    postTask(payload).then((response) => {
      console.log('Response', response)
    }).catch((err) => {
      console.log('Error', err)
    })
  }

  return {
    // omitted for brevity ...

    sendForm
  }
}
```


## Configurando Axios y nuestra API

Para poder capturar la entrada de nuestro usuario una vez que envían el formulario dentro de nuestro nuevo método `sendForm`, primero debemos configurar Axios — la biblioteca que discutimos al comienzo de la lección para hacer solicitudes XHR — y un punto final de la API al que podemos enviar nuestros datos ficticios.

**Comencemos por configurar Axios.**

Diríjase a su terminal en la raíz del proyecto y ejecute el siguiente comando para agregar **Axios** a su proyecto con su administrador de paquetes favorito.

```
npm install axios

// OR

yarn add axios
```

Una vez que **Axios** haya terminado de instalar, podemos dirigirnos a la parte superior del bloque `<script>` en nuestro `ComponentsForm.vue` e importar la biblioteca para poder usarla más tarde.

📃`TaskForm.vue`
```vue
<script>
import axios from 'axios'

export default {
  // omitted for brevity ...
}
</script>
```

Ahora que tenemos **Axios** configurado, necesitamos crear un punto final que recibirá nuestros datos una vez que el usuario haya publicado el formulario. En un escenario del mundo real, este punto final generalmente lo proporcionará el backend de su aplicación o un servicio de terceros como **FireBase**.


En aras del aprendizaje, vamos a utilizar **"My JSON Server"** (https://my-json-server.typicode.com/) - una forma gratuita de crear nuestro propio punto final en línea falso para que podamos aprender a publicar nuestro formulario.

La configuración de sus propios repositorios `Github` es realmente fácil, simplemente continúe y siga las instrucciones en su sitio web y agregue un archivo `db.json` a la rama principal o maestra de su repositorio, luego puede acceder y usarlo a través de la estructura de `URL` que proporcionan como punto final de la `API REST`.

Ya seguí adelante y creé esto para nosotros, para que podamos usarlo con el repositorio del curso aquí en Vue Mastery. La URL de nuestra API REST es: https://my-json-server.typicode.com/CaribesTIC/vue-forms-app/

Cuando abra el servidor, notará que en recursos tenemos una lista de eventos, con la siguiente URL: https://my-json-server.typicode.com/CaribesTIC/vue-forms-app/posts

En particular, al guardar los datos de un formulario, casi siempre querrá realizar un tipo particular de solicitud: una solicitud `POST`, que nos permite enviar una parte de los datos al servidor con ella.

Volvamos al código y veamos cómo lograr enviar los datos de nuestro formulario a la **API REST** con **Axios**.

Vamos a agregar una llamada `POST` de `Axios` a nuestro método `sendForm`.

📃`ComponentsForm`.vue
```js
sendForm (e) {
  axios.post(
    'https://my-json-server.typicode.com/CaribesTIC/vue-forms-app/posts', 
    this.event
  )
    .then(function (response) {
      console.log('Response', response)
    })
    .catch(function (err) {
      console.log('Error', err)
    })
}
```

Como ya importamos **Axios**, podemos acceder a su método `post` directamente desde el objeto **axios**.

El primer argumento que requiere es la `URL` a donde va a enviar la información, en este caso, la que nos proporcionó para el **endpoint** de eventos de nuestra **API** simulada **my-json-server**.

El segundo argumento es el `payload`, un objeto que contiene toda la información que queremos enviar a nuestro servidor. Dado que ya tenemos toda la información del formulario ordenadamente envuelta en nuestro objeto de datos de eventos, podemos usarla directamente aquí y simplemente enviarla tal como está al servidor.

¡Cuidado! En un escenario de la vida real, querrá validar la entrada de sus usuarios antes de enviarla al servidor, incluso si su backend va a realizar la validación del lado del servidor. Hacer una validación previa en la interfaz, o validación del lado del cliente, es una práctica muy recomendable.

En general, cualquier tipo de verificación previa o cambio de **UX** que desee realizar mientras se publica el formulario debe realizarse aquí en el método `sendForm`. Mostrar una rueda giratoria de `loading` o cambiar el texto del botón de `"Summit"` a `"Summiting"` son algunos buenos trucos de **UX** que puede aprovechar en este estado.

Sin embargo, las validaciones y la **UX** están fuera del alcance de esta lección, por lo que las omitiremos por ahora y las revisaremos en otro curso para temas de formularios más avanzados.

Una cosa importante que debe saber es que los métodos de `Axios` devuelven promesas `JavaScript`. Esto significa que podemos agregar un método `then` a nuestra llamada posterior que devolverá la respuesta del servidor para que podamos trabajar con ella, y un método `catch` que podemos usar para manejar cualquier `error` que pueda ocurrir al enviar los datos.

Para los propósitos de esta lección, solo vamos a registrar los resultados en la consola aquí para ver estos dos métodos en acción.

## Volver al navegador

Ahora que nuestra función de envío está lista, y después de haber aprendido toda esa teoría, finalmente estamos listos para volver al navegador y probar nuestro formulario.

Sirva su proyecto y complete el formulario, asegúrese de tener la pestaña `Network` abierta en su navegador para que pueda ver las solicitudes que se envían, y finalmente presione el botón `Submit` para ver toda la información enviada rápidamente a nuestra **API**.

En la pestaña `Network` podemos ver nuestra solicitud exitosa y la respuesta, reflejando nuestro _payload_. Y en nuestro `console.log` los datos completos de respuesta:

## Terminando

¡Eso fue mucha teoría! Pero ahora tenemos un formulario completamente funcional que envía datos a nuestro servidor.

Sin embargo, hay una cosa más, posiblemente una de las partes más importantes de todas.

Hace algunas lecciones mencioné que nuestros componentes no eran accesibles, y aunque en un escenario de la vida real la accesibilidad debería ser una consideración principal al desarrollar sus componentes, simplemente era demasiada información para agregarla a nuestras lecciones anteriores.

Ahora estamos listos para regresar y echar un vistazo a algunos conceptos básicos de accesibilidad que siempre debe tener en cuenta al crear formularios en Vue.

