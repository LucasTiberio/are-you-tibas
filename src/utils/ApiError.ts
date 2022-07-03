export class ApiError {
    statusCode: number
    message: string
  
    constructor(statusCode: number, message: string, stack = '') {
      this.statusCode = statusCode
      this.message = message;
  
    }
  }
    
  export default ApiError
  