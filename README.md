# OctoTree

Octree implementation for Roblox game development. Octrees are useful data structure for performing fast spatial queries for objects within a 3D space.

Roblox also provides some generalized spatial query methods, such as [`GetPartBoundsInRadius`](https://developer.roblox.com/en-us/api-reference/function/WorldRoot/GetPartBoundsInRadius). These methods are useful for general purposes, but a special Octree can still be much faster for specific use-cases. For instance, having a bunch of collectables in the world.

## Types
```ts
interface Node<T> {
	readonly Position: Vector3;
	readonly Object: T;
}
```

## Constructor
```ts
Octree.new<T>();
Octree.new<T>(topRegionSize: number);
```
In most cases, it is preferred to leave out the `topRegionSize` and use the default. The `topRegionSize` represents the cubic size of the top-level regions. By default, this is set to `512`, which means the top-level regions have a 3D size of `512x512x512`. Type `T` represents the arbitrary object that is held within each node.

## Methods
### `CreateNode`
```ts
CreateNode(position: Vector3, object: T): Node<T>;

const node = octree.CreateNode(someVector3, someObject);
```
Creates a `Node<T>` within the octree at the given position. An arbitrary object can be given to the node as well.

### `RemoveNode`
```ts
RemoveNode(node: Node<T>): void;

octree.RemoveNode(node);
```
Removes the node from the octree. If the desire is to remove all nodes from the octree, use `ClearAllNodes()` instead.

### `ChangeNodePosition`
```ts
ChangeNodePosition(node: Node<T>, position: Vector3): void;

octree.ChangeNodePosition(node, someNewVector3);
print(node.Position);
```
Change the position of the given node to the new `position`. Due to the internal workings of the octree, this is can be a fairly expensive operation. It is usually beneficial to keep most nodes as static as possible. Only change the position if necessary. **Note:** This is still faster than removing the node and creating a new one at a different position.

### `GetAllNodes`
```ts
GetAllNodes(): Array<Node<T>>;

const nodes = octree.GetAllNodes();
for (const node of nodes) {}
```
Get an array of all the nodes in the octree. This can be an expensive operation, as all regions and subregions in the octree must be traversed.

### `ForEachNode`
```ts
ForEachNode(): IterableFunction<Node<T>>;

for (const node of octree.ForEachNode()) {}
```
Iterate over each node in the octree. This is useful if the desire is to scan through each node, but perhaps have a break within the loop, which will keep it from having to scan all nodes.

### `CountNodes`
```ts
CountNodes(): number;

const numNodes = octree.CountNodes();
```
Count the number of nodes in the octree. Similar to `GetAllNodes()`, this can be an expensive operation.

### `ClearAllNodes`
```ts
ClearAllNodes(): void;

octree.ClearAllNodes();
```
Removes all nodes from the octree. This is a very quick operation and should be used instead of calling `RemoveNode()` on all nodes.

### `FindFirstNode`
```ts
FindFirstNode(object: T): Node<T> | undefined;

const node = octree.FindFirstNode(someObject);
if (node !== undefined) {}
```
Finds the first node in the octree that has the same object. If no object is found, `undefined` is returned instead.

### `SearchRadius`
```ts
SearchRadius(position: Vector3, radius: number): Array<Node<T>>;

const nearbyNodes = octree.SearchRadius(somePosition, 200);
for (const node of nearbyNodes) {}
```
Performs a search for all nodes within the given radius. An array of all the nodes found is returned.

### `ForEachInRadius`
```ts
ForEachInRadius(position: Vector3, radius: number): IterableFunction<Octree.Node<T>>;

for (const node of octree.ForEachInRadius(somePosition, 200)) {}
```
Same as `SearchRadius`, except an iterator function is returned instead of a table. Unless a table of nodes is needed, `ForEachInRadius` will be faster than `SearchRadius` (because no table allocations are needed).

### `GetNearest`
```ts
GetNearest(position: Vector3, radius: number, maxNodes?: number): Array<Node<T>>;

const topTenNearest = octree.GetNearest(somePosition, 200, 10);
for (const node of topTenNearest) {}
```
Performs a radius search (same as the `SearchRadius()` method), but sorts the nodes by distance. If the `maxNodes` parameter is used, the amount of nodes returned will be limited to that number.