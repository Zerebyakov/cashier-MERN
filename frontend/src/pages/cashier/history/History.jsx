import React, { useEffect, useState } from 'react'
import CashierLayout from '../layout/CashierLayout'
import axios from 'axios'
import myApi from '../../api/Api'


const History = () => {
  const [historyTransaction, setHistoryTransaction] = useState([])
  
  useEffect(()=>{
    getAllHistory();
  },[])
  const getAllHistory = async()=>{
    const response = await axios.get(myApi + `/transaction-details`,{
      withCredentials: true
    })
    setHistoryTransaction(response.data.data)
    console.log(response.data.data)
  }
  return (
    <CashierLayout>
      <div className="border border-black p-10">
        <div className="border p-6 bg-[#f9f0e7]">
          <table className="w-full table-auto border-separate border-spacing-y-4">
            <thead>
              <tr className="bg-black text-white rounded-full text-left">
                <th className="py-3 px-6 rounded-l-full">NO</th>
                <th className="py-3 px-6">TANGGAL</th>
                <th className="py-3 px-6">TOTAL ITEMS</th>
                <th className="py-3 px-6 ">TOTAL PRICE</th>
                <th className="py-3 px-6 rounded-r-full">DETAIL PRODUCT</th>
              </tr>
            </thead>
            <tbody>
              {historyTransaction.map((item, idx)=>(
                <tr key={idx} className="text-black font-semibold">
                  <td className="px-6 py-2">{idx+1}</td>
                  <td className="px-6 py-2">{new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
                  <td className="px-6 py-2">{item.quantity}</td>
                  <td className="px-6 py-2">+{item.transaction.total_price}</td>
                  <a className="hover:underline px-6 py-2 text-blue-300 cursor-pointer">details</a>
                </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

    </CashierLayout>
  )
}

export default History