<template>
<v-app>
    <v-content >
      <v-container fluid fill-height>
        <router-view>
          <nuxt />
        </router-view>
      </v-container>
    </v-content>
    <Footer/>
    </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
