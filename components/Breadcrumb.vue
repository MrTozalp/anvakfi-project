<template>
  <v-layout row class="align-center layout app--page-header">

    <v-breadcrumbs  divider="-">
      <v-breadcrumbs-item disabled="true">
      <v-icon larg>home</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item disabled="true" v-for="(item,key) in breadcrumbs" :key="key">
      {{ item }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-spacer></v-spacer>
    <div class="page-header-right">
      <v-btn icon>
        <v-icon class="text--secondary">refresh</v-icon>
      </v-btn>
    </div>
  </v-layout>  
</template>

<script>
import menu from '@/static/menu'
export default {
  data () {
    return {
      title: ''
    };
  },
  computed: {
    breadcrumbs: function () {
      let breadcrumbs = [];
      
      menu.forEach(item => {
          if (item.name === this.$route.name) {
            console.log("route name:  "+this.$route.name);
            this.title = item.text;
            breadcrumbs.push(item.text);
          }
        
      });
      return breadcrumbs;
    },    
  }
};
</script>