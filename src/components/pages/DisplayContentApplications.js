import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DisplayContentApplications({ _id, firstName, lastName, industries, countryCode, phoneNumber, media }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
    const openModal = (index) => {
      setCurrentMediaIndex(index);
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };
  
    const previousMedia = () => {
      setCurrentMediaIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1));
    };
  
    const nextMedia = () => {
      setCurrentMediaIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1));
    };
  
    const currentMedia = media[currentMediaIndex];
  
    const isImage = currentMedia?.endsWith('.jpg') || currentMedia?.endsWith('.png') || currentMedia?.endsWith('.jpeg');
    const isVideo = currentMedia?.endsWith('.mp4');

    const navigate = useNavigate();

    const handleApprove = () => {
        fetch(`${process.env.REACT_APP_API_URL}/approve/content/${_id}`)
        .then(res => {
            if(res.ok){
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

                    setTimeout(()=>{
                        window.location.reload();
                    }, 500)
            }
        })
        .catch(err =>{
            toast.error('Failed. Server Error!', {
                position: "top-right",
                autoClose: 5000,
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
    <div class="w-full max-w-sm bg-zinc-950 border border-gray-900 rounded-lg shadow-lg">
        <ToastContainer />
        
        <img src={`${process.env.REACT_APP_API_URL}/uploads/${media[0]}`} class="p-0 rounded-t-lg h-52 w-full"  alt="No image Uploaded"  
        onClick={() => openModal(0)}/>
        

        <div class="px-5 pb-5">
            <div className='flex justify-between items-center gap-4'>
                <h5 class="text-2xl font-semibold tracking-tight text-white dark:text-white mt-2">{firstName} {lastName}</h5>
                
            </div>
            {
                industries.map((ind, index) => (
                    <div className=" text-sm font-semibold mr-2 py-0.5 rounded text-gray-400 mb-1 mt-1 capitalize" key={index}>
                        {ind}
                    </div>
                ))
            }
            
            <i className=" text-sm font-semibold mr-2 py-0.5 rounded text-lime-600 mb-1 mt-1 capitalize">
                {countryCode} {phoneNumber}
            </i>
            <br />
            <div class="flex items-center justify-end">
                <Link to={`#`} onClick={e => { e.preventDefault() ; handleApprove()}} class="text-black bg-blue-300 hover:bg-blue-400  font-bold rounded-2xl px-2 py-2.5 text-center flex align-middle text-lg gap-2">Approve </Link>
            </div>

            {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-80">
            

          <div className="bg-white p-5 rounded-lg shadow-lg">
            <div className='flex justify-end mb-1 lg:mb-5'>
                <button
                    onClick={closeModal}
                    className="text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-full text-sm flex flex-end"
                >
                    X
                </button>
            </div>

            {isImage && (
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads/${currentMedia}`}
                alt="Media"
                className="w-full h-56 lg:h-96 object-contain"
              />
            )}
            {isVideo && (
              <video
                src={`${process.env.REACT_APP_API_URL}/uploads/${currentMedia}`}
                controls
                className="w-full h-56 lg:h-96"
              />
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={previousMedia}
                className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md"
              >
                Previous
              </button>
              <button
                onClick={nextMedia}
                className="text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md"
              >
                Next
              </button>
              
            </div>
          </div>
        </div>
      )}

        </div>
    </div>
  )
}

export default DisplayContentApplications
