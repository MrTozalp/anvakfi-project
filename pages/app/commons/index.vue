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
                    return-object
                    solo
                ></v-select>
                <v-select
                    v-if="selectedCommonParentItems.length > 0"
                    v-model="selectedCommonItem"
                    :items="selectedCommonParentItems"
                    prepend-inner-icon="map"
                    slot="widget-content"
                    label="Lütfen bir seçim yapınız"
                    item-text="name"
                    item-value="id"
                    single-line
                    return-object
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
                    :records="selectedCommonItems"/>
                </v-widget>

        </v-flex>

  </v-layout>
</template>

<script>
import VWidget from '@/components/VWidget'
import SelectableTable from '@/components/inside/table/SelectableTable'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('commonInfo')
export default {
    layout: 'inside',
    middleware: [ 'check-auth','auth','common'],
    components: {
        VWidget,
        SelectableTable
    },
    data () {
        return {
            valid: true,
            selectedCommonItems: [],
            selectedCommonParentItems: [],
            search : '',
            rules: {
                required: (value) => !!value || 'Zorunlu'
            } 
        }
    },
    methods: {
        onImportClicked(){
            const currenPathName = this.$route.name
            //const currentPath = this.$route.path
            const param = this.selectedCommon.value
            const query = this.selectedCommonItem ? {parent: this.selectedCommonItem.id} : {parent: false}
            this.$router.push({ name: currenPathName+'-common', params: { common: param }, query: query })
            //this.$router.push(currentPath+'/'+this.selectedCommon.value)
        },
        onNewRecord(commonRecord) {
            let newRecord = {...commonRecord, value: this.selectedCommon.value}
            if(this.selectedCommonItem !== null && this.selectedCommonItem.id !== null)
                newRecord = { ...newRecord, parent: this.selectedCommonItem.id }

            
            this.$store.dispatch("commonInfo/addCommonItem", newRecord)
                .then(data => {
                        this.selectedCommonItems = this.$store.getters['commonInfo/selectedCommonList']
                    }
                )
        },
        onEdited(record) {
            this.$store.dispatch("commonInfo/editCommonItem", record)
        },
        onDeleted(commonRecord) {
            this.$store.dispatch("commonInfo/deleteCommonItem", commonRecord)
        }
    },
    computed: {
        ...mapState({
            commonValues : state => state.commonValues
        }),
        selectedCommon : {
            get: function() {
                return this.$store.getters['commonInfo/selectedCommon']
            },
            set: function(newValue) {
                this.$store.commit('commonInfo/SET_SELECTED_COMMON',newValue)
            }
        },
        selectedCommonItem : {
            get: function() {
                return this.$store.getters['commonInfo/selectedCommonItem']
            },
            set: function(newValue) {
                this.$store.commit('commonInfo/SET_SELECTED_COMMON_ITEM',newValue)
            }
        }
    },
    watch: {
        selectedCommon(val){
            if(val){
                this.selectedCommonItems = this.$store.getters['commonInfo/selectedCommonList']
                this.selectedCommonParentItems = this.$store.getters['commonInfo/selectedCommonParentList']
            }
        },
        selectedCommonItem(val){
            if(val)
                this.selectedCommonItems = this.$store.getters['commonInfo/selectedCommonList']
            
        }

    }
    
}
</script>
