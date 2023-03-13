import React, { useState } from 'react'
import Issues from './Issues'
import styled from 'styled-components'
import WebEditor from '../code/WebEditor'
import IssueDetail from './IssueDetail'
import { PlanProvider } from '../../context/plan_context'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { faker } from '@faker-js/faker'

const Plan = () => {
  return (
    <PlanProvider>
      <Wrapper>
        <Issues issues={issues} />
      </Wrapper>
    </PlanProvider>
  )
}

const Wrapper = styled.main`
  height: calc(100vh - 112px);
  background-color: white;
`

export default Plan

const issues = [
  {
    id: 1,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />, <CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 2,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 3,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
  {
    id: 4,
    summary: 'lorem Lorem ipsum dolor sit amet.',
    issue_type: [<CheckBoxIcon />],
    assignee: faker.internet.avatar(),
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae ab incidunt cupiditate nisi illo? Libero in at nihil vel maxime consequuntur fugiat voluptates. Incidunt quia natus quod veritatis iste dignissimos, veniam minus voluptatum perspiciatis eius, cum, fugiat numquam culpa nesciunt!',
    status: 'Test Status',
  },
]
