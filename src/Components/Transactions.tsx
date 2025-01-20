"use client"
import {   Stethoscope, 
    Syringe, 
    DollarSign, 
    Search, 
    Filter,
    Calendar,
    FileText,
    Users } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Transaction } from '@/types/transaction';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { Transactionn } from '@/Redux/Slices/Patient/patientSlices';
import { useSelector } from 'react-redux';

const Transactions: React.FC = () => {
   
    // Type the transactions array
    const transactions: Transaction[] = [
        { 
          id: 1, 
          type: 'Package', 
          description: 'Annual Health Checkup', 
          patientName: 'John Doe',
          date: '2024-02-20',
          amount: 299.99
        },
        { 
          id: 2, 
          type: 'expenses', 
          description: 'Medical Supplies Restock', 
          patientName: '-',
          date: '2025-01-14', 
          amount: -1200 
        },
        { 
          id: 3, 
          type: 'Service', 
          description: 'Dental Cleaning', 
          patientName: 'Kundan patil',
          date: '2025-01-13', 
          amount: 250 
        },
        { 
          id: 4, 
          type: 'Service', 
          description: 'General Checkup - Dr. Smith', 
          patientName: 'Amit',
          date: '2025-01-12', 
          amount: 85 
        },
        { 
          id: 5, 
          type: 'expenses', 
          description: 'Equipment Maintenance', 
          patientName: '-',
          date: '2025-01-11', 
          amount: -450 
        },
        { 
          id: 6, 
          type: 'Service', 
          description: 'Physical Therapy Session', 
          patientName: 'Deepali',
          date: '2025-01-10', 
          amount: 120 
        },
      ];
    
      const [activeFilter, setActiveFilter] = useState<string>('all');
      // Calculate current balance
      const currentBalance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    
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


     


      const filteredTransactions = activeFilter === 'all' 
      ? transactions 
      : transactions.filter((t: Transaction) => t.type === activeFilter);

      const dispatch = useAppDispatch();
      // const { transactions } = useSelector((state:RootState))

      
      useEffect(()=>{
       dispatch(Transactionn())
      },[])


    
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
                  ${transactions.filter(t => t.amount > 0 && new Date(t.date).toDateString() === new Date().toDateString())
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
              </div>
    
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-600">Today's Patients</h3>
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {transactions.filter(t => 
                    t.type !== 'expenses' && 
                    new Date(t.date).toDateString() === new Date().toDateString()
                  ).length}
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
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition duration-150">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                  </button>
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
                    {transactions.map((transaction) => (
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
