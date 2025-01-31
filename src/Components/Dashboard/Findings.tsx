import React, { useState } from 'react';

interface ExFinding {
  date: string;
  temp: string | number;
  pulse: string | number;
  bp: string;
  weight: string | number;
  height: string | number;
  rt: string;
  tongue: string;
  throat: string;
}

interface SysFinding {
  date: string;
  cns: string;
  rs: string;
  pa: string;
}

const Findings = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [editingExId, setEditingExId] = useState<number | null>(null);
  const [editingSysId, setEditingSysId] = useState<number | null>(null);
  const [exFindings, setExFindings] = useState<ExFinding[]>([
    {
      date: '04/12/2019',
      temp: 100,
      pulse: 90,
      bp: '101/105',
      weight: 70,
      height: 125,
      rt: 'NA',
      tongue: 'NA',
      throat: 'NA',
    },
    {
      date: '04/12/2019',
      temp: 90,
      pulse: 70,
      bp: '105',
      weight: 80,
      height: 125,
      rt: 'NA',
      tongue: '-',
      throat: '-',
    },
  ]);

  const [sysFindings, setSysFindings] = useState<SysFinding[]>([
    {
      date: '04/12/2019',
      cns: 'NA',
      rs: 'NA',
      pa: 'NA',
    },
    {
      date: '04/12/2019',
      cns: '-',
      rs: '-',
      pa: '-',
    },
  ]);

  const [editedExFinding, setEditedExFinding] = useState<ExFinding | null>(null);
  const [editedSysFinding, setEditedSysFinding] = useState<SysFinding | null>(null);

  const handleExFindingEdit = (index: number) => {
    setEditingExId(index);
    setEditedExFinding({...exFindings[index]});
  };

  const handleSysFindingEdit = (index: number) => {
    setEditingSysId(index);
    setEditedSysFinding({...sysFindings[index]});
  };

  const handleExFindingSave = (index: number) => {
    if (editedExFinding) {
      const newFindings = [...exFindings];
      newFindings[index] = editedExFinding;
      setExFindings(newFindings);
      setEditingExId(null);
      setEditedExFinding(null);
    }
  };

  const handleSysFindingSave = (index: number) => {
    if (editedSysFinding) {
      const newFindings = [...sysFindings];
      newFindings[index] = editedSysFinding;
      setSysFindings(newFindings);
      setEditingSysId(null);
      setEditedSysFinding(null);
    }
  };

  const handleExFindingCancel = () => {
    setEditingExId(null);
    setEditedExFinding(null);
  };

  const handleSysFindingCancel = () => {
    setEditingSysId(null);
    setEditedSysFinding(null);
  };

  return (
    <div className="p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Tab Navigation - Made more compact on mobile */}
      <div className="flex flex-wrap gap-1 mb-6 bg-white p-1 rounded-xl shadow-sm w-full sm:w-fit">
        {['All', 'EX-FINDING', 'SYS-FINDING'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 sm:flex-none px-3 sm:px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === tab
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Action Buttons - Stack on mobile */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mb-8">
        <button className="px-5 py-2.5 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print
        </button>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 shadow-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Record
        </button>
      </div>

      {/* EX-FINDING Section */}
      {(activeTab === 'All' || activeTab === 'EX-FINDING') && (
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">EX-FINDING</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Temp</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Pulse</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">BP</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Weight</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Height</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">RT</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tongue</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Throat</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {exFindings.map((finding, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-150">
                      {editingExId === index ? (
                        <>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedExFinding?.date || ''}
                              onChange={(e) => {
                                setEditedExFinding(prev => 
                                  prev ? {...prev, date: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedExFinding?.temp || ''}
                              onChange={(e) => {
                                setEditedExFinding(prev => 
                                  prev ? {...prev, temp: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedExFinding?.pulse || ''}
                              onChange={(e) => {
                                setEditedExFinding(prev => 
                                  prev ? {...prev, pulse: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedExFinding?.bp || ''}
                              onChange={(e) => {
                                setEditedExFinding(prev => 
                                  prev ? {...prev, bp: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedExFinding?.weight || ''}
                              onChange={(e) => {
                                setEditedExFinding(prev => 
                                  prev ? {...prev, weight: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedExFinding?.height || ''}
                              onChange={(e) => {
                                setEditedExFinding(prev => 
                                  prev ? {...prev, height: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedExFinding?.rt || ''}
                              onChange={(e) => {
                                setEditedExFinding(prev => 
                                  prev ? {...prev, rt: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedExFinding?.tongue || ''}
                              onChange={(e) => {
                                setEditedExFinding(prev => 
                                  prev ? {...prev, tongue: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedExFinding?.throat || ''}
                              onChange={(e) => {
                                setEditedExFinding(prev => 
                                  prev ? {...prev, throat: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <div className="flex gap-2">
                              <button 
                                className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-all duration-200"
                                onClick={() => handleExFindingSave(index)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button 
                                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-all duration-200"
                                onClick={handleExFindingCancel}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.date}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.temp}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.pulse}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.bp}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.weight}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.height}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.rt}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.tongue}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.throat}</td>
                          <td className="px-3 sm:px-6 py-4">
                            <button 
                              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-all duration-200"
                              onClick={() => handleExFindingEdit(index)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SYS FINDING Section */}
      {(activeTab === 'All' || activeTab === 'SYS FINDING') && (
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">SYS FINDING</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">CNS</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">RS</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">PA</th>
                    <th className="px-3 sm:px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sysFindings.map((finding, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors duration-150">
                      {editingSysId === index ? (
                        <>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedSysFinding?.date || ''}
                              onChange={(e) => {
                                setEditedSysFinding(prev => 
                                  prev ? {...prev, date: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedSysFinding?.cns || ''}
                              onChange={(e) => {
                                setEditedSysFinding(prev => 
                                  prev ? {...prev, cns: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedSysFinding?.rs || ''}
                              onChange={(e) => {
                                setEditedSysFinding(prev => 
                                  prev ? {...prev, rs: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <input
                              className="w-full px-2 sm:px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all duration-200 text-black text-sm"
                              value={editedSysFinding?.pa || ''}
                              onChange={(e) => {
                                setEditedSysFinding(prev => 
                                  prev ? {...prev, pa: e.target.value} : null
                                );
                              }}
                            />
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <div className="flex gap-2">
                              <button 
                                className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-all duration-200"
                                onClick={() => handleSysFindingSave(index)}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button 
                                className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-all duration-200"
                                onClick={handleSysFindingCancel}
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.date}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.cns}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.rs}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{finding.pa}</td>
                          <td className="px-3 sm:px-6 py-4">
                            <button 
                              className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-all duration-200"
                              onClick={() => handleSysFindingEdit(index)}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Findings; 