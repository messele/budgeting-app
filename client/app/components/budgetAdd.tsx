import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { GET_ALL_CATEGORIES } from "~/graphql/category";
import { useQuery } from "@apollo/client/react";
import _ from "lodash";
export default function BudgetAdd() {

  const {data} = useQuery(GET_ALL_CATEGORIES);
  return (
    <Dialog modal={true}>
      <form className="flex justify-center items-center">
        <DialogTrigger asChild>
          <Button variant="outline" className="m-auto">
            Add budget
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] m-auto bg-slate-100 p-4 opacity-100 shadow-lg rounded-md">
          <DialogHeader>
            <DialogTitle>Add New Budget</DialogTitle>
            <DialogDescription>Add new Budget and Save.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="category-1">Category</Label>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {
                        _.map(data?.categories, (category) => <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>)
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" placeholder="Budget Name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Description">Description</Label>
              <Input
                id="description-1"
                name="description"
                placeholder="Description"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="Amount">Amount</Label>
              <Input id="amount-1" name="amount" placeholder="amount" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
