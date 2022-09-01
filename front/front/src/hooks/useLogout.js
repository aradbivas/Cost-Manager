import {useAuthContext} from "./useAuthContext";
import {useNavigate} from "react-router-dom";

export const useLogout = () =>
{    const {dispatch} = useAuthContext();
    const use_navigate = useNavigate();

    const logout = () =>
    {
        localStorage.removeItem('user');
        dispatch({type : 'LOGOUT'});
        use_navigate('/')
    }

    return {logout}
}
