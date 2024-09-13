import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/dbConfig";
import { toast } from "sonner";
import { Expenses } from "@/utils/schema";
import { Budgets } from "@/utils/schema";
import moment from "moment/moment";

function AddExpenses({budgetId,refreshData}) {
    const [name, setName] = useState(""); // Initialize with an empty string
  const [amt, setAmt] = useState("");
  const onCreateExpense = async () => {
    // Validate that name and amount are provided
    if (!name || !amt) {
      toast("Please provide a valid name and amount");
      return;
    }

    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: amt, // Make sure you're sending the correct amount
        createdAt:moment().format('DD/MM/YYYY'),
          budgetId:budgetId
        })
        .returning({ insertedId: Budgets.id });

      if (result) {
        refreshData()
        toast("New Expense created");
      }
    } catch (error) {
      console.error("Failed to create budget:", error);
      toast("Error creating expense");
    }
  };
  return (
    <div >
        
        <div className="p-5 rounded-lg border mt-5 ml-5">
        <h2 className="text-bold text-lg pb-2">Add new expense</h2>
        <div className="mt-2 ">
                    <h2 className="text-black font-medium my-1">Expense Name</h2>
                    <Input
                      placeholder="e.g. Bedrrom decor"
                      className="bg-slate-100"
                      onChange={(e) => setName(e.target.value)} // Correctly setting the name
                    />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-black font-medium my-1">
                    Expense Amount
                    </h2>
                    <Input
                      type="number"
                      placeholder="e.g. $10000"
                      className="bg-slate-100"
                      onChange={(e) => setAmt(e.target.value)} // Correctly setting the amount
                    />
                  </div>
    </div>
     <div className="item-centre">
         
      <Button 
      onClick={() => {
        onCreateExpense()
       

    }}
      className="mt-5 ml-10 w-[90%] ">Add new Expense</Button>
     </div>
    </div>
    
  );
}

export default AddExpenses;
