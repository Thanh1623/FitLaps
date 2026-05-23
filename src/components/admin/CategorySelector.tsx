"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/CustomSelect";

export default function CategorySelector() {
  const [value, setValue] = useState("");

  return (
    <>
      <input type="hidden" name="category" value={value} required />
      <Select onValueChange={setValue} required>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Workout">Workout</SelectItem>
          <SelectItem value="Nutrition">Nutrition</SelectItem>
          <SelectItem value="Equipment">Equipment</SelectItem>
          <SelectItem value="Supplements">Supplements</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
