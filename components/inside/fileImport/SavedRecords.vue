<template>
    <v-treeview :items="savedRecords" open-all multiple-active></v-treeview>
</template>

<script>
export default {
    props: {
        savedRecords: {
            type: Array,
            required: true
        }
    }
}
</script>

<style>

</style>
