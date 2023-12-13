import React, { useEffect, useState } from 'react'
import DisplayContentApplications from './DisplayContentApplications';

function ViewContentACApplications() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    fetch(`${process.env.REACT_APP_API_URL}/content_creator_applicants`)
    .then(res => res.json())
    .then(res => {
      setData(res);
      setLoading(false);
    })
    .catch(err => {
      console.log(err);
      setLoading(false);
    })
  },[])
  return (
    <div className="w-full min-h-screen bg-neutral-300">
      <div className='p-4 ml-16 text-gray-900 font-mono'>Content Creators Pending Approval</div>
        <div className='p-4 ml-16 flex flex-wrap gap-4'>
          {
            loading && <div className='text-sm text-green-600'>Loading ...</div>
          }

          {
            !loading && data.length > 0 && 
            data.map( item => (
              <DisplayContentApplications _id={item._id} firstName={item.firstName} lastName={item.lastName} industries={item.industries} countryCode={item.countryCode} phoneNumber={item.phoneNumber} media={item.media} /> 
            ))
            
          }

          {
            !loading && data.length < 1 && <div className='text-sm text-red-600'> You have no Pending Applications</div>
          }

        </div>
    </div>
  )
}

export default ViewContentACApplications
