import React, { useContext, useEffect, useState } from 'react'
import { AdminAuthContext } from '../../utils/AdminAuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ManageCompanyApplications() {

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

    const [brands, setBrands] = useState([]);
  

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/companies`)
        .then(response => response.json())
        .then(response => {
          setData(response)

          fetch(`${process.env.REACT_APP_API_URL}/all_brands`)
            .then(newResponse => newResponse.json())
            .then(newResponse => {
                setData(response)
                setBrands(newResponse)
            })
            .catch(err => {
            console.log(err);
            })
        })
        .catch(err => {
          console.log(err);
        })
    },[])


    const handleApprove = (id, value) => {

      fetch(`${process.env.REACT_APP_API_URL}/approve_company/${id}/${value}`)
      .then(response => {
        if(response.ok){
          toast.success('Success!', {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });

            setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Failed. Server Error!', {
          position: "top-right",
          autoClose: 500,
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
        <div className='p-4 ml-16 text-gray-900 font-mono'>Manage Company Applications</div>
        <div className='p-4 ml-16'>


        <div className="overflow-x-auto">
        <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border border-blue-500 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <table className="w-full table-fixed border-collapse border border-blue-500">
        <thead>
          <tr className="bg-neutral-900 text-white text-xs">
            <th className="border border-neutral-500  py-1 px-4 w-1/6">#</th>
            <th className="border border-neutral-500  py-1 px-4 w-2/6">Company Name</th>
            <th className="border border-neutral-500  py-1 px-4 w-2/6">Profile Status</th>
            <th className="border border-neutral-500  py-1 px-4 w-1/6">Approval Status</th>
            <th className="border border-neutral-500  py-1 px-4 w-2/6">View Application</th>
          </tr>
        </thead>
        <tbody>
            {
                data.length < 1 && <tr className='mb-2 mt-2'>
                    <td colSpan={5} className='text-center mb-2 mt-2 text-sm'>No Companies Found</td>
                </tr>
            }
          {data.length > 0 && data.filter((company, index)=>{
                if(
                    company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
                ) 
                {
                    return company;
                }
            }).sort((a, b) => {
                if (a.isApproved === b.isApproved) {
                  return 0;
                } else if (a.isApproved === 0) {
                  return -1;
                } else if (b.isApproved === 0) {
                  return 1;
                } else if (a.isApproved === 1 && b.isApproved === 2) {
                  return -1;
                } else {
                  return 1;
                }
              }).map((company, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white text-center text-sm' : 'bg-gray-200 text-center text-sm'}>
            <td className="border border-neutral-500  py-1 px-4 w-1/6">
                <img src={`${process.env.REACT_APP_API_URL}/uploads/${company.logo}`} className='h-20 w-20 object-contain' />
            </td>
            <td className="border border-neutral-500 py-1 px-4 w-1/6">
                <div>{company.companyName}</div>
            </td>
            <td className="border border-neutral-500 py-1 px-4 w-1/6  ">
                {
                    company.isComplete ? 
                    <div className='flex justify-center'>
                        <span className='bg-green-400 rounded-2xl text-black text-sm p-1'>
                            Complete
                        </span>
                    </div>
                    :
                    <div className='flex justify-center'>
                        <span className='bg-red-400 rounded-2xl text-white text-sm p-1'>
                            Incomplete
                        </span>
                    </div>
                }
            </td>
              
              <td className="border border-neutral-500  py-1 px-4 w-1/6">
              {
                    company.isApproved == 0 ? 
                    <div className='flex justify-center'>
                        <span className='bg-blue-400 rounded-2xl text-black text-sm p-1'>
                            Pending Approval
                        </span>
                    </div>
                    : company.isApproved == 1 ?
                    <div className='flex justify-center'>
                        <span className='bg-green-400 rounded-2xl text-black text-sm p-1'>
                            Approved
                        </span>
                    </div> 
                    :
                    <div className='flex justify-center'>
                        <span className='bg-red-400 rounded-2xl text-black text-sm p-1'>
                            Rejected
                        </span>
                    </div>
                }
              </td>

              <td className="border border-neutral-500  py-1 px-4 w-2/6">
                <button onClick={e =>{ e.preventDefault(); openModal(0); setSelectedData(company)}} className='bg-blue-600 hover:bg-blue-900 shadow-lg text-white rounded-lg p-2 text-sm'>
                    View Application
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>

        {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-80">

          <div className="bg-white p-5 rounded-lg shadow-lg lg:w-1/2">
            <div className='flex justify-end mb-1 lg:mb-5'>
                <button
                    onClick={closeModal}
                    className="text-white text-xs bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full   flex flex-end"
                >
                    X
                </button>
            </div>

            <div className=''>
                <div className='text-md mb-2 text-center'>Company Application</div>
                <div className='mb-2'>
                {
                    selectedData.isApproved == 0 ? 
                    <div className=''>
                        <span className='bg-blue-400 rounded-2xl text-black text-xs p-1'>
                            Pending Approval
                        </span>
                    </div>
                    : selectedData.isApproved == 1 ?
                    <div className='flex justify-center'>
                        <span className='bg-green-400 rounded-2xl text-black text-xs p-1'>
                            Approved
                        </span>
                    </div> 
                    :
                    <div className='flex justify-center'>
                        <span className='bg-red-400 rounded-2xl text-black text-xs p-1'>
                            Rejected
                        </span>
                    </div>
                }
                </div>
                <hr />

                { selectedData && 
                <div className='mt-5'>
                    <img src={`${process.env.REACT_APP_API_URL}/uploads/${selectedData.logo}`} className='h-20 w-20 object-contain' />

                    <label className='mb-2 font-bold text-sm'>Company Name</label>
                    <div className='mb-4 text-sm'>{selectedData.companyName}</div>

                    <label className='mb-2 font-bold text-sm'>Company Email</label>
                    <div className='mb-4 text-sm'>{selectedData.email}</div>

                    <label className='mb-2 font-bold text-sm'>Company Phone Number</label>
                    <div className='mb-4 text-sm'>{selectedData.countryCode} {selectedData.phoneNumber}</div>

                    <label className='mb-2 font-bold text-sm'>Brands</label>
                    <div className='flex flex-wrap gap-2 mt-1'>
                    {
                        brands.filter(brand => brand.company_id === selectedData._id).map(brand => 
                            <div className='flex gap-2 items-center border border-gray-300 p-2 rounded-lg'>
                                <img src={`${process.env.REACT_APP_API_URL}/uploads/${brand.brand_logo}`} className='h-20 w-20 object-contain' />

                                <div className='mb-4 text-sm'>
                                    {brand.brand_name}
                                </div>
                            </div>
                             
                        )
                    }
                    </div>

                    <div className='flex justify-center gap-5 mt-3 text-sm'>
                        <button onClick={(e)=>{
                            handleApprove(selectedData._id, 1)
                        }} 
                        className='bg-green-600 hover:bg-green-400 rounded-lg p-2 text-white'
                        >
                            Approve
                        </button>
                        <button onClick={e => {
                            handleApprove(selectedData._id, 2)
                        }}
                        className='border border-red-600 hover:bg-red-600 rounded-lg p-2 text-red-600 hover:text-white'
                        >
                            Reject
                        </button>
                    </div>

                    
                </div>
                }
            </div>

    
          </div>
        </div>
      )}

        
        </div>
    </div>
  )
}

export default ManageCompanyApplications
