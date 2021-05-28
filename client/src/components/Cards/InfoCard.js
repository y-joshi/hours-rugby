import React from 'react'
import { Card, CardBody, Button } from '@windmill/react-ui'

function InfoCard({ title, value, children: icon }) {
  return (
    <Card>
      <CardBody className="flex items-center">
        {icon}
        <div>
          <div>
            <Button layout="link" size="small">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            </Button>
          </div>
          <div>
            <Button layout="link" size="small">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</p>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default InfoCard
