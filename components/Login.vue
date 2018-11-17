<template>
  <form  @submit.prevent="onSignin">
    <v-card>
    <v-layout row v-if="error">
      <v-flex>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
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
          required
        ></v-text-field>
        <v-text-field
          prepend-icon="lock"
          :disabled = "!isInstSelected"
          type="password"
          v-model="password"
          label="Parola"
          required
        ></v-text-field>
        </v-card-text>
        <v-spacer/>
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
    </v-card>
  </form>
</template>

<script>
import Instutition from '@/components/Instutition.vue'
import Logo from '@/components/Logo.vue'
import { mapGetters } from 'vuex'
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
      password: ''
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
    ...mapGetters([ 'loading', 'error'])
  },
  methods: {
    onSignin () {
      this.$store.dispatch("authenticateUser", {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/app');
      });
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>