<template>
    <v-layout row wrap>
        <v-flex lg4 sm12 v-for="(item, index) in members" :key="index">
            <profile-card 
                v-bind="item">
            </profile-card>
        </v-flex>
    </v-layout>
    
</template>

<script>
import ProfileCard from '@/components/widgets/card/ProfileCard';
export default {
    layout: 'inside',
    components: {
        ProfileCard
    },
    data () {
        return {
            members: [
                {
                    fullname: 'Murat Özalp',
                    profile: "/static/members/profiles/profile2.JPG",
                    work_email: 'ozlp.mrt@innova.com.tr',
                    personal_email: 'ozlp.mrt@gmail.com',
                    work_phone: '5545855544',
                    personal_phone: '5517992809',
                    loc_title: 'Odtü Toki Konutları',
                    loc_subtitle: 'Etimesgut, Ankara 10093'
                },
                {
                    fullname: 'Melih Özalp',
                    profile: "/static/members/profiles/profile1.jpg",
                    work_email: 'ozlp.mrt@innova.com.tr',
                    personal_email: 'ozlp.mrt@gmail.com',
                    work_phone: '5545855544',
                    personal_phone: '5517992809',
                    loc_title: 'Odtü Toki Konutları',
                    loc_subtitle: 'Etimesgut, Ankara 10093'
                },
                {
                    fullname: 'Test Test',
                    profile: '/static/members/profiles/profile1.jpg',
                    work_email: 'test.test@innova.com.tr',
                    personal_email: 'test@gmail.com',
                    work_phone: '5545855544',
                    personal_phone: '5517992809',
                    loc_title: 'Test address',
                    loc_subtitle: 'test, test test'
                },
                {
                    fullname: 'Melih Özalp',
                    profile: "/static/members/profiles/profile1.jpg",
                    work_email: 'ozlp.mrt@innova.com.tr',
                    personal_email: 'ozlp.mrt@gmail.com',
                    work_phone: '5545855544',
                    personal_phone: '5517992809',
                    loc_title: 'Odtü Toki Konutları',
                    loc_subtitle: 'Etimesgut, Ankara 10093'
                },
                {
                    fullname: 'Test Test',
                    profile: '/static/members/profiles/profile1.jpg',
                    work_email: 'test.test@innova.com.tr',
                    personal_email: 'test@gmail.com',
                    work_phone: '5545855544',
                    personal_phone: '5517992809',
                    loc_title: 'Test address',
                    loc_subtitle: 'test, test test'
                },
                {
                    fullname: 'Test Test',
                    profile: '/static/members/profiles/profile1.jpg',
                    work_email: 'test.test@innova.com.tr',
                    personal_email: 'test@gmail.com',
                    work_phone: '5545855544',
                    personal_phone: '5517992809',
                    loc_title: 'Test address',
                    loc_subtitle: 'test, test test'
                }

            ]
        }
    }
}
</script>

