<template>

  <div id="page-text-fields">
    
      <v-layout>
        <v-flex lg12 sm6>
          <v-widget :title="branch ? 'Yeni Şube'  : 'Şube Güncelle'" backTo="/app/branches" >
            <div slot="widget-content">
                
                    <v-form ref="form" v-model="valid" @submit.prevent="onSave" lazy-validation>
                    <v-container>
                    <v-layout row wrap>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="branch.branchName"
                                label="Şube Adı"
                                :rules="[rules.required]"
                            ></v-text-field>
                        </FormInput>
                        <FormInput v-for="(item,index) in commonItemList" :key="index">
                            <v-autocomplete
                                slot="form-field"
                                v-model="branch.commons[index]"
                                :items="item.items"
                                item-text="name"
                                item-value="name"
                                :label="item.name"
                                :rules="[rules.required]"
                                single-line
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="branch.branchPhone"
                                label="Telefon"
                                mask="(###) ### - ####"
                                :rules="[rules.required]"
                            ></v-text-field>
                        </FormInput>
                        <FormInput>
                                <v-text-field slot="form-field"
                                v-model="branch.branchFax"
                                label="Faks"
                                mask="(###) ### - ####"
                            ></v-text-field>
                        </FormInput>

                        <FormInput>
                            <v-textarea slot="form-field"
                                v-model="branch.branchAddress"
                                label="Adres" 
                            ></v-textarea>
                        </FormInput>
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
                        </v-layout>
                    </v-container>
                    </v-form>
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
        commonItemList(){
            let itemList = []
            const branchCommons = this.$store.getters.moduleCommonsByModuleName("branch")
            branchCommons.forEach(item => {
                itemList.push( item.commonItem)
            })
            return itemList
        }

    },
    data () {
        return {
            valid: true,
            branch: this.loadedBranch
            ? { ...this.loadedBranch }
            : {
                branchName: "",
                branchAddress: "",
                branchPhone: "",
                branchFax: "",
                commons : []
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
            


