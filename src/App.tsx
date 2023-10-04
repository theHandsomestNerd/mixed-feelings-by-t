import './App.css'
import {CssBaseline, Grid, StyledEngineProvider, Theme, ThemeProvider, useTheme} from '@mui/material';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query';
import FourOhFour from "./components/transform-hw/pages/error-page/FourOhFour";
import PageProvider from "./components/page-context/PageProvider";
import MediaQueriesProvider from "./components/media-queries-context/MediaQueriesProvider";
import AmenityProvider from "./components/amenity-context/AmenityProvider";
import ModalProvider from "./components/snackbar-context/ModalProvider";
import SnackbarProvider from "./components/modal-context/SnackbarProvider";
import PageMux from "./components/mackenzies-mind/pages/PageMux";
import TheWebsiteTheme from "./theme/Theme";

export enum RoutesEnum {
    MAINROUTE = "/resume/:pageSlug",
    HOMEROUTE = "/resume/home",

    ERROR = '/error'
}

function App() {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // refetchOnWindowFocus: false,
                // refetchOnMount: false,
                // refetchOnReconnect: false,
            },
        },
    });

    const theme = useTheme()
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <StyledEngineProvider injectFirst>
                    <StyledEngineProvider injectFirst>
                        <ThemeProvider theme={TheWebsiteTheme}>
                            <CssBaseline/>
                            <SnackbarProvider>
                                <MediaQueriesProvider>
                                    <ModalProvider>
                                        <PageProvider>
                                            <AmenityProvider>
                                                <Grid container item alignItems="center"
                                                      style={{
                                                          backgroundColor: theme.palette.background.default,
                                                          overflow: "hidden",
                                                          width: "100vw"
                                                      }}>

                                                    <Grid item>
                                                        <Routes>
                                                            <Route path={RoutesEnum.MAINROUTE} element={<PageMux/>}/>
                                                            <Route path={RoutesEnum.ERROR} element={<FourOhFour/>}/>
                                                            <Route path={"/*"}
                                                                   element={<Navigate
                                                                       to={RoutesEnum.HOMEROUTE}/>}/>
                                                        </Routes>
                                                    </Grid>
                                                </Grid>
                                            </AmenityProvider>
                                        </PageProvider>
                                    </ModalProvider>
                                </MediaQueriesProvider>
                            </SnackbarProvider>
                        </ThemeProvider>
                    </StyledEngineProvider>
                </StyledEngineProvider>
            </QueryClientProvider>
        </BrowserRouter>
    );
}

export default App
