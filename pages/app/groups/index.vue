<template>
  <v-layout row wrap class="pa-1">
        <v-flex lg12>

          <v-divider></v-divider>
          <v-widget title="Gruplar">
          <Table 
            slot="widget-content"
            @delete="onDeleted" 
            :tableConfig="tableConfig" 
            :toolbarConfig="toolbarConfig"
            :records="loadedGroups"
            />
            </v-widget>
        </v-flex>  
  </v-layout>
    
</template>

<script>
import VWidget from '@/components/VWidget'
import Table from '@/components/inside/table/Table'

export default {
  layout: 'inside',
  middleware: [ 'check-auth','auth','common'],
  components: {
    VWidget,
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


