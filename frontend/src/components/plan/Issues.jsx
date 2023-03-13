import React, { useState } from 'react'
import styled from 'styled-components'

import Card from './Card'
import { usePlanContext } from '../../context/plan_context'
import IssueDetail from './IssueDetail'
import WebEditor from '../code/WebEditor'

const Issues = ({ issues }) => {
  const [toggleIssue, setToggleIssue] = useState(true)

  return (
    <Wrapper>
      <div className='issue-list'>
        <h6>Backlog 4</h6>
        <ul>
          {issues.map((issue, idx) => {
            return (
              <li key={idx}>
                <Card {...issue} />
              </li>
            )
          })}
        </ul>
      </div>
      {toggleIssue && (
        <div className='issue'>
          <div className='issue-detail'>
            <IssueDetail />
          </div>
          <div className='editor'>
            <WebEditor />
          </div>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 26rem auto;
  .issue-list {
    background-color: #f4f5f7;
    width: 26rem;
    padding: 0.5rem;
    height: calc(100vh - 112px);
    h6 {
      margin-bottom: 1rem;
      color: #5e6c84;
    }

    ul {
      list-style: none;
      display: grid;
      gap: 4px;
      overflow-y: scroll;
      height: 95%;
    }
  }

  .issue {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .editor {
      height: 50%;
    }
  }
`

export default Issues
