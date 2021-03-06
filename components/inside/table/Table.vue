<template>
    <div>
        <TblToolbar :moreAction="toolbarConfig.moreAction">
            <v-text-field 
                hide-details
                v-model="search"
                slot="searchField"
                single-line=""
                label="Ara"
                append-icon="search"
                class="hidden-sm-and-down"
            ></v-text-field>
            <div 
                slot="filterField"
                v-for="header in tableConfig.headers" 
                :key="header.text" >
                <v-select
                    label="Filtrele"
                    v-if="filters.hasOwnProperty(header.value)"
                    v-model="filters[header.value]"
                    :items="columnValueList(header.value)" 
                    small-chips
                    hide-details
                    deletable-chips
                    multiple>
                </v-select>
            </div>

            <v-btn slot="toolbarAction" icon 
                @click="exportToExcel" 
                >
                <v-icon>get_app</v-icon>
            </v-btn> 

            <v-btn
                v-if="false"
                @click="goToImport"
                slot="toolbarAction"
                icon small>
                <v-icon >publish</v-icon>
            </v-btn>

            <v-list slot="moreAction" >
                <v-list-tile @click="exportToWord">
                    <v-icon>get_app</v-icon>
                    <v-list-tile-title >Adres Etiketi Al</v-list-tile-title>
                </v-list-tile>
                <v-list-tile v-if="false" @click="deleteAllRecords">
                    <v-icon>delete</v-icon>
                    <v-list-tile-title >Bütün Kayıtları Sil</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </TblToolbar>

        <v-data-table
            :headers="tableConfig.headers"
            :search="search"
            :filter="filter"
            :items="filteredRecords"
            :rows-per-page-items="tableConfig.rows_per_page_items"
            class="elevation-0"
            select-all
            v-model="selected"
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

                
                <td>
                    <v-checkbox
                        v-model="props.selected"
                        primary
                        hide-details
                    ></v-checkbox>
                </td>

                <td  v-for="(header,index) in tableConfig.headers" :key="index">
                    {{ 
                        { 
                            value: props.item[header.value],
                            filter: header.filter
                        }   | column
                    }}
                    </td>

                    <v-btn depressed outline icon fab dark 
                        color="primary" small
                        @click="viewItem(props.item.id)"
                        >
                        <v-icon nuxt >search</v-icon>
                    </v-btn>
                
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
                        @dialogAction="deleteRecord(props.item)"
                        >
                        <v-btn slot="actionActivator"                    
                            depressed outline icon fab dark small color="red"
                            >
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </dialog-button>
        </template>
        </v-data-table>
    </div>
</template>

<script>
import XLSX from 'xlsx'
import DialogButton from '@/components/inside/Dialog'
import TblToolbar from '@/components/inside/table/Toolbar'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            selected: [],
            search: '',
            pagination: {
                sortBy: 'name'
            },
            filters: {
                provinceName: [],
            },
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
        },
        toolbarConfig: {
            type: Object,
            required: true
        }
    },
    computed: {
        filter(){
            return this.caseSensitive
                ? (item, search, textKey) => item[textKey].indexOf(search) > -1
                : undefined
        },
        filteredRecords() {
            return this.records.filter(d => {
                return Object.keys(this.filters).every(f => {
                    return this.filters[f].length < 1 || this.filters[f].includes(d[f])
                })
            })
        },
        commonNames(){
            let itemList = []
            const memberCommons = this.$store.getters.moduleCommonsByModuleName("member")
            memberCommons.forEach(item => {
                itemList.push(item.commonItem.name)
            })
            return itemList
        }
    },
    methods: {

        goToImport(){
            const currenPathName = this.$route.name
            this.$router.push({ name: currenPathName+'-import'})
        },
        prepareColumn(item, header){
            let col = item[header.value]; 
            if( header.filter === 'phone' ) 
                this.$filters.phone(col)
            return col
        },
        viewItem(uuid){
            const currenPathName = this.$route.name
            const query = this.$route.query

            this.$router.push({ name: currenPathName+'-id-view', params: { id: uuid }, query: query })
            //const currentPath = this.$route.path
            //this.$router.push(currentPath+'/'+ uuid+'/view')
        },
        editItem (uuid) {
            const currenPathName = this.$route.name
            const query = this.$route.query
            this.$router.push({ name: currenPathName+'-id', params: { id: uuid }, query })
        },
        deleteRecord(item){
            this.$emit('delete', item)
            
        },
        deleteAllRecords(){
            this.$emit('deleteAll')
        },
        toggleAll () {
            if (this.selected.length) this.selected = []
            else this.selected = this.records.slice()
        },

        changeSort (column) {
            if (this.pagination.sortBy === column) {
                this.pagination.descending = !this.pagination.descending
            } else {
                this.pagination.sortBy = column
                this.pagination.descending = false
            }
        },

        columnValueList(val) {
            
            return this.records.filter( d => d[val] ).map(d => d[val])
        },

        exportToExcel(){
            var memberToExport = this.$store.getters.loadedMembers
            memberToExport.forEach(function(v){ 
                delete v.id;
                delete v.updatedDate;
                delete v.createdDate;
                delete v.gender;
                delete v.occupation;
                delete v.branch
            });
            const excelHeader = []
            let excelHeaderObject = {}
            const excelConfig = {
                skipHeader: true,
                origin: "A2",
                header: []
            }
            this.tableConfig.headers.forEach(function (item, index) {

                excelHeaderObject["col"+index] = item.text
                excelConfig.header.push( item.value )
            })
            excelHeader.push(excelHeaderObject)
            console.log(excelHeader)
            console.log(excelConfig)
            var ws = XLSX.utils.json_to_sheet(excelHeader, 
                 {skipHeader: true})
            XLSX.utils.sheet_add_json(ws, memberToExport, excelConfig)
            var wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'search') 
            XLSX.writeFile(wb, 'üye listesi.xlsx')
        },
        exportToWord(){
            let header = "<!DOCTYPE html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title>"+
            "<style>"+
            "table {  font-family: arial, sans-serif;  border-collapse: collapse;  width: 100%;} "+
            " td {  border: 1px solid #dddddd;  text-align: left;  padding: 20px;  width: 33%;} "+
            " tr:nth-child(even) {background-color: #dddddd;width: 100%;} "+
            "</style></head>"+
            "<body >";
            let context     = "<table  ><tr>"
            let colNum = 0;
            
            this.selected.forEach(item => {
                let address = "<i><b>Sayın "+item.fullname + "</b></i><br> "
                if(item.addressChoice){
                    console.log(item.addressChoice)
                    if(item.addressChoice == 0) address = address + item.homeAddress
                    else if(item.addressChoice == 1) address = address + item.workAddress

                    if(item.districtname  && item.provinceName) {
                        address = address + " " + item.districtname + "/" + item.provinceName
                    }
                    //console.log(item.homeAddress)
                    //console.log(item.districtname)
                    //console.log(item.provinceName)
                    
                    if(colNum === 2){
                        context      = context + "</tr><tr>"
                        colNum = 0;

                    }
                    //console.log(address)
                    context = context + "<td>"+address+"</td>"
                    colNum = colNum + 1;
                    //console.log(colNum)
                    console.log(context)
                }
            });
            if(colNum < 2 ){
                while(colNum !== 2 ){
                    context = context + "<td></td>"
                    colNum = colNum + 1;
                }
            }         
            context      = context + "</tr></table>"

            let footer = "</body></html>";
            let sourceHTML = header+context+footer;

            console.log(sourceHTML)
            let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
            let fileDownload = document.createElement("a");
            document.body.appendChild(fileDownload);
            fileDownload.href = source;
            fileDownload.download = 'adres-etiketleri.doc';
            fileDownload.click();
            document.body.removeChild(fileDownload);
            this.$store.dispatch('logActions/addActionLog', {actionType: 'export', module: 'word'})
        }
    }
}
</script>

