import React, { useState } from 'react';
import {
  Upload, Leaf
} from 'lucide-react';
import {
  // BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation
} from 'react-router-dom';
// import Uielement from './UiElement';
import Footer from './Footer'; // Import the Footer component

// Dummy AdminPannel for routing
const AdminPannel = () => {
  const location = useLocation();
  const results = location.state?.results;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
      {results ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(results, null, 2)}</pre>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

function MainApp() {
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

  const navigate = useNavigate();

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
    setTimeout(() => {
      const deficiencyTypes = ['Nitrogen Deficient', 'Phosphorus Deficient', 'Potassium Deficient', 'Balanced'];
      const deficiency = deficiencyTypes[Math.floor(Math.random() * deficiencyTypes.length)];
      const fertilizerMap: Record<string, string> = {
        'Nitrogen Deficient': 'Urea',
        'Phosphorus Deficient': 'Superphosphate',
        'Potassium Deficient': 'Potassium Chloride',
        'Balanced': 'NPK Blend'
      };

      const fertilizer = fertilizerMap[deficiency];
      const quantity = 120 + Math.random() * 50;
      const totalQuantity = quantity * fieldSize;

      const resultData = {
        deficiency,
        fertilizer,
        quantity: Math.round(quantity),
        totalQuantity: Math.round(totalQuantity)
      };

      setResults(resultData);
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

  const handleScientistViewClick = () => {
    navigate('/admin', { state: { results } });
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
        {/* Step indicators */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((n, i) => (
            <React.Fragment key={n}>
              <div className={`flex items-center ${step >= n ? 'text-green-600' : 'text-gray-400'}`}>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${step >= n ? 'border-green-600 bg-green-100' : 'border-gray-400'}`}>
                  {n}
                </div>
                <span className="ml-2 font-medium">
                  {n === 1 ? 'Upload' : n === 2 ? 'Field Info' : 'Results'}
                </span>
              </div>
              {n < 3 && <div className={`w-12 h-1 mx-2 ${step > n ? 'bg-green-600' : 'bg-gray-300'}`} />}
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {step === 1 && (
            <div className="text-center space-y-6">
              <h2 className="text-xl font-semibold">Upload Soil Image</h2>
              {!image ? (
                <div
                  className="border-2 border-dashed border-gray-300 p-12 rounded cursor-pointer hover:border-green-500"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p>Click to upload or drag and drop</p>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              ) : (
                <>
                  <img src={image} alt="Uploaded soil" className="w-full max-h-64 object-cover rounded" />
                  <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" onClick={() => setStep(2)}>
                    Continue
                  </button>
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center">Field Information</h2>
              <div className="max-w-md mx-auto">
                <label htmlFor="field-size" className="block text-sm font-medium mb-1">Field Size (hectares)</label>
                <div className="relative">
                  <input
                    id="field-size"
                    type="number"
                    min="0.1"
                    value={fieldSize}
                    onChange={handleFieldSizeChange}
                    className="w-full border px-4 py-2 rounded focus:ring-green-500 focus:border-green-500"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-500">ha</div>
                </div>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                  Back
                </button>
                <button
                  onClick={analyzeImage}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && results && (
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold">Analysis Results</h2>
              <p className="text-gray-600">Deficiency: <strong>{results.deficiency}</strong></p>
              <p className="text-gray-600">Recommended Fertilizer: <strong>{results.fertilizer}</strong></p>
              <p className="text-gray-600">Quantity per hectare: <strong>{results.quantity} kg/ha</strong></p>
              <p className="text-gray-600">Total Quantity for {fieldSize} ha: <strong>{results.totalQuantity} kg</strong></p>

              <div className="flex justify-center gap-4 mt-6">
                <button onClick={resetAnalysis} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                  Start Over
                </button>
                <button onClick={handleScientistViewClick} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                  Scientist View
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      {/* <Uielement /> */}
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default function App() {
  return (
    // <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminPannel />} />
      </Routes>
    // </Router>
  );
}
