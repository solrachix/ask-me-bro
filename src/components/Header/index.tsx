import Link from 'next/link'

import Logo from '@/assets/logo.svg'
// import ChangeTheme from '@/assets/sun.svg'

// import { useTheme } from '@/contexts/theme'
import { Container } from './styles'
import { RoomCode } from '@/components/RoomCode/index'

function Header({ roomCode }: { roomCode: string }): React.ReactElement {
  // const { theme, changeTheme } = useTheme()

  function handleChangeThemeClick() {
    // changeTheme(theme.title === 'Dark' ? 'Light' : 'Dark')
  }
  return (
    <Container>
      <div className="content">
        <Link href="/">
          <Logo />
        </Link>
        <RoomCode code={roomCode} />

        {/* <ChangeTheme onClick={handleChangeThemeClick} /> */}
      </div>
    </Container>
  )
}

export default Header
