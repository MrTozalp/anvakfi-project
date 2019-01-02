<template>
  <div  id="v-widget">
    <v-card >
      <v-layout v-if="logo" pa-2 align-center justify-center>
              <img  width="350" src="~/assets/images/bzm-flat.png">
      </v-layout>

      <v-toolbar color="transparent" 
        flat dense card >
        <v-btn v-if="backTo" nuxt :to="backTo" exact icon class="hidden-xs-only">
              <v-icon >arrow_back</v-icon>
        </v-btn>
      
      <v-layout  v-if="centeredTitle" align-center justify-center> 
        <v-toolbar-title  >
          {{centeredTitle}}
        </v-toolbar-title>
      </v-layout>
        <v-toolbar-title  v-if="title">
          <h4>{{title}} </h4>
          
        </v-toolbar-title>
        
        <slot name="widget-header-action"></slot>
      </v-toolbar>
      <v-divider ></v-divider>
      <v-card-text    :class="contentBg">
        <slot name="widget-content"></slot>       
      </v-card-text> 
           
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'v-widget',
  props: {
    title: {
      type: String,
    },
    backTo: {
      type: String
    },
    logo: {
      type: Boolean
    },
    enableHeader: {
      type: Boolean,
      default: true
    },
    centeredTitle: {
      type: String
    },
    contentBg: {
      type: String,
      default: 'white'
    }
  },

  data () {
    return {

    };
  },
  computed: {

  },  
};
</script>
