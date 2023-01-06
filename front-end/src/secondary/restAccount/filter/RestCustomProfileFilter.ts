import { CustomProfileFilter, TypeFilter } from '@/domain/account/filter/Filter';
import { RestFilter, RestTypeFilter } from '@/secondary/restAccount/filter/RestFilter';

export default interface RestCustomProfileFilter extends RestFilter {
  type: RestTypeFilter.CustomProfileFilter;
  valFilter: Array<{
    icon: string;
    text: string;
  }>;
}

export const toCustomProfileFilter = (restCustomProfileFilter: RestCustomProfileFilter): CustomProfileFilter => ({
  id: restCustomProfileFilter._id,
  name: restCustomProfileFilter.name,
  type: TypeFilter.CustomProfileFilter,
  value: restCustomProfileFilter.valFilter,
});
