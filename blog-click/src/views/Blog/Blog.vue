<template>
  <div class="blog">
    <Container />
  </div>
</template>
<script>
import Container from '../../components/blog/Container'
export default {
  name: 'Blog',
  components: {
    Container,
    // Header
  }
}
</script>
<style lang="less" scoped>
.blog {
  position: relative;
  width: 100%;
  height: 100%;

  // background-image: url("../../assets/images/7.jpg");
  // background-repeat: no-repeat;
  // background-position: right bottom;
  // background-attachment: fixed;
  // background-size: 100% 100%;
  background-color: rgba(221, 238, 255, 0.5)

}
</style>
