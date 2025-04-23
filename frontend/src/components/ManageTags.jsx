import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PopupMessage from "./utils/popupMessage";

const ManageTags = () => {
  
    const [tags, setTags] = useState([]);
    

    const [color, setColor] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [selectEditTag, setSelectEditTag] = useState(null);


    const handleAddTag = async (e) => {
        e.preventDefault();
        if (!title.trim() || !color.trim()) return; 

        try {
            const response = await axios.post('http://localhost:5000/api/tags/add', {
              title: title,  
              color: color, 
            });
            const newTag = response.data;

            setTitle('');
            setColor('');
            setMessage('Tag added successfully!');

            fetchTags();
            toast.success('Tag Added successfully');
            console.log('Tag added:', newTag);
          } catch (error) {
            const response = error.response;
            const data = response.data;
            
            alert(data.error);
          }
    };
    
    const fetchTags = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/tags');
          setTags(res.data);
        } catch (error) {
          console.error('Error fetching tags:', error);
        }
      };

    const handleDeleteTag = async (id) => {
        try {
            const confirmDelete = window.confirm("Are you sure delete this tag?");
            if (!confirmDelete) return;

            const response = await axios.delete(`http://localhost:5000/api/tags/${id}`);
            console.log(response)
            setMessage('Tag deleted successfully!');

            fetchTags();
        } catch (error) {
            console.error('Error deleting tag:', error);
            alert('An error occurred while deleting the tag. Please try again.');
        }
    }

    const handleEditTag = async () => {
        if (!title.trim() || !color.trim()) return;

        try {
            await axios.put(`http://localhost:5000/api/tags/${selectEditTag.id}`, {
                title,
                color,
            });

            setMessage('Tag updated successfully!');
            setTitle('');
            setColor('');
            setSelectEditTag(null);
            fetchTags();
        } catch (error) {
            console.error('Error updating tag:', error);
            alert('An error occurred while updating the tag. Please try again.');
        }
    }
    
    //set edit tag
    const startEdit = (tag) => {
        setSelectEditTag(tag);
        setTitle(tag.title);
        setColor(tag.color);
    }
          
    useEffect(() => {
        fetchTags();
    },[])

    // useEffect(() => {
    //     if(message){
    //         const timer = setTimeout(() => setMessage(''), 3000);
    //         return (() => clearTimeout(timer));
    //     }
    // },[message])

    
    

  return (
    <div className=" flex justify-center">
        <div className="px-5 p-2 bg-white h-lvh">
            <h2 className="mb-2 text-lg font-semibold">Manage Tags</h2>

            {message && (
             <PopupMessage message={message} type={'type'}/>
            )}

            <div className="flex justify-center mb-5">
                <div className="border rounded-md border-violet-700 p-2 mr-5 w-30 md:w-60">
                    <input type="text" className=" outline-0"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className="mr-5 bg-gray-200 p-1.5 rounded-xl flex justify-center items-center">
                    <input type="color" className="w-7 h-7 outline-0"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}/>
                </div>

                {!selectEditTag ? (
                    <div className="bg-violet-600 p-2 px-3 text-white rounded-md cursor-pointer active:scale-98"
                    onClick={handleAddTag}>
                        <span>Add</span>
                    </div>
                ) : (
                    <>
                    <div className="bg-violet-600 p-2 px-3 text-white rounded-md cursor-pointer active:scale-98 mr-2"
                    onClick={handleEditTag}>
                        <span>Update</span>
                    </div>

                    <div className="bg-gray-600 p-2 px-3 text-white rounded-md cursor-pointer active:scale-98"
                    onClick={() => {
                        setSelectEditTag(null);
                        setTitle('');
                        setColor('');
                    }}>
                        <span>Cancel</span>
                    </div>
                    </>
                )}
                
            </div>

            <div>

                {tags.map((item, index) => (
                    <div key={index} className="bg-gray-200 w-full h-10 rounded-lg flex justify-between px-2 mb-3">
                        <div className="flex items-center justify-center font-semibold">
                            <div className="w-4 h-4 rounded-full mr-2" style={{backgroundColor:`${item.color}`}}></div>
                            <span>{item.title}</span>
                            
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="mr-5 font-semibold cursor-pointer" onClick={() => startEdit(item)}>Edit</div>
                            <div className="font-semibold cursor-pointer active:scale-98" onClick={() => handleDeleteTag(item.id)}>Delete</div>
                        </div>
                    </div>
                ))}
                
            </div>

        </div>
      

      
    </div>
  );
};

export default ManageTags;
