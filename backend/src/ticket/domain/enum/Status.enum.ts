export const StatusEnum = {
  ABERTA: 'ABERTA',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
  CONCLUIDA: 'CONCLUIDA',
} as const;

export type StatusEnumType = (typeof StatusEnum)[keyof typeof StatusEnum];

