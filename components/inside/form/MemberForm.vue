<template>

  <div id="page-text-fields">
    
      <v-layout row wrap>
        <v-flex lg12>
          <v-widget :title="formTitle" backTo="/app/membership" >
            <div slot="widget-content">
                <v-container>
                    <v-form ref="form" v-model="valid" @submit.prevent="onSave" lazy-validation>
                    <FormInput                                        
                            >
                        <v-text-field slot="form-text-field2"
                            v-model="member.identityNumber"
                            mask="###########"
                            counter
                            maxlength="11"
                            minlength="11"
                            label="Kimlik No"
                        ></v-text-field>
                        <v-text-field slot="form-text-field1"
                            v-model="member.fullname"
                            label="Ad Soyad"    
                            :rules="[rules.required]"
                        ></v-text-field>
                    </FormInput>

                    <FormInput>
                        <v-text-field slot="form-text-field1"
                            v-model="member.email"
                            label="Email" 
                            :rules="[rules.required,rules.email]"   
                        ></v-text-field>
                        <v-text-field slot="form-text-field2"
                            v-model="member.phone"
                            label="Telefon"
                            mask="(###) ### - ####"
                            :rules="[rules.required]"
                        ></v-text-field>
                    </FormInput>
                    <FormInput>
                        <v-select
                            slot="form-text-field1"
                            v-model="member.branch"
                            :items="branchList"
                            item-text="branchName"
                            item-value="id"
                            label="Şube"
                            persistent-hint
                            single-line
                        ></v-select>
                        <v-text-field slot="form-text-field2"
                            v-model="member.jobTitle"
                            label="Meslek" 
                        ></v-text-field>

                    </FormInput>
                    <FormInput>
                        <v-textarea slot="form-text-field2"
                            v-model="member.address"
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
        loadedMember: {
            type: Object,
            required: false
        }
    },
    computed: {
        formTitle() {
            return this.loadedMember==null ? 'Yeni Üye' : 'Üye Güncelle'
        }
    },
    data () {
        return {
            valid: true,
            member:  this.loadedMember
            ? { ...this.loadedMember }
            : {
                fullname: "",
                email: "",
                identityNumber: "",
                phone: "",
                jobTitle: "",
                address: "",
                branch: ""
            },
            rules: {
                required: (value) => !!value || 'Zorunlu',
                email: (value) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'Geçersiz email';
                }    
            }  
        }
    },
    computed: {
        branchList() {
            return this.$store.getters.loadedBranches

        }
    },
    methods: {
        onSave() {
             if (this.$refs.form.validate())
                this.$emit('submit', this.member)
        },
        onCancel() {
        // Navigate back
            this.$router.push("/app/membership")
        }
    }
}
</script>
            


