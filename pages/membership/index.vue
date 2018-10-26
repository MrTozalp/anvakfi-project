<template>
  <v-layout row wrap class="pa-1">
        <v-flex lg12>
          <v-card >
            
            <v-divider></v-divider>
            <Table :tableConfig="tableConfig"/>
          </v-card>
        </v-flex>  
  </v-layout>
</template>

<script>
import { Items as Users } from '@/static/user'


import Table from '@/components/inside/table/Table'
  export default {
    layout: 'inside',
    components: {
        
        Table
    },
    data () {
      return {
        search: '',
        tableConfig: {
          selected: [],
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
              value: 'phone'
            },
                        {
              text: 'Meslek',
              value: 'phone'
            },
            {
              text: 'İşlem',
              value: ''
            },
          ],
          rows_per_page_items: [10,25,50,{text:'All','value':-1}] ,
          items: Users
        },
        complex: {
          selected: [],
          
          items: Users
        }
      }
    }
  }
</script>