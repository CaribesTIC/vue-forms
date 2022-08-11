# Introducción

Desde las pantallas de inicio de sesión y registro hasta la configuración y las páginas de pago, se puede decir que los formularios son la herramienta más importante para interactuar con los usuarios finales de nuestras aplicaciones web y recopilar información valiosa de ellos.

Vue hace que sea fácil y divertido crear una amplia gama de formularios, que van desde formularios de una sola entrada como una barra de búsqueda, hasta complicados formularios basados ​​en esquemas, todo gracias a [la arquitectura basada en componentes](https://vuejs.org/guide/introduction.html#introduction) y [el sistema de reactividad de Vue](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#reactivity-fundamentals).


## Un framework basado en componentes

Vue es, por supuesto, un framework basado en componentes, donde podemos crear un fragmento de código y reutilizarlo varias veces en nuestra aplicación. Estos componentes se comunican entre sí a través de propiedades y eventos, y a través de estas conexiones creamos una aplicación dinámica e interactiva.

Los formularios en particular se benefician enormemente al encapsular la lógica de los elementos en componentes. A medida que nuestra aplicación crece, por lo general nuestros formularios también crecen, y tener un formulario construido sin componentes generalmente se convierte en una bomba de relogería.

En algún momento, es posible que deba cambiar la apariencia de todos sus elementos de entrada, o hacer que se comporten de manera diferente en relación con su etiqueta, o incluso introducir un tipo diferente de validación de entrada. Todos estos escenarios se vuelven exponencialmente más complejos cuando las entradas en su formulario no están encapsuladas en componentes.

## Lo que aprenderás

En este curso, crearemos un conjunto de componentes de formulario que manejarán los casos de uso más comunes para entradas de formulario. Serán altamente reutilizables, se podrán adaptar y escalar para cualquiera de las necesidades de su aplicación.

Mientras crea estos componentes, aprenderá los conceptos fundamentales de cómo estos componentes se comunican con su formulario y entre sí a través de [`v-model`](https://vuejs.org/api/built-in-directives.html#v-model), [`props`](https://vuejs.org/api/options-state.html#props), [`emit`](https://vuejs.org/api/options-state.html#emits) y [manejadores de eventos](https://vuejs.org/guide/essentials/event-handling.html#event-handling).

Aprenderemos algunas de las mejores prácticas sobre cómo capturar y enviar nuestros formularios y, finalmente, veremos los conceptos básicos de la accesibilidad de los formularios.

Con estos conceptos en su cinturón de herramientas de desarrollador, podrá crear y comprender cualquier variedad de formularios para sus propias aplicaciones.

## Requisitos previos

Para aprovechar al máximo este curso, debe tener experiencia con el siguiente concepto:

Una comprensión básica de qué es `v-model` y cómo interactúa con las entradas de formulario nativas. Si aún no está familiarizado con él, le recomiendo que consulte, el apartado [Enlaces de Entrada de Formulario](https://vuejs.org/guide/essentials/forms.html).

En este curso, revisaremos estos conceptos pero no con la extensión y el detalle que lo hace dicho apartado. En cambio, incorporaremos estos conceptos mientras nos enfocamos en cómo Vue 3 simplifica y potencia la composición de componentes de formularios.

¿Listo para saltar directamente? ¡Nos vemos en la primera lección!
