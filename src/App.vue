<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
  // 去除默认样式
  body, html, div, blockquote, img, label, p, h1, h2, h3, h4, h5, h6, pre, ul, ol,
  li, dl, dt, dd, form, a, fieldset, input, th, td
  {margin: 0; padding: 0; border: 0; outline: none;}
  ul, ol{list-style: none;}
  a{color: #1890ff;text-decoration: none;}
  a:hover{text-decoration: none;}

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  /* flex布局 */
  .flex_start {
    display: flex;
    justify-content: flex-start;
  }

  .flex_start_v {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .flex_end {
    display: flex;
    justify-content: flex-end;
  }

  .flex_end_v {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .flex_between {
    display: flex;
    justify-content: space-between;
  }

  .flex_between_v {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .flex_around {
    display: flex;
    justify-content: space-around;
  }

  .flex_around_v {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .vertical_v {
    display: flex;
    align-items: center;
  }

  /* 单行省略号 */
  .overEllipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

</style>
