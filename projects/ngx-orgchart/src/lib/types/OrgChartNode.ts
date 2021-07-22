export interface OrgChartNode<T = unknown, K = any> {
  id: string;
  parentId: string | null;
  meta?: K;
  data: T;
}
