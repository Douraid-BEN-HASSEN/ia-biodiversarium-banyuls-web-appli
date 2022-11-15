/**
 * @author Douraïd BEN HASSEN <douraid.benhassen@gmail.com>
 */
import React, { memo } from 'react';
import { useState } from 'react';
import _ from 'lodash' // React

import Modal from '@mui/material/Modal';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { FishsInfo } from '../Api/Analyze';


interface FishInformationListProp {
    itemsData: FishsInfo
}

const FishInformationList: React.FC<FishInformationListProp> = (props) => {

    const { itemsData } = props;

    itemsData["fr"].description;

    

    return (
        <>
            {
                itemsData.length ? (
                    <ImageList>
                        <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader component="div">Fish List</ListSubheader>
                        </ImageListItem>
                        {_.map(itemsData, (item, key) => (
                            <ImageListItem key={key}>
                                <img
                                    src={`${item.image}`}
                                    srcSet={`${item.image}`}
                                    alt={item.name}
                                    loading="lazy"
                                    onClick={() => console.log("ok")}

                                />
                                <ImageListItemBar
                                    title={item.name}
                                    subtitle={item.s_name}
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`info about ${item.name}`}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                )
                    : (<></>)
                }
        </>

    );
};

export default FishInformationList;