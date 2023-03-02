import { z } from 'zod'

export const useUi = () => useState('ui', () => ({
  drawer: true,
  rail: false,
}))

export const useContactAction = () => useState('contactAction', () => new Set<number>())

export const UserSchema = z.object({
  firstName: z.string()
    .min(2, { message: 'Nombre debe contener tres o mas caracteres.' })
    .refine((val) => !/[0-9]/.test(val), { message: 'Nombre NO debe contener numeros.' }),
  lastName: z.string()
    .min(2, { message: 'Apellido debe contener tres o mas caracteres.' })
    .refine((val) => !/[0-9]/.test(val), { message: 'Apellido NO debe contener numeros.' }),
  email: z.string().email('Correo debe ser valido.'),
  contact: z.string()
    // .min(11, { message: 'Telefono debe contener once o mas caracteres.' })
    .refine((val) =>
      !/^((\+[503|1][ -]?)|(\([503|1]\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/.test(val), { message: 'Telefono no valido.' }),
  address: z.string()
    .min(3, { message: 'Direccion debe contener tres o mas caracteres.' })
})

type User = z.infer<typeof UserSchema>

export const useFormState = () => useState<User>('form', () => ({
  firstName: '',
  lastName: '',
  email: '',
  contact: '',
  address: ''
}))