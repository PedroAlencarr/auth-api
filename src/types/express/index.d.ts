// src/@types/express/index.d.ts

// Sobrescrevendo uma tipagem do express
declare namespace Express {
  // Anexando a nossa própria propriedade ao Request
  export interface Request {
    user: {
      id: string;
    };
  }
}
