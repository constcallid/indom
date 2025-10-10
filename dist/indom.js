/*! InDom v1.0.0 MIT */

/**
 * Array-like container for bulk DOM element operations.
 * Extends Array to provide chainable bulk operations on multiple InDom objects.
 *
 * @extends Array<InDom>
 */
class InDomArray extends Array {
	/**
	 * Creates a new InDomArray instance.
	 * 
	 * @param {...InDom} items - InDom objects to include in the array
	 */
	constructor(...items) {
		super(...items);
	}

	/**
	 * Sets attribute on all objects in the array.
	 * 
	 * @param {string} k - Attribute name
	 * @param {any} v - Attribute value (will converted to string)
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	setAttr(k, v) {
		return this.#eachSetter('setAttr', [k, v]);
	}

	/**
	 * Removes an attribute on all objects in the array.
	 * 
	 * @param {string} k - Attribute name
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	removeAttr(k) {
		return this.#eachSetter('removeAttr', [k]);
	}

	/**
	 * Sets data attribute or in-memory data on all objects.
	 * Only available for connected elements to guarantee cleanup and single-instance consistency.
	 * 
	 * @param {any} k - Data key
	 * @param {any} v
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 * @throws {Error} If any element is disconnected or DOM not ready
	 */
	setData(k, v) {
		this.#isConnected();
		return this.#eachSetter('setData', [k, v]);
	}

	/**
	 * Removes a data attribute or from in-memory data on all objects.
	 * Only available for connected elements to guarantee cleanup and single-instance consistency.
	 * 
	 * @param {any} k - Data key
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 * @throws {Error} If any element is disconnected or DOM not ready
	 */
	removeData(k) {
		this.#isConnected();
		return this.#eachSetter('removeData', [k]);
	}

	/**
	 * Sets form value on all objects.
	 * 
	 * @param {string|string[]} value - Value to set
	 * @param {Document | Element | InDom} [container=document] - container for query operations
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	setValue(v, c) {
		return this.#eachSetter('setValue', [v, c]);
	}

	/**
	 * Sets innerHTML on all objects.
	 * 
	 * @param {string} content - HTML content
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	setHtml(c) {
		return this.#eachSetter('setHtml', [c]);
	}

	/**
	 * Sets style properties on all objects.
	 * 
	 * @param {string|Object} k - Property name or object map
	 * @param {string} [v] - Property value (when prop is string)
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	setStyle(k, v) {
		return this.#eachSetter('setStyle', [k, v]);
	}

	/**
	 * Adds CSS classes to all objects.
	 * 
	 * @param {...string} names - Class names to add
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	addClass(...names) {
		return this.#eachSetter('addClass', names);
	}

	/**
	 * Removes CSS classes from all objects.
	 * 
	 * @param {...string} names - Class names to remove
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	removeClass(...names) {
		return this.#eachSetter('removeClass', names);
	}

	/**
	 * Appends children to all objects.
	 * 
	 * @param {...(string|Node|InDom)} children - Children to append
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	append(...children) {
		return this.#eachSetter('append', children);
	}

	/**
	 * Prepends children to all objects.
	 * 
	 * @param {...(string|Node|InDom)} children - Children to prepend
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	prepend(...children) {
		return this.#eachSetter('prepend', children);
	}

	/**
	 * Inserts nodes or HTML after all objects (as next siblings).
	 * 
	 * @param {...(string|Node|InDom)} siblings
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	after(...siblings) {
		return this.#eachSetter('after', siblings);
	}

	/**
	 * Inserts nodes or HTML before all objects (as previous siblings).
	 * 
	 * @param {...(string|Node|InDom)} siblings
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	before(...siblings) {
		return this.#eachSetter('before', siblings);
	}


	/**
	 * Registers an event listener that is automatically removed when each element is
	 * removed from the DOM (no matter how) , preventing memory leaks.
	 * 
	* @param {string | string[]} type - Event type, e.g. 'click', 'keydown' or array of event types
	* @param {(n: InDom, e: Event) => void} [fn] - Handler. Omit for mouse/click to trigger the event
	* @param {AddEventListenerOptions} [opts] - Event options (once, passive, etc.)
	* @returns {Function[]} The internal handlers in an array. Pass it to .off() to remove manually
	* @throws {Error} If auto-trigger is used with non-mouse event
	* @throws {TypeError} If handler is not a function (when provided)
	* @throws {Error} If an element of an InDom object in the array has been removed 
	* @throws {Error} If an element of an InDom object in the array is not connected to DOM
	 */
	on(type, fn, opts) {
		this.#isConnected();
		const a = new Array(this.length);
		for (let i = 0; i < this.length; i++) {
			a[i] = this[i].on(type, fn, opts);
		}
		return a;
	}

	/**
	 * Adds one-time event listeners to all objects.
	 * 
	 * @param {string} type - Event type
	 * @param {(n: InDom, e: Event) => void} [fn] - Event handler
	 * @param {AddEventListenerOptions} [opts={}] - Event options
	 * @returns {Function[]} Array of wrapped listeners (one per element)
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 * @throws {Error} If an element of an InDom object in the array is not connected to DOM	 
	 */
	once(type, fn, opts) {
		return this.on(type, fn, { ...opts, once: true });
	}

	/**
	 * Removes event listener(s) registered with `.on()`, its shorthand methods, or `onRemove()`.
	 * 
	 * @param {string} [type] - Event type. If omitted, **all** listeners are removed.
	 * @param {Function[]} [fns] - Handlers returned by `.on()`. If omitted, **all** listeners of `type` are removed.
	 * @returns {this} The current InDomArray for chaining
	 * @throws {RangeError} If fnArr length doesn't match array length
	 * @throws {TypeError} If `type` is provided but is not a non-empty string
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	off(type, fnArr) {
		if (fnArr) {
			if (!Array.isArray(fnArr) || fnArr.length !== this.length) {
				throw new RangeError(`Expected ${this.length} handlers, got ${fnArr.length}`);
			}
			this.forEach((n, i) => n.off(type, fnArr[i]));
		} else {
			this.forEach(n => n.off(type));
		}
		return this;
	}

	/**
	 * Adds click event listeners to all objects.
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}] - Event listener options
	 * @returns {Function[]} Array of wrapped listeners (one per element)
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 * @throws {Error} If an element of an InDom object in the array is not connected to DOM	
	 */
	onClick(fn, opts) {
		return this.on("click", fn, opts);
	}

	/**
	 * Adds double-click event listeners to all objects.
	 * 
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}] - Event listener options
	 * @returns {Function[]} Array of wrapped listeners (one per element)
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 * @throws {Error} If an element of an InDom object in the array is not connected to DOM	
	 */
	onDoubleClick(fn, opts) {
		return this.on("dblclick", fn, opts);
	}

	/**
	 * Adds mouse enter event listeners to all objects.
	 * 
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}] - Event listener options
	 * @returns {Function[]} Array of wrapped listeners (one per element)
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 * @throws {Error} If an element of an InDom object in the array is not connected to DOM
	 */
	onEnter(fn, opts) {
		return this.on("mouseenter", fn, opts);
	}

	/**
	 * Adds mouse leave event listeners to all objects.
	 * 
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}] - Event listener options
	 * @returns {Function[]} Array of wrapped listeners (one per element)
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 * @throws {Error} If an element of an InDom object in the array is not connected to DOM 
	 */
	onLeave(fn, opts) {
		return this.on("mouseleave", fn, opts);
	}

	/**
	 * Adds focus event listeners to all objects.
	 * 
	 * @param {(n: InDom, e: FocusEvent) => void} [fn] - Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}] - Event listener options
	 * @returns {Function[]} Array of wrapped listeners (one per element)
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 * @throws {Error} If an element of an InDom object in the array is not connected to DOM
	 */
	onFocus(fn, opts) {
		return this.on("focus", fn, opts);
	}

	/**
	 * Adds blur event listeners to all objects.
	 * 
	 * @param {(n: InDom, e: FocusEvent) => void} [fn] - Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}] - Event listener options
	 * @returns {Function[]} Array of wrapped listeners (one per element)
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 * @throws {Error} If an element of an InDom object in the array is not connected to DOM
	 */
	onBlur(fn, opts) {
		return this.on("blur", fn, opts);
	}

	/**
	 * Adds change event listeners to all objects.
	 * 
	 * @param {(n: InDom, e: Event) => void} [fn] - Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}] - Event listener options
	 * @returns {Function[]} Array of wrapped listeners (one per element)
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 * @throws {Error} If an element of an InDom object in the array is not connected to DOM
	 */
	onChange(fn, opts) {
		return this.on("change", fn, opts);
	}

	/**
	 * For each InDom object in this InDomArray:
	 * Registers a callback function that runs after the object's internal state
	 * (listeners, data) has been cleaned up, and just before its element is removed from the DOM.
	 * 
	 * @param {(n: InDom) => void} fn - the callback function
	 * @returns {Function[]} internal handlers – pass to .off('onRemove', …) to unregister
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	onRemove(fn) {
		this.#isConnected();
		const a = [];
		this.forEach(n => a.push(n.on("onRemove", fn)));
		return a;
	}

	/**
	 * Cleans the internal state of the InDom objects of the array and removes their underlying DOM elements from the document. 
	 * 
	 * @throws {Error} If an element of an InDom object in the array has already been removed 
	 */
	remove() {
		this.#eachSetter('remove', []);
	}

	/**
	 * Executes a function for each InDom in the array.
	 * 
	 * @param {(n: InDom) => void} fn - Function to execute
	 * @returns {InDomArray} this for chaining
	 */
	each(fn) {
		this.forEach(fn);
		return this;
	}

	/**
	 * Filters the collection.
	 *
	 * - If `arg` is a **string** it is treated as a CSS selector and every
	 *   element that *matches* the selector is kept.
	 * - If `arg` is a **function** the native `Array.prototype.filter` logic
	 *   is used: `arg(element, index, array)` should return `true` to keep the
	 *   item.
	 *
	 * In both cases a new `InDomArray` instance is returned, leaving the
	 * original collection untouched.
	 *
	 * @param {string|{(n: InDom, index: number, array: InDomArray) => boolean}} arg - CSS selector or predicate function
	 * @returns {InDomArray} new filtered collection
	 */
	filter(arg) {
		return new InDomArray(...(typeof arg === 'string'
			? super.filter(n => n.el().matches(arg))
			: super.filter(arg)));
	}

	/**
	 * Executes a setter method on all objects.
	 * 
	 * @private
	 * @param {string} method - Method name to call
	 * @param {Array} args - Arguments to pass
	 * @returns {InDomArray} this for chaining
	 */
	#eachSetter(method, args) {
		for (let i = 0; i < this.length; i++) {
			this[i][method](...args);
		}
		return this;
	}

	/**
	 * Verifies that DOM is ready and all elements are connected.
	 * 
	 * @private
	 * @throws {Error} If DOM not ready or any element disconnected
	 */
	#isConnected() {
		if (!InDom.isReady()) {
			throw new Error('DOM content must be loaded first for this operation');
		}
		for (let i = 0; i < this.length; i++) {
			if (!this[i].el().isConnected) {
				throw new Error('Element must be connected to DOM for this operation', { cause: this[i].el() });
			}
		};
	}
}

/**
 * Main InDom class — contains a single DOM element per instance and provides a modern,
 * chainable API for querying, manipulation, events, data storage, and lifecycle handling with built-in safety.
 */
class InDom {
	/**
	 * Whether the DOM is ready (DOMContentLoaded fired)
	 * @private
	 * @static
	 */
	static #ready = false;

	/**
	 * Callbacks to run when DOM becomes ready
	 * @private
	 * @static
	 * @type {Function[]}
	 */
	static #onReadyFns = [];

	/**
	 * Maps DOM elements/documents to their InDom instance
	 * @private
	 * @static
	 * @type {WeakMap<Element | Document, InDom>}
	 */
	static #map = new WeakMap();

	/**
	 * Event storage object: event-type → Set of wrapped handlers
	 * @private
	 * @type {Record<string, Set<EventListener | (() => void)>>}
	 */
	#events;

	/**
	 * Underlying DOM element or document
	 * @private
	 * @type {Element | Document | null}
	 */
	#el;

	/**
	 * AbortController for automatic cleanup of event listeners
	 * @private
	 * @type {AbortController}
	 */
	#abortController;

	/**
	 * Internal storage for arbitrary key/value data
	 * @private
	 * @type {Map<any, unknown>}
	 */
	#data;

	/**
	 * Creates an InDom object that contains an Element or the Document,
	 * or from an HTML string that produces a single Element.
	 *
	 * @param {Document | Element | string} source - DOM Element or HTML string of a DOM element
	 * @throws {TypeError} If the source is not a valid DOM Element or HTML string of a single DOM Element
	 */
	constructor(source) {
		// If an instance for this source already exists, return it
		if (InDom.#map.has(source)) {
			return InDom.#map.get(source);
		}
		// If source is a Document, store and map directly
		if (source instanceof Document) {
			this.#el = source;
			InDom.#map.set(source, this);
			return;
		}

		// Otherwise normalize it
		const el = InDom.#normalizeChild(source);

		// Must be an Element
		if (!(el instanceof Element)) {
			throw new TypeError('Expected a DOM Element , Document or HTML string of a DOM Element', { cause: el });
		}
		this.#el = el;
	}

	/**
	 * Starts the global MutationObserver that automatically destroys InDom objects
	 * when their underlying elements are removed from the DOM.
	 * 
	 * Safe to call multiple times; subsequent calls have no effect once initialized.
	 */
	static init() {
		if (this.#ready) {
			return;
		}

		// Wait for <body> if DOMContentLoaded fired before body exists (rare but possible)
		if (!document.body) {
			document.addEventListener('DOMContentLoaded', () => this.init(), { once: true });
			return;
		}

		// Reuse a single TreeWalker for traversing removed subtrees
		const walker = document.createTreeWalker(
			document.body,
			NodeFilter.SHOW_ELEMENT,
			null
		);

		const mo = new MutationObserver(records => {
			// maybeGone: elements possibly removed from DOM
			// (we defer final check to a microtask to avoid transient removals)
			const maybeGone = new Set();
			for (const rec of records) {
				for (const node of rec.removedNodes) {
					if (node.nodeType !== 1) {
						continue;
					}
					if (this.#map.has(node)) {
						maybeGone.add(this.#map.get(node));
					}
					walker.currentNode = node;
					let el;
					while ((el = walker.nextNode()) && node.contains(el)) {
						if (this.#map.has(el)) {
							maybeGone.add(this.#map.get(el));
						}
					}
				}
			}

			// Cleanup after DOM settles
			if (maybeGone.size > 0) {
				queueMicrotask(() => {
					for (const n of maybeGone) {
						if (!n.el().isConnected) {
							n.remove();
						}
					}
				});
			}
		});

		mo.observe(document.body, { childList: true, subtree: true });
		this.#ready = true;

		// Fire queued ready callbacks
		if (this.#onReadyFns.length > 0) {
			this.#onReadyFns.forEach(fn => fn());
			this.#onReadyFns.length = 0;
		}
	}

	/**
	 * Checks whether the DOM content has been loaded
	 * and the global InDom MutationObserver is initialized.
	 * 
	 * @returns {boolean} True if InDom is ready
	 */
	static isReady() {
		return InDom.#ready;
	}

	/**
	 * Registers a function to run when the DOM is ready
	 * (executed immediately if already ready).
	 *
	 * @param {() => void} fn - The callback function
	 * @throws {TypeError} If the handler is not a function
	 */
	static onReady(fn) {
		if (typeof fn !== 'function') {
			throw new TypeError('onReady handler must be a function', { cause: fn });
		}
		if (this.#ready) {
			fn();
			return;
		}
		this.#onReadyFns.push(fn);
	}

	/**
	 * Queries the DOM using a CSS selector and returns an InDomArray of InDom objects
	 * for each matching element. Returns an empty array if no matches found.
	 *
	 * @param {string} selector - The CSS selector to match
	 * @param {ParentNode | InDom} [container=document] - The container to search within
	 * @returns {InDomArray} - InDomArray object of InDom instances
	 */
	static get(selector, container) {
		if (container) {
			if (container instanceof InDom) {
				container = container.el();
			}
			selector = selector.trim();
			const l = selector[0];
			if (l == ">" || l == "~" || l == "+") {
				selector = ":scope " + selector;
			}
		}
		else {
			container = document;
		}

		const elements = container.querySelectorAll(selector);
		const length = elements.length;
		const arr = new InDomArray(length);
		for (let i = 0; i < length; i++) {
			arr[i] = InDom.#wrap(elements[i]);
		}
		return arr;
	}

	/**
	 * Queries the DOM using a CSS selector and returns an InDom object
	 * for the first matching element, or `null` if none found.
	 *
	 * @param {string} selector - The CSS selector to match
	 * @param {ParentNode | InDom} [container=document] - The container element or InDom object to search within
	 * @returns {InDom | null} - InDom object for the first match, or null if none
	 */
	static getOne(selector, container) {
		if (container) {
			if (container instanceof InDom) {
				container = container.el();
			}
			selector = selector.trim();
			const l = selector[0];
			if (l == ">" || l == "~" || l == "+") {
				selector = ":scope " + selector;
			}
		}
		else {
			container = document;
		}
		return InDom.#wrap(container.querySelector(selector));
	}

	/**
	 * Fetches the element with the specified ID and returns an InDom object that contains it.
	 * Returns `null` if no element with the given ID is found.
	 *
	 * @param {string} id - The ID of the element to fetch
	 * @returns {InDom | null} - InDom object or null if not found
	 */
	static getById(id) {
		const el = document.getElementById(id);
		return el ? InDom.#wrap(el) : null;
	}

	/**
	 * Harvests form-field values into a plain object.
	 * 
	 * - `getValues()` → all fields in document
	 * - `getValues('name','size')` → only listed fields
	 * - `getValues(container)` → all fields, scoped to container
	 * - `getValues('name','size',container)` → scoped to container
	 * - `getValues('name_')` → groups dynamic fields name_123, name_456 …
	 * - `getValues([])` → all fields, no underscore grouping
	 *
	 * @param {...(string | string[] | InDom)} args - Field names or an InDom container
	 * @returns {Object} map of field names → values (string | string[] | FileList | null)
	 * @throws {TypeError} If a given field name is not a non-empty string 
	 */
	static getValues(...args) {
		let len = args.length;
		const groupsSet = new Set(); // which names will be grouped by _ 
		let forceGroup = false; // if true it will groups names that contain _
		let container = document;
		let selectors;

		if (len == 0) {
			selectors = ["[name]"];
			forceGroup = true;
		}
		else {
			if (args[len - 1] instanceof InDom) {
				container = args.pop();
				len--;
			}
			if (len == 0) {
				selectors = ["[name]"];
				forceGroup = true;
			}
			else {
				if (Array.isArray(args[0])) {
					args = args[0];
					len = args.length;
				}
				if (len == 0) {
					selectors = ["[name]"];
				}
				else {
					selectors = new Array(len);
					for (let i = 0; i < len; i++) {
						const name = args[i];
						if (typeof name !== 'string' || !name) {
							throw new TypeError('Field names, if given, must be a non-empty strings'
								, { cause: name });
						}
						if (name.endsWith("_")) {
							groupsSet.add(name.slice(0, -1));
							selectors[i] = `[name^="${name}"]`;
							continue;
						}
						selectors[i] = `[name="${name}"]`;
					}
				}
			}
		}

		const o = {}; // the object to return 
		const nl = InDom.get(selectors.join(", "), container);
		nl.each(n => {
			const tag = n.el().tagName.toLowerCase();
			if (tag == "input" || tag == "textarea" || tag == "select") {
				const name = n.getAttr('name');
				const v = n.getValue(container);
				const ind = name.indexOf("_");
				if (ind == -1) {
					o[name] = v;
					return;
				}
				const key = name.slice(0, ind);
				if (forceGroup || groupsSet.has(key)) {
					if (!InDom.#isObject(o[key])) {
						o[key] = {};
					}
					o[key][name.slice(ind + 1)] = v;
					return;
				}
				o[name] = v;
			}
		});
		return o;
	}

	/**
	 * Tests whether a value is a plain object (not an array, null, or class instance).
	 * @private
	 * @param {any} o - The value to test
	 * @returns {boolean} True if the value is a plain object
	 */
	static #isObject(o) {
		return o && typeof o === 'object' && !Array.isArray(o) && o.constructor === Object;
	}

	/**
	 * Return an InDom object that contains an existing DOM Element, or returns null if invalid.
	 * @private
	 * @param {Element | null} el - The underlying DOM element
	 * @returns {InDom | null} Existing InDom instance or a new one, or null if invalid
	 */
	static #wrap(el) {
		if (!el) {
			return null;
		}
		if (this.#map.has(el)) {
			return this.#map.get(el);
		}
		const n = new InDom(el);
		this.#map.set(el, n);
		return n;
	}

	/**
	 * Flattens single-entry arrays for variadic helpers.
	 * @private
	 * @param {Array} arr - Raw argument array
	 * @returns {Array} Flattened array or original array
	 */
	static #flattenSingleArray(arr) {
		return arr.length === 1 && Array.isArray(arr[0]) ? arr[0] : arr;
	}

	/**
	 * Convert incoming content to a DOM Node.
	 * @private
	 * @param {string|Node|InDom} child
	 * @returns {Node}
	 */
	static #normalizeChild(child) {
		if (child instanceof InDom) {
			return child.el();
		}
		if (child instanceof Node) {
			return child;
		}

		const str = String(child).trim();
		if (!str) {
			return document.createTextNode('');
		}

		const frag = document.createRange().createContextualFragment(str);
		// If there's exactly one element child, return that element
		if (frag.childNodes.length === 1 && frag.firstChild.nodeType === Node.ELEMENT_NODE) {
			return frag.firstChild;
		}

		// If there's exactly one text node, return that text node
		if (frag.childNodes.length === 1 && frag.firstChild.nodeType === Node.TEXT_NODE) {
			return frag.firstChild;
		}

		// Otherwise, return the fragment
		return frag;
	}

	/**
	 * Inserts nodes or HTML before the first child of the underlying element of this object.
	 * Accepts multiple arguments or a single array (flattened internally).
	 *
	 * @param {(string | Node | InDom)[]} children (variadic; single array is flattened)
	 * @returns {InDom} this
	 * @throws {TypeError} if the underlying element has been removed 
	 */
	prepend(...children) {
		this.#checkElement();
		children = InDom.#flattenSingleArray(children);
		[...children].reverse().forEach(child => {
			this.#el.prepend(InDom.#normalizeChild(child));
		});
		return this;
	}

	/**
	 * Inserts nodes or HTML after the last child of the underlying element of this object.
	 * Accepts multiple arguments or a single array (flattened internally).
	 *
	 * @param {(string | Node | InDom)[]} children (variadic; single array is flattened)
	 * @returns {InDom} this
	 * @throws {TypeError} if the underlying element has been removed
	 */
	append(...children) {
		this.#checkElement();
		children = InDom.#flattenSingleArray(children);
		for (const child of children) {
			this.#el.appendChild(InDom.#normalizeChild(child));
		}
		return this;
	}

	/**
	 * Inserts nodes or HTML before the underlying element of this object
	 * (as previous siblings). Accepts multiple arguments or a single array
	 * (flattened internally).
	 *
	 * @param {(string | Node | InDom)[]} children (variadic; single array is flattened)
	 * @returns {InDom} this
	 * @throws {TypeError} if the underlying element has been removed
	 */
	before(...siblings) {
		this.#checkElement();
		siblings = InDom.#flattenSingleArray(siblings);
		[...siblings].forEach(sib => {
			this.#el.before(InDom.#normalizeChild(sib));
		});
		return this;
	}

	/**
	 * Inserts nodes or HTML after the underlying element of this object
	 * (as next siblings). Accepts multiple arguments or a single array
	 * (flattened internally).
	 *
	 * Multiple items are processed in reverse order so that the first
	 * argument appears first in the DOM.
	 *
	 * @param {(string | Node | InDom)[]} children (variadic; single array is flattened)
	 * @returns {InDom} this
	 * @throws {TypeError} if the underlying element has been removed
	 */
	after(...siblings) {
		this.#checkElement();
		siblings = InDom.#flattenSingleArray(siblings);
		for (const sib of siblings.reverse()) {
			this.#el.after(InDom.#normalizeChild(sib));
		}
		return this;
	}


	/**
	 * Registers an event listener that is automatically removed when the element is
	 * removed from the DOM (no matter how), preventing memory leaks.
	 *
	 * If no handler is provided and the event is a mouse/click event, it is auto-triggered.
	 *
	* @param {string | string[]} type - Event type, e.g. 'click', 'keydown', or an array of event types
	* @param {(n: InDom, e: Event) => void} [fn] - Handler. Omit for mouse/click to trigger the event
	* @param {AddEventListenerOptions} [opts] - Event options (once, passive, etc.)
	* @returns {Function} The internal handler. Pass it to .off() to remove manually
	* @throws {Error} if the element is not connected to the document , or document not yet loaded
	* @throws {TypeError} if the underlying element has been removed
	* @throws {Error} If auto-trigger is used with non-mouse event
	* @throws {TypeError} If handler is not a function (when provided)
	* @throws {Error} If the underlying element has been removed 
	 */
	on(type, fn, opts = {}) {
		this.#isConnected();
		const types = Array.isArray(type) ? type : [type];
		for (let i = 0; i < types.length; i++) {
			if (typeof types[i] !== 'string' || !types[i]) {
				throw new TypeError('Event type must be a non-empty string', { cause: type });
			}
		}

		// auto-trigger case 
		if (fn === undefined) {
			for (let i = 0; i < types.length; i++) {
				if (!types[i].includes("mouse") && !types[i].includes("click")) {
					throw new Error(`Auto-trigger only supported for mouse events, not '${types[i]}'`);
				}
			}

			for (let i = 0; i < types.length; i++) {
				this.#el.dispatchEvent(
					new MouseEvent(types[i], { bubbles: true, cancelable: true, view: window })
				);
			}
			return () => { };
		}

		if (typeof fn !== 'function') {
			throw new TypeError('Event handler must be a function', { cause: fn });
		}
		if (!InDom.#isObject(opts)) {
			throw new TypeError('Options must be an object if defined', { cause: opts });
		}
		this.#checkAbortController();

		opts = { ...opts, signal: this.#abortController.signal };
		const ifn = fn.bind(null, this);
		for (let i = 0; i < types.length; i++) {
			this.#checkEvents(types[i]);
			this.#el.addEventListener(types[i], ifn, opts);
			this.#events[types[i]].add(ifn);
		}
		return ifn;
	}

	/**
	 * Removes event listener(s) registered with `.on()`, its shorthand methods, or `onRemove()`.
	 * 
	 * @param {string} [type] - Event type. If omitted, **all** listeners are removed.
	 * @param {Function} [fn] - Handler returned by `.on()` / `onRemove()`. If omitted, **all** listeners of `type` are removed.
	 * @returns {InDom} The current InDom instance (chainable)
	 * @throws {TypeError} If `type` is provided but is not a non-empty string
	 * @throws {Error} If the underlying element has been removed 
	 */
	off(type, fn) {
		this.#checkElement();

		if (!this.#events) {
			return this;
		}

		// Special handling for onRemove pseudo-event
		if (type == "onRemove") {
			return this.#offOnRemove(fn);
		}

		// Remove all listeners of all types
		if (type === undefined) {
			this.#offOnRemove();
			for (const t in this.#events) {
				for (const h of this.#events[t]) {
					this.#el.removeEventListener(t, h);
				}
				delete this.#events[t];
			}
			return this;
		}

		if (typeof type !== 'string' || !type) {
			throw new TypeError('Event type, if given, must be a non-empty string', { cause: type });
		}

		if (!this.#events[type]) {
			return this;
		}

		// Remove all listeners of this type
		if (fn === undefined) {
			for (const h of this.#events[type]) {
				this.#el.removeEventListener(type, h);
			}
			delete this.#events[type];
			return this;
		}

		// Remove specific listener
		this.#el.removeEventListener(type, fn);
		this.#events[type].delete(fn);
		if (this.#events[type].size === 0) {
			delete this.#events[type];
		}
		return this;
	}

	/**
	 * One-shot version of .on() – listener removes itself after first execution.
	 * @param {string} type - Event type, e.g. 'click', 'keydown'
	 * @param {(n: InDom, e: Event) => void} [fn] - Handler. Omit for mouse/click to trigger the event
	 * @param {AddEventListenerOptions} [opts] - Event options (once, passive, etc.)
	 * @returns {Function} wrapped listener
	 * 
	 * @throws {Error} if the element is not connected to the document , or document not yet loaded
	 * @throws {TypeError} if the underlying element has been removed
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If the underlying element has been removed 
	 */
	once(type, fn, opts = {}) {
		return this.on(type, fn, { ...opts, once: true });
	}

	/**
	 * @param {(n: InDom, e: MouseEvent) => void} [fn]  Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}]
	 * @returns {Function} wrapped listener
	 * 
	 * @throws {Error} if the element is not connected to the document , or document not yet loaded
	 * @throws {TypeError} if the underlying element has been removed
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If the underlying element has been removed 
	 */
	onClick(fn, opts) {
		return this.on('click', fn, opts);
	}

	/**
	 * @param {(n: InDom, e: MouseEvent) => void} [fn]  Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}]
	 * @returns {Function} wrapped listener
	 * 
	 * @throws {Error} if the element is not connected to the document , or document not yet loaded
	 * @throws {TypeError} if the underlying element has been removed
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If the underlying element has been removed 
	 */
	onDoubleClick(fn, opts) {
		return this.on('dblclick', fn, opts);
	}

	/**
	 * @param {(n: InDom, e: MouseEvent) => void} [fn]  Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}]
	 * @returns {Function} wrapped listener
	 * 
	 * @throws {Error} if the element is not connected to the document , or document not yet loaded
	 * @throws {TypeError} if the underlying element has been removed
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If the underlying element has been removed 
	 */
	onEnter(fn, opts) {
		return this.on('mouseenter', fn, opts);
	}

	/**
	 * @param {(n: InDom, e: MouseEvent) => void} [fn]  Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}]
	 * @returns {Function} wrapped listener
	 * 
	 * @throws {Error} if the element is not connected to the document , or document not yet loaded
	 * @throws {TypeError} if the underlying element has been removed
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If the underlying element has been removed 
	 */
	onLeave(fn, opts) {
		return this.on('mouseleave', fn, opts);
	}

	/**
	 * @param {(n: InDom, e: FocusEvent) => void} [fn]  Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}]
	 * @returns {Function} wrapped listener
	 * 
	 * @throws {Error} if the element is not connected to the document , or document not yet loaded
	 * @throws {TypeError} if the underlying element has been removed
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If the underlying element has been removed 
	 */
	onFocus(fn, opts) {
		return this.on('focus', fn, opts);
	}

	/**
	 * @param {(n: InDom, e: FocusEvent) => void} [fn]  Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}]
	 * @returns {Function} wrapped listener
	 * 
	 * @throws {Error} if the element is not connected to the document , or document not yet loaded
	 * @throws {TypeError} if the underlying element has been removed
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If the underlying element has been removed 
	 */
	onBlur(fn, opts) {
		return this.on('blur', fn, opts);
	}

	/**
	 * @param {(n: InDom, e: Event) => void} [fn]  Function to be wrapped and added to listener
	 *                         Omit to call **all** listeners of this type.
	 * @param {AddEventListenerOptions} [opts={}]
	 * @returns {Function} wrapped listener
	 * 
	 * @throws {Error} if the element is not connected to the document , or document not yet loaded
	 * @throws {TypeError} if the underlying element has been removed
	 * @throws {Error} If auto-trigger is used with non-mouse event
	 * @throws {TypeError} If handler is not a function (when provided)
	 * @throws {Error} If the underlying element has been removed 
	 */
	onChange(fn, opts) {
		return this.on('change', fn, opts);
	}

	/**
	 * Registers a callback function that runs after the object's internal state
	 * (listeners, data) has been cleaned up, and just before its element is removed from the DOM.
	 * @param {(n: InDom) => void} fn - the callback function
	 * @returns {Function} internal handler – pass to .off('onRemove', …) to unregister
	 * @throws {TypeError} If `fn` is not a function
	 * @throws {Error} If the underlying element has been removed 
	 */
	onRemove(fn) {
		this.#isConnected();
		if (typeof fn !== 'function') {
			throw new TypeError('Remove event handler must be a function', { cause: fn });
		}
		this.#checkEvents('onRemove');
		const ifn = fn.bind(null, this);
		this.#events.onRemove.add(ifn);
		return ifn;
	}

	/**
	 * Exposes the underlying native DOM element (read-only reference).
	 * @returns {Document|Element}
	 * @throws {Error} If the underlying element has been removed 
	 */
	el() {
		this.#checkElement();
		return this.#el;
	}

	/**
	 * Exposes the underlying native DOM element (read-only reference).
	 * @returns {Document|Element} alias of el() 
	 * 
	 * @throws {Error} If the underlying element has been removed 
	 */
	getElement() {
		return this.el();
	}

	/**
	 * Adds one or more CSS classes to the underlying element.
	 * 
	 * @param  {...string} names - Class names to add (variadic)
	 * @returns {InDom} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	addClass(...names) {
		this.#checkElement();
		this.#el.classList.add(...names);
		return this;
	}

	/**
	 * Tests whether the underlying element has the given CSS class.
	 * 
	 * @param {string} name - Class name to test
	 * @returns {boolean} `true` if the class is present, `false` otherwise
	 * @throws {Error} If the underlying element has been removed
	 */
	hasClass(name) {
		this.#checkElement();
		return this.#el.classList.contains(name);
	}

	/**
	 * Removes one or more CSS classes from the underlying element.
	 * 
	 * @param  {...string} names - Class names to remove (variadic)
	 * @returns {InDom} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	removeClass(...names) {
		this.#checkElement();
		this.#el.classList.remove(...names);
		return this;
	}

	/**
	 * Checks if the underlying element has an attribute.
	 *
	 * @param {string} k - Attribute name
	 * @returns {boolean} `true` if the attribute exists, `false` otherwise
	 * @throws {Error} If the underlying element has been removed
	 */
	hasAttr(k) {
		this.#checkElement();
		return this.#el.hasAttribute(k);
	}

	/**
	 * Gets the value of an attribute of the underlying element.
	 *
	 * @param {string} k - Attribute name
	 * @returns {string | null} The attribute value, or `null` if not present
	 * @throws {Error} If the underlying element has been removed
	 */
	getAttr(k) {
		this.#checkElement();
		return this.#el.getAttribute(k);
	}

	/**
	 * Sets an attribute value on the underlying element.
	 *
	 * @param {string} k - Attribute name
	 * @param {any} v - Attribute value (converted to string)
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	setAttr(k, v) {
		this.#checkElement();
		this.#el.setAttribute(k, v);
		return this;
	}

	/**
	 * Removes an attribute from the underlying element.
	 *
	 * @param {string} k - Attribute name
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	removeAttr(k) {
		this.#checkElement();
		this.#el.removeAttribute(k);
		return this;
	}

	/**
	 * Checks if the underlying element has a `data-*` attribute
	 * or if the InDom object has in-memory data for this key.
	 *
	 * @param {any} k - The data key
	 * @returns {boolean} `true` if the data key exists, either as attribute or in memory
	 * @throws {Error} If the underlying element has been removed
	 */
	hasData(k) {
		return this.hasAttr('data-' + k) || (this.#data && this.#data.has(k));
	}

	/**
	 * Reads a `data-*` attribute or in-memory data.
	 * Only available for connected elements to guarantee cleanup and single-instance consistency.
	 *
	 * @param {any} k - The data key
	 * @returns {any} The value from `data-*` attribute or in-memory store
	 * @throws {Error} If the element is not connected or removed
	 */
	getData(k) {
		this.#isConnected();
		const attrName = 'data-' + k;
		if (this.hasAttr(attrName)) {
			return this.getAttr(attrName);
		}
		this.#checkData();
		return this.#data.get(k);
	}

	/**
	 * Stores a `data-*` attribute or in-memory data.
	 * Only available for connected elements to guarantee cleanup and single-instance consistency.
	 *
	 * @param {any} k - The data key
	 * @param {any} v - The value to store
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the element is not connected or removed
	 */
	setData(k, v) {
		this.#isConnected();
		const attrName = 'data-' + k;
		if (this.hasAttr(attrName)) {
			this.setAttr(attrName, v);
		} else {
			this.#checkData();
			this.#data.set(k, v);
		}
		return this;
	}

	/**
	 * Removes a `data-*` attribute or in-memory data.
	 * Only available for connected elements to guarantee cleanup and single-instance consistency.
	 *
	 * @param {any} k - The data key
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the element is not connected or removed
	 */
	removeData(k) {
		this.#isConnected();
		const attrName = 'data-' + k;
		if (this.hasAttr(attrName)) {
			this.removeAttr(attrName);
		} else {
			this.#checkData();
			this.#data.delete(k);
		}
		return this;
	}

	/**
	 * Sets the `innerHTML` of the underlying element.
	 *
	 * @param {string} content - The new HTML content to set
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	setHtml(content) {
		this.#checkElement();
		this.#el.innerHTML = content;
		return this;
	}

	/**
	 * Returns the `innerHTML` of the underlying element.
	 *
	 * @returns {string} The current HTML content of the element
	 * @throws {Error} If the underlying element has been removed
	 */
	getHtml() {
		this.#checkElement();
		return this.#el.innerHTML;
	}

	/**
	 * Sets style properties (object map or single prop/value).
	 * 
	 * @param {string|Object} k  property name OR object map
	 * @param {string} [v]  value when first arg is a string
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed 
	 */
	setStyle(k, v) {
		this.#checkElement();
		if (arguments.length === 2) {
			k = { [k]: v };
		}
		if (!InDom.#isObject(k)) {
			throw new TypeError('css param must be an object');
		}
		for (const p in k) {
			const styleKey = p.includes('-') ? p.replace(/-([a-z])/g, (_, c) => c.toUpperCase()) : p;
			this.#el.style[styleKey] = k[p];
		}
		return this;
	}

	/**
	 * Gets computed CSS values for the underlying element.
	 *
	 * @param {...string} [properties] - Zero or more CSS property names (dash-case).
	 *        When no arguments are supplied the full CSSStyleDeclaration is returned.
	 *        When exactly one property is supplied its computed value is returned as a string.
	 *        When two or more properties are supplied an object map { prop: value } is returned.
	 * @returns {CSSStyleDeclaration|string|Object<string,string>}
	 * @throws {Error} If the underlying element has been removed
	 */
	getStyle(...properties) {
		this.#checkElement();
		const style = window.getComputedStyle(this.#el);
		const len = properties.length;
		if (len == 0) {
			return style;
		}
		if (len == 1) {
			return style.getPropertyValue(properties[0]);
		}

		const out = {};
		for (const p of properties) {
			out[p] = style.getPropertyValue(p);
		}
		return out;
	}

	/**
	 * Checks if the underlying element matches a CSS selector
	 * 
	 * @param {string} selector - CSS selector to match against.
	 * @returns {boolean} True if matches , false if doesn't
	 * @throws {Error} If the underlying element has been removed 
	 */
	is(selector) {
		this.#checkElement();
		return this.#el.matches(selector);
	}

	/**
	 * Gets the same InDom object if its underlying element matches the selector 
	 * or the InDom object for its parent/ancestor element that matches the selector 
	 * or null if none of the above 
	 * 
	 * @param {string} [selector] - CSS selector to match against.
	 * @returns {InDom|null} InDom object
	 * @throws {Error} If the underlying element has been removed 
	 */
	getSelfOrParent(selector) {
		this.#checkElement();
		return InDom.#wrap(this.#el.closest(selector));
	}

	/**
	 * Gets the closest ancestor that matches the selector, or the direct parent if no selector provided.
	 * 
	 * @param {string} [selector] - CSS selector to match against ancestors.
	 *                       If omitted, returns the direct parent.
	 * @returns {InDom|null} InDom object containing the parent/ancestor element, or null if not found
	 * @throws {Error} If the underlying element has been removed 
	 */
	getParent(selector) {
		this.#checkElement();
		const parent = this.#el.parentElement;
		return InDom.#wrap(selector ? parent?.closest(selector) : parent);
	}

	/**
	 * Gets the previous sibling that matches the selector.
	 * If no selector is supplied, the very previous element sibling is returned.
	 * Returns `null` if nothing is found.
	 *
	 * @param {string} [selector] - CSS selector to test against
	 * @returns {InDom | null} wrapped sibling or null
	 * @throws {Error} If the underlying element has been removed 
	 */
	getPrev(selector) {
		this.#checkElement();
		return this.#getNextPrev("previousElementSibling", selector);
	}

	/**
	 * Gets the next sibling that matches the selector.
	 * If no selector is supplied, the very next element sibling is returned.
	 * Returns `null` if nothing is found.
	 *
	 * @param {string} [selector] - CSS selector to test against
	 * @returns {InDom | null} wrapped sibling or null
	 * @throws {Error} If the underlying element has been removed 
	 */
	getNext(selector) {
		this.#checkElement();
		return this.#getNextPrev("nextElementSibling", selector);
	}

	/**
	 * Returns a DOMRect with the underlying element’s viewport-relative bounding box.
	 * 
	 * @returns {DOMRect} Object with left / x, top / y, width, height, right, bottom.
	 * @throws {Error} If the underlying element has been removed
	 */
	getBox() {
		this.#checkElement();
		return this.#el.getBoundingClientRect()
	}

	/**
	 * Returns a DOMRect that expands the underlying element’s bounding box by its margins.
	 * 
	 * @returns {DOMRect} Object with left / x, top / y, width, height, right, bottom.
	 * @throws {Error} If the underlying element has been removed
	 */
	getOuterBox() {
		this.#checkElement();
		const box = this.getBox();
		const style = window.getComputedStyle(this.#el);
		const marginTop = parseFloat(style.marginTop) || 0;
		const marginLeft = parseFloat(style.marginLeft) || 0;
		return new DOMRect(
			box.left - marginLeft,
			box.top - marginTop,
			box.width + marginLeft + (parseFloat(style.marginRight) || 0),//width + marginLeft + marginRight
			box.height + marginTop + (parseFloat(style.marginBottom) || 0) //height + marginTop + marginBottom
		);
	}

	/**
	 * Returns a DOMRect with coordinates relative to the underlying element’s offset parent
	 * (borders of the parent are excluded).
	 * 
	 * @returns {DOMRect} Object with left / x, top / y, width, height, right, bottom.
	 * @throws {Error} If the underlying element has been removed
	 */
	getRelativeBox() {
		this.#checkElement();
		const box = this.getBox();
		const parent = this.#el.offsetParent;
		let offsetX = 0, offsetY = 0;
		if (parent && parent !== document.body && parent !== document.documentElement) {
			const parentRect = parent.getBoundingClientRect();
			const parentStyle = window.getComputedStyle(parent);
			offsetX = parentRect.left + (parseFloat(parentStyle.borderLeftWidth) || 0);
			offsetY = parentRect.top + (parseFloat(parentStyle.borderTopWidth) || 0);
		}
		return new DOMRect(
			box.left - offsetX,
			box.top - offsetY,
			box.width,
			box.height
		);
	}


	/**
	 * Returns the current value of the element, normalized for its type.
	 *
	 * - Single value inputs (`input`, `textarea`, etc.): string
	 * - `select` (single): string or `null`
	 * - `select` (multiple): array of selected values or empty array
	 * - `input[type=checkbox]`: array of checked values
	 * - `input[type=radio]`: string of checked value or `null`
	 * - `input[type=file]`: `FileList` (zero or more files)
	 *
	 * @param {Document | Element | InDom} [container] - Scope for checkbox and radio group lookups.
	 *        When provided, only searches within this container for related elements. Defaults to `document`.
	 * @returns {string | string[] | FileList | null}
	 * @throws {Error} If the underlying element has been removed
	 */
	getValue(container) {
		this.#checkElement();
		if (container) {
			if (container instanceof InDom) {
				container = container.el();
			}
		}
		else {
			container = document;
		}
		const el = this.#el;

		if (el.tagName === 'SELECT' && el.multiple) {
			return [...el.selectedOptions].map(opt => opt.value);
		}
		if (el.tagName === 'SELECT') {
			return el.value || null;
		}
		if (el.type === 'checkbox') {
			return [...container.querySelectorAll(`input[type="checkbox"][name="${el.name}"]:checked`)].map(cb => cb.value);
		}
		if (el.type === 'radio') {
			const checked = container.querySelector(`input[name="${el.name}"]:checked`);
			return checked ? checked.value : null;
		}
		if (el.type === 'file') {
			return el.files; // el.files is always a FileList, even if empty.
		}
		return 'value' in el ? el.value : null;
	}

	/**
	 * Sets the element’s value, normalised for its type.
	 * - `input`, `textarea`: value is coerced to string.
	 * - `select` (single): chooses the matching option.
	 * - `select` (multiple): array of values to select.
	 * - `input[type=checkbox]` / `input[type=radio]` (same name group): array of values to check.
	 *
	 * @param {string|string[]} value - Value(s) to assign
	 * @param {Document | Element | InDom} [container] - Scope for checkbox and radio group lookups.
	 *        When provided, only searches within this container for related elements. Defaults to `document`.
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {TypeError} if the element has no writable value
	 * @throws {Error} If the underlying element has been removed 
	 */
	setValue(value, container) {
		this.#checkElement();

		// Resolve container
		if (container) {
			if (container instanceof InDom) {
				container = container.el();
			}
		}
		else {
			container = document;
		}
		const el = this.#el;
		const vals = Array.isArray(value) ? value : [value];

		// Handle <select multiple>
		if (el.tagName === 'SELECT' && el.multiple) {
			[...el.options].forEach(opt => opt.selected = vals.includes(opt.value));
			return this;
		}

		// Handle checkbox group
		if (el.type === 'checkbox') {
			[...container.querySelectorAll(`input[type="checkbox"][name="${el.name}"]`)].forEach(
				cb => cb.checked = vals.includes(cb.value)
			);
			return this;
		}

		// Handle radio group
		if (el.type === 'radio') {
			[...container.querySelectorAll(`input[type="radio"][name="${el.name}"]`)].forEach(
				rb => rb.checked = vals.includes(rb.value)
			);
			return this;
		}

		// Generic value assignment
		if ('value' in el) {
			el.value = String(vals[0] ?? '');
			return this;
		}

		throw new TypeError('Element has no value to set', { cause: el });
	}

	/**
	 * Cleans the internal state of the object and removes the underlying DOM element from the document. 
	 * This method is also triggered automatically, when the element is removed from the DOM by any other means.
	 * 
	 * @throws {Error} If the underlying element has already been removed
	 */
	remove() {
		this.#checkElement();
		this.#el.remove();
		this.#destroy();
	}

	/**
	 * Ensures wrapper is not destroyed.
	 * @private
	 */
	#checkElement() {
		if (!this.#el) {
			throw new Error('The element has been removed');
		}
	}

	/**
	 * Lazily creates AbortController.
	 * @private
	 */
	#checkAbortController() {
		if (!this.#abortController) this.#abortController = new AbortController();
	}

	/**
	 * Lazily creates data Map.
	 * @private
	 */
	#checkData() {
		if (!this.#data) {
			if (!InDom.#map.has(this.#el)) {
				InDom.#map.set(this.#el, this);
			}
			this.#data = new Map();
		}
	}

	/**
	 * Lazily creates events bucket and type Set.
	 * @private
	 * @param {string} type
	 */
	#checkEvents(type) {
		if (!this.#events) {
			if (!InDom.#map.has(this.#el)) {
				InDom.#map.set(this.#el, this);
			}
			this.#events = {};
		}
		if (!this.#events[type]) {
			this.#events[type] = new Set();
		}
	}

	/**
	 * Ensures element is in DOM; throws if not.
	 * @private
	 * @throws {Error} if the element is not connected or InDom is not ready 
	 */
	#isConnected() {
		if (!InDom.#ready) {
			throw new Error('DOM content must be loaded first for this operation');
		}
		this.#checkElement();
		if (!this.#el.isConnected) throw new Error('Element must be connected to DOM for this operation'
			, { cause: this.#el });
	}

	/**
	 * Removes `onRemove` handler(s) from the internal event registry.
	 * Called internally by {@link off} when type is `"onRemove"`.
	 *
	 * @private
	 * @param {Function} [fn] - Specific handler to remove.  
	 *                              If omitted, removes **all** `onRemove` handlers.
	 * @returns {this} The current InDom instance (chainable)
	 */
	#offOnRemove(fn) {
		if (!this.#events.onRemove) {
			return this;
		}

		if (fn === undefined) {
			delete this.#events.onRemove;
			return this;
		}

		this.#events.onRemove.delete(fn);
		if (this.#events.onRemove.size === 0) {
			delete this.#events.onRemove;
		}
		return this;
	}

	/**
	 * Shared walker for getNext / getPrev.
	 * @private
	 * @param {"nextElementSibling"|"previousElementSibling"} prop
	 * @param {string} [selector]
	 * @returns {InDom|null}
	 */
	#getNextPrev(prop, selector) {
		let sib = this.#el[prop];
		while (sib) {
			if (!selector || sib.matches(selector)) {
				return InDom.#wrap(sib);
			}
			sib = sib[prop];
		}
		return null;
	}

	/**
	 * Destroys the current InDom instance: aborts listeners, clears data, runs `onRemove` hooks,
	 * removes from cache, and nulls references.
	 * @throws {Error} If the underlying element has been removed
	 */
	#destroy() {
		this.#checkElement();
		if (this.#abortController) {
			this.#abortController.abort();
			this.#abortController = null;
		}
		if (this.#data) {
			this.#data.clear();
			this.#data = null;
		}
		const removeHandlers = this.#events && this.#events.onRemove ? this.#events.onRemove : [];
		this.#events = null;
		InDom.#map.delete(this.#el);
		removeHandlers.forEach(fn => fn(this));
		this.#el = null;
	}

}

/* -----------------------------------------------------------------------------
   Shortcuts for convenience
   --------------------------------------------------------------------------- */

/** @returns {InDomArray} */
const $a = InDom.get;

/** @returns {InDom | null} */
const $1 = InDom.getOne;

/** @returns {InDom | null} */
const $id = InDom.getById;

/** @returns {InDom} */
const $n = source => new InDom(source);

const $v = InDom.getValues;

/* auto-initialise observer */
InDom.init();