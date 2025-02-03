"use client"
import { Calendar, Clock, Construction } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';


const Inventory = () => {
  const [inventory,setInventory] = useState([
    { name: 'Paracetamol', category: 'Medicine', stock: 2500, unit: 'tablets', status: 'In Stock' },
    {  name: 'Insulin', category: 'Medicine', stock: 150, unit: 'vials', status: 'Low Stock' },
    { name: 'Surgical Masks', category: 'Supplies', stock: 5000, unit: 'pieces', status: 'In Stock' },
    {  name: 'Disposable Gloves', category: 'Supplies', stock: 800, unit: 'boxes', status: 'Low Stock' },
    {  name: 'Antibiotics', category: 'Medicine', stock: 1200, unit: 'tablets', status: 'In Stock' },
  ]);

  // Calculate summary stats
  const stats = {
    totalItems: inventory.length,
    lowStock: inventory.filter(item => item.status === 'Low Stock').length,
    medicines: inventory.filter(item => item.category === 'Medicine').length,
    supplies: inventory.filter(item => item.category === 'Supplies').length
  };

  const [additem,setaddItem] = useState(false);

  const handleItem = ()=>{
    setaddItem(!additem);
  }

interface Form{
  name:string,
  category:string,
  stock:number,
  unit:string,
  status:string
}

  const [formData, setFormData] = useState<Form>({
    name: '',
    category: 'Supplies',
    stock: 10,
    unit: 'tablets',
    status: "In Stock"
  });

  const handlesubmitItem = (e:any)=>{
    e.preventDefault();

    const {name}  = formData;

     if(name == ""){
      toast.error("please enter productname")
      return
     }
    setInventory([...inventory,formData])
    handleItem();
  }


  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handlesearch = (data:string)=>{
    console.log(data);

    if(data == ""){
      setInventory([
        { name: 'Paracetamol', category: 'Medicine', stock: 2500, unit: 'tablets', status: 'In Stock' },
        {  name: 'Insulin', category: 'Medicine', stock: 150, unit: 'vials', status: 'Low Stock' },
        { name: 'Surgical Masks', category: 'Supplies', stock: 5000, unit: 'pieces', status: 'In Stock' },
        {  name: 'Disposable Gloves', category: 'Supplies', stock: 800, unit: 'boxes', status: 'Low Stock' },
        {  name: 'Antibiotics', category: 'Medicine', stock: 1200, unit: 'tablets', status: 'In Stock' },
      ])
      return;
    }

    const filterdata = inventory.filter((element)=>{
       const itemname = element.name.slice(0,data.length).toLocaleLowerCase();
       if(itemname === data){
        return element;
       }
    })

    setInventory(filterdata)
    
  }

  return (
   <div className='bg-blue-50 h-auto md:h-screen'>
     <div className="p-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hospital Inventory</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleItem}>
          Add New Item
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search inventory..."
          className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          onChange={(e)=>{handlesearch(e.target.value)}}
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Total Items */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Total Items</h3>
          <p className="text-2xl font-bold">{stats.totalItems}</p>
        </div>

        {/* Low Stock */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Low Stock Items</h3>
          <p className="text-2xl font-bold text-red-500">{stats.lowStock}</p>
        </div>

        {/* Medicines */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Medicines</h3>
          <p className="text-2xl font-bold">{stats.medicines}</p>
        </div>

        {/* Supplies */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-500">Supplies</h3>
          <p className="text-2xl font-bold">{stats.supplies}</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {stats.lowStock > 0 && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">
            Warning: {stats.lowStock} items are running low on stock!
          </p>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-500 font-medium">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-gray-500 font-medium">
                Category
              </th>
              <th className="px-6 py-3 text-left text-gray-500 font-medium">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-gray-500 font-medium">
                Unit
              </th>
              <th className="px-6 py-3 text-left text-gray-500 font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {inventory.map((item,index:number) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.stock}</td>
                <td className="px-6 py-4">{item.unit}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      item.status === 'In Stock'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


    <div className={`absolute h-full w-full top-0 left-0 flex justify-center  bg-black/20 ${additem? 'absolute' : 'hidden'}`} onClick={handleItem}>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <form 
        className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Add New Item</h2>
          <p className="text-gray-500 mt-1">Enter the details of the new inventory item</p>
        </div>

        {/* Name Input */}
        <div className="mb-6">
          <label 
            htmlFor="name" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 placeholder-gray-400"
          />
        </div>

        {/* Category Select */}
        <div className="mb-6">
          <label 
            htmlFor="category" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <div className="relative">
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 appearance-none"
            >
              <option value="Supplies">Supplies</option>
              <option value="Medicine">Medicine</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stock and Units Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Stocks Input */}
          <div>
            <label 
              htmlFor="stocks" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Stocks
            </label>
            <input
              type="number"
              id="stocks"
              name="stocks"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50"
            />
          </div>

          {/* Units Select */}
          <div>
            <label 
              htmlFor="units" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Units
            </label>
            <div className="relative">
              <select
                name="units"
                id="units"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 appearance-none"
              >
                <option value="tablets">tablets</option>
                <option value="vials">vials</option>
                <option value="pieces">pieces</option>
                <option value="boxes">boxes</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
            onClick={handlesubmitItem}
          >
            Add Item
          </button>
          <button
            type="button"
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            onClick={handleItem}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    </div>
   </div>
  );
}

export default Inventory
