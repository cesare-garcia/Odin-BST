const treeFactory = (array) => {

    let noDuplicates = removeDuplicates(array);
    let sortedArray = mergeSort(noDuplicates);
    let level0Root = buildTree(sortedArray);

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
            let sortLeft = mergeSort(copy.slice(0, midpointIndex+1)); // first final val = 5
            let sortRight = mergeSort(copy.slice((midpointIndex+1), lastElementIndex+1)); // first final val = 2
    
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
    
    const deleteNode = () => {};
    
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
    
    const levelOrder = () => {};
    
    const inorder = () => {};
    
    const preorder = () => {};
    
    const postorder = () => {};
    
    const returnHeight = () => {};
    
    const returnDepth = () => {};
    
    const isBalanced = () => {};
    
    const rebalance = () => {};

    prettyPrint(level0Root);

    return {level0Root, insertNode, deleteNode, findNode, levelOrder, inorder, preorder, postorder, returnHeight, returnDepth, isBalanced, rebalance};

};

let tree = treeFactory([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);