export type TagType = {
  id?: string;
  label?: string;
  color?: string;
};

export type TagWithIdType = TagType & {
  id: string;
};
