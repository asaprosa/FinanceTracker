import React from 'react';
import { Trash } from 'lucide-react';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

export default function ExpenseListTable({ expenseList, refreshData }) {

    const deleteExp = async (expense) => {
        try {
            const result = await db.delete(Expenses)
                .where(eq(Expenses.id, expense.id))
                .returning();

            if (result.length > 0) {  // Ensure something was deleted
                refreshData();
                toast.success("Expense is deleted!");
            } else {
                toast.error("Failed to delete expense.");
            }
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast.error("An error occurred while deleting the expense.");
        }
    };

    return (
        <div className='mt-3'>
            {/* Table Header */}
            <h2 className="font-bold text-lg my-2">Latest Expense</h2>
            <div className='grid grid-cols-4 bg-slate-200 p-2'>
                <h2 className='font-bold'>Name</h2>
                <h2 className='font-bold'>Amount</h2>
                <h2 className='font-bold'>CreatedAt</h2>
                <h2 className='font-bold'>Action</h2>
            </div>

            {expenseList?.map((expense, i) => (
                <div key={i} className='grid grid-cols-4 bg-slate-50 p-2'>
                    <h2>{expense.name.charAt(0).toUpperCase() + expense.name.slice(1)}</h2>
                    <h2>{expense.amount}</h2>
                    {/* Format the date */}
                    <h2>{expense.createdAt}</h2>
                    <h2>
                        <Trash
                            onClick={() => deleteExp(expense)}
                            className='text-red-600 cursor-pointer'
                        />
                    </h2>
                </div>
            ))}
        </div>
    );
}
