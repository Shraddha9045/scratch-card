import React, { useState } from 'react';

interface RewardPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const RewardPopup: React.FC<RewardPopupProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const couponCode = 'CCBB20';

  const copyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '30px',
        maxWidth: '350px',
        width: '100%',
        position: 'relative',
        textAlign: 'center'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>

        <div style={{
          fontSize: '40px',
          marginBottom: '15px'
        }}>
          🎉
        </div>

        <div style={{
          color: '#24c567',
          fontSize: '16px',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Congratulations!
        </div>

        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#ff6b35'
        }}>
          CLAY CO.
        </div>

        <div style={{
          fontSize: '16px',
          marginBottom: '25px',
          lineHeight: '1.4'
        }}>
          Flat 20% Off & Get Free Moisturiser worth ₹399
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#f5f5f5',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '25px',
          border: '1px solid #ddd'
        }}>
          <span style={{ flex: 1, fontWeight: 'bold' }}>{couponCode}</span>
          <button
            onClick={copyCode}
            style={{
              background: '#24c567',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '5px 10px',
              borderRadius: '5px'
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <button 
          onClick={() => {
            alert('Coupon claimed successfully!');
            onClose();
          }}
          style={{
            background: '#24c567',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            marginBottom: '15px'
          }}>
          Claim now
        </button>

        <div style={{
          fontSize: '12px',
          color: '#999',
          textDecoration: 'underline',
          cursor: 'pointer'
        }}>
          Terms and Conditions
        </div>
      </div>
    </div>
  );
};

export default RewardPopup;