export type WordType = {
  id?: string;
  word?: string;
  translation?: string;
  notes?: string;
  tags?: string[];
};

export type WordWithIdType = WordType & {
  id: string;
};
