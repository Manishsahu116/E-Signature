import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const DrawSignature = () => {
    const signatureRef = useRef(null);
    const [signatureImage, setSignatureImage] = useState(null);
    const [color, setColor] = useState('#000000'); // Default color

    // Adjust the canvas for device pixel ratio
    useEffect(() => {
        const canvas = signatureRef.current.getCanvas();
        const scale = window.devicePixelRatio;
        canvas.width = canvas.offsetWidth * scale;
        canvas.height = canvas.offsetHeight * scale;
        const ctx = canvas.getContext("2d");
        ctx.scale(scale, scale);
    }, []);

    // Function to save the signature as a PNG image
    const saveSignature = () => {
        const dataURL = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'signature.png';
        link.click();
    };

    const clearCanvas = () => {
        signatureRef.current.clear();
        setSignatureImage(null);
    };

    return (
        <div className="p-8 bg-white rounded-lg shadow-lg max-w-xl mx-auto m-10">
            <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
                Draw Your Signature
            </h2>
            <p className="mb-6 text-center text-gray-600">
                Use the canvas below to draw your signature.
            </p>

            {/* Signature Canvas */}
            <SignatureCanvas
                ref={signatureRef}
                backgroundColor="rgba(255, 255, 255, 0)" // Transparent background
                penColor={color}
                canvasProps={{
                    width: 600,
                    height: 250,
                    className: 'border border-gray-400 w-full h-auto'
                }}
            />

            {/* Color Options */}
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Pick Signature Color:</label>
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-10 gap-2">
                    {[
                        '#000000', '#FF5733', '#33FF57', '#3357FF',
                        '#FFC300', '#FF33A1', '#33FFF2', '#E4CBA8', 
                        '#C8A2C8', '#079ef5'
                    ].map((colorOption) => (
                        <button
                            key={colorOption}
                            onClick={() => setColor(colorOption)}
                            style={{ backgroundColor: colorOption }}
                            className={`w-8 h-8 border rounded-full ${color === colorOption ? 'border-2 border-black' : ''}`}
                        />
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-4">
                <button
                    onClick={saveSignature}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Save as PNG
                </button>
                <button
                    onClick={clearCanvas}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Clear
                </button>
            </div>

            {/* Display Saved Signature */}
            {signatureImage && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2 text-center">Your Signature:</h3>
                    <div className="flex justify-center mb-4">
                        <img src={signatureImage} alt="Signature" className="border rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DrawSignature;
