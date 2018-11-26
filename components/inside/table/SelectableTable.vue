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

        <v-layout row v-if="success">
            <v-flex>
                <app-alert @dismissed="onDismissed" type="success" text="Kayıt eklenmiştir!"></app-alert>
            </v-flex>
        </v-layout>
        <v-text-field
            v-model="newRecord.name"
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
    class="elevation-1"
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
        <tr @click="onSelectedRow(props.item)">
            <td>{{ props.item.name }}</td>
        </tr>
    </template>
  </v-data-table>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import TblToolbar from '@/components/inside/table/Toolbar'
export default {
    components: {
        TblToolbar
    },
    data () {
        return {
            valid: true,
            isNewRecord : false,
            newRecord : {
                name: ""
            },
            search : '',
            rules: {
                required: (value) => !!value || 'Zorunlu'
            } 
        }
    },
    props: {
        records: {
            type: Array,
            required: true
        }
    },
    computed: {
        ...mapGetters([ 'busy', 'error', 'success'])
    },
    methods: {
        onSelectedRow(item){
            console.log('Selected - ' + item.name);
        },
        onSave() {
             if (this.$refs.form.validate()){
                this.$emit('submit', this.newRecord)
             }
        },
        clearRecord() {
            this.isNewRecord = false
            this.newRecord = ''
            
        },
        onDismissed () {
            this.$store.dispatch('clearSuccess')
        }
    },
    watch: {
      success(val){
          if(val === true) this.clearRecord()
      }
    }
}
</script>
