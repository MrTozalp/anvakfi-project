<template>
    
        <v-flex lg6 class="px-5">
            <slot name="form-field"></slot>
        </v-flex>
    
</template>

<script>
export default {
    props:{
        commonItem: {
            type: String
        }
    },
}

</script>
