export default {
  title: 'Vue-Form',
  description: 'Vue Form.',
  base: '/vue-forms/', //  The default path during deployment / secondary address / base can be used/
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },      
      { text: 'Guía', link: '/guide/introduction' },
      { text: 'CaribesTIC', link: 'https://caribestic.github.io/' },
      { text: 'GitHub', link: 'https://github.com/CaribesTIC/vue-forms' }      
    ],
    sidebar: [{        
        path: '/guide/',      // optional, link of the title, which should be an absolute path and must exist        
        sidebarDepth: 1,    // optional, defaults to 1
        items: [
          { text: 'Introducción', link: '/guide/introduction' },
          { text: 'Preparar Entorno', link: '/guide/prepare-environment' },
          { text: 'Formulario Simple', link: '/guide/simple-form' },
          { text: 'Componente Input', link: '/guide/app-input' },
          { text: 'Componente Select', link: '/guide/app-select' },
          { text: 'Importando Componentes', link: '/guide/importing-components' },
          { text: 'Componente Checkbox', link: '/guide/app-checkbox' },   
          { text: 'Componente Radio', link: '/guide/base-radio' },
          { text: 'Componente RadioGroup', link: '/guide/base-radiogroup' },
          { text: 'Componente Textarea', link: '/guide/app-textarea' },    
          { text: 'Enviando Formularios', link: '/guide/submitting-forms' },
          { text: 'Accesibilidad', link: '/guide/accessibility' },
          { text: 'Identificadores', link: '/guide/identifiers' },
          { text: 'Identificadores', link: '/guide/identifiers' }
        ]
      },{
        text: 'Bonus',
        path: '/tests/',
        collapsible: true,
        collapsed: true,      
        items: [
          { text: 'Testeando Componentes', link: '/tests/testing-components' },
          { text: 'Testeando UniqueID', link: '/tests/unique-id-test' },
          { text: 'Testeando Input', link: '/tests/app-input-test' },
          { text: 'Testeando Select', link: '/tests/app-select-test' },
          { text: 'Testeando Checkbox', link: '/tests/app-checkbox-test' },
          { text: 'Testeando Radio', link: '/tests/app-radio-test' },
          { text: 'Testeando RadioGroup', link: '/tests/app-radiogroup-test' }
        ]
      }
    ]
  }
}
