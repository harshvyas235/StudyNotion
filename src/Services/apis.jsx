

const BASE_URl="http://localhost:4000/api/v1"

console.log("ye base url bhi dekh lo ")
console.log(BASE_URl)



export const Auth={
     Login_api : BASE_URl+"/login",
     Signup_api: BASE_URl+"/signup",
     SendOtp_api: BASE_URl+"/sendotp",
     changePasword_api:BASE_URl+"/changepassword",
     Resetpasswor_token_api:BASE_URl+"/reset-password-token",
     Resetpasword_api:BASE_URl+"/reset-password",
}



export const categoriesApI={
    show_ALL_Categories :BASE_URl+"/course/showAllCategories",
}