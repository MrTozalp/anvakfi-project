<template>
    <branch-form 
        :loadedBranch="loadedBranch" 
        @submit="onSubmitted"/>
</template>
            

<script>
import BranchForm from '@/components/inside/form/BranchForm'
export default {
    layout: 'inside',
    components: {
        BranchForm
    },
    asyncData(context) {
        return context.app.$axios
        .$get(
            "/branches/" +
            context.params.id +
            ".json"
        )
        .then(data => {
            return {
                loadedBranch: {...data, id: context.params.id}
            };
        })
        .catch(e => context.error());
    },
    methods: {
        onSubmitted(loadedBranch) {
            this.$store.dispatch("branch/editBranch", loadedBranch).then(() => {
                this.$router.push("/app/branches");
            });
        }
    }
}
</script>