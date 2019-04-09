const Menu =  [
    { name: 'home' , icon: 'dashboard', text: 'Kontrol Paneli', to:'/app', },
    { divider: true },
    { heading: 'Üyelik Yönetimi' },
    { name: 'app-membership', icon: 'face', text: 'Üyeler', to:'/app/membership'  },
    { name: 'app-membership', icon: 'assignment_ind', text: 'Kara Liste', to:'/app/membership?black=true'  },
    { name: 'app-groups', icon: 'group_work', text: 'Gruplar', to:'/app/groups' },
    { name: 'app-branches', icon: 'account_balance', text: 'Şubeler', to:'/app/branches' },
    { divider: true },
    { heading: 'Admin' },
    { name: 'app-log', icon: 'accessibility', text: 'Loglar', to:'/app/log' },
    { name: 'app-common', icon: 'label', text: 'Genel Bilgiler' , to:'/app/commons'},
    { divider: true }
]


 
  export default Menu;
  