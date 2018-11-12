<template>
    <member-form  @submit="onSubmitted"/>

</template>
            

<script>
import axios from "axios";
import MemberForm from '@/components/inside/form/MemberForm'
export default {
    layout: 'inside',
    components: {
        MemberForm
    },
    methods: {
        onSubmitted(memberRecord) {
            this.$store.dispatch("addMember", memberRecord).then(() => {
                this.$router.push("/membership")
            });
        }
    }
}
</script>
            


