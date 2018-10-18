<template>
  <v-carousel hide-delimiters="true">
    <v-carousel-item 
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
      
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: 'http://www.anadoluvakfi.org/sites/default/files/styles/1140_x_500/public/field/image/akaid_0.jpg?itok=_Jf4Aay4'
          },
          {
            src: 'http://www.anadoluvakfi.org/sites/default/files/styles/1140_x_500/public/field/image/yaylalar.jpg?itok=ZEgX3GmI'
          },
          {
            src: 'http://www.anadoluvakfi.org/sites/default/files/styles/1140_x_500/public/field/image/basliksiz-1_kopya_26.jpg?itok=1NuhSoz3'
          },
          {
            src: 'http://www.anadoluvakfi.org/sites/default/files/styles/1140_x_500/public/field/image/basliksiz-1_kopya_24.jpg?itok=UELpZQvU'
          }

        ]
      }
    }
  }
</script>