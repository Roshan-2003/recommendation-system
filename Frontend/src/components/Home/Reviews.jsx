import React from 'react'
import img1 from '../../assets/pic-1.png'
import img2 from '../../assets/pic-2.png'
import img3 from '../../assets/pic-3.png'
import img4 from '../../assets/pic-4.png'
import img5 from '../../assets/pic-5.png'
import img6 from '../../assets/pic-6.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

export default function Reviews() {
    return (
        <section className="reviews" id="review">
            <h1 className="heading">client's reviews</h1>
            <Swiper
                className="review-slider"
                loop={true}
                grabCursor={true}
                spaceBetween={20}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                }}>
                <SwiperSlide className='slide relative'>
                    <p className='p-4 text-md italic bg-[#f0fff7] text-black rounded-3xl z-0 relative mt-12' >
                        Great if you enjoy not doing all the thinking. Helps me plan my
                        food and set reminders which helps me tackle my eating disorder.
                        There's no vegan option which is disappointing, but I just write
                        my vegan alternative in the notes. The basic app is more than good
                        enough and I don't find the ads too annoying. There are extras you
                        can add to the app if you want to pimp it out a bit more.</p>
                    <div className="user flex items-center gap-4 mt-10">
                        <img src={img2} alt="" className='h-28 w-28 rounded-full' />
                        <div className="info">
                            <h3 className='text-xl text-black font-bold'>Sarah B.</h3>
                            <span className='text-[#29d978] text-xl'>client</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='slide relative'>

                    <p className='p-4 text-md italic bg-[#f0fff7] text-black rounded-3xl z-0 relative mt-12 pb-10'>
                        Great if you enjoy not doing all the thinking. Helps me plan my
                        food and set reminders which helps me tackle my eating disorder.
                        There's no vegan option which is disappointing, but I just write
                        my vegan alternative in the notes. The basic app is more than good
                        enough and I don't find the ads too annoying. There are extras you
                        can add to the app if you want to pimp it out a bit more.</p>
                    <div className="user flex items-center gap-4 mt-10">
                        <img src={img1} alt="" className='h-28 w-28 rounded-full' />
                        <div className="info">
                            <h3 className='text-xl text-black font-bold'>John D.</h3>
                            <span className='text-[#29d978] text-xl'>client</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='slide relative'>

                    <p className='p-4 text-md italic bg-[#f0fff7] text-black rounded-3xl z-0 relative mt-12 pb-10'>  Great website... Offers so many things for free... Lots if similar
                        app will only provide a free trial... Or just some free feature,
                        and you have ti pay for the rest, even if they are marketed as
                        free... This app is thebbest free app i ever tried... Or at least
                        the most complete one, complete meal plans, shopping lists,
                        exercise.... The only thing i can suggest is adding a notification
                        sistem....</p>
                    <div className="user flex items-center gap-4 mt-10">
                        <img src={img3} alt="" className='h-28 w-28 rounded-full' />
                        <div className="info">
                            <h3 className='text-xl text-black font-bold'>Emily S.</h3>
                            <span className='text-[#29d978] text-xl'>client</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='slide relative'>

                    <p className='p-4 text-md italic bg-[#f0fff7] text-black rounded-3xl z-0 relative mt-12 pb-10'> Great if you enjoy not doing all the thinking. Helps me plan my
                        food and set reminders which helps me tackle my eating disorder.
                        There's no vegan option which is disappointing, but I just write
                        my vegan alternative in the notes. The basic app is more than good
                        enough and I don't find the ads too annoying. There are extras you
                        can add to the app if you want to pimp it out a bit more</p>
                    <div className="user flex items-center gap-4 mt-10">
                        <img src={img4} alt="" className='h-28 w-28 rounded-full' />
                        <div className="info">
                            <h3 className='text-xl text-black font-bold'>Maichel R.</h3>
                            <span className='text-[#29d978] text-xl'>client</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='slide relative'>

                    <p className='p-4 text-md italic bg-[#f0fff7] text-black rounded-3xl z-0 relative mt-12 pb-10'> Great website... Offers so many things for free... Lots if similar
                        app will only provide a free trial... Or just some free feature,
                        and you have ti pay for the rest, even if they are marketed as
                        free... This app is thebbest free app i ever tried... Or at least
                        the most complete one, complete meal plans, shopping lists,
                        exercise.... The only thing i can suggest is adding a notification
                        sistem....</p>
                    <div className="user flex items-center gap-4 mt-10">
                        <img src={img5} alt="" className='h-28 w-28 rounded-full' />
                        <div className="info">
                            <h3 className='text-xl text-black font-bold'>john deo</h3>
                            <span className='text-[#29d978] text-xl'>client</span>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='slide relative'>

                    <p className='p-4 text-md italic bg-[#f0fff7] text-black rounded-3xl z-0 relative mt-12 pb-10'>  Great if you enjoy not doing all the thinking. Helps me plan my
                        food and set reminders which helps me tackle my eating disorder.
                        There's no vegan option which is disappointing, but I just write
                        my vegan alternative in the notes. The basic app is more than good
                        enough and I don't find the ads too annoying. There are extras you
                        can add to the app if you want to pimp it out a bit more.</p>
                    <div className="user flex items-center gap-4 mt-10">
                        <img src={img6} alt="" className='h-28 w-28 rounded-full' />
                        <div className="info">
                            <h3 className='text-xl text-black font-bold'>Alexei deo</h3>
                            <span className='text-[#29d978] text-xl'>client</span>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section >
    )
}
