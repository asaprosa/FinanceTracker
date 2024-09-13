'use client'
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';

function page() {
    const [budgetList, setBudgetList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await getBudgetList();
    };
    fetchData();
  }, []);



  const getBudgetList = async () => {
    
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(result || []);
      getAllExpense();
    
    }

  const getAllExpense = async () => {
    
      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
          budgetId: Expenses.budgetId,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .orderBy(desc(Expenses.id));

        setExpenseList(result)
        
  
      // setExpenseList(result || []);
    
  };
  return (
    <div className='p-10'>
     <ExpenseListTable
            expenseList={expenseList}
            refreshData={() => {
              getBudgetList();
            }}
          />
    </div>
  )

}
export default page
