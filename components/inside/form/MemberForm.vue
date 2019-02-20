<template>

  <div id="page-text-fields">
    
      <v-layout>
        <v-flex lg12 sm6 >
          <v-widget :title="member ? 'Yeni Üye'  : 'Üye Güncelle'" backTo="/app/membership" >
            <div slot="widget-content">
                
                    <v-form ref="form" v-model="valid" @submit.prevent="onSave" lazy-validation>
                    <v-container fluid>
                        <v-layout row wrap>
                        
                        <FormInput >
                            <v-text-field slot="form-field"
                                v-model="member.fullname"
                                label="Ad Soyad"    
                                :rules="[rules.required]"
                            ></v-text-field>
                        </FormInput>

                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.identityNumber"
                                mask="###########"
                                counter                            
                                maxlength="11"
                                minlength="11"
                                label="Kimlik No"
                            ></v-text-field>

                        </FormInput>

                        <FormInput v-if="genderList.length > 0">
                            <v-autocomplete
                                slot="form-field"
                                v-model="member.gender"
                                :items="genderList"
                                item-text="name"
                                item-value="id"
                                label="Cinsiyet"
                                :rules="[rules.required]"
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput v-if="occupationList.length > 0">
                            <v-autocomplete
                                slot="form-field"
                                v-model="member.occupation"
                                :items="occupationList"
                                item-text="name"
                                item-value="id"
                                label="Meslek"
                                :rules="[rules.required]"
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.email"
                                label="Email" 
                                :rules="[rules.email]" 
                            ></v-text-field>
                        </FormInput>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.mobilePhone"
                                label="Cep Telefonu"
                                mask="(###) ### - ####"
                                :rules="[rules.required,rules.uniquePhone]"
                            ></v-text-field>
                        </FormInput>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.homePhone"
                                label="Ev Telefonu"
                                mask="(###) ### - ####"
                            ></v-text-field>
                        </FormInput>

                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.workPhone"
                                label="İş Telefonu"
                                mask="(###) ### - ####"
                            ></v-text-field>
                        </FormInput>

                        <FormInput>

                         <v-radio-group 
                            label="Etiket Adresi Seçimi" 
                            slot="form-field" 
                            :rules="[rules.required]"
                            row 
                            v-model="member.addressChoice">

                            <v-radio
                                label="Ev Adresi"
                                value="0"
                            ></v-radio>
                            <v-radio
                                label="İş Adresi"
                                value="1"
                            ></v-radio>
                        </v-radio-group>
                        </FormInput>
                        
                        <FormInput v-if="branchList.length > 0">
                            <v-autocomplete
                                slot="form-field"
                                v-model="member.branch"
                                :items="branchList"
                                item-text="branchName"
                                item-value="id"
                                label="Şube"
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput>
                            <v-textarea slot="form-field"
                                v-model="member.homeAddress"
                                label="Ev Adresi" 
                            ></v-textarea>

                        </FormInput>
                        <FormInput>
                            <v-textarea slot="form-field"
                                v-model="member.workAddress"
                                label="İş Adresi" 
                            ></v-textarea>

                        </FormInput>
                    
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
                     </v-container>
                    </v-form>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
  </div>
</template>
            

<script>
import customValidate from '@/mixins/customValidate'
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
    mixins: [customValidate],
    data () {
        return {
            valid: true,
            modelList : this.$store.getters['loadedMembers'],
            member:  this.loadedMember
            ? { ...this.loadedMember }
            : {
                fullname: "",
                email: "",
                identityNumber: "",
                mobilePhone: "",
                homePhone: "",
                workPhone: "",
                homeAddress: "",
                workAddress: "",
                addressChoice: "",
                branch: "",
                gender: "",
                occupation: ""
            },
            rules: {
                required: (value) => !!value || 'Zorunlu',
                email: (value) => {
                    if(value.length > 0){
                        const pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                        return  pattern.test(value) || 'Geçersiz email';
                    }
                },
                uniquePhone: (value) => {
                    return !this.modelList.some(el =>  ( el.phone === value && el.id !== this.member.id) )   || 'Bu telefon numarası ile kayıt bulunmaktadır. Lütfen başka bir numara giriniz.'
                }
            }  
        }
    },
    computed: {
        branchList() {
            return this.$store.getters.loadedBranches
        },
        genderList() {
            return this.$store.getters.selectedCommonList('gender')
        },
        occupationList() {
            return this.$store.getters.selectedCommonList('occupation')
        },
        commonItemList(){
            let itemList = []
            const memberCommons = this.$store.getters.moduleCommonsByModuleName("member")
            memberCommons.forEach(item => {
                itemList.push(item.commonItem)
            })
            return itemList
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
            


