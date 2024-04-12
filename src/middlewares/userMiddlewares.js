import { z } from "zod"

const userDataSchema = z.object({
    username: z.string()
        .min(3, { message: "Nome de usuário muito curto" })
        .regex(/^[a-zA-Z0-9._]{3,}$/, { message: "Nome de usuário inválido. Use apenas letras, números, ponto (.) e sublinhado (_)"}),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string()
        .min(6, { message: "Senha muito curta" })
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/, {
            message: "A senha precisa conter pelo menos uma letra e um número", 
            // Password requirements:
            // Minimum of 6 characters
            // At least one uppercase or lowercase letter
            // At least one number
            // Symbols are accepted
        })
});

function validData(body) {
    try {
        userDataSchema.parse(body);
        return []; // Retorna uma lista vazia de erros se os dados forem válidos
    } catch (error) {
        return error.errors.map(err => ({ text: err.message }));
    }
}

export { validData }