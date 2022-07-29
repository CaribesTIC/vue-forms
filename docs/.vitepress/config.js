export default {
  title: 'Vue-Form',
  description: 'Vue Form.',
  base: '/vue-forms/', //  The default path during deployment / secondary address / base can be used/
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guide/' },
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
          { text: 'Componente Select', link: '/guide/base-select' },
          { text: 'Importando Componentes', link: '/guide/importing-components' },
          { text: 'Componente Checkbox', link: '/guide/base-checkbox' },
        ]
      }        
    ]
  }
}


