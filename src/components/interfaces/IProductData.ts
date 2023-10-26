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
  _id?: string
  productId?: number
  author?: string
  text: string
  rating: number
  commentId: string
  createdAt: string
}

export interface IProductData {
  product: IProduct
}
export interface ICommentSend {
  productId: number
  text: string
  rating: number
}
