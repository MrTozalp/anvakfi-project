<template>
<v-app>
    <Header/>
    <v-progress-circular
      indeterminate
      class="primary--text"
      :width="7"
      :size="70"
      v-if="loading"></v-progress-circular>
    <v-content v-if="!loading">
      <v-container fluid >
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
import { mapGetters } from 'vuex'
export default {
  components: {
    Header,
    Footer
  },
  computed: {
      ...mapGetters([ 'loading', 'error'])
  }
}
</script>
