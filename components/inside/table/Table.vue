<template>
    <div>
        <TblToolbar >
            <v-text-field
                flat solo hide-details
                v-model="search"
                slot="searchField"
                prepend-inner-icon="search"
                placeholder="Filtrele"
                class="hidden-sm-and-down"
            ></v-text-field>
            <v-btn slot="exportAction" icon @click="exportToExcel">
                <v-icon>get_app</v-icon>
            </v-btn> 

        </TblToolbar>
        <v-data-table
            :headers="tableConfig.headers"
            :search="search"
            :items="tableConfig.items"
            :rows-per-page-items="tableConfig.rows_per_page_items"
            class="elevation-1"
            select-all
            v-model="tableConfig.selected"
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
                <td>
                    <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                    ></v-checkbox>
                </td>
                <td>{{ props.item.identityNumber }}</td>
                <td>{{ props.item.fullname }}</td>
                <td>{{ props.item.email }}</td>
                <td>{{ props.item.phone }}</td>
                <td>{{ props.item.jobTitle }}</td>
                
                <td>
                    <v-btn depressed outline icon fab dark 
                        color="primary" small
                        @click="editItem(props.item.uuid)"
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
                </td> 
            </template>
        </v-data-table>
    </div>
</template>

<script>
import XLSX from 'xlsx'
import DialogButton from '@/components/inside/Dialog'
import TblToolbar from '@/components/inside/table/Toolbar'
import { Items as Members } from '@/static/user'
export default {
    data() {
        return {
            search: '',
            excelHeader : [
                {
                    col1: 'Kimlik No',
                    col2: 'Ad Soyad',
                    col3: 'Email',
                    col4: 'Telefon',
                    col5: 'Meslek',
                }
            ],
            excelConfig : {
                skipHeader: true,
                origin: "A2",
                header: [ "identityNumber", "fullname", "email", "phone","jobTitle" ],
            }
                
            
        }
    },
    components: {
        TblToolbar,
        DialogButton
    },
    props: {
        tableConfig: {
            type: Object,
            required: true
        }
    },
    methods: {
        editItem (uuid) {
            this.$router.push('/membership/'+uuid);
        },
        deleteRecord(item){
            Members.splice(item)
        },
        exportToExcel(){
            var memberToExport = Members
            memberToExport.forEach(function(v){ 
                delete v.uuid;
                delete v.username;
            });
            var ws = XLSX.utils.json_to_sheet(this.excelHeader, 
                 {skipHeader: true})
            XLSX.utils.sheet_add_json(ws, memberToExport, this.excelConfig)
            var wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'search') 
            XLSX.writeFile(wb, 'üye listesi.xlsx')
        }
    }
}
</script>

