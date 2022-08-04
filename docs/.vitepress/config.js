export default {
  title: 'Vue-Form',
  description: 'Vue Form.',
  base: '/vue-forms/', //  The default path during deployment / secondary address / base can be used/
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guide/introduction' },
      { text: 'GitHub', link: 'https://github.com/CaribesTIC/vue-forms' }      
    ],
    sidebar: [{        
        path: '/guide/',      // optional, link of the title, which should be an absolute path and must exist        
        sidebarDepth: 1,    // optional, defaults to 1
        items: [
          { text: 'Introducción', link: '/guide/introduction' },
          { text: 'Preparar Entorno', link: '/guide/prepare-environment' },
          { text: 'Formulario Simple', link: '/guide/simple-form' },
          { text: 'Componente Input', link: '/guide/base-input' },
          { text: 'Testeando Input', link: '/guide/base-input-test' },
          { text: 'Componente Select', link: '/guide/base-select' },
          { text: 'Importando Componentes', link: '/guide/importing-components' },
          { text: 'Componente Checkbox', link: '/guide/base-checkbox' },
          { text: 'Componente Radio', link: '/guide/base-radio' },
          { text: 'Componente RadioGroup', link: '/guide/base-radiogroup' },
          { text: 'Enviando Formularios', link: '/guide/submitting-forms' },
          { text: 'Accesibilidad', link: '/guide/accessibility' },
          { text: 'Identificadores', link: '/guide/identifiers' },
        ]
      }        
    ]
  }
}


