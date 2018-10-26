<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      class="grey lighten-4 elevation-12"
      app
    >
      <v-list
        dense
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
          </v-layout>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-3"
          ></v-divider>
          <v-list-tile
            v-else
            :key="i"
            nuxt :to="item.to"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="amber" 
      app 
      clipped-left
      >
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Bzm&nbsp;<span class="font-weight-light">Vakıf</span></span>
      <v-spacer></v-spacer>

    </v-toolbar>
  </div>
</template>

<script>
import menu from '@/static/menu';
  export default {
    
    data: () => ({
      drawer: null,
      items: menu
    }),
    props: {
      source: String
    }
  }
</script>

<style lang="stylus" scoped>
  #keep
    .v-navigation-drawer__border
      display: none
</style>




