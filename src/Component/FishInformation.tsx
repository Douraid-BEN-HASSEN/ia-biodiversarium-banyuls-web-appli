/**
 * @author Essahbi Zakarya <zakarya.essahbi@imerir.com>
 */
import React, { memo } from 'react';
import _ from 'lodash'; // React

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { FishInfo, FishsInfo } from '../Api/Analyze';
import Skeleton from '@mui/material/Skeleton';
import { Box, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { strToLanguage } from '../i18n/Language';

interface FishInformationListProp {
    itemsData: FishsInfo;
}

const styleModal = {
    position: 'absolute',
    top: '10%',
    bottom: '10%',
    left: '10%',
    right: '10%',
    overflow: 'scroll',
    height: '80%',
    display: 'block',
};

const FishInformationList: React.FC<FishInformationListProp> = (props) => {
    const { itemsData } = props;

    const { t, i18n } = useTranslation();

    const [openModal, setOpenModal] = React.useState(false);
    const [fishInfo, setFishInfo] = React.useState<FishInfo | null>(null);

    const handleOpenModal = (value: FishInfo) => {
        setOpenModal(true);
        setFishInfo(value);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
        setFishInfo(null);
    };

    return (
        <>
            {Object.keys(itemsData).length ? (
                <>
                    <ImageList>
                        <ImageListItem key="Subheader" cols={2}>
                            <ListSubheader component="div">Fish List</ListSubheader>
                        </ImageListItem>
                        {_.map(itemsData, (item, key) => (
                            <ImageListItem key={key} onClick={() => handleOpenModal(item)}>
                                {item.image ? (
                                    <img
                                        src={`${item.image}`}
                                        srcSet={`${item.image}`}
                                        alt={item.name}
                                        loading="lazy"
                                    />
                                ) : (
                                    <Skeleton height={250} />
                                )}

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
                    <Box sx={{ height: 50 }}></Box>
                    <Modal
                        sx={styleModal}
                        open={openModal}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box>
                            <Paper>
                                <Box p={2}>
                                    {fishInfo ? (
                                        <>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                {fishInfo.name}
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                {fishInfo.description[strToLanguage(i18n.language)] ??
                                                    fishInfo.description[strToLanguage('fr')] ??
                                                    Object.values(fishInfo.description)[0] ??
                                                    t('fishInformation.modal.noDescription')}
                                            </Typography>
                                        </>
                                    ) : (
                                        <>{t('fishInformation.modal.noInfo')}</>
                                    )}
                                </Box>
                            </Paper>
                        </Box>
                    </Modal>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default memo(FishInformationList);
