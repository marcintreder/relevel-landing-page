import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import { DiscussionEmbed } from 'disqus-react'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import Breadcrumb from "../components/Breadcrumb/Breadcrumb"

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  let disqusConfig = {
    url: `https://relevel-1.disqus.com`,
    identifier: 'relevel-disqus-1311',
    title: "Relevel Comments",
    shortname: 'relevel-1'
  }

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content blogpost-container">
            <h1 className="blogpost-header">
              {title}
            </h1>
            <Breadcrumb secondPage="blog" currentPage={title} />
            <p>{description}</p>
            <PostContent content={content} className="blogpost-content" />
            {tags && tags.length ? (
              <div className="blogpost-tags">
                <h2>Read More</h2>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
      </div>
      <div className="container">
        <DiscussionEmbed config={disqusConfig} />
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
