import React, { useEffect, useState } from 'react'
import CreatorsTable from './CreatorsTable';

function RejectedContentCreators() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/get_creators`,{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                value: 2
            })
        })
        .then(response => response.json())
        .then(response => {
            setData(response);
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    console.log(data)
  return (
    <div className="w-full min-h-screen bg-neutral-300">
        <div className='p-4 ml-16 text-gray-900 font-mono'>Rejected Creators Applications</div>
        <div className='p-4 ml-16'>

        { data.length > 0 && <CreatorsTable data={data} /> }
        { data.length < 1 && <div className='text-center bg-neutral-900 text-white p-4 rounded-lg'>
            You have not rejected any applications
            </div>}
        
        </div>
      
    </div>
  )
}

export default RejectedContentCreators
