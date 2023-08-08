'use client'
import { useRouter } from 'next/navigation'

const Create = () => {
  const router = useRouter()

  const onSubmitPost = async (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault()

    const target = formEvent.target as HTMLFormElement
    const title = (target.title as unknown as HTMLInputElement).value
    const body = (target.title as unknown as HTMLTextAreaElement).value

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/topics`,
      options
    )
    const result = await response.json()

    router.refresh()
    router.push(`read/${result.id}`)
  }

  return (
    <>
      <form onSubmit={onSubmitPost}>
        <p>
          <input
            type="text"
            name="title"
            placeholder="글 제목을 입력해주세요"
          />
        </p>
        <p>
          <textarea name="body" placeholder="글 내용을 입력해주세요"></textarea>
        </p>
        <button> 글쓰기 </button>
      </form>
    </>
  )
}

export default Create
