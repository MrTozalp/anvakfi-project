<template>
    <member-form  @submit="onSubmitted"/>
</template>

<script>

import MemberForm from '@/components/inside/form/MemberForm'
export default {
    layout: 'inside',
    components: {
        MemberForm
    },
    methods: {
        onSubmitted(memberRecord) {
            this.$store.dispatch("member/addMember", memberRecord).then(() => {
                this.$router.go(-1) 
            });
        }
    }
}
</script>
            


