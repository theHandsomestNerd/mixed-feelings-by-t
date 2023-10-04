import React, {FunctionComponent} from 'react'
import BlockContent from '@sanity/block-content-to-react'
import { Card, Grid, Link, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import sanityClient from '../sanityClient'
import {blockSerializers} from '../common/sanityIo/BlockContentRenderer'
import {DevelopmentFooterSectionType, FooterSectionType,} from "./BlockContentTypes";
import DigitalResumeTheme from "../theme/DigitalResumeTheme";
import useThwCommonStyles from "../common/sanityIo/ThwCommonStyles";
import WebDevSiteTheme from "../theme/WebDevSiteTheme";
import Footer from "./mackenzies-mind/footer/Footer";
import WebDevFooter from "./web-dev-site/dev-footer/WebDevFooter";



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}



declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


export type FooterBlockContentLayoutContainerProps = {
    content?: any,
}

const FooterBlockContentLayoutContainer: FunctionComponent<FooterBlockContentLayoutContainerProps> = (props) => {
    const classes = useThwCommonStyles()

    return (
        <Grid container item>
            {props?.content?.map((columnLayoutContainer: any, index: number) => {
                switch (columnLayoutContainer._type) {
                    case 'column1BlockContent':
                        return <Grid key={'column1BlockContent_header'} container justifyContent='center'
                                     alignItems='stretch'>
                            <Grid item>
                                <Card className={classes.root} style={{paddingTop: '80px'}}>
                                    <Grid container item xs={12} className={classes.layoutContainer}>
                                        <Grid item xs={12}>
                                            <BlockContent
                                                blocks={columnLayoutContainer.content}
                                                serializers={blockSerializers}
                                                projectId={sanityClient.config().projectId}
                                                dataset={sanityClient.config().dataset}
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    case 'column2BlockContent':
                        return <Grid key={'column2BlockContent_header'} container justifyContent='center'
                                     alignItems='stretch'>
                            <Grid item>
                                <Card className={classes.root} style={{paddingTop: '80px'}}>
                                    <Grid container item xs={12} className={classes.layoutContainer}>
                                        <Grid item xs={6}>
                                            <BlockContent
                                                blocks={columnLayoutContainer.column1.content}
                                                serializers={blockSerializers}
                                                projectId={sanityClient.config().projectId}
                                                dataset={sanityClient.config().dataset}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <BlockContent
                                                blocks={columnLayoutContainer.column2.content}
                                                serializers={blockSerializers}
                                                projectId={sanityClient.config().projectId}
                                                dataset={sanityClient.config().dataset}
                                            />
                                        </Grid>
                                    </Grid>
                                </Card></Grid>
                        </Grid>
                    case 'DevelopmentFooterSection':
                        const developmentFooter: DevelopmentFooterSectionType = columnLayoutContainer

                        return (
                            <StyledEngineProvider injectFirst>
                                <ThemeProvider theme={WebDevSiteTheme}><Grid key={'BOTTOM_OF_PAGE_DEV'} container item
                                                                                       xs={12}
                                                                                       >
                                    <Link id={"BOTTOM_OF_PAGE"} underline="hover"><></>
                                    </Link>
                                    <WebDevFooter
                                        pageFooter={developmentFooter.footerMenuRef}
                                    />
                                </Grid></ThemeProvider>
                            </StyledEngineProvider>
                        );
                    case 'FooterSection':
                        const footer: FooterSectionType = columnLayoutContainer

                        return (
                            <StyledEngineProvider injectFirst>
                                <ThemeProvider theme={DigitalResumeTheme}><Grid key={'BOTTOM_OF_PAGE'} container item xs={12}
                                                                                          >
                                    <Link id={"BOTTOM_OF_PAGE"} underline="hover"><></>
                                    </Link>
                                    <Footer
                                        pageFooter={footer.footerMenuRef}
                                    />
                                </Grid></ThemeProvider>
                            </StyledEngineProvider>
                        );
                    default:
                        return <span key={index}>Undefined section {columnLayoutContainer._type}</span>
                }
            }) ?? <></>
            }

        </Grid>
    );
}

export default FooterBlockContentLayoutContainer
