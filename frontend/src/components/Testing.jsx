import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/app_context'
import CircularProgress from '@mui/material/CircularProgress'

const Testing = () => {
  const [productData, setProductData] = useState([])
  const { loading, setLoading } = useAppContext()

  const getData = async () => {
    // ;<Loading />
    // fetch('https://dummyjson.com/carts')
    //   .then((res) => res.json())
    //   .then(console.log)
    try {
      setLoading(true)
      const response = await fetch('https://dummyjson.com/carts')
      const data = await response.json()
      setProductData(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return <>{loading && <CircularProgress />}</>
}

export default Testing
