export const USER_ROLE = {
    Admin: 'Admin',
    Consumer: 'Consumer',
  } as const;

export type TUserRole = keyof typeof USER_ROLE;