<template>
    <v-layout row wrap class="pa-1">
        <v-flex lg6>
          <v-card > 
            <v-divider></v-divider>
            <v-widget title="Genel Bilgiler" >
            <selectable-table
                slot="widget-content"
                :records="loadedCommons"
                @select="onSelectedParent"
                @edit="onEditedParent"
                @delete="onDeletedParent"  
                @newRecord="onNewRecordParent"/>
            </v-widget>
          </v-card>
          
        </v-flex>  
        <v-flex lg6>
          <v-card > 
            <v-divider></v-divider>
            <v-widget :title="commonTitle" >
                <selectable-table
                    slot="widget-content"
                    :records="commonItems"
                />
            </v-widget>
          </v-card>
        </v-flex>

  </v-layout>
</template>


<script>
import VWidget from '@/components/VWidget'
import SelectableTable from '@/components/inside/table/SelectableTable'
export default {
    layout: 'inside',
    middleware: ["check-auth", "auth"],
    data() {
        return {
            selected: [],
            commonItems: [],
            commonTitle: ""
        }
    },
    components: {
        VWidget,
        SelectableTable
    },
    methods: {
        onSelectedParent(selectedItem){
            if(selectedItem) this.selected = []
            this.selected.push(selectedItem)
            console.log(this.selected)
            this.commonItems = [{
                name: "Deneme"
            }];
        },
        onNewRecordParent(commonRecord) {
            console.log(commonRecord)
            this.$store.dispatch("addCommon", commonRecord)
        },
        onEditedParent(commonRecord) {
            console.log(commonRecord)
            this.$store.dispatch("editCommon", commonRecord)
        },
        onDeletedParent(commonRecord) {
            console.log(commonRecord)
            this.$store.dispatch("deleteCommon", commonRecord)
        }
    },
    computed: {
        loadedCommons() {
            return this.$store.getters.loadedCommons
        }

    },
    watch: {
        selected(val) {
            if(val && val[0])
                this.commonTitle = val[0].name
        }
    }
}
</script>
