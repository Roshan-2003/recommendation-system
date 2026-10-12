import React from 'react';
import aboutimg from '../../assets/about.png';

export default function About() {
    return (
        <section className="about py-16" id="about">
            <h1 className="heading text-5xl font-sans font-bold mb-8 text-center text-[#29d978]">About Us</h1>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 py-4">
                    <div className="content flex-1 ">
                        <h3 className="text-4xl text-black font-bold uppercase mb-4">My mission is to give you a guideline for your health.</h3>
                        <p className="text-lg text-gray-700 py-8 leading-8">
                            • Eat a balanced diet low in fat and high in fiber to guard against cancer and heart disease. <br />
                            • Eat dairy products and other calcium-rich foods to guard against osteoporosis. <br />
                            • Do aerobic exercise for at least 30 minutes a day three to four times a week. <br />
                            • Do not smoke <br />
                            • Limit your exposure to the sun <br />
                            • Stay up-to-date on immunizations and vaccines
                        </p>
                        <a href="/" className="btn">read more</a>
                    </div>
                </div>
                <div className="w-full md:w-1/2 text-center py-4">
                    <div className="image flex-1 ">
                        <img src={aboutimg} alt="About us" className="w-full" />
                    </div>
                </div>
            </div>

        </section>

    );
}
