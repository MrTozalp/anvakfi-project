<template>
  <v-layout row wrap class="pa-1">
        <v-flex lg12>
          <v-card > 
            <v-divider></v-divider>
            <Table 
              @delete="onDeleted" 
              :tableConfig="tableConfig" 
              :toolbarConfig="toolbarConfig"
              :records="loadedGroups"
              />
          </v-card>

        </v-flex>  
  </v-layout>
    
</template>

<script>
import Table from '@/components/inside/table/Table'

export default {
  layout: 'inside',
  middleware: [ 'check-auth','auth','common'],
  components: {
      Table
  },
  data () {
    return {
      tableConfig: {

        headers: [
          {
            text: 'Grup Adı',
            value: 'groupName'
          },
          {
            text: 'Kara Liste Mi',
            value: 'isBlackList',
            filter: 'yesNo'
          }
        ],
        rows_per_page_items: [10,25,50,{text:'All','value':-1}] ,

      },
      toolbarConfig: {
          exportAction: true,
          moreAction: true
      }
    }
  },
  computed: {
    loadedGroups() {
      return this.$store.state.group.groups
    }
  },
  methods: {
      onDeleted(groupToDelete) {
          this.$store.dispatch("group/deleteGroup", groupToDelete)
      }
  }
}
</script>

<style>

</style>


