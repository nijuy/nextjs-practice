interface UpdateProps {
  params: {
    id: string
  }
}
const Update = (props: UpdateProps) => {
  return <>Update: {props.params.id}</>
}

export default Update
