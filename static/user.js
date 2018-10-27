var Items =  [
  {
    'uuid': '1',
    'fullname': 'Murat Özalp',
    'identityNumber': '19863462331',
    'email': 'ozlp.mrt@gmail.com',
    'username': 'Dessie79',
    'jobTitle': 'Yazılım Uzmanı',
    'phone': '+905517992809',
    'address': 'Yukarıyurtçu Mahallesi Odtü TOki Evleri Blok:10-N Daire:18 Etimesgut'
  },
  {
    'uuid': '2',
    'fullname': 'Murat Özalp',
    'identityNumber': '19863462331',
    'email': 'ozlp.mrt@gmail.com',
    'username': 'Dessie79',
    'jobTitle': 'Yazılım Uzmanı',
    'phone': '+905517992809',
    'address': 'Deneme deneme deneme Deneme DenemeDeneme'
  },
  {
    'uuid': '3',
    'fullname': 'Murat Özalp',
    'identityNumber': '19863462331',
    'email': 'ozlp.mrt@gmail.com',
    'username': 'Dessie79',
    'jobTitle': 'Yazılım Uzmanı',
    'phone': '+905517992809',
    'address': 'Plevne Mahallesi Zafer Sok. No:21/3 Balıkesirt'
  },
  {
    'uuid': '4',
    'fullname': 'Murat Özalp',
    'identityNumber': '19863462331',
    'email': 'ozlp.mrt@gmail.com',
    'username': 'Dessie79',
    'jobTitle': 'Yazılım Uzmanı',
    'phone': '+905517992809',
    'address': 'Yukarıyurtçu Mahallesi Odtü TOki Evleri Blok:10-N Daire:18 Etimesgut'
  },
  {
    'uuid': '5',
    'fullname': 'Murat Özalp',
    'identityNumber': '19863462331',
    'email': 'ozlp.mrt@gmail.com',
    'username': 'Dessie79',
    'jobTitle': 'Yazılım Uzmanı',
    'phone': '+905517992809',
    'address': 'Yukarıyurtçu Mahallesi Odtü TOki Evleri Blok:10-N Daire:18 Etimesgut'
  },
  {
    'uuid': '6',
    'fullname': 'Murat Özalp',
    'identityNumber': '19863462331',
    'email': 'ozlp.mrt@gmail.com',
    'username': 'Dessie79',
    'jobTitle': 'Yazılım Uzmanı',
    'phone': '+905517992809',
    'address': 'Plevne Mahallesi Zafer Sok. No:21/3 Balıkesir'
  },
  {
    'uuid': '7',
    'fullname': 'Murat Özalp',
    'identityNumber': '19863462331',
    'email': 'ozlp.mrt@gmail.com',
    'username': 'Dessie79',
    'jobTitle': 'Yazılım Uzmanı',
    'phone': '+905517992809',
    'address': 'Plevne Mahallesi Zafer Sok. No:21/3 Balıkesir'
  }


];

const getUserById = (uuid) => {
  return (uuid === undefined) ? Items[0] : Items.find(x => x.uuid === uuid);
};

const getUser = (limit) => {
  return (limit) ? Items.slice(0, limit) : Items;
};

export {
  Items,
  getUser,
  getUserById
};