import React from 'react';

import img1 from '../../assets/service-1.png';
import img2 from '../../assets/service-2.png';
import img3 from '../../assets/service-3.png';

export default function Services() {
    return (
        <section className="services py-16 bg-gray-100" id="services">
            <h1 className="heading text-4xl font-bold text-center mb-20">Our Services</h1>
            <div className="box-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="box text-center  bg-white shadow-lg rounded-lg">
                    <div className="icon mb-4 w-40 h-40 flex justify-center items-center">
                        <img src={img1} alt="Nutrition Plan Icon" className="w-20 mx-auto" />
                    </div>
                    <div className="content pl-12 pr-12">
                        <h3 className="text-mdl font-semibold text-[#29d978] mb-4">Arranging a Nutrition Plan</h3>
                        <div className="line w-1/4 h-1 bg-[#29d978] mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-700 mb-6">
                            A weight-loss tool emphasizing variety and choice in your meals
                            and how to schedule those choices throughout your day.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>See what you already have.</li>
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Write down recipes to try.</li>
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Think about your time.</li>
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Write down your meals.</li>
                        </ul>
                    </div>
                </div>

                <div className="box text-center sm:mt-20 md:mt-0  bg-white shadow-lg rounded-lg">
                    <div className="icon mb-4 w-40 h-40 flex justify-center items-center">
                        <img src={img2} alt="Exercise Plan Icon" className="w-20 mx-auto" />
                    </div>
                    <div className="content px-12">
                        <h3 className="text-mdl font-semibold text-[#29d978] mb-4">Arranging an Exercise Plan</h3>
                        <div className="line w-1/4 h-1 bg-[#29d978] mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-700 mb-6">
                            Exercise is good for you, but getting started can be tough. We can't help you in excersise but we will help you to eat healthy.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Think about  fitness goals.</li>
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Make a balanced routine.</li>
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Allow time for recovery.</li>
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Put it on paper.</li>
                        </ul>
                    </div>
                </div>

                <div className="box text-center sm:mt-20 md:mt-0 bg-white shadow-lg rounded-lg py-2">
                    <div className="icon mb-4 w-40 h-40 flex justify-center items-center">
                        <img src={img3} alt="Weight Loss Plan Icon" className="w-20 mx-auto" />
                    </div>
                    <div className="content px-12">
                        <h3 className="text-md font-semibold text-[#29d978] mb-4">Arranging a Weight Loss Plan</h3>
                        <div className="line w-1/4 h-1 bg-[#29d978] mx-auto mb-6 rounded-full"></div>
                        <p className="text-gray-700 mb-6">
                            The best way to lose weight is slowly, by making achievable
                            changes to your eating and physical activity habits.
                        </p>
                        <ul className="space-y-2">
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Stimulus and cue control.</li>
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Eliminate liquid calories.</li>
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Keep  food and weight diary.</li>
                            <li className="flex items-center"><i className="fas fa-check text-white bg-[#29d978] p-2 rounded-full mr-1"></i>Eat mindfully.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
