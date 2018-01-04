import * as React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Helmet from 'react-helmet'

import { createLinkStyle, sectionHeading, highlightedText } from '../utils/globalStyles'
import { photonColors, fonts, breakpoints, widths, sharedStyles } from '../utils/theme'

import Masthead from '../components/Masthead'
import Container from '../components/Container'
import Footer from '../components/Footer'
import PageHeader from '../components/PageHeader'

const PageWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  color: ${photonColors.white};
  background-color: ${photonColors.grey90};
`

const PageInner = styled.main`
  text-align: center;

  a {
    ${createLinkStyle(photonColors.blue40, photonColors.blue50)}
  }

  h1 {
    margin-top: 0;
    font-family: ${fonts.sansSerif};

    span {
      ${sectionHeading(photonColors.white, 0, '.25rem')}
    }
  }
`

interface NotFoundPageProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const NotFoundPage: React.SFC<NotFoundPageProps> = ({ data }) => (
  <PageWrapper>
    <Helmet title={`404: Page not found. · ${data.site.siteMetadata.title}`} />
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
    }
  }
}
`
