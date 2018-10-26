var Items =  [
  {
    'uuid': '65a6eb21-67b5-45c3-9af7-faca2d9b60d4',
    'fullname': 'Murat Özalp',
    'identityNumber': '19863462331',
    'email': 'ozlp.mrt@gmail.com',
    'username': 'Dessie79',
    'jobTitle': 'Yazılım Uzmanı',
    'phone': '+905517992809',
    'address': ''
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