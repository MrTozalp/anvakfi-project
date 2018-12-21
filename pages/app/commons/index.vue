<template>
    <v-layout row wrap class="pa-1">
        <v-flex lg12>
                <v-divider></v-divider>
                <v-widget title="Genel Bilgiler" >
                <v-select
                    v-model="selectedCommon"
                    :items="commonValues"
                    prepend-inner-icon="map"
                    slot="widget-content"
                    label="Lütfen bir seçim yapınız"
                    single-line
                    solo
                ></v-select>
                <v-alert
                    :value="!selectedCommon"
                    type="info"
                    slot="widget-content"
                    >
                    Listeyi görmek ve işlem yapabilmek için seçim yapınız.
                </v-alert>
                <selectable-table
                    v-if="selectedCommon"
                    slot="widget-content"
                    @importClick="onImportClicked"
                    @edit="onEdited"
                    @delete="onDeleted"  
                    @newRecord="onNewRecord"
                    :records="selectedCommonItemList"/>
                </v-widget>

        </v-flex>

  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import VWidget from '@/components/VWidget'
import SelectableTable from '@/components/inside/table/SelectableTable'
export default {
    layout: 'inside',
    middleware: ["check-auth", "auth","common"],
    components: {
        VWidget,
        SelectableTable
    },
        data () {
        return {
            valid: true,
            selectedCommonItems: [],
            search : '',
            rules: {
                required: (value) => !!value || 'Zorunlu'
            } 
        }
    },
    methods: {
        onImportClicked(){
            const currentPath = this.$route.path
            this.$router.push(currentPath+'/'+this.selectedCommon)
        },
        onNewRecord(commonRecord) {
            const newRecord = {...commonRecord, value: this.selectedCommon}
            this.$store.dispatch("addCommonItem", newRecord)
        },
        onEdited(record) {
            this.$store.dispatch("editCommonItem", record)
        },
        onDeleted(commonRecord) {
            this.$store.dispatch("deleteCommonItem", commonRecord)
        }
    },
    computed: {
        ...mapGetters([ 'commonValues']),
        selectedCommonItemList(){
            let commonItems =  []
            if(this.selectedCommon)
                Object.assign(commonItems,this.$store.getters.selectedCommonList(this.selectedCommon))
            return commonItems
        },
        selectedCommon : {
            get: function() {
                return this.$store.getters.selectedCommon
            },
            set: function(newValue) {
                this.$store.commit('setSelectedCommon',newValue)
            }
        }
    },
    watch: {
        selectedCommon(val){
            if(val){
                Object.assign(this.selectedCommonItems,this.$store.getters.selectedCommonList(val))
            }
                 
        }
    }
    
}
</script>
