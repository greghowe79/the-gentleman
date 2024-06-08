import { $, component$ } from '@builder.io/qwik';
import axios from 'axios';

const Shipment = component$(() => {
  const creaSpedizione = $(async () => {
    const response = await axios.post('/api_v1/address');
    console.log('RESPONSE ', response.data);
  });
  return (
    <div>
      <h1>SHIPMENT</h1>
      <button onClick$={() => creaSpedizione()}>CREA SPEDIZIONE</button>
    </div>
  );
});

export default Shipment;
