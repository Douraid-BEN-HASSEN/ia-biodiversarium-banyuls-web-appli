/**
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */

import React, { memo } from 'react';

import { Toolbar, Box, AppBar, Dialog, Menu, DialogTitle, Button, Link, Input } from '@mui/material';

import { ListItemText, ListItem, List, MenuItem } from '@mui/material';
import { Fab, IconButton } from '@mui/material';

import { CodeToFlag } from './Country';

import { getDocAllFish, test } from '../Api/Analyze';

import { useTranslation } from 'react-i18next';
import { Language, Languages, CodeToLanguage } from '../i18n/Language';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import { AnalyzeResponse } from '../Api/Analyze';
import { AxiosResponse } from 'axios';

import { styled } from '@mui/material/styles';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

const StyledExtendedFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: '20%',
    right: '20%',
    margin: '0 auto',
});

export interface LanguageDialogProps {
    open: boolean;
    selectedValue: Language;
    onClose: (value: Language) => void;
}

const LanguageDialog: React.FC<LanguageDialogProps> = (props) => {
    const { onClose, selectedValue, open } = props;

    const { t } = useTranslation();

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: Language) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{t('menu.languages.choice')}</DialogTitle>
            <List sx={{ pt: 0 }}>
                {Languages.map((language) => (
                    <ListItem onClick={() => handleListItemClick(language)} key={language}>
                        <Button>
                            <Box mr={2}>
                                <CodeToFlag code={language} />
                            </Box>
                            <ListItemText primary={CodeToLanguage[language]} />
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
};

export interface AppBarBottomProps {
    isShoot: boolean;
    screenShotHandler(value: boolean): void;
    isCameraActive: boolean;
    cameraActiveHandler(value: boolean): void;
    handleIsSearch(value: boolean): void;
    handleChangeSearchValue(value: string): void;
    typePrintList: 'list' | 'grid';
    handleChangeTypeOfPrintList(type: 'list' | 'grid'): void;
}

const AppBarBottom: React.FC<AppBarBottomProps> = (Props) => {
    const {
        handleChangeSearchValue,
        isShoot,
        isCameraActive,
        cameraActiveHandler,
        screenShotHandler,
        handleIsSearch,
        typePrintList,
        handleChangeTypeOfPrintList,
    } = Props;

    const { t, i18n } = useTranslation();

    /** hooks menu */
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    /** hooks language dialoge */
    const [dialogLanguageOpen, setDialogLanguageOpen] = React.useState(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState(Languages[0]);
    const [showSearchField, setShowSearchField] = React.useState(false);

    const handleClickDialogLanguageOpen = () => {
        setDialogLanguageOpen(true);
    };

    const handleDialogLanguageClose = (value: Language) => {
        setDialogLanguageOpen(false);
        setSelectedLanguage(value);
        i18n.changeLanguage(value).then();
    };

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                {!showSearchField && (
                    <>
                        {!isCameraActive ? (
                            <StyledExtendedFab
                                variant="extended"
                                color="error"
                                onClick={() => cameraActiveHandler(true)}
                            >
                                {t('appbar.camera.active')}
                            </StyledExtendedFab>
                        ) : (
                            <StyledFab color="success" aria-label="takeScreen">
                                {isShoot ? (
                                    <PlayArrowIcon onClick={() => screenShotHandler(!isShoot)} />
                                ) : (
                                    <PhotoCameraIcon onClick={() => screenShotHandler(!isShoot)} />
                                )}
                            </StyledFab>
                        )}
                    </>
                )}
                <Box sx={{ flexGrow: 1 }} />

                {showSearchField && (
                    <Input
                        autoFocus
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                        }}
                        onChange={(value: any) => {
                            handleChangeSearchValue(value.target.value);
                            handleChangeTypeOfPrintList('list');
                        }}
                        onKeyPress={(key: any) => {
                            if (key.code === 'Enter') {
                                setShowSearchField(true);
                                Props.handleIsSearch(true);
                            }
                        }}
                    />
                )}

                {showSearchField && (
                    <IconButton
                        style={{ color: 'red' }}
                        color="inherit"
                        onClick={() => {
                            handleChangeSearchValue('');
                            setShowSearchField(false);
                            Props.handleIsSearch(false);
                        }}
                    >
                        <CancelIcon />
                    </IconButton>
                )}
                <IconButton
                    color="inherit"
                    onClick={() => {
                        if (typePrintList === 'list') {
                            setShowSearchField(true);
                            handleIsSearch(true);
                        }

                    }}
                >
                    <SearchIcon />
                </IconButton>
                <IconButton
                    color="inherit"
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClickDialogLanguageOpen}>{t('menu.language')}</MenuItem>
                    <LanguageDialog
                        selectedValue={selectedLanguage}
                        open={dialogLanguageOpen}
                        onClose={handleDialogLanguageClose}
                    />
                    <MenuItem>
                        <Link color="inherit" href={'/about'} underline="none">
                            {t('menu.about')}
                        </Link>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            test()
                                .then((r) => console.log(r))
                                .catch((r) => console.log(r));
                        }}
                    >
                        test
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default memo(AppBarBottom);
