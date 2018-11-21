const Menu =  [
    { name: 'home' , icon: 'dashboard', text: 'Kontrol Paneli', to:'/app', },
    { divider: true },
    { heading: 'Üyelik Yönetimi' },
    { name: 'membership', icon: 'face', text: 'Üyeler', to:'/app/membership'  },
    { name: 'groups', icon: 'group_work', text: 'Gruplar', to:'/app/groups' },
    { name: 'branches', icon: 'account_balance', text: 'Şubeler', to:'/app/branches' },
    { divider: true },
    { heading: 'Admin' },
    { name: 'panel-users-profiles', icon: 'accessibility', text: 'Kullanıcılar', to:'/panel/users/profiles' },
    { name: 'panel-users3', icon: 'label', text: 'Genel Bilgiler' , to:'/panel/users'},
    { divider: true }
]


 
  export default Menu;
  