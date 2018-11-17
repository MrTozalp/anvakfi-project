<template>
  <v-app>
    <InsideHeader />
    <v-content >
      <v-container fluid grid-list-xl  >

          <router-view >
            <nuxt />
          </router-view>


      </v-container>
    </v-content>
    <Footer/>
    </v-app>
</template>

<script>
import InsideHeader from '@/components/inside/InsideHeader.vue'
import Breadcrumb from '@/components/Breadcrumb';
export default {
  
  components: {
    InsideHeader,
    Breadcrumb
  }
}
</script>