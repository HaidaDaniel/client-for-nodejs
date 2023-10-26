/** @format */
import axios from 'axios'
import { IComment, IProduct, IProducts } from './components/interfaces/'

const PRODUCTS_URL: string | undefined = process.env.REACT_APP_PRODUCTS_URL
const PRODUCTS_URL_BY_ID: string | undefined =
  process.env.REACT_APP_PRODUCT_BY_ID_URL
const PRODUCTS_POST_URL_BY_ID: string | undefined =
  process.env.REACT_APP_PRODUCT_POST_BY_ID_URL
const COMMENT_URL_BY_ID: string | undefined =
  process.env.REACT_APP_COMMENT_URL_BY_ID

export const fetchProducts = async (): Promise<IProducts[]> => {
  try {
    const response = await fetch(PRODUCTS_URL as string)
    if (!response.ok) {
      throw new Error('Response is not OK')
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error in fetchProducts:', error)
    throw error
  }
}

export const fetchProductById = async (id: number): Promise<IProduct> => {
  try {
    const response = await fetch(`${PRODUCTS_URL_BY_ID}${id}`)
    if (!response.ok) {
      throw new Error('Response is not OK')
    }
    const data = await response.text()
    const jsonData = JSON.parse(data)
    return jsonData
  } catch (error) {
    console.error('Error in fetchProductById:', error)
    throw error
  }
}
export const fetchCommentsById = async (id: number): Promise<IComment[]> => {
  try {
    console.log(`${COMMENT_URL_BY_ID}${id}/comments`)
    const response = await axios.get(`${COMMENT_URL_BY_ID}${id}/comments`)

    if (response.status !== 200) {
      throw new Error('Response is not OK')
    }

    const jsonData = response.data

    const comments: IComment[] = jsonData

    return comments
  } catch (error) {
    console.error('Error in fetchCommentsById:', error)
    throw error
  }
}

interface ISendData {
  productId: number
  rating: number
  text: string
}

export async function postReview(data: ISendData) {
  try {
    const response = await fetch(
      (PRODUCTS_POST_URL_BY_ID as string) + data.productId,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    )

    if (response.ok) {
      return 'Review sent successfully'
    } else {
      return 'Error sending review'
    }
  } catch (error) {
    console.error('Error sending review:', error)
    return 'Error sending review'
  }
}
