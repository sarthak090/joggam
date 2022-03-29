import React from "react";
import { PostData, Posts } from "../../models/blog";
import Link from "next/link";
import Image from "next/image";
interface Props {
  relatedPosts?: Posts[];
}
export default function RelatedPosts(props: Props) {
  const renderDate = (diff: any) => {
    if (diff !== undefined) {
      if (diff.y == 0) {
        return `${diff.m + 1} months ago`;
      } else {
        return `${diff.y} year ago`;
      }
    }
  };
  const { relatedPosts } = props;
  const posts = relatedPosts;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4  my-4">
      {posts &&
        posts.map((post: PostData, i) => (
          <div key={i}>
            <div className="grid  grid-cols-2 items-center    bg-cardBackground md:block     rounded-md ">
              <div className="bg-transparent m-0 border  ">
                <Image
                  // loader={myLoader}
                  src={post.featuredImg.large}
                  alt={post.title.rendered}
                  objectFit="fill"
                  width={500}
                  height={360}
                  layout="responsive"
                />
              </div>

              <div className=" py-2  text-white    ">
                <div className="hidden md:block">
                  {post.category.length > 0 &&
                    post.category.map((singleCat: any, i: number) => (
                      <Link key={i} href={`/blog/category/${singleCat.slug}`}>
                        <a
                          href={`/blog/category/${singleCat.slug}`}
                          className="uppercase font-bold text-sm tracking-widest text-brand	  mx-2"
                        >
                          <button className=" 	bg-btnClr my-2 px-3 py-1 rounded-md">
                            {" "}
                            <span
                              dangerouslySetInnerHTML={{
                                __html: singleCat.cat_name,
                              }}
                            ></span>
                          </button>
                        </a>
                      </Link>
                    ))}
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <a>
                    <p className="text-sm sm:text-md md:text-xl m-2 md:font-bold  ">
                      {post.title.rendered}
                    </p>
                  </a>
                </Link>
                <p className="text-sm hidden md:block m-2 ">
                  {post.excerpt.substring(0, 180)}{" "}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <a className="hidden md:block">
                    <p className="flex gap-2 text-green-500   md:font-medium	m-2">
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </p>
                  </a>
                </Link>

                <div className="flex items-center gap-1 m-2 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:h-6  md:w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xs "> {renderDate(post.diff)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
