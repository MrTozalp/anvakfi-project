<template>
  <v-layout row wrap class="pa-1">
        <v-flex lg12>
          <v-card > 
            <v-divider></v-divider>
            <Table 
              :tableConfig="tableConfig" 
              :toolbarConfig="toolbarConfig"
              :records="loadedMembers"
              />
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
            text: 'Kimlik No',
            value: 'identityNumber'
          },
          {
            text: 'Ad Soyad',
            value: 'fullname'
          },
          {
            text: 'Email',
            value: 'email'
          },
          {
            text: 'Telefon',
            value: 'phone',
            filter: 'phone'
          },
                      {
            text: 'Meslek',
            value: 'jobTitle'
          }
        ],
        rows_per_page_items: [10,25,50,{text:'All','value':-1}] ,

      },
      toolbarConfig: {
          moreAction: true,
          exportAction: true
      }
    }
  },
  computed: {
    loadedMembers() {
      return this.$store.getters.loadedMembers
    }
  }
};
</script>