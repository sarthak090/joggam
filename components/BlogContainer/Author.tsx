import React from 'react'
import Link from 'next/link'
import {Author} from '../../models/blog'
interface AuthorProps{
  author:Author
}
export default function AuthorView(props:AuthorProps) {
  const {author}=props
  return (
    <div className="flex border my-4 p-4 rounded-md author-section flex-col lg:flex-row gap-8 lg:p-12">
      <div className="flex items-center gap-8 my-8 justify-center">
        <Link
          href={`/blog/author/${author.name
            .toLowerCase()
            .split(' ')
            .join('-')}-${author.id}`}
        >
          <a
            href={`/blog/author/${author.name
              .toLowerCase()
              .split(' ')
              .join('-')}-${author.id}`}
            className="author-name tracking-widest text-2xl capitalize font-bold"
          >
            <img
              className={'rounded-full w-48 h-48 '}
              alt={author.name}
              src={author.gravatar}
            />
          </a>
        </Link>
      </div>
      <div className="author-desc flex flex-col items-center justify-center md:items-start gap-4">
        <div>
          <Link
            href={`/blog/author/${author.name
              .toLowerCase()
              .split(' ')
              .join('-')}-${author.id}`}
          >
            <a
              href={`/blog/author/${author.name
                .toLowerCase()
                .split(' ')
                .join('-')}-${author.id}`}
              className="author-name tracking-widest text-2xl capitalize font-bold"
            >
              {author.name}
            </a>
          </Link>
        </div>

        <div>
          <p
            className="text-left md:text-center self-center"
            dangerouslySetInnerHTML={{ __html: author.description }}
          ></p>
        </div>
        <div className="w-full flex flex-wrap gap-4  ">
          {author && (
            <a href={'https://majordomo.com/'} target="_blank">
              <img src={'/images/share/wb.png'} className="w-12 h-12 object-contain" />
            </a>
          )}
          {author.facebook && (
            <a href={author.facebook} target="_blank">
              <img src={'/images/share/fb.png'} className="w-12 h-12 object-contain" />
            </a>
          )}

          {author.linkedin && (
            <a href={author.linkedin} target="_blank">
              <img src={'/images/share/lk.png'} className="w-12 h-12 object-contain" />
            </a>
          )}
          {author.twitter && (
            <a href={author.twitter} target="_blank">
              <img src={'/images/share/tw.png'} className="w-12 h-12 object-contain" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
