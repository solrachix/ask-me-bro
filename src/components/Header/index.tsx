import Link from 'next/link'
import { useState } from 'react'
import { useSpring, animated } from 'react-spring'

import Logo from '@/assets/logo.svg'
import MenuPoints from '@/assets/points.svg'
// import ChangeTheme from '@/assets/sun.svg'

import { useTheme } from '@/context/theme'

import { RoomCode } from '@/components/RoomCode/index'
import Button from '@/components/Button'
import { Container } from './styles'

interface HeaderProps {
  roomCode: string
  menuHeader: {
    title: string
    onClick(): void
  }[]
}
function Header({ roomCode, menuHeader }: HeaderProps): React.ReactElement {
  const { theme, changeTheme } = useTheme()
  const [openMenu, setOpenMenu] = useState(false)
  const [style, animate] = useSpring(() => ({
    transform: 'scale(0.8)',
    opacity: 0
  }))

  function handleChangeThemeClick() {
    changeTheme(theme.title === 'Dark' ? 'Light' : 'Dark')
  }

  const handleMenuButtonClick = () => {
    if (openMenu) {
      animate({ transform: 'scale(0.8)', opacity: 0, delay: 0 })
      setOpenMenu(false)
    } else {
      animate({ transform: 'scale(1)', opacity: 1, delay: 0 })
      setOpenMenu(true)
    }
  }
  return (
    <Container>
      <div className="content">
        <Link href="/">
          <Logo />
        </Link>

        <div>
          <RoomCode code={roomCode} />

          <Button className="menu-button" onClick={handleMenuButtonClick}>
            <MenuPoints />

            <animated.ul
              className="menu"
              style={style}
              onClick={e => e.stopPropagation()}
            >
              <li onClick={handleChangeThemeClick}>Alterar tema</li>

              {menuHeader.map(menu => (
                <li key={menu.title} onClick={menu.onClick}>
                  {menu.title}
                </li>
              ))}
            </animated.ul>
          </Button>
        </div>
        {/* <ChangeTheme onClick={handleChangeThemeClick} /> */}
      </div>
    </Container>
  )
}

export default Header
