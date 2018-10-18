<template>
  <v-layout
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <div class="text-xs-center">
        
        
        <login/>
        </div>

    </v-flex>
  </v-layout>
</template>

<script>

import Login from '@/components/Login.vue'

export default {
  components: {
    Login
  }
}
</script>
