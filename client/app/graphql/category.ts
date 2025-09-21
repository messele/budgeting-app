import { gql, type TypedDocumentNode } from "@apollo/client";

export type  category =  {
    __typename: "Category";
    id: string;
    name: string;
    amount: number;
    crte_dttm: string;
    status: string;
    end_dttm: string;
}


type GetAllCategories = {
    categories: category[];
}

type GetAllCategoryQueryVariables = Record<string, never>;



// This is of type 
export const GET_ALL_CATEGORIES: 
    TypedDocumentNode<GetAllCategories, GetAllCategoryQueryVariables> = gql`
   query GetAllCategories{
   categories {
    id
    name
    description
  }
}`;

