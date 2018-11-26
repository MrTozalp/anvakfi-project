<template>
  <v-data-table
    :items="professions"
    class="elevation-1"
    hide-headers
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
    data () {

    }
}
</script>
