import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
   
    DialogFooter,
  } from "@/components/ui/dialog";
  import EmojiPicker from "emoji-picker-react";
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
 
function EditBudget({budgetInfo,refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojipicker, setOpenemojipicker] = useState(false);
  const [name, setName] = useState(); // Initialize with an empty string
  const [amt, setAmt] = useState(budgetInfo?.amount); // Initialize with an empty string

useEffect(() =>{
  setEmojiIcon(budgetInfo?.icon);
  setName(budgetInfo?.name);
  setAmt(budgetInfo?.amount)
},[budgetInfo])

  const onUpdateBudget =async() =>{
      const result=await db.update(Budgets).
      set({
        name:name,
        amount:amt,
        icon:emojiIcon
      }).where(eq(Budgets.id,budgetInfo.id)).returning();


      if(result){
        refreshData();
        toast('Budget updated')
      }

  }

  return (
    <div>
       



       <div>
      <Dialog>
        <DialogTrigger asChild>
        <Button className="flex gap-2"><Edit/> Edit</Button>
        </DialogTrigger>
        <div className="">
          <DialogContent className="bg-slate-100">
            <DialogHeader>
              <DialogTitle className="spacing-">Update budget</DialogTitle>
              <DialogDescription>
                <div className="mt-5 ">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg bg-slate-300 border-none"
                    onClick={() => {
                      setOpenemojipicker(!openEmojipicker);
                    }}
                  >
                    {emojiIcon}
                  </Button>
                  <div className="absolute z-20">
                    <EmojiPicker
                      open={openEmojipicker}
                      onEmojiClick={(e) => {
                        setEmojiIcon(e.emoji);
                        setOpenemojipicker(false);
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-black font-medium my-1">Budget Name</h2>
                    <Input
                    defaultValue={budgetInfo?.name}
                      placeholder="e.g. Home decor"
                      className="bg-slate-100"
                      onChange={(e) => setName(e.target.value)} // Correctly setting the name
                    />
                  </div>
                  <div className="mt-2">
                    <h2 className="text-black font-medium my-1">
                      Budget Amount
                    </h2>
                    <Input
                    
                      type="number"
                      placeholder="e.g. $5000"
                      defaultValue={budgetInfo?.amount}
                      className="bg-slate-100"
                      onChange={(e) => setAmt(e.target.value)} // Correctly setting the amount
                    />
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button
                  onClick={() => onUpdateBudget()}
                  className="mt-5 w-full"
                >
                  Update Budget
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>
    </div>
  )
}

export default EditBudget
