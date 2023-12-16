'use client';
import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Table, notification } from 'antd'
import { PermGroupsProps, UserType } from '@/Utils/types'
import { useGetAllUsers, useGetPermGroups } from '@/Utils/customHooks'
import { axiosRequest, getAllUsers, getPermGroups } from '@/Utils/functions'
import { AssignGroupToUserUrl } from '@/Utils/Config'
import { getIDsOfArrayOfObjects2Array } from '@/Utils/formulas';
import { useSelector } from 'react-redux';
import FetchingDataIndicator from '@/Designs/FetchingDataIndicator';
import { selectAuthUser } from '@/Redux/Reducers/sliceUser';

const GroupsToUser = () => {

  const storeUserID = useSelector(selectAuthUser).id
  const [fetching, setFetching] = useState(true)
  const [loading, setLoading] = useState(false)
  const [confirmUserGroupAssignment, setConfirmUserGroupAssignment] = useState(false)
  const [users, setUsers] = useState<UserType[]>([])
  const [usersData, setUsersData] = useState<UserType[]>([])
  const [groups, setGroups] = useState<PermGroupsProps[]>([])
  const [groupsData, setGroupsData] = useState<PermGroupsProps[]>([])
  const [selectedUser, setSelectedUser] = useState<UserType | null>()
  const [selectedGroups, setSelectedGroups] = useState<PermGroupsProps[]>([])
  const [unSelectedGroups, setUnSelectedGroups] = useState<PermGroupsProps[]>([])
  const [unSelectedGroupsData, setUnSelectedGroupsData] = useState<PermGroupsProps[]>([])
  const [selectedGroupIDs, setSelectedGroupIDs] = useState<number[]>([])

  useGetAllUsers(setUsers, setFetching)
  useGetPermGroups(setGroups, setFetching)

  useEffect(() => {
    setUsersData(users)
  }, [users])

  useEffect(() => {
    setGroupsData(groups)
  }, [groups])

  const reset = () => {
    getAllUsers(setUsers, setFetching)
    getPermGroups(setGroups, setFetching)
    setUsersData(users)
    setSelectedUser(null)
    setFetching(true)
  }

  const submitGroupsToUser = async () => {
    setLoading(true)

    const values = {...selectedUser, groups: selectedGroupIDs, created_by_id: storeUserID, updated_by_id: storeUserID,}
    console.log(values)

    const response = await axiosRequest<any>({
        method: "put",
        url: AssignGroupToUserUrl + "/" + selectedUser?.id,
        payload: values,
        hasAuth: true,
    })

    setLoading(false)
    if (response?.data.success) {
        notification.success({
            message: "Operation Successful",
            description: "Groups Assigned Successfully"
        })
        setConfirmUserGroupAssignment(false)
        setSelectedUser(undefined)
        setSelectedGroups([])
        setSelectedGroupIDs([])
        reset()
    }
    if (response?.data.errors) {
        notification.error({
            message: "Operation Failed",
            description: "Groups Assignment Failed"
        })
    }
  }

  useEffect(() => {
    let initGroup = selectedUser?.groups?.map((grp: PermGroupsProps) => grp)
    let initGroupID = getIDsOfArrayOfObjects2Array(initGroup)
    if (initGroup){
        setSelectedGroups(initGroup);
    }
    setSelectedGroupIDs(initGroupID);
    setUnSelectedGroups(groups)
    setUnSelectedGroupsData(groups)
  }, [selectedUser, groups])


  const COLUMNS_USER = [
    {title: "USERNAME", dataIndex: "username"},
    {title: "ROLE", dataIndex: "role"},
    {title: "ACTIONS", render: (record: UserType) => <div
      onClick={() => {setSelectedUser(record)} }
      className={`cursor-pointer rounded py-1 px-2 font-semibold italic text-lg`}>
        {record.id == selectedUser?.id ? <div className='flex justify-center gap-4 items-center w-full bg-teal-500 rounded'>
           <span className=''><div className={`bg-black rounded ${fetching ? "px-4" : ""}`}><FetchingDataIndicator fetching={fetching} /></div></span><span>Assigning Groups ...</span>
          </div> : 
          <div className='bg-red-900 rounded text-center'>
            Select
          </div>} 
      </div>
    },
  ]

  const handleOnSelection = (record: PermGroupsProps) => {
    console.log(record, selectedGroups)
    const x = new Set([...selectedGroups, record])
    const y = new Set([...selectedGroupIDs, record.id])
    setSelectedGroups(Array.from(new Set(x)))
    setSelectedGroupIDs(Array.from(new Set(y)))
  }

  const handleOnDeselection = (record: PermGroupsProps) => {
    const a = selectedGroups.filter((grp: PermGroupsProps) => grp.id != record.id)
    const b = selectedGroupIDs.filter((grpID: number) => grpID != record.id)
    setSelectedGroups(a)
    setSelectedGroupIDs(b)
  }

  const COLUMNS_GROUP_SELECTED = [
    {title: "Group Name", dataIndex: "name"},
    {title: "ACTIONS", render: (record: PermGroupsProps) => <> 
        <div
          className={`${selectedGroupIDs?.includes(record.id) ? `bg-green-500 text-center` : "bg-red-500 text-center"} cursor-pointer rounded py-0 px-2 font-semibold italic`}
          onClick={() => handleOnDeselection(record)}
        >
          Already
        </div>
      </>
    },
  ]

  const COLUMNS_GROUP_UNSELECTED = [
    {title: "Group Name", dataIndex: "name"},
    {title: "ACTIONS", render: (record: PermGroupsProps) => <>
        <div
          className={`${selectedGroupIDs?.includes(record.id) ? "hidden" : "bg-red-500 text-center cursor-pointer rounded py-0 px-2 font-semibold italic"}`}
          onClick={() => handleOnSelection(record)}
        >
          Select
        </div> 
        <div
          className={`${selectedGroupIDs?.includes(record.id) ? `bg-green-500 text-center cursor-pointer rounded py-0 px-2 font-semibold italic` : "hidden"}`}
          onClick={() => handleOnDeselection(record)}
        >
          Unselect
        </div>
      </>
    },
  ]

  const searchUsers = (val: string) => {
    const fil = users.filter((item: UserType) => item?.username?.toLowerCase().includes(val.toLowerCase()))
    setUsersData(fil)
  }

  const searchGroups = (val: string) => {
    const fil = groups.filter((Item: PermGroupsProps) => Item.name.toLowerCase().includes(val.toLowerCase()))
    setUnSelectedGroupsData(fil)
  }

  return (
    <div className='flex flex-col gap-2 items-center'>

        <div className='w-full flex gap-2'>
          <Button onClick={() => reset()} className='bg-blue-300'>Reset Table</Button>
          <div className={`bg-black rounded ${fetching ? "px-4" : ""}`}><FetchingDataIndicator fetching={fetching} /></div>
          <Input placeholder='Serarch User' />
        </div>

        <div className='w-full flex gap-2'>

          <div className='w-full flex flex-col gap-2'>
            <h1 className='text-lg text-slate-100 text-center font-semibold italic'>USERS</h1>
            <Input placeholder='Serarch Users' onChange={(e) => {searchUsers(e.target.value)}} />
            <Table
              dataSource={usersData}
              columns={COLUMNS_USER}
            />
          </div>
          <div className='w-full rounded bg-slate-300 py-1 px-3'>
            { selectedUser && selectedGroups ? <div className='mb-6'>
              <h1 className='text-lg text-center font-semibold italic'>Select Group(s) For <code className='text-teal-800'>{selectedUser.username} - {selectedUser.role}</code></h1>
              <div className='flex gap-2'>
                <div className='flex gap-2 flex-col w-full'>
                  <Input placeholder='Serarch Perm Groups' disabled />
                  <Table
                    dataSource={selectedGroups}
                    columns={COLUMNS_GROUP_SELECTED}
                  />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <Input placeholder='Serarch Perm Groups' onChange={(e) => {searchGroups(e.target.value)}} />
                  <Table
                    dataSource={unSelectedGroupsData}
                    columns={COLUMNS_GROUP_UNSELECTED}
                  />
                </div>
              </div>
            </div> : <div></div>}
            { selectedUser && selectedGroups ? <div className='flex w-full'>
              <div className='flex items-center justify-center text-center py-1 px-6 fixed bottom-16'>
                <div onClick={() => {setConfirmUserGroupAssignment(true)}} className='rounded cursor-pointer bg-blue-500 px-4 py-1 w-64 text-2xl font-semibold'>Assign Groups to {selectedUser.username}</div>
              </div>
            </div> : <div className='py-24 justify-center font-semibold uppercase text-2xl text-center'>No User Selected</div>}
          </div>

          
        </div>

        <Modal
            title="Assign Groups to USER"
            open={confirmUserGroupAssignment}
            onCancel={() => setConfirmUserGroupAssignment(false)}
            footer={false}
        >
          <div>
            <h1>Are You Sure To Assign Groups To User - {selectedUser?.username} ?</h1>
            {selectedGroups ? <div className='flex flex-col gap-1'>
              {selectedGroups.map((grp: PermGroupsProps) => <div key={grp.id} className=''>
                <h1 className='flex gap-4 justify-between'>
                  <div className='md:w-32'><span>ID: </span><span>{grp.id}</span></div>
                  <div className='w-full tracking-widest text-center items-center flex justify-between md:mx-10'><span>Group Name: </span><span>{grp.name}</span></div>
                </h1>
              </div>)}
            </div>: <></>}
            <div className='flex justify-center items-center md:mt-4'>
              <div onClick={() => {submitGroupsToUser()}} className='bg-blue-300 rounded py-2 px-12 cursor-pointer'>SUBMIT</div>
            </div>
          </div>  
        </Modal>
    </div>
  )
}

export default GroupsToUser;


export const COLUMNS_USER_TWO = [
	{title: "USERNAME", dataIndex: "username"},
	{title: "ROLE", dataIndex: "role"},
  {title: "DEPARTMENT", dataIndex: "dept",
    render: (record: string) =>  record !== "" ? <>{record}</> : <>N / A</>
  },
	{title: "ACTIONS", dataIndex: "actions"},
]