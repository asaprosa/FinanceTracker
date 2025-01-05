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
      setLoading(false);
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

      setExpenseList(result || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      setError("Failed to fetch expenses data");
    }
  };

  return (
    <div className="p-4 md:p-10">
      {/* Dashboard Header */}
      <h1 className="font-bold text-2xl md:text-3xl text-center md:text-left">Dashboard</h1>
      <p className="text-gray-500 text-sm md:text-base text-center md:text-left">
        Here's what's happening with your money, have a look
      </p>

      {/* Loading/Error */}
      {loading ? (
        <div className="text-center mt-5">Loading...</div>
      ) : error ? (
        <div className="text-red-500 mt-5 text-center">{error}</div>
      ) : (
        <CardInfo budgetList={budgetList} />
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Left Section: Charts & Table */}
        <div className="md:col-span-2 space-y-6">
          <BarChartDash budgetList={budgetList} />
          <ExpenseListTable
            expenseList={expenseList}
            refreshData={() => {
              getBudgetList();
            }}
          />
        </div>

        {/* Right Section: Latest Budget */}
        <div>
          <h2 className="font-bold text-lg text-center md:text-left mb-4">Latest Budget</h2>
          <div className="space-y-4">
            {budgetList.length > 0 ? (
              budgetList.map((budget, i) => <BudgetItems budget={budget} key={i} />)
            ) : (
              <p className="text-gray-500 text-center md:text-left">No budgets available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
