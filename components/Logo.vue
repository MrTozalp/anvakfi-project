<template>

   <v-card flat height="185px">
     <v-card-text>
        <img
          class="AVLogo"
          alt="Anadolu Vakfı Logo"
          :src="logoSrc">
    
    </v-card-text>
    <v-btn  flat @click="editInstutition">
      
      <v-icon left>edit</v-icon>
      DEĞİŞTİR
    </v-btn>
    </v-card>

</template>

<style>
.AVLogo {
  width: 200px;

}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
<script>
export default {
  props: {
    logoSrc: String
  },
  methods: {
    editInstutition(){
      this.$emit('instutionEdit', '');
    }
  }
}
</script>
