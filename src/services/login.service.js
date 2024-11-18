const supabase = require("../supabase")

const register = async (obj) => {
    const { data, error } = await supabase.auth.signUp(obj)

    if (error) return error.message

    return data
}

const login = async (obj) => {
    const { data, error } = await supabase.auth.signInWithPassword(obj)

    if (error) {
        // Hata durumunu kontrol et
        if (error.message.includes('Invalid login credentials')) {
            return 'Kullanıcı adı veya şifre hatalı.';
        }
        return error.message; // Genel hata mesajını döndür
    }

    return data
}

module.exports = {
    register,
    login
}