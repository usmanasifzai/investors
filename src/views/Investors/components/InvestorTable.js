import { useState, useEffect } from 'react';
import axios from 'axios';
import InvestorCell from './InvestorCell';

export default function InvestorTable({ setConfirmedAmount }) {
  let API_URL = process.env.REACT_APP_BASE_API_URL;

  const [investors, setInvestors] = useState([]);

  useEffect(()=> {
    if (investors.length) return;

    axios.get(`${API_URL}/investors`)
      .then((res) => {
        setInvestors(res.data.investors);
      })
      .catch((err) => {
        console.error(err);
      })
  },[])

  useEffect(()=> {
    const sum = investors.reduce((prev, invester) => (prev + +invester.allocation), 0);

    setConfirmedAmount(sum);

  },[investors])

  const addNewRow = () => {
    if (investors[investors?.length -1]?.email === '' ) return;

    const emptyObj = {
      id: null,
      email: '',
      name: '',
      allocation: null,
      equity: null,
    };

    setInvestors([...investors, emptyObj]);
  }

  const handleInvesterInfoChange = (newObj, index) => {
    if (index < 0 || index >= investors.length || index === undefined) return;

    let copiedInvestors = [...investors];
    const tmpInvestor = copiedInvestors[index];

    const obj = {
      ...tmpInvestor,
      ...newObj,
    }

    copiedInvestors[index] = obj;

    setInvestors(copiedInvestors);
  }

  const handleAddOrUpdateInvester = (newInvestorObj) => {
    const tmpInvestorIndex = investors.findIndex((investor) => investor.id === newInvestorObj.id);

    let copiedInvestors = [...investors];

    let req;

    if (newInvestorObj.id) {
      req = axios.put(`${API_URL}/investors/${newInvestorObj.id}`, newInvestorObj)
    } else {
      req = axios.post(`${API_URL}/investors`, newInvestorObj)
    }

    req.then((res) => {
        copiedInvestors[tmpInvestorIndex] = res.data.investor;
        setInvestors(copiedInvestors);
      })
      .catch((err) => {
        console.error(err);
      })
  }

  return(
    <>
      <div className='container'>
        <h3>Table</h3>
        <table className='table table-bordered'>
          <thead>
            <tr>
              {
                TableHeaders.map((header) => (<th className="col">{header}</th> ))
              }
            </tr>
          </thead>
          <tbody>
            {
              investors.map((invester, index) => {
                return(
                  <tr key={index}>
                    <InvestorCell index={index} info={{ text: invester.email, type: 'email' }} handleInvesterInfoChange={handleInvesterInfoChange} />
                    <InvestorCell index={index} info={{ text: invester.name, type: 'name' }} handleInvesterInfoChange={handleInvesterInfoChange} />
                    <InvestorCell index={index} info={{ text: invester.allocation, type: 'allocation' }} handleInvesterInfoChange={handleInvesterInfoChange} />
                    <InvestorCell index={index} info={{ text: invester.equity, type: 'equity' }} handleInvesterInfoChange={handleInvesterInfoChange} />
                    <td>
                      <button className='btn text-primary' onClick={handleAddOrUpdateInvester.bind(this, invester)}>
                        <u>{invester.id ? 'Update' : 'Add'}</u>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
            <tr>
              <td colSpan="5">
                <button className='btn text-primary' onClick={addNewRow}><u>Add Email</u></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
};

const TableHeaders = ['Email', 'Investor Name', 'Allocation', 'Equity', 'Actions'];

