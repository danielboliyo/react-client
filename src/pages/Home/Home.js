import React, { Fragment, useState } from 'react';
import TopBar from 'components/TopBar';
import { Box, Button, CardMedia, Container, InputBase } from '@mui/material';
import {
    connectWeb3,
    sendVote,
    changeStatusConsulation,
    authorizedWallet,
    getGasPrice
} from 'services/web3';
import { StyledError } from 'components/Error/styled';

const Home = () => {
    const [account, setAccount] = useState(null);
    const [errors, setErrors] = useState({});
    const [sucess, setSucess] = useState({});
    const [authWallet, setAuthWallet] = useState('');
    const [gasPrice, setGasPrice] = useState(null);
    const handleChangeStatus = async () => {
        setErrors(null);
        setSucess(null);
        changeStatusConsulation(account.account)
            .then((result) => {
                console.log('change status', result);
                setSucess({ changeStatus: result });
            })
            .catch((error) => {
                console.log('change status error', error);
                setErrors({ changeStatus: error.message });
            });
    };
    const handleGasPrice = () => {
        getGasPrice()
            .then((result) => {
                console.log('gas price', result);
                setGasPrice(result);
            })
            .catch((error) => {
                console.log('gas price error', error);
                setErrors({ gasPrice: error.message });
            });
    };
    const handleAuthorizedWallet = (wallet, account) => {
        setErrors(null);
        setSucess(null);
        authorizedWallet(wallet, account)
            .then((result) => {
                console.log('authorized', setSucess, result);
            })
            .catch((error) => {
                console.log('authorized error', error, setErrors);
                setErrors({ authorize: error.message });
            });
    }
    const handleSetVote = (vote) => {
        setErrors(null);
        setSucess(null);
        sendVote(vote, account.account)
            .then((result) => {
                console.log('vote success', result);
            })
            .catch((error) => {
                console.log('vote error', error);
                setErrors({ voted: error.message });
            });
    };
    const handleConnectWallet = () => {
        setErrors(null);
        setSucess(null);
        connectWeb3()
            .then(({ account, shortAccount }) => {
                setAccount({
                    account,
                    shortAccount
                });
            })
            .catch((error) => {
                console.log('connect error', error);
                setErrors({ connectWallet: error.message });
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
                    {account && account.account && (
                        <Box sx={{ textalign: 'center' }}>
                            <span>Tu cuenta: {account.shortAccount}</span>
                        </Box>
                    )}
                    {account && account.account && (
                        <Box display="flex" justifyContent="space-between" width="100%" sx={{ mt: 5 }}>
                            <Button type="button" variant="contained" onClick={()=>handleSetVote(true)}>
                                Si
                            </Button>
                            <Button type="button" variant="contained" onClick={()=>handleSetVote(false)}>
                                No
                            </Button>
                        </Box>
                    )}
                    {account && account.account && (
                        <Box display="flex" justifyContent="space-between" width="100%" sx={{ mt: 5 }}>
                            <Button type="button" variant="contained" onClick={()=>handleChangeStatus(account.account)}>
                                Activar / desactivar votacion
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
                    {errors && errors.connectWallet && (
                        <StyledError>{errors.connectWallet}</StyledError>
                    )}
                    {errors && errors.voted && (
                        <StyledError>{errors.voted}</StyledError>
                    )}
                    {errors && errors.authorize && (
                        <StyledError>{errors.authorize}</StyledError>
                    )}
                    {errors && errors.changeStatus && (
                        <StyledError>{errors.changeStatus}</StyledError>
                    )}
                    {sucess && (
                        <Box display="none">
                            <span>Has gracias por tu voto</span>
                        </Box>
                    )}
                    {sucess && sucess.changeStatus && (
                        <Box>
                            <Box>{`https://goerli.etherscan.io/tx/${sucess.changeStatus.transactionHash}`}</Box>
                            <span>
                                {/* {sucess.changeStatus.events.ConsultationClosed} */}
                            </span>
                        </Box>
                    )}
                </Container>
            </Box>
            {account && account.account && (
                <Container maxWidth="sm">
                    <Box>
                        <InputBase
                            value={authWallet}
                            onChange={(e) => setAuthWallet(e.target.value)}
                            sx={{ border: '1px solid #ced4da', borderRadius: '4px', p: '5px', width: '100%' }}
                        />
                    </Box>
                    <Button
                        type="button"
                        variant="contained"
                        onClick={()=>handleAuthorizedWallet(authWallet, account.account)}
                    >
                        Authorize wallet
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        onClick={handleGasPrice}
                    >
                        Gas price
                    </Button>
                    {gasPrice && <Box>{gasPrice} Gwei</Box>}
                </Container>
            )}
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
