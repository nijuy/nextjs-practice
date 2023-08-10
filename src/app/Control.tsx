'use client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export const Control = () => {
  const params = useParams()
  const id = params.id

  const router = useRouter()

  const onDeletePost = async () => {
    const options = { method: 'DELETE' }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/topics/${id}`,
      options
    )
    await response.json()

    router.push('/')
    router.refresh()
  }

  return (
    <ul>
      <li className="border-sky-500 hover:bg-sky-500 border-2 rounded-full text-center text-sm px-4 py-0.5 mb-2">
        <Link href="/create"> 글쓰기 </Link>
      </li>
      {id && (
        <>
          <li className="border-green-500 hover:bg-green-500 border-2 rounded-full text-center text-sm px-4 py-0.5 mb-2">
            <Link href={`/update/${id}`}> 수정하기 </Link>
          </li>
          <li className="border-rose-500 hover:bg-rose-500  border-2 rounded-full text-center text-sm px-4 py-0.5 mb-2">
            <input type="button" value="삭제하기" onClick={onDeletePost} />
          </li>
        </>
      )}
    </ul>
  )
}
