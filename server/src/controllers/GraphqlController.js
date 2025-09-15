
import {pool} from '../util/db.js'

export class GraphqlController {

    constructor() {
        this.pool = pool
    }

    /**
     * Returns the Type Definition.ß
     */
    getType = () => {
        throw Error("Not Implemented")
    }

    /**
     * Returns the GrapQL schema
     */
    getQuery = () => { 
        throw Error("Not Implemented")
    }

    getMutation = () => {
        throw Error("Not Implemented")
    }

    /**
     * 
     */
    getResolvers = () => {
        throw Error("Not Implemented")
    }

    /** 
     * Runs DMS query on the db
     */
    execute = async (query, params) => {    
        try {
            const result = await this.pool.query(query, params)
            return result.rows
        } catch(err) {
            console.error(`Error executing query: ${query}`,err)
            throw new Error("Error executing query")
        }
    }


}
