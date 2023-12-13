import React, { useEffect, useState} from 'react'
import DisplayInfluencerApplications from './DisplayInfluencerApplications';

function ViewInfluencerACApplications() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    fetch(`${process.env.REACT_APP_API_URL}/influencer_creator_applicants`)
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
        <div className='p-4 ml-16 text-gray-900 font-mono'>
          Influencer Account Applications
        </div>
        <div className='p-4 ml-16 flex flex-wrap gap-4'>
          {
            loading && <div className='text-sm text-green-600'>Loading ...</div>
          }

          {
            !loading && data.length > 0 && <DisplayInfluencerApplications  data={data} /> 
          }
          {
            !loading && data.length < 1 && <div className='text-sm text-red-600'> You have no Pending Applications</div>
          }

        </div>
    </div>
  )
}

export default ViewInfluencerACApplications
