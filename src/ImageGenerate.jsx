import  { useState } from 'react';
import axios from 'axios';
import './style.css'; // Import your CSS file

const ImageGenerate = () => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/dataautogpt3/OpenDalleV1.1",
        { "inputs": inputText },
        {
          headers: {
            Authorization: "Bearer your_API_Token_Here",
            'Content-Type': 'application/json',
          },
          responseType: 'blob', // Expecting binary data (image)
        }
      );

      if (response.status === 200) {
        const imageUrl = URL.createObjectURL(response.data);
        setGeneratedImage(imageUrl);
      } else {
        setError("Failed to generate image");
      }
    } catch (error) {
      setError("Error generating image");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <h1 style={{ textAlign: 'center', background: '#000', padding: '1rem', color: 'white' }}>Image Generator AI</h1>
        <div className="top">
          <input
            type="text"
            className="input"
            placeholder="Search your Image"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button className="generate" onClick={generateImage} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="bottom">
          {error && <p className="error-message">{error}</p>}
          {isLoading ? (
            <span className="loader"></span>
          ) : (
            <div className="img-container">
              {generatedImage && (
                <img src={generatedImage} alt="Generated Image" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerate;
