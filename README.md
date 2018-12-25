# my-curriculum-design

课程设计

1.安装依赖

npm i

2.开发环境运行

npm run dev‘

3.打包

npm run build

打包出 dist 静态部署即可

## 技术栈

vue vuex vue-cli router

axios

webpcak

ElementUI

百度地图

## 页面布局

1.login 登录

2.主页

3.图片挂号

4.智能机器人导诊

5.node 爬虫新闻

6.快速挂号

7.个人信息

## 通用

#### 文件命名统一使用小写，单词之间使用中划线连接。

good:

```
product-detail.vue
```

bad:

```
productDetail.vue
```

#### HTML、CSS、JavaScript 统一采用 2 个空格缩进。

good:

```
export default {
  data () {
    return {
      name: ''
    }
  }
}
```

bad:

```
export default {
    data () {
        return {
            name: ''
        }
    }
}
```

####

## [#](http://fed.guahao-inc.com/books/archives/coding-standards#HTML)HTML

#### Class 选择器和属性统一使用小写，单词之间使用中划线连接。

good:

```
<section class="home-banner" data-monitor-index="0"></section>
```

bad:

```
<section class="homeBanner" data-monitorIndex="0"></section>
```

#### HTML 属性使用双引号。

good:

```
<section class="header" monitor="header"></section>
```

bad:

```
<section class='header' monitor='header'></section>
```

## [#](http://fed.guahao-inc.com/books/archives/coding-standards#CSS)CSS

#### CSS 命名统一使用小写，单词之间使用中划线连接。

good:

```
.navigator-title{
  font-size: 14px;
}
```

bad:

```
.navigatorTitle{
  font-size: 14px;
}
```

####

```

```

## [#](http://fed.guahao-inc.com/books/archives/coding-standards#Javascript)Javascript

#### 变量命名使用驼峰动名词接口

good:

```
let setUserName = function () {
  // ...
}
```

bad:

```
let username_set = function () {
  // ...
}
```

#### 优先使用 let、const，方法使用 const + 小写字母，对象、字符串常量使用 const + 大写字母 + 下划线，避免使用 var（var 可重复定义，容易被破坏）

good:

```
let title = 'wedoctor'

const PROJECT_NAME = 'wedoctor'

const setTitle = function () {
  title = 'wedoctor group'
}
```

bad:

```
var title = 'wedoctor'

var project_name = 'wedoctor'

var setTitle = function () {
  title = 'wedoctor group'
}
```

#### 使用单引号包裹字符串，若字符串中有单引号则使用反单引号 ` 包裹字符串。

good:

```
const PARTNER_SUBDOMAIN = 'wx'

const TEXT = `My name is 'Alice'`

const prefixDomain = function (partner) {
  return `https://${partner}.wy.guahao.com`
}
```

bad:

```
const PARTNER_SUBDOMAIN = "wx"

const TEXT = "My name is 'Alice'"

const prefixDomain = function (partner) {
  return "https://" + partner + ".wy.guahao.com"
}
```

#### 注释尽量采用 // 单行注释，除了 jsdoc 避免使用多行注释 /\*\*/。

```
/**
 * 高精度求和运算
 * @params {Number} n xxx
 * @params {Number} m xxx
 */
function add (n, m) {
  // ...
}

// 这是简单的单行注释
add(1, 0.3)
```
