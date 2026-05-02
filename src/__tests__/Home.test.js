import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'

import pizzaReducer from '../components/redux/slices/pizzaSlice'
import filterReducer from '../components/redux/slices/filterSlice'
import cartReducer from '../components/redux/slices/cartSlice'
import { jest } from '@jest/globals'
import Home from '../pages/Home'

jest.mock('axios')
const mockedAxios = axios

const createTestStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      pizza: pizzaReducer,
      cart: cartReducer,
    },
  })
}

const renderWithProviders = (store) => {
  return render(
    <Provider store={store}>
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <Home />
      </MemoryRouter>
    </Provider>,
  )
}

describe('Home component', () => {
  let response
  beforeEach(() => {
    response = {
      data: [
        {
          id: '1',
          title: 'Пепперони',
          price: 500,
          imageUrl: '',
          sizes: [26, 30, 40],
          types: [0, 1],
        },
        {
          id: '2',
          title: 'Сырная',
          price: 400,
          imageUrl: '',
          sizes: [30, 40],
          types: [0, 1],
        },
      ],
    }
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('Render pizza lists and Categories/Sort components', async () => {
    const store = createTestStore()

    mockedAxios.get.mockResolvedValue(response)

    renderWithProviders(store)

    expect(await screen.findByText('Пепперони')).toBeInTheDocument()
    expect(await screen.findByText('Сырная')).toBeInTheDocument()

    expect(screen.getByText(/острые/i)).toBeInTheDocument()
    expect(screen.getByText(/мясные/i)).toBeInTheDocument()

    expect(screen.getByText(/сортировка по/i)).toBeInTheDocument()

    expect(screen.getByText(/популярности/i)).toBeInTheDocument()

    const activeItem = screen.getByText('Все')
    expect(activeItem).toHaveClass('active')
  })

  test('shows loading state', () => {
    const store = createTestStore()

    mockedAxios.get.mockImplementation(() => new Promise(() => {}))

    renderWithProviders(store)

    const skeletons = screen.getAllByTestId('skeleton')
    expect(skeletons.length).toBeGreaterThan(0)
  })

  test('shows error message', async () => {
    const store = createTestStore()

    // имитация ошибка АПИ
    mockedAxios.get.mockRejectedValue(new Error('Network Error'))

    renderWithProviders(store)

    expect(await screen.findByText(/произошла ошибка/i)).toBeInTheDocument()
  })
})
