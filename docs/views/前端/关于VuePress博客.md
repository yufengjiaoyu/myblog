---
title: 关于VuePress博客
date: 2021-09-05
sidebar: auto
tags:
 - vuepress
 - node.js

 
categories:
 - 前端

---

## 1.初识vuepress 

某次搜资料的时候进入到一个博客页面，觉得那个网站的UI挺漂亮的（比我这个要生动很多，我这个后续有时间会再加入一些插件继续完善），更惊讶的是我搜的那篇文章阅读量才几千，居然能被我搜到。了解后才知道vuepress不仅对SEO进行了优化而且具有良好的加载性能，页面只在用户浏览到的时候才按需加载。从自己真的动手搭建，到项目在本地运行这个过程其实挺快的，也没遇到啥困难，只是在部署的时候踩了一点坑。



##  2. 关于首页打字机效果

在 VuePress 中,所有在 .vuepress/components 中找到的 *.vue 文件将会自动地被注册为全局的异步组件,如：

```js
.
└─ .vuepress
   └─ components
      ├─ demo-1.vue
      ├─ OtherComponent.vue
      └─ Foo
         └─ Bar.vue
```

以直接使用这些组件在任意的 Markdown 文件中（组件名是通过文件名提取到的）：

```js
<demo-1/>
<OtherComponent/>
<Foo-Bar/>
```

在 components 目录下新建一个 `NewFont.vue` 文件，并填入以下代码：

```vue
<template>
  <div></div>
</template> 
```

```vue
<script>
export default {
  name: "",
  data() {
    return {
      strs: [
        {
          title: "有一份热，发一份光",
          // 停顿的位置
          stop: 5,
          // stop: [4, 13] // 可以是数组，多几个位置停顿
        },
        {
          title: "就如萤火一般",
        },
        {
          title: "也可以在黑暗里发一点光",
        },
        {
          title: "不必等候炬火",
        },
        {
          title: "此后如竟没有炬火",
        },
        {
          title: "我便是唯一的光",
        },
        {
          title: "愿与所有中国青年共勉",
        },
      ],
      // 当前进行到第几行
      currentIndex: 0,
      spans: null,
      el: null,
    };
  },
  mounted() {
    this.el = document.querySelector(".hero .description");

    if (!this.el) {
      let that = this;
      const timer = setInterval(() => {
        if (this.el) {
          timer && clearInterval(timer);
          that.init();
        }
        this.el = document.querySelector(".hero .description");
      }, 100);
    } else {
      this.init();
    }
  },
  methods: {
    init() {
      if (this.currentIndex == this.strs.length) {
        this.currentIndex = 0;
      }
      this.el.innerHTML = this.strs[this.currentIndex].title;
      this.el.innerHTML = this.el.textContent.replace(/\S/g, "<span>$&</span>");

      let delay = 0;
      this.spans = [...document.querySelectorAll(".hero .description span")];
      this.spans.forEach((span, i) => {
        delay += 0.1;
        if (this.strs[this.currentIndex].hasOwnProperty("stop")) {
          if (this.strs[this.currentIndex].stop instanceof Array) {
            if (this.strs[this.currentIndex].stop.includes(i)) {
              delay += 0.3;
            }
          } else {
            if (this.strs[this.currentIndex].stop == i) {
              delay += 0.3;
            }
          }
        }

        span.style.setProperty("--delay", `${delay}s`);
      });

      this.el.addEventListener("animationend", this.lastEnd);
    },

    lastEnd(e) {
      if (
        e.target == document.querySelector(".hero .description span:last-child")
      ) {
        this.el.classList.add("ended");
        setTimeout(() => {
          this.el.removeEventListener("animationend", this.lastEnd);
          let delay = 0;

          this.spans.reverse().forEach((span, i) => {
            this.el.classList.remove("ended");
            span.style.width = "2ch";
            span.style.animation = "0.1s text-out ease-in-out forwards";
            delay += 0.05;

            // 回去停顿功能
            // if (this.strs[this.currentIndex].hasOwnProperty("stop")) {
            //   if (this.strs[this.currentIndex].stop instanceof Array) {
            //     if (
            //       this.strs[this.currentIndex].stop.includes(
            //         this.spans.length - i
            //       )
            //     ) {
            //       delay += 0.3;
            //     }
            //   } else {
            //     if (
            //       this.strs[this.currentIndex].stop ==
            //       this.spans.length - i
            //     ) {
            //       delay += 0.3;
            //     }
            //   }
            // }

            span.style.animationDelay = `${delay}s`;
          });
          this.el.addEventListener("animationend", this.firstEnd);
        }, 2000);
      }
    },

    firstEnd(e) {
      if (
        e.target ==
        document.querySelector(".hero .description span:first-child")
      ) {
        this.spans.forEach((v) => {
          v.remove();
        });
        this.el.removeEventListener("animationend", this.firstEnd);
        this.currentIndex++;
        this.init();
      }
    },
  },
};
</script>
```

```styl
<style >
.hero .description {
  margin: 0;
  padding: 0;
  /* 必须是等宽字体 */
  /* 由于是等宽字体，1ch 等于 任何数字、英文、符号的宽度 */
  font-family: monospace;
  position: relative;
  width: fit-content;
}

.hero .description::after {
  content: "";
  display: inline;
  position: absolute;
  width: 2px;
  height: 2ch;
  top: 9%;
  background-color: #000;
  border-radius: 2px;
  right: -0.5ch;
}

.hero .description.ended::after {
  animation: 1.1s cursor steps(2, jump-none) infinite;
}

.home-blog .hero .description span {
  --delay: 10s;
  display: inline-block;
  overflow: hidden;
  width: 0ch;
  animation: 0.1s text-in ease-in-out forwards;
  animation-delay: var(--delay);
  font-weight: 600;
}

@keyframes text-in {
  from {
    width: 0ch;
  }

  to {
    /* 必须是等宽字体 */
    /* 由于是等宽字体，1ch 等于 任何数字、英文、符号的宽度 */
    /* 中文2ch，英文1ch */
    width: 2ch;
  }
}

@keyframes text-out {
  from {
    /* 中文2ch，英文1ch */
    width: 2ch;
  }

  to {
    width: 0ch;
  }
}

@keyframes cursor {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style> 
```

​      接下来在首页文件 README.md 文件中应用即可。

## 3 .部署发布踩的坑

第一次部署按以下步骤进行挺顺利的：

①搭建服务器环境

②从github仓库中把代码拉到本地

③运行项目：不能跟本地运行一样用`npm run docs:dev`,这种运行方式，不能`ctrl+d`退出，，进程会被杀死，项目一旦运行无法对服务器进行其他操作，需要以nohup的方式启动：在项目目录下新建一个脚本如下：

```shell
$ touch start.sh

# 授予权限
$ chmod 775 start.sh

# 编辑启动脚本
$ vim start.sh
# 切入源码目录，以确保能正常执行

```

```shell
# 切入源码目录，以确保能正常执行

cd /home/www/mgblog

# 拉取最新代码

git fetch --all
git reset --hard origin/master
git pull

# 杀死目前已启动进程

ID=`ps -ef|grep node | grep vuepress|awk '{print $2}'`
echo --- the process is $ID ---
kill -9  $ID
echo  "Killed $ID"

npm install vuepress -s

# 启动

nohup npm run docs:dev&


curl http://localhost:81
```

坑一：拉代码时如果只用`git pull` 更新的代码拉不下来，只好让Git中的代码强行覆盖本地代码

坑二：拉完新代码后，项目运行报错，网上的方法都是初始化node，重装node，搞了差不多两个小时都没搞定，于是把本地的项目全部删掉，重新clone代码，还是报错。最后重装vuepress解决问题，于是把重装vuepress写进了脚本。