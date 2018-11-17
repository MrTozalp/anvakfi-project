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
    asyncData(context) {
        return context.app.$axios
        .$get(
            "/members/" +
            context.params.id +
            ".json"
        )
        .then(data => {
            return {
                loadedMember: { ...data, id: context.params.id }
            };
        })
        .catch(e => context.error());
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