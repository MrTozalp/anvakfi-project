<template>
  <v-layout
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md4>
        <v-widget logo centeredTitle="ÜYE YÖNETİM PORTALI">
          <login slot="widget-content"/>
        </v-widget>
    </v-flex>
  </v-layout>

</template>

<script>
import Login from '@/components/Login.vue'
import VWidget from '@/components/VWidget'
export default {
  components: {
    Login,
    VWidget
  }
  
}
</script>


