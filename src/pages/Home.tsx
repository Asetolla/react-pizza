import { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import qs from 'qs'
// import axios from 'axios'
import Categories from '../components/Categories'

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../components/redux/slices/filterSlice'
import Sort, { lists } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import {
  SearchPizzaParams,
  fetchPizzas,
  selectPizzaData,
} from '../components/redux/slices/pizzaSlice'
import { useAppDispatch } from '../components/redux/store'
import React from 'react'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const { sort, categoryId, currentPage, searchValue } =
    useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)
  const navigate = useNavigate()
  const isSearch = useRef(false)
  const isMounted = useRef(false)
  // const [categoryId, setCategoryId] = useState(0)
  // const [currentPage, setCurrentPage] = useState(1)

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''
    // await axios
    //   .get(
    //     `https://651a6b7c340309952f0d4341.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   .then((response) => {
    //     setItems(response.data)
    //     setIsLoading(false)
    //   })
    dispatch(
      fetchPizzas({
        category,
        order,
        sortBy,
        search,
        currentPage: String(currentPage),
      })
    )
  }
  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort.sortProperty, currentPage])
  // если был первый рендер, проверяем URL-параметр и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams
      const sort = lists.find((list) => list.sortProperty === params.sortBy)
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || lists[0],
        })
      )
      isSearch.current = true
    }
  }, [])
  // если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    console.log('isSearch', isSearch)
    window.scrollTo(0, 0)
    if (!isSearch.current) {
      getPizzas()
    }
    isSearch.current = false
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ))
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))
  useEffect(() => {
    if (
      window.location.search ===
      '?sortProperty=rating&categoryId=0&currentPage=1'
    ) {
      getPizzas()
    }
  }, [])
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error_info">
          <h2> Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}
export default Home
