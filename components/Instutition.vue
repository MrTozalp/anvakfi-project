<template>
  
<v-card>
    <v-card-text>      
       <logo/>
       <v-subheader class="pa-0">Giriş için vakıf seçiniz</v-subheader>
      <v-autocomplete
        v-model="model"
        :items="instutions"
        prepend-icon="mdi-city"
      >
      </v-autocomplete>
    </v-card-text>
   
  </v-card>
</template>

<script>
import Logo from '@/components/Logo.vue'
  export default {
    data () {
      return {
        isEditing: false,
        model: null,
        instutions: [
          'Anadolu Eğitim ve Kültür Vakfı'
        ]
      }
    },
    components: {
        Logo
    }
  }
</script>