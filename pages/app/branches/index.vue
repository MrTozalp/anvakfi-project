<template>
  <v-layout row wrap class="pa-1">
        <v-flex lg12>

          <v-divider></v-divider>
          <v-widget title="Şubeler">
          <Table
          slot="widget-content"
          @delete="onDeleted"   
          :tableConfig="tableConfig" 
          :toolbarConfig="toolbarConfig"
          :records="loadedBranches"/>
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
            text: 'Şube Adı',
            value: 'branchName',

          },
          {
            text: 'Adres',
            value: 'branchAddress',

          },
          {
            text: 'Telefon',
            value: 'branchPhone',
            filter: 'phone'

          },
          {
            text: 'Faks',
            value: 'branchFax',
            filter: 'phone'
            
          }
        ],
        rows_per_page_items: [10,25,50,{text:'All','value':-1}] ,

      },
      toolbarConfig: {
          exportAction: true
      }
    }
  },
  computed: {
    loadedBranches() {
      return this.$store.state.branch.branches
    }
  },
  methods: {
      onDeleted(branchItem) {
          this.$store.dispatch("branch/deleteBranch", branchItem)
      }
  },
}

</script>