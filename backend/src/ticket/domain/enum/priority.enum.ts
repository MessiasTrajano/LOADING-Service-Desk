export const PriorityEnum = {
  BAIXA: 'BAIXA',
  MEDIA: 'MEDIA',
  ALTA: 'ALTA',
} as const;

export type PriorityEnumType = (typeof PriorityEnum)[keyof typeof PriorityEnum];