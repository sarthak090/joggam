import React, { useEffect, useState } from "react";
import Link from "next/link";
import Img from "next/image";
// import Comments from "./Comments";
import ShareOption from "./ShareOption";
// import AuthorView from "./Author";
import RelatedPosts from "./RelatedPosts";
export default function BlogPost(props) {
  const [shareOption, setShareOption] = useState([]);
  const [imgOverlay, setImgOverlay] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const {
    title,
    id,
    content,
    featuredImg,
    publishDate,
    author,
    category,
    comments,
    tags,
    diff,
    relatedPosts,
  } = props;

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
  const imgFull = (e) => {
    setSelectedImg(e.target.src);
    setImgOverlay(true);
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
    const allImg = document.querySelectorAll("img");

    allImg.forEach((img) => {
      if (img.parentElement && img.parentElement.href == undefined) {
        img.addEventListener("click", imgFull);
      }
    });
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
        // style={{ fontSize: '3rem' }}
      ></h1>

      {publishDate && renderDate()}
      <ShareOption shareOption={shareOption} />

      {imgOverlay && (
        <div className="overlay-z" onClick={() => setImgOverlay(false)}>
          <div className="flex justify-end">
            <button
              onClick={() => setImgOverlay(false)}
              className="w-8 h-8  bg-red-400 rounded-full text-center focus:outline-none self-center my-4"
            >
              X
            </button>
          </div>
          {/* 
          <div className=" overlay-img-container">
            {featuredImg && featuredImg.large && (
              <Img
                loading="lazy"
                src={selectedImg}
                className="rounded-md mb-3 feature-img"
                alt={title.rendered}
              />
            )}
          </div> */}
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
        {/* <div className="uppercase font-bold text-sm tracking-widest text-brand my-4	  flex flex-wrap">
          {category &&
            category.length > 0 &&
            category.map((cat) => (
              <>
                <Link href={`/blog/category/${cat.slug}`}>
                  <a
                    href={`/blog/category/${cat.slug}`}
                    className="mr-2 my-2 cursor-pointer"
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: cat.cat_name }}
                    ></span>
                  </a>
                </Link>
              </>
            ))}
        </div> */}

        {/* <div className="flex flex-col relative lg:flex-row gap-4 md:gap-8 ">
          <div
            className="flex items-center gap-4 text-xs md:text-lg  justify-start my-4"
            style={{ color: "#8e8e8e" }}
          >
            {author && (
              <>
                <span className={"mr-2"}>{author.name}</span>
              </>
            )}
            {comments && comments.length > 0 && (
              <div className="comment">{comments.length} comments</div>
            )}
          </div>
        </div> */}
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
        {/* {author && <AuthorView author={author} />}
        {comments && (
          <Comments comments={comments} renderDate={renderDate} id={id} />
        )} */}
        <p className="text-3xl font-bold text-gray-700">Others Also Read</p>
        <RelatedPosts relatedPosts={relatedPosts} />
      </div>
    </>
  );
}
