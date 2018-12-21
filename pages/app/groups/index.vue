<template>
  <v-layout
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
                
        <v-btn success @click="exportWord">export word</v-btn>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
    layout: 'inside',
    middleware: ["check-auth", "auth","common"],
    methods : {
        exportWord(){
            var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
            var context     = "<table><tr>"                     
            context      = context + "<td>Plevne Mahalesi Zafer Sok. No:18/5 Balıkesir</td>"
            context      = context + "<td>Yukarıyurtçu Mahallesi Odtü TOki Evleri Blok:10-N Daire:18 Etimesgut</td>"
            context      = context + "<td>Yukarıyurtçu Mahallesi Odtü TOki Evleri Blok:10-N Daire:18 Etimesgut</td>"
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

