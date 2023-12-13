import React, { useState } from 'react';

const CreatorsTable = ({ data }) => {

    const [searchQuery, setSearchQuery] = useState('');

  return  (
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
            <th className="border border-neutral-900 py-2 px-4 w-1/5">First Name</th>
            <th className="border border-neutral-500 py-2 px-4 w-1/5">Last Name</th>
            <th className="border border-neutral-500 py-2 px-4 w-1/5">Email</th>
            <th className="border border-neutral-500 py-2 px-4 w-1/5">Phone Number</th>
            <th className="border border-neutral-500 py-2 px-4 w-1/5">Creator Type</th>
            <th className="border border-neutral-500 py-2 px-4 w-1/5">Industries</th>
          </tr>
        </thead>
        <tbody>
          {data.filter((user, index)=>{
                if(
                    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.phoneNumber.includes(searchQuery) ||
                user.creatorType.toLowerCase().includes(searchQuery.toLowerCase())) 
                {
                    return user;
                }
            }) .map((user, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white text-sm' : 'bg-gray-200 text-sm'}>
              <td className="border border-neutral-500 py-2 px-4 w-1/5">{user.firstName}</td>
              <td className="border border-neutral-500 py-2 px-4 w-1/5">{user.lastName}</td>
              <td className="border border-neutral-500 py-2 px-4 w-1/5">{user.email}</td>
              <td className="border border-neutral-500 py-2 px-4 w-1/5">{user.countryCode} {user.phoneNumber}</td>
              <td className="border border-neutral-500 py-2 px-4 w-1/5">{user.creatorType}</td>
              <td className="border border-neutral-500 py-2 px-4 w-1/5">{
              user.industries.map(ind => (
                <div>{ind}</div>
              ))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreatorsTable;
