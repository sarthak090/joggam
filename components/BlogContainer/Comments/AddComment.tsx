import axios from 'axios'
import React, { useState } from 'react'
import {Comment} from '../../../models/blog'

interface Props{
  id:number,
  comment:Comment
}
export default function AddComment(props:Props) {
  const { id, comment }=props
  const [comment_author, setName] = useState('')
  const [comment_author_email, setEmail] = useState('')
  const [comment_author_url, setWebsite] = useState('')
  const [comment_content, setComment] = useState('')
  const [msg, setMsg] = useState('')

  const handleCommentSubmit = (e:React.ChangeEvent<HTMLFormElement>):void => {
    e.preventDefault()  
    if (
      !comment_author ||
      !comment_author_email ||
      !comment_author_url ||
      !comment_content
    ) {
      console.log(`alll fields are required`)
      return
    }
    const data = {
      comment_author,
      comment_author_email,
      comment_author_url,
      comment_content,
      comment_post_ID: id
      // comment_parent: comment.comment_ID
    }
    const sendReqData:{} = {
      url: `${process.env.NEXT_PUBLIC_BLOG_URL}/wp-json/wpr/v1/add-comment-next`,
      data,
      method: 'POST'
    }
    axios(sendReqData).then(resp => {
      if (resp.data) {
        alert('Comment Added To This Post')
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <div className="my-4 border ">
          <textarea
            className="w-full py-2 px-4 focus:outline-none focus:ring focus:border-red"
            placeholder="Your Comment *"
            value={comment_content}
            required
            onChange={e => setComment(e.target.value)}
          />
        </div>
        <div className="my-4 border ">
          <input
            type="text"
            className="w-full py-2 px-4 focus:outline-none focus:ring focus:border-red"
            placeholder="Enter Your Name *"
            value={comment_author}
            required
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="my-4 border ">
          <input
            type="email"
            className="w-full py-2 px-4 focus:outline-none focus:ring focus:border-red"
            placeholder="Enter Your Email *"
            value={comment_author_email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-4 border ">
          <input
            type="text"
            className="w-full py-2 px-4 focus:outline-none focus:ring focus:border-red"
            placeholder="Enter Your Website *"
            value={comment_author_url}
            required
            onChange={e => setWebsite(e.target.value)}
          />
        </div>
        <div className="my-4  ">
          <button
            type="submit"
            className="rounded-full uppercase px-4 py-2 bg-gray-800 text-gray-200	 border font-sm w-full"
            placeholder="Enter Your Website *"
          >
            Send A Comment
          </button>
        </div>
      </form>
    </div>
  )
}
