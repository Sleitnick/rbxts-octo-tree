declare namespace Octree {
	/**
	 * An octree node represents a point in 3D space within an octree,
	 * along with an arbitrary object attached to it.
	 *
	 * To change the position of a node, go through the
	 * `octree.ChangeNodePosition()` method.
	 */
	interface Node<T> {
		readonly Position: Vector3;
		readonly Object: T;
	}

	interface Constructor {
		/**
		 * Constructs a new octree.
		 *
		 * The `topRegionSize` defaults to `512`, which should be fine for
		 * most applications, but can be set to a different number if desired.
		 * This refers to the cubic size of the top-level regions in 3D space.
		 */
		new <T>(topRegionSize?: number): Octree<T>;
	}
}

interface Octree<T> {
	/**
	 * Creates a new octree node at the given position and with the given object
	 * @param position Position of the node.
	 * @param object Arbitrary object to hold within the node.
	 */
	CreateNode(position: Vector3, object: T): Octree.Node<T>;

	/**
	 * Removes the given node from the octree.
	 *
	 * Removing a node does _not_ modify the held object.
	 * @param node The node to remove.
	 */
	RemoveNode(node: Octree.Node<T>): void;

	/**
	 * Changes the position of the node. This will write the `.Position` property
	 * of the given node, and will internally reposition the node into the correct
	 * subregion.
	 *
	 * Changing the position of a node can be an expensive operation and should only
	 * be done if necessary.
	 * @param node The node to change.
	 * @param position The new position for the node.
	 */
	ChangeNodePosition(node: Octree.Node<T>, position: Vector3): void;

	/**
	 * Get a list of all nodes.
	 *
	 * This can be an expensive operation, as all regions and subregions
	 * must be traversed to find all the nodes.
	 */
	GetAllNodes(): Array<Octree.Node<T>>;

	/**
	 * Iterate over each node.
	 *
	 * ```ts
	 * for (const node of octree.ForEachNode()) {
	 * 	print(node);
	 * }
	 * ```
	 */
	ForEachNode(): IterableFunction<Octree.Node<T>>;

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
	FindFirstNode(object: T): Octree.Node<T> | undefined;

	/**
	 * Search for all nodes within the radius around the given position.
	 * @param position The central position to look around.
	 * @param radius The radius around the position.
	 */
	SearchRadius(position: Vector3, radius: number): Array<Octree.Node<T>>;

	/**
	 * Same as `SearchRadius`, except an iterator function is returned instead
	 * of a table. Unless a table of nodes is needed, using `ForEachInRadius`
	 * will be faster than `SearchRadius` (because no table allocations are needed).
	 *
	 * ```ts
	 * for (const node of octree.ForEachInRadius(position, radius)) {
	 * 	print(node);
	 * }
	 * ```
	 *
	 * @param position The central position to look around.
	 * @param radius The radius around the position.
	 */
	ForEachInRadius(position: Vector3, radius: number): IterableFunction<Octree.Node<T>>;

	/**
	 * Returns a sorted list of nodes from closest to farthest. This is
	 * similar to `SearchRadius`, except the returned nodes are sorted
	 *  by distance and trimmed to the `maxNodes` length (if provided).
	 * @param position The central position to look around.
	 * @param radius The radius around the position.
	 * @param maxNodes Max returned nodes (No limit if not provided).
	 */
	GetNearest(position: Vector3, radius: number, maxNodes?: number): Array<Octree.Node<T>>;
}

/**
 * Octree implementation for Roblox game development.
 */
declare const Octree: Octree.Constructor;

export = Octree;
