import Polyglot from "node-polyglot";

export type I18nContextType = {
    polyglot: Polyglot | null
}

const I18nContext: I18nContextType = {
    polyglot: null
}

const lang_en = {
    user_name:"Username",
    sign_up: "Sign Up",
    log_in: "Login",
    log_out:"Logout",
    log_out_message:"We Will Miss You %{name} :)",
    forgot_password: "Forgot Password ?",
    sign_up_success_message: "SignUp is successful, Please Login %{name}!",
    go_to_login: "Go to Login",
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    password: "Password",
    oops_error:"Oops!!!",
    welcome:"Welcome",
    welcome_name_message:"Welcome %{name}",
    something_went_wrong:"Something Went Wrong Try Again",
    UserNotExists:"User Not Exists Please Sign Up",
    PasswordIsNotCorrect:"Password Is Not Correct",
    this_username_already_taken_by_another_user:"This Username already taken by Another User!!!Please Try Again With Another Username"
}

const lang_tr = {
    user_name:"Kullanıcı Adı",
    sign_up: "Kayıt Ol",
    log_in: "Giriş",
    log_out:"Çıkış",
    log_out_message:"Seni Özleyeceğiz %{name} :)",
    forgot_password: "Şifremi Unuttum ?",
    sign_up_success_message: "Kayıt başarılı %{name} Lütfen Giriş Yapınız",
    go_to_login: "Giriş",
    first_name: "İsim",
    last_name: "Soyisim",
    email: "Email",
    password: "Şifre",
    oops_error:"Off!!!",
    welcome:"Hoşgeldiniz",
    welcome_name_message:"Hoşgeldin %{name}",
    something_went_wrong:"Bir Şeyler Yanlış Gitti , Lütfen Tekrar Deneyiniz",
    UserNotExists:"Böyle bir kullanıcı bulunmuyor, Lütfen Kayıt Olunuz",
    PasswordIsNotCorrect:"Şifre Doğru Değil",
    this_username_already_taken_by_another_user:"Bu Kullanıcı Ismi Başka Bir Kullanıcı Tarafından Alındı!!!Lütfen Başka Bir Kullanıcı Adı Ile Tekrar Deneyiniz"
}

export const initI18n = (selectedLanguage: string): void => {

    const polyglot = new Polyglot()
    switch (selectedLanguage) {
        case "tr":
            polyglot.extend(lang_tr)
            break
        default :
            polyglot.extend(lang_en)
    }
    I18nContext.polyglot = polyglot
}

export default I18nContext
