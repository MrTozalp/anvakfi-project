const Menu =  [
    { name: 'home' , icon: 'dashboard', text: 'Kontrol Paneli', to:'/home', },
    { divider: true },
    { heading: 'Üyelik Yönetimi' },
    { name: 'membership', icon: 'face', text: 'Üyeler', to:'/membership'  },
    { name: 'members1', icon: 'group_work', text: 'Gruplar', to:'/membership' },
    { name: 'members2', icon: 'account_balance', text: 'Şubeler', to:'/membership' },

    { divider: true },
    { heading: 'Admin' },
    { name: 'panel-users-profiles', icon: 'accessibility', text: 'Kullanıcılar', to:'/panel/users/profiles' },
    { name: 'panel-users3', icon: 'label', text: 'Genel Bilgiler' , to:'/panel/users'},
    { divider: true },
    { icon: 'exit_to_app', text: 'Çıkış' , to:'/'}
]
 
  export default Menu;
  