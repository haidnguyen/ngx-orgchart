export interface OrgChartNode<T, K = any> {
  id: string;
  parentId: string | null;
  meta?: K;
  data: T;
}
