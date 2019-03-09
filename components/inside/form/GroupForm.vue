<template>
    <v-layout>
        <v-flex lg12 sm6 >
          <v-widget :title="group ? 'Yeni Grup'  : 'Grup Güncelle'" backTo="/app/groups" >
            <div slot="widget-content">

            <v-form ref="form" v-model="valid" @submit.prevent="onSave" lazy-validation>

                <v-container fluid>
                    <v-layout row wrap>
                        <FormInput>
                            <v-text-field slot="form-field"
                                v-model="group.groupName"
                                label="Grup Adı"    
                                :rules="[rules.required]"
                            ></v-text-field>
                        </FormInput>
                        <FormInput>
                            <v-checkbox
                            slot="form-field"
                            v-model="group.isBlackList"
                            label="Kara Liste Mi" 
                            hint="Kara listedeki grup üyeleri asıl listede görünmez. Etiketlerde yer almaz." 
                            ></v-checkbox>
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
        loadedGroup: {
            type: Object,
            required: false
        }
    },
    data () {
        return {
            valid: true,
            group:  this.loadedGroup
            ? { ...this.loadedGroup }
            : {
                groupName: "",
                isBlackList: ""
            },
            rules: {
                required: (v) => !!v || 'Zorunlu',
            }  
        }
    },
    methods: {
        onSave() {

            if (this.$refs.form.validate())
                this.$emit('submit', this.group)


        },
        onCancel() {
        // Navigate back
            this.$router.push("/app/membership")
        }
    }
}
</script>

<style>

</style>
