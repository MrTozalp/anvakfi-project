<template>
<div>
        <TblToolbar :rowRecord="true" @newRecord="isNewRecord = true">
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
                <app-alert @dismissed="onDismissed" type="success" text="Kayıt başarılı şekilde işlenmiştir!"></app-alert>
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
    :items="records"
    
    hide-headers
    :search="search"
    item-key="name"
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

                <v-btn depressed outline icon fab dark 
                    color="primary" small
                    @click="editRecord(props.item.id)"
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
            selectedItem: {},
            isSuccessMessage : false,
            search : '',
            editedRecord: {
                name: ""
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
        }
    },
    computed: {
        ...mapGetters([ 'busy', 'error', 'success'])
    },
    methods: {
        selectRow(item){
            this.selectedItem = item
            this.$emit('select', item)

        },
        onSave() {
             if (this.$refs.form.validate()){
                 
                 console.log("edited record: " + this.editedRecord )
                 if(this.editedRecord.name ){
                    console.log(this.editedRecord)
                    this.editedRecord.name = this.record
                    this.$emit('edit', this.editedRecord)


                 }else{
                     console.log("new record!!!")
                     this.$emit('newRecord', {
                            name: this.record
                         })
                 }
                    
                
             }
        },
        editRecord(recordId) {
            this.editedRecord = this.$store.getters.fetchCommon(recordId)
            this.record = this.editedRecord.name
            this.isNewRecord = true

        },
        clearRecord() {
            this.isNewRecord = false
            this.record = ''
        
            
        },
        onDismissed () {
            this.$store.dispatch('clearSuccess')
        },
        deleteRecord(record){
            this.$emit('delete', record)
            
        },
    },
    watch: {
      success(val){
          if(val === true && this.isNewRecord){
                this.isSuccessMessage = true
                if(this.editedRecord)
                    this.$emit('select', this.editedRecord)
                this.editedRecord  = ''
                this.clearRecord()
          }
      }

    }
}
</script>
