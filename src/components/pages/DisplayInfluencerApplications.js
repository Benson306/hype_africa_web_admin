import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DisplayInfluencerApplications({ data }) {

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const handleApprove = (type, id) => {
        fetch(`${process.env.REACT_APP_API_URL}/approve/influencer/${type}/${id}`)
        .then(res => {
            if(res.ok){
                toast.success('Success!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });

                    setTimeout(()=>{
                        window.location.reload();
                    }, 500)
            }
        })
        .catch(err =>{
            toast.error('Failed. Server Error!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        })
    }


  return (
    <div class="w-full">
        <ToastContainer />

        <div className="flex justify-end">
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
            <th className="border border-neutral-500 py-2 px-4 w-2/6">Email</th>
            <th className="border border-neutral-500 py-2 px-4 w-1/6">Name</th>
            <th className="border border-neutral-500 py-2 px-4 w-1/6">Phone Number</th>
            <th className="border border-neutral-500 py-2 px-4 w-1/6">industries</th>
            <th className="border border-neutral-500 py-2 px-4 w-2/6">Approve</th>
            <th className="border border-neutral-500 py-2 px-4 w-2/6">Reject</th>
          </tr>
        </thead>
        <tbody>
          {
              data.filter((user, index)=>{
                if(
                    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase()) 
                ) 
                {
                    return user;
                }
            }).map((user, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white text-sm text-center overflow-auto' : 'bg-gray-200 text-sm text-center overflow-auto'}>
            <td className="border border-neutral-500 p-2 w-1/6">{user.email}</td>
              <td className="border border-neutral-500 p-2 w-2/6">{user.firstName} {user.lastName}</td>
              <td className="border border-neutral-500 p-2 w-2/6">{user.countryCode} {user.phoneNumber}</td>
              <td className="border border-neutral-500 p-2 px-4 w-2/6">
                <ol>
                  {
                    user.industries.map(ind => (
                              <li className='text-xs'>- {ind}</li>
                    ))
                  }
                </ol>
              </td>
              <td className="border border-neutral-500 p-2 w-1/6">
                <button onClick={e =>{ e.preventDefault(); handleApprove(1,user._id)}} className='bg-blue-600 hover:bg-blue-900 shadow-lg text-white rounded-lg p-2 text-sm'>
                    Approve
                </button>
              </td>
              <td className="border border-neutral-500 p-2 w-2/6">
                <button onClick={(e)=> {e.preventDefault(); handleApprove(2,user._id)}} className='bg-red-600 hover:bg-red-900 shadow-lg text-white rounded-lg p-2'>
                    Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>

  )
}

export default DisplayInfluencerApplications