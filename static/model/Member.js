const Member = [
    {
        key: "fullname",
        value: "Ad Soyad",
        attrs : []
    },
    {
        key: "identityNumber",
        value: "Kimlik No",
        attrs : []
    },
    {
        key: "reference",
        value: "Referans",
        attrs : []
    },
    {
        key: "birthDate",
        value: "Doğum Tarihi",
        attrs : []
    },
    {
        key: "email",
        value: "Email",
        attrs : []
    },
    {
        key: "bloodType",
        value: "Kan Grubu",
        attrs : [],
        isList: true
    },
    {
        key: "title",
        value: "Ünvan",
        attrs : []
        
    },
    {
        key: "jobTitle",
        value: "Mesleki Ünvan",
        attrs : []
    },
    {
        key: "workPlace",
        value: "Çalıştığı Yer",
        attrs : []
    },
    {
        key: "occupation",
        value: "Meslek",
        attrs : [],
        isList: true
    },
    {
        key: "groups",
        value: "Grup",
        attrs : [],
        isList: true
    },
    {
        key: "gender",
        value: "Cinsiyet",
        attrs : [],
        isList: true
    },
    {
        key: "mobilePhone",
        value: "Cep Telefonu",
        attrs : []
    },
    {
        key: "homePhone",
        value: "Ev Telefonu",
        attrs : []
    },
    {
        key: "workPhone",
        value: "İş Telefonu",
        attrs : []
    },
    {
        key: "hometown",
        value: "Memleket",
        attrs : [],
        isList: true
    },
    {
        key: "province",
        value: "İl",
        attrs : [],
        ignore : true,
        isList: true
    },
    {
        key: "district",
        value: "İlçe",
        attrs : [],
        isList: true,
        parent: "province",
        ignore : true
    },
    {
        key: "homeAddress",
        value: "Ev Adresi",
        attrs : []
    },
    {
        key: "workAddress",
        value: "İş Adresi",
        attrs : []
    },
    {
        key: "addressChoice",
        value: "Adres Seçimi",
        attrs : [],
        isList: true
    },
    {
        key: "branch",
        value: "Şube",
        attrs : [],
        isList: true
    }
]


export default Member;