import Link from 'next/link'
import { useState } from 'react'
import { useSpring, animated } from 'react-spring'

import { database } from '@/services/firebase'

import Logo from '@/assets/logo.svg'
import Twitch from '@/assets/twitch.svg'
import MenuPoints from '@/assets/points.svg'

import { useTheme } from '@/context/theme'

import Modal from '@/components/Modal'
import { RoomCode } from '@/components/RoomCode/index'
import Button from '@/components/Button'
import { Container, TwitchModal } from './styles'

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
  const [openModal, setOpenModal] = useState(false)
  const [style, animate] = useSpring(() => ({
    transform: 'scale(0.8)',
    opacity: 0
  }))

  const [channelName, setChannelName] = useState('')

  const isAdmin = window.location.pathname.includes('admin')

  function handleChangeThemeClick() {
    changeTheme(theme.title === 'Dark' ? 'Light' : 'Dark')
  }

  function handleMenuButtonClick() {
    if (openMenu) {
      animate({ transform: 'scale(0.8)', opacity: 0, delay: 0 })
      setOpenMenu(false)
    } else {
      animate({ transform: 'scale(1)', opacity: 1, delay: 0 })
      setOpenMenu(true)
    }
  }

  async function handleChanelName() {
    await database.ref(`rooms/${roomCode}`).update({
      twitchChannelName: channelName
    })

    setChannelName('')
    setOpenModal(false)
  }

  return (
    <>
      <Container>
        <div className="content">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>

          <div>
            <RoomCode code={roomCode} />

            {isAdmin && (
              <Button
                className="menu-button"
                onClick={() => setOpenModal(true)}
              >
                <Twitch />
              </Button>
            )}

            <Button className="menu-button" onClick={handleMenuButtonClick}>
              <MenuPoints />

              <animated.ul
                className="menu"
                style={style}
                onClick={e => e.stopPropagation()}
              >
                <li onClick={handleChangeThemeClick}>Alterar tema</li>

                {menuHeader?.map(menu => (
                  <li key={menu.title} onClick={menu.onClick}>
                    {menu.title}
                  </li>
                ))}
              </animated.ul>
            </Button>
          </div>
        </div>
      </Container>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <TwitchModal>
          <Twitch />
          <h1>Canal da Twitch</h1>
          <input
            type="text"
            value={channelName}
            onChange={e => setChannelName(e.target.value)}
          />
          <div className="buttons">
            <Button type="button" onClick={() => setOpenModal(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleChanelName}>
              Confirmar
            </Button>
          </div>
        </TwitchModal>
      </Modal>
    </>
  )
}

export default Header
