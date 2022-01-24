import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import DropDownTmpl from '../../../shared/components/DropDown/DropDown';
import Table from '../../../shared/components/Table/Table';

import dropdownIcon from "../../../shared/assets/images/dropdown.svg";
import backIcon from "../../../shared/assets/images/back-icon.svg";


const CustomTooltip = ({ active, payload, label }) => {
	if (active) {
		return (
			<div className="custom-tooltip">
        <div className="arrow-up"/>
				<p className="label">{label}</p>
				<p className="intro">{payload[0].value}</p>
			</div>
		);
	}

	return null;
};

const CreditScoreGain = () => {
  const itemsInfo = [
    {
      id: 1,
      name: 'View 1',
    },
    {
      id: 2,
      name: 'View 2',
    },
    {
      id: 3,
      name: 'View 3',
    },
    {
      id: 4,
      name: 'View 4',
    },
    {
      id: 5,
      name: 'View 5',
    }
  ];
  
  const data = [
    { name: '1/20', uv: 550, pv: 700 },
    { name: '2/20', uv: 600, pv: 725 },
    { name: '3/20', uv: 650, pv: 730 },
    { name: '4/20', uv: 700, pv: 730 },
    { name: '5/20', uv: 750, pv: 750 },
    { name: '6/20', uv: 800, pv: 750 },
    { name: '7/20', uv: 850, pv: 820 },
    { name: '8/20', uv: 900, pv: 850 },
  ];

  return (
    <div className="track-progress">
      <h1>Your Credit Score Gains</h1>
      <DropDownTmpl
        items={itemsInfo}
        size="wd-75 freedom"
        textInfo="Chase Freedom ••••1234"
        getSelectedCategory={(index) => (index)}
      />
      <ResponsiveContainer width={366} height={300}>
        <LineChart
          width={500}
          height={200}
          data={data}
          margin={{
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis 
            dataKey="name"
            axisLine={false}
            tickLine={false}
            dy={10}
            dx={10}
          />
          <YAxis
            dx={-10}
            type="category"
            dataKey="uv"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />}/>
          <Line connectNulls type="monotone" dataKey="pv" stroke="#60034C" fill="#fff" r={8} strokeWidth={3}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const CreditProfile = ({setPayments}) => {
  const tableTitleInfo = [
    "Date of Payment", "Amount Paid Off", "Utilization at Payment", "Credit Card"
  ];

  const tableRowInfo = [
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
  ];

  return (
    <div className="track-progress">
      <h1>Your Credit Profile</h1>
      <div className="profile-layout m-t-20">
        <div>
          <p>Total # of Cards</p>
          <p>4</p>
        </div>
        <div>
          <p>Total Balance</p>
          <p>$550.54</p>
        </div>
      </div>
      <div className="profile-layout m-t-12">
        <div>
          <p>Total Credit Line</p>
          <p>$2,500.54</p>
        </div>
        <div>
          <p>Average Utilization</p>
          <p>12%</p>
        </div>
      </div>
      <Table
        tableTitle={tableTitleInfo}
        tableRow={tableRowInfo}
      />
      <div 
        className="view-more"
        onClick={() => setPayments()}
      >
        View More Payments
      </div>
    </div>
  )
}

const Payments = ({setCreditProfile}) => {
  const tableTitleInfo = [
    "Date of Payment", "Amount Paid Off", "Utilization at Payment", "Credit Card"
  ]

  const tableRowInfo = [
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
    {
      dateInfo: "9/10/20",
      price: 50.34,
      percent: 4,
      cardInfo: "DSCVR 1456"
    },
  ];
  
  return (
    <div className="track-progress">
      <Table
        className="payments-details"
        tableTitle={tableTitleInfo}
        tableRow={tableRowInfo}
      />
      <div className="total-paid">
        <p>Totla Paid:</p>
        <span>$1,234.56</span>
      </div>
      <img 
        src={backIcon}
        onClick={() => setCreditProfile()}
        alt="back icon"
      />
    </div>
  )
}

const TrackProgress = () => {
 const [ viewMore, setViewMore ] = React.useState(1);
  return (
    <div className="flex-row-space m-t-30">
      <CreditScoreGain />
      { viewMore == 1 &&
        <CreditProfile setPayments={() => setViewMore(2)}/>
      }
      { viewMore == 2 &&
        <Payments setCreditProfile={() => setViewMore(1)}/>
      }
    </div>
  )
}

export default TrackProgress;