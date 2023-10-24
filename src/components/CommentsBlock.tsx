/** @format */
import { FC } from 'react'
import { Stack } from 'react-bootstrap'

import { Comment } from './'

import { StyledCommentsBlock } from '../styled/CommentsBlockStyles'
import { IComment } from '../components/interfaces'

interface CommentsBlockProps {
  comments: IComment[]
}

const CommentsBlock: FC<CommentsBlockProps> = ({ comments }) => (
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
              />
            </div>
          ))
        ) : (
          <div>No review available.Be the first reviewer!</div>
        )}
      </Stack>
    </div>
  </StyledCommentsBlock>
)

export default CommentsBlock
