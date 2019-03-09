<template>
        
            <v-widget :title="commonName + ' İçin Kayıt Yükle'" backTo="/app/commons" >
                <FileImport slot="widget-content"></FileImport>
            </v-widget>
   
    
</template>
<script>
import VWidget from '@/components/VWidget'
import FileImport from '@/components/inside/form/FileImport'
export default {
    layout: 'inside',
    components: {
      FileImport,
      VWidget
    },
    computed: {
        commonName(){
            console.log("common param "+this.$store.getters.commonName(this.$route.params.common))
            return (this.$store.getters.commonName(this.$route.params.common))
        }
        
    }
    
}
</script>