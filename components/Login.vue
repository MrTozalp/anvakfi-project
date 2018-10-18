<template>

  <v-form>
      
    <Instutition/>
<v-card>
     <v-card-text>
    <v-text-field
      prepend-icon="person"
      type="text"
      :counter="10"
      label="Kullanıcı Adı"
      disabled
      required
    ></v-text-field>
    <v-text-field
      prepend-icon="lock"
      disabled
      type="password"
      label="Parola"
      required
    ></v-text-field>
    </v-card-text>

    <v-spacer/>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/home">GİRİŞ YAP</v-btn>
    </v-card>
  </v-form>
  
</template>

<script>
import Instutition from '~/components/Instutition.vue'

export default {
  components: {
    Instutition
  }
}
</script>