import React from 'react';
import BrandPanel from './BrandPanel';
import LoginTemplate from '../components/templates/LoginTemplate';


export default function LoginPage() {
  
  return (
    <LoginTemplate
      leftPanel={<BrandPanel />}
    />
  );
}
