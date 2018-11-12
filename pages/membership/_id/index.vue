<template>
    <member-form :loadedMember="loadedMember" @submit="onSubmitted"/>
</template>
            

<script>
import axios from "axios";
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
            context.params.id +
            ".json"
        )
        .then(res => {
            return {
                loadedMember: { ...res.data, id: context.params.id }
            };
        })
        .catch(e => context.error());
    },
    methods: {
        onSubmitted(loadedMember) {
            this.$store.dispatch("editMember", loadedMember).then(() => {
                this.$router.push("/admin");
            });
        }
    }
}
</script>