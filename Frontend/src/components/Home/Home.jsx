import React from 'react'
import Nav from './Nav'
import About from './About'
import Services from './Services'
import Diet from './Diet'
import Reviews from './Reviews'
import Newsletter from './Newsletter'
import Footer from './Footer'
import bg from '../../assets/home.jpg'

export default function Home() {
    return (
        <>
            <div>
                <Nav />
            </div>
            <section className="home min-h-screen flex items-center justify-center bg-cover bg-fixed mt-24" style={{ backgroundImage: `url(${bg})` }} id="home">
                <div className="content max-w-3xl text-center">
                    <h3 className="text-5xl uppercase text-white pb-14">welcome to the place full of healthy food</h3>
                    <a href="/" className="btn">Read more</a>
                </div>
            </section>
            <About />
            <Services />
            <Diet />
            <Reviews />
            <Newsletter />
            <Footer />
        </>
    )
}
