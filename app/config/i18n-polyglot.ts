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
    sign_up_success_message: "Signup is successful, Please Login!",
    go_to_login: "Go to Login",
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    password: "Password",
    oops_error:"Oops!!!",
    welcome:"Welcome",
    welcome_name_message:"Welcome %{name}",
    something_went_wrong:"Something Went Wrong Try Again",
    user_not_exists_message:"User Not Exists Please Sign Up",
    password_is_not_correct_message:"Password Is Not Correct"
}

const lang_tr = {
    user_name:"Kullanıcı Adı",
    sign_up: "Kayıt Ol",
    log_in: "Giriş",
    log_out:"Çıkış",
    log_out_message:"Seni Özleyeceğiz %{name} :)",
    forgot_password: "Şifremi Unuttum ?",
    sign_up_success_message: "Kayıt başarılı Lütfen Giriş Yapınız",
    go_to_login: "Giriş",
    first_name: "İsim",
    last_name: "Soyisim",
    email: "Email",
    password: "Şifre",
    oops_error:"Off!!!",
    welcome:"Hoşgeldiniz",
    welcome_name_message:"Hoşgeldin %{name}",
    something_went_wrong:"Bir Şeyler Yanlış Gitti , Lütfen Tekrar Deneyiniz",
    user_not_exists_message:"Böyle bir kullanıcı bulunmuyor, Lütfen Kayıt Olunuz",
    password_is_not_correct_message:"Şifre Doğru Değil"
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
