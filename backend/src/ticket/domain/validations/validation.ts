import { PriorityEnum, PriorityEnumType } from "../enum/priority.enum";
import { InvalidFieldError } from "../error/domain.error";
import { CategoryEnum, CategoryEnumType } from "../enum/category.enum";

    export class ValidationsToEntity {

        static validateRecivedParamsToCreate = (
            title: string, 
            description: string,
            category: CategoryEnumType,
            priority: PriorityEnumType
        ): void => {
          this.validateTitle(title);
          this.validateDescription(description);
          this.validateCategory(category);
          this.validatePriority(priority);
        };


        static validateId = (id: string): void => {
            if (!id || id.trim().length === 0) {
                throw new InvalidFieldError('id', 'Id is required');
            }
        };
    
        static validateTitle = (title: string): void => {
            if (!title || title.trim().length === 0) {
                throw new InvalidFieldError('title', 'Title is required');
            }
        };
    
        static validateDescription = (description: string): void => {
            if (!description || description.trim().length === 0) {
                throw new InvalidFieldError('description', 'Description is required');
            }
        };

        static validateCategory = (category: CategoryEnumType): void => {
            if (!Object.values(CategoryEnum).includes(category)) {
                throw new InvalidFieldError('category', 'Invalid category value');
            }
        };

        static validatePriority = (priority: PriorityEnumType): void => {
            if (!Object.values(PriorityEnum).includes(priority)) {
                throw new InvalidFieldError('priority', 'Invalid priority value');
            }
        };
    }