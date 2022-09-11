    import {AuthContext} from "../Context/auth-context";
    import {useContext} from "react";

    export const useAuthContext = () =>
    {
        const context = useContext(AuthContext);
        if(!context)
        {
            throw Error('useAuthContext must me used inside an AuthContextProvider');
        }
        return context;
    }