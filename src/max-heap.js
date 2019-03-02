const Node = require('./node');

class MaxHeap {
	constructor() {
		this.parentNodes = [];
		this.length = 0;
		this.root = null;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {

		if(this.root) {
      const detached = this.detachRoot();
      if(this.parentNodes.length > 0) {
      	let newRoot = this.restoreRootFromLastInsertedNode(detached);
        this.shiftNodeDown(newRoot);
	    }
      return detached.data;
    }
	}

	detachRoot() {
		this.length--;
		let oldRoot = this.root;
		this.parentNodes = this.parentNodes.filter(el => el !== this.root);
		this.root = null;
		return oldRoot;
	}

	restoreRootFromLastInsertedNode(detached) {
		let lastAdded = this.parentNodes[this.parentNodes.length - 1];

		if(detached.left && detached.left !== lastAdded) {
			detached.left.parent = lastAdded;
		}
		if(detached.right && detached.right !== lastAdded) {
			detached.right.parent = lastAdded;
		}
		if(lastAdded.parent) {
			let parent = lastAdded.parent;
			if(parent.left === lastAdded) {
				parent.left = null;
			} else if(parent.right === lastAdded) {
				parent.right = null;
			}
		}

		let index = this.parentNodes.findIndex(el => el === lastAdded);
		this.parentNodes.splice(index, 1);
		let isExist = this.parentNodes.some(elem => elem === lastAdded.parent);
		if(lastAdded.parent && !isExist){
			if(!lastAdded.parent.parent) {
				this.parentNodes.unshift(lastAdded);
			}else {
				this.parentNodes.unshift(lastAdded.parent);
			}
		}
		this.root = lastAdded;
		lastAdded.parent = detached.parent;
		lastAdded.left = detached.left;
		lastAdded.right = detached.right;

		return lastAdded;
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.parentNodes = [];
		this.root = null;
		this.length = 0;
	}

	insertNode(node) {
		if(!this.root) {
			this.root = node;
		}
		this.insertParent(node);
	}

	shiftNodeUp(node) {
		
		while(node.parent && node.parent.priority < node.priority) { 
			this.shiftParents(node, node.parent);
			node.swapWithParent();
		}
		if(!node.parent) {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
    let final = this.findNodeDown(node);
    while(final && final.priority > node.priority) {
      this.shiftParents(final, final.parent);
      final.swapWithParent();
      if(!final.parent) {
        this.root = final;
      }
      final = this.findNodeDown(node);
    }
	}

	insertParent(node) {

		this.length++;
		this.parentNodes.push(node);

		if(this.length !== 1) {
			this.parentNodes[0].appendChild(node);
			if(this.parentNodes[0].right === node) {
				this.parentNodes.shift();
			}
		}
	}

	shiftParents(startNode, finishNode){

		let startIndex = this.parentNodes.findIndex(elem => elem === finishNode);
    let finishIndex = this.parentNodes.findIndex(elem => elem === startNode);
    if(startIndex !== -1 && finishIndex !== -1) {
      this.parentNodes[startIndex] = startNode;
      this.parentNodes[finishIndex] = finishNode;
    } else if(finishIndex !== -1) {
      this.parentNodes[finishIndex] = finishNode;
    } else if(startIndex !== -1) {
      this.parentNodes[startIndex] = startNode;
    }
	}
	findNodeDown(node) {
    if(!node.left && !node.right) {
      return null;
    }
    if(node.left && !node.right) {
      return node.left;
    }
    if(node.left.priority <= node.right.priority) {
      return node.right;
    } else {
      return node.left;
    }
	}
}

module.exports = MaxHeap;
