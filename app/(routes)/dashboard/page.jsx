"use client";
import CardInfo from "./_components/CardInfo";
import React, { useEffect, useState } from "react";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BarChartDash from "./_components/BarChartDash";
import BudgetItems from "./budgets/_components/BudgetItems";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

function Dashboard() {
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
    try {
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
      await getAllExpense();
    } catch (error) {
      setError("Failed to fetch budget data");
    } finally {
      setLoading(false); // Ensure loading is turned off after fetching
    }
  };

  const getAllExpense = async () => {
    try {
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
        console.log(expenseList);
  
      // setExpenseList(result || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Failed to fetch expenses data");
    }
  };

  return (
    <div className="p-10">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <p className="text-gray-500">Here's what's happening with your money, have a look</p>

      {loading ? (
        <div className="text-center mt-5">Loading...</div>
      ) : error ? (
        <div className="text-red-500 mt-5">{error}</div>
      ) : (
        <CardInfo budgetList={budgetList} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 p-1">
        <div className="md:col-span-2">
          <BarChartDash budgetList={budgetList} />
          <ExpenseListTable
            expenseList={expenseList}
            refreshData={() => {
              getBudgetList();
            }}
          />
        </div>
        <div>
          <h2 className="font-bold pl-5 mb-5">Latest Budget</h2>
          {budgetList.length > 0 ? (
            budgetList.map((budget, i) => <BudgetItems budget={budget} key={i} />)
          ) : (
            <p className="pl-5">No budgets available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
