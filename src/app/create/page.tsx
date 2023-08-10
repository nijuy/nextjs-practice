'use client'
import { Topic } from '@/types/serverData.type'
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
    const result: Topic = await response.json()

    router.refresh()
    router.push(`read/${result.id}`)
  }

  return (
    <>
      <form className="w-3/5 h-full" onSubmit={onSubmitPost}>
        <p>
          <input
            className="border-2 w-full mb-4 px-2"
            type="text"
            name="title"
            placeholder="글 제목을 입력해주세요"
          />
        </p>
        <p>
          <textarea
            className="border-2 w-full h-2/4 mb-4 px-2"
            name="body"
            placeholder="글 내용을 입력해주세요"
          ></textarea>
        </p>
        <div className="w-full flex justify-center items-center">
          <button className="border-sky-500 hover:bg-sky-500 border-2 rounded-full text-center text-sm px-4 py-0.5 mb-2">
            글쓰기
          </button>
        </div>
      </form>
    </>
  )
}

export default Create
