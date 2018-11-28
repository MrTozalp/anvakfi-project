<template>
<v-app>
  <v-container v-if="loading" 
    fluid 
    fill-height 
    grid-list-xl  
    justify-center
    >
  <v-progress-circular
      indeterminate
      class="primary--text"
      :width="7"
      :size="70"
      ></v-progress-circular>
    </v-container>
    <template v-else>


    <v-content >
      <v-container fluid grid-list-xl  >
        

          <router-view >
            <nuxt />
          </router-view>

      </v-container>
    </v-content>
    <InsideHeader />

    <Footer/>
    </template>
    </v-app>
   
</template>

<script>
import InsideHeader from '@/components/inside/InsideHeader.vue'
import Breadcrumb from '@/components/Breadcrumb'
import { mapGetters } from 'vuex'
export default {
  
  components: {
    InsideHeader,
    Breadcrumb
  },
  computed: {
      ...mapGetters([ 'loading', 'error'])
  },
  created(){
    this.$store.dispatch("loadMembers");
    this.$store.dispatch("loadBranches");
    this.$store.dispatch("loadCommons");
  }
}
</script>