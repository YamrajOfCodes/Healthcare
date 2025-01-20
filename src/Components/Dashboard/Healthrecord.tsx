import React, { useEffect, useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { getallPatients, Healthrecord } from '@/Redux/Slices/Patient/patientSlices';
import { useAppDispatch } from '@/hooks';
import { RootState } from '@/Redux/App/store';
import { useSelector } from 'react-redux';

const HealthChartForm = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const [patientid,setpatientid] = useState<any>(null);
  const [dates,setdates] = useState(null);


   const {allpatients } = useSelector((state:RootState)=>state.Patient);

  //  console.log(allpatients);

   const samplePatients = allpatients?.map((element)=>{
     return {
      id:element?.id,
      name:element.name,
      age: element?.dob.slice(0,4),
      patientId : `P00${element?.id}`
     }
   })
   

 
  const initialFormState = {
    healthMetrics: [
      { name: 'Exercise', value: '' },
      { name: 'Diet', value: '' },
      { name: 'Sleep', value: '' },
      { name: 'Stress', value: '' },
      { name: 'Hydration', value: '' },
    ],
    description:"desc",
    date:"2025-01-20",
    medications: [{ name: '', dosage: '', frequency: '' }],
    attachments: [],
  };

  const [formData, setFormData] = useState(initialFormState);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery('');
  };

  const handleMetricChange = (index, value) => {
    const newMetrics = [...formData.healthMetrics];
    newMetrics[index].value = value;
    setFormData({ ...formData, healthMetrics: newMetrics });
  };

  const handleMedicationChange = (index, field, value) => {
    const newMedications = [...formData.medications];
    newMedications[index][field] = value;
    setFormData({ ...formData, medications: newMedications });
  };

  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [...formData.medications, { name: '', dosage: '', frequency: '' }],
    });
  };

  const removeMedication = (index) => {
    const newMedications = formData.medications.filter((_, i) => i !== index);
    setFormData({ ...formData, medications: newMedications });
  };
  const handleSubmit = (e) => {
    console.log(dates);
    
    e.preventDefault();
    console.log('Form submitted:', {
      patient: selectedPatient,
      ...formData, // This includes date now
    });
  
    let sliceId = Number(patientid.slice(3, 5));
  
    const letestdata = {
      sliceId,
      formData,
  
    };
  
    console.log(letestdata);
  
    dispatch(Healthrecord(letestdata));
  };
  


   useEffect(() => {
      dispatch(getallPatients());
    }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Search */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Patient Search</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Search patient by name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {searchQuery && (
            <div className="mt-2 border border-gray-200 rounded-lg divide-y divide-gray-200">
              {samplePatients
                .filter(patient => 
                  patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  patient.patientId.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(patient => (
                  <div
                    key={patient.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handlePatientSelect(patient)}
                  >
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-500">
                      ID: {patient.patientId} | Dob: {patient.age}
                    </div>
                  </div>
                ))
              }
            </div>
          )}

          {selectedPatient && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="font-medium">Selected Patient:</div>
              <div>{selectedPatient.name} (ID: {selectedPatient.patientId})</div>
            </div>
          )}
        </div>

        {selectedPatient && (
          <>
            {/* Health Metrics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Health Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.healthMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <label className="block font-medium">{metric.name} (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      value={metric.value}
                      onChange={(e) => handleMetricChange(index, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Medications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Medications</h2>
              <div className="space-y-4">
                {formData.medications.map((medication, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Medication Name"
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={medication.name}
                        onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Dosage"
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={medication.dosage}
                        onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Frequency"
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={medication.frequency}
                        onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMedication(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addMedication}
                  className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Medication
                </button>
              </div>
            </div>

            <input 
  type="date" 
  onChange={(e) => {
    const newDate = e.target.value;
    setdates(newDate); 
    setFormData({ ...formData, date: newDate }); // Update formData.date
  }} 
  value={dates} 
/>

            {/* File Attachments */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Attachments</h2>
              <div className="space-y-4">
                <input
                  type="file"
                  multiple
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    cursor-pointer"
                  onChange={(e) => setFormData({
                    ...formData,
                    attachments: Array.from(e.target.files)
                  })}
                />
                {formData.attachments.map((file, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {file.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"onClick={()=>{handleSubmit
                  setpatientid(selectedPatient.patientId)}}
              >
                Save Health Chart
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default HealthChartForm;