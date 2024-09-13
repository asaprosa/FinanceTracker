'use client';
import React, { useEffect, useReducer, useState } from 'react';
import BudgetItems from '../../budgets/_components/BudgetItems'; // Ensure correct path
import { db } from '@/utils/dbConfig'; // Your database connection
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq, sql } from 'drizzle-orm';
import AddExpenses from '../_components/AddExpenses';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import {  Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';


function ExpensesComp({ params }) {
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpenseList] = useState([]);
  const route=useRouter();

  const deleteBug =async() =>{
    const deleteExp=await db.delete(Expenses)
    .where(eq(Expenses.budgetId,params.id)).returning()
   

    if(deleteExp){
      const result=await db.delete(Budgets).
      where(eq(Budgets.id,params.id)).
      returning();
    }

   
    toast('budget deleted');

    route.replace('/dashboard/budgets');
    
    


    
  }

  const getBudgetInfo = async () => {
    try {
      const result = await db
        .select({
          ...Budgets,
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);

      setBudgetInfo(result[0] || {}); // Ensure there's always a fallback value
    } catch (error) {
      console.error('Error fetching budget info:', error);
    }
  };

  const getExpenseList = async () => {
    try {
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .orderBy(desc(Expenses.id));
      
      setExpenseList(result);
    } catch (error) {
      console.error('Error fetching expenses list:', error);
    }
  };

  // Fetch budget and expenses data
  useEffect(() => {
    if (params.id) {
      getBudgetInfo();
      getExpenseList();
    }
  }, [params.id]);

  // Handler to refresh the expense list after adding an expense
  const refreshExpenseList = () => {
    getExpenseList();
  };

  return (
    <div className='p-10'>
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold flex justify-between items-center'>My Expenses</h2>
        <div className='flex gap-2'>
         
          <EditBudget budgetInfo={budgetInfo}
          refreshData={() =>{getBudgetInfo()}}/>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 text-primary" variant='destructive'><Trash /> Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='bg-slate-50'>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your budegt
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='bg-slate-100'>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>deleteBug()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
        {budgetInfo ? (
          <BudgetItems budget={budgetInfo} />
        ) : (
          <div className="w-[95%] bg-slate-200 rounded-lg h-[170px] animate-pulse m-3"></div>
        )}
        <AddExpenses budgetId={params.id} refreshData={refreshExpenseList} />
      </div>

      <div className='mt-5'>
        
        <ExpenseListTable expenseList={expensesList} refreshData={refreshExpenseList} />
      </div>
    </div>
  );
}

export default ExpensesComp;
