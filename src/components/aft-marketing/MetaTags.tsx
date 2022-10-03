import React, { FunctionComponent } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import MetaTags from 'react-meta-tags'
import { SanityImage } from '../abReplica/cmsClient'
import { urlFor } from '../abReplica/static-pages/cmsStaticPagesClient'
import { useLocation } from 'react-router-dom'

export const useStyles = makeStyles((theme: Theme) => ({}))

interface IProps {
  title: string
  description: string
  imgSrc?: SanityImage
  structuredData?: any
}


const MetaTagsComponent: FunctionComponent<IProps> = (props) => {
  const [structuredJSONObj, setStructuredJSONObj] = React.useState<any>()

  const location = useLocation()

  React.useEffect(() => {
    console.log("Structured data", props.structuredData)
    if (props.structuredData) {
      // let data={}
      let data = {
        '@context': 'http://schema.org/',
        '@type': props.structuredData.type ? props.structuredData.type : 'Product',
        "name": `${props.structuredData.name}`,
        "image": props.structuredData.image?.map((image:SanityImage) => urlFor(image).url()),
        "description": props.structuredData.description,
        "url": props.structuredData.url,
        "offers": {
          "@type": "Offer",
          "priceCurrency": `${props.structuredData.priceCurrency || "₴"}`,
          "price": props.structuredData.price ? `${parseFloat(props.structuredData.price)}` : 0,
          "availability": `${props.structuredData.availability}`,
          "seller": {
            "@type": props.structuredData.seller?.type ? props.structuredData.seller.type: "Organization",
            "name": props.structuredData.seller?.name
          }
        }
      }
console.log("structured data", data)
      setStructuredJSONObj(data)
    }
  }, [props.structuredData])

  return (
    <div className='wrapper'>
      <MetaTags>
        <title>{props.title}</title>
        <script type='application/ld+json'     dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredJSONObj) }}
        />

        <meta name='description' content={props.description}/>
        <meta property='og:title' content={props.title}/>
        <meta property='og:image' content={urlFor(props.imgSrc).url() ?? ''}/>
      </MetaTags>
    </div>
  )
}

export default MetaTagsComponent