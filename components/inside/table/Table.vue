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
            <tr align="left">
                
                <td>
                    <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
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
                
            </tr>
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
                hometownName: [],
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
        prepareColumn(item, header){
            let col = item[header.value]; 
            if( header.filter === 'phone' ) 
                this.$filters.phone(col)
            return col
        },
        viewItem(uuid){
            
            const currenPathName = this.$route.name
            const query = this.$route.query
            //router.push({ name: 'user', params: { userId } }) // -> /user/123

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

