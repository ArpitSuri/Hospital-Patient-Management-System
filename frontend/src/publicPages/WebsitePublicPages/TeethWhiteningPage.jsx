import React from 'react';
import WhiteningServices from './commonents/WhiteningServices';


const TeethWhiteningPage = () => {
  return (
    <div className="teeth-whitening-page pt-32 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-16 text-gray-900">Teeth Whitening Services</h1>
        <WhiteningServices/>
      </div>
    </div>
  );
};

export default TeethWhiteningPage;