<template>

        <v-list two-line>
            <v-subheader
            >
              Aksiyon Logları 
            </v-subheader>


          <template v-for="(item, index) in logs">


            <v-divider
              :key="index"
              inset
            ></v-divider>

            <v-list-tile

              :key="item.id"
            >

              <v-list-tile-content>
                <v-list-tile-title>{{item.user +" "+item.actionType+"ed on "+item.module+" module"}}</v-list-tile-title>
                <v-list-tile-sub-title>{{"Date: "+item.time}}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple @click="deleteLog(item)">
                  <v-icon color="error">delete</v-icon>
                </v-btn>
            </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
    
</template>

<script>
export default {
    layout: 'inside',
    middleware: [ 'check-auth','auth','common'],
    computed: {
        logs(){
            return this.$store.state.logActions.actions
        }
    },
    methods: {
      deleteLog(logItem) {
        this.$store.dispatch('logActions/deleteActionLog',logItem)
      }
    }
}
</script>

<style>

</style>
