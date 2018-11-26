<template>
    <v-layout row wrap class="pa-1">
        <v-flex lg6>
          <v-card > 
            <v-divider></v-divider>
            <selectable-table
                :records="loadedCommons"  
                @submit="onSubmitted"/>
          </v-card>

        </v-flex>  
  </v-layout>
</template>


<script>
import SelectableTable from '@/components/inside/table/SelectableTable'
export default {
    layout: 'inside',
    middleware: ["check-auth", "auth"],
    components: {
        SelectableTable
    },
    methods: {
        onSubmitted(commonRecord) {
            console.log(commonRecord)
            this.$store.dispatch("addCommon", commonRecord)
        }
    },
    computed: {
        loadedCommons() {
            return this.$store.getters.loadedCommons
        }
    }
}
</script>
