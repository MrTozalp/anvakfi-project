<template>
  <img
    class="AVLogo"
    alt="Anadolu Vakfı Logo"
    src="http://www.anadoluvakfi.org/sites/all/files/logo-orta-2.png">
</template>

<style>
.AVLogo {
  width: 180px;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
