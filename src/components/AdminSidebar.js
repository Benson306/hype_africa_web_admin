import React, { useContext, useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import LogoutIcon from '@mui/icons-material/Logout';
import { AdminAuthContext } from '../utils/AdminAuthContext';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';


function AdminSidebar() {

    const [isOpen, setIsOpen] = useState(false);

    const { logout } = useContext(AdminAuthContext);

    const handleSidebar = () =>{
        setIsOpen(!isOpen);
    }

    const handleLogout = (e) => {
      e.preventDefault();
      logout();
    }

  return (
    <div
      className={`min-h-screen shadow-md  bg-gradient-to-l from-zinc-900 via-zinc-800 to-slate-800 ${
        isOpen ? 'w-72' : 'w-16'
      } transition-width duration-500 ease-in-out fixed top-0 left-0 z-100 overflow-hidden`}
    >
        { isOpen && <Link onClick={handleSidebar} to={"/"} >
            <h1 className='text-white text-2xl text-center mt-5'>Neza</h1>
            <h2  className='text-gray-300 text-sm text-center mt-2'>Web Admin Dashboard</h2>
            
            </Link> }

        <MenuIcon htmlColor="#fff" style={{float: 'right', marginRight: 22, marginTop: 50, marginBottom: 20}} onClick={handleSidebar}/>

        {/* <div className="mt-28" style={{marginLeft: isOpen ? '30px' : '10px', marginRight:'10px'}}> */}
        <div
        className={`mt-28 ml-4 lg:ml-${isOpen ? '12' : '5'} `}
      >

            <Link onClick={handleSidebar} className="flex text-white py-2 align-middle gap-4 hover:text-blue-400 mb-2" to={"/discover_campaigns"}>
                <StickyNote2Icon sx={{fontSize: 28}}/>
                <div style={{display: isOpen ? 'block' : 'none'}}>Manage Creator Applications</div> 
            </Link>

            <Link onClick={() => handleSidebar()} className="flex text-white text-sm py-2 ml-8 lg:ml-8 mr-1 align-middle gap-4 hover:text-blue-200" to={"/view_content_applications"}>
                  <div style={{display: isOpen ? 'block' : 'none'}}> + Pending Content Applications</div> 
            </Link>

            <Link onClick={() => handleSidebar()} className="flex text-white text-sm py-2 ml-8 lg:ml-8 mr-1 align-middle gap-4 hover:text-blue-200 mb-2" to={"/view_influencer_applications"}>

                    <div style={{display: isOpen ? 'block' : 'none'}}>+ Pending Influencer Applications</div> 

            </Link>

            <Link onClick={() => handleSidebar()} className="flex text-white text-sm py-2 ml-8 lg:ml-8 mr-1 align-middle gap-4 hover:text-blue-200" to={"/approved_applicants"}>

                    <div style={{display: isOpen ? 'block' : 'none'}}> + Approved Applications</div> 

            </Link>

            <Link onClick={() => handleSidebar()} className="flex text-white text-sm py-2 ml-8 lg:ml-8 mr-1 align-middle gap-4 hover:text-blue-200 mb-2" to={"/rejected_applicants"}>

                    <div style={{display: isOpen ? 'block' : 'none'}}>+ Rejected Applications</div>

            </Link>

            <Link onClick={handleSidebar} className="flex text-white py-2 align-middle gap-4 hover:text-blue-400 mb-2" to={"/manage_company_applications"}>
                <AssignmentTurnedInIcon sx={{fontSize: 28}}/>
                <div style={{display: isOpen ? 'block' : 'none'}}>Manage Company Applications</div> 
            </Link>

            <Link onClick={handleSidebar}  className="flex text-white py-2 align-middle gap-4 hover:text-blue-400 mb-5" to={"/manage_admins"}>
                <ManageAccountsIcon sx={{fontSize: 28}}/>
                <div style={{display: isOpen ? 'block' : 'none'}}>Manage Admin Users</div>
            </Link>
            

            <button onClick={(e)=> handleLogout(e)} className='absolute bottom-10 left-0 p-4 flex  align-middle gap-4 hover:text-red-700 bg-black text-blue-400 w-full justify-center place-items-center' >
              <LogoutIcon />
              <div className='text-lg' style={{display: isOpen ? 'block' : 'none'}}>Sign Out</div> 
            </button>
            
        </div>
    </div>
  )
}

export default AdminSidebar
