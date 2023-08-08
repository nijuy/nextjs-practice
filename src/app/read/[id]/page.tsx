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
      <article>
        <h2>{topic.title}</h2>
        <p>{topic.body}</p>
      </article>
    </>
  )
}

export default Read
