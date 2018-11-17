<template>
  <v-layout
    grid-list-xl 
    row wrap
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md4>
      <div class="text-xs-center">
        
        <login/>
        </div>

    </v-flex>
  </v-layout>
</template>

<script>

import Login from '@/components/Login.vue'

export default {
  middleware: ["router-auth"],
  components: {
    Login
  }
}
</script>
