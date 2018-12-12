<template>

    <v-dialog v-model="dialog" persistent max-width="290">
        <slot name="actionActivator" slot="activator"></slot>
        <v-card>
            <v-card-title class="headline">{{headline}}</v-card-title>
            <v-card-text>{{ content }}</v-card-text>
            <v-card-text>
            
                <slot name="form"></slot>

            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click.native="dialog = false" v-bind="$attrs" v-on="$listeners">{{ actionBtnTitle }}</v-btn>
                <v-btn color="green darken-1" flat @click.native="dialog = false">{{ defaultBtnTitle }}</v-btn>            
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data: () => ({
        dialog: false
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
            required: false,
        }
    }
}
</script>
