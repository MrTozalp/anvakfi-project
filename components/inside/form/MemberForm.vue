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
                                single-line
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
                                single-line
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.email"
                                label="Email" 
                                :rules="[rules.required,rules.email]" 
                            ></v-text-field>
                        </FormInput>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.phone"
                                label="Telefon"
                                mask="(###) ### - ####"
                                :rules="[rules.required,rules.uniquePhone]"
                            ></v-text-field>
                        </FormInput>
                        
                        <FormInput v-if="branchList.length > 0">
                            <v-autocomplete
                                slot="form-field"
                                v-model="member.branch"
                                :items="branchList"
                                item-text="branchName"
                                item-value="id"
                                label="Şube"
                                :rules="[rules.required]"
                                single-line
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput>
                            <v-textarea slot="form-field"
                                v-model="member.address"
                                label="Adres" 
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
                phone: "",
                address: "",
                branch: "",
                gender: "",
                occupation: ""
            },
            rules: {
                required: (value) => !!value || 'Zorunlu',
                email: (value) => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || 'Geçersiz email';
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
                itemList.push(
                    
                    item.commonItem
                )
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
            


