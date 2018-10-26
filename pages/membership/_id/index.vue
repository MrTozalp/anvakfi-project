<template>
    <member-form :editedMember="editedMember"/>
</template>
            

<script>

import MemberForm from '@/components/inside/form/MemberForm'
import { getUserById as getUserById } from '@/static/user'
export default {
    layout: 'inside',
    components: {
        MemberForm
    },
    data () {
        return {
            editedMember : getUserById(this.$route.params.id)
        }
    }

}
</script>