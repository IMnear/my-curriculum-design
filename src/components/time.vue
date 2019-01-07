<template>
  <div class="wrapper">
    <header>
      <input type="text"
             autofocus
             placeholder="Enter a task..."
             id="item">
      <div id='animationDiv'><button id="add">
          <svg version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink"
               x="0px"
               y="0px"
               viewBox="0 0 16 16"
               style="enable-background:new 0 0 16 16;"
               xml:space="preserve">
            <g>
              <path class="fill"
                    d="M16,8c0,0.5-0.5,1-1,1H9v6c0,0.5-0.5,1-1,1s-1-0.5-1-1V9H1C0.5,9,0,8.5,0,8s0.5-1,1-1h6V1c0-0.5,0.5-1,1-1s1,0.5,1,1v6h6C15.5,7,16,7.5,16,8z" />
            </g>
          </svg>
        </button></div>
    </header>
    <div class="container">
      <ul class="todo"
          id="todo">

      </ul>
      <hr class="divider">
      <ul class="todo"
          id="completed">

      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-time',
  props: ['title', 'list'],
  data () {
    return {
      msg: '新闻',
      tofather: ''
    }
  },
  created: function () {
  },
  methods: {
    doHeader () {
      console.log('这是头')
    },
    imgchange () {
      console.log('进入')
      let preview = this.$refs.myimg
      // 获取得到file 对象
      var file = this.$refs.imginput
      // 限制上传图片的大小
      if (file.size > 1024 * 1024 * 2) {
        alert('图片大小不能超过 2MB!')
        return false
      }
      // 创建url
      var imgUrl = this.$window.URL.createObjectURL(file)
      preview.setAttribute('src', imgUrl)
      // 更改img url 以后释放 url
      preview.onload = function () {
        // console.log('图片加载成功')
        URL.revokeObjectURL(imgUrl)
      }
    }
  }
}
</script>

<style scoped>
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  vertical-align: baseline;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body,
html {
  width: 100%;
  height: 100%;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: none;
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
ol,
ul {
  list-style: none;
}
hr {
  border: 0;
  height: 1px;
  background: #ccc;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}
html,
input,
select,
textarea,
button,
a {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
  background: rgb(228, 228, 228);
  padding: 20px 0 0 0;
}

div.wrapper {
  background: #a99a92;
  margin: 0px auto auto auto;
  border-radius: 20px;
  box-shadow: 0 6px 30px 18px rgba(199, 199, 199, 0.75);
  transition: transform 0.3s ease-in;
}

div.wrapper:hover {
  transform: scale(1.01);
}

@media only screen and (min-width: 800px) {
  div.wrapper {
    width: 45%;
    height: 95%;
  }
}

@media only screen and (min-width: 900px) {
  div.wrapper {
    width: 40%;
    height: 95%;
  }
}

@media only screen and (min-width: 1100px) {
  div.wrapper {
    width: 35%;
    height: 95%;
  }
}

header {
  width: 100%;
  height: 80px;
  position: relative;
  top: 0; /* needed to keep on top */
  bottom: 0;
  padding: 15px;
  z-index: 5;
  background: #b43f3f;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  box-shadow: 0 2px 8px rgba(41, 10, 77, 0.5);
}

header input {
  font-family: Arial;
  width: 100%;
  font-size: 1rem;
  height: 50px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  float: left;
  padding-right: 70px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fdfdfd;
  text-indent: 2%;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  transition: all 0.5s ease;
}

header input:focus {
  background: rgba(35, 14, 87, 0.5);
}

header input::-moz-placeholder {
  color: white;
}

header div#animationDiv {
  /*being used for mojs animation*/
  height: 50px;
  position: absolute;
  right: 15px;
  width: 50px;
}

header button {
  width: 50px;
  height: 50px;
  position: absolute;

  /*top: 15px; optional, it is so by default and right not needed as applied on parent! :D */
  border: 0px;
  outline: 0px;
  border-color: transparent;
  outline-style: 0px;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  z-index: 1; /*to ensure its on top of container*/
  box-shadow: -2px 2px 5px rgba(41, 10, 77, 0.5);

  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;

  transition: all 0.2s ease;
}

header button:hover {
  box-shadow: none;
  transform: scale(0.9);
}

header button:active {
  background: rgba(191, 165, 223, 0.3);
  outline: none;
  outline-width: 0;
  outline-color: transparent;
}

input:focus {
}

header button svg {
  width: 40%;
  height: 40%;
  position: relative;
  top: 5%;
  fill: #b43f3f;
  z-index: 5;
}

header button.rotate {
  transform: rotate(180deg);
  transition: all 0.3s ease;
}

div.container {
  width: 100%;
  float: left;
}

ul.todo {
  list-style: none;
}

ul.todo li {
  background: #fff;
  color: #b43f3f;
  padding: 15px;
  margin: 15px 15px 15px 15px;
  border-radius: 8px 0 8px 0;
  box-shadow: -2px 2px 4px rgba(41, 10, 77, 0.5);
  transition: all 0.2s ease-in;
  transition: opacity 0.3s ease-out;
  transition: opacity 0.2s ease-in;
  /* transition: height 0.3s ease-in; */
  max-height: 50px;
  opacity: 1;
  position: relative; /* so we can absolute the buttons*/
}

ul.todo li.deleted,
ul.todo li.invisible {
  opacity: 0;
}

ul.todo li:hover {
  transform: scale(0.995);
  box-shadow: none;
  background: rgb(255, 241, 219);
  background: -moz-linear-gradient(
    left,
    rgb(255, 231, 194),
    rgb(255, 244, 228)
  );
  background: -webkit-linear-gradient(
    left,
    rgb(255, 231, 194),
    rgb(255, 244, 228)
  );
  background: -o-linear-gradient(left, rgb(255, 231, 194), rgb(255, 244, 228));
}

ul.todo li:last-of-type {
  margin-bottom: 0;
}

ul.todo li .buttons {
  position: absolute;
  width: 100px;
  height: 50px;
  top: 0;
  right: -1%;
}

ul.todo li .buttons button {
  width: 30px;
  height: 30px;

  margin: 10px 0 0 0;

  float: left;
  background: none;
  position: relative;
  border: 0px;
  outline: none;
  cursor: pointer;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
}

ul.todo li .buttons button:last-of-type::before {
  content: " ";
  width: 1px;
  height: 30px;
  background: #edf0f1;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: -20;
}

ul.todo li .buttons button svg {
  width: 22px;
  height: 22px;
}

ul.todo li .buttons button svg .fill {
  transition: all 0.3s ease-out;
}

ul.todo li .buttons button.deleteButton svg .fill {
  fill: #c0cecb;
}

ul.todo li .buttons button.checkButton svg .fill {
  fill: rgb(47, 167, 77);
}

ul.todo li .buttons button.checkButton svg .noFill {
  fill: none;
}

ul.todo:not(#completed) li .buttons button.checkButton:hover svg .noFill,
ul.todo#completed li .buttons button.checkButton svg .noFill {
  fill: rgb(84, 201, 113);
}

ul.todo:not(#completed) li .buttons button.checkButton:hover svg .fill,
ul.todo#completed li .buttons button.checkButton svg .fill {
  fill: #fff;
}

ul.todo li .buttons button.deleteButton:hover svg .fill {
  fill: rgb(201, 41, 41);
}

hr.divider {
  width: 50%;
  margin: 20px auto 5px auto;
}

#completed {
  opacity: 0.5;
}

#checkAnimateDiv {
  width: 1px;
  height: 1px;
  z-index: -10;
  position: relative;
  bottom: 12px;
  left: 15px;
}
</style>
