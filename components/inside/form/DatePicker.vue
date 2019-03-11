<template>
  <v-menu
    ref="menu1"
    v-model="menu1"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :label="label"
        hint="GG-AA-YYYY"
        v-model="dateFormatted"
        persistent-hint
        prepend-icon="event"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date"
      no-title locale="tr-tr"
      @blur="date = parseDate(dateFormatted)"
      @input="menu1 = false" 
      scrollable></v-date-picker>
  </v-menu>
</template>

<script>

  export default {
    props: ['label','value'],
    data () {
      return {
        menu1: false,
        dateFormatted: this.value,
        date: null
      }
    },

    watch: {
      date(val){
        this.dateFormatted = this.formatDate(this.date)
        this.$emit('input', this.dateFormatted);
      }
    },

    methods: {
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
  }

</script>