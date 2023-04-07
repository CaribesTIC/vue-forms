import{_ as s,c as a,o,N as e}from"./chunks/framework.4bc26c66.js";const F=JSON.parse('{"title":"Componentes Globales","description":"","frontmatter":{},"headers":[],"relativePath":"tuto/global-components.md"}'),n={name:"tuto/global-components.md"},l=e(`<h1 id="componentes-globales" tabindex="-1">Componentes Globales <a class="header-anchor" href="#componentes-globales" aria-label="Permalink to &quot;Componentes Globales&quot;">​</a></h1><p>En nuestras últimas dos lecciones, importamos nuestros componentes <code>AppInput</code> y <code>AppSelect</code> manualmente. Recordemos que cuanto más componentes reutilizables que vayamos a utilizar, repetidas veces, a lo largo de nuestro proyecto es conveniente pasarlos a Vue como complementos. Es decir, convertirlos en <strong>Componentes Globales</strong>.</p><p>Hay varias maneras de hacerlo, una bién ordenada y limpia es la que usamos en nuestro <em>scaffolding</em> <a href="https://caribestic.github.io/laravuel-apispa/vue/vue-global-plugins.html" target="_blank" rel="noreferrer">LaraVuel-ApiSpa</a>, separando los distintos tipos de complementos en módulos e importándolos solo cuando sea necesario de manera asíncrona.</p><p>Otra forma, mucho más mágica implementando una librería de terceros (<a href="https://lodash.com/" target="_blank" rel="noreferrer">Lodash</a>), es la que está en el <a href="https://github.com/Code-Pop/Vue-3-Forms/blob/master/src/main.js" target="_blank" rel="noreferrer">repositorio</a> donde nació este tutoríal.</p><p>Pero, para no alejarnos del objetivo del tutorial vamos hacerlo de la manera más simple.</p><h2 id="el-archivo-main-ts" tabindex="-1">El archivo <code>main.ts</code> <a class="header-anchor" href="#el-archivo-main-ts" aria-label="Permalink to &quot;El archivo \`main.ts\`&quot;">​</a></h2><p>Vayamos al archivo principal y echemos un vistazo a lo que está allí.</p><p>📃<code>main.ts</code></p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> App </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./App.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./index.css</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(App)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><p>Practicamente, el archivo luce como si justo acabaramos de crear un proyecto nuevo.</p><p>Entonces, avancemos agregando las dos importaciones que venimos haciendo y pasemos estos componentes como complementos de Vue.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight has-highlighted-lines"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">createApp</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> App </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./App.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line highlighted"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> AppInput </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/components/AppInput.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line highlighted"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> AppSelect </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/components/AppSelect.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./index.css</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">createApp</span><span style="color:#A6ACCD;">(App)</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">AppInput</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> AppInput)</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">AppSelect</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> AppSelect)  </span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">mount</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#app</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre></div><blockquote><p>No olvidemos eliminar estas importaciones del archivo <code>TasksForm.vue</code> ya que ahí no las necesitaremos.</p></blockquote><p>Desde este momento, cada que vez construyamos un componente genérico vendremos a este archivo y lo agregamos. De esta forma nos ahorraremos muchas líneas de código.</p><h2 id="terminando" tabindex="-1">Terminando <a class="header-anchor" href="#terminando" aria-label="Permalink to &quot;Terminando&quot;">​</a></h2><p>Ya descubrimos que hay varias formas de agregar componentes globales pasándolos como complementos a Vue. Desde la manera más básica, como otras más ordenadas y asíncronas. Hasta llegar a las super mágicas. Usted decidirá cual de ellas utilizar en su momento.</p><p>Pero una vez que los agrega, aquí en el archivo <code>main.ts</code>, puede olvidarse de ellos y dejar que Vue se encargue de todo el trabajo de importar componentes globales por usted. Solo necesita ser consciente de lo que está haciendo y comprender los beneficios que puede aportar el registro global de componentes.</p><p>En nuestra próxima lección, seguiremos construyendo componentes, esta vez, <code>AppCheckbox</code>.</p>`,18),p=[l];function t(r,c,i,D,m,y){return o(),a("div",null,p)}const A=s(n,[["render",t]]);export{F as __pageData,A as default};