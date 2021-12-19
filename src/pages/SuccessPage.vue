<template>
  <div class="success__body">
    <h1>
      {{ message }}
    </h1>

    <router-link to="home">Continue trading!</router-link>
  </div>
</template>

<script>
export default {
  name: "SuccessPage",
  props: {
    message: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
  .success__body {
    max-width: 600px;
    width: 90%;
    margin: 0 auto;
    text-align: center;
  }
  h1 {
    color: #fff;
    margin-bottom: 20px;
    font-size: 44px;
    line-height: 52px;
  }

  a {
    background: #fe9a01;
    padding: 15px 30px;
    -webkit-border-radius: 25px;
    -moz-border-radius: 25px;
    border-radius: 25px;
    color: #fff;
    text-decoration: none;
    display: inline-block;
    font-weight: bold;
    &:hover {
      background: #e17b00;
    }
  }
</style>