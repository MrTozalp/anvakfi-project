<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      class="flex teal lighten-1 white--text text-xs-center"
      flat
      tile
    >


      <v-divider></v-divider>

      <v-card-actions class="grey darken-3 justify-center">
        &copy;2018 — <strong> Bzm Vakıf</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    })
  }
</script>