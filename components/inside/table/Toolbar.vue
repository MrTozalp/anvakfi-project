<template>
    <v-toolbar card color="white">
        <slot name="searchField"></slot>
        <v-btn icon>
        <v-icon>filter_list</v-icon>
        </v-btn>
        <v-btn icon nuxt to="/membership/profiles">
        <v-icon>account_box</v-icon>
        </v-btn> 
        <v-btn icon nuxt to="/membership/new-member"   >
        <v-icon>add</v-icon>
        </v-btn>          
    </v-toolbar>
</template>
