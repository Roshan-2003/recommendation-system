import React, { useState, useEffect } from 'react';

import diet1 from '../../assets/diet-1.png';
import diet2 from '../../assets/diet-2.png';
import diet3 from '../../assets/diet-3.png';
import diet4 from '../../assets/diet-4.png';
import dietBlog1 from '../../assets/diet_blog1.jpg';
import dietBlog2 from '../../assets/diet_blog2.jpg';
import dietBlog3 from '../../assets/diet_blog3.jpg';
import dietBlog4 from '../../assets/diet_blog4.jpg';
import dietBlog5 from '../../assets/diet_blog5.jpg';
import dietBlog6 from '../../assets/diet_blog6.jpg';
import { backendConfigurationError, backendUrl } from '../../config/backend';
const Diet = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [filteredFoodItems, setFilteredFoodItems] = useState([]);
    const [user, setUser] = useState(null);
    const [bmr, setBmr] = useState(null);
    const [dailyCalories, setDailyCalories] = useState(null);

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            let userId = auth;
            try {
                const parsed = JSON.parse(auth);
                userId = typeof parsed === 'object' && parsed !== null && parsed._id ? parsed._id : parsed;
            } catch {
                userId = auth;
            }
            if (userId && typeof userId === 'string') {
                userId = userId.replace(/^"(.*)"$/, '$1').trim();
            }
            if (userId) {
                fetchUserData(userId);
            }
        }
    }, []);

    const fetchUserData = async (userId) => {
        try {
            if (!backendUrl) {
                console.error(backendConfigurationError);
                return;
            }
            if (!userId) return;
            const id = typeof userId === 'object' && userId !== null ? (userId._id || userId.userId) : userId;
            const response = await fetch(`${backendUrl}/users/${id}`);
            const data = await response.json();
            if (response.ok) {
                setUser(data); // Set user data in state

                // Constructing the fetch POST request for food items
                const foodItemsUrl = `${backendUrl}/food-items`;
                const foodItemsPayload = {
                    weight: data.weight,
                    height: data.height,
                    age: data.age,
                    gender: data.gender,
                    activityLevel: data.activityLevel
                };

                const foodItemsResponse = await fetch(foodItemsUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(foodItemsPayload)
                });

                if (foodItemsResponse.ok) {
                    const { bmr, dailyCalories, filteredFoodItems } = await foodItemsResponse.json();
                    setBmr(bmr);
                    setDailyCalories(dailyCalories);
                    setFilteredFoodItems(filteredFoodItems);
                } else {
                    console.error('Failed to fetch food items:', await foodItemsResponse.json());
                }
            } else {
                console.error("Failed to fetch user data:", data.error);
                // Handle error fetching user data (e.g., show error message)
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle network errors or other exceptions
        }
    };

    const fetchFoodItems = async () => {
        try {
            if (!backendUrl) {
                console.error(backendConfigurationError);
                return;
            }

            const foodItemsUrl = `${backendUrl}/all-food-item`;
            const response = await fetch(foodItemsUrl);
            if (response.ok) {
                const filteredFoodItems = await response.json();
                setFilteredFoodItems(filteredFoodItems);
            } else {
                console.error('Failed to fetch food items:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };
    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
        fetchFoodItems();
    };

    const filters = [
        { name: 'all', img: diet1 },
        { name: 'breakfast', img: diet2 },
        { name: 'lunch', img: diet3 },
        { name: 'dinner', img: diet4 }
    ];

    const blogImages = [dietBlog1, dietBlog2, dietBlog3, dietBlog4, dietBlog5, dietBlog6];

    return (
        <section className="diet" id="diet">
            <h1 className="heading text-5xl font-sans font-bold mb-8 text-center text-[#29d978]">Diet Plan</h1>
            <ul className="controls  grid grid-cols-4 gap-6 list-none">
                {filters.map(filter => (
                    <li
                        key={filter.name}
                        className={`buttons cursor-pointer px-2 py-3 bg-white mb-3 text-center rounded-2xl ${activeFilter === filter.name ? 'active' : ''}`}
                        onClick={() => handleFilterClick(filter.name)}
                    >
                        <img src={filter.img} className='h-16' alt={filter.name} />
                        <h3 className='p-4 text-2xl text-[#666]'>{filter.name}</h3>
                    </li>
                ))}
            </ul>

            {filteredFoodItems.length > 0 && (
                <div className="food-items image-container grid grid-cols-4 gap-6">
                    {filteredFoodItems.map((item, index) => (
                        <div className="box bg-white rounded-2xl overflow-hidden" key={item._id}>
                            <div className="image h-[25rem] overflow-hidden w-full">
                                <img className='h-full w-full object-cover' src={blogImages[index % blogImages.length]} alt={`Blog Image ${index + 1}`} />
                            </div>
                            <div className="content p-4">
                                <a href={`/food/${item._id}`} className="link text-3xl text-[#29d978]">{item.food_items}</a>
                                <p className='text-lg py-4 text-[#666]'>Calories: {item.Calories}</p>
                                <div className="icon pt-4 flex items-center  justify-between">
                                    <span className='text-sm text-[#666] hover:text-[#29d978] cursor-pointer'><i className="fas fa-clock pr-sm"></i> 11 June, 2023</span>
                                    <span className='text-sm text-[#666] hover:text-[#29d978] cursor-pointer'><i className="fas fa-user pr-sm"></i> by admin</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Diet;
