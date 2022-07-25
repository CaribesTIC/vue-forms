module.exports = {
  title: 'Vue-Form',
  description: 'Vue Form.',
  base: '/laravuel-apispa/', //  The default path during deployment / secondary address / base can be used/
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Guía', link: '/guide/' },
      { text: 'GitHub', link: 'https://github.com/CaribesTIC/laravuel-apispa' }      
    ],
    sidebar: [{
        text: 'Comenzar',   // required
        path: '/guide/',      // optional, link of the title, which should be an absolute path and must exist        
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          { text: 'Introducción', link: '/guide/introduction' },
          { text: 'Preparar Entorno', link: '/guide/prepare-environment' },
          { text: 'Formulario Simple', link: '/guide/simple-form' },
          { text: 'Base Input', link: '/guide/base-input' }      
        ]
      }        
    ]
  }
}


