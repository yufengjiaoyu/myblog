module.exports = {
    theme: 'reco',
    title: "Welcome to my blog",
    description: '学会三天  学好三年',

   
    // 移动端优化
    head: [

      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
      ['link', {rel:'icon', href:'/title.png'}]
  
    
    ],
    // 主题设置
    themeConfig: {



      record: '网页在线工具',
      recordLink: 'http://tool.mkblog.cn/',



      type: 'blog',
      author: 'Kevin.Cai',
      // 显示在个人信息的头像
      authorAvatar: '/avatar.jpg',
      // 导航栏左侧logo
      logo: '/avatar.jpg',
      // 搜索设置
      search: true,
      searchMaxSuggestions: 10,
      // 自动形成侧边导航及其深度
      subSidebar: 'auto',
      sidebarDepth: 1,
      // 最后更新时间
      lastUpdated: 'Last Updated',
      // 项目开始时间
      startYear: '2021',
      // 导航栏配置
      nav: [
        { text: 'Home', link: '/', icon: 'reco-home' },
        { text: '时间线', link: '/timeline/', icon: 'reco-date' },
        //{ text: 'GitHub', link: 'https://github.com/smallsunnyfox/vuepress-theme-reco-starter', icon: 'reco-github' }
      ],
      // 博客配置
      blogConfig: {
        category: {
          location: 2,     // 在导航栏菜单中所占的位置，默认2
          text: '学习足迹' // 默认文案 “分类”
        },
        tag: {
          location: 3,     // 在导航栏菜单中所占的位置，默认3
          text: 'Tag'      // 默认文案 “标签”
        }
      },
      // 友情链接
      friendLink: [
        // {
        //   title: '午后南杂',
        //   desc: 'Enjoy when you can, and endure when you must.',
        //   logo: 'https://assets.smallsunnyfox.com/images/reco.png',
        //   link: 'https://www.recoluan.com'
        // },
        {
          title: '刘德华',
          desc: '我帅不在这里，在我后面的灵魂。',
          logo: '/ldh.jpg',
          link: 'https://www.andylau.com',
        },

        {
          title: '古天乐',
          desc: '凡事尽能力去做，只要肯尽力去做，彼岸自然达到',
          logo: '/gtl.jpg',
          link: 'https://www.kootinlok.com/',
        },

        {
          title: 'java学习地址',
          desc: '可以边学边练习，知识点比较全面',
          logo: '/java.png',
          link: 'https://how2j.cn/',
        },
        {
          title: 'android学习地址',
          desc: '可以边学边做练习，解决练习时到处寻找图片资源文件的烦恼',
          logo: '/az.jpg',
          link: 'https://www.twle.cn/l/yufei/android/android-basic-index.html',
        },




        // {
        //   title: 'vuepress-theme-reco',
        //   desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        //   logo: "https://assets.smallsunnyfox.com/images/theme_reco.png",
        //   link: 'https://vuepress-theme-reco.recoluan.com'
        // }
      ],

      //评论功能
      valineConfig: {
        appId: 'd1d5h4GsmghkGhEAvSHknnFf-gzGzoHsz',// your appId
        appKey: 'WVU78zEzrSvdO6P3afO67oO1', // your appKey
        placeholder:'亲，留下你的脚印吧！！',
        avatar:'wavatar',
        visitor:true,
        avatarForce:true,
      }



    },
    // 插件配置
    plugins: [
      [
        'permalink-pinyin',
        {
          lowercase: true,
          separator: '-'
        }
      ]
    ]
  }