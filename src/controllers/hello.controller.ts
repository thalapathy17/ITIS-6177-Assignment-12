import {del, get, param, post, put, requestBody} from '@loopback/rest';

export class HelloController {

  private data: string[] = [];  // Array to hold data for this example

  @get('/hello')
  hello(): string {
    return 'Hello world!';
  }

  // Create: POST request to add a new item to the data array
  @post('/hello')
  async createItem(@requestBody() request: {newItem: string}): Promise<string> {
    const {newItem} = request;

    // Add the new item to the list (or database)
    this.data.push(newItem);
    console.log(this.data); // Log the array to verify the data
    return `Item added: ${newItem}`;
  }

  // Read: GET request to fetch all items
  @get('/hello/items')
  getAll(): string[] {
    console.log(this.data); // Log to check if the data is available
    return this.data;
  }

  // Update: PUT request to update an item at a specific index
  @put('/hello/items/{id}')
  update(
    @param.path.number('id') id: number,
    @requestBody() updatedItem: string
  ): string {
    if (id >= this.data.length || id < 0) {
      return `Invalid ID. Please provide a valid index.`;
    }
    this.data[id] = updatedItem;
    return `Item at index ${id} updated to: ${updatedItem}`;
  }

  // Delete: DELETE request to remove an item by index
  @del('/hello/items/{id}')
  delete(@param.path.number('id') id: number): string {
    if (id >= this.data.length || id < 0) {
      return `Invalid ID. Please provide a valid index.`;
    }
    const removedItem = this.data.splice(id, 1);
    return `Item at index ${id} removed: ${removedItem}`;
  }
}
