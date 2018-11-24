<template>
    <v-toolbar card color="white">
        <v-btn fab color="green" dark small nuxt :to="newRecord">
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
    computed: {
        newRecord(){
            return this.$route.path + "/new-record"
        }
    },
}
</script>




