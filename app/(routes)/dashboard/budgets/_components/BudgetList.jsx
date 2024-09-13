'use client'
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { desc, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import BudgetItems from "./BudgetItems";

function BudgetList() {
  const [budgetList,setBudgetList] =useState([]);

  useEffect(() =>{
    getBudgetList();
  },[])
  const getBudgetList =async() =>{
    const result=await db.select({
      ...getTableColumns(Budgets),
      totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItem :sql `count(${Expenses.id})`.mapWith(Number)
    }) .from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id,Expenses.
      budgetId)).groupBy(Budgets.id)
      .orderBy(desc(Budgets.id))
      setBudgetList(result)

    console.log(result)
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <CreateBudget 
        refreshData={ ()=>{getBudgetList()}}/>
        {budgetList.length>0? budgetList.map((budget)=>
        <BudgetItems budget={budget}/>):
        [1,2,3,4,5,6].map((i)=>(
          <div className="w-[95%] bg-slate-200 rounded-lg h-[170px] animate-pulse m-3"></div>
        ))}
        
      </div>
    </div>
  );
}

export default BudgetList;
