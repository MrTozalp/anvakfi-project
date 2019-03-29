<template>
        
            <v-widget :title="commonName + ' İçin Kayıt Yükle'" back >
                <FileImport slot="widget-content"></FileImport>
            </v-widget>
   
    
</template>
<script>
import VWidget from '@/components/VWidget'
import FileImport from '@/components/inside/form/FileImport'
export default {
    layout: 'inside',
    middleware: [ 'check-auth','auth','common'],
    components: {
      FileImport,
      VWidget
    },
    computed: {
        commonName(){
            if(this.$route.query.parent)
                return this.$store.getters['commonInfo/getCommonById'](this.$route.query.parent).name
            else
                return this.$store.getters['commonInfo/getCommonNameByValue'](this.$route.params.common)
        }
        
    }
    
}
</script>