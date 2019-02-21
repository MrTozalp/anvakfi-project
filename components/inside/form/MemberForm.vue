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
                                clearable
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
                                clearable
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
                        <FormInput v-if="hometownList.length > 0">
                            <v-autocomplete
                                slot="form-field"
                                v-model="member.hometown"
                                :items="hometownList"
                                item-text="name"
                                item-value="id"
                                label="Memleket"
                            >
                            </v-autocomplete>
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
                occupation: "",
                hometown: ""
            },
            rules: {
                required: (v) => !!v || 'Zorunlu',
                email: (v) =>  v ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Geçersiz email' : true,
                uniquePhone: (value) => {
                    if(value != '0000000000' ){
                        return  !this.modelList.some(el =>  ( el.mobilePhone === value && el.id !== this.member.id) )   || 'Bu telefon numarası ile kayıt bulunmaktadır. Lütfen başka bir numara giriniz.' 
                    }
                    else return true
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
        hometownList() {
            return this.$store.getters.selectedCommonList('hometown')
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
            


