export interface ChartNode<T = unknown> {
  data: T;
  id: string | number;
  isShowChildren: boolean;
  children?: ChartNode<T>[];
}

export interface Point {
  x: number;
  y: number;
}

export interface ChartDragDropEvent<T> {
  previousIndex: number;
  currentIndex: number;
  chartNode: ChartNode<T>;
}
