<template>
    <v-toolbar card color="white">
        <v-btn fab color="green" dark small nuxt 
            @click="newRecord">
            <v-icon dark>add</v-icon>
        </v-btn>

        <slot name="searchField"></slot>

        <v-btn icon>
            <v-icon>filter_list</v-icon>
        </v-btn>


        <slot name="exportAction"></slot>
        
        <v-menu  bottom left>
            <v-btn  icon slot="activator">
                <v-icon>more_vert</v-icon>
            </v-btn> 
            
            <slot name="moreAction"></slot>

        </v-menu>


    </v-toolbar>
</template>
<script>
export default {
    props: {
        rowRecord: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        newRecord(){
            if(!this.rowRecord)
                this.$router.push(this.$route.path + "/new-record") 
            else
                this.$emit('newRecord')
        }
    }
}
</script>




