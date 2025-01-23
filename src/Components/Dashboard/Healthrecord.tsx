import React, { useEffect, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { getallPatients, Healthrecord } from "@/Redux/Slices/Patient/patientSlices";
import { useAppDispatch } from "@/hooks";
import { RootState } from "@/Redux/App/store";
import { useSelector } from "react-redux";
import { Patient } from "@/types/patient";

interface FormData {
  healthMetrics: Array<{ name: string; value: string }>;
  description: string;
  date: string;
  medications: Array<{ name: string; dosage: string; frequency: string }>; // Array of objects
  attachments: { file: File; path: string } | null;
}

interface HealthRecordData {
  patient_id: number;
  description: string;
  date: string;
  medications: string;
  healthMetrics: string;
  attachment_path: string;
}

const HealthChartForm = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dates, setDates] = useState<string>(new Date().toISOString().split("T")[0]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    healthMetrics: [
      { name: "Exercise", value: "" },
      { name: "Diet", value: "" },
      { name: "Sleep", value: "" },
      { name: "Stress", value: "" },
      { name: "Hydration", value: "" },
    ],
    description: "",
    date: dates,
    medications: [{ name: "", dosage: "", frequency: "" }],
    attachments: null,
  });

  const initialFormState: FormData = {
    healthMetrics: [
      { name: 'Exercise', value: '' },
      { name: 'Diet', value: '' },
      { name: 'Sleep', value: '' },
      { name: 'Stress', value: '' },
      { name: 'Hydration', value: '' },
    ],
    description: '',
    date: new Date().toISOString().split('T')[0],
    medications: [{ name: '', dosage: '', frequency: '' }], // Default one empty medication
    attachments: null,
  };

  const dispatch = useAppDispatch();
  const { allpatients } = useSelector((state: RootState) => state.Patient);

  const samplePatients = allpatients?.map((element) => ({
    id: element?.id,
    name: element.name,
    dob: element?.dob,
    visit_count: element?.visit_count || 0,
    age: element?.dob.slice(0, 4),
    patientId: `P00${element?.id}`,
  }));

  useEffect(() => {
    dispatch(getallPatients());
  }, [dispatch]);

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setSearchQuery("");
  };

  const handleMetricChange = (index: number, value: string) => {
    const newMetrics = [...formData.healthMetrics];
    newMetrics[index].value = value;
    setFormData({ ...formData, healthMetrics: newMetrics });
  };

  const handleMedicationChange = (
    index: number,
    field: 'name' | 'dosage' | 'frequency',
    value: string
  ) => {
    const updatedMedications = [...formData.medications];
    updatedMedications[index][field] = value; // Update specific field
    setFormData({ ...formData, medications: updatedMedications });
  };
  
  const addMedication = () => {
    setFormData({
      ...formData,
      medications: [...formData.medications, { name: '', dosage: '', frequency: '' }],
    });
  };
  
  const removeMedication = (index: number) => {
    const updatedMedications = formData.medications.filter((_, i) => i !== index);
    setFormData({ ...formData, medications: updatedMedications });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          attachments: { file, path: reader.result as string },
        });
        setImagePreview(reader.result as string); // Set image preview
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        attachments: null,
      });
      setImagePreview(null); // Clear image preview
    }
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedPatient) return;

  // Create a HealthRecordData type object
  const submissionData: HealthRecordData = {
    patient_id: Number(selectedPatient.id),
    description: formData.description,
    date: formData.date,
    medications: JSON.stringify(formData.medications),
    healthMetrics: JSON.stringify(formData.healthMetrics),
    attachment_path: formData.attachments?.path || ''
  };

  console.log('Submitting data:', submissionData);
  dispatch(Healthrecord(submissionData));

  // Reset form
  setFormData(initialFormState);
  setSelectedPatient(null);
};


  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
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
                ?.filter(
                  (patient) =>
                    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    patient.patientId.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((patient) => (
                  <div
                    key={patient.id}
                    className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handlePatientSelect(patient as unknown as Patient)}
                  >
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-500">
                      ID: {patient.patientId} | DOB: {patient.age}
                    </div>
                  </div>
                ))}
            </div>
          )}
          {selectedPatient && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="font-medium">Selected Patient:</div>
              <div>
                {selectedPatient.name} (ID: {selectedPatient.id})
              </div>
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
          Remove
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addMedication}
      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
    >
      Add Medication
    </button>
  </div>
         </div>


            {/* Attachments */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Attachments</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Attachment preview"
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                rows={5}
                placeholder="Add any additional notes here..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Submit Health Chart
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default HealthChartForm;
