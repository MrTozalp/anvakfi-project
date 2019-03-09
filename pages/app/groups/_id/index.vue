<template>
    <group-form :loadedGroup="loadedGroup" @submit="onSubmitted"/>
</template>
            

<script>
import GroupForm from '@/components/inside/form/GroupForm'
export default {
    layout: 'inside',
    components: {
        GroupForm
    },
    computed: {
        loadedGroup () {
            return this.$store.getters['group/getGroupById'](this.$route.params.id)
        }
    },
    methods: {
        onSubmitted(loadedGroup) {
            this.$store.dispatch("group/editGroup", loadedGroup).then(() => {
                this.$router.push("/app/groups");
            });
        }
    }
}
</script>