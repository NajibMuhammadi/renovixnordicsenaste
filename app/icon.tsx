import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1e3a5f',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '25%',
          position: 'relative',
        }}
      >
        {/* Amber accent bar */}
        <div 
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '20%',
            width: '30%',
            height: '10%',
            background: '#f59e0b',
            borderRadius: '2px',
          }}
        />
        {/* White R */}
        <div
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            fontFamily: 'sans-serif',
          }}
        >
          R
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
