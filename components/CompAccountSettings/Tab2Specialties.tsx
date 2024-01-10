import React, { useEffect, useState } from 'react';
import { selectChoosenUserProfile } from '@/Redux/Reducers/sliceChoosenUserAndProfile';
import { useDispatch, useSelector } from 'react-redux';
import { AppControlOptimizedQueryUrl, AppControlReverseQueryUrl, UserControlOptimizedQueryUrl } from '@/Utils/Config';
import { getOptimizedQuery } from '@/Utils/pagination';
import { SpecialtyOptimizedType, UserProfileOptimizedType } from '@/Utils/types';
import Tab2PromoteProfile from './Tab2PromoteProfile';
import Tab2AssignSpecialty from './Tab2AssignSpecialty';
import { SpecialtyFieldList, UserProfileFieldList } from '@/Utils/constants';
import { forEach } from 'lodash';


const Tab2Specialties = () => {
  const storeProfile = useSelector(selectChoosenUserProfile);
  const [ count, setCount ] = useState<number>(0);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ hasSpecialties, setHasSpecialties ] = useState<boolean>(false);
  const [ showPromote, setShowPromote ] = useState<boolean>(false);
  const [ userProfiles, setUserProfiles ] = useState<any[]>();
  const [ mySpecialtyList, setMySpecialtyList ] = useState<SpecialtyOptimizedType[]>();
  const [ myLevelList, setMyLevelList ] = useState<any[]>([]);

  const [ userProfileFieldList, setUserProfileFieldList] = useState<string[]>(UserProfileFieldList)
  const [ mySpecialtyFieldList, setMySpecialtyFieldList] = useState<string[]>(SpecialtyFieldList)

  useEffect(() => {
    if (count == 0 && storeProfile[0] != 0) {
      getOptimizedQuery(setUserProfiles, ()=>{}, ()=>{}, ()=>{}, ()=>{}, UserControlOptimizedQueryUrl, { model: "UserProfile", searchField: "user__id", value: storeProfile[15], fieldList: [...userProfileFieldList], page: 1})
      setCount(count + 1)
    }
    if (count == 1) {
      if (userProfiles) { 
        const fil = userProfiles.filter((item: UserProfileOptimizedType) => item[6] != null)
        console.log(fil)
        if (fil.length > 0) { 
          setHasSpecialties(true);
          getOptimizedQuery(setMySpecialtyList, ()=>{}, ()=>{}, ()=>{}, ()=>{}, AppControlReverseQueryUrl, { 
            model: "Specialty", 
            searchField: "userprofile_specialty__user_id",
            value: storeProfile[15],
            fieldList: [...SpecialtyFieldList]
          });
          if (mySpecialtyList) {
            setMyLevelList(mySpecialtyList.map((item: SpecialtyOptimizedType) => parseInt(item[6].toString()) ).sort());
            setLoading(false);
            setCount(count + 1);
          }
        } else {
          setCount(count + 1);
        }
      } 
    }

  }, [count, userProfiles, storeProfile, userProfileFieldList, mySpecialtyList])

  return (
    <div>
      {
        (loading && count != 2) ? 

          <>Loading ...</> 
            
          : 
          
          hasSpecialties ? 

            <Tab2PromoteProfile 
              mySpecialtyList={mySpecialtyList}
              myLevelList={myLevelList}
            /> 
              
            : 
            
            <Tab2AssignSpecialty 
              selectedProfile={storeProfile} 
            />
        }
    </div>
  )
}

export default Tab2Specialties