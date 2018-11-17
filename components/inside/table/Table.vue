<template>
    <div>
        <TblToolbar :moreItems="moreItems" >
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

            <v-list slot="moreAction">
                <v-list-tile >
                    <v-icon>get_app</v-icon>
                    <v-list-tile-title @click="exportToWord">Adres Etiketi Al</v-list-tile-title>
                </v-list-tile>
            </v-list>


        </TblToolbar>
        <v-data-table
            :headers="tableConfig.headers"
            :search="search"
            :items="records"
            :rows-per-page-items="tableConfig.rows_per_page_items"
            class="elevation-1"
            select-all
            v-model="selected"
            item-key="uuid"
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
                        @click="editItem(props.item.id)"
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
export default {
    data() {
        return {
            selected: [],
            search: '',
            moreItems: [
                {
                    title: 'Adres Etiketi Al', 
                    icon : 'get_app'
                }
            ],
            excelHeader : [
                {
                    col1: 'Kimlik No',
                    col2: 'Ad Soyad',
                    col3: 'Email',
                    col4: 'Telefon',
                    col5: 'Meslek',
                    col6: 'Adres'
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
        records: {
            type: Array,
            required: true
        },
        tableConfig: {
            type: Object,
            required: true
        }
    },
    methods: {
        editItem (uuid) {
            this.$router.push('/app/membership/'+uuid);
        },
        deleteRecord(item){
            this.$store.dispatch("deleteMember", item);
        },
        exportToExcel(){
            var memberToExport = this.$store.getters.loadedMembers
            memberToExport.forEach(function(v){ 
                delete v.id;
                delete v.updatedDate;
            });
            var ws = XLSX.utils.json_to_sheet(this.excelHeader, 
                 {skipHeader: true})
            XLSX.utils.sheet_add_json(ws, memberToExport, this.excelConfig)
            var wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'search') 
            XLSX.writeFile(wb, 'üye listesi.xlsx')
        },
        exportToWord(){
            var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head>"+
            "<body >";
            var context     = "<table  ><tr>"
            var colNum = 0;
            this.selected.forEach(item => {
                
                if(item.address){
                    if(colNum === 3){
                        context      = context + "</tr><tr>"
                        colNum = 0;

                    }
                        console.log(colNum)
                        console.log(context)
                    context = context + "<td>"+item.address+"</td>"
                    colNum = colNum + 1;
                }
            });                    
            context      = context + "</tr></table>"

            var footer = "</body></html>";
            var sourceHTML = header+context+footer;
            
            var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            var fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = 'document.doc';
            fileDownload.click();
            document.body.removeChild(fileDownload);
        }
    }
}
</script>

