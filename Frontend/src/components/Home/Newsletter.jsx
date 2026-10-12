import React from 'react'
import newsletterimg from '../../assets/newsletter.jpg'
export default function Newsletter() {
    return (
        <section className="newsletter " style={{ backgroundImage: `url(${newsletterimg})` }} id='newsletter'>
            <div className="content max-w-[55rem] my-4 mx-auto text-center">
                <h1 className="heading">subscribe now</h1>
                <p className='text-lg text-[#666]'> Ready to transform your lifestyle? Subscribe to our personalized diet
                    plan today! Discover nutritious meals, expert guidance, and
                    sustainable habits. Let’s achieve your health goals together! 🥗💪"<br />
                    <br />Feel free to customize this message to align with your brand and
                    mission! 😊👍</p>
                <form className='mt-8 bg-white rounded-4xl flex' action="">
                    <input type="email" placeholder="enter your email" className="email w-full text-lg text-[#29d978] py-0 px-6" />
                    <input type="submit" value="subscribe" className="btn mt-0 bg-transparent hover:bg-[#29d978] hover:text-white" />
                </form>
            </div>
        </section>
    )
}
