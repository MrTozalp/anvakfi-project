<template>

  <v-layout row wrap>
    <v-flex lg4 sm12 v-for="(item,index) in trending2" :key="'c-trending'+index">
        <circle-statistic
              :title="item.subheading"
              :sub-title="item.headline"
              :caption="item.caption"
              :icon="item.icon.label"
              :color="item.linear.color"
              :value="item.linear.value"
            >
        </circle-statistic>  
    </v-flex>
  </v-layout>
</template>

<script>
import CircleStatistic from '@/components/widgets/statistic/CircleStatistic';

export default {
    layout: 'inside',
    middleware: ["check-auth", "auth"],
    components: {
      CircleStatistic
  },
    data () {
      return {
        trending2: [
        {
          subheading: 'Üyeler',
          headline: '15+',
          caption: '  yeni üye',
          percent: 15,
          icon: {
            label: 'face',
            color: 'info'
          },
          linear: {
            value: 15,
            color: 'info'
          }
        },        
        {
          subheading: 'Görevler',
          headline: '90%',
          caption: '  görev tamamlandı.',
          percent: 90,
          icon: {
            label: 'assignment_turned_in',
            color: 'primary'
          },
          linear: {
            value: 90,
            color: 'success'
          }
        },        
        {
          subheading: 'Duyurular',
          headline: '2+',
          caption: 'yeni duyuru.',
          percent: 100,
          icon: {
            label: 'feedback',
            color: 'primary'
          },
          linear: {
            value: 100,
            color: 'error'
          }
        },        
      ]
      };
  }
}
</script>

