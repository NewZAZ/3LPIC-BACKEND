import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    password: vine.string().trim(),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    fullName: vine.string().trim(),
    email: vine.string().trim(),
    password: vine.string().trim(),
  })
)
