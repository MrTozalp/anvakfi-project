<template>
    <member-form 
        isView
        :loadedMember="loadedMember" />
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
    }

}
</script>