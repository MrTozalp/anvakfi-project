<template>
  <v-layout row wrap class="pa-1">
        <v-flex lg12>
          <v-card > 
            <v-divider></v-divider>
            <Table 
              @delete="onDeleted" 
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
  middleware: [ 'check-auth','auth','common'],
  components: {
      Table
  },
  data () {
    return {
      tableConfig: {

        headers: [
          {
            text: 'Şube',
            value: 'branchName'
          },
          {
            text: 'Ad Soyad',
            value: 'fullname'
          },
          {
            text: 'Gruplar',
            value: 'groupNames'
          },
          {
            text: 'Meslek',
            value: 'occupationName'
          },
          {
            text: 'Cep Telefonu',
            value: 'mobilePhone',
            filter: 'phone'
          },
          {
            text: 'Email',
            value: 'email'
          },
          {
            text: 'Memleket',
            value: 'hometownName'
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
    loadedMembers() {
      return this.$store.getters['member/getMemberList'](this.$route.query.black)
    }
  },
  methods: {
      onDeleted(memberToDelete) {
          console.log(memberToDelete)
          this.$store.dispatch("member/deleteMember", memberToDelete)
      }
  }
}
</script>