<template>
    <v-layout row wrap class="pa-1">
        <v-flex lg6>
          <v-card > 
            <v-divider></v-divider>
            <v-widget title="Genel Bilgiler" >
            <selectable-table
                slot="widget-content"
                isParent
                plugAction
                :records="loadedCommons"
                @edit="onEditedParent"
                @delete="onDeletedParent"  
                @newRecord="onNewRecordParent"/>
            </v-widget>
          </v-card>
          
        </v-flex>  
        <v-flex lg6>
          <v-card > 
            <v-divider></v-divider>
            <v-widget :title="selectedCommon ? selectedCommon.name : ''" >
                <v-alert
                    :value="!selectedCommon"
                    type="info"
                    slot="widget-content"
                    >
                    Genel Bilgiler tablosundan seçim yapınız.
                </v-alert>
                <selectable-table
                    v-if="selectedCommon"
                    slot="widget-content"
                    :records="selectedCommonItems"
                    @edit="onEditedChild"
                    @delete="onDeletedChild"  
                    @newRecord="onNewRecordChild"
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
    components: {
        VWidget,
        SelectableTable
    },
    methods: {
        onNewRecordParent(commonRecord) {
            console.log(commonRecord)
            this.$store.dispatch("addCommon", commonRecord)
        },
        onEditedParent(record) {
            console.log(record.newRecord)
            this.$store.dispatch("editCommon", record.newRecord)
        },
        onDeletedParent(commonRecord) {
            console.log(commonRecord)
            this.$store.dispatch("deleteCommon", commonRecord)
        },
        onNewRecordChild(record) {
            let commonItems = []
            for (var i in this.selectedCommon.items) {
                commonItems.push(this.selectedCommon.items[i])
            }
            commonItems.push(record)
            let editedCommon = {
                id: this.selectedCommon.id,
                name: this.selectedCommon.name,
                items: commonItems
            }
            this.$store.dispatch("editCommon", editedCommon)
            
        },
        onEditedChild(record) {
            let commonItems = []
            for (var i in this.selectedCommon.items) {
                
                if(this.selectedCommon.items[i] === record.oldRecord)
                    commonItems.push(record.newRecord)
                else
                    commonItems.push(this.selectedCommon.items[i])
                
            }
            let editedCommon = {
                id: this.selectedCommon.id,
                name: this.selectedCommon.name,
                items: commonItems
            }
            this.$store.dispatch("editCommon", editedCommon)
        },
        onDeletedChild(record) {
            let commonItems = []
            for (var i in this.selectedCommon.items) {
                if(this.selectedCommon.items[i] != record)
                    commonItems.push(this.selectedCommon.items[i])
            }
            let editedCommon = {
                id: this.selectedCommon.id,
                name: this.selectedCommon.name,
                items: commonItems
            }
            this.$store.dispatch("editCommon", editedCommon)
        }
    },
    computed: {

        loadedCommons() {
            return this.$store.getters.loadedCommons
        },
        selectedCommon() {
            return this.$store.getters.selectedCommon
        },
        selectedCommonItems(){
            let commonItems =  []
            if(this.selectedCommon)
                Object.assign(commonItems,this.$store.getters.selectedCommon.items)
            return commonItems
        }
    }
}
</script>
