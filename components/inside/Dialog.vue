<template>

    <v-dialog v-model="dialog" persistent max-width="290">
        <slot name="actionActivator" slot="activator"></slot>
        <v-card>
            <v-card-title v-show="headline" class="headline">{{headline}}</v-card-title>
            <v-card-text>{{ content }}</v-card-text>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <slot name="form"></slot>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="actionBtnTitle" color="green darken-1" flat @click="actionClicked" >{{ actionBtnTitle }}</v-btn>
                <v-btn v-if="defaultBtnTitle" color="green darken-1" flat @click.native="dialog = false">{{ defaultBtnTitle }}</v-btn>            
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        valid: true
    }),
    props:{
        headline: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        defaultBtnTitle: {
            type: String,
            required: false,
            default: 'Tamam'
        },
        actionBtnTitle: {
            type: String,
            required: false
        },

    },
    methods: {
        actionClicked(){
            if (this.$refs.form.validate()){
                this.dialog = false
                this.$emit('dialogAction')
            }
        }
    }

}
</script>
