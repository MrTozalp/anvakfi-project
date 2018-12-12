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

        </TblToolbar>

        <v-form ref="form" v-model="valid" @submit.prevent="onSave" lazy-validation>

        <v-layout row v-if="isSuccessMessage">
            <v-flex>
                <app-alert @dismissed="dismissMessage" type="success" text="Kayıt başarılı şekilde işlenmiştir!"></app-alert>
            </v-flex>
        </v-layout>
        <v-text-field
            v-model="record"
            v-if="isNewRecord"
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
        <tr @click="selectRow(props.item)">
            <td>{{ props.item.name }}</td>

                <dialog-button
                        v-if="plugAction" 
                        headline="Genel Bilgi/Modül Ayarı" 
                        content="Genel Bilgiyi bağlamak istediğiniz modülleri seçiniz."
                        actionBtnTitle="Onayla"
                        defaultBtnTitle="İptal"
                        @click="saveConnection"
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
                    @click="deleteRecord(props.item)"
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

import { mapGetters } from 'vuex'
import TblToolbar from '@/components/inside/table/Toolbar'
import DialogButton from '@/components/inside/Dialog'
export default {
    components: {
        TblToolbar,
        DialogButton
    },
    data () {
        return {
            valid: true,
            isNewRecord : false,
            record: "",
            isSuccessMessage : false,
            modulesForSelect : [],
            search : '',
            editedRecord: {
                name: ''
            },
            rules: {
                required: (value) => !!value || 'Zorunlu'
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
        ...mapGetters([ 'busy', 'error', 'success','selectedCommon','modules','modulesBySelectedCommon']),

    },
    methods: {
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
        },
        newRecord(){
            this.isNewRecord = true
            this.dismissMessage()
        },
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


        },
        clearRecord() {
            this.isNewRecord = false
            this.record = ''
            this.editedRecord  = ''
        
            
        },
        dismissMessage() {
            this.isSuccessMessage = false
            this.$store.dispatch('clearSuccess')
        },
        saveConnection(){
            console.log(this.modulesForSelect)
            this.$store.dispatch('addModuleCommons', this.modulesForSelect)

        },
        deleteRecord(record){
            this.$emit('delete', record)
            this.dismissMessage()
        },
    },
    watch: {
        success(val){
            if(val === true && this.isNewRecord){
                    this.isSuccessMessage = true
                    if(this.editedRecord)
                        this.$emit('select', this.editedRecord)
                    
                    this.clearRecord()
            }
        }

    }
}
</script>
