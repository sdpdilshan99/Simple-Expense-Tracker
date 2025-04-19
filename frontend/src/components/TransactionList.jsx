import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, Input, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TransactionList = ({menu}) => {
    const [transactions, setTransactions] = useState([]);
      

    const [type, setType] = useState(0);
    const [max, setMax] = useState(2);

    const [selectedIndex, setSelectedIndex] = useState(null);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(false);
    const [amount,setAmount] = useState("");

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const navigate = useNavigate();

    const handleTypeChange = (e) => {
        setType(e.target.value);
        setFilter(e.target.value > 0);
    }
    const handleMaxChange = (e) => {
        setMax(e.target.value);
        setFilter(e.target.value > 0);
    }
    const hadndleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        setFilter(value.length > 0);
        
    }
    const hadndleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        setFilter(value > 0);
        
    }

    const clearFilters = () => {
        setType(0);
        setMax(2);
        setSearch("");
        setAmount("");
        setFilter(false);
        setCurrentPage(1);

      };

    const filteredTransactions = transactions.filter((item) => {
        const itemDesc = item.description?.toLowerCase() || '';
        const searchText = search.toLowerCase();

        const matchSearch = itemDesc.includes(searchText);

        if (type === 10 && item.type !== "expense") return false;
        if (type === 20 && item.type !== "income") return false;

        const matchAmount = amount === "" || item.amount <= Number(amount);

        return matchSearch && matchAmount;
    })
    .sort((a, b) => {
        if (max === 10) {
            return b.amount - a.amount; 
        } else if (max === 20) {
            return a.amount - b.amount; 
        } else {
            return 0; 
        }
    });

    //pagination func
    const indexOfLastItem = currentPage*itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTransactions.length/itemsPerPage);

    

    useEffect(() => {
        axios.get("http://localhost:5000/api/transaction")
            .then((res) => {
                setTransactions(res.data);
                console.log(res.data)
            })
            .catch((error) => {
                console.error("Error fetching transactions:", error);
              });
    },[])

    

  return (
    <div className="container flex justify-center">
      {menu && <div className='fixed bg-gray-900/50 w-full h-full z-0 top-0 -right-1 md:hidden'></div>}

      <div className=" w-2/3 mt-5">
        <h2 className="font-bold text-xl mb-3">Your Transactions</h2>

        <div className="flex items-center border border-gray-400 rounded-md p-2 group 
        focus-within:border-2 focus-within:border-violet-800 transition-all">
            <ion-icon name="search-outline"></ion-icon>
            <input type="text" 
                placeholder="Search.." 
                className="ml-2 outline-none text-sm w-full"
                value={search}
                onChange={hadndleSearchChange}/>
        </div>

        <div className="block lg:flex mt-4 items-center">
            <div className="mr-0 md:mr-5 mb-2 ">
            <FormControl sx={{ width:{xs:'100%', md:150}}} size="small">
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={type}
                onChange={handleTypeChange}
                sx={{fontSize:14,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#99a1af',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#5b06b7', 
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#5b06b7', 
                    },
                }}
            >
                <MenuItem value={0} sx={{fontSize:14}}>All types</MenuItem>
                <MenuItem value={10} sx={{fontSize:14}}>Expenses only</MenuItem>
                <MenuItem value={20} sx={{fontSize:14}}>Income only</MenuItem>
            </Select>
            </FormControl>
            </div>

            <div className="mb-2">
            <FormControl sx={{ width:{xs:'100%', md:150}}} size="small">
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={max}
                onChange={handleMaxChange}
                sx={{fontSize:14,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#99a1af',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#5b06b7', 
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#5b06b7', 
                    },
                }}
            >
                <MenuItem value={10} sx={{fontSize:14}}>Greater than</MenuItem>
                <MenuItem value={20} sx={{fontSize:14}}>Less than</MenuItem>
            </Select>
            </FormControl>
            </div>

            <div className="ml-0 lg:ml-5 border border-gray-400 rounded-sm  hover:border-violet-800 
            focus-within:border-2 focus-within:border-violet-700 mb-2">
                <input type="text" className="h-7 m-1 outline-0 w-25 text-sm" placeholder="Amount" value={amount} onChange={hadndleAmountChange}/>
            </div>

            {filter && (
                <div
                    className="ml-0 lg:ml-5 mb-2 border border-gray-400 rounded-sm p-1.5 w-full font-semibold flex items-center justify-center cursor-pointer hover:border-violet-800"
                    onClick={clearFilters}
                >
                    <ion-icon name="close-outline"></ion-icon>
                    <span className="ml-2">Clear filters</span>
                </div>
            )}
        </div>

        <hr className=" text-gray-300 mt-2"/>

        <div className="mt-3">
            
            {currentItems.length === 0 && (
            <p className="text-sm text-gray-500 mt-10 text-center">No matching transactions found.</p>
                )}

            {currentItems.map((item, index) => (
                selectedIndex === index ? (
                    <div key={index} onClick={() => setSelectedIndex(null)} 
                    className="border border-gray-300 w-full rounded-sm shadow-md px-2 mb-4">

                        <div className="flex justify-between items-center">

                            <div className="flex flex-col">
                                <h6 className="font-semibold mb-1">{item.description}</h6>
                                <p className="text-gray-600 text-sm">Apr 3, 2025</p>

                                
                            </div>

                            
                            <div className=" flex flex-col items-end">
                                <div className="flex items-center mr-2 ">
                                    <h6 className={`font-semibold mr-2 ${item.type == 'income' ? ('text-green-600') : ('text-red-600')}`}>
                                    {item.type == 'income' ? '+' : '-'}${item.amount}</h6>
                                    <ion-icon name="chevron-down-outline"></ion-icon>
                                    
                                    
                                </div>

                                
                                
                            </div>
                        </div>

                        <div className="flex justify-between mt-2 mb-2">
                            <div className="mt-4 flex">
                                {item.tags.map((tag, i) => (
                                    <div key={i} className=" rounded-lg text-[12px] text-center text-white mr-3 h-5 px-3" 
                                        style={{backgroundColor:`${tag.color}`}}>
                                    {tag.title}
                                    </div>
                                ))}
                            </div>

                            <div className="flex mt-2 mr-10">
                                    <div className="mr-3 p-1 border border-gray-300 rounded-sm w-30 flex justify-center items-center"
                                    onClick={() => navigate('add')}>
                                    <ion-icon name="create-outline"></ion-icon>
                                    <span className="ml-2 text-sm font-semibold">Edit</span>
                                    </div>
                                    <div className="p-1 border border-gray-300 rounded-sm w-30 text-center flex justify-center items-center
                                    text-red-600">
                                    <ion-icon name="trash-outline"></ion-icon>
                                    <span className="ml-2 text-sm font-semibold">Delete</span>
                                    </div>
                                    
                            </div>
                        </div>

                        
                    </div>
                ) : (
                    <div key={index} onClick={() => setSelectedIndex(index)} className="border border-gray-300 w-full h-18 
                    rounded-sm shadow p-1 px-2 flex justify-between items-center mb-4
                    hover:shadow-md hover:scale-101">
                        <div className="flex flex-col">
                            <h6 className="font-semibold mb-1">{item.description}</h6>
                            <p className="text-gray-600 text-sm">Apr 3, 2025</p>
                        </div>

                        <div className="flex items-center mr-2">
                            <h6 className={`font-semibold mr-2 ${item.type == 'income' ? ('text-green-600') : ('text-red-600')}`}>
                                {item.type == 'income' ? '+' : '-'}${item.amount}</h6>
                            <ion-icon name="chevron-down-outline"></ion-icon>
                            
                        </div>
                    </div>
                    
                )
            ))}

            {filteredTransactions.length > itemsPerPage && (
                <div className="flex justify-center mt-5 space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}>
                    Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded ${
                        currentPage === i + 1 ? "bg-violet-700 text-white" : "border-gray-300"
                    }`}
                    >
                    {i + 1}
                    </button>
                ))}

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
                </div>
            )}

            
        </div>

      </div>
      
    </div>
  );
};

export default TransactionList;
