const Menu =  [
    { name: 'home' , icon: 'dashboard', text: 'Kontrol Paneli', to:'/app', },
    { divider: true },
    { heading: 'Üyelik Yönetimi' },
    { name: 'app-membership', icon: 'face', text: 'Üyeler', to:'/app/membership'  },
    { name: 'app-groups', icon: 'group_work', text: 'Gruplar', to:'/app/groups' },
    { name: 'app-branches', icon: 'account_balance', text: 'Şubeler', to:'/app/branches' },
    { divider: true },
    { heading: 'Admin' },
    { name: 'app-users', icon: 'accessibility', text: 'Kullanıcılar', to:'/app/users' },
    { name: 'app-common', icon: 'label', text: 'Genel Bilgiler' , to:'/app/common'},
    { divider: true }
]


 
  export default Menu;
  