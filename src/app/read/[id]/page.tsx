interface ReadProps {
  params: {
    id: string
  }
}
const Read = async (props: ReadProps) => {
  const response = await fetch(
    `http://localhost:9999/topics/${props.params.id}`
  )
  const topic = await response.json()

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
