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
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    deficiency: string;
    fertilizer: string;
    recommendation: string;
    quantity: number;
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

  const analyzeImage = async () => {
    setLoading(true);

    if (!image) {
      console.error("No image to analyze.");
      setLoading(false);
      return;
    }

    try {
      // Convert data URL to Blob
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "soil_image.png", { type: blob.type });

      const formData = new FormData();
      formData.append('file', file);

      // const apiResponse = await fetch('http://localhost:8000/analyze/', {
            const apiResponse = await fetch('https://soilsense-fastapi-mlmodel-2.onrender.com/analyze/', {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();

      const resultData = { ...data, quantity: 150 }; // Using a placeholder quantity

      setResults(resultData);
      setStep(3);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => { // This should be async too if it involves API calls later
    setImage(null);
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
                  {n === 1 ? 'Upload' : n === 2 ? 'Analyze' : 'Results'}
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
              <h2 className="text-xl font-semibold text-center">Ready to Analyze</h2>
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
              {/* <p className="text-gray-600">Recommended Fertilizer: <strong>{results.fertilizer}</strong></p> */}
              <p className="text-gray-600">Recommendation Fertilizer: <strong>{results.recommendation || 'No specific recommendation'}</strong></p>
              {/* <p className="text-gray-600">Recommended Quantity: <strong>{results.quantity} kg/hectare</strong></p> */}

              <div className="flex justify-center gap-4 mt-6">
                <button onClick={resetAnalysis} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">
                  Start Over
                </button>
                <button onClick={handleScientistViewClick} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Expert analysis
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