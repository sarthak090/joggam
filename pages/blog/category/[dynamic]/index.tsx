/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import BlogContainer from "../../../../components/CardContainer";

import {
  GetStaticProps,
  NextPage,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import { Posts } from "../../../../models/blog";
type Props = {
  postsData: Posts[];
  error: boolean;
};
interface CategorySlug {
  categorySlug: string;
}
export const CategoryBySlug: NextPage<Props> = (props: Props) => {
  const { postsData, error } = props;

  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [categorySlug, setCategorySlug] = useState<CategorySlug | any>();
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showOverlay, setShowOverLay] = useState(false);

  const serachOverlay = () => {
    setShowOverLay(true);
  };

  useEffect(() => {
    if (error) {
      setErrorMsg("No Category Found With this name");
    }

    if (!router.isReady) return;
    if (router.query !== undefined) {
      setCategorySlug(router.query.dynamic);
    }
  }, [router, error]);

  const error404 = () => (
    <main className="flex flex-col md:flex-row items-center justify-center py-8 md:py-32 px-8">
      <img
        src="/images/product-pages/on-your-team.png"
        className="transform -translate-x-6 md:max-h-96 max-h-72 mr-4 mb-8"
      />

      <div className="block text-center text-black">
        <h2 className="text-9xl font-black mb-4">404</h2>
        <p className="md:text-xl font-semibold tracking-tight w-60">
          The page you are looking for does not exist
        </p>
      </div>
    </main>
  );
  if (!error) {
    return (
      <>
        <div className="pt-8 px-4 lg:px-20 container mx-auto container-blog text-gray-600">
          <BlogContainer
            // categorySlug={categorySlug}
            posts={postsData}
          />
        </div>
      </>
    );
  }
  return <>{error404()}</>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const catPath = ["editorial", "interview", "article"];
  const paths = catPath.map((post) => {
    return {
      params: { dynamic: post.toString() },
    };
  });
  return {
    paths,
    fallback: false,
    // paths:[{slug:}]
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const dynamic = ctx.params !== undefined ? ctx.params.dynamic : "404";
  const cat = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wp-json/wp/v2/categories?slug=${dynamic}`
  );
  console.log(dynamic);
  const posts = await cat.json();
  if (posts.length == 0) {
    return {
      props: {
        postsData: null,
        error: true,
      },
    };
  }
  const id = posts[0].id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_URL}/wp-json/wpr/v1/category/${id}`
  ).then();

  const postsData = await res.json();

  return {
    props: {
      postsData: postsData,
      error: false,
    },
  };
};

export default CategoryBySlug;
