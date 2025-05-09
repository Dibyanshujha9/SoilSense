import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import Footer from '../components/Footer';
interface StandardSoilData {
  parameter: string;
  optimalRange: string;
}

interface AnalysisResults {
  deficiency: string;
  fertilizer: string;
  quantity: number;
  totalQuantity: number;
}

interface SoilData {
  id: number;
  soilType: string;
  pH: number;
  moistureLevel: number;
}

const standardSoilData: StandardSoilData[] = [
  { parameter: 'pH Level', optimalRange: '6.0 - 7.5' },
  { parameter: 'Nutrient Balance', optimalRange: 'Balanced (adequate N, P, K)' },
  { parameter: 'Moisture Level', optimalRange: 'Optimal for crop type' },
];

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results as AnalysisResults | null;

  const [soilData, setSoilData] = useState<SoilData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        setTimeout(() => {
          const mockData: SoilData[] = [
            { id: 1, soilType: 'Clay Loam', pH: 6.2, moistureLevel: 42.5 },
            { id: 2, soilType: 'Sandy Loam', pH: 5.8, moistureLevel: 38.1 },
            { id: 3, soilType: 'Silt Loam', pH: 7.1, moistureLevel: 45.3 },
            { id: 4, soilType: 'Clay', pH: 4.9, moistureLevel: 51.2 },
            { id: 5, soilType: 'Sandy', pH: 7.8, moistureLevel: 29.7 },
          ];
          setSoilData(mockData);
          setLoading(false);
        }, 1000);
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

  const getComparisonStatus = (parameter: string, results: AnalysisResults | null): string => {
    if (!results) return 'N/A';
    if (parameter === 'Nutrient Balance') {
      return results.deficiency.toLowerCase().includes('none') ? 'Balanced' : 'Imbalanced';
    }
    return 'N/A';
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
          <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">Soil Analysis Overview</h2>

          {/* Standard Soil Data Table */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Standard Soil Data</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 text-left text-gray-700 font-medium text-sm">Parameter</th>
                    <th className="py-2 px-3 text-left text-gray-700 font-medium text-sm">Optimal Range/Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {standardSoilData.map((data, index) => (
                    <tr key={index}>
                      <td className="py-2 px-3 text-gray-800 text-sm">{data.parameter}</td>
                      <td className="py-2 px-3 text-gray-800 text-sm">{data.optimalRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Analysis Results Table */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Obtained Analysis Results</h3>
            {results ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left text-gray-700 font-medium text-sm">Parameter</th>
                      <th className="py-2 px-3 text-left text-gray-700 font-medium text-sm">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-2 px-3 text-gray-800 text-sm">Nutrient Deficiency</td>
                      <td className="py-2 px-3 text-gray-800 text-sm">{results.deficiency}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-800 text-sm">Recommended Fertilizer</td>
                      <td className="py-2 px-3 text-gray-800 text-sm">{results.fertilizer}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-800 text-sm">Fertilizer Quantity (per hectare)</td>
                      <td className="py-2 px-3 text-gray-800 text-sm">{results.quantity.toFixed(2)} kg/ha</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 text-gray-800 text-sm">Total Recommended Quantity</td>
                      <td className="py-2 px-3 text-gray-800 text-sm">{results.totalQuantity.toFixed(2)} kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">No analysis results available. Please perform an analysis in the main app.</p>
            )}
          </div>

          {/* Comparison Table */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Comparison with Standard Data</h3>
            {!results ? (
              <p className="text-center text-gray-500 py-4">Cannot perform comparison without analysis results.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 text-left text-gray-700 font-medium text-sm">Parameter</th>
                      <th className="py-2 px-3 text-left text-gray-700 font-medium text-sm">Standard</th>
                      <th className="py-2 px-3 text-left text-gray-700 font-medium text-sm">Obtained Result</th>
                      <th className="py-2 px-3 text-left text-gray-700 font-medium text-sm">Comparison</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {standardSoilData.map((standard, index) => (
                      <tr key={index}>
                        <td className="py-2 px-3 text-gray-800 text-sm">{standard.parameter}</td>
                        <td className="py-2 px-3 text-gray-800 text-sm">{standard.optimalRange}</td>
                        <td className="py-2 px-3 text-gray-800 text-sm">
                          {standard.parameter === 'Nutrient Balance' && results.deficiency}
                          {standard.parameter !== 'Nutrient Balance' && 'N/A (Result not mapped)'}
                        </td>
                        <td className="py-2 px-3 text-gray-800 text-sm">
                          {getComparisonStatus(standard.parameter, results)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Scientific Analysis Summary */}
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

      <Footer />
    </div>
  );
};

export default AdminPanel;
