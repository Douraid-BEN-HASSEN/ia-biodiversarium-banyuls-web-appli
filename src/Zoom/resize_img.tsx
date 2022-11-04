import React from 'react';
import Img from '../assets/group_racoon.jpg';

const testImage = () => {
    const title = 'Les petits racoons'
    return (
        <div className='lmj-banner'>
            <img src={Img} alt='Les petits racoons' className='lmj-logo' />
            <h1 className='lmj-title'>{title}</h1>
        </div>
    )
}

export default testImage