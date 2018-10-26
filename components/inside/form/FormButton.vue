<template>
    <v-btn
        :color="color" 
        v-bind="$attrs"
        v-on="$listeners">
        <slot/>
    </v-btn>
    
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            required: true
        }
    }
}
</script>

