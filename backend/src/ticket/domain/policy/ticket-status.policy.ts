import { StatusEnum, StatusEnumType } from "../enum/Status.enum";
import { InvalidTransitionStatusError } from "../error/domain.error";


const mapStatusTransitions: Record<StatusEnumType, StatusEnumType[]> = {
  [StatusEnum.ABERTA]: [StatusEnum.EM_ANDAMENTO],
  [StatusEnum.EM_ANDAMENTO]: [StatusEnum.CONCLUIDA],
  [StatusEnum.CONCLUIDA]: []
};
export const validateChangeStatus = (currentStatus: StatusEnumType, nextStatus: StatusEnumType): void => {
    const isChangeAllowed = mapStatusTransitions[currentStatus].includes(nextStatus);
    if (!isChangeAllowed) {
        throw new InvalidTransitionStatusError(currentStatus, nextStatus, `Invalid status transition from ${currentStatus} to ${nextStatus}`);
    }
  };