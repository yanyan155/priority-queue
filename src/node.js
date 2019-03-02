class Node {
	constructor(data, priority) {
		this.data = data,
		this.priority = priority,
		this.parent = null, 
		this.left = null,
		this.right = null
	}

	appendChild(node) {
		if(!this.left) {
			this.left = node;
			node.parent = this;
		} else if(!this.right) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(this.left === node) {
			node.parent = null;
      this.left = null;
    } else if(this.right === node) {
    	node.parent = null;
      this.right = null;
    } else {
      throw new Error();
    }
	}

	remove() {
		if(this.parent) {
			let a = this.parent;
			a.removeChild(this);
		}
	}

	swapWithParent() {
		if(this.parent) {
			let childLeft = this.left;
			let childRight = this.right
			let grandParent = this.parent.parent;
			let parentLeft = this.parent.left;
			let parentRight = this.parent.right;

			if(childLeft) {
				childLeft.parent = this.parent;
			}
			if(childRight) {
				childRight.parent = this.parent;
			}
			if(this.parent.left === this) {
				if(this.parent.right) {
					this.parent.right.parent = this; // 1
				}
				this.right = parentRight; // 2
				this.left = this.parent; // 4
			} else if (this.parent.right === this) {
				if(this.parent.left) {
					this.parent.left.parent = this;
				}
				this.left = parentLeft;
				this.right = this.parent;
			}
			
			if(grandParent) {
				if(grandParent.left === this.parent) {
					grandParent.left = this; // 6
				} else if (grandParent.right === this.parent) {
					grandParent.right = this;
				}
			}
			this.parent.parent = this; // 3
			this.parent.left = childLeft; // 7
			this.parent.right = childRight; // 9
			this.parent = grandParent; // 5
		}
	}
}

module.exports = Node;
