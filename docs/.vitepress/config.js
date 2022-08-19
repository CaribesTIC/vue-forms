export default {
  title: 'Vue-Form',
  description: 'Vue Form.',
  base: '/vue-forms/', //  The default path during deployment / secondary address / base can be used/
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },      
      { text: 'Tutorial', link: '/tuto/introduction' },
      { text: 'CaribesTIC', link: 'https://caribestic.github.io/' },
      { text: 'GitHub', link: 'https://github.com/CaribesTIC/vue-forms' }      
    ],
    sidebar: [{
        text: 'Tutorial',        
        path: '/tuto/',      // optional, link of the title, which should be an absolute path and must exist        
        collapsible: true,
        collapsed: false, 
        items: [
          { text: 'Introducción', link: '/tuto/introduction' },
          { text: 'Preparar Entorno', link: '/tuto/prepare-environment' },
          { text: 'Formulario Simple', link: '/tuto/simple-form' },
          { text: 'Componente Input', link: '/tuto/app-input' },
          { text: 'Componente Select', link: '/tuto/app-select' },
          { text: 'Componentes Globales', link: '/tuto/global-components' },
          { text: 'Componente Checkbox', link: '/tuto/app-checkbox' },   
          { text: 'Componente Radio', link: '/tuto/app-radio' },
          { text: 'Componente RadioGroup', link: '/tuto/app-radiogroup' },
          { text: 'Componente Textarea', link: '/tuto/app-textarea' },    
          { text: 'Enviando Formularios', link: '/tuto/submitting-forms' },
          { text: 'Accesibilidad', link: '/tuto/accessibility' },
          { text: 'Identificadores', link: '/tuto/identifiers' },
          { text: 'Errores Accesibles', link: '/tuto/accessible-errors' },
          { text: 'Componente ErrorMessage', link: '/tuto/error-message' }     
        ]
      },{
        text: 'Bonus',
        path: '/bonus/',
        collapsible: true,
        collapsed: true,      
        items: [
          { text: 'Testeando Componentes', link: '/bonus/testing-components' },
          { text: 'Testeando UniqueID', link: '/bonus/unique-id-test' },
          { text: 'Testeando Input', link: '/bonus/app-input-test' },
          { text: 'Testeando Select', link: '/bonus/app-select-test' },
          { text: 'Testeando Checkbox', link: '/bonus/app-checkbox-test' },
          { text: 'Testeando Radio', link: '/bonus/app-radio-test' },
          { text: 'Testeando RadioGroup', link: '/bonus/app-radiogroup-test' },
          { text: 'Testeando Form', link: '/bonus/form-test' },
          { text: 'Testeando ErrorMessage', link: '/bonus/app-error-message-test' },
          { text: 'Testeando Button', link: '/bonus/app-button-test' }
        ]
      }
    ]
  }
}
