<template>

  <div id="page-text-fields">
    
      <v-layout row wrap>
        <v-flex lg12>
          <v-widget :title="formTitle" backTo="/app/branches" >
            <div slot="widget-content">
                <v-container>
                    <v-form ref="form" v-model="valid" @submit.prevent="onSave" lazy-validation>
                    <FormInput                                        
                            >
                        <v-text-field slot="form-text-field1"
                            v-model="branch.branchName"
                            label="Şube Adı"
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-text-field slot="form-text-field2"
                            v-model="branch.branchPhone"
                             label="Telefon"
                            mask="(###) ### - ####"
                            :rules="[rules.required]"
                        ></v-text-field>
                    </FormInput>

                    <FormInput>
                             <v-text-field slot="form-text-field1"
                            v-model="branch.branchFax"
                             label="Faks"
                            mask="(###) ### - ####"
                        ></v-text-field>
                        <v-textarea slot="form-text-field2"
                            v-model="branch.branchAddress"
                            label="Adres" 
                        ></v-textarea>
                    </FormInput>
                    <v-layout row>
                        <v-flex xs4>
                        </v-flex>
                        <v-flex xs8>
                            <form-button 
                               type="submit"
                                color="primary">
                                Kaydet
                            </form-button>
                            <form-button 
                                 @click="onCancel"
                                color="error">
                                İptal
                            </form-button>
                        </v-flex>
                    </v-layout>
                    </v-form>
                </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
  </div>
</template>
            

<script>

import VWidget from '@/components/VWidget'
import FormInput from '@/components/inside/form/FormInput'
import FormButton from '@/components/inside/form/FormButton'
export default {
    components: {
        VWidget,
        FormInput,
        FormButton
    },
    props:{
        loadedBranch: {
            type: Object,
            required: false
        }
    },
    computed: {
        formTitle() {
            return this.loadedBranch==null ? 'Yeni Üye' : 'Üye Güncelle'
        }
    },
    data () {
        return {
            valid: true,
            branch:  this.loadedBranch
            ? { ...this.loadedBranch }
            : {
                branchName: "",
                branchAddress: "",
                branchPhone: "",
                branchFax: ""
            },
            rules: {
                required: (value) => !!value || 'Zorunlu'    
            }  
        }
    },
    methods: {
        onSave() {
             if (this.$refs.form.validate())
                this.$emit('submit', this.branch)
        },
        onCancel() {
        // Navigate back
            this.$router.push("/app/branches")
        }
    }
}
</script>
            


