import React, { Fragment, useState } from 'react';
import TopBar from 'components/TopBar';
import { Box, Button, CardMedia, Container } from '@mui/material';
import { connectWeb3, sendVote, changeStatusConsulation } from 'services/web3';

const Home = () => {
    const [account, setAccount] = useState(null);
    const handleSetVote = (vote) => {
        sendVote(vote, account.account);
    };
    const handleConnectWallet = () => {
        connectWeb3()
            .then(({ account, shortAccount }) => {
                setAccount({
                    account,
                    shortAccount
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Fragment>
            <TopBar/>
            <CardMedia
                component="img"
                src="tren-maya-background.png"
                alt="Tren Maya"
            />
            <Box sx={{ mt: 5 }}>
                <Container maxWidth="xl">
                    <h1 style={{ fontSize: '3em', textAlign: 'center', fontWeight: 'bold' }}>
                        El Tren Maya es un proyecto para mejorar <br />
                        la calidad de vida de las personas, cuidar el ambiente y 
                        detonar el desarrollo sustentable.
                    </h1>
                    <h1 style={{ fontSize: '2em', textAlign: 'center', color: '#212529' }}>
                        Recorrerá una distancia de 1,500 km aproximadamente y 
                        pasará por los estados <br />
                        de Chiapas, Tabasco, Campeche, Yucatán y Quintana Roo.
                    </h1>
                </Container>
                <Container maxWidth="xl">
                    <h1 style={{ textAlign: 'center' }}>
                        Con tu voto decides la construccion de tren maya
                    </h1>
                </Container>
                <Container maxWidth="sm">
                    {account && (
                        <Box sx={{ textalign: 'center' }}>
                            <span>Tu cuenta: {account.shortAccount}</span>
                        </Box>
                    )}
                    {account && (
                        <Box display="flex" justifyContent="space-between" width="100%" sx={{ mt: 5 }}>
                            <Button type="button" variant="contained" onClick={()=>handleSetVote(true)}>
                                Si
                            </Button>
                            <Button type="button" variant="contained" onClick={()=>handleSetVote(false)}>
                                No
                            </Button>
                        </Box>
                    )}
                    {account && (
                        <Box display="flex" justifyContent="space-between" width="100%" sx={{ mt: 5 }}>
                            <Button type="button" variant="contained" onClick={()=>changeStatusConsulation(account.account)}>
                                Activar, desactivar votacion
                            </Button>
                        </Box>
                    )}
                    {!account && (
                        <Box display="flex" justifyContent="space-between" width="100%" sx={{ mt: 5 }}>
                            <Button type="button" variant="contained" onClick={handleConnectWallet}>
                                Conecta tu wallet con metamask
                            </Button>
                        </Box>
                    )}
                </Container>
            </Box>
            <footer style={{ marginTop: '50px' }}>
                <small>
                    El voto es libre y secreto. No se puede obligar a nadie a votar ni a
                    declarar por quien votó.
                    
                </small>
            </footer>
        </Fragment>
    );
};

export default Home;
