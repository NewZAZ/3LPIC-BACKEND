import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim(),
    password: vine.string().trim(),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().trim(),
    password: vine.string().trim(),
  })
)
