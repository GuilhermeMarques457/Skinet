export class ErrorResponse {
  statusCode: number;
  message: string;
  errors?: string[];
  details: string;

  constructor() {
    this.statusCode = 0;
    this.message = '';
    this.errors = [];
    this.details = '';
  }
}
