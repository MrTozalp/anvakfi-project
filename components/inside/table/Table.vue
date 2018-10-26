<template>
    <div>
        <TblToolbar >
            <v-text-field
                flat solo hide-details
                v-model="search"
                slot="searchField"
                prepend-icon="search"
                placeholder="Filtrele"
                class="hidden-sm-and-down"
            ></v-text-field>
        </TblToolbar>
        <v-data-table
            :headers="tableConfig.headers"
            :search="search"
            :items="tableConfig.items"
            :rows-per-page-items="tableConfig.rows_per_page_items"
            class="elevation-1"
            select-all
            v-model="tableConfig.selected"
        >
            <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning">
                    Üzgünüm, listede kayıt bulunmamaktadır :(
                </v-alert>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
                 "{{ search }}" aramasına göre sonuç bulunmamaktadır :(
            </v-alert>

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
                    <v-btn depressed outline icon fab dark 
                        color="primary" small
                        @click="editItem(props.item.uuid)"
                        >
                        <v-icon nuxt >edit</v-icon>
                    </v-btn>

                    <dialog-button 
                        headline="Kayıt Silme" 
                        content="Kaydı silmek istiyor musunuz?"
                        actionBtnTitle="SİL"
                        defaultBtnTitle="İPTAL"
                        @click="deleteRecord(props.item)"
                        >
                        <v-btn slot="actionActivator"                    
                            depressed outline icon fab dark small color="red"
                            >
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </dialog-button>
                </td> 
            </template>
        </v-data-table>
    </div>
</template>

<script>
import DialogButton from '@/components/inside/Dialog'
import TblToolbar from '@/components/inside/table/Toolbar'
import { Items as Members } from '@/static/user'
export default {
    data() {
        return {
            search: ''
        }
    },
    components: {
        TblToolbar,
        DialogButton
    },
    props: {
        tableConfig: {
            type: Object,
            required: true
        }
    },
    methods: {
        editItem (uuid) {
            this.$router.push('/membership/'+uuid);
        },
        deleteRecord(item){
            Members.splice(item)
        }
    }
}
</script>

