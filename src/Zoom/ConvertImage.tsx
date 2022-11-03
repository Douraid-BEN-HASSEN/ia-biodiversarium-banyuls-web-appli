import React from 'react';

interface showImageProps {
    imgScreen : any 
}

const ShowImage: React.FC<showImageProps> = React.memo(({
    imgScreen
}) => {

    const title = 'My screenshot'
    console.log(imgScreen)

    return <div className='lmj-banner'>
    <img src={imgScreen} alt='My screenshot' className='lmj-logo'/>
    <h1 className='lmj-titre'>{title}</h1>
</div>
})

export default ShowImage