import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
const FullPizza: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pizza, setPizza] = React.useState<{
    imageUrl: string
    title: string
    price: number
  }>()
  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          'https://651a6b7c340309952f0d4341.mockapi.io/items/' + id
        )
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении пиццы')
        navigate('/')
      }
    }
    fetchPizzas()
  }, [])

  if (!pizza) {
    return 'Загрузка...'
  }
  return (
    <div>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  )
}
export default FullPizza
