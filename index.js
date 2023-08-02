const treeFactory = (array) => {
    let level0Root = buildTree(mergeSort(removeDuplicates(array)));

    const prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    function nodeFactory (root, left, right) {
        if (root == undefined) root = null;
        if (left == undefined) left = null;
        if (right == undefined) right = null;
        
        return {left, root, right};
    };

    function removeDuplicates(array) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            if (!newArray.includes(array[i])) newArray.push(array[i]);
        }
        return newArray;
    }

    function mergeSort(array) {
    
        let copy = array.slice();
        let sortedArray = [];
    
        if (copy.length===1) {
            return copy;
        } else {
            let lastElementIndex = array.length - 1;
            let midpointIndex = Math.floor((lastElementIndex)/2);
            let sortLeft = mergeSort(copy.slice(0, midpointIndex+1)); 
            let sortRight = mergeSort(copy.slice((midpointIndex+1), lastElementIndex+1)); 
    
            if (sortRight != undefined) {            
                let combinedArray = merge(sortLeft, sortRight, sortLeft.length, sortRight.length);
                return sortedArray.concat(combinedArray);
            } else {
                return sortedArray.concat(sortLeft);
            }
        }
    }
    
    function merge(array1, array2, a1Length, a2Length) {
    
        let newArray = [];
        let i = 0;
        let j= 0;
        let k = 0;
    
        while (i < a1Length && j < a2Length) {
            if (array1[i] < array2[j]) { 
                newArray[k] = array1[i];
                i++;
                k++;
                
            } else if (array1[i] > array2[j]) {
                newArray[k] = array2[j];
                j++;
                k++;
            } 
        }
    
        for (i; i <= a1Length; i++) {
            if (array1[i] != undefined) {
                newArray[k] = array1[i];
                k++;
            }
        }
    
        for (j; j <= a2Length; j++) {
            if (array2[j] != undefined) {
                newArray[k] = array2[j];
                k++;
            }
        }
    
        return newArray;
    };

    function buildTree(array) {
        if (array.length === 1) {
            let root = nodeFactory(array[0]);
            return root;
        } else if (array.length === 2) {
            let root = nodeFactory(array[0]);
            root.right = nodeFactory(array[1]);
            return root;
        } else {
            if (array.length % 2 === 0) {
                let midpoint = (array.length / 2) - 1; 
                let root = nodeFactory(array[midpoint]);
                root.left = buildTree(array.slice(0, midpoint));
                root.right = buildTree(array.slice(midpoint+1));
                return root;

            } else {
                let midpoint = Math.ceil((array.length/2)) - 1;
                let root = nodeFactory(array[midpoint]);
                root.left = buildTree(array.slice(0,midpoint));
                root.right = buildTree(array.slice(midpoint+1));
                return root;

            }
        }
    }

    const insertNode = (value) => {
        let traversedNode = level0Root;
        while (traversedNode) {
            if (value === traversedNode.root) {
                return "You cannot insert a value that already exists within the tree.";
            } else if (value < traversedNode.root) {
                if (traversedNode.left !== null) {
                    traversedNode = traversedNode.left;
                } else {
                    traversedNode.left = nodeFactory(value);
                    return prettyPrint(level0Root);
                }
            } else {
                if (traversedNode.right !== null) {
                    traversedNode = traversedNode.right;
                } else {
                    traversedNode.right = nodeFactory(value);
                    return prettyPrint(level0Root);
                }
            }  
        };
    };
    
    const deleteNode = (value) => {
        let currentNode = level0Root;
        let previousNode;
        while (currentNode) {
            if (value === currentNode.root) {
                if (!currentNode.left && !currentNode.right) {
                    if (!previousNode) {
                        level0Root = null;
                        prettyPrint(level0Root);
                        return "this was the last node in the tree.";
                    } else {
                        if (previousNode.left === currentNode) {
                            previousNode.left = null;
                            return prettyPrint(level0Root);
                        } else {
                            previousNode.right = null;
                            return prettyPrint(level0Root);
                        }
                    }
                } else if (currentNode.left && currentNode.right) {
                    let successorNode = currentNode.right;
                    let previousSuccessor;

                    if (!successorNode.left) {
                        currentNode.root = successorNode.root;
                        currentNode.right = successorNode.right;
                        return prettyPrint(level0Root);

                    } else {
                        while (successorNode.left != null) {
                            previousSuccessor = successorNode;
                            successorNode = successorNode.left;
                        }
                        currentNode.root = successorNode.root;
                        previousSuccessor.left = null;
                        return prettyPrint(level0Root);
                    }
                } else {
                    let childNode;
                    currentNode.left ? childNode = currentNode.left : childNode = currentNode.right;
                    if (!previousNode) {
                        level0Root.root = childNode.root;
                        level0Root.left = childNode.left;
                        level0Root.right = childNode.right;
                        return prettyPrint(level0Root);
                    } else {
                        previousNode.left === currentNode ? previousNode.left = childNode : previousNode.right = childNode;
                        return prettyPrint(level0Root);                 
                    }
                }
            } else if (value < currentNode.root) {
                previousNode = currentNode;
                currentNode = currentNode.left;
            } else {
                previousNode = currentNode;
                currentNode = currentNode.right;
            }
        }
        return "The value you entered is not recorded in this binary search tree and thus cannot be deleted.";
    };
    
    const findNode = (value) => {
        let traversedNode = level0Root;
        while (traversedNode) {
            if (value > traversedNode.root) {
                traversedNode = traversedNode.right;
            } else if (value < traversedNode.root) {
                traversedNode = traversedNode.left;
            } else {
                return traversedNode;
            } 
        }
        return "The value you entered is not recorded in this binary search tree.";
    };
    
    const getRoot = () => {
        return level0Root;
    };

    const levelOrder = (node = level0Root, callback) => {
        if (node.root === null) return;
        let queue = [node];
        let results = [];

        while(queue.length !== 0) {
            let level = [];
            let sizeOfLevel = queue.length;
            for (let i = 0; i < sizeOfLevel; i++) {
                let current = queue.shift();
                level.push(current.root);
                if (current.left !== null) queue.push(current.left);
                if (current.right !== null) queue.push(current.right);
                if (callback) callback(current);
            }
            results.push(level);
        };
        if (!callback) return results;
    };

    const preorder = (node = level0Root, callback) => {
        if (node === null) return "";
        if (callback) {
            callback(node);
            preorder(node.left, callback);
            preorder(node.right, callback);
        } else {
            return [node.root].concat(preorder(node.left), preorder(node.right)).filter(element => element !== "");
        }
    };

    const inorder = (node = level0Root, callback) => {
        if (node === null) return "";
        if (callback) {
            inorder(node.left, callback);
            callback(node);
            inorder(node.right, callback);
        } else {
            return [].concat(inorder(node.left, callback), node.root, inorder(node.right, callback)).filter(element => element !== "");
        }
    };
        
    const postorder = (node = level0Root, callback) => {
        if (node === null) return "";
        if (callback) {
            postorder(node.left, callback);
            postorder(node.right, callback);
            callback(node);
        } else {
            return [].concat(postorder(node.left, callback), postorder(node.right, callback), node.root).filter(element => element !== "");
        }
    };
    
    const heightHelper = (node) => {
        if (node === null) return -1;

        let a = heightHelper(node.left);
        let b = heightHelper(node.right);

        return Math.max(a,b) + 1;
    };

    const returnHeight = (nodeValue) => {
        let traversedNode = level0Root;
        while (nodeValue !== traversedNode.root) {
            (nodeValue < traversedNode.root) ? traversedNode = traversedNode.left : traversedNode = traversedNode.right;
        }
        return heightHelper(traversedNode);
    };
    
    const returnDepth = (nodeValue) => {
        let currentNode = level0Root;
        let edges = 0;
        while (currentNode) {
            if (nodeValue < currentNode.root) {
                currentNode = currentNode.left;
                edges++;
            } else if (nodeValue > currentNode.root) {
                currentNode = currentNode.right;
                edges++;
            } else {
                return `Depth of node = ${edges}`;
            }
        };
        return "The node value you are looking for does not exist in this tree.";
    };
    
    const isBalanced = () => {};
    
    const rebalance = () => {
        let newSortedArray = tree.inorder();
        level0Root = buildTree(newSortedArray);
        return prettyPrint(level0Root);
    };

    prettyPrint(level0Root);

    return {getRoot, insertNode, deleteNode, findNode, levelOrder, inorder, preorder, postorder, returnHeight, returnDepth, isBalanced, rebalance};
};

// let tree = treeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
let tree = treeFactory([1, 3, 4, 5, 7, 8, 9, 23, 34, 35, 36, 37, 38, 39, 67, 324, 6345]);