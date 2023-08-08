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
      <li>
        <Link href="/create"> create </Link>
      </li>
      {id && (
        <>
          <li>
            <Link href={`/update/${id}`}> update </Link>
          </li>
          <li>
            <input type="button" value="delete" onClick={onDeletePost} />
          </li>
        </>
      )}
    </ul>
  )
}
