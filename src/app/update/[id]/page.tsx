'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface UpdateProps {
  params: {
    id: string
  }
}

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
    const result = await response.json()

    router.refresh()
    router.push(`/read/${result.id}`)
  }

  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`http://localhost:9999/topics/${id}`)
      const result = await response.json()

      setTitle(result.title)
      setBody(result.body)
    }

    getPost()
  }, [])

  return (
    <>
      <form onSubmit={onUpdatePost}>
        <p>
          <input
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
            name="body"
            placeholder="글 내용을 입력해주세요"
            value={body}
            onChange={(textAreaEvent) => {
              setBody(textAreaEvent.target.value)
            }}
          ></textarea>
        </p>
        <button> 수정하기 </button>
      </form>
    </>
  )
}

export default Update
