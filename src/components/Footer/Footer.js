import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Input from "../Input/Input"
import logo from "../../img/logo_white.svg";

const Footer = class extends React.Component {
  render() {
    const {
      data: {
        markdownRemark: {
          frontmatter: {
            footer: { latest: articles }
          }
        }
      }
    } = this.props;

    return (
      <footer className="footer">
        <div className="content">
          <div className="container footer-container">
            <div className="footer-latest-container">
              <h3 className="footer-header">Latest Articles on Relevel Blog</h3>
              <ul className="footer-latest-list">
                {articles.map((item, i) => {
                  return (
                    <li className="footer-latest-list_item" key={"latestitem" + i}>
                      <Link to={item.url} className="footer-latest-item_link" key={"latestlink" + i}>
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="footer-what-container">
              <h3 className="footer-header">What is Relevel?</h3>
              <div className="footer-what-description">
                Relevel is the fitness app on the mission to eliminate pain
                caused by the sedentary lifestyle. Professional training plans,
                easy daily routines and fun exercises, will take the away the
                aches caused by sitting in front of the computer too much.
              </div>
              <form>
                <Input type="text" placeholder="Your email address" kind="white" />
                <input type="submit" value="Get early access" />
              </form>
            </div>
          </div>
        </div>
        <div className="content has-text-centered footer-logo">
          <img
            src={logo}
            alt="Relevel"
            style={{ width: "124px", height: "28px" }}
          />
          <div className="footer-copyrights">
            {"© Relevel " + new Date().getFullYear()}
          </div>
        </div>
      </footer>
    );
  }
};

export default () => (
  <StaticQuery
    query={graphql`
      query Footer {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
          frontmatter {
            footer {
              latest {
                title
                url
              }
            }
          }
        }
      }
    `}
    render={data => <Footer data={data} />}
  />
);

// export default Footer;

/*
              <div className="column is-4 social">
                <a title="facebook" href="https://facebook.com">
                  <img
                    src={facebook}
                    alt="Facebook"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="twitter" href="https://twitter.com">
                  <img
                    className="fas fa-lg"
                    src={twitter}
                    alt="Twitter"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="instagram" href="https://instagram.com">
                  <img
                    src={instagram}
                    alt="Instagram"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
                <a title="vimeo" href="https://vimeo.com">
                  <img
                    src={vimeo}
                    alt="Vimeo"
                    style={{ width: '1em', height: '1em' }}
                  />
                </a>
              </div>
*/

/*
import facebook from '../img/social/facebook.svg'
import instagram from '../img/social/instagram.svg'
import twitter from '../img/social/twitter.svg'
import vimeo from '../img/social/vimeo.svg'
*/
