<template>
    <group-form  @submit="onSubmitted"/>

</template>
            

<script>

import GroupForm from '@/components/inside/form/GroupForm'
export default {
    layout: 'inside',
    components: {
        GroupForm
    },
    methods: {
        onSubmitted(groupRecord) {
            this.$store.dispatch("group/addGroup", groupRecord).then(() => {
                this.$router.push("/app/groups")
            });
        }
    }
}
</script>
            


