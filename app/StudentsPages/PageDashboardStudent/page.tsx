'use client';
import { addUserProfile, selectUserProfile, selectAuthUser } from '@/Redux/Reducers/sliceUser'
import { useGetAllUserProfiles } from '@/Utils/customHooks';
import { UserProfile } from '@/Utils/types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const PageDashboardStudent = () => {

  const storeUser = useSelector(selectAuthUser);
  const storeUserProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const [ fetching, setFetching ] = useState<boolean>(false);
  const [ profiles, setProfiles ] = useState<UserProfile[]>([]);

  useGetAllUserProfiles(setProfiles, setFetching);
  useEffect(() => {
    const fil = profiles.filter((item: UserProfile) => item.user.id == storeUser.id)
    if (fil.length > 0) { dispatch(addUserProfile(fil[0])) }
  }, [storeUser, profiles, dispatch])

  return (
    <div>DASHBOARD STUDENT</div>
  )
}

export default PageDashboardStudent