import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getErrorMessage } from '../utils/error'
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
        const { data } = await axios.get('/items/' + id)
        setPizza(data)
      } catch (error: unknown) {
        console.error(getErrorMessage(error))
        alert('Ошибка при получении пиццы')
        navigate('/')
      }
    }
    fetchPizzas()
  }, [])

  if (!pizza) {
    return 'Загрузкаа...'
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
