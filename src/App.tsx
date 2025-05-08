import React, { useState } from 'react';
import { Upload, Leaf, Droplets, Thermometer, BarChart3, FileCheck, Tractor } from 'lucide-react';

function App() {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState<string | null>(null);
  const [fieldSize, setFieldSize] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    deficiency: string;
    fertilizer: string;
    quantity: number;
    totalQuantity: number;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFieldSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldSize(parseFloat(e.target.value));
  };

  const analyzeImage = () => {
    setLoading(true);
    
    // Simulate analysis (in a real app, this would call an API)
    setTimeout(() => {
      // Mock results based on the Python code logic
      const deficiencyTypes = ['Nitrogen Deficient', 'Phosphorus Deficient', 'Potassium Deficient', 'Balanced'];
      const deficiency = deficiencyTypes[Math.floor(Math.random() * deficiencyTypes.length)];
      
      const fertilizerMap: Record<string, string> = {
        'Nitrogen Deficient': 'Urea',
        'Phosphorus Deficient': 'Superphosphate',
        'Potassium Deficient': 'Potassium Chloride',
        'Balanced': 'NPK Blend'
      };
      
      const fertilizer = fertilizerMap[deficiency];
      const quantity = 120 + Math.random() * 50; // Random quantity between 120-170 kg/ha
      const totalQuantity = quantity * fieldSize;
      
      setResults({
        deficiency,
        fertilizer,
        quantity,
        totalQuantity
      });
      
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  const resetAnalysis = () => {
    setImage(null);
    setFieldSize(1);
    setResults(null);
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <Leaf className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">SoilSense</h1>
          <p className="ml-4 text-gray-500">Soil Analysis & Fertilizer Recommendation</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 1 ? 'border-green-600 bg-green-100' : 'border-gray-400'}`}>
              1
            </div>
            <span className="ml-2 font-medium">Upload</span>
          </div>
          <div className={`w-12 h-1 mx-2 ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 2 ? 'border-green-600 bg-green-100' : 'border-gray-400'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Field Info</span>
          </div>
          <div className={`w-12 h-1 mx-2 ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${step >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= 3 ? 'border-green-600 bg-green-100' : 'border-gray-400'}`}>
              3
            </div>
            <span className="ml-2 font-medium">Results</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Upload Soil Image</h2>
                <p className="text-gray-600 mb-4">Upload a clear image of your soil for analysis</p>
              </div>

              {!image ? (
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-green-500 transition-colors"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-400 mt-1">JPG or PNG files only</p>
                  <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/jpeg,image/png"
                    onChange={handleImageUpload}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative max-w-md mx-auto">
                    <img 
                      src={image} 
                      alt="Uploaded soil" 
                      className="rounded-lg w-full h-auto max-h-64 object-cover mx-auto"
                    />
                    <button 
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      onClick={() => setImage(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center">
                    <button 
                      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                      onClick={() => setStep(2)}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Field Information</h2>
                <p className="text-gray-600 mb-4">Provide details about your field for accurate recommendations</p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <label htmlFor="field-size" className="block text-sm font-medium text-gray-700 mb-1">
                    Field Size (hectares)
                  </label>
                  <div className="relative">
                    <input
                      id="field-size"
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={fieldSize}
                      onChange={handleFieldSizeChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">ha</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button 
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button 
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                    onClick={analyzeImage}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing...
                      </span>
                    ) : (
                      'Analyze Soil'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && results && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Analysis Results</h2>
                <p className="text-gray-600 mb-4">Based on your soil image and field information</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                    <Leaf className="h-5 w-5 text-green-600 mr-2" />
                    Soil Analysis
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Detected Deficiency:</span>
                      <span className="font-medium">{results.deficiency}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Field Size:</span>
                      <span className="font-medium">{fieldSize} hectares</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                    <Tractor className="h-5 w-5 text-green-600 mr-2" />
                    Fertilizer Recommendation
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Recommended Fertilizer:</span>
                      <span className="font-medium">{results.fertilizer}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Quantity per Hectare:</span>
                      <span className="font-medium">{results.quantity.toFixed(2)} kg/ha</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Total Quantity Needed:</span>
                      <span className="font-medium">{results.totalQuantity.toFixed(2)} kg</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                  <FileCheck className="h-5 w-5 text-blue-600 mr-2" />
                  Application Guidelines
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Apply fertilizer evenly across the field for best results</li>
                  <li>Consider splitting the application into multiple sessions for better absorption</li>
                  <li>Apply during early morning or late evening to reduce evaporation</li>
                  <li>Follow up with soil testing after 3-4 months to monitor improvements</li>
                </ul>
              </div>

              <div className="text-center mt-6">
                <button 
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  onClick={resetAnalysis}
                >
                  Start New Analysis
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 inline-flex mx-auto mb-3">
                <Upload className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-700 mb-1">Upload Soil Image</h3>
              <p className="text-sm text-gray-500">Upload a clear image of your soil for analysis</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mx-auto mb-3">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-700 mb-1">AI Analysis</h3>
              <p className="text-sm text-gray-500">Our AI analyzes soil color, texture and composition</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 inline-flex mx-auto mb-3">
                <Droplets className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-700 mb-1">Get Recommendations</h3>
              <p className="text-sm text-gray-500">Receive tailored fertilizer recommendations for your field</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Leaf className="h-6 w-6 text-green-400 mr-2" />
              <span className="font-semibold text-lg">SoilSense</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 SoilSense. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;