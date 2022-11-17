/* eslint-disable max-len */
/**
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */

import React, { useState, memo, useEffect } from 'react';

import Camera from './Camera';
import { Grid, List, ListItem, ListItemText, Paper } from '@mui/material';
import FishInformation from './FishInformation';
import AppBarBottom from './AppBarBottom';
import { AnalyzedData, AnalyzeResponse, getDocAllFish } from '../Api/Analyze';
import { AxiosResponse } from 'axios';

type langObject = {
    en: string;
    fr: string;
};

type fishDescription = {
    family: string;
    id: number;
    image: string;
    name: string;
    s_name: string;
    type: string;
    description: langObject;
};

const defaultDatas = {
    data: [
        {
            description: {
                en: null,
                fr: "C'est une gorgone d'un blanc assez pur, sur lequel se d\u00e9tachent (quand l'animal est vivant et non r\u00e9tract\u00e9) des polypes bruns. Les rameaux sont tr\u00e8s souples, gr\u00eales, et peuvent \u00eatre assez longs ; peu ramifi\u00e9s (ils le sont surtout \u00e0 la base), ils sont souvent port\u00e9s dress\u00e9s \u00e0 la verticale, mais peuvent aussi s'adapter au relief ou au courant.",
            },
            family: 'Gorgoniidae/ Gorgonid\u00e9s',
            id: 1,
            image: null,
            name: 'Gorgone blanche',
            s_name: 'Eunicella spp',
            type: 'fixed',
        },
        {
            description: {
                en: null,
                fr: 'Les gorgones jaunes sont des animaux coloniaux qui \u00e9difient un squelette souple en forme d\u2019arbuste. Les polypes contractiles poss\u00e8dent huit tentacules. La couleur de la colonie comme celle des polypes est jaune-orang\u00e9. Les ramifications de la gorgone sont dispos\u00e9es sur un plan perpendiculaire aux courants dominants qui lui permettent de capturer sa nourriture. Sa taille maximale est d\u2019une cinquantaine de centim\u00e8tres. On la trouve en M\u00e9diterran\u00e9e et en Atlantique, au nord du golfe de Gascogne. Elle s\u2019\u00e9panouit sur les parois verticales et les surplombs rocheux ombrag\u00e9s, de 5 \u00e0 100 m de profondeur.',
            },
            family: 'Gorgoniidae/ Gorgonid\u00e9s',
            id: 2,
            image: null,
            name: 'Gorgone jaune',
            s_name: 'Eunicella cavolini',
            type: 'fixed',
        },
        {
            description: {
                en: null,
                fr: "Cette \u00e9ponge se rencontre sous forme d'arbuste ou de large \u00e9ventail pouvant atteindre 60 cm de haut, voire plus (1 m !). Elle est compos\u00e9e d'axes cylindriques divis\u00e9s, longs et pas forc\u00e9ment tr\u00e8s nombreux, sur lesquels se r\u00e9partissent de tr\u00e8s petits oscules en forme d'ombilic r\u00e9guli\u00e8rement r\u00e9partis en cercle ou en \u00e9toile. La surface est l\u00e9g\u00e8rement rugueuse et d\u00e9pourvue de bosses. Sa couleur se d\u00e9cline du jaune p\u00e2le \u00e0 l'orang\u00e9 soutenu, parfois m\u00eame presque rouge. La forme g\u00e9n\u00e9rale de cet animal est variable et d\u00e9pend de l'agitation de l'eau et des courants.",
            },
            family: 'Axinellidae/ Axinellid\u00e9s',
            id: 3,
            image: null,
            name: 'Axinelle',
            s_name: 'Axinella polypoides',
            type: 'fixed',
        },
        {
            description: {
                en: null,
                fr: "Le sar \u00e0 t\u00eate noire adulte a g\u00e9n\u00e9ralement une longueur qui se situe entre 15 et 30 cm. Les plus gros peuvent atteindre 45 cm. Son corps est ovale et comprim\u00e9 lat\u00e9ralement. Il est de coloration argent\u00e9e.\nIl est marqu\u00e9 par deux bandes noires : l'une \u00e0 l'arri\u00e8re de la t\u00eate qui descend jusqu'\u00e0 mi flanc, l'autre recouvre le p\u00e9doncule caudal jusqu'\u00e0 la base de l'arri\u00e8re de la nageoire dorsale (cf. photos). L'intensit\u00e9 de ces bandes est variable selon le biotope et l'humeur du poisson.\nIl poss\u00e8de une quinzaine de rayures jaunes horizontales sur le corps. Les nageoires pelviennes sont noires.\nLa t\u00eate est plut\u00f4t pointue, avec une petite bouche.\n\n",
            },
            family: 'Sparidae/ Sparid\u00e9s',
            id: 4,
            image: null,
            name: 'Sar \u00e0 t\u00eate noire',
            s_name: 'Diplodus vulgaris',
            type: 'moving',
        },
        {
            description: {
                en: null,
                fr: "Son corps est ovale et massif, couvert de petites \u00e9cailles. La t\u00eate est \u00e9paisse et porte des yeux pro\u00e9minents, entour\u00e9s de taches claires. Ce poisson porte une nageoire dorsale unique, et a une queue arrondie \u00e0 bordure blanche. Les nageoires pectorales et anale s'assombrissent distalement. Cette esp\u00e8ce peut atteindre 150 cm pour 100 kg. Son esp\u00e9rance de vie moyenne est de 50 ans.",
            },
            family: 'Serranidae/ Serranid\u00e9s',
            id: 5,
            image: null,
            name: 'M\u00e9rou brun',
            s_name: 'Epinephelus marginatus',
            type: 'moving',
        },
        {
            description: {
                en: null,
                fr: "Le corps de la pastenague est aplati, en forme de losange, pointu \u00e0 l'avant, avec de grandes nageoires pectorales : il est aussi large que long. La longueur totale de cette raie est g\u00e9n\u00e9ralement sup\u00e9rieure \u00e0 1 m, pour un poids de 15 \u00e0 20 kg. La longueur maximale connue est de 2,50 m. La queue, repr\u00e9sentant 60% de la longueur totale, a une allure de fouet et, \u00e0 un tiers de sa base, elle poss\u00e8de une \u00e9pine dentel\u00e9e, reli\u00e9e \u00e0 des glandes venimeuses sous la peau. La face dorsale est de couleur gris bleu\u00e2tre ou rouss\u00e2tre, avec parfois des taches blanches. Ce dos est lisse, sans tubercule. La face ventrale est claire. La pastenague n'a pas de nageoire dorsale, ni de nageoire caudale et ses nageoires pelviennes sont tr\u00e8s r\u00e9duites.\nLes yeux sont situ\u00e9s sur la face dorsale alors que la bouche, les narines et les fentes branchiales (cinq fentes de chaque c\u00f4t\u00e9) sont sur la face ventrale. Les yeux sont saillants ce qui lui donne un champ de vision tr\u00e8s large. A c\u00f4t\u00e9 des yeux, une valve inhalante, appel\u00e9e spiracle, am\u00e8ne l'eau dans les branchies. La bouche est situ\u00e9e assez en retrait. Les dents sont nombreuses et petites, pointues chez les m\u00e2les, en forme de molaire chez les femelles.\nLa queue agit comme un simple gouvernail et ne sert pas au d\u00e9placement. Ce sont les grandes nageoires pectorales qui s'en chargent, par battement. Ces nageoires servent aussi \u00e0 l'enfouissement dans le sable.",
            },
            family: 'Dasyatidae/ Dasyatid\u00e9s',
            id: 6,
            image: null,
            name: 'Raie pastenague',
            s_name: 'Dasyatis pastinaca',
            type: 'moving',
        },
        {
            description: {
                en: null,
                fr: "Le sar tambour est un poisson de 10 \u00e0 40 cm de longueur commune, pouvant atteindre 55 cm. Comme tous les Sparid\u00e9s, il ne poss\u00e8de qu'une nageoire dorsale. Le corps est ovale, \u00e9lev\u00e9 et comprim\u00e9 lat\u00e9ralement. Les l\u00e8vres sont \u00e9paisses sur une bouche l\u00e9g\u00e8rement protractile. La denture comporte 10 \u00e0 12 incisives sur la m\u00e2choire sup\u00e9rieure et 8 incisives sur la m\u00e2choire inf\u00e9rieure et plusieurs rang\u00e9es de molaires. Le museau est de ce fait assez pointu (sans atteindre la forme de celui de Diplodus puntazzo).\n\nLa coloration dominante est gris argent\u00e9, avec des reflets dor\u00e9s, et un bandeau sombre sur l'espace inter orbitaire et le museau. Le sar tambour se caract\u00e9rise par 5 larges bandes verticales plus ou moins sombres, la premi\u00e8re \u00e9tant en avant de la nageoire dorsale, la derni\u00e8re sur le p\u00e9doncule caudal. Une tache sombre se trouve sur l'arri\u00e8re de la base des nageoires pectorales. Les nageoires pelviennes sont g\u00e9n\u00e9ralement sombres.\nEn p\u00e9riode de reproduction, une tache jaune appara\u00eet sous les yeux.\n\nIl est possible de rencontrer des sars tambours tr\u00e8s p\u00e2les, cela peut \u00eatre d\u00fb \u00e0 l'\u00e9tat de stress du poisson mais aussi \u00e0 l'environnement. Plus l'environnement est clair, plus le poisson aura tendance \u00e0 \u00eatre clair.",
            },
            family: 'Sparidae/ Sparid\u00e9s',
            id: 7,
            image: null,
            name: 'Sar tambour',
            s_name: 'Diplodus cervinus',
            type: 'moving',
        },
        {
            description: {
                en: null,
                fr: 'Le corps est \u00e9lanc\u00e9, long et cylindrique. La t\u00eate et la base des nageoires dorsale et anale sont nues, sans \u00e9caille. Sur le reste du corps, les \u00e9cailles sont petites et tr\u00e8s adh\u00e9rentes. Le corps est recouvert d\u2019un mucus \u00e9pais. Le dimorphisme sexuel est tr\u00e8s marqu\u00e9 : la femelle est brune sur le dos avec une bande longitudinale blanche sur le flanc et le ventre est jaune ros\u00e9. La partie \u00e9pineuse de la dorsale est de hauteur uniforme. Le m\u00e2le arbore un dos vert ou bleu et une bande longitudinale orang\u00e9e en zigzag sur les flancs, marqu\u00e9s d\u2019une large tache noire. Les premiers rayons de la nageoire dorsale sont allong\u00e9s et marqu\u00e9s de rouge vif ou de noir. La taille maximale est de 25 cm.',
            },
            family: 'Labridae/ Labrid\u00e9s',
            id: 8,
            image: null,
            name: 'Girelle royal',
            s_name: 'Coris julis',
            type: 'moving',
        },
        {
            description: {
                en: null,
                fr: "Le corb commun est caract\u00e9ris\u00e9 par un corps haut, un dos fortement incurv\u00e9 et un ventre plat.\nSa bouche est petite, basse et presque horizontale. La m\u00e2choire inf\u00e9rieure (menton) sans barbillon (contrairement \u00e0 l'ombrine, son proche parent) ne d\u00e9passe jamais la m\u00e2choire sup\u00e9rieure. De petites dents dispos\u00e9es en larges bandes sont pr\u00e9sentes aux deux m\u00e2choires.\nLe pr\u00e9opercule est lisse et son angle pr\u00e9sente souvent plusieurs \u00e9pines faibles.\nLes deux nageoires dorsales jaun\u00e2tres sont bien d\u00e9velopp\u00e9es, la premi\u00e8re plus \u00e9lev\u00e9e a 10/11 \u00e9pines rigides alors que la seconde n'en a qu'une suivie de 23/26 rayons mous.\nLa ligne lat\u00e9rale se prolonge jusqu'\u00e0 l'extr\u00e9mit\u00e9 post\u00e9rieure de la caudale qui est habituellement tronqu\u00e9e chez l'adulte et pointue chez les juv\u00e9niles. Les juv\u00e9niles poss\u00e8dent de grandes nageoires par rapport au corps.\nLa coloration uniform\u00e9ment brun fonc\u00e9 (bronze) du corps a des reflets m\u00e9talliques ou dor\u00e9s. Les nageoires pelviennes et l'anale sont noir de jais, bord\u00e9es de blanc en avant. La partie inf\u00e9rieure de la caudale et la partie sup\u00e9rieure de la 2e dorsale sont bord\u00e9es de noir.\nLa croissance assez rapide les 2-3 premi\u00e8res ann\u00e9es est ensuite tr\u00e8s lente. La taille maximale est de 50 \u00e0 55 cm (exceptionnellement 70 \u00e0 75 cm). La dur\u00e9e de vie maximale connue est de 31 ans (d\u00e9termin\u00e9e par otolithom\u00e9trie, c'est-\u00e0-dire le comptage des stries de croissance des otholites).",
            },
            family: 'Scianenidae/ Scianid\u00e9s',
            id: 9,
            image: null,
            name: 'Corb',
            s_name: 'Sciaena umbra',
            type: 'moving',
        },
    ],
} as any;

const Home: React.FC = () => {
    const [isTakeScreenShot, setIsTakeScreenShot] = useState(false);

    const takeScreenShotHandler = (value: boolean): void => {
        setIsTakeScreenShot(value);
    };

    const [isCameraActive, setIsCameraActive] = useState(false);

    const cameraActiveHandler = (value: boolean): void => {
        setIsCameraActive(value);
    };

    const [itemsData, setItemsData] = useState<AnalyzedData | null>(null);

    const itemsDataHandler = (value: AnalyzedData) => {
        setItemsData(value);
    };

    const [valueSearchField, setValueSearchField] = useState('');

    const [showSearchList, setShowSearchList] = useState(false);

    const [typePrintListFish, setPrintListFish] = useState<'list' | 'grid'>('list');

    const [speciesDoc, setSpeciesDoc] = useState<any>(defaultDatas.data);

    useEffect(() => {
        getDocAllFish()
            .then((r: AxiosResponse<AnalyzeResponse>) => {
                console.log(r);
                setSpeciesDoc(r.data);
            })
            .catch(() => {
                setSpeciesDoc(defaultDatas.data);
                console.log('error');
            });
    }, []);

    return (
        <>
            <Paper>
                <Camera
                    isShoot={isTakeScreenShot}
                    screenShotHandler={takeScreenShotHandler}
                    isCameraActive={isCameraActive}
                    cameraActiveHandler={cameraActiveHandler}
                    itemsDataHandler={itemsDataHandler}
                />
            </Paper>

            {itemsData || showSearchList ? (
                <Paper>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={12} justifyContent="center">
                            {showSearchList ? (
                                <FishInformation
                                    itemsData={speciesDoc.filter(
                                        (fish: fishDescription) =>
                                            fish.name.toLowerCase().includes(valueSearchField.toLowerCase()) ||
                                            fish.s_name.toLowerCase().includes(valueSearchField.toLowerCase())
                                    )}
                                />
                            ) : (
                                <>
                                    <FishInformation itemsData={itemsData?.fishes ?? {}} />
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            ) : (
                <></>
            )}

            {showSearchList && (
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 200,
                        borderTop: '5px solid #1976d2',
                        borderBottom: '5px solid #1976d2',
                    }}
                    style={{ position: 'fixed', bottom: '64px', left: '0px', right: '0px', maxHeight: '300px' }}
                >
                    {typePrintListFish === 'list' && (
                        <>
                            {speciesDoc
                                .filter(
                                    (fish: fishDescription) =>
                                        fish.name.toLowerCase().includes(valueSearchField.toLowerCase()) ||
                                        fish.s_name.toLowerCase().includes(valueSearchField.toLowerCase())
                                )
                                .map((fish: fishDescription, index: number) => {
                                    return (
                                        <ListItem
                                            disablePadding
                                            key={index}
                                            style={{
                                                borderBottom:
                                                    index < defaultDatas.data.length - 1 ? '1px solid black' : '',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <ListItemText primary={fish.name + ' (' + fish.s_name + ')'} />
                                        </ListItem>
                                    );
                                })}
                        </>
                    )}
                </List>
            )}

            <AppBarBottom
                typePrintList={typePrintListFish}
                handleChangeSearchValue={(value: string) => {
                    setValueSearchField(value);
                }}
                handleIsSearch={(value: boolean) => {
                    if (value === true && showSearchList === true) setPrintListFish('grid');
                    if (value === false) setPrintListFish('list');
                    setShowSearchList(value);
                }}
                isShoot={isTakeScreenShot}
                screenShotHandler={takeScreenShotHandler}
                isCameraActive={isCameraActive}
                cameraActiveHandler={cameraActiveHandler}
                handleChangeTypeOfPrintList={(type: 'grid' | 'list') => {
                    setPrintListFish(type);
                }}
            />
        </>
    );
};

export default memo(Home);
