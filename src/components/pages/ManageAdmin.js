import React, { useContext, useEffect, useState } from 'react'
import { AdminAuthContext } from '../../utils/AdminAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ManageAdmin() {

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const { adminId } = useContext(AdminAuthContext);

    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
    const openModal = (index) => {
      setCurrentMediaIndex(index);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/admin_users`)
        .then(response => response.json())
        .then(response => {
          setData(response)
        })
        .catch(err => {
          console.log(err);
        })
    },[])


    const handleDelete = (id) => {

      if(adminId == id){
        toast.error('Failed. Account cannot be deleted while logged In!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        return;
      }

      fetch(`${process.env.REACT_APP_API_URL}/del_admin_users/${id}`,{
        method: 'DELETE'
      })
      .then(response => {
        if(response.ok){
          toast.success('Success!', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000)
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Failed. Server Error!', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      })
    }

    const [selectedData, setSelectedData] = useState(null);

  return (
    <div className="w-full min-h-screen bg-neutral-300">
      <ToastContainer />
        <div className='p-4 ml-16 text-gray-900 font-mono'>Manage Admin Users</div>
        <div className='p-4 ml-16'>


        <div className="overflow-x-auto">
        <div className="mb-4 flex justify-between">
          <button onClick={e => {
            e.preventDefault();
            navigate("/add_user")
          }} className='bg-blue-500 text-white p-2 rounded-lg shadow-lg text-sm'>
            + Add New Admin User
          </button>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-blue-500 rounded text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="w-full table-fixed border-collapse border border-blue-500">
        <thead>
          <tr className="bg-neutral-900 text-white text-xs">
            <th className="border border-neutral-500 py-2 px-4 w-1/6">#</th>
            <th className="border border-neutral-500 py-2 px-4 w-2/6">Email</th>
            <th className="border border-neutral-500 py-2 px-4 w-1/6">Change Password</th>
            <th className="border border-neutral-500 py-2 px-4 w-2/6">Delete User</th>
          </tr>
        </thead>
        <tbody>
          {data.filter((user, index)=>{
                if(
                    user.email.toLowerCase().includes(searchQuery.toLowerCase())
                ) 
                {
                    return user;
                }
            }).map((user, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white text-center text-sm' : 'bg-gray-200 text-center text-sm'}>
            <td className="border border-neutral-500 py-2 px-4 w-1/6">{user.id}</td>
              <td className="border border-neutral-500 py-2 px-4 w-2/6">{user.email}</td>
              <td className="border border-neutral-500 py-2 px-4 w-1/6">
                <button onClick={e =>{ e.preventDefault(); openModal(0); setSelectedData(user)}} className='bg-blue-600 hover:bg-blue-900 shadow-lg text-white rounded-lg p-2'>
                    Change Password
                </button>
              </td>
              <td className="border border-neutral-500 py-2 px-4 w-2/6">
                <button onClick={(e)=> {e.preventDefault(); handleDelete(user.id)}} className='bg-red-600 hover:bg-red-900 shadow-lg text-white rounded-lg p-2'>
                    Delete Account
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>

        {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-80">

          <div className="bg-white p-5 rounded-lg shadow-lg lg:w-1/4">
            <div className='flex justify-end mb-1 lg:mb-5'>
                <button
                    onClick={closeModal}
                    className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full text-sm flex flex-end"
                >
                    X
                </button>
            </div>

            <div className='w-full'>
              <div className='text-2xl mb-2'>Change Password</div>
              <hr />

              { selectedData && <div className='mt-5'>
                <label className='mb-2 font-bold'>Email</label>
                <div className='mb-4'>{selectedData.email}</div>
                </div>}

                <form >
                  <label className='font-bold'>Old Password</label>
                  <br />
                  <input type="password" className='p-2 mt-4 mb-4 border-2 rounded-lg w-full border-neutral-600 ' placeholder='Old Password' />
                  <br />
                  <label className='font-bold'>New Password</label>
                  <br />
                  <input type="password" className='p-2 mt-4 mb-4 border-2 rounded-lg w-full border-neutral-600 ' placeholder='New Password' />
                  <br />
                  <label className='font-bold'>Confirm New Password</label>
                  <br />
                  <input type="password" className='p-2 mt-4 mb-4 border-2 rounded-lg w-full border-neutral-600' placeholder='Confirm New Password' />
                  <br />
                  <button className='w-full p-2 bg-green-800 rounded-lg mt-2 text-white' >Save</button>
                </form>
            </div>

    
          </div>
        </div>
      )}

        
        </div>
    </div>
  )
}

export default ManageAdmin
