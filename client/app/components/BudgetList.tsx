import { useQuery } from "@apollo/client/react";
import moment from "moment";
import _ from "lodash";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import "./budgetList.css";import { GET_ALL_BUDGETS } from "~/graphql/budget";


export default function BudgetList() {
  const { data, error, loading } = useQuery(GET_ALL_BUDGETS, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <div className="budget-list container w-full flex flex-wrap gap-4 justify-around">
        {_.map(data?.budgets, (budget) => {
          return (
            <Card className="card" key={budget.id}>
              <CardHeader className="card-header">{budget.name}</CardHeader>
              <CardContent className="card-content">
                Amount: {budget.amount}
              </CardContent>
              <CardFooter className="card-footer">{`Created on ${moment(budget.crte_dttm).format("DD/MM/YYYY")}`}</CardFooter>
            </Card>
          );
        })}
      </div>
      <div className="absolute">
      </div>
    </>
  );
}
