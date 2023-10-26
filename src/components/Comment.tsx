/** @format */
import { FC } from 'react'
import { RatingStars } from './'
import {
  StyledCard,
  StyledCardBody,
  StyledCardHeader,
  StyledCardText,
  StyledDateText
} from '../styled/CommentStyles'
import { IComment } from './interfaces'
import { format, parseISO } from 'date-fns'

const Comment: FC<IComment> = ({ text, rating, createdAt }) => {
  const formattedDate = format(parseISO(createdAt), 'MMMM dd, yyyy ')

  return (
    <StyledCard>
      <StyledCardHeader>
        <RatingStars rating={rating} isInput={false} />
      </StyledCardHeader>
      <StyledCardBody>
        <StyledCardText>{text}</StyledCardText>
        <StyledDateText>{formattedDate}</StyledDateText>
      </StyledCardBody>
    </StyledCard>
  )
}

export default Comment
