<template>
    <v-treeview :items="selectedCommonHeaders">
        
    </v-treeview>
</template>

<script>
export default {
    computed: {
        selectedCommonHeaders() {
            return this.$store.getters['fileImport/getSelectedCommonHeaders']        
        }
    },
    watch: {
 
    }

}
</script>

<style>

</style>
