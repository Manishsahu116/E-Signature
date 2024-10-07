import React, { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const DrawSignature = () => {
    const signatureRef = useRef(null);
    const [signatureImage, setSignatureImage] = useState(null);
    const [color, setColor] = useState('#000000');

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
                backgroundColor="rgba(255, 255, 255, 0)"
                penColor={color}
                canvasProps={{
                    width: Math.min(window.innerWidth * 0.9, 600),
                    height: 450,
                    className: 'border border-gray-400 w-full h-auto'
                }}
            />

            {/* Color Options */}
            <div className="m-4">
                <label className="block text-gray-700 font-semibold mb-2">Pick Color:</label>
                <div className="grid grid-cols-7 md:flex justify-center gap-5">
                    {[
                        '#000000', '#FF5733', '#33FF57', '#3357FF',
                        '#FFC300', '#FF33A1', '#079ef5'
                    ].map((colorOption) => (
                        <button
                            key={colorOption}
                            onClick={() => setColor(colorOption)}
                            style={{ backgroundColor: colorOption }}
                            className={`w-6 h-6 border-4 rounded-full transition-all duration-300 ${color === colorOption ? 'ring-1 ring-black' : 'border border-transparent'}`}
                        />
                    ))}
                </div>
            </div>


            {/* Buttons */}
            <div className="flex justify-center space-x-4">
                <button
                    onClick={saveSignature}
                    className="bg-slate-500 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Save as PNG
                </button>
                <button
                    onClick={clearCanvas}
                    className="bg-red-400 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
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
