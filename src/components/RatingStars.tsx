/** @format */
import { FC } from 'react'
import { useState } from 'react'

import {
  RatingStarsContainer,
  Star,
  FilledStar,
  HalfFilled,
  InputRating,
  MainSpan,
} from '../styled/RatingStarsStyles'

interface RatingStarsProps {
  rating?: number
  isInput: boolean
  onRatingChange?: (rating: number) => void
}

const RatingStars: FC<RatingStarsProps> = ({
  rating,
  isInput,
  onRatingChange,
}) => {
  const [ratingInput, setRatingInput] = useState(1)

  const handleInputBlur = () => {
    onRatingChange && onRatingChange(ratingInput)
  }

  return (
    <RatingStarsContainer>
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = (rating || ratingInput) - index

        return (
          <MainSpan key={index}>
            {starValue >= 0.8 && (
              <FilledStar data-testid='filled'>&#9733;</FilledStar>
            )}
            {starValue >= 0.3 && starValue < 0.8 && (
              <HalfFilled data-testid='half-filled'>&#9733;</HalfFilled>
            )}
            {starValue < 0.3 && <Star data-testid='empty'>&#9733;</Star>}
          </MainSpan>
        )
      })}
      {isInput && (
        <InputRating
          type='number'
          min={0}
          max={5}
          step={0.5}
          value={ratingInput.toString()}
          onChange={(event) => {
            const value = parseFloat(event.target.value)
            setRatingInput(isNaN(value) ? 0 : value)
          }}
          onBlur={handleInputBlur}
        />
      )}
      {rating || ''} {'/' + 5}
    </RatingStarsContainer>
  )
}

export default RatingStars
