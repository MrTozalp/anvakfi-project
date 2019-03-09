<template>
  <form  @submit.prevent="onSignin">
    <v-layout row v-if="error">
      <v-flex>
        <app-alert @dismissed="onDismissed" type="error" :text="error.message | errorMessage"></app-alert>
      </v-flex>
    </v-layout>
      <v-card-text >
        <v-text-field
          prepend-icon="person"
          type="text"
          :counter="10"
          label="Email"
          v-model="email"
          :disabled = "!isInstSelected"
          :rules="[rules.required, rules.email]"
          required
        ></v-text-field>
        <v-text-field
          prepend-icon="lock"
          :disabled = "!isInstSelected"
          type="password"
          v-model="password"
          label="Parola"
          :rules="[rules.required]"
          required
        ></v-text-field>
        </v-card-text>
        <v-spacer/>
        <v-layout align-center justify-center>
            <v-btn
              
              type="submit"
                color="primary"
                flat
                :disabled = "!isInstSelected "
                :loading="loading">GİRİŞ YAP
                <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                  </span>
                </v-btn>

        </v-layout>

  </form>
</template>

<script>
import Instutition from '@/components/Instutition.vue'
import Logo from '@/components/Logo.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('dataAction')
export default {
  
  components: {
    Instutition,
    Logo
  },
  data () {
    return {
      logoSrc: '',
      isInstSelected : true,
      email: '',
      password: '',
      rules: {
        required: (v) => !!v || 'Bu alanı doldurunuz!',
        email: (v) =>  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Geçersiz email',
        uniquePhone: (value) => {
            return !this.modelList.some(el =>  ( el.phone === value && el.id !== this.member.id) )   || 'Bu telefon numarası ile kayıt bulunmaktadır. Lütfen başka bir numara giriniz.'
        }
      }
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
  },
  computed: {
    ...mapState({
        loading : state => state.loading, 
        error   : state => state.error
      })
  },
  methods: {
    onSignin () {
      this.$store.dispatch('authentication/authenticateUser', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/app');
      });
    },
    onDismissed () {
      this.$store.dispatch('authentication/clearError')
    }
  }
}
</script>