<template>

  <div id="page-text-fields">
    
      <v-layout>
        <v-flex lg12 sm6 >
          <v-widget :title="member ? 'Yeni Üye'  : 'Üye Güncelle'" back>
            <div slot="widget-content">
                
            <v-form ref="form" v-model="valid" @submit.prevent="onSave" lazy-validation>
                    <v-container fluid>
                        <v-layout row wrap>

                        <FormInput >
                            <v-text-field slot="form-field"
                                v-model="member.fullname"
                                :readonly="isView"
                                label="Ad Soyad"    
                                :rules="[rules.required]"
                            ></v-text-field>
                        </FormInput>

                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.identityNumber"
                                mask="###########"
                                :readonly="isView"
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
                                :readonly="isView"
                                
                                :clearable="!isView"
                                :items="genderList"
                                item-text="name"
                                item-value="id"
                                label="Cinsiyet"
                            >
                            </v-autocomplete>
                        </FormInput>

                        <FormInput >
                            <v-text-field slot="form-field"
                                v-model="member.bloodType"
                                :readonly="isView"
                                label="Kan Grubu"
                                hint="A+, A-, AB+ vs."
                            ></v-text-field>
                        </FormInput>

                        <FormInput >
                            <v-text-field slot="form-field"
                                v-model="member.title"
                                :readonly="isView"
                                label="Ünvan"
                            ></v-text-field>
                        </FormInput>

                        <FormInput >
                            <v-text-field slot="form-field"
                                v-model="member.jobTitle"
                                :readonly="isView"
                                label="Mesleki Ünvan"
                            ></v-text-field>
                        </FormInput>
                        <FormInput v-if="occupationList.length > 0">
                            <v-autocomplete
                                slot="form-field"
                                v-model="member.occupation"
                                :readonly="isView"
                                
                                :clearable="!isView"
                                :items="occupationList"
                                item-text="name"
                                item-value="id"
                                label="Meslek"
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput >
                            <v-text-field slot="form-field"
                                v-model="member.workPlace"
                                :readonly="isView"
                                label="Çalıştığı Yer"
                            ></v-text-field>
                        </FormInput>

                        <FormInput>
                            <date-picker
                                label="Doğum Tarihi"
                                slot="form-field"
                                v-model="member.birthDate">
                            </date-picker>

                        </FormInput>

                        
                        <FormInput v-if="groupList.length > 0">
                            <v-autocomplete
                                slot="form-field"
                                v-model="member.groups"
                                :items="groupList"
                                :readonly="isView" 
                                item-text="groupName"
                                item-value="id"
                                label="Gruplar"
                                multiple
                                hide-selected
                                small-chips
                                deletable-chips
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.email"
                                :readonly="isView"
                                
                                label="Email" 
                                :rules="[rules.email]" 
                            ></v-text-field>
                        </FormInput>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.mobilePhone"
                                :readonly="isView"
                                
                                label="Cep Telefonu"
                                mask="(###) ### - ####"
                                :rules="[rules.required,rules.uniquePhone]"
                            ></v-text-field>
                        </FormInput>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.homePhone"
                                :readonly="isView"
                                
                                label="Ev Telefonu"
                                mask="(###) ### - ####"
                            ></v-text-field>
                        </FormInput>

                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="member.workPhone"
                                :readonly="isView"
                                
                                label="İş Telefonu"
                                mask="(###) ### - ####"
                            ></v-text-field>
                        </FormInput>
                        <FormInput v-if="hometownList.length > 0">
                            <v-autocomplete
                                slot="form-field"
                                v-model="member.hometown"
                                :readonly="isView"
                                
                                :clearable="!isView"
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
                            :readonly="isView"
                            
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
                                :readonly="isView"
                                
                                :clearable="!isView"
                                :items="branchList"
                                item-text="branchName"
                                item-value="id"
                                label="Şube"
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput v-if="provinceList.length > 0">
                            <v-autocomplete
                                slot="form-field"
                                :readonly="isView"
                                
                                :clearable="!isView"
                                v-model="member.province"
                                :items="provinceList"
                                item-text="name"
                                item-value="id"
                                label="İl"
                                
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput v-if="provinceList.length > 0">
                            <v-autocomplete
                                slot="form-field"
                                :readonly="isView"
                                
                                :clearable="!isView"
                                v-model="member.district"
                                :items="districtList"
                                item-text="name"
                                item-value="id"
                                label="İlçe"
                                no-data-text="İle Göre İlçe Bulunmamaktadır"
                            >
                            </v-autocomplete>
                        </FormInput>
                        <FormInput>
                            <v-textarea slot="form-field"
                                :readonly="isView"
                                
                                v-model="member.homeAddress"
                                label="Ev Adresi" 
                            ></v-textarea>

                        </FormInput>
                        <FormInput>
                            <v-textarea slot="form-field"
                                :readonly="isView"
                                
                                v-model="member.workAddress"
                                label="İş Adresi" 
                            ></v-textarea>

                        </FormInput>
                    
                        <v-flex xs4>
                        </v-flex>
                        <v-flex xs8 v-if="!isView">
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

import VWidget from '@/components/VWidget'
import FormInput from '@/components/inside/form/FormInput'
import FormButton from '@/components/inside/form/FormButton'
import DatePicker from '@/components/inside/form/DatePicker'
export default {
    components: {
        DatePicker,
        VWidget,
        FormInput,
        FormButton
    },
    props:{
        isView: {
            type: Boolean
        },
        loadedMember: {
            type: Object,
            required: false
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
                birthDate: "",
                bloodType: "",
                title: "",
                jobTitle: "",
                workPlace: "",
                groups: [],
                mobilePhone: "",
                homePhone: "",
                workPhone: "",
                province: "",
                district: "",
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
                        return  !this.memberList.some(el =>  ( el.mobilePhone === value && el.id !== this.member.id) )   || 'Bu telefon numarası ile kayıt bulunmaktadır. Lütfen başka bir numara giriniz.' 
                    }
                    else return true
                }
            }  
        }
    },
    computed: {
        memberList(){
            console.log(this.$route.query)
            return this.$store.state.member.members
        },
        groupList(){
            return this.$store.state.group.groups
        },
        branchList() {
            return this.$store.state.branch.branches
        },
        genderList() {
            return this.$store.getters['commonInfo/getCommonByValue']('gender')
        },
        occupationList() {
            return this.$store.getters['commonInfo/getCommonByValue']('occupation')
        },
        hometownList() {
            return this.$store.getters['commonInfo/getCommonByValue']('hometown')
        },
        provinceList() {
            return this.$store.getters['commonInfo/getCommonByValue']('province')
        },
        districtList() {
            return this.member.province ? 
                 this.$store.getters['commonInfo/getCommonByParent'](this.member.province) : []

        },
        memberDate() {
            return this.member.birthDate
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
    },
    watch: {
        memberDate(val) {
            if(val)
                console.log("birth date : "+val)
        }
    }
}
</script>
            


