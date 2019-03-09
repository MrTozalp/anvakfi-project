import Vue from 'vue'

const errorMessages = {
  "EMAIL_NOT_FOUND" : "Bu email adresi ile hesap bulunamadı.",
  "INVALID_PASSWORD" : "Geçersiz Şifre !",
  "USER_DISABLED" : "Kullanıcı etkin değildir. Uygulama yöneticiyle iletişime geçiniz.",
  "INVALID_EMAIL" : "Geçersiz Email !"
}


const errorFilter = value => {
  return errorMessages[value];
};


Vue.filter('errorMessage', errorFilter)

Vue.filter('column', function (column) {
  if(column.filter === 'yesNo'){
    if(column.value)
      return 'Evet'
    else return 'Hayır'
  }
  else if(column.filter === 'phone'){
    return column.value.replace(/^([0-9]{3})([0-9]{3})([0-9]{4})$/, '($1) $2-$3')
  }
  else
    return column.value
});