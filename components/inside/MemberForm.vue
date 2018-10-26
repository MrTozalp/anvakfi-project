<template>
  <div id="page-text-fields">
    
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Yeni Üye" backTo="/membership" >
            <div slot="widget-content">
                <v-container>
                    <FormInput
                        v-model="fullname"
                        subheader="Ad Soyad" 
                        label="Ad Soyad"
                        :rules="[rules.required]"
                            />

                </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    
  </div>
</template>
            

<script>
import VWidget from '@/components/VWidget';
import MemberFormRow from '@/components/inside/form/FormInput';
export default {
    components: {
        VWidget,
        FormInput
    },
    data () {
        return {
            email: '',
            rules: {
                required: (value) => !!value || 'Gerekli',
                email: (value) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(value) || 'Invalid e-mail.';
                }    
            }  
        };
    }
};
</script>
            
