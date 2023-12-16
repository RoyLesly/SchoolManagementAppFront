// import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotAuthenticated = () => {
    const router = useRouter();
    
  return (
    <div className='flex flex-col gap-10 justify-center items-center text-center font-bold mt-24 pt-10'>
        <div className='pt-10'>Not Authenticated</div>
        <div className='pt-10'><button onClick={() => { router.push("/") }}>Login Again</button></div>
        {/* <div className='pt-10'><Button onClick={() => { router.push("/") }}>Login Again</Button></div> */}
    </div>
  )
}

export default NotAuthenticated