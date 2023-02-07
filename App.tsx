import * as React from 'react';
import './style.css';
import { OrderInput } from './OrderInput';

export default function App() {
  return (
    <div className="text-center">
      <div className="text-white font-bold rounded text-4xl m-4">TAQUERIA MOCHIS</div>
      <OrderInput />
    </div>
  );
}
