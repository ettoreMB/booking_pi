import GoogleMapReact from 'google-map-react';
import { MapPinLine } from '@phosphor-icons/react';
import Loading from '@/app/loading';
import { Suspense } from 'react';

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627
  },
  zoom: 18
};


const Marker = ({ text }) => <div className='w-5 h-5'>
    <MapPinLine size={32} color="#1DBEB4" weight="fill" />
  {text}</div>;

export default function ProductMap() {

  return (
    <div className="w-full h-96">
    <Suspense fallback={<Loading />}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          text="My Marker"
        />
      </GoogleMapReact>
      </Suspense>
    </div>
  )
}

