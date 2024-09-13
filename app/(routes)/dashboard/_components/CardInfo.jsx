import React, { useEffect, useState } from 'react'
import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'

function CardInfo({ budgetList }) {
  const [totalBud, setTotalBud] = useState(0) // Initialize with 0
  const [totalSpend, setTotalSpend] = useState(0) // Add state for totalSpend

  const calCardInfo = () => {
    
    let totalBud_ = 0
    let totalSpend_ = 0

    // Use `forEach` on `budgetList` directly
    budgetList.forEach(element => {
      totalBud_ = totalBud_ + Number(element.amount || 0)
      totalSpend_ = totalSpend_ + (element.totalSpend || 0) // Handle potential null/undefined values
    })

    setTotalBud(totalBud_)
    setTotalSpend(totalSpend_)
    
  }

  useEffect(() => {
    if (Array.isArray(budgetList) && budgetList.length > 0) {
      calCardInfo()
    }
  }, [budgetList]) // Add budgetList as a dependency to recalculate when it changes

  return (
    <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm'>Total Budget</h2>
          <h2 className='font-bold text-2xl'>${totalBud}</h2> {/* Render calculated total budget */}
        </div>
        <PiggyBank className='bg-primary p-3 h-12 w-12 rounded-full text-white'></PiggyBank>
      </div>
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm'>Total Spend</h2>
          <h2 className='font-bold text-2xl'>${totalSpend}</h2> {/* Render calculated total spend */}
        </div>
        <ReceiptText className='bg-primary p-3 h-12 w-12 rounded-full text-white'></ReceiptText>
      </div>
      <div className='p-7 border rounded-lg flex items-center justify-between'>
        <div>
          <h2 className='text-sm'>No. of Budgets</h2>
          <h2 className='font-bold text-2xl'>{budgetList?.length}</h2> {/* Render the number of budgets */}
        </div>
        <Wallet className='bg-primary p-3 h-12 w-12 rounded-full text-white'></Wallet>
      </div>
    </div>
  )
}

export default CardInfo
