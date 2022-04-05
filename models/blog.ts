export interface Posts {
  id: number;
  title: Title;
  diff: object;
  slug: string;
  content: string;
  featuredImg: FeaturedImg;
  category: Category[];
  author: Author;
  totalComments: string;
  publishedDate: Date;
  tags: Tag[];
  excerpt: string;
  publishDate: any;
}

export interface Title {
  rendered: string;
}
export interface PostData {
  id: number;
  title: Title;
  diff: object;
  slug: string;
  content: string;
  featuredImg: FeaturedImg;
  category: Category[];
  author: Author;
  totalComments: string;
  publishedDate: Date;
  tags: Tag[];
  excerpt: string;
  publishDate: any;
}
export interface BlogProps {
  totalComments?: string;
  slug?: string;
  id?: number;
  content?: string;
  title?: any;
  category?: Category[];
  featuredImg?: FeaturedImg;
  excerpt?: string;
  author?: Author;
  publishDate?: any;
  diff?: any;
  comments?: Comment[];
  tags?: Tag[];
}
export interface FeaturedImg {
  thumbnail: string;
  medium: string;
  large: string;
}
export interface TaxnomyProps {
  postsData: Posts[];
  error: boolean;
}
export interface Category {
  name: string;
  slug: string;
  term_id: number;
  cat_ID: number;
}
export interface Tag {
  name: string;
  slug: string;
  term_id: number;
}

export interface Comment {
  comment_approved: string;
  comment_author: string;
  comment_content: string;
  comment_date: string;
}

export type Author = {
  name: string;
  id: string;
  description: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  github: string;
  instagram: string;
  gravatar: string;
};
