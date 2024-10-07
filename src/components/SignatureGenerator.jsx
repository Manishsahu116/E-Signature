import React, { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';

const SignatureGenerator = () => {
    const [signatureText, setSignatureText] = useState('');
    const [signatureColor, setSignatureColor] = useState('#000000');
    const [font, setFont] = useState('Dancing Script'); // Default font
    const [generatedSignature, setGeneratedSignature] = useState(null);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
    const [slope, setSlope] = useState(0); 
    const [size, setSize] = useState(60); 

    // Handle the signature generation
    const generateSignature = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 600;
        canvas.height = 250;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Apply the font style dynamically
        ctx.font = `bold ${size}px '${font}'`;
        ctx.fillStyle = signatureColor;

        // Calculate the text width to ensure it fits in the canvas
        const textWidth = ctx.measureText(signatureText).width;
        const maxWidth = canvas.width - 100; // Leaving some padding on the sides
        const x = Math.max(50, (canvas.width - textWidth) / 2); // Center the text if possible

        // Adjust Y position based on text height
        const y = 150;

        // Draw the signature with the calculated slope
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((slope * Math.PI) / 180); // Convert slope to radians
        ctx.fillText(signatureText, 0, 0);
        ctx.restore();

        setGeneratedSignature(canvas.toDataURL('image/png'));
    };

    // Effect to generate signature on font or color change
    useEffect(() => {
        if (signatureText) {
            generateSignature();
        }
    }, [font, signatureColor, signatureText, slope, size]); // Re-generate on font change
    
    // Download signature as PNG
    const downloadSignature = () => {
        const link = document.createElement('a');
        link.href = generatedSignature;
        link.download = 'signature.png';
        link.click();
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-xl mx-auto m-10">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
                Create Your Custom eSignature
            </h2>
            <p className="mb-6 text-center text-gray-600">
                Design a custom signature using your own font style and color.
            </p>

            {/* Input for Signature Text */}
            <input
                type="text"
                placeholder="Type your signature here"
                value={signatureText}
                onChange={(e) => setSignatureText(e.target.value)}
                className="border p-3 mb-4 w-full rounded-lg focus:ring focus:ring-blue-300"
            />

            {/* Font Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Choose Font Style:</label>
                <select
                    value={font}
                    onChange={(e) => setFont(e.target.value)}
                    className="border p-3 mb-4 w-full rounded-lg"
                >
                    <option value="Dancing Script">Dancing Script</option>
                    <option value="Edu Australia VIC WA NT Hand Guides">Edu Australia VIC WA NT Hand Guides</option>
                    <option value="Afacad Flux">Afacad Flux</option>
                    <option value="Qwitcher Grypen">Qwitcher Grypen</option>
                    <option value="Shadows Into Light">Shadows Into Light</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Lobster">Lobster</option>
                    <option value="Great Vibes">Great Vibes</option>
                    <option value="Pacifico">Pacifico</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Open Sans">Open Sans</option>
                </select>
            </div>

            {/* Size Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Choose Signature Size:</label>
                <select
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="border p-3 mb-4 w-full rounded-lg"
                >
                    <option value={40}>Small</option>
                    <option value={60}>Medium</option>
                    <option value={80}>Large</option>
                </select>
            </div>

            {/* Slope Selection */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Slope Signature:</label>
                <select
                    value={slope}
                    onChange={(e) => setSlope(Number(e.target.value))}
                    className="border p-3 mb-4 w-full rounded-lg"
                >
                    <option value={0}>Straight</option>
                    <option value={-15}>Left</option>
                    <option value={15}>Right</option>
                </select>
            </div>

            {/* Color Picker Button */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Pick Signature Color:</label>
                <div className="flex items-center mb-2">
                    <button
                        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)} // Toggle instead of always opening
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg w-full"
                    >
                        Choose Color
                    </button>
                    {/* Display selected color */}
                    <div
                        style={{ backgroundColor: signatureColor }}
                        className="w-10 h-10 border rounded ml-2"
                    ></div>
                </div>
            </div>

            {/* Color Picker Modal */}
            {isColorPickerOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Pick a Color</h3>
                        <SketchPicker
                            color={signatureColor}
                            onChangeComplete={(color) => {
                                setSignatureColor(color.hex);
                                setIsColorPickerOpen(false); 
                            }}
                            width={250}
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsColorPickerOpen(false)}
                                className="bg-slate-600 text-white py-2 px-4 rounded-lg hover:bg-slate-800"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Display Generated Signature */}
            {generatedSignature && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2 text-center">Your Generated Signature:</h3>
                    <div className="flex justify-center mb-4">
                        <img src={generatedSignature} alt="Generated Signature" className="border rounded-lg" />
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={downloadSignature}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
                        >
                            Download as PNG
                        </button>
                        <button
                            onClick={() => { setSignatureText(''); setGeneratedSignature(null); }}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignatureGenerator;
