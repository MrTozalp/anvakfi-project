<template>
    <v-toolbar card color="white">
        <v-text-field
        flat
        solo
        prepend-icon="search"
        placeholder="Filtrele"

        hide-details
        class="hidden-sm-and-down"
        ></v-text-field>     
        <v-btn icon>
        <v-icon>filter_list</v-icon>
        </v-btn>
        <v-btn icon nuxt to="/membership/profiles">
        <v-icon>account_box</v-icon>
        </v-btn> 
        <v-btn icon nuxt to="/membership/new-member"   >
        <v-icon >add</v-icon>
        </v-btn>          
    </v-toolbar>
    
</template>
