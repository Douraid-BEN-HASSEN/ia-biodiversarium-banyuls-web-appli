import React from 'react';
import Img from './group_racoon.jpg';
import Box from '@mui/material/Box';

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

    // This function will be triggered when the description is clicked
    const descrpitionClickedHandler = (
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
        const height = img.height / 10;
        const width = img.width / 10;
        // event.pageX - img.x,
        // event.pageY - img.y

        
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
        <Box sx={{ display: 'flex' } }>
                <img
                    src={Img}
                    alt="Kindacode.com"
                    onClick={imgClickedHandler}
                    object-fit='fill'
                />
        </Box>

    );
};
export default testImage
