import React from 'react';
import Img from './group_racoon.jpg';

// const testImage = () => {
//     const title = 'Les petits racoons'
//     return (
//         <div className='lmj-banner'>
//             <img src={Img} alt='Les petits racoons' className='lmj-logo' />
//             <h1 className='lmj-title'>{title}</h1>
//         </div>
//     )
// }


// export default testImage
// };

const testImage = (): JSX.Element => {
    // This function will be triggered when the "container" is clicked
  const divClickedHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    const div = event.currentTarget;
    console.log(
      "Element name: ",
      div.tagName,
      "Width: ",
      div.clientWidth,
      "Height: ",
      div.clientHeight
    );
  };

  // This function will be triggered when the headline is clicked
  const headingClickedHandler = (
    event: React.MouseEvent<HTMLHeadingElement>
  ) => {
    event.stopPropagation();

    const heading = event.currentTarget;
    console.log(
      "Element name: ",
      heading.tagName,
      "Width: ",
      heading.clientWidth,
      "Height: ",
      heading.clientHeight
    );
  };

  // This function will be triggered when the image is clicked
  const imgClickedHandler = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    
    const img = event.currentTarget;
    console.log(
      "Element name: ",
      img.tagName,
      "Width: ",
      img.clientWidth,
      "Height: ",
      img.clientHeight,
      "Pos x and y :",
      event.pageX - img.x,
      event.pageY - img.y
    );
  };
  
  return (
    <>
    <h1 onClick={headingClickedHandler}>Kindacode.com</h1>
    <div onClick={divClickedHandler}>
      <img
        src={Img}
        alt="Kindacode.com"
        onClick={imgClickedHandler}
      />
    </div>
    </>

  );
};
  export default testImage
