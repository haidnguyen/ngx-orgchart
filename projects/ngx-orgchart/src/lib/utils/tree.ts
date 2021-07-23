import { Entities, OrgChartNode } from '../types';

interface TreeNode {
  id: string;
  children: TreeNode[];
}

export const buildTree = (parentId: string, ids: string[], entities: Entities<OrgChartNode>): TreeNode => ({
  id: parentId,
  children: ids.filter(id => entities[id].parentId === parentId).map(id => buildTree(id, ids, entities)),
});

export const calWidth = (tree: TreeNode, baseWidth: number): number => {
  if (tree.children.length === 0) {
    return baseWidth;
  }
  return tree.children.map(node => calWidth(node, baseWidth)).reduce((acc, cur) => acc + cur);
};
