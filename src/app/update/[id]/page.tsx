'use client'
import { Topic } from '@/types/serverData.type'
import { ComponentProps as UpdateProps } from '@/types/component.type'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const Update = (props: UpdateProps) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const id = props.params.id
  const router = useRouter()

  const onUpdatePost = async (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`,
      options
    )
    const result: Topic = await response.json()

    router.refresh()
    router.push(`/read/${result.id}`)
  }

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:9999/topics/${id}`)
      const result: Topic = await response.json()

      setTitle(result.title)
      setBody(result.body)
    }

    getPost()
  }, [id])

  return (
    <>
      <form className="w-3/5 h-full" onSubmit={onUpdatePost}>
        <p>
          <input
            className="border-2 w-full mb-4 px-2"
            type="text"
            name="title"
            placeholder="글 제목을 입력해주세요"
            value={title}
            onChange={(inputEvent) => {
              setTitle(inputEvent.target.value)
            }}
          />
        </p>
        <p>
          <textarea
            className="border-2 w-full h-2/4 mb-4 px-2"
            name="body"
            placeholder="글 내용을 입력해주세요"
            value={body}
            onChange={(textAreaEvent) => {
              setBody(textAreaEvent.target.value)
            }}
          ></textarea>
        </p>
        <div className="w-full flex justify-center items-center">
          <button className="border-green-500 hover:bg-green-500 border-2 rounded-full text-center text-sm px-4 py-0.5 mb-2">
            수정하기
          </button>
        </div>
      </form>
    </>
  )
}

export default Update
