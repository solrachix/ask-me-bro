import React from 'react'
import Link from 'next/link'

import SmoothScrolling from '@/lib/react-smooth-scrolling'

import Template from '@/assets/template.svg'

import SEO from '@/components/SEO'
import { Container } from '@/styles/pages/Home'

export default function Home(): React.ReactElement {
  return (
    <Container>
      {/* <SmoothScrolling> */}
      <SEO title="Home" />
      <header>
        <img src="/images/icons/logo.svg" alt="Logo" />
        <Link href="/auth">
          <a>Login</a>
        </Link>
      </header>

      <main>
        <div className="title-box">
          <h1>
            Crie salas <br /> de Q&A
          </h1>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
          <button>Acessar</button>
        </div>

        <div className="template-container">
          <Template />
        </div>

        <div className="companies">
          <img src="/images/twitch.png" />
          <img src="/images/youtube.png" />
        </div>

        <div className="benefits">
          <h2>O que temos a oferecer</h2>
          <div>
            <div className="mini-card">
              <img src="/images/benefic-one.svg" alt="Primeiro beneficio" />
              <h5>Votação em comentários</h5>
              <span>
                Ganhe já um sistema de votação de comentários na sua live
              </span>
            </div>
            <div className="mini-card">
              <img src="/images/benefic-two.svg" alt="Segundo beneficio" />
              <h5>Sistema de Rankeamento de comentários</h5>
              <span>
                Quer responder só as melhores perguntas e as que o pessoal está
                mais em duvida?
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="content">
            <h3>Tire duvida da sua audiência em tempo real</h3>
            <span>
              Se você é criador de conteúdo se cadastre-se já, e responda o seu
              publico com 100% de eficiência.
            </span>
            <button>
              <span>Entrar agora</span>
            </button>
            <img src="/images/saly.png" alt="Homem" />
          </div>
        </div>
      </main>
      {/* </SmoothScrolling> */}
    </Container>
  )
}
