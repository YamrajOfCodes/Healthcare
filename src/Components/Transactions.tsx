"use client"
import {   Stethoscope, 
    Syringe, 
    DollarSign, 
    Search, 
    Filter,
    Calendar,
    FileText,
    Users, 
    Download} from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Transaction } from '@/types/transaction';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { Transactionn } from '@/Redux/Slices/Patient/patientSlices';
import { useSelector } from 'react-redux';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Transactions: React.FC = () => {

  const dispatch = useAppDispatch();
  const { transactions: transactionsData } = useSelector((state: RootState) => state.Patient);
  console.log(transactionsData);
  let amount = 0;

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Transform API data to match Transaction interface
  const transactions: Transaction[] = Array.isArray(transactionsData?.[0]) 
    ? transactionsData[0].map((element: any) => ({
        id: element.id,
        type: element.type || 'Service',
        description: element.description || '',
        patientName: element.patient || '-',
        date: element.date,
        amount: typeof element.amount === 'string' 
          ? parseFloat(element.amount.replace(/[^0-9.-]+/g,""))
          : element.amount
      }))
    : [];

  // Calculate current balance
  const currentBalance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

  // Get today's transactions
  const todayTransactions = transactions.filter(t => 
    new Date(t.date).toDateString() === new Date().toDateString()
  );

  const todayIncome = todayTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const todayPatients = todayTransactions
    .filter(t => t.type !== 'expenses')
    .length;

  useEffect(() => {
    dispatch(Transactionn());
  }, [dispatch]);



  const exportToExcel = () => {
    const data = filteredTransactions?.map((appointment) => ({
      ID: appointment.id,
      Description: appointment.description,
      Patient: appointment.patientName,
      Date: appointment?.date,
      Amount: appointment?.amount,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "transactions");
  
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Transactions.xlsx");
  }; 

  // Function to get icon based on transaction type
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'Package':
        return <Stethoscope className="w-4 h-4" />;
      case 'Service':
        return <FileText className="w-4 h-4" />;
      case 'pharmacy':
        return <Syringe className="w-4 h-4" />;
      case 'expenses':
        return <DollarSign className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Add search filter function
  const getFilteredTransactions = () => {
    let filtered = transactions;

    // First apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((t) => 
        t.description.toLowerCase().includes(query) ||
        t.patientName.toLowerCase().includes(query) ||
        t.type.toLowerCase().includes(query) ||
        t.amount.toString().includes(query)
      );
    }

    // Then apply type filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter((t) => t.type === activeFilter);
    }

    return filtered;
  };

  // Replace direct transactions.map() with getFilteredTransactions()
  const filteredTransactions = getFilteredTransactions();

  return (

    <>
  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 h-full -ml-5 sm:-ml-0  ">
      <div className=" mx-auto hidden lg:block ">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Today's Income</h3>
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              ${todayIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
  
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Today's Patients</h3>
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-600">
              {todayPatients}
            </p>
          </div>
  
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Pending Bills</h3>
              <Calendar className="w-6 h-6 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-orange-600">3</p>
          </div>
  
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Total Balance</h3>
              <DollarSign className="w-6 h-6 text-gray-500" />
            </div>
            <p className={`text-2xl font-bold ${currentBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(currentBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
  
        {/* Transactions Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
            <div className="flex gap-4">
              {/* <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                />
              </div> */}
              <div className='cursor-pointer flex  items-center mt-5' onClick={exportToExcel}><button className='bg-gradient-to-br ml-5 from-violet-500 to-indigo-600 text-white px-8 py-1.5 text-lg rounded-md flex gap-2 justify-center items-center'><Download className='w-5 h-5'/>Export</button></div>

            </div>
          </div>
  
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Patient</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'expenses' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          <span className={`${
                            transaction.type === 'expenses' ? 'text-red-600' : 'text-blue-600'
                          }`}>
                            {getTransactionIcon(transaction.type)}
                          </span>
                        </div>
                        <span className="capitalize text-gray-800">{transaction.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-800">{transaction.description}</td>
                    <td className="px-6 py-4 text-gray-600">{transaction.patientName}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className={`px-6 py-4 text-right font-semibold ${
                      transaction.type === 'expenses' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.type === 'expenses' ? '-' : '+'}
                      ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


      <div className="min-h-screen w-[100vw] bg-gray-50 lg:hidden">
{/* Header Stats Scroll Container */}
<div className="bg-white shadow-sm overflow-x-auto ">
  <div className="flex px-2 gap-2 space-x-4 min-w-max flex-col sm:flex-row -ml-4 ">
    <div className="w-full ml-4 sm:w-40 bg-blue-50 rounded-lg p-4">
      <p className="text-sm text-gray-600">Today's Income</p>
      <p className="text-lg font-bold text-green-600">$1,250.00</p>
    </div>
    <div className="w-full sm:w-40 bg-green-50 rounded-lg p-4">
      <p className="text-sm text-gray-600">Patients</p>
      <p className="text-lg font-bold text-blue-600">12</p>
    </div>
    <div className="w-full sm:w-40 bg-yellow-50 rounded-lg p-4">
      <p className="text-sm text-gray-600">Pending</p>
      <p className="text-lg font-bold text-orange-600">3</p>
    </div>
    <div className="w-full sm:w-40 bg-purple-50 rounded-lg p-4">
      <p className="text-sm text-gray-600">Balance</p>
      <p className="text-lg font-bold text-purple-600">${currentBalance}</p>
    </div>
  </div>
</div>

{/* Search and Filter */}
<div className="p-4 bg-white sticky top-0 z-10 shadow-sm">
  <div className="relative mb-4">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search transactions..."
      className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  
  {/* Filter Pills */}
  <div className="flex gap-2 overflow-x-auto pb-2">
    <button 
      onClick={() => setActiveFilter('all')}
      className={`px-4 py-1 rounded-full whitespace-nowrap ${
        activeFilter === 'all' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      All
    </button>
    <button 
      onClick={() => setActiveFilter('consultation')}
      className={`px-4 py-1 rounded-full whitespace-nowrap ${
        activeFilter === 'consultation' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      Consultations
    </button>
    <button 
      onClick={() => setActiveFilter('treatment')}
      className={`px-4 py-1 rounded-full whitespace-nowrap ${
        activeFilter === 'treatment' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      Treatments
    </button>
    <button 
      onClick={() => setActiveFilter('expenses')}
      className={`px-4 py-1 rounded-full whitespace-nowrap ${
        activeFilter === 'expenses' 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      Expenses
    </button>
  </div>
</div>

{/* Transaction Cards */}
<div className="p-4 space-y-4">
  {filteredTransactions.map((transaction) => (
    <div 
      key={transaction.id}
      className="bg-white rounded-lg shadow-sm p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full ${
            transaction.type === 'expenses' ? 'bg-red-100' : 'bg-blue-100'
          }`}>
            <span className={transaction.type === 'expenses' ? 'text-red-600' : 'text-blue-600'}>
              {getTransactionIcon(transaction.type)}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900">{transaction.description}</p>
            <p className="text-sm text-gray-500">{transaction.patientName}</p>
          </div>
        </div>
        <div className={`text-right ${
          transaction.type === 'expenses' ? 'text-red-600' : 'text-green-600'
        }`}>
          <p className="font-bold">
            {transaction.type === 'expenses' ? '-' : '+'}
            ${Math.abs(transaction.amount)}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(transaction.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
      </div>
    </div>
  ))}
</div>
</div>
      </div>



</>
    );
  }

export default Transactions
