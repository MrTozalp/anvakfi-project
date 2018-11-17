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
