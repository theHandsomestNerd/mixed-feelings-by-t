// mark Renderers should only apply classes to inline elements (spans) not add html block elements.
// ex: if you add a typography tag here then the variant by default is body1
// if a header mark was included on the same block this would overwrite the variant.
// it would also block other html elements causing that mark to line break
import React, { PropsWithChildren } from 'react'
import { useCommonStyles } from './CommonStyles'
import { Button, CssBaseline, MuiThemeProvider, PropTypes, Typography } from '@material-ui/core'
import AftTheme from '../../theme/aft-theme/AftTheme'

export type TypographyVariantType =
  'inherit'
  | 'button'
  | 'overline'
  | 'caption'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'srOnly'
  | undefined
export const LightRender: React.FunctionComponent = (props) => {
  const classes = useCommonStyles(AftTheme)
  return <span className={classes.lightWeightFont}>{props.children}</span>
}

export const BoldRender: React.FunctionComponent = (props) => {
  const classes = useCommonStyles(AftTheme)
  return <span className={classes.boldWeightFont}>{props.children}</span>
}

export const DropCapRender: React.FunctionComponent = (props) => {
  const classes = useCommonStyles(AftTheme)
  return <span className={classes.dropCapLetter}>{props.children}</span>
}

export const KeystrokeRender: React.FunctionComponent = (props) => {
  const classes = useCommonStyles(AftTheme)
  return <span className={classes.keystroke}>{props.children}</span>
}

export const TextColorRender: React.FunctionComponent = (props, color) => {
  return <MuiThemeProvider theme={AftTheme}><CssBaseline/><span
    style={{color: color}}>{props.children}</span></MuiThemeProvider>
}

export const UnderlineRender: React.FunctionComponent = (props, color) => {
  return <span style={{textDecoration: `${color} underline`}}>{props.children}</span>
}

export const NormalRender: React.FunctionComponent = (props: React.PropsWithChildren<{}> & { listItem?: string, level?: number }) => {
  const classes = useCommonStyles(AftTheme)
  return <p className={classes.bodyText}>{props.children}</p>
}

export const TypographyRender: React.FunctionComponent = (props, variant: string) => {
  const wrapWithHTag = (children: any) => {
    switch (variant) {
      case 'h1':
        return <h1>{children}</h1>
        break
      case 'h6':
        return <h6>{children}</h6>
        break
      case 'h2':
        return <h2>{children}</h2>
        break
      case 'h3':
        return <h3>{children}</h3>
        break
      case 'h4':
        return <h4>{children}</h4>
        break
      case 'h5':
        return <h5>{children}</h5>
        break
      default:
        return <Typography display='inline' component='p' style={{textDecoration: 'none'}}
                           variant={variant as TypographyVariantType}>{children}</Typography>
    }

  }

  return wrapWithHTag(props.children)
}

export const LargeBodyTextRender: React.FunctionComponent = (props) => {
  return <Typography component='p'
                     style={{fontSize: '21px'}}>{props.children}</Typography>
}

// export const ButtonRender: (props: any, color: string, variant: string, buttonText: string, buttonLink: string) => any = (props:any, color:string, variant:string, buttonText:string, buttonLink:string):any => {
//   return <Button variant={variant as 'text' | 'outlined' | 'contained'} color={color as PropTypes.Color} href={buttonLink}>{props.buttonText}</Button>
// }


export default {
  LightRender,
  BoldRender,
  DropCapRender,
  HighlightRender: TextColorRender,
  UnderlineRender,
  TypographyRender,
  LargeBodyTextRender,
  KeystrokeRender
}