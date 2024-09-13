import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts'

import { ResponsiveContainer } from 'recharts'
function BarChartDash({budgetList}) {
  return (
    <div className='border rounded-md  p-5'>
        <h2 className='font-bold m-5 text-lg'>Activity</h2>
      <ResponsiveContainer width={'80%'} height={300}>
      <BarChart 
       width={500} height={300} data={budgetList} margin={{top:6}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSpend" stackId='a' fill="#00000" />
            <Bar dataKey="amount" stackId='a' fill="#C3C2FF" />
          </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDash
