/** @format */
export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
  comments?: IComment[]
}
export interface IComment {
  author: string
  text: string
  rating: number
  commentId: string
}

export interface IProductData {
  product: IProduct
}
