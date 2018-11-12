<template>
    <member-form :editedMember="loadedMember" @submit="onSubmitted"/>
</template>
            

<script>

import MemberForm from '@/components/inside/form/MemberForm'
export default {
    layout: 'inside',
    components: {
        MemberForm
    },
    asyncData(context) {
        return axios
        .get(
            "https://anadolu-vakfi.firebaseio.com/members/" +
            context.params.memberId +
            ".json"
        )
        .then(res => {
            return {
            loadedMember: { ...res.data, id: context.params.memberId }
            };
        })
        .catch(e => context.error());
    },
    methods: {
        onSubmitted(editedMember) {
            this.$store.dispatch("editMember", editedMember).then(() => {
                this.$router.push("/admin");
            });
        }
    }
}
</script>