import { Container, LoadingText } from '../styles/components/Loading'

import loading from '../assets/loading.svg'
import { animated, useSpring } from 'react-spring'
import { useEffect } from 'react'

export function Loading() {
  const [styles, api] = useSpring(() => ({
    from: { opacity: 1 },
  }))

  useEffect(() => {
    api({
      opacity: 0,
      loop: { reverse: true },
    })
  }, [api])

  return (
    <Container>
      <animated.img
        src={loading}
        style={styles}
        alt="Rick and Morty no espaço"
      />
      <LoadingText style={styles}>Loading</LoadingText>
    </Container>
  )
}
