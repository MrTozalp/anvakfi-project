<template>
<div>
        <TblToolbar :rowRecord="true" @newRecord="newRecord">
            <v-text-field
                flat solo hide-details
                v-model="search"
                slot="searchField"
                prepend-inner-icon="search"
                placeholder="Ara"
                class="hidden-sm-and-down"
            >
   
            </v-text-field>
            <v-btn
                @click="goToImport"
                slot="toolbarAction"
                icon small>
                <v-icon >publish</v-icon>
            </v-btn>

        </TblToolbar>

        <v-form ref="form" v-model="valid" @submit.prevent="onSave" lazy-validation>

            <v-layout row v-if="isSuccessMessage">
                <v-flex>
                    <app-alert @dismissed="dismissMessage" type="success" text="Kayıt başarılı şekilde işlenmiştir!"></app-alert>
                </v-flex>
            </v-layout>
            <v-text-field
                v-model="record"
                v-if="isRecordAction"
                placeholder="Yeni Kayıt"
                single-line
                :rules="[rules.required]" 
                outline
            >
                <template slot="append">
                    <v-btn  type="submit" :loading="busy" bottom flat icon color="green">
                        <v-icon  >done</v-icon>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                    </span>
                    </v-btn>
                    <v-btn  flat icon  bottom color="red" @click="clearRecord">
                        <v-icon  >close</v-icon>
                    </v-btn>
                </template>
            </v-text-field> 
        </v-form>

  <v-data-table
    :headers="[{text: 'Tanım', value: 'name'}]"
    :items="records"
    hide-headers
    :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
    :search="search"
    item-key="id"
>   
    <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
            Üzgünüm, listede kayıt bulunmamaktadır :(
        </v-alert>
    </template>
    <v-alert slot="no-results" :value="true" color="error" icon="warning">
        "{{ search }}" aramasına göre sonuç bulunmamaktadır :(
    </v-alert>
    <template slot="items" slot-scope="props">
        <tr>
            <td>{{ props.item.name }}</td>

                <dialog-button
                        v-if="plugAction" 
                        headline="Genel Bilgi/Modül Ayarı" 
                        content="Genel Bilgiyi bağlamak istediğiniz modülleri seçiniz."
                        actionBtnTitle="Onayla"
                        defaultBtnTitle="İptal"
                        @dialogAction="saveConnection"
                    >
                    <v-autocomplete
                        slot="form"
                        :items="modules"
                        item-text="text"
                        item-value="value"
                        v-model="modulesForSelect"
                        deletable-chips
                        hide-selected
                        label="Modüller"
                        multiple
                        small-chips
                        persistent-hint
                        return-object
                    ></v-autocomplete>
                    <v-btn
                        @click="onConnectionModule(props.item)"  
                        slot="actionActivator"
                        depressed outline icon fab dark 
                        color="primary" small>
                        <v-icon nuxt >donut_large</v-icon>
                    </v-btn>
                </dialog-button>

                <v-btn depressed outline icon fab dark 
                    color="primary" small
                    @click="editRecord(props.item)"
                    >
                    <v-icon nuxt >edit</v-icon>
                </v-btn>
                <dialog-button 
                    headline="Kayıt Silme" 
                    content="Kaydı silmek istiyor musunuz?"
                    actionBtnTitle="SİL"
                    defaultBtnTitle="İPTAL"
                    @dialogAction="deleteRecord(props.item)"
                    >
                    <v-btn slot="actionActivator"                    
                        depressed outline icon fab dark small color="red"
                        >
                        <v-icon>delete</v-icon>
                    </v-btn>
                </dialog-button>
        </tr>
    </template>
  </v-data-table>
</div>
</template>

<script>
import XLSX from 'xlsx'
import { mapState } from 'vuex'
import TblToolbar from '@/components/inside/table/Toolbar'
import DialogButton from '@/components/inside/Dialog'
import FormInput from '@/components/inside/form/FormInput'
export default {
    components: {
        TblToolbar,
        DialogButton,
        FormInput
    },
    data () {
        return {
            commonChild: "",
            valid: true,
            isRecordAction : false,
            record: "",
            isSuccessMessage : false,
            modulesForSelect : [],
            search : '',
            editedRecord: {
                name: ''
            },
            rules: {
                required: (value) => !!value || 'Zorunlu',
                fileRequired: () => !!this.fileUrl || 'Zorunlu'
            } 
        }
    },
    props: {
        records: {
            type: Array,
            required: true
        },
        header: {
            type: String,
            required: false
        },
        isParent: {
            type: Boolean,
        },
        plugAction: {
            type: Boolean,
        }
    },
    computed: {
        ...mapState({
            busy :  state => state.dataAction.busy,
            error : state => state.dataAction.error,
            success : state => state.dataAction.success,
            selectedCommon : state => state.commonInfo.selectedCommon
        }) 

    },
    methods: {
        /*
        onConnectionModule(item){
            this.$store.commit('setSelectedCommon',item)
            this.modulesForSelect = [...this.modulesBySelectedCommon]
        },
        
        selectRow(item){
            if(this.isParent){
                this.$store.commit('setSelectedCommon',item)

            }

        },
        
        onSave() {
             if (this.$refs.form.validate()){
                 if(this.editedRecord.name){
                     console.log("edited record: " + this.editedRecord )
                    this.$emit('edit',  { newRecord: {...this.editedRecord , name: this.record}, oldRecord: this.editedRecord  })  
                    this.editedRecord = ''

                 }else{
                     console.log("new record!!!")
                     this.$emit('newRecord', {
                            name: this.record
                         })
                 }
                    
                
             }
        },*/
        goToImport(){
            this.$emit("importClick")

        },
        onSave() {
             if (this.$refs.form.validate()){
                 if(this.editedRecord.name){
                     console.log("edited record: " + this.editedRecord )
                    this.$emit('edit',  { ...this.editedRecord , name: this.record  })  
                    this.editedRecord = ''

                 }else{
                     console.log("new record!!!")
                     this.$emit('newRecord', {
                            name: this.record
                         })
                 }
             }
        },
        newRecord(){
            this.isRecordAction = true
            this.dismissMessage()
        },
        editRecord(selectedItem) {
            this.dismissMessage()
            this.editedRecord = this.$store.getters['commonInfo/getCommonById'](selectedItem.id)
            this.record = this.editedRecord.name
            this.isRecordAction = true
        },
        /*
        editRecord(selectedItem) {
            this.dismissMessage()
            if(this.isParent){
                this.editedRecord = this.$store.getters.fetchCommon(selectedItem.id)
                this.record = this.editedRecord.name
                this.isNewRecord = true
            }
            else{
                this.editedRecord = this.$store.getters.fetchCommonItem(selectedItem)
                
                this.record = this.editedRecord.name
                console.log("child edit : "+this.editedRecord.name)
                this.isNewRecord = true
            }


        },*/
        clearRecord() {
            this.isRecordAction = false
            this.record = ''
            this.editedRecord  = ''
        
            
        },
        dismissMessage() {
            this.isSuccessMessage = false
            this.$store.dispatch('dataAction/clearSuccess')
        },
        saveConnection(){
            console.log(this.modulesForSelect)
            this.$store.dispatch('commonInfo/addModuleCommons', this.modulesForSelect)

        },
        deleteRecord(record){
            this.$emit('delete', record)
            this.dismissMessage()
        },
    },
    watch: {
        success(val){
            if(val === true && this.isRecordAction){
                    this.isSuccessMessage = true
                    if(this.editedRecord)
                        this.$emit('select', this.editedRecord)
                    
                    this.clearRecord()
            }
        }
    }
}
</script>

