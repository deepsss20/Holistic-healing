const emailRegex =  /\S+@\S+\.\S+/;
const phoneRegex = /^\d{10}$/


export const validateEmail=(email)=>{
    return emailRegex.test(email)
}

export const validatePhone = (phone)=>{
    return phoneRegex.test(phone)
}

