<template>
    <v-widget title="Üye Aktarım" back>
         <v-form slot="widget-content"  ref="form"  @submit.prevent="onSave" lazy-validation>
            <v-stepper v-model="stepHolder">
                <v-stepper-header>
                    <v-stepper-step :complete="stepHolder > 1" step="1">Dosya Yükle</v-stepper-step>           
                    <v-divider></v-divider>        
                    <v-stepper-step :complete="stepHolder > 2" step="2">Sütunları Seç</v-stepper-step>        
                    <v-divider></v-divider> 
                    <v-stepper-step step="3">Excel'den Kaydedilenler</v-stepper-step>
                    <v-divider></v-divider> 
                    <v-stepper-step step="3">Sonuç</v-stepper-step>
                </v-stepper-header>
                <v-stepper-items>
                <v-stepper-content step="1">
                    <div class="text-xs-center pt-2">
                        <v-btn @click="loadHeadersForProps" :disabled=" !isThereRecord || busy" color="primary">DEVAM</v-btn>
                        <v-btn :disabled="busy" color="primary" @click="cancelProcess">İPTAL</v-btn>
                    </div>
                    <FileImport ></FileImport>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <div class="text-xs-center pt-2">
                        <v-btn @click="saveExcelColumns" :disabled=" !isThereRecord || busy" color="primary">DEVAM</v-btn>
                        <v-btn :disabled="false" color="primary" @click="cancelProcess">ÖNCEKİ ADIM</v-btn>
                    </div>
                    <ColumnSelection :excelHeaders="excelHeaders"></ColumnSelection>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <div class="text-xs-center pt-2">
                        <v-btn @click="saveRecords" :disabled="busy" color="primary">Yükle</v-btn>
                        <v-btn :disabled="false" color="primary" @click="cancelProcess">ÖNCEKİ ADIM</v-btn>
                    </div>
                    <div class="pt-2">
                        <SavedRecords :savedRecords="savedRecords" ></SavedRecords>
                    </div>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <v-card
                    class="mb-5"
                    color="grey lighten-1"
                    ></v-card>
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>


        </v-form>
    </v-widget>
</template>

<script>
import VWidget from '@/components/VWidget'
import FileImport from '@/components/inside/form/MultiFileImport'
import ColumnSelection from '@/components/inside/fileImport/ColumnSelection'
import SavedRecords from '@/components/inside/fileImport/SavedRecords'
import { mapState } from 'vuex'

export default {
    layout: 'inside',
    middleware: [ 'check-auth','auth','common'],
    components: {
        VWidget,
        FileImport,
        ColumnSelection,
        SavedRecords
    },
    data() {
        return {
            stepHolder: 1,
            excelHeaders: [],
            savedRecords: []

        }
    },
    computed: {
        ...mapState({
            busy :  state => state.dataAction.busy,
            error : state => state.dataAction.error,
            success : state => state.dataAction.success,
            tickets : state => state.fileImport.tickets,
            selectedModel : state => state.fileImport.selectedModel
        }),
        isThereRecord(){
            return this.$store.getters['fileImport/isThereRecord']
        }
    },
    methods: {
        saveRecords(){
            this.tickets.forEach(ticketItem =>{
                let newMemberRecord = {}
                this.$store.getters['fileImport/getUnselectedModel'].forEach(modelItem =>{
                    const attrKey = modelItem.key
                    newMemberRecord[attrKey] = ""
                })


                
                this.selectedModel.forEach( modelItem => {
                    const attrKey = modelItem.key
                    const attrs = modelItem.attrs
                    const isList = modelItem.isList
                    const ignore = modelItem.ignore

                    const parent = modelItem.parent ? this.$store.getters['fileImport/getSelectedModel'](modelItem.parent) : null
                    if(!ticketItem[attrs[0].text]){
                        newMemberRecord[attrKey] = ""
                    }
                    else {
                        if(!isList){
                            if(attrKey.includes("Phone") && ticketItem[attrs[0].text].length !== 10){
                                newMemberRecord[attrKey] = ""
                            }
                            else{
                                for(let attr of attrs) {
                                    if(newMemberRecord[attrKey] !== 'undefined' && newMemberRecord[attrKey] !== '' && newMemberRecord[attrKey])
                                        newMemberRecord[attrKey] = newMemberRecord[attrKey]+' '+ticketItem[attr.text]
                                    else if(!newMemberRecord[attrKey] || newMemberRecord[attrKey] === 'undefined')
                                        newMemberRecord[attrKey] = ticketItem[attr.text]
                                }
                            }

                        }
                        else if(!parent){

                            if(attrKey === 'addressChoice') {
                                if(ticketItem[attrs[0].text] === 'ev')
                                    newMemberRecord[attrKey] = "0"
                                else if(ticketItem[attrs[0].text] === 'is')
                                    newMemberRecord[attrKey] = "1"
                                else newMemberRecord[attrKey] = null
                            }
                            else if(attrKey !== 'groups'){
                                console.log('---commons---')
                                console.log(ticketItem[attrs[0].text])
                                const common = this.$store.getters['commonInfo/getCommonByName'](ticketItem[attrs[0].text])
                                if(common) newMemberRecord[attrKey] = common.id
                                else newMemberRecord[attrKey] = ""
                            }
                                
                            else if(attrKey === 'groups'){
                                console.log('---groups---')
                                console.log(ticketItem[attrs[0].text].trim())
                                let groups = (ticketItem[attrs[0].text].trim()).split(',')
                                newMemberRecord[attrKey] = groups.map(group =>(this.$store.getters['group/getGroupByName'](group.trim()) ).id )
                            }
                        }
                        else if(parent){
                            console.log('---common with parent---')
                            console.log('parent: '+ticketItem[parent.attrs[0].text])
                            const parentItem = this.$store.getters['commonInfo/getCommonByName'](ticketItem[parent.attrs[0].text])
                            if(parentItem){
                                    const common = this.$store.getters['commonInfo/getCommonByNameAndParent']({
                                    name : ticketItem[attrs[0].text],
                                    parent : parentItem.id
                                })
                                if(common) newMemberRecord[attrKey] = common.id
                                else newMemberRecord[attrKey] = ""

                            }
                            else newMemberRecord[attrKey] = ""

                        }

                    }
                })
                newMemberRecord["isBlackListGroup"] = false
                console.log(newMemberRecord)
                this.$store.dispatch('member/addMember', newMemberRecord)
            })
            this.stepHolder = 4
        },
        loadHeadersForProps(){
            this.excelHeaders = this.$store.getters['fileImport/getUnselectedHeaders']
            this.stepHolder = 2

        },
        attrExist( map, attrValue){
            if(attrValue && attrValue !== 'undefined' && attrValue.trim() !== ""){          
                if(!map.has(attrValue.toLocaleUpperCase('tr-TR'))){
                       // set any value to Map
                    map.set(attrValue.toLocaleUpperCase('tr-TR'), true) 
                    return false
                }
            }
            return true
        },
        saveExcelColumns(){
            this.$store.dispatch("dataAction/setBusy", true)
            this.$store.getters['fileImport/getSelectedModelIsListed'].forEach( modelItem => {
                let map = new Map()
                const attr = modelItem.attrs[0].text
                const value = modelItem.key
                const dependent = modelItem.dependent
                const ignore = modelItem.ignore
                
                let newRecord = {
                    name: modelItem.value,
                    children: []
                }


                if(value !== 'addressChoice' && value !== 'groups' && value !== 'branch' && modelItem.isList){
                    const commonExist = this.$store.getters['commonInfo/isCommonValueExist'](value)
                    if( !commonExist){
                        const newCommon = {text: attr, value: value}
                        this.$store.dispatch('commonInfo/addCommonValue', newCommon )
                    }
                        
                }
                    
                this.tickets.forEach(item =>{
                    let attrValue = item[attr]
                    if(value === 'groups'){
                        if(attrValue) {
                            attrValue = attrValue.trim()
                            const groupValues = attrValue.split(",")
                            for (let group of groupValues) {
                                let grpValue = group.trim()
                                if(!this.attrExist(map, grpValue)){
                                    this.$store.dispatch('group/addGroup', {groupName : grpValue , isBlackList: false})
                                    newRecord.children.push({ name: grpValue})
                                    
                                }
                            }
                        }
                    }
                    else if(!ignore && value !== 'addressChoice'){
                        if(!this.attrExist(map, attrValue)){
                            this.$store.dispatch('commonInfo/addCommonItem', { name : attrValue , value: value} )
                            
                            newRecord.children.push({ name: attrValue})
                        }

                    }
                    /*
                    else if(dependent && parentItem){

                        const parentAttrValue = item[parentItem.attrs[0].text]
                        const newItems = { map: map}

                        let parentId = null
                        if(!this.attrExist(map, parentAttrValue)){
                            // parent ve child aynı dispatch ile eklenecek commonInfo da yeni action methodu yaratılacak
                            newItems.parentRecord =  { name : parentAttrValue , value: parentItem.key} 
                        }
                        if(!this.attrExist(map, attrValue)){
                            if(!newItems.parentRecord){
                                newItems['childRecord'] = { name : attrValue, value: value, parent: map.get(parentAttrValue) }
                                
                            }
                            else {
                                newItems['childRecord'] = { name : attrValue, value: value}
                                
                            }
                            map.set(attrValue, true) 

                        }
                        if(newItems.parentRecord){ 
                            this.$store.dispatch('commonInfo/addCommonItemWithParent', newItems )
                            newParentRecord.children.push({ name: parentAttrValue})

                        }
                        else if(newItems.childRecord){
                            this.$store.dispatch('commonInfo/addCommonItem', newItems.childRecord)
                            newRecord.children.push({ name: attrValue})
                            
                        }

                    }*/
                })
                //if(newParentRecord.children.length > 0 && parent) this.savedRecords.push(newParentRecord)
                this.savedRecords.push(newRecord)
                
            })
            this.$store.dispatch("dataAction/setBusy", false)
            this.stepHolder = 3
        },
        cancelProcess(){
            if(this.stepHolder === 1){
                if(!this.isThereRecord) this.$router.go(-1) 
                this.$store.dispatch('fileImport/reset')
            }
            else this.stepHolder = 1
        }
    },
    created(){

    }
}
</script>

<style>

</style>
