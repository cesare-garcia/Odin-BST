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
        let copy = array.slice();
        if (copy.length == 2) {
            let root = nodeFactory(copy[1]);
            root.left = nodeFactory(copy[0]);
            return root;
        } else {
            let midpointIndex = Math.floor(copy.length/2);
            let root = nodeFactory(copy[midpointIndex]);
            let leftHalf = copy.slice(0, midpointIndex);
            let rightHalf = copy.slice(midpointIndex+1, copy.length);
            root.left = buildTree(leftHalf);
            root.right = buildTree(rightHalf);
            return root;    
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
        let results = [node.root];
        let newArray = [];
        if (callback) callback(node);
        if (!callback) return newArray = results.concat(preorder(node.left), preorder(node.right)).filter(element => element !== "");
    };

    const inHelper = (currentNode) => {
        if (currentNode === null) return;
        
        inHelper(currentNode.left);
        console.log(currentNode.root);
        inHelper(currentNode.right);
    };

    const inorder = (funcParam) => {
        let traversedNode = level0Root;
        return inHelper(traversedNode);
    };
        
    const postHelper = (currentNode) => {
        if (currentNode === null) return;

        postHelper(currentNode.left);
        postHelper(currentNode.right);
        console.log(currentNode.root);
    };

    const postorder = (funcParam) => {
        let traversedNode = level0Root;
        postHelper(traversedNode);
    };
    
    const heightHelper = (currentNode, edges) => {
        if (currentNode === null) {
            edges++;
            return edges;
        } 

        heightHelper(currentNode.left);
        
        heightHelper(currentNode.right);

    };

    const returnHeight = (nodeValue) => {
        let currentNode = level0Root;
        let edges = 0;




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
        return "The node you are looking for does not exist in this tree.";
    };
    
    const isBalanced = () => {};
    
    const rebalance = () => {};

    prettyPrint(level0Root);

    return {getRoot, insertNode, deleteNode, findNode, levelOrder, inorder, preorder, postorder, returnHeight, returnDepth, isBalanced, rebalance, prettyPrint};
};

let tree = treeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);