import {
  PlanetTitle,
  PlanetDescription,
  DimensionDescription,
  Residents,
} from '../../../styles/components/Modal/ModalViewCharacter/Planet'
import { FiUsers } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { Dimension } from '../../../interfaces/Dimension'
import { Character } from '../../../interfaces/Characters'
import { api } from '../../../services/api'

interface PlanetProps {
  character: Character
  localType: string
}

const defaultDimension: Dimension = {
  type: 'unknown',
  dimension: 'unknown',
  name: 'unknown',
  residents: [],
}

export function Planet({ character, localType }: PlanetProps) {
  const [dimension, setDimension] = useState<Dimension>({} as Dimension)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getLocationDimension() {
      if (character[localType] && character[localType].url) {
        try {
          const response = await api.get(`${character.location.url}`)

          setDimension(response.data)
          setLoading(false)
        } catch {}
      } else {
        setDimension(defaultDimension)
        setLoading(false)
      }
    }

    getLocationDimension()
  }, [character, localType])

  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <PlanetTitle>{dimension.type}</PlanetTitle>
          <PlanetDescription>{dimension.name}</PlanetDescription>
          <DimensionDescription>{dimension.dimension}</DimensionDescription>
          <Residents>
            <FiUsers />
            {dimension.residents.length}{' '}
            {dimension.residents.length > 1 ? 'residents' : 'resident'}
          </Residents>
        </>
      )}
    </>
  )
}
