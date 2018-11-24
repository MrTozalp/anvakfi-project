<template>
    <branch-form  @submit="onSubmitted"/>
</template>
            
<script>

import BranchForm from '@/components/inside/form/BranchForm'
export default {
    layout: 'inside',
    components: {
        BranchForm
    },
    methods: {
        onSubmitted(branchRecord) {
            this.$store.dispatch("addBranch", branchRecord).then(() => {
                this.$router.push("/app/branches")
            });
        }
    }
}
</script>
            


