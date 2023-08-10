import { Topic } from '@/types/serverData.type'
import { ComponentProps as ReadProps } from '@/types/component.type'

const Read = async (props: ReadProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/topics/${props.params.id}`,
    { cache: 'no-store' }
  )
  const topic: Topic = await response.json()

  return (
    <>
      <article className="border-2 w-3/5 min-h-60 mb-4 p-4">
        <h2 className="text-2xl font-bold">{topic.title}</h2>
        <br />
        <p>{topic.body}</p>
      </article>
    </>
  )
}

export default Read
