import Link from 'next/link'
import React from 'react'


function BudgetItems({budget}) {
  const calProg =() =>{
    const per=(budget.totalSpend/budget.amount)*100;
    return per.toFixed(2);
  }
  return (
    
    <Link href={'/dashboard/expenses/' +budget?.id} >
      <div className='border rounded-lg  gap-3 ml-4 mb-2 hover:shadow-md cursor-pointer h-[170px]'> 
      <div className='flex gap-2 items-center ml-4 justify-between '  >
      <div className='flex gap-2 items-center ml-4 pt-3'>
        <h2 className='text-3xl bg-slate-100 rounded-full item '>{budget?.icon}</h2>
        <div className='pl-3'>
           <h2 className='font-bold'> {budget?.name}</h2>
           <h2 className='text-sm text-gray-600'>{budget?.totalItem} Item</h2>
           

        </div>
        
      </div >
      <h2 className='px-5 font-bold text-primary text-lg'> ${budget?.amount}</h2>
      
      </div>
        <div className="mt-5 p-7 mb-1">
            <div className='flex justify-between'>
                <h2 className='text-xs text-slate-400 pb-2'>${budget?.totalSpend?budget.totalSpend:0} Spend</h2>
                <h2 className='text-xs text-slate-400 pb-2 flex'>${budget?.amount-budget?.totalSpend} Reamaning</h2>
            </div>
        <div className='w-full bg-slate-300 h-2 rounded-full'>
        <div className='bg-primary h-2 rounded-full'
        style={{width:`${calProg()}%`}}></div>
        </div>
        
        </div>
      </div>
       
     
    </Link>
  )
}

export default BudgetItems
