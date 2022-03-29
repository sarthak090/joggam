import React, { useEffect, useState } from "react";
import Link from "next/link";
import Img from "next/image";

import RelatedPosts from "./RelatedPosts";
export default function BlogPost(props) {
  const [shareOption, setShareOption] = useState([]);
  const { title, content, featuredImg, publishDate, tags, diff, relatedPosts } =
    props;

  const makeShareOption = () => {
    const urlWithSlug = window.location.href;
    const share = [
      {
        label: "mail",
        src: "/images/share/mail.png",

        href: `mailto:?subject=${title.rendered}&body=${urlWithSlug}`,
      },
      {
        label: "twitter",
        src: "/images/share/tw.png",

        href: `https://twitter.com/share?url=${urlWithSlug}`,
      },
      {
        label: "fb",

        src: "/images/share/fb.png",
        href: `https://facebook.com/sharer/sharer.php?u=${urlWithSlug}`,
      },
      {
        label: "linkdin",
        src: "/images/share/lk.png",

        href: `https://www.linkedin.com/shareArticle?mini=true&url=${urlWithSlug}`,
      },
      {
        label: "pintrest",
        src: "/images/share/pt.png",

        href: `https://pinterest.com/pin/create/bookmarklet/?&url=${urlWithSlug}`,
      },
      {
        label: "messenger",
        src: "/images/share/msn.png",

        href: `fb-messenger://share?link=${urlWithSlug}`,
      },
    ];
    setShareOption(share);
  };
  useEffect(() => {
    makeShareOption();
  }, [props]);
  const renderDate = () => {
    if (diff !== undefined) {
      if (diff.y == 0) {
        return `Updated ${diff.m + 1} months ago`;
      } else {
        return `Updated ${diff.y} year ago`;
      }
    }
    return;
  };

  const getYtId = (yturl) => {
    if (yturl) {
      var video_id = yturl.split("v=")[1];
      if (video_id !== undefined) {
        var ampersandPosition = video_id.indexOf("&");
        if (ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id;
      } else if (yturl.split("/") !== undefined) {
        video_id = yturl.split("/").pop();
        return video_id;
      } else {
        return;
      }
    }
  };
  const showYouTubeEmbed = () => {
    if (document.querySelector(".wp-block-embed__wrapper")) {
      if (document.querySelector(".wp-block-embed__wrapper") !== null) {
        const ytLink = document.querySelector(
          ".wp-block-embed__wrapper"
        ).innerHTML;

        const el = document.createElement("div");
        el.innerHTML = `<iframe width="400" height="315" src="https://www.youtube.com/embed/${getYtId(
          ytLink
        )}"></iframe>`;
        document
          .querySelector(".wp-block-embed__wrapper")
          .parentNode.insertBefore(
            el,
            document.querySelector(".wp-block-embed__wrapper").nextSibling
          );
        document.querySelector(".wp-block-embed__wrapper").style.display =
          "none";
      }
    }
  };
  useEffect(() => {
    const youtubeEmbedd = document.querySelector(".wp-block-embed-youtube");
    if (youtubeEmbedd) {
      showYouTubeEmbed();
    }
  }, []);

  return (
    <>
      <h1
        className={" md:text-4xl text-2xl mt-0 pt-0 mb-4 font-bold"}
        dangerouslySetInnerHTML={{ __html: title.rendered }}
      ></h1>

      {publishDate && renderDate()}

      {shareOption.length > 0 && (
        <div className="flex gap-4 my-4">
          <a href={shareOption[2].href} rel="noreferrer" target="_blank">
            <svg
              className="h-8 w-8"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="5.5" fill="white" stroke="#2C3E50" />
              <path
                d="M6.92469 4.00083L6.44497 4C5.90605 4 5.55776 4.38638 5.55776 4.98441V5.43828H5.07543C5.03375 5.43828 5 5.47482 5 5.51989V6.17751C5 6.22256 5.03379 6.25907 5.07543 6.25907H5.55776V7.91844C5.55776 7.96351 5.59151 8 5.63319 8H6.26249C6.30417 8 6.33792 7.96345 6.33792 7.91844V6.25907H6.90187C6.94355 6.25907 6.9773 6.22256 6.9773 6.17751L6.97753 5.51989C6.97753 5.49825 6.96957 5.47752 6.95544 5.46221C6.94132 5.4469 6.92208 5.43828 6.90206 5.43828H6.33792V5.05353C6.33792 4.86859 6.37866 4.77472 6.60147 4.77472L6.92462 4.77459C6.96625 4.77459 7 4.73805 7 4.69303V4.08239C7 4.03741 6.9663 4.00092 6.92469 4.00083Z"
                fill="#2C3E50"
              />
            </svg>
          </a>

          <a href={shareOption[1].href} rel="noreferrer" target="_blank">
            <svg
              className="h-8 w-8"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="5.5" fill="white" stroke="#2C3E50" />
              <path
                d="M8 4.47326C7.85278 4.55357 7.69482 4.60804 7.52884 4.63236C7.6983 4.50742 7.82804 4.30925 7.88952 4.07385C7.73055 4.18955 7.55509 4.27356 7.36811 4.3191C7.2184 4.12247 7.00543 4 6.76922 4C6.31606 4 5.94863 4.45234 5.94863 5.00992C5.94863 5.089 5.95587 5.16624 5.96987 5.2401C5.288 5.19794 4.68337 4.79575 4.27869 4.18462C4.20795 4.33356 4.16771 4.50711 4.16771 4.69236C4.16771 5.04285 4.31269 5.3521 4.53265 5.53304C4.39817 5.52751 4.27169 5.48196 4.16097 5.40626V5.41887C4.16097 5.90815 4.44392 6.31647 4.81909 6.40941C4.75035 6.43218 4.67787 6.4448 4.60288 6.4448C4.5499 6.4448 4.49866 6.43833 4.44841 6.42604C4.55289 6.8276 4.85584 7.11961 5.21477 7.12762C4.93407 7.39843 4.58014 7.55935 4.19571 7.55935C4.12948 7.55935 4.06424 7.55443 4 7.54552C4.36318 7.83261 4.79435 8 5.25777 8C6.76724 8 7.59232 6.46081 7.59232 5.12594L7.58958 4.99516C7.7508 4.8536 7.89027 4.67574 8 4.47326Z"
                fill="#2C3E50"
              />
            </svg>
          </a>
        </div>
      )}

      <div>
        <div className="flex justify-center items-start feature-img-container">
          {featuredImg && featuredImg.large && (
            <Img
              width={800}
              height={500}
              loading="lazy"
              src={featuredImg.large}
              className="rounded-md mb-3 feature-img"
              alt={title.rendered}
            />
          )}
        </div>

        <div className="md:px-4 relative">
          <div
            className="post-content mt-8    md:pl-8 "
            dangerouslySetInnerHTML={{ __html: content ? content : "" }}
          ></div>
        </div>
        <div className="share-bottom justify-center">
          <div className="share flex flex-wrap  justify-center  md:px-8 sm:px-4 lg:pr-12 inset-y-0 left-0 w-25 flex-row gap-4">
            {shareOption &&
              shareOption.map((sh, i) => (
                <div
                  key={i}
                  className="w-12 h-12 flex flex-row text-xs  justify-center flex-wrap items-center rounded-full "
                >
                  <a href={sh.href} target="_blank" rel="noreferrer">
                    {sh.src ? (
                      <Img
                        width={28}
                        height={28}
                        src={sh.src}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      sh.label
                    )}
                  </a>
                </div>
              ))}
          </div>
        </div>
        {tags && (
          <div className="flex flex-wrap gap-4 my-4 px-4">
            <div>
              <a className="bg-gray-700 text-gray-200 uppercase border rounded-lg text-xs py-0.5 px-4">
                #tags
              </a>
            </div>
            {tags &&
              tags.map((tag) => (
                <div key={tag.term_id}>
                  <Link href={`/blog/tag/${tag.slug}`}>
                    <a
                      href={`/blog/tag/${tag.slug}`}
                      className="uppercase border rounded-lg text-xs py-0.5 px-4"
                    >
                      #{tag.name}
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        )}

        <p className="text-3xl font-bold text-gray-700">Others Also Read</p>
        <RelatedPosts relatedPosts={relatedPosts} />
      </div>
    </>
  );
}
