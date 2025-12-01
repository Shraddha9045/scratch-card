import React from 'react';

interface OrderTrackingPageProps {
  onScratchClick: () => void;
}

const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ onScratchClick }) => {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Mobile Frame */}
      <div style={{
        width: '375px',
        height: '667px',
        background: 'white',
        borderRadius: '30px',
        padding: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <span style={{ fontSize: '20px', marginRight: '15px' }}>←</span>
          <span style={{ fontSize: '18px', fontWeight: '500' }}>Track Order</span>
        </div>

        {/* Order Status */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>📦</div>
          <div style={{
            width: '120px',
            height: '120px',
            border: '4px solid #24c567',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold'
            }}>
              5 mins
            </div>
          </div>
          <div style={{ color: '#666' }}>Your order is being packed</div>
        </div>

        {/* Scratch Button */}
        <button
          onClick={onScratchClick}
          style={{
            width: '100%',
            background: '#24c567',
            color: 'white',
            border: 'none',
            padding: '15px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          🎁 Scratch & Win
        </button>

        {/* Order Summary */}
        <div style={{
          background: '#f8f9fa',
          borderRadius: '10px',
          padding: '20px'
        }}>
          <h3 style={{ marginBottom: '15px' }}>Order Summary</h3>
          <div style={{ color: '#666', fontSize: '14px' }}>
            <div style={{ marginBottom: '10px' }}>Items: Groceries & More</div>
            <div style={{ marginBottom: '10px' }}>Address: Home</div>
            <div style={{ fontWeight: 'bold', color: '#000' }}>Total: ₹1,299</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;