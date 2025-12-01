import React, { useRef, useEffect, useState } from 'react';

// This tells us what the scratch card needs to work
interface ScratchCardIntroProps {
  onComplete: () => void; // Function to call when scratching is done
  onClose?: () => void; // Function to call when close button is clicked
}

const ScratchCardIntro: React.FC<ScratchCardIntroProps> = ({ onComplete, onClose }) => {
  // This helps us draw on the scratch surface
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // This tracks if user is currently scratching
  const [isScratching, setIsScratching] = useState(false);
  // This tracks if we should show coin animation
  const [showCoins, setShowCoins] = useState(false);

  // This runs when the component first loads - it creates the scratch surface
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit if canvas doesn't exist

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Exit if we can't draw on canvas

    // Create metallic scratch surface with gradient
    const gradient = ctx.createLinearGradient(0, 0, 320, 200);
    gradient.addColorStop(0, '#2ecc71');
    gradient.addColorStop(0.5, '#24c567');
    gradient.addColorStop(1, '#1ea557');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 320, 200);
    
    // Add scratch texture
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    for (let i = 0; i < 50; i++) {
      ctx.fillRect(Math.random() * 320, Math.random() * 200, 2, 1);
    }
    
    // Write "Scratch Now" text in white on top left
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Scratch Now', 20, 40);
    
    // Put shopping basket emoji in the center
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🛒', 160, 130);
    
    // Write "bigbasket" brand name in bottom right corner
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillText('bigbasket', 300, 180);
  }, []);

  // This function handles the scratching action
  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit if canvas doesn't exist

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Exit if we can't draw

    // Get the exact position where user clicked/touched
    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    // Set up the eraser tool to remove the green surface
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 35, 0, 2 * Math.PI);
    ctx.fill();

    // Count how much has been scratched off
    const imageData = ctx.getImageData(0, 0, 320, 200);
    const pixels = imageData.data;
    let transparent = 0; // Count transparent pixels

    // Check every 4th pixel (alpha channel) to see if it's transparent
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    // If more than 20% is scratched, show the prize
    if ((transparent / (320 * 200)) * 100 > 20) {
      setShowCoins(true); // Start coin animation
      setTimeout(onComplete, 1500); // Wait 1.5 seconds then show prize
    }
  };

  return (
    // Main container - fills the whole screen with gradient background
    <div style={{
      height: '100vh', // Full screen height
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient
      display: 'flex',
      alignItems: 'center', // Center vertically
      justifyContent: 'center', // Center horizontally
      padding: '20px'
    }}>
      {/* This creates a phone-like frame */}
      <div style={{
        width: '375px', // iPhone width
        height: '667px', // iPhone height
        background: '#1a1a1a', // Black phone frame
        borderRadius: '35px', // Rounded corners like phone
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
        border: '2px solid #333' // Dark border
      }}>
        
        
        {/* Phone screen */}
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(145deg, #fff5f0, #ffe8d6)',
          borderRadius: '28px',
          padding: '30px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxSizing: 'border-box'
        }}>
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'rgba(0,0,0,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 30
            }}
          >
            ✕
          </button>
        )}
        
        {/* Header text */}
        <div style={{
          color: '#333',
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          🎉 Lucky Draw 🎉
        </div>
        
        <div style={{
          color: '#666',
          fontSize: '16px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Scratch to reveal your prize!
        </div>

        {/* The actual scratch card container */}
        <div style={{
          position: 'relative',
          width: '320px',
          height: '200px',
          borderRadius: '20px',
          overflow: 'hidden', // Hide anything outside the card
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          border: '3px solid #ffd700' // Gold border
        }}>
        {/* This is what shows UNDER the scratch surface - the prize! */}
        <div style={{
          position: 'absolute',
          inset: 0, // Fill the entire card
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', // Colorful gradient
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center everything
          justifyContent: 'center',
          color: 'white', // White text on colorful background
          fontSize: '24px',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)' // Text shadow
        }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎁</div> {/* Bigger gift emoji */}
          <div style={{ fontSize: '28px', marginBottom: '5px' }}>WINNER!</div> {/* Winner message */}
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>20% OFF</div> {/* Discount amount */}
          <div style={{ fontSize: '14px', marginTop: '5px', opacity: 0.9 }}>+ Free Gift Worth ₹399</div>
        </div>

        {/* This is the scratchable surface that goes ON TOP */}
        <canvas
          ref={canvasRef} // Connect to our drawing tool
          width={320}
          height={200}
          style={{
            position: 'absolute',
            inset: 0, // Cover the entire prize area
            cursor: 'pointer' // Show hand cursor when hovering
          }}
          // When user starts scratching with mouse
          onMouseDown={(e) => {
            setIsScratching(true); // Remember we're scratching
            scratch(e); // Start scratching
          }}
          // When user stops clicking
          onMouseUp={() => setIsScratching(false)}
          // When user moves mouse while scratching
          onMouseMove={scratch}
          // When mouse leaves the card area
          onMouseLeave={() => setIsScratching(false)}
          // Touch events for mobile phones
          onTouchStart={(e) => {
            setIsScratching(true);
            scratch(e);
          }}
          onTouchEnd={() => setIsScratching(false)}
          onTouchMove={scratch}
        />
        
        {/* Coin animation overlay */}
        {showCoins && (
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 20
          }}>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  fontSize: '30px',
                  left: `${20 + i * 35}px`,
                  top: `${50 + (i % 2) * 30}px`,
                  animation: `coinFall 1s ease-out ${i * 0.1}s forwards`
                }}
              >
                🪙
              </div>
            ))}
          </div>
        )}
        </div>
        </div>
      </div>
      
      <style>{`
        @keyframes coinFall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ScratchCardIntro;