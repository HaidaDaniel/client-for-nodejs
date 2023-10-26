import { FC, useEffect, useState } from 'react'
import { Stack } from 'react-bootstrap'
import { Comment } from './'
import { StyledCommentsBlock } from '../styled/CommentsBlockStyles'
import { IComment } from '../components/interfaces'
import { useParams } from 'react-router-dom'
import { fetchCommentsById } from '../api'

const CommentsBlock: FC = () => {
  const [comments, setComments] = useState<IComment[]>([])
  const { productId } = useParams()

  useEffect(() => {
    if (productId) {
      const id = parseInt(productId)
      const fetchData = async () => {
        try {
          const data = await fetchCommentsById(id)
          setComments(data)
        } catch (error) {
          console.error('Error fetching comments:', error)
        }
      }
      fetchData()
    }
  }, [productId])

  return (
    <StyledCommentsBlock>
      <div className='comment-block mt-2' data-testid='comments-block'>
        <h5>Customer Reviews :</h5>
        <Stack gap={3}>
          {comments && comments.length > 0 ? (
            comments.map((comment: IComment) => (
              <div key={comment.commentId} data-testid='comment'>
                <Comment
                  author={comment.author}
                  text={comment.text}
                  rating={comment.rating}
                  commentId={comment.commentId}
                  createdAt={comment.createdAt}
                />
              </div>
            ))
          ) : (
            <div>No review available. Be the first reviewer!</div>
          )}
        </Stack>
      </div>
    </StyledCommentsBlock>
  )
}

export default CommentsBlock
