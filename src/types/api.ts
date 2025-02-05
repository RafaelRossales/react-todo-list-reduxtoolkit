export enum FilterEnum {
  DESC = "desc",
  ASC = "asc",
  AaZ = "az",
}

export type BaseEntity = {
  id: string;
  createdAt: Date;
};

export type Entity<T> = {
  [k in keyof T]: T[k] extends BaseEntity ? T[k] : T[k] & BaseEntity;
};

export type Item = Entity<{
  id: string;
  title: string;
  completed: boolean;
  updatedAt: Date;
  createdAt: Date;
}>;

export type FilterType = {
  id: number;
  title: string;
  value: FilterEnum;
  checked: boolean;
};
