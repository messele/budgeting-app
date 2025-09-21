import { gql, type TypedDocumentNode } from "@apollo/client";

export type  budget =  {
    __typename: "Budget";
    id: string;
    name: string;
    amount: number;
    crte_dttm: string;
    status: string;
    end_dttm: string;
}


type GetAllBudgetQuery = {
    budgets: budget[];
}

type GetAllBudgetQueryVariables = Record<string, never>;

// This is of type 
export const GET_ALL_BUDGETS: 
    TypedDocumentNode<GetAllBudgetQuery, GetAllBudgetQueryVariables> = gql`
    query GetAllBudgets{
        budgets {
            id
            name
            amount
            crte_dttm
            status
            end_dttm
        }
}`;

