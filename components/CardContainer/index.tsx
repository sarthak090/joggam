import { PostData, Posts } from "../../models/blog";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Pagination from "../CardContainer/Pagination";
import { pagination } from "../../blog.config";

interface Props {
  posts?: Posts[];
}
export default function Index(props: Props) {
  const { posts } = props;
  const [postsData, setPostsData] = useState(posts);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * PAGINATION LOGIC
   */
  const [postsPerPage] = useState(pagination.postPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    postsData !== undefined
      ? postsData.slice(indexOfFirstPost, indexOfLastPost)
      : [];
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 10, behavior: "smooth" });
  };
  /**
   *
   * PAGINATION LOGIC ENDS
   *
   */
  useEffect(() => {
    setPostsData(posts);
    setIsLoaded(true);
  }, [posts]);
  const renderDate = (diff: any) => {
    if (diff !== undefined) {
      if (diff.y == 0) {
        return `${diff.m + 1} months ago`;
      } else {
        return `${diff.y} year ago`;
      }
    }
  };
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4  my-4">
        {currentPosts &&
          currentPosts.map((post: PostData) => (
            <div key={post.id}>
              <div className="  bg-cardBackground block     rounded-lg ">
                <Image
                  // loader={myLoader}
                  src={post.featuredImg.large}
                  alt={post.title.rendered}
                  // objectFit="cover"
                  className="rounded-lg"
                  width={500}
                  height={300}
                  layout="responsive"
                />

                <div className=" p-4 mb-4 text-white  ">
                  <div className="hidden md:block">
                    {post.category.length > 0 &&
                      post.category.map((singleCat: any, i) => (
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
                      <p className="text-xl my-2   font-semibold  ">
                        {post.title.rendered}
                      </p>
                    </a>
                  </Link>
                  <p
                    className="text-sm "
                    dangerouslySetInnerHTML={{
                      __html: `${post.excerpt.substring(0, 180)} .....`,
                    }}
                  ></p>
                  <Link href={`/blog/${post.slug}`}>
                    <a>
                      <p className=" gap-2 hidden md:flex text-brandGreen font-medium	my-2">
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

                  <div className="flex gap-1 my-3">
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span> {renderDate(post.diff)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center   my-8  ">
        {posts && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </div>
    </>
  );
}
