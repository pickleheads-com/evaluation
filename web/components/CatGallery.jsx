import React, { useState, useEffect } from 'react';

const CatGallery = () => {
  const [catName, setCatName] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cats from API
  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/cats');

        const data = response.json();

        setCat(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cats:', err);
        setError('Failed to load cats. Please try again later.');
        setLoading(false);
      }
    };

    fetchCats();
  }, [cats, loading, error, catName, catDescription, selectedFile]);

  const handleSubmit = async (e) => {
    try {
      if (selectedFile) {
        imageBase64 = await convertFileToBase64(selectedFile);
        imageUrl = URL.createObjectURL(selectedFile); // For preview purposes
      }

      // Create a new cat object
      const newCat = {
        id: Date.now(), // primary key
        name: catName,
        desc: catDescription,
        imageUrl: imageUrl,
        imageBase64: imageBase64, // Add the base64 encoded image
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null
      };

      const response = await fetch('http://localhost:3000/api/cats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCat),
      });
      const savedCat = response.json();

      // For demo purposes, just add the new cat to the state
      setCats([...cats, ...savedCat]);

      // Reset form
      setCatName('');
      setCatDescription('');
      setSelectedFile(null);

      alert('Cat added successfully!');
    } catch (err) {
      console.error('Error adding cat:', err);
      alert('Failed to add cat. Please try again.');
    }
  };

  // Helper function to convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 text-center">Cat Gallery</h1>

      {/* Gallery Section */}
      <div class="mb-12">
        {loading ? (
          <p class="text-center text-xl">Loading cats...</p>
        ) : error ? (
          <p class="text-center text-xl text-red-500">{error}</p>
        ) : (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cats.length && cats.map((cat) => (
              <div key={cat.id} class="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  class="w-full h-64 object-cover"
                />
                <div class="p-4">
                  <h2 class="text-xl font-semibold mb-2">{cat.name}</h2>
                  <p class="text-gray-700">{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submission Form */}
      <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold mb-6">Add Your Cat</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" htmlFor="catName">
              Cat Name
            </label>
            <input
              type="text"
              id="catName"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={catName}
              onInput={(e) => setCatName(e.target.value)}
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-medium mb-2" htmlFor="catDescription">
              Description
            </label>
            <textarea
              id="catDescription"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={catDescription}
              onChange={(e) => setCatDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2" htmlFor="catImage">
              Cat Image
            </label>
            <input
              type="file"
              id="catImage"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {selectedFile && (
              <p class="mt-2 text-sm text-gray-600">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Cat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CatGallery;