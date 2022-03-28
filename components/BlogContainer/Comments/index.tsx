/* eslint-disable */

import React from 'react'
import AddComment from './AddComment'
import {Comment} from '../../../models/blog'
interface Props{
  comments:Comment[]
  renderDate:()=>void
  id:number
}
export default function index(props:Props) {
  const { comments, renderDate, id } = props

  return (
    <>
      <div>
        {comments.length > 0 && (
          <>
            <div className="text-2xl font-bold">
              {comments.length} Comment{comments.length > 1 && <span>s</span>}
            </div>
            {comments
              .filter(cmt => cmt.comment_approved == '1')
              .map(comment => (
                <div className="my-4">
                  <div
                    className="text-1xl font-semibold my-3"
                    dangerouslySetInnerHTML={{ __html: comment.comment_author }}
                  ></div>
                  <div
                    className="text-md my-3"
                    dangerouslySetInnerHTML={{
                      __html: comment.comment_content
                    }}
                  ></div>
                  <div className="flex mt-2">
                    <div className="text-xs">
                      {/* {renderDate()} */}
                    </div>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
      <AddComment id={id} comment={comments[0]} />
    </>
  )
}
