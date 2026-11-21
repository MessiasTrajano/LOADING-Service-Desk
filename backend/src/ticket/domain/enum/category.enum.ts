export const CategoryEnum = {
  HARDWARE: 'HARDWARE',
  SOFTWARE: 'SOFTWARE',
  REDE: 'REDE',
  ACESSO: 'ACESSO',
  OUTROS: 'OUTROS',
} as const;

export type CategoryEnumType = (typeof CategoryEnum)[keyof typeof CategoryEnum];
