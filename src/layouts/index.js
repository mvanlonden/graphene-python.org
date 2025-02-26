import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import GrapheneLogo from "./graphene-logo.svg";
import Arrow from "./arrow.svg";
import LogoOnWhite from "./logo-on-white.svg";
import GrapheneLogoWhite from "./graphene-logo-white.svg";
import { FaGithub, FaBars } from "react-icons/fa";

import "docsearch.js/dist/cdn/docsearch.min.css";
import "./index.css";

const SEARCH_DOCS = true;

// let docsearch;
// if (typeof window !== "undefined" && SEARCH_DOCS) {
//   docsearch = require("docsearch.js/dist/cdn/docsearch.min");
//   try {
//     docsearch({
//       apiKey: "4b6d0afa80197db35886555b5ef4721f",
//       inputSelector: "#search-docs",
//       indexName: "graphene_python",
//       transformData: function(suggestions) {
//         return suggestions.map(function(suggestion) {
//           suggestion.url.replace("http:", "https:");
//           return suggestion;
//         });
//       },
//       // "start_urls": ["https://www.example.com/docs"],
//       debug: false
//     });
//   } catch (e) {}
// } else {
//   docsearch = false;
// }

const HeaderLink = ({ to, children, docs, ...extra }) => {
  if (docs) {
    return (
      <a href={`https://graphene-python.org${to}`} {...extra}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} {...extra}>
      {children}
    </Link>
  );
};

class Header extends React.Component {
  componentDidMount() {
    try {
      if (SEARCH_DOCS && typeof window !== "undefined") {
        let docsearch = require("docsearch.js/dist/cdn/docsearch.min");
        docsearch({
          apiKey: "4b6d0afa80197db35886555b5ef4721f",
          inputSelector: "#search-docs",
          indexName: "graphene_python",
          transformData: function(suggestions) {
            return suggestions.map(function(suggestion) {
              suggestion.url = suggestion.url.replace("http:", "https:");
              return suggestion;
            });
          }
          // debug: true
        });
      }
    } catch (e) {}
  }
  render() {
    let { docs } = this.props;
    return (
      <div>
        <header className="graphene-header">
          <div className="container">
            <a href="https://graphene-python.org/">
              <GrapheneLogo className="graphene-logo" />
            </a>
            <a className="tagline" href="//graphene.tools/">
              Learn{" "}
              <span className="hide-mobile">
                how Graphene-Python fits into
              </span>{" "}
              the <b>Graphene family</b>
              <Arrow className="arrow" />
            </a>
          </div>
        </header>
        <header
          className={`navbar-header  ${docs ? "navbar-header-contrast" : ""}`}
        >
          <div className="container">
            <HeaderLink to="/" className="logo-link">
              {docs ? <GrapheneLogoWhite /> : <LogoOnWhite />}
            </HeaderLink>
            <a id="menu" />
            <a href="#menu" className="mobile-menu">
              <FaBars />
            </a>
            <a className="background-mobile-menu" href="#" />
            <nav>
              {SEARCH_DOCS ? (
                <input
                  id="search-docs"
                  type="text"
                  placeholder="Search the docs..."
                />
              ) : null}
              <a
                href="https://docs.graphene-python.org/"
                className={`nav-link ${docs ? "nav-link-active" : ""}`}
              >
                Documentation
              </a>
              <HeaderLink
                to="/team"
                docs={docs}
                className="nav-link"
                activeClassName="nav-link-active"
              >
                Team
              </HeaderLink>
              <a
                className="nav-link"
                href="https://github.com/graphql-python/graphene"
              >
                <FaGithub /> Github
              </a>
            </nav>
          </div>
        </header>

        <style jsx>{`
          .nonexisting {
            content: "{% raw %}";
          }
          .graphene-header {
            background: #000000;
            width: 100%;
            /* Graphene: */
            font-family: "klavika-web";
            font-weight: 300;
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 0;
          }
          #menu {
            position: absolute;
            top: 0;
          }
          :global(.graphene-logo) {
            vertical-align: middle;
          }
          .graphene-header {
          }
          .graphene-header .container {
            height: 48px;
            align-items: center;
            display: flex;
          }
          .tagline {
            margin-left: auto;
            color: #a4b1b2;
            font-size: 14px;
            letter-spacing: 0;
            margin-bottom: 0;
            margin-top: 0;
            text-transform: none;
            font-weight: normal;
          }
          .tagline b {
            font-weight: 400;
            letter-spacing: 0.3px;
            color: white;
          }
          :global(svg.arrow) {
            /*vertical-align: middle;*/
            margin-left: 8px;
            position: relative;
            top: 2px;
          }
          :global(#search-docs) {
            padding: 5px 5px 5px 29px;
            margin-top: -2px;
            vertical-align: middle;
            font-size: 14px;
            width: 180px;
            background: transparent;
            border: none;
            background-image: url("/search.svg");
            background-size: 16px 16px;
            background-repeat: no-repeat;
            background-position-y: center;
            background-position-x: 5px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          }
          .background-mobile-menu {
            position: fixed;
            z-index: 9999;
            background: rgba(200, 200, 200, 0.3);
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: none;
          }
          .mobile-menu {
            display: none;
            color: black;
          }
          :global(#search-docs):focus {
            outline: none;
            border-bottom-color: rgba(0, 0, 0, 0.6);
          }
          .navbar-header-contrast :global(#search-docs) {
            background-image: url("https://graphene-python.org/search-white.svg");
            color: white;
            border-bottom-color: rgba(255, 255, 255, 0.5);
          }
          .navbar-header-contrast :global(#search-docs):focus {
            border-bottom-color: #ffffff;
          }
          .navbar-header-contrast :global(#search-docs)::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }
          .navbar-header-contrast {
            background-image: linear-gradient(
              -180deg,
              #f67049 0%,
              #e14b2e 100%
            );
          }

          .navbar-header {
            height: 94px;
          }
          .navbar-header :global(.container) {
            display: flex;
            align-items: center;
            height: 94px;
          }

          .navbar-header nav {
            height: 100%;
            display: block;
            margin-left: auto;
          }
          :global(.nav-link) {
            height: 100%;
            align-items: center;
            color: #555555;
            font-size: 13px;
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            height: 94px;
            line-height: 94px;
            padding: 0 10px;
            margin: 0;
            text-decoration: none;
            font-weight: 600;
            position: relative;
          }
          @media (max-width: 992px) {
            :global(#search-docs) {
              width: 120px;
            }
          }
          :global(.nav-link-active) {
            color: black;
          }
          :global(.nav-link-active):before {
            position: absolute;
            content: "";
            bottom: -10px;
            width: 4px;
            height: 4px;
            left: 50%;
            margin-left: -2px;
            border-radius: 2px;
            background: black;
          }
          .navbar-header-contrast :global(.nav-link-active):before {
            background: white;
          }
          :global(.nav-link):hover {
            color: black;
          }
          .navbar-header-contrast :global(.nav-link) {
            color: white;
          }
          .navbar-header-contrast :global(.nav-link):hover {
            color: #eee;
          }

          @media (max-width: 768px) {
            :global(#search-docs) {
              display: none;
            }
            .mobile-menu {
              display: block;
              position: absolute;
              right: 20px;
              font-size: 20px;
            }
            .navbar-header-contrast .mobile-menu {
              color: white;
            }
            .tagline .hide-mobile {
              display: none;
            }
            .navbar-header nav {
              height: auto;
              color: black;
              position: fixed;
              top: 0;
              bottom: 0;
              right: 0;
              width: 280px;
              display: block;
              background: white;
              z-index: 10000;
              transform: translateX(305px);
              box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.15);
              transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
            }
            .navbar-header-contrast :global(.nav-link) {
              color: black;
            }
            .navbar-header-contrast :global(.nav-link):hover {
              color: #333;
            }
            .mobile-menu {
              display: block;
            }
            #menu:target ~ .background-mobile-menu {
              display: block;
              cursor: default;
            }
            #menu:target ~ nav {
              transform: translateX(0px);
            }
            .navbar-header :global(.nav-link) {
              height: auto;
              display: block;
              width: 100%;
              text-align: center;
              padding: 0;
              margin: 18px 0;
              line-height: 20px;
            }
          }

          @import url("https://fonts.googleapis.com/css?family=Fira+Mono|Open+Sans:400,600");
          .nonexisting {
            content: "{% endraw %}";
          }
        `}</style>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            docsearch({
              apiKey: "4b6d0afa80197db35886555b5ef4721f",
              inputSelector: "#search-docs",
              indexName: "graphene_python",
              transformData: function(suggestions) {
                return suggestions.map(function(suggestion) {
                  suggestion.url = suggestion.url.replace("http:", "https:");
                  return suggestion;
                });
              }
            });`
          }}
        />
      </div>
    );
  }
}

const TemplateWrapper = ({ children, ...otherProps }) => {
  const docs = otherProps.location.pathname.indexOf("/docs") > -1;
  return (
    <div>
      <Helmet
        title="Graphene-Python"
        meta={[
          { name: "description", content: "Graphene framework for Python" },
          { name: "keywords", content: "graphene, graphql, python, framework" }
        ]}
      >
        <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js" />
        {/*<script>
          {`
      docsearch({
        apiKey: "4b6d0afa80197db35886555b5ef4721f",
        inputSelector: "#search-docs",
        indexName: "graphene_python",
        transformData: function(suggestions) {
          return suggestions.map(function(suggestion) {
            suggestion.url = suggestion.url.replace("http:", "https:");
            return suggestion;
          });
        }
      });`}
    </script>*/}
      </Helmet>
      <Header docs={docs} />
      <div>{children()}</div>
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
