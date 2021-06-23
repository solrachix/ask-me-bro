import { Button } from './styles'

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps): React.ReactElement {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <Button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src="/images/icons/copy.svg" alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </Button>
  )
}
