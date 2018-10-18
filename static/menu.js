const Menu =  [
    { name: 'home' , icon: 'dashboard', text: 'Kontrol Paneli', to:'/home', },
    { divider: true },
    { heading: 'Üyeler' },
    { name: 'panel-users', icon: 'lightbulb_outline', text: 'Üye Yönetimi', to:'/panel/users'  },
    { name: 'panel-users2', icon: 'touch_app', text: 'Yeni Üye Ekle', to:'/panel/users' },
    { divider: true },
    { heading: 'Admin' },
    { name: 'panel-users-profiles', icon: 'archive', text: 'Kullanıcı Yönetimi', to:'/panel/users/profiles' },
    { name: 'panel-users3', icon: 'delete', text: 'Kullanıcı Ekle' , to:'/panel/users'},
    { divider: true },
    { heading: 'Etkinlikler' },
    { name: 'panel-users4', icon: 'settings',  text: 'Etkinlik Listesi', to:'/panel/users' },
    { name: 'panel-users5', icon: 'chat_bubble', text: 'Etkinlik Ekle', to:'/panel/users' },
    { divider: true },
]


  
  export default Menu;
  