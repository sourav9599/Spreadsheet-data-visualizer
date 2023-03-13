import React from 'react'
import styled from 'styled-components'

const Card = ({ id, summary, issue_type, assignee }) => {
  return (
    <Wrapper>
      <p>{summary}</p>
      <div className='task-info'>
        <div className='icons'>{issue_type.map((type) => type)}</div>
        <div className='avatar'>
          <img src={assignee} alt='avatar' />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding: 8px;

  .avatar > * {
    heigth: 1.5rem;
    width: 1.5rem;
    border-radius: 50%;
  }

  .task-info {
    display: flex;
    justify-content: space-between;
  }
`

export default Card
