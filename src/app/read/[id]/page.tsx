interface ReadProps {
  params: {
    id: string
  }
}
const Read = (props: ReadProps) => {
  return <>Read: {props.params.id}</>
}

export default Read
