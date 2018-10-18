<template>
  <v-card>
    <v-card-media src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" height="200">
      <v-layout column class="media ma-0">
        <v-card-title>
          <v-btn dark icon>
            <v-icon>chevron_left</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn dark icon class="mr-2">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn dark icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-title class="white--text pl-5 pt-5">
          <div class="headline pl-4 pt-4">{{ fullname }}</div>
        </v-card-title>
      </v-layout>
    </v-card-media>
    <v-list two-line class="pa-0">
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">phone</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{personal_phone}}</v-list-tile-title>
          <v-list-tile-sub-title>Telefon</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile href="#">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{work_phone}}</v-list-tile-title>
          <v-list-tile-sub-title>iş</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">e-mail</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{personal_email}}</v-list-tile-title>
          <v-list-tile-sub-title>Personal</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile href="#">
        <v-list-tile-action></v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{work_email}}</v-list-tile-title>
          <v-list-tile-sub-title>Work</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider inset></v-divider>
      <v-list-tile href="#">
        <v-list-tile-action>
          <v-icon color="indigo">location_on</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{loc_title}}</v-list-tile-title>
          <v-list-tile-sub-title>{{loc_subtitle}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>   
</template>

<script>
export default {
    props: {
    fullname: {
      type: String,
      default: ''
    },
    profile: {
      type: String,
      default: ''
    },
    work_email: {
      type: String,
      default: ''
    } ,
    personal_email: {
      type: String,
      default: ''
    } ,
    work_phone: {
      type: String,
      default: ''
    } ,
    personal_phone: {
      type: String,
      default: ''
    } ,
    loc_title: {
      type: String,
      default: ''
    },
    loc_subtitle: {
      type: String,
      default: ''
    }
  },
};
</script>
