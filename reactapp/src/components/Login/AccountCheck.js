import React from 'react'
import AdminLogin from './AdminLogin';
import UserLogin from './UserLogin';
import AccountCreate from './AccountCreate';
const AccountCheck = (props) => {
  return (
    <div>
    {props.adminlogin?<div className='loginForm'><AdminLogin/></div>:""}
      {props.userlogin?<div className='loginForm'><UserLogin createAcc={props.createUserAccount} /></div>:""}
      {props.createAccount?<div className='loginForm'><AccountCreate/></div>:""}
    </div>
  )
}
export default AccountCheck;
