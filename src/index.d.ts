/**
 * An Octree node that holds the object and position of
 * the node.
 *
 * Do **not** change the `Position`. Instead, change the
 * position by calling `octree.ChangeNodePosition(node, pos)`.
 */
declare interface Node<T> {
	Position: Vector3;
	Object: T;
}

declare interface Octree<T> {
	/**
	 * Creates a new octree node at the given position and with the given object
	 * @param position Position of the node.
	 * @param object Arbitrary object to hold within the node.
	 */
	CreateNode(position: Vector3, object: T): Node<T>;

	/**
	 * Removes the given node from the octree.
	 *
	 * Removing a node does _not_ modify the held object.
	 * @param node The node to remove.
	 */
	RemoveNode(node: Node<T>): void;

	/**
	 * Changes the position of the node. This will write the `.Position` property
	 * of the given node, and will internally reposition the node into the correct
	 * subregion. Do **not** set the `.Position` property itself; doing so will not
	 * actually change the node position. Go through this method instead.
	 * @param node The node to change.
	 * @param position The new position for the node.
	 */
	ChangeNodePosition(node: Node<T>, position: Vector3): void;

	/**
	 * Get a list of all nodes.
	 *
	 * This can be an expensive operation, as all regions and subregions
	 * must be traversed to find all the nodes.
	 */
	GetAllNodes(): Array<Node<T>>;

	/**
	 * Iterate over each node.
	 *
	 * ```ts
	 * for (const node of octree.ForEachNode()) {
	 * 	print(node);
	 * }
	 * ```
	 */
	ForEachNode(): IterableFunction<Node<T>>;

	/**
	 * Counts all of the nodes in the octree.
	 *
	 * This can be an expensive operation, as all regions and subregions
	 * must be traversed to count all of the nodes.
	 */
	CountNodes(): number;

	/**
	 * Clears all of the nodes.
	 *
	 * Clearing the nodes does _not_ modify the held objects. If the
	 * desire is to destroy or clean up the given objects held onto
	 * by each node, use the `octree.GetAllNodes()` method or the
	 * `octree.ForEachNode()` iterator first.
	 */
	ClearAllNodes(): void;

	/**
	 * Finds the first node that holds the given object. If no node is
	 * found, then the returned value will be `undefined`.
	 * @param object The object to find.
	 */
	FindFirstNode(object: T): Node<T> | undefined;

	/**
	 * Search for all nodes within the radius around the given position.
	 * @param position The central position to look around.
	 * @param radius The radius around the position.
	 */
	RadiusSearch(position: Vector3, radius: number): Array<Node<T>>;

	/**
	 * Returns a sorted list of nodes from closest to farthest. This is
	 * similar to `RadiusSearch`, except the returned nodes are sorted
	 *  by distance and trimmed to the `maxNodes` length (if provided).
	 * @param position The central position to look around.
	 * @param radius The radius around the position.
	 * @param maxNodes Max returned nodes (No limit if not provided).
	 */
	GetNearest(position: Vector3, radius: number, maxNodes?: number): Array<Node<T>>;
}

declare interface OctreeConstructor {
	/**
	 * Constructs a new octree.
	 *
	 * The `topRegionSize` defaults to `512`, which should be fine for
	 * most applications, but can be set to a different number if desired.
	 */
	new <T>(topRegionSize?: number): Octree<T>;
}

/**
 * Octree implementation for Roblox game development.
 */
declare const Octree: OctreeConstructor;
export { Octree, Node };
