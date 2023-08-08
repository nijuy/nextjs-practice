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

  const onUpdatePost = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`, options)
      .then((response) => response.json())
      .then((result) => {
        router.refresh()
        router.push(`/read/${result.id}`)
      })
  }

  useEffect(() => {
    fetch(`http://localhost:9999/topics/${id}`)
      .then((response) => response.json())
      .then((result) => {
        setTitle(result.title)
        setBody(result.body)
      })
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
