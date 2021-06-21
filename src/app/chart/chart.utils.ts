import { ChartNode } from './chart.types';

export const calWidth = <T>(node: ChartNode<T>, nodeWidth: number): number => {
  if (!node.children || !node.isShowChildren) {
    return nodeWidth;
  }
  return node.children.map(node => calWidth(node, nodeWidth)).reduce((acc, cur) => acc + cur);
};

export const findAndUpdate = <T>(
  node: ChartNode<T>,
  id: ChartNode<T>['id'],
  updatedNode: Partial<Omit<ChartNode<T>, 'id'>>
): ChartNode<T> => {
  if (node.id === id) {
    return {
      ...node,
      ...updatedNode,
    };
  }

  if (!node.children) {
    return { ...node };
  }

  return {
    ...node,
    children: node.children.map(child => findAndUpdate(child, id, updatedNode)),
  };
};
