import React, { useEffect, useState } from 'react'
import AdminLayout from '../layout/AdminLayout'
import axios from 'axios'
import myApi from '../../api/Api'

const HistoryReport = () => {
    const [transactions, setTransactions] = useState([])
    const [expandedRow, setExpandedRow] = useState(null);
    const [details, setDetails] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [limit] = useState(10)
    const [sort, setSort] = useState('createdAt')
    const [order, setOrder] = useState('desc')
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    useEffect(() => {
        getHistoryTransaction();
    }, [currentPage, sort, order])
    const getHistoryTransaction = async () => {
        try {
            const response = await axios.get(myApi + `/transactions-summary?page=${currentPage}&limit=${limit}&sort=${sort}&order=${order}`, {
                withCredentials: true
            })
            setTransactions(response.data.data)
            console.log(response.data.data)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.log(error.message)
        }
    }
    const handleToggleDetail = async (transaction_id) => {
        if (expandedRow === transaction_id) {
            setExpandedRow(null); // Collapse
            return;
        }

        try {
            const response = await axios.get(myApi + `/transaction-details/${transaction_id}`, {
                withCredentials: true,
            });
            setDetails(response.data);
            setExpandedRow(transaction_id); // Expand
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <title>History</title>
            <AdminLayout>
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                <div>

                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className='flex flex-row justify-between'>
                        <div>
                            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Add Product</button>

                        </div>
                        <div className='order-last'>

                            <form className="max-w-md w-full">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Cari ..."
                                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                                    />
                                    <button
                                        type="submit"
                                        className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white ">
                            Our products
                            <p className="mt-1 text-sm font-normal text-gray-500 ">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer">
                                    Total Items
                                </th>
                                <th scope="col" className="px-6 py-3 cursor-pointer">
                                    Total Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((trx, index) => (
                                <React.Fragment key={trx.id}>
                                    <tr className="bg-white border-b border-gray-200">
                                        <td className="px-6 py-4">{(currentPage - 1) * limit + index + 1}
                                        </td>
                                        <td className="px-6 py-4">{new Date(trx.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{trx.totalItems}</td>
                                        <td className="px-6 py-4">Rp. {trx.total_price.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4 space-x-4">
                                            <button
                                                onClick={() => handleToggleDetail(trx.id)}
                                                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            >
                                                Detail
                                                <svg className="w-2.5 h-2.5 inline ml-2" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>

                                    {/* Detail row */}
                                    {expandedRow === trx.id && (
                                        <tr className="bg-gray-50 border-b border-gray-200">
                                            <td colSpan="5" className="px-6 py-4">
                                                <table className="w-full text-sm text-left text-gray-500 border">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                                        <tr>
                                                            <th className="px-4 py-2">No</th>
                                                            <th className="px-4 py-2">Product Name</th>
                                                            <th className="px-4 py-2">Qty</th>
                                                            <th className="px-4 py-2">Unit Price</th>
                                                            <th className="px-4 py-2">Sub Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {details.map((item, idx) => (
                                                            <tr key={item.id} className="bg-white border-b">
                                                                <td className="px-4 py-2">{idx + 1}</td>
                                                                <td className="px-4 py-2">{item.product?.name}</td>
                                                                <td className="px-4 py-2">{item.quantity}</td>
                                                                <td className="px-4 py-2">Rp. {item.price_each.toLocaleString('id-ID')}</td>
                                                                <td className="px-4 py-2">Rp. {item.subtotal.toLocaleString('id-ID')}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>

                    </table>
                    <div className="flex justify-center mt-4 mb-2">
                        <nav className="inline-flex items-center space-x-1">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
                            >
                                Prev
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3 py-1 rounded-md border ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-100'}`}
                            >
                                Next
                            </button>
                        </nav>
                    </div>

                </div>
            </AdminLayout>
        </>
    )
}

export default HistoryReport