<template>
<v-form ref="form" v-model="valid" @submit.prevent="onSave" lazy-validation xs12>
     <v-layout >
       
       <v-flex xs6>
        <v-autocomplete
            v-model="memberModel"
            :items="memberColumns"
            label="Tablo Sütunları"
            item-text="value"
            return-object
            persistent-hint
            :disabled="selected"
            :rules="[rules.required]"
          >
        </v-autocomplete>
    </v-flex>
    <v-flex xs6>
        <v-autocomplete
          v-model="selectedHeader"
          hide-selected
          :items="excelHeaders"
          item-text="text"
          multiple
          clearable
          return-object
          label="Excel Sütunları"
          :disabled="selected"
          persistent-hint
          :rules="[rules.required]"
        >
      </v-autocomplete>
    </v-flex>
    <v-flex xs2>
      <v-btn type="submit" v-if="!selected" fab dark small color="green">
        <v-icon dark>done</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" @click="onRemove" v-else>
        <v-icon dark>remove</v-icon>
      </v-btn>
    </v-flex>
       
     </v-layout>
      </v-form>
</template>

<script>
export default {
  props: {
      excelHeaders: {
          type: Array,
          required: true
      }  
  },
  data () {
      return {
        memberModel: null,
        valid: true,
        selected: false,
        memberColumns: [],
        unselectedExcelHeaders: Object.assign([], this.excelHeaders),
        selectedHeader: null,
        rules: {
            required: (v) => !!v || 'Zorunlu'
        } 
      } 
  },
  computed: {
    unselectedModel() {
      return this.$store.getters['fileImport/getUnselectedModel']
    }
  },
  created () {
    this.$store.dispatch('fileImport/initModel')
    Object.assign(this.memberColumns, this.$store.getters['fileImport/getUnselectedModel'])
    
  },

  methods: {

    onSave(){
        if (this.$refs.form.validate()){
          const newModel = {
            ...this.memberModel,
            attrs :  this.selectedHeader
          }
          this.$store.dispatch('fileImport/insertHeaderItems', this.selectedHeader)
          this.$store.dispatch('fileImport/insertModelItem', newModel)
          this.selected = true
          this.$emit('submit')
          console.log("selected headers: "+this.selectedHeader)
        }
    },
    onRemove(){
      this.$store.dispatch('fileImport/removeModelItem', this.memberModel)
      this.$store.dispatch('fileImport/removeHeaderItems', this.selectedHeader) 
      this.$emit('remove')
    }
  },
  watch: {

    
  }
}
</script>

<style>

</style>
