import { jwtDecode } from "jwt-decode";


const useUser = () => {

    const token = localStorage.getItem('accessToken')
    
    if (token) {
        try{
            return jwtDecode(token)
        }catch{
            return null
        }
    }else{

        window.location.href = '/login'
    }

}

export default useUser