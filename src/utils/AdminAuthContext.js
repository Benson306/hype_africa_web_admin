import { createContext, useEffect, useState } from "react"

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [adminId, setAdminId] = useState(null);

    const addAdminId = (id) => {
        setAdminId(id);

        localStorage.setItem('adminId', id);
    }

    const logout = () => {
        setAdminId(null);
        localStorage.removeItem('adminId');
    }


    const isAdminIdSet = async () => {
        try{

            let AdminId = localStorage.getItem('adminId');

            if(AdminId){
                setAdminId(AdminId);
            }

        }
        catch(e){
            console.log('Error setting Admin Id');
        }
    }

    useEffect(()=>{
        isAdminIdSet();
    },[]);

    return (
        <AdminAuthContext.Provider value={{ adminId, addAdminId, logout}}>
            { children }
        </AdminAuthContext.Provider>
    )
}