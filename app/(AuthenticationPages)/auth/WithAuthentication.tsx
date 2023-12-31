import MyProvider from '@/Redux/MyProvider'
import { selectAuthUser } from '@/Redux/Reducers/sliceUser'
// import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NotAuthenticated from '../NotAuthenticated'


const WithAuthentication = (Component: any) => {
    
    const AuthComponent = (props: unknown) => {
        const storeUser = useSelector(selectAuthUser)
        const router = useRouter()
        const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false)
        useEffect(() => {
            if (storeUser.id > 0){
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
                // router.push("/")
            }
        }, [storeUser, router]);

        return !!isAuthenticated ? <MyProvider><Component /></MyProvider>
            : 
        <NotAuthenticated />
    };

    return AuthComponent;
}

export default WithAuthentication