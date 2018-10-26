<template>
    <v-data-table
        :headers="tableConfig.headers"
        :search="search"
        :items="tableConfig.items"
        :rows-per-page-items="tableConfig.rows_per_page_items"
        class="elevation-1"
        item-key="fullname"
        select-all
        v-model="tableConfig.selected"
    >

     <template slot="items" slot-scope="props">
        <td>
            <v-checkbox
                primary
                hide-details
                v-model="props.selected"
            ></v-checkbox>
        </td>
        <td>{{ props.item.identityNumber }}</td>
        <td>{{ props.item.fullname }}</td>
        <td>{{ props.item.email }}</td>
        <td>{{ props.item.phone }}</td>
        <td>{{ props.item.jobTitle }}</td>
        
        <td>
            <v-btn depressed outline icon fab dark color="primary" small>
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn depressed outline icon fab dark color="red" small>
                <v-icon>delete</v-icon>
            </v-btn>
        </td> 
     </template>

    </v-data-table>
    
</template>

<script>
export default {
    props: {
        tableConfig: {
            type: Object,
            required: true
        }
    }
}
</script>

