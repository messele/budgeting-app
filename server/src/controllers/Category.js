// import { pool } from "./db";

import { GraphqlController } from "./GraphqlController.js";

// GraphQL Schema
// This defines the structure of our API: the types and the queries.

export default class Category extends GraphqlController {
  getType = () => `
      type category {
        id: ID!
        name: String
        description: String
    }`;

  getQuery = () => `
      """Fetches a category by Id"""
      category(id: ID!): category

      """Fetches all categories"""
      categories: [category]
    `;

  getMutation = () => ` 
    """Creates a new Category"""
    createCategory(name: String!, description: String): category

    """Updates an existing category"""
    updateCategory(id:ID!, description:String): category

    """Deletes an existing budget"""
    deleteCategory(id: ID!): category
    `;

  getResolvers = () => ({
    categories: async () =>
      await this.execute(
        `SELECT * FROM public.budget_category`
      ),
    category: async ({ id }) => {
      const result = await this.execute("Select * from budget_category where id = $1", [
        id,
      ]);
      return result[0];
    },
    createCategory: async ({ name, description }) => {
      const result = await this.execute(
        `INSERT INTO budget (name, description) VALUES ($1, $2) RETURNING *`,
        [name, description]
      );
      return result[0];
    },
    updateCategory: async ({ id, description }) => {  
      const result = await this.execute(
        `UPDATE budget_category SET description = $1 WHERE id = $2 RETURNING *`,
        [description, id]
      );
      return result[0];
    },
    deleteCategory: async ({ id }) => {
        const result = await this.execute(
            "DELETE FROM budget_category WHERE id = $1 RETURNING *",
            [id]
        );
        return result[0];
    }
  });
}
