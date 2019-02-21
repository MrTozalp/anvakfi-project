<template>
    <v-toolbar card color="white">
        <v-container fluid>
        <v-layout row wrap justify-center>
        
        <v-flex xs4>
            <v-layout >
                <slot name="searchField"></slot>
            </v-layout>
            
        </v-flex>

        <v-flex xs6 >
            <v-layout justify-center>
                <slot name="filterField"></slot>
            </v-layout>
        </v-flex>

        <v-flex xs2>
            <v-layout justify-end >
                <v-btn fab color="green" dark small nuxt 
                    @click="newRecord">
                    <v-icon dark>add</v-icon>
                </v-btn>

                <slot name="toolbarAction"></slot>
                
                <v-menu  bottom left v-if="moreAction">
                    <v-btn  icon slot="activator">
                        <v-icon>more_vert</v-icon>
                    </v-btn> 
                    
                    <slot name="moreAction"></slot>
                </v-menu>
            </v-layout>
        </v-flex>
        </v-layout>
        </v-container>
    </v-toolbar>
</template>
<script>
export default {
    props: {
        rowRecord: {
            type: Boolean
        },
        moreAction:{
            type: Boolean
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




