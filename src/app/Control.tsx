'use client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export const Control = () => {
  const params = useParams()
  const id = params.id

  const router = useRouter()

  const onDeletePost = () => {
    const options = { method: 'DELETE' }

    fetch(`http://localhost:9999/topics/${id}`, options)
      .then((response) => response.json())
      .then(() => {
        router.push('/')
        router.refresh()
      })
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
