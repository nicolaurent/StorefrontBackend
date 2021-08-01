// @ts-ignore
import Client from '../database'

export type Order = {
    id?: Number;
    status: String;
    userId: Number;
    productId: Number;
    quantity: Number;
}

export class OrderStore {

    async create(o: Order): Promise<Order> {
        try {
      const sql = 'INSERT INTO orders (status, user_id, product_id, quantity) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn
          .query(sql, [o.status, o.userId, o.productId, o.quantity])
  
      const order = result.rows[0]
  
      conn.release()
  
      return order
        } catch (err) {
            throw new Error(`Could not add new order ${o.status} ${o.userId} ${o.productId} ${o.quantity}. Error: ${err}`)
        }
    }

    async index(): Promise<Order[]> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'SELECT * FROM orders'
      
          const result = await conn.query(sql)
      
          conn.release()
      
          return result.rows 
        } catch (err) {
          throw new Error(`Could not get orders. Error: ${err}`)
        }
      }
    
    async show(id: string): Promise<Order> {
        try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }
}