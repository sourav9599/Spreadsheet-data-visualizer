import React, { useContext } from 'react'

import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { faker } from '@faker-js/faker'

const PlanContext = React.createContext()

export const PlanProvider = ({ children }) => {
  return <PlanContext.Provider value={issues}>{children}</PlanContext.Provider>
}

export const usePlanContext = () => {
  return useContext(PlanContext)
}

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
