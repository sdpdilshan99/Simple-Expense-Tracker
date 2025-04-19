import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = ({menu}) => {
    const [currency, setCurrency] = React.useState('$');

    const navigate = useNavigate();
    
    const [transactions, setTransactions] = useState([]);
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    const balance =  income-expense;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: currency === '$' ? 'USD' :
                    currency === '€' ? 'EUR' :
                    currency === '£' ? 'GBP' :
                    currency === '¥' ? 'JPY' :
                    currency === 'CA$' ? 'CAD' :
                    currency === 'AU$' ? 'AUD' :
                    currency === 'CN¥' ? 'CNY' :
                    currency === '₹' ? 'INR' :
                    'USD', // default fallback
          minimumFractionDigits: 2,
        }).format(amount);
      };
      

  useEffect(() => {
    axios.get("http://localhost:5000/api/transaction")
      .then((res) => {
        const data = res.data;
        setTransactions(data);

        let totalIncome = 0;
        let totalExpense = 0;

        data.forEach(transaction => {
          if (transaction.type === 'income') {
            totalIncome += Number(transaction.amount);
          } else if (transaction.type === 'expense') {
            totalExpense += Number(transaction.amount);
          }
        });

        setIncome(totalIncome);
        setExpense(totalExpense);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className={`container flex flex-col items-center p-5 `}>
        {menu && <div className='fixed bg-gray-900/50 w-full h-full z-0 top-0 -right-1 md:hidden'></div>}
        <div className='flex flex-col items-center mb-10'>
            <h1 className='font-bold md:text-2xl  text-violet-600 text-xl'>CashFlow Tracker</h1> 
            <p className='text-gray-500 md:w-120 w-70 text-center md:text-md text-sm' >Effortlessly track your daily expenses and take control of your financial life</p>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 via-violet-600 to-violet-700 md:w-140 w-70 md:h-30 h-25 rounded-xl shadow-sm
            flex flex-col items-center justify-center">
            <span className='text-white md:text-lg text-md'>Your Balance</span>
            <span className={` md:text-xl text-lg font-bold ${balance<0 ? 'text-red-600' : 'text-green-500'}`}>{balance>0 ? '+' : '-'}{formatCurrency(balance)}</span>
        </div>

        <div className='md:flex block mt-10 md:w-140 w-70'>
            <div className='w-full h-20 mr-4 p-2 pl-3 rounded-md shadow-sm flex flex-col border border-gray-200 mb-3'>
                <span className='text-gray-600'>Income</span>
                <span className=' font-semibold text-green-600'>{formatCurrency(income)}</span>
            </div>

            <div className='w-full h-20 p-2 pl-3 rounded-md shadow-sm flex flex-col border border-gray-200'>
                <span className='text-gray-600'>Expense</span>
                <span className='text-red-600 font-semibold'>{formatCurrency(expense)}</span>
            </div>
        </div>

        <div className='mt-10 md:flex block md:w-140 w-70'>
            <button className='flex items-center justify-center bg-violet-700 rounded-md p-2 text-white shadow-md w-full h-12
            hover:bg-violet-600 active:scale-101 transition-all mb-3' onClick={() => navigate('add')}>
                <ion-icon name="add-circle-outline"></ion-icon>
                <span className="ml-5">Add Transaction</span>
            </button>

            <button className='flex items-center justify-center rounded-md p-2 shadow-sm md:ml-4 w-full h-12 
            hover:bg-gray-50 active:scale-101 transition-all'
            onClick={() => navigate('transactions')}>
                <ion-icon name="stats-chart-outline"></ion-icon>
                <span className="ml-5">View Transactions</span>
            </button>
        </div>

        <div className='mt-10  md:w-140 w-70 h-30 p-3 shadow-sm rounded-md border border-gray-200'>
            <span className='font-semibold'>Currency Settings</span>

            <div className='mt-3'>
            <Box sx={{ minWidth: 120, height:10, borderColor:'red'}} >
                <FormControl fullWidth sx={{
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7008e7', 
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                    color: '#7008e7', 
                    },
                }}>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={currency}
                    onChange={handleChange}
                    >
                    <MenuItem value={'$'}>USD - US Dollar ($)</MenuItem>
                    <MenuItem value={'€'}>EUR - Euro (€)</MenuItem>
                    <MenuItem value={'£'}>GBP - British Pound (£)</MenuItem>
                    <MenuItem value={'¥'}>JPY - Japanese Yen (¥)</MenuItem>
                    <MenuItem value={'CA$'}>CAD - Canadian Dollar (C$)</MenuItem>
                    <MenuItem value={'AU$'}>AUD - Australian Dollar (A$)</MenuItem>
                    <MenuItem value={'CN¥'}>CNY - Chinese Yuan (¥)</MenuItem>
                    <MenuItem value={'₹'}>INR - Indian Rupee (₹)</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            </div>
        </div>
    </div>
  );
};

export default HomePage;
