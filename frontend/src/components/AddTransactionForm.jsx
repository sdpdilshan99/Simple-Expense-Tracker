import React, { useState, useEffect } from "react";
import axios from "axios";

const AddTransactionForm = ({menu}) => {
    const [availableTags, setAvailableTags] = useState([]);

    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [message, setMessage] = useState('');
    

    useEffect(() => {
        axios.get("http://localhost:5000/api/tags")
          .then((res) => setAvailableTags(res.data))
          .catch((err) => console.error("Error fetching tags:", err));
      }, []);

    const toggleTag = (tagId) => {
        if (selectedTags.includes(tagId)) {
          setSelectedTags(selectedTags.filter((id) => id !== tagId));
        } else {
          setSelectedTags([...selectedTags, tagId]);
        }
      };
      

    const handleAdd = async (e) => {
        e.preventDefault();

        if (!type || !description || !amount || selectedTags.length === 0) {
            alert("Please fill out all fields and select at least one tag.");
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/transaction/add',{
                type,
                description,
                amount: parseFloat(amount),
                date: new Date().toISOString().split("T")[0],
                tags: selectedTags
            });
    
            setType('');
            setDescription('');
            setAmount('');
            setSelectedTags([]);
            setMessage('Transaction added successfully!');
        } catch (error) {
            console.error("Error adding transaction:", error);
            alert("Failed to add transaction. Please try again.");
        }
    }

    useEffect(() => {
            if(message){
                const timer = setTimeout(() => setMessage(''), 3000);
                return (() => clearTimeout(timer));
            }
        },[message])

  return (
    <div className="container flex justify-center">
    {menu && <div className='fixed bg-gray-900/50 w-full h-full z-0 top-0 -right-1 md:hidden'></div>}
      <div className="md:w-140 w-80 h-140 shadow border border-gray-300 rounded-md p-4 mt-5">
        <h2 className="font-bold ">Add New Transaction</h2>

        {message && (
            <div className="text-green-600 mb-3 font-semibold">
                {message}
            </div>
            )}

        {/* check income expense */}
        <div className="mt-5">
            <h4 className="font-semibold text-md">Transaction Type</h4>

            
            <div className="flex items-center">
                <div className="mr-5 flex items-center">
                    <input type="radio"  className="mr-2 mt-0.5"
                        name="type"
                        value="expense"
                        checked={type === 'expense'}
                        onChange={() => setType('expense')}/>
                    <label htmlFor="expense" className="font-semibold text-sm">Expense</label>
                </div>
                <div className="mr-5 flex items-center">
                    <input type="radio" className="mr-2 mt-0.5"
                        name="type"
                        value="income"
                        checked={type === 'income'}
                        onChange={() => setType('income')}/>
                    <label htmlFor="income" className="font-semibold text-sm">Income</label>
                </div>
            </div>
        </div>

        {/* description */}
        <div className="mt-5">
            <h2 className="text-md font-semibold mb-1">Description</h2>
            <div className="border border-gray-300 rounded-md  h-30 p-1 pl-2 bg-gray-100">
                <textarea type="text" placeholder="What was this transaction for?"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full h-a outline-0 resize-none"/>
            </div>
        </div>

        {/* amount */}
        <div className="mt-5">
            <h2 className="text-md font-semibold mb-1">Amount</h2>
            <div className="border border-gray-300 rounded-md p-1 pl-2 bg-gray-100">
                <input type="number" placeholder="$ 0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-auto outline-0 text-md"/>
            </div>
        </div>

        {/* tags select */}
        <div className="mt-5 w-full">
            <h2 className="text-md font-semibold mb-1">Tags (Select at least one)</h2>
            <div className="flex flex-wrap">
                {availableTags.map((item) => (
                    <div key={item.id} 
                        onClick={() => toggleTag(item.id)}
                        className={`mr-3 px-1 text-[10px] rounded-lg font-semibold mb-2 cursor-pointer`} 
                        style={{
                            border: `2px solid ${item.color}`,
                            color: selectedTags.includes(item.id) ? 'white' : item.color,
                            backgroundColor: selectedTags.includes(item.id) ? item.color : 'transparent',
                          }}>
                        {item.title}
                    </div>
                ))}
            </div>
        </div>

        <div className="flex justify-center mt-10">
            <button className="bg-violet-700 p-2 px-10 text-white rounded-md 
                hover:bg-violet-600 active:scale-98 
                transform transition-transform duration-150"
                onClick={handleAdd}>
                Add Transaction
            </button>
        </div>


      </div>
    </div>
  );
};

export default AddTransactionForm;
