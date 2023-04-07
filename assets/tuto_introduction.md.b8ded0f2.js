import{_ as e,c as a,o,N as r}from"./chunks/framework.4bc26c66.js";const h=JSON.parse('{"title":"Introducción","description":"","frontmatter":{},"headers":[],"relativePath":"tuto/introduction.md"}'),n={name:"tuto/introduction.md"},s=r('<h1 id="introduccion" tabindex="-1">Introducción <a class="header-anchor" href="#introduccion" aria-label="Permalink to &quot;Introducción&quot;">​</a></h1><p>Desde las pantallas de inicio de sesión y registro hasta la configuración y las páginas de pago, se puede decir que los formularios son la herramienta más importante para interactuar con los usuarios finales de nuestras aplicaciones web y recopilar información valiosa de ellos.</p><blockquote><p>Vue hace que sea fácil y divertido crear una amplia gama de formularios, que van desde formularios de una sola entrada como una barra de búsqueda, hasta complicados formularios basados ​​en esquemas, todo gracias a <a href="https://vuejs.org/guide/introduction.html#introduction" target="_blank" rel="noreferrer">la arquitectura basada en componentes</a> y <a href="https://vuejs.org/guide/essentials/reactivity-fundamentals.html#reactivity-fundamentals" target="_blank" rel="noreferrer">el sistema de reactividad de Vue</a>.</p></blockquote><h2 id="un-framework-basado-en-componentes" tabindex="-1">Un framework basado en componentes <a class="header-anchor" href="#un-framework-basado-en-componentes" aria-label="Permalink to &quot;Un framework basado en componentes&quot;">​</a></h2><p>Vue es, por supuesto, un framework basado en componentes, donde podemos crear un fragmento de código y reutilizarlo varias veces en nuestra aplicación. Estos componentes se comunican entre sí a través de propiedades y eventos, y a través de estas conexiones creamos una aplicación dinámica e interactiva.</p><blockquote><p>Los formularios en particular se benefician enormemente al encapsular la lógica de los elementos en componentes. A medida que nuestra aplicación crece, por lo general nuestros formularios también crecen, y tener un formulario construido sin componentes generalmente se convierte en una bomba de relogería.</p></blockquote><p>En algún momento, es posible que deba cambiar la apariencia de todos sus elementos de entrada, o hacer que se comporten de manera diferente en relación con su etiqueta, o incluso introducir un tipo diferente de validación de entrada. Todos estos escenarios se vuelven exponencialmente más complejos cuando las entradas en su formulario no están encapsuladas en componentes.</p><h2 id="lo-que-aprenderas" tabindex="-1">Lo que aprenderás <a class="header-anchor" href="#lo-que-aprenderas" aria-label="Permalink to &quot;Lo que aprenderás&quot;">​</a></h2><p>En este tutorial, crearemos un conjunto de componentes de formulario que manejarán los casos de uso más comunes para entradas de formulario. Serán altamente reutilizables, se podrán adaptar y escalar para cualquiera de las necesidades de su aplicación.</p><p>Mientras crea estos componentes, aprenderá los conceptos fundamentales de cómo estos componentes se comunican con su formulario y entre sí a través de <a href="https://vuejs.org/api/built-in-directives.html#v-model" target="_blank" rel="noreferrer"><code>v-model</code></a>, <a href="https://vuejs.org/api/options-state.html#props" target="_blank" rel="noreferrer"><code>props</code></a>, <a href="https://vuejs.org/api/options-state.html#emits" target="_blank" rel="noreferrer"><code>emit</code></a> y <a href="https://vuejs.org/guide/essentials/event-handling.html#event-handling" target="_blank" rel="noreferrer">manejadores de eventos</a>.</p><p>Aprenderemos algunas de las mejores prácticas sobre cómo capturar y enviar nuestros formularios y, finalmente, veremos los conceptos básicos de la accesibilidad de los formularios.</p><p>Con estos conceptos en su cinturón de herramientas de desarrollador, podrá crear y comprender cualquier variedad de formularios para sus propias aplicaciones.</p><h2 id="requisitos-previos" tabindex="-1">Requisitos previos <a class="header-anchor" href="#requisitos-previos" aria-label="Permalink to &quot;Requisitos previos&quot;">​</a></h2><p>Para aprovechar al máximo este curso, debe tener experiencia con los siguientes conceptos:</p><p>Una comprensión básica de qué es <code>v-model</code> y cómo interactúa con las entradas de formulario nativas. Si aún no está familiarizado con él, le recomiendo que consulte, el apartado <a href="https://vuejs.org/guide/essentials/forms.html" target="_blank" rel="noreferrer">Enlaces de Entrada de Formulario</a>.</p><p>En este curso, revisaremos estos conceptos pero no con la extensión y el detalle que lo hace dicho apartado. En cambio, incorporaremos estos conceptos mientras nos enfocamos en cómo Vue 3 simplifica y potencia la composición de componentes de formularios.</p><p>¿Listo para saltar directamente? ¡Nos vemos en la primera lección!</p>',17),t=[s];function i(c,d,l,u,p,m){return o(),a("div",null,t)}const b=e(n,[["render",i]]);export{h as __pageData,b as default};
