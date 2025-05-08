import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface SoilData {
  id: string; // Assuming a unique ID for each soil entry
  soilType: string;
  pH: number;
  moistureLevel: number;
}

// Dummy data for testing since real API might not be available
const dummyData: SoilData[] = [
  { id: '1', soilType: 'Clay Loam', pH: 6.5, moistureLevel: 35.8 },
  { id: '2', soilType: 'Sandy Soil', pH: 5.8, moistureLevel: 22.4 },
  { id: '3', soilType: 'Silty Loam', pH: 7.2, moistureLevel: 42.1 },
  { id: '4', soilType: 'Peaty Soil', pH: 4.9, moistureLevel: 68.3 },
  { id: '5', soilType: 'Chalky Soil', pH: 8.1, moistureLevel: 18.7 },
];

const AdminPanel: React.FC = () => {
  const [soilData, setSoilData] = useState<SoilData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        // In a real app, this would be an API call
        // For now, let's use our dummy data with a timeout to simulate a network request
        setTimeout(() => {
          setSoilData(dummyData);
          setLoading(false);
        }, 800);
        
        // Commented out real API call code for reference
        // const response = await fetch('/api/soil-data');
        // if (!response.ok) {
        //   throw new Error(`Error fetching data: ${response.statusText}`);
        // }
        // const data: SoilData[] = await response.json();
        // setSoilData(data);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchSoilData();
  }, []);

  const handleBackClick = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-green-800">Loading soil data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <p className="text-red-700 font-medium">Error: {error}</p>
          <button 
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={handleBackClick}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
          <h1 className="text-xl font-bold">SoilSense Scientific Dashboard</h1>
          <button 
            className="flex items-center bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-50"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to App
          </button>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Soil Analysis Records</h2>
          
          {soilData.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No soil data available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left text-gray-700 font-medium">ID</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-medium">Soil Type</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-medium">pH Level</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-medium">Moisture Level</th>
                    <th className="py-3 px-4 text-left text-gray-700 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {soilData.map((soil) => (
                    <tr key={soil.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{soil.id}</td>
                      <td className="py-3 px-4 text-gray-800">{soil.soilType}</td>
                      <td className="py-3 px-4 text-gray-800">{soil.pH.toFixed(1)}</td>
                      <td className="py-3 px-4 text-gray-800">{soil.moistureLevel.toFixed(2)}%</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                          soil.pH < 5.5 ? 'bg-red-100 text-red-800' : 
                          soil.pH > 7.5 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {soil.pH < 5.5 ? 'Too Acidic' : 
                           soil.pH > 7.5 ? 'Too Alkaline' : 
                           'Optimal pH'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-8 bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">Scientific Analysis</h3>
            <p className="text-gray-700">
              Based on the collected soil data, we observe an average pH level of {
                (soilData.reduce((sum, soil) => sum + soil.pH, 0) / soilData.length).toFixed(2)
              } and an average moisture content of {
                (soilData.reduce((sum, soil) => sum + soil.moistureLevel, 0) / soilData.length).toFixed(2)
              }%. 
              These readings indicate generally favorable conditions for most crop varieties with some localized adjustments recommended.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;