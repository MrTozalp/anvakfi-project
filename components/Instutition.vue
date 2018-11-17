<template> 
       <v-card flat height="185px">
    
         <v-container fill-height fluid>
          <v-card-title  primary-title>
            Giriş için vakıf seçiniz
          </v-card-title>
        
          <v-autocomplete
            v-model="selectedInstutition"
            :items="instutions"
            prepend-icon="fa-city"
            :search-input.sync="selectedInstutition"
          >
          </v-autocomplete>
        </v-container>
       </v-card>
       

</template>

<script>
  export default {
    data () {
      return {
        isEditing: false,
        selectedInstutition : null,
        instutions: [
          'Anadolu Eğitim ve Kültür Vakfı'
        ]
      }
    },
    watch: {
      selectedInstutition(val){
          if(val === 'Anadolu Eğitim ve Kültür Vakfı')
            this.$emit('instutionAdded', 'http://vitalisweb.net/anadoluvakfi/img/ico/Logo.png')
          else return

      }
    }
  }
</script>