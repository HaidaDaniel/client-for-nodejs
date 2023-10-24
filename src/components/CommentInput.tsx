/** @format */
import { FC } from 'react'
import { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'

import { RatingStars } from './'

import {
  StyledFormGroup,
  StyledFormLabel,
  StyledTextArea,
} from '../styled/CommentInputStyles'
import { postReview } from '../api'

interface CommentInputProps {
  productId: number
}

const CommentInput: FC<CommentInputProps> = ({ productId }) => {
  const [rating, setRating] = useState<number>(1)
  const [text, setText] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = {
      productId,
      rating,
      text,
    }

    const resultMessage = await postReview(data)

    setModalMessage(resultMessage)
    setShowModal(true)
    setRating(1)
    setText('')
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <StyledFormGroup>
          <StyledFormLabel>
            Review
            <RatingStars isInput onRatingChange={setRating} />
            <Button type='submit'>Send</Button>
          </StyledFormLabel>
          <StyledTextArea>
            <Form.Control
              as='textarea'
              placeholder='Enter review here ...'
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </StyledTextArea>
        </StyledFormGroup>
      </Form>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Review Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CommentInput
