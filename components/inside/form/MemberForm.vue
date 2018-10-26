<template>

  <div id="page-text-fields">
    
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Yeni Üye" backTo="/membership" >
            <div slot="widget-content">
                <v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                    <FormInput                                        
                            >
                        <v-text-field slot="form-text-field2"
                            v-model="member.identityNumber"
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
                            :rules="[rules.required]"
                        ></v-text-field>
                    </FormInput>
                    <FormInput>
                        <v-text-field slot="form-text-field1"
                            v-model="member.jobTitle"
                            label="Meslek" 
                        ></v-text-field>
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
                                @click="submit"
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
import { Items as Members } from '@/static/user'
import VWidget from '@/components/VWidget'
import FormInput from '@/components/inside/form/FormInput'
import FormButton from '@/components/inside/form/FormButton'
export default {
    components: {
        VWidget,
        FormInput,
        FormButton
    },
    data () {
        return {
            valid: true,
            member:  {
                fullname: "",
                email: "",
                identityNumber: "",
                phone: "",
                jobTitle: "",
                address: ""
            },
            rules: {
                required: (value) => !!value || 'Gerekli',
                email: (value) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'Geçersiz email';
                }    
            }  
        }
    },
    methods: {
        submit() {

            if (this.$refs.form.validate()) {
                // Save the member
                console.log(this.member)
                Members.push(this.member)
                this.$router.push("/membership")
            }

        },
        onCancel() {
        // Navigate back
            this.$router.push("/membership");
        }
    }
};
</script>
            


