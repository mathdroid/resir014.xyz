import * as React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { createLinkStyle, sectionHeading, highlightedText } from '../utils/globalStyles'
import { colors, fonts } from '../utils/theme'

import Masthead from '../components/Masthead'
import Container from '../components/Container'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'
import mediaQueries from '../utils/mediaQueries'

const PageWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  color: ${colors.white};
  background-color: ${colors.grey90};
`

const PageInner = styled.main`
  text-align: center;

  a {
    ${createLinkStyle(colors.blue40, colors.blue50)}
  }

  h1 {
    margin-top: 0;
    margin-bottom: .5rem;
    font-weight: 600;
    line-height: 1.2;
    font-family: ${fonts.sansSerif};
    font-size: 2.074rem;

    @media ${mediaQueries.md} {
      font-size: 2.441rem;
    }

    @media ${mediaQueries.lg} {
      font-size: 3.157rem;
    }

    span {
      ${sectionHeading(colors.white, 0, '.25rem')}
    }
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 300;
  }
`

interface NotFoundPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        tagline: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
  }
}

const NotFoundPage: React.SFC<NotFoundPageProps> = ({ data }) => (
  <PageWrapper>
    <Helmet
      title={`404: Page not found. · ${data.site.siteMetadata.title}`}
      meta={[
        { name: 'description', content: data.site.siteMetadata.description },
        { property: 'og:title', content: '404: Page not found.' },
        { property: 'og:description', content: data.site.siteMetadata.description },
      ]}
    />
    <PageInner>
      <h1 className="page-title"><span>404</span></h1>
      <p className="lead">You've hit the void. <Link to="/">Go back home.</Link></p>
    </PageInner>
  </PageWrapper>
)

export default NotFoundPage

export const query = graphql`
query NotFoundPageQuery {
  site {
    siteMetadata {
      title
      description
      author {
        name
        url
      }
    }
  }
}
`
