<template>
    <member-form :loadedMember="loadedMember" @submit="onSubmitted"/>
</template>
            

<script>
import MemberForm from '@/components/inside/form/MemberForm'
export default {
    layout: 'inside',
    components: {
        MemberForm
    },
    computed: {
        loadedMember () {
            return this.$store.getters.fetchMember(this.$route.params.id)
        }
    },
    methods: {
        onSubmitted(loadedMember) {
            this.$store.dispatch("editMember", loadedMember).then(() => {
                this.$router.push("/app/membership");
            });
        }
    }
}
</script>