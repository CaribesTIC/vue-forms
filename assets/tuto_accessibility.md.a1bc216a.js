import{_ as e,c as s,o as a,N as n}from"./chunks/framework.4bc26c66.js";const o="/vue-forms/assets/accessibility1.598a293d.jpg",l="/vue-forms/assets/accessibility2.8f293fbc.jpg",g=JSON.parse('{"title":"Accesibilidad","description":"","frontmatter":{},"headers":[],"relativePath":"tuto/accessibility.md"}'),t={name:"tuto/accessibility.md"},p=n(`<h1 id="accesibilidad" tabindex="-1">Accesibilidad <a class="header-anchor" href="#accesibilidad" aria-label="Permalink to &quot;Accesibilidad&quot;">​</a></h1><p>Al final de la última lección, discutimos la importancia de incorporar la accesibilidad en su primera ronda de desarrollo.</p><blockquote><p><strong>No podemos enfatizar esto lo suficiente:</strong> la accesibilidad no es una tarea secundaria a la que regresa después de que su aplicación está funcionando. Es una preocupación principal que debe abordarse como parte de su proceso de desarrollo.</p></blockquote><p>En este curso, decidimos mantenerlo separado por razones educativas, introduciendo un concepto a la vez y construyendo sobre esos conceptos de manera incremental. Ahora tenemos la base conceptual establecida para agregar nuestras funciones de accesibilidad.</p><p>Repasaremos lo que consideramos algunos de los conceptos básicos de accesibilidad que debe tener en cuenta al desarrollar formularios.</p><blockquote><p>Estos conceptos no son técnicamente específicos de Vue, pero aprenderemos cómo aplicarlos en el contexto de nuestros componentes de formulario Vue.</p></blockquote><p><strong>Vamos a sumergirnos.</strong></p><h2 id="tipos-apropiados" tabindex="-1">Tipos apropiados <a class="header-anchor" href="#tipos-apropiados" aria-label="Permalink to &quot;Tipos apropiados&quot;">​</a></h2><p>En <strong>HTML</strong> tenemos una amplia variedad de elementos de entrada para crear nuestros formularios, pero un elemento en particular los gobierna a todos. El <code>input</code> <strong><em>catch-all</em></strong> nos permite la flexibilidad de crear entradas de texto, pero también podemos transformarla en casillas de verificación y botones de opción con la propiedad type.</p><ul><li><code>&lt;input type=&quot;text&quot;&gt;</code></li><li><code>&lt;input type=&quot;checkbox&quot;&gt;</code></li><li><code>&lt;input type=&quot;radio&quot;&gt;</code></li></ul><p>Un error común es ignorar esta propiedad de tipo al crear entradas de texto. La mayoría de nosotros conocemos y usamos comúnmente dos regularmente: <code>type=&quot;email&quot;</code> y <code>type=&quot;password&quot;</code>.</p><p>Cuando usamos un tipo específico en un elemento de entrada, no solo obtenemos un mejor autocompletado para nuestro formulario, sino que también permite a los lectores de pantalla comprender mejor qué tipo de datos queremos recuperar del usuario. Un tipo <code>tel</code>, por ejemplo, proporcionará al usuario en un teléfono móvil un práctico teclado numérico con símbolos de teléfono como <code>+ * #</code>.</p><p>¡Tus usuarios con problemas de movilidad definitivamente te lo agradecerán!</p><p>En pocas palabras: no olvide establecer su <code>type</code>, incluso cuando el <code>input</code> no sea del tipo <code>password</code> o <code>email</code>.</p><p>Aquí hay una tabla de tipos disponibles para un elemento de entrada:</p><table><thead><tr><th style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button" target="_blank" rel="noreferrer"><code>button</code></a></th><th style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local" target="_blank" rel="noreferrer"><code>datetime-local</code></a></th><th style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image" target="_blank" rel="noreferrer"><code>image</code></a></th><th style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/radio" target="_blank" rel="noreferrer"><code>radio</code></a></th><th style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit" target="_blank" rel="noreferrer"><code>submit</code></a></th><th style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/url" target="_blank" rel="noreferrer"><code>url</code></a></th></tr></thead><tbody><tr><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox" target="_blank" rel="noreferrer"><code>checkbox</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email" target="_blank" rel="noreferrer"><code>email</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/month" target="_blank" rel="noreferrer"><code>month</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range" target="_blank" rel="noreferrer"><code>range</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/tel" target="_blank" rel="noreferrer"><code>tel</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/week" target="_blank" rel="noreferrer"><code>week</code></a></td></tr><tr><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color" target="_blank" rel="noreferrer"><code>color</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file" target="_blank" rel="noreferrer"><code>file</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number" target="_blank" rel="noreferrer"><code>number</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/reset" target="_blank" rel="noreferrer"><code>reset</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text" target="_blank" rel="noreferrer"><code>text</code></a></td><td style="text-align:center;">...</td></tr><tr><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date" target="_blank" rel="noreferrer"><code>date</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/hidden" target="_blank" rel="noreferrer"><code>hidden</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password" target="_blank" rel="noreferrer"><code>password</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search" target="_blank" rel="noreferrer"><code>search</code></a></td><td style="text-align:center;"><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time" target="_blank" rel="noreferrer"><code>time</code></a></td><td style="text-align:center;">...</td></tr></tbody></table><h2 id="usar-conjunto-de-campos-y-leyenda" tabindex="-1">Usar Conjunto de Campos y Leyenda <a class="header-anchor" href="#usar-conjunto-de-campos-y-leyenda" aria-label="Permalink to &quot;Usar Conjunto de Campos y Leyenda&quot;">​</a></h2><blockquote><p>Dos elementos a menudo pasados por alto o poco enseñados en <strong>HTML</strong> son el <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset" target="_blank" rel="noreferrer">conjunto de campos</a> y la <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend" target="_blank" rel="noreferrer">leyenda</a>.</p></blockquote><p>En los formularios, generalmente agrupamos nuestroas entradas de forma lógica. Por ejemplo, normalmente codificaría su formulario para que primero le pida al usuario sus datos personales como Nombre, Apellido y Teléfono. Más adelante, otra sección puede pedirles una dirección de envío.</p><p>Para los <a href="https://www.w3.org/WAI/fundamentals/accessibility-usability-inclusion/" target="_blank" rel="noreferrer">usuarios accesibles</a>, es posible que esta información no esté disponible inmediatamente sin tener que pasar por todo el formulario, aquí es donde entran en juego <code>&lt;fieldset&gt;</code> y <code>&lt;legend&gt;</code>.</p><p>Siempre debe intentar envolver secciones de su formulario dentro de un elemento <code>fieldset</code>. Esto agrupará lógicamente las entradas dentro de él. Luego, el primer elemento del conjunto de campos será un elemento <code>legend</code> que proporcionará un <strong>Título</strong> para ese conjunto de campos en particular.</p><p>Si por alguna razón no desea que la leyenda se muestre en su formulario (generalmente por razones de diseño), siempre puede colocarla de manera absoluta, fuera de la pantalla visible.</p><p>Para nuestro formulario actual en <code>TasksForm.vue</code>, podemos envolver nuestras secciones lógicas dentro de <code>fieldset</code> como en el siguiente ejemplo:</p><p>📃<code>TasksForm.vue</code></p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight has-highlighted-lines"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// omitted for brevity ...</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@submit.prevent</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">sendForm</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">AppSelect</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">:options</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">frequencies</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">form.frequency</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">label</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Select a frequency</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    /&gt;</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">fieldset</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">        </span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">legend</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Name &amp; describe your task</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">legend</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">AppInput</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">form.name</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">label</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Name</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">text</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">      /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">AppTextarea</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">form.description</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#C792EA;">label</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Description</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">      </span></span>
<span class="line"><span style="color:#89DDFF;">      /&gt;</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">fieldset</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">fieldset</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">legend</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Task situation</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">legend</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">AppRadioGroup</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">form.situation</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#C792EA;">name</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">situation</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#C792EA;">:options</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">situationOptions</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">fieldset</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">fieldset</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">legend</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Supervision</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">legend</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">AppCheckbox</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">form.supervision.reviewed</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#C792EA;">label</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Reviewed</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">AppCheckbox</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">form.supervision.approved</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">          </span><span style="color:#C792EA;">label</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Approved</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">        /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line highlighted"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">fieldset</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">btn btn-primary</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">submit</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">    &gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      Submit</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">form</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Podemos agregar una etiqueta de estilo para eliminar los bordes y márgenes predeterminados, y diseñar las etiquetas de leyenda como teníamos antes con los encabezados.</p><p>📃<code>TasksForm.vue</code></p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">setup</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// omitted for brevity ...</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">&lt;!-- omitted for brevity ... --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">scoped</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#FFCB6B;">fieldset</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">  @apply border-0 m-0 p-0</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">legend</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  @apply text-2xl font-semibold my-4</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Cabe señalar que <strong>FireFox</strong> tiene una herramienta de inspección de <code>Accessibility</code> muy buena.</p><p>Revisando la pestaña de <code>Accessibility</code>, puede ver como ahora la agrupación lógica de nuestro formulario será entendida por los lectores de pantalla.</p><p><img src="`+o+'" alt="accessibility"></p><h2 id="no-confie-en-placeholders" tabindex="-1">NO confíe en <code>placeholders</code> <a class="header-anchor" href="#no-confie-en-placeholders" aria-label="Permalink to &quot;NO confíe en `placeholders`&quot;">​</a></h2><blockquote><p>Un patrón de diseño popular que surgió hace unos años usaba el atributo <a href="https://developer.mozilla.org/es/docs/Web/CSS/::placeholder" target="_blank" rel="noreferrer"><code>placeholders</code></a> de las entradas para describir el tipo de contenido que esperaba el elemento. Lamentablemente, esto todavía se usa a veces en la actualidad en lugar de una etiqueta adecuada.</p></blockquote><p>Los <code>placeholders</code> solo deben usarse para describir el valor previsto, pero no como reemplazo de una etiqueta descriptiva. Los <code>placeholders</code> desaparecen cada vez que un usuario comienza a escribir en el campo, lo que obliga al usuario a tener en cuenta lo que esperaba ese campo. Además, algunos usuarios pueden tener problemas para diferenciar entre un campo con un <code>placeholders</code> y un campo que tiene contenido rellenado o rellenado previamente.</p><p>En lo que respecta a los lectores de pantalla, cada lector de pantalla puede tratar el atributo <code>placeholders</code> de manera diferente, pero siempre que haya una <code>lebel</code> establecido correctamente, no debería ser una gran preocupación dejarlo.</p><h2 id="labels" tabindex="-1">Labels <a class="header-anchor" href="#labels" aria-label="Permalink to &quot;Labels&quot;">​</a></h2><p>Hablando de etiquetas, hablemos de una característica de accesibilidad realmente poderosa que, lamentablemente, se usa muy poco o mal en los formularios.</p><p>Si navegamos a <strong>FireFox</strong> nuevamente en la pestaña de <code>Accessibility</code> e inspeccionamos nuestra entrada <strong>Name</strong>, podemos ver un ícono ⚠️ justo al lado. Esto significa que tenemos un problema.</p><p><img src="'+l+`" alt="accessibility"></p><p>Echemos un vistazo al panel de información. La sección <code>Checks</code> ya nos dice el problema: <strong><em>“Form elements should have a visible text label”</em></strong>.</p><p>Esto puede ser una sorpresa, ya que nuestro campo <strong>&#39;Name&#39;</strong> claramente tiene una etiqueta encima que describe lo que pretendemos para esta entrada.</p><p>Para nuestros usuarios videntes, sin embargo, esto no es evidente. Todavía no hemos vinculado estos dos elementos <strong>HTML</strong>, y esa es una suposición que un lector de pantalla no puede darse el lujo de hacer. ¡Afortunadamente, esta es una solución muy fácil!</p><p>Hay algunas formas de vincular un elemento <code>input</code> con su <code>label</code>, la primera es anidar el <code>input</code> dentro del elemento de <code>label</code>.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  Title</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">input</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>Esta es una de las formas más fáciles de asegurarse de que su <code>input</code> siempre esté correctamente vinculado al <code>label</code> relacionado, pero queremos profundizar en la segunda y generalmente más <em>&quot;común&quot;</em> forma de relacionar elementos <strong>HTML</strong> porque será útil más adelante cuando veamos los <a href="./../tuto/accessible-errors.html">Errores Accesibles</a>. Este método implica el uso de identificaciones.</p>`,45),r=[p];function c(i,d,D,y,F,u){return a(),s("div",null,r)}const b=e(t,[["render",c]]);export{g as __pageData,b as default};