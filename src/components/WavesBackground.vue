<template>
  <!--运动的几何图形背景-->
  <div class="bloglo-waves-wrapper">
    <div class="squares">
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
      <div class="square"></div>
    </div>
    <div class="triangles">
      <div class="triangle"></div>
      <div class="triangle"></div>
      <div class="triangle"></div>
      <div class="triangle"></div>
      <div class="triangle"></div>
    </div>
    <div class="circles">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WavesBackground",
};
</script>

<style scoped>
.bloglo-waves-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: -1;
}

.bloglo-waves-wrapper .circle,
.bloglo-waves-wrapper .triangle,
.bloglo-waves-wrapper .square {
  position: absolute;
  bottom: -100px;
  width: 40px;
  height: 40px;
  background: var(--bloglo-primary_15);
  border-radius: 5px;
  opacity: 0.1;
  animation: rise 10s infinite ease-in;
}

.bloglo-waves-wrapper .square:nth-child(1) {
  width: 40px;
  height: 40px;
  left: 10%;
  animation-duration: 8s;
}

.bloglo-waves-wrapper .square:nth-child(2) {
  width: 20px;
  height: 20px;
  left: 20%;
  animation-duration: 5s;
  animation-delay: 1s;
}

.bloglo-waves-wrapper .square:nth-child(3) {
  width: 50px;
  height: 50px;
  left: 35%;
  animation-duration: 7s;
  animation-delay: 2s;
}

.bloglo-waves-wrapper .square:nth-child(4) {
  width: 80px;
  height: 80px;
  left: 50%;
  animation-duration: 11s;
  animation-delay: 0s;
}

.bloglo-waves-wrapper .square:nth-child(5) {
  width: 35px;
  height: 35px;
  left: 55%;
  animation-duration: 6s;
  animation-delay: 1s;
}

.bloglo-waves-wrapper .square:nth-child(6) {
  width: 45px;
  height: 45px;
  left: 65%;
  animation-duration: 8s;
  animation-delay: 3s;
}

.bloglo-waves-wrapper .square:nth-child(7) {
  width: 90px;
  height: 90px;
  left: 70%;
  animation-duration: 12s;
  animation-delay: 2s;
}

.bloglo-waves-wrapper .square:nth-child(8) {
  width: 25px;
  height: 25px;
  left: 80%;
  animation-duration: 6s;
  animation-delay: 2s;
}

.bloglo-waves-wrapper .square:nth-child(9) {
  width: 15px;
  height: 15px;
  left: 70%;
  animation-duration: 5s;
  animation-delay: 1s;
}

.bloglo-waves-wrapper .square:nth-child(10) {
  width: 90px;
  height: 90px;
  left: 25%;
  animation-duration: 10s;
  animation-delay: 4s;
}

.bloglo-waves-wrapper .triangle {
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.bloglo-waves-wrapper .triangle:nth-child(1) {
  width: 20px;
  height: 22px;
  left: 50%;
  animation-delay: 0s;
}

.bloglo-waves-wrapper .triangle:nth-child(2) {
  width: 30px;
  height: 28px;
  left: 25%;
  animation-delay: 12s;
}

.bloglo-waves-wrapper .triangle:nth-child(3) {
  width: 30px;
  height: 28px;
  left: 80%;
  animation-delay: 4s;
}

.bloglo-waves-wrapper .triangle:nth-child(4) {
  width: 40px;
  height: 38px;
  left: 30%;
  animation-delay: 18s;
}

.bloglo-waves-wrapper .triangle:nth-child(5) {
  width: 50px;
  height: 40px;
  left: 70%;
  animation-delay: 1s;
}

.bloglo-waves-wrapper .circle {
  border-radius: 100%;
}

.bloglo-waves-wrapper .circle:nth-child(1) {
  width: 22px;
  height: 20px;
  left: 10%;
  animation-delay: 0s;
}

.bloglo-waves-wrapper .circle:nth-child(2) {
  width: 84px;
  height: 80px;
  left: 45%;
  animation-delay: 12s;
}

.bloglo-waves-wrapper .circle:nth-child(3) {
  width: 53px;
  height: 50px;
  left: 90%;
  animation-delay: 4s;
}

.bloglo-waves-wrapper .circle:nth-child(4) {
  width: 53px;
  height: 50px;
  left: 60%;
  animation-delay: 18s;
}

.bloglo-waves-wrapper .circle:nth-child(5) {
  width: 43px;
  height: 40px;
  left: 90%;
  animation-delay: 1s;
}
</style>
