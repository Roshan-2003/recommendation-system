import React from 'react'

export default function Footer() {
    return (
        <section className="footer" id='footer'>
            <div className="box-container grid grid-cols-4 gap-12">
                <div className="box">
                    <h3 className='text-2xl capitalize py-6 text-[#29d978] '>quick links</h3>
                    <a className='text-sm capitalize text-black py-4' href="#home"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>home</a>
                    <a className='text-sm capitalize text-black py-4' href="#about"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>about</a>
                    <a className='text-sm capitalize text-black py-4' href="#services"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>services</a>
                    <a className='text-sm capitalize text-black py-4' href="#diet"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>diet</a>
                    <a className='text-sm capitalize text-black py-4' href="#blog"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>blog</a>
                    <a className='text-sm capitalize text-black py-4' href="#reviews"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>reviews</a>
                </div>

                <div className="box">
                    <h3 className='text-2xl capitalize py-6 text-[#29d978] '>extra links</h3>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>my account</a>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>my order</a>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>my wishlist</a>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>ask questions</a>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>terms of use</a>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fas fa-arrow-right text-[#29d978] pr-2"></i>privacy policy</a>
                </div>

                <div className="box">
                    <h3 className='text-2xl capitalize py-6 text-[#29d978] '>contact info</h3>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fas fa-phone text-[#29d978] pr-2"></i>+123-456-7890</a>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fas fa-phone text-[#29d978] pr-2"></i>+123-765-2568</a>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fas fa-envelope text-[#29d978] pr-2"></i>ashuramajestic@gmail.com</a>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fas fa-map text-[#29d978] pr-2"></i>Ahmedabad,Gujarat</a>
                </div>

                <div className="box">
                    <h3 className='text-2xl capitalize py-6 text-[#29d978] '>follow us</h3>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fab fa-facebook-f text-[#29d978] pr-2"></i>facebook</a>
                    <a className='text-sm capitalize text-black py-4' href="#"> <i className="fab fa-twitter text-[#29d978] pr-2"></i>twitter</a>
                    <a className='text-sm capitalize text-black py-4' href="https://www.instagram.com/bhagat.345/"> <i className="fab fa-instagram text-[#29d978] pr-2"></i>instagram</a>
                    <a className='text-sm capitalize text-black py-4' href="https://www.linkedin.com/in/kharade-vishal-b-466335304/"> <i className="fab fa-linkedin text-[#29d978] pr-2"></i>linkedin</a>
                    <a className='text-sm capitalize text-black py-4' href="https://github.com/AshuraMajestic"> <i className="fab fa-github text-[#29d978] pr-2"></i>github</a>
                </div>

            </div>
            <div className="credit text-center mt-10 p-4 pt-8 text-xl capitalize text-black">created by <span className='text-[#29d978]'>Team Innovative</span> | all rights are reserved!</div>
        </section>
    )
}
