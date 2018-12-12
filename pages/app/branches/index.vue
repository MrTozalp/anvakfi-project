<template>
  <v-layout row wrap class="pa-1">
        <v-flex lg12>
          <v-card > 
            <v-divider></v-divider>
            <Table
            @delete="onDeleted"   
            :tableConfig="tableConfig" 
            :toolbarConfig="toolbarConfig"
            :records="loadedBranches"/>
          </v-card>
        </v-flex>  
  </v-layout>
</template>


<script>
import Table from '@/components/inside/table/Table'
export default {
  layout: 'inside',
  middleware: ["check-auth", "auth"],
    components: {
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
      return this.$store.getters.loadedBranches
    }
  },
  methods: {
      onDeleted(branchItem) {
          console.log(branchItem)
          this.$store.dispatch("deleteBranch", branchItem)
      }
  },
}

</script>