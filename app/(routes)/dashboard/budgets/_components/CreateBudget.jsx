"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Budgets } from "@/utils/schema";
import { toast } from "sonner";
import { db } from "@/utils/dbConfig";

function CreateBudget({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("😸");
  const [openEmojipicker, setOpenemojipicker] = useState(false);
  const [name, setName] = useState(""); // Initialize with an empty string
  const [amt, setAmt] = useState(""); // Initialize with an empty string

  const onCreateBudget = async () => {
    // Validate that name and amount are provided
    if (!name || !amt) {
      toast("Please provide a valid name and amount");
      return;
    }

    try {
      const result = await db
        .insert(Budgets)
        .values({
          name: name,
          amount: amt, // Make sure you're sending the correct amount
          icon: emojiIcon,
        })
        .returning({ insertedId: Budgets.id });

      if (result) {
        refreshData();
        toast("New Budget created");
      }
    } catch (error) {
      console.error("Failed to create budget:", error);
      toast("Error creating budget");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          {/* Adjusted this div to match the styling of other budget items */}
          <div className="bg-white shadow-lg rounded-lg p-5 mx-3 flex items-center justify-center flex-col text-center hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer w-110 h-40 ">
            <h2 className="text-4xl">+</h2>
            <h2 className="text-lg font-bold">Create New Budget</h2>
          </div>
        </DialogTrigger>
        <div className="">
          <DialogContent className="bg-slate-100">
            <DialogHeader>
              <DialogTitle className="spacing-">Create new budget</DialogTitle>
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
                      className="bg-slate-100"
                      onChange={(e) => setAmt(e.target.value)} // Correctly setting the amount
                    />
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button onClick={() => onCreateBudget()} className="mt-5 w-full">
                  Create Budget
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
