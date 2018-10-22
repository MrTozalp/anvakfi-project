<template>

  <v-form >
    <v-card>
      <v-card-text>
        <logo v-if="isInstSelected" @instutionEdit="selectInstutition" :logoSrc="logoSrc"></logo>
        <instutition v-else @instutionAdded="selectInstutition"/>
      </v-card-text>
    </v-card>     
    <v-card>
      <v-card-text >
        <v-text-field
          prepend-icon="person"
          type="text"
          :counter="10"
          label="Kullanıcı Adı"
          :disabled = "isInstSelected == false"
          required
        ></v-text-field>
        <v-text-field
          prepend-icon="lock"
          :disabled = "isInstSelected == false"
          type="password"
          label="Parola"
          required
        ></v-text-field>
        </v-card-text>
        <v-spacer/>
              <v-btn
                color="primary"
                flat
                :disabled = "isInstSelected == false"
                nuxt
                to="/home">GİRİŞ YAP</v-btn>
    </v-card>
  </v-form>
  
</template>

<script>
import Instutition from '@/components/Instutition.vue'
import Logo from '@/components/Logo.vue'
export default {
  components: {
    Instutition,
    Logo
  },
  data () {
    return {
      logoSrc: '',
      isInstSelected : false
    }
  },
  methods: {
      selectInstutition(logoSource){
        if(logoSource === '') this.isInstSelected = false;
        else{
          this.logoSrc = logoSource;
          this.isInstSelected = true;
        }
      }
  }
}
</script>