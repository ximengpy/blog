<!-- canvas -->
<template>
  <div>
    <vue-particles
      class="canvass"
      color="#a4d2df"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="3"
      linesColor="#a4d2df"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity=".6"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      />
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {

    }
  }
}
</script>

<style lang="less">
    .canvass {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 99;
    }
</style>
