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
            <template v-if="isThereRecord">
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

            <template v-else-if="!isThereRecord">
                <v-alert :value="true" color="info" icon="warning">
                    Kayıt yüklemek için excel dosyası seçiniz.
                </v-alert>
            </template>
        </v-flex>
    </v-layout>
</template>

<script>
import XLSX from 'xlsx'
import { mapState } from 'vuex'
export default {

    computed: {
        ...mapState({
            busy :  state => state.dataAction.busy,
            error : state => state.dataAction.error,
            success : state => state.dataAction.success,
            tickets: state => state.fileImport.tickets,
            headers: state => state.fileImport.headers,
            fileName: state => state.fileImport.fileName,
        }),
        isThereRecord(){
            return this.$store.getters['fileImport/isThereRecord']
        }
    },
    methods: {
        cancelProcess(){
            this.$store.dispatch('fileImport/reset')
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
        get__row(sheet) {
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
        fixdata(data) {
            var o = "", l = 0, w = 10240;
            for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
            o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
            return o;
        },
        onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
                this.$store.commit('fileImport/SET_FILE_NAME',files[0].name)
                const reader = new FileReader ()
                reader.onload = e => {
                    var results, 
                    data = e.target.result,
                    fixedData =  this.fixdata(data),
                    workbook=XLSX.read(btoa(fixedData), {type: 'base64'}),
                    firstSheetName = workbook.SheetNames[0],
                    worksheet = workbook.Sheets[firstSheetName];
                    this.$store.commit('fileImport/SET_HEADERS',this.get_header_row(worksheet))
                    results=XLSX.utils.sheet_to_json(worksheet, {raw: false, defval:null});
                    this.$store.commit('fileImport/SET_TICKETS',results)
                    console.log("RECORDS")
                    console.log(this.tickets)


                };
                reader.readAsArrayBuffer(files[0]);
			} else {
				this.cancelProcess()
			}
        },
        pickFile () {
            this.$refs.excelFile.click ()
        }
    },
    watch: {
        success(val){
        }
    }

}
</script>
