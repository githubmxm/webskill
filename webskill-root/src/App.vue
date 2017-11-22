<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
form,
fieldset,
input,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
body {
  font: 12px "Microsoft YaHei";
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
textarea {
  resize: none;
}
fieldset,abbr,
acronym {
  border: 0;
}
img {
  vertical-align: bottom;
  border-style: none;
  border: 0 none;
  outline: none;
}
address,
caption,
cite,
code,
dfn,
th,
var {
  font-style: normal;
  font-weight: normal;
}
ol,
ul {
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}
i {
  font-style: normal;
}
.clear {
  zoom: 1;
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}
a {
  text-decoration: none;
  cursor: pointer;
}
a:focus,
input:focus,
textarea:focus,
select:focus {
  outline-style: none;
}
</style>
