"use client";

import { TagList } from "@/components";
import { useData } from "@/hooks";

export default function TagListPage() {
  const { tags } = useData();

  return <TagList tags={tags.data} />;
}
