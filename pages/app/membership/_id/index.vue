<template>
    <member-form 
        :loadedMember="loadedMember" 
        @submit="onSubmitted"/>
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
            return this.$store.getters['member/getMemberById'](this.$route.params.id)
        }
    },
    methods: {
        onSubmitted(loadedMember) {
            this.$store.dispatch("member/editMember", loadedMember).then(() => {
                this.$router.go(-1) 
            });
        }
    }
}
</script>