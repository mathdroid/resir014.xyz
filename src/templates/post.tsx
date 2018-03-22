import * as React from 'react'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby-link'

import { menuItems } from '../utils/menus'
import { SiteAuthor, SyndicationFormat } from '../utils/types'

import Container from '../components/ui/Container'
import Divider from '../components/ui/Divider'
import MarkdownContent from '../components/page/MarkdownContent'
import PageHeader from '../components/page/PageHeader'
import PageContent from '../components/page/PageContent'
import PageSubtitle from '../components/page/PageSubtitle'
import Page from '../components/page/Page'
import HeaderImage from '../components/page/HeaderImage'
import PostHeader from '../components/post/PostHeader'
import PostTitle from '../components/post/PostTitle'
import PostMeta from '../components/post/PostMeta'
import PostMetaItem from '../components/post/PostMetaItem'
import PostThumbnail from '../components/post/PostThumbnail'
import PostThumbnailImage from '../components/post/PostThumbnailImage'
import HCardPostFooter from '../components/indieweb/HCardPostFooter'
import MessageBox from '../components/ui/MessageBox'

interface PostTemplateProps {
  location: {
    pathname: string
  }
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        siteUrl: string
        author: SiteAuthor
      }
    }
    icon: {
      sizes: { [key: string]: any }
    }
    markdownRemark: {
      html: string
      excerpt: string
      fields: {
        slug: string
        layout?: string
        category?: string
        lead?: string
        date: string
        date_ogp?: string
      }
      frontmatter: {
        title: string
        path?: string
        layout: string
        syndication?: SyndicationFormat[]
        header_image?: {
          childImageSharp: {
            sizes: { [key: string]: any }
          }
        }
      }
    }
  }
}

const PostTemplate: React.SFC<PostTemplateProps> = ({ data, location }) => {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { author } = siteMetadata
  const { pathname } = location

  return (
    <Page>
      <Helmet
        title={`${post.frontmatter.title} · ${siteMetadata.title}`}
        meta={[
          { name: 'description', content: post.fields.lead || post.excerpt },
          { name: 'author', content: siteMetadata.author.name },
          { property: 'og:title', content: post.frontmatter.title },
          {
            property: 'og:description',
            content: post.fields.lead || post.excerpt
          },
          { property: 'og:type', content: 'article' },
          { property: 'og:article:author', content: siteMetadata.author.name },
          {
            property: 'og:article:published_time',
            content: post.fields.date_ogp
          }
        ]}
      />
      <article className="h-entry">
        <PostHeader>
          <PostMeta>
            <PostMetaItem>
              <time
                className="dt-published"
                dateTime={new Date(post.fields.date_ogp).toISOString()}
              >
                {post.fields.date}
              </time>
            </PostMetaItem>
            {post.fields.category ? (
              <PostMetaItem className="p-category">{post.fields.category}</PostMetaItem>
            ) : null}
            <PostTitle className="p-name" darkBackground>
              {post.frontmatter.title}
            </PostTitle>
          </PostMeta>
        </PostHeader>
        {post.frontmatter.header_image && (
          <PostThumbnail>
            <PostThumbnailImage
              sizes={post.frontmatter.header_image.childImageSharp.sizes}
              alt={post.frontmatter.title}
            />
          </PostThumbnail>
        )}
        <PageContent>
          <Container>
            {post.fields.lead ? (
              <PageSubtitle className="p-summary">{post.fields.lead}</PageSubtitle>
            ) : null}
            {post.frontmatter.syndication && (
              <MessageBox>
                <p>This post is also published on:</p>
                <ul>
                  {post.frontmatter.syndication.map(s => (
                    <li key={s.name}>
                      <a
                        href={s.url}
                        target="_blank"
                        className="u-syndication"
                        rel="noopener noreferrer external syndication"
                      >
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </MessageBox>
            )}
            <MarkdownContent className="e-content" html={post.html} />
            <div className="hidden">
              <p>
                <a
                  className="u-url"
                  href={data.site.siteMetadata.siteUrl + data.markdownRemark.fields.slug}
                >
                  Permalink
                </a>
              </p>
            </div>
          </Container>
          <Divider spacing="large" />
          <Container>
            <HCardPostFooter icon={data.icon} author={data.site.siteMetadata.author} />
          </Container>
        </PageContent>
      </article>
    </Page>
  )
}

export default PostTemplate

export const query = graphql`
  query PostQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author {
          name
          description
          website
          email
          url {
            twitter
            instagram
            tumblr
            github
          }
        }
      }
    }
    icon: imageSharp(id: { regex: "/assets/images/resir014-icon.jpg/" }) {
      sizes(maxWidth: 400, maxHeight: 400) {
        ...GatsbyImageSharpSizes
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
        layout
        category
        link
        lead
        date(formatString: "DD MMMM YYYY")
        date_ogp: date
      }
      frontmatter {
        title
        syndication {
          name
          url
        }
        header_image {
          childImageSharp {
            sizes(maxWidth: 1140) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
