import { useState } from 'react';
import InvestorTable from './components/InvestorTable';
export default function Investors() {
  const [confirmedAmount, setConfirmedAmount] = useState(0);

  return(
    <>
      <div className='container mb-5'>
        <div className='d-flex align-items-center'>
          <h1>Investors</h1>
          <div className='ms-3'>
            <h6>Confirmed: </h6>
            <span className='text-success fw-bold'>${confirmedAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <InvestorTable setConfirmedAmount={setConfirmedAmount}/>
    </>
  )
}
