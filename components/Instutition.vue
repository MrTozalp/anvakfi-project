<template>
  
<v-card>
    <v-card-text>
      
       <logo/>
       <v-subheader class="pa-0">Giriş için vakıf seçiniz</v-subheader>
      <v-autocomplete
        v-model="model"
        :items="states"
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
        states: [
          'Anadolu Eğitim ve Kültür Vakfı', 'Ankara Lösemili Çocuklar Vakfı (LÖSEV)', 'Türk Eğitim Vakfı (TEV)',
          'İstanbul Kültür Sanat Vakfı (İKSV)', 'Türkiye Eğitim Gönüllüleri Vakfı (TEGV)'
        ]
      }
    },
    components: {
        Logo
    }
  }
</script>