<template>
  <div>
    <v-navigation-drawer
    id="appDrawer"
      v-model="drawer"
      fixed
      class="grey lighten-4 elevation-12"
      app
      width="260"
    >
      <v-list
        dense
        expand
        class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
          >
            <v-flex >
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
          <v-list-tile
             @click="onLogout"
          >
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="grey--text">
                Çıkış
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="amber" 
      app
      absolute 
      
      >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Anadolu Eğitim ve Kültür Vakfı</span>
      <v-spacer></v-spacer>

    </v-toolbar>
  </div>
</template>

<script>
import menu from '@/static/menu'
  export default {
    name: 'app-drawer',

    data: () => ({
      mini: false,
      drawer: true,
      items: menu,
      scrollSettings: {
        maxScrollbarLength: 160
      }    
    }),
    props: {
      source: String
    },
    methods: {
      onLogout() {
        this.$store.dispatch("authentication/logout");
        this.$router.push("/");
        
      }
    }
  }
</script>

<style lang="stylus" scoped>

#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: auto

</style>




