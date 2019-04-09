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
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('dataAction')

export default {
  components: {
    InsideHeader,
    Breadcrumb
  },
  computed: {
    ...mapState({
      loading : state => state.loading, 
      error   : state => state.error
    })
  },
  created(){
    console.log('---data loading started---')
    this.$store.dispatch("member/loadMembers");
    this.$store.dispatch("branch/loadBranches");
    this.$store.dispatch("group/loadGroups");
    this.$store.dispatch("commonInfo/loadCommonList");
    this.$store.dispatch("logActions/loadActionLog");
    this.$store.dispatch("commonInfo/loadCommonValues");
    console.log('---data loading ended---')
      
    //this.$store.dispatch("loadModuleCommons");
  }
}
</script>