<template>
    <v-layout row wrap>
        <v-flex lg12 sm6>
            <v-text-field
                :disabled="busy"
                label="Dosya Seç" 
                @click='pickFile' 
                v-model='fileName' 
                prepend-icon='attach_file'>
            </v-text-field>
            <input
                type="file"
                style="display: none"
                ref="excelFile"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                @change="onFilePicked"
            >
        </v-flex>

        <v-flex lg12 sm6>
            <template v-if="this.tickets.length > 0 && headers.length === 1">
                <v-data-table
                    :loading="busy"
                    :headers="headers"
                    :items="tickets"
                    
                    :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                    >
                    <template slot="items" slot-scope="props">
                        <td  v-for="(attr,index) in props.item" :key="index">
                            {{ props.item[index] }}
                        </td>
                    </template>
                </v-data-table>

            </template>

            <template v-else-if="this.tickets.length <= 0">
                <v-alert :value="true" color="info" icon="warning">
                    Kayıt yüklemek için excel dosyası seçiniz.
                </v-alert>
            </template>

            <template v-else-if="headers.length > 1">
                <v-alert :value="true" color="error" icon="warning">
                    Kayıt listesi tek sütun içermelidir. Lütfen excel dosyasını kontrol ediniz.
                </v-alert>
            </template>

            <div v-if="this.tickets.length > 0" class="text-xs-center pt-2">
                <v-btn @click="loadRecords" :disabled="headers.length !== 1 || busy" color="primary">YÜKLE</v-btn>
                <v-btn :disabled="busy" color="primary" @click="cancelProcess">İPTAL</v-btn>
            </div>
            

        </v-flex>
     </v-layout>
        
</template>
<script>
import XLSX from 'xlsx'
import { mapGetters } from 'vuex'
import Dialog from '@/components/inside/Dialog'
export default {
    components: {
        Dialog
    },
    data() {
        return {
            fileName: '',
            tickets: [],
            headers: [],
            redirectDialog: false
        }
    },
    computed: {
        ...mapGetters([ 'busy', 'error', 'success']),
    },
    methods: {
        loadRecords(){
            const newRecord = { itemList: this.tickets, value: this.$route.params.common}
            this.$store.dispatch("addCommonItems", newRecord)
        },
        cancelProcess(){
            this.fileName = ''
            this.tickets = []
            this.headers = []

        },
        get_header_row(sheet) {
            var headers = [], range = XLSX.utils.decode_range(sheet['!ref']);
            var C, R = range.s.r; /* start in the first row */
            for(C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
                var cell = sheet[XLSX.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */
                var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
                if(cell && cell.t) hdr = XLSX.utils.format_cell(cell);
                headers.push({text: hdr, value: C});
            }
            return headers;
        },
        workbook_to_json(workbook) {
            var result = {};
            workbook.SheetNames.forEach(function(sheetName) {
                var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if(roa.length > 0){
                    result[sheetName] = roa;
                }
            });
            return result;
        },
        fixdata(data) {
            var o = "", l = 0, w = 10240;
            for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
            o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
            return o;
        },
        pickFile () {
            this.$refs.excelFile.click ()
        },
        onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
                this.fileName = files[0].name
                const reader = new FileReader ()
                reader.onload = e => {
                    var results, 
                    data = e.target.result, 
                    fixedData = this.fixdata(data), 
                    workbook=XLSX.read(btoa(fixedData), {type: 'base64'}), 
                    firstSheetName = workbook.SheetNames[0], 
                    worksheet = workbook.Sheets[firstSheetName];

                    this.headers=this.get_header_row(worksheet);
                    results=XLSX.utils.sheet_to_json(worksheet);
                    this.tickets=results;


                };
                reader.readAsArrayBuffer(files[0]);
			} else {
				this.headers = []
				this.tickets = []
			}
		}

    },
    watch: {
        success(val){
            if(val){
                this.$router.push("/app/commons");
            }
        }
    }
}
</script>
