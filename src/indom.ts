/*! InDom v1.0.2 MIT */

/** 
 * Callback type returned by .on()/.onRemove() and accepted by .off()
 */
export type InDomHandler = EventListener | (() => void);

/** 
 * Represents any normalized value that an InDom element can produce.
 * May be a string, array of strings, FileList, number, or null.
 */
export type InDomValue = string | string[] | FileList | null;

/** 
 * Map of field names to their values, supporting nested objects for grouped dynamic fields.
 */
export type InDomValuesMap = Record<string, InDomValue | Record<string, InDomValue>>;

/**
 * Acceptable child types for insertion methods like append, prepend, before, after.
 */
export type InDomChild = string | Node | InDom;

/**
 * One or more children, or a single array of them (flattened internally).
 */
export type InDomChildren = InDomChild | InDomChild[];

/**
 * Array-like container for bulk DOM element operations.
 * Extends Array to provide chainable bulk operations on multiple InDom objects.
 *
 * @extends Array<InDom>
 */
export class InDomArray extends Array<InDom> {

	constructor();
	constructor(length: number);
	/**
	 * Creates a new InDomArray instance.
	 * @param {...InDom} items - InDom objects to include in the array
	 */
	constructor(...items: InDom[]);
	constructor(...args: any[]) {
		super(...args);
	}

	/**
	 * Sets an attribute on all objects in the array.
	 * 
	 * @param {string} k - Attribute name
	 * @param {any} v - Attribute value (converted to string)
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element's underlying DOM node has been removed
	 */
	setAttr(k: string, v: any): this {
		return this.#eachSetter('setAttr', [k, v]);
	}

	/**
	 * Removes an attribute on all objects in the array.
	 * 
	 * @param {string} k - Attribute name
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If an element's underlying DOM node has been removed
	 */
	removeAttr(k: string): this {
		return this.#eachSetter('removeAttr', [k]);
	}

	/**
	 * Sets data attribute or in-memory data on all objects.
	 * Only available for connected elements to guarantee cleanup and single-instance consistency.
	 * 
	 * @param {any} k - Data key
	 * @param {any} v - Data value
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 * @throws {Error} If any element is disconnected or DOM not ready
	 */
	setData(k: any, v: any): this {
		this.#isConnected();
		return this.#eachSetter('setData', [k, v]);
	}

	/**
	 * Removes data attribute or in-memory data on all objects.
	 * Only available for connected elements to guarantee cleanup and single-instance consistency.
	 * 
	 * @param {any} k - Data key
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 * @throws {Error} If any element is disconnected or DOM not ready
	 */
	removeData(k: any): this {
		this.#isConnected();
		return this.#eachSetter('removeData', [k]);
	}

	/**
	 * Sets form value on all objects.
	 * 
	 * @param {InDomValue} v - Value to assign
	 * @param {Document | Element | InDom} [c] - Optional container for grouped inputs
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 */
	setValue(v: InDomValue, c?: Document | Element | InDom): this {
		return this.#eachSetter('setValue', [v, c]);
	}

	/**
	 * Sets innerHTML on all objects.
	 * 
	 * @param {string} c - HTML content
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 */
	setHtml(c: string): this {
		return this.#eachSetter('setHtml', [c]);
	}

	/**
	 * Sets style properties on all objects.
	 * 
	 * @param {string | Record<string, string>} k - CSS property name or object map
	 * @param {string} [v] - Value when `k` is a string
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 */
	setStyle(k: string | Record<string, string>, v?: string): this {
		return this.#eachSetter('setStyle', [k, v]);
	}

	/**
	 * Adds CSS classes to all objects.
	 * 
	 * @param {...string} names - Class names to add
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 */
	addClass(...names: string[]): this {
		return this.#eachSetter('addClass', names);
	}

	/**
	 * Removes CSS classes from all objects.
	 * 
	 * @param {...string} names - Class names to remove
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 */
	removeClass(...names: string[]): this {
		return this.#eachSetter('removeClass', names);
	}

	/**
	 * Appends children to all objects.
	 * 
	 * @param {...InDomChildren} children - Children to append
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 */
	append(...children: InDomChildren[]): this {
		return this.#eachSetter('append', children);
	}

	/**
	 * Prepends children to all objects.
	 * 
	 * @param {...InDomChildren} children - Children to prepend
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 */
	prepend(...children: InDomChildren[]): this {
		return this.#eachSetter('prepend', children);
	}

	/**
	 * Inserts nodes or HTML after all objects (as next siblings).
	 * 
	 * @param {...InDomChildren} siblings - Siblings to insert after
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 */
	after(...siblings: InDomChildren[]): this {
		return this.#eachSetter('after', siblings);
	}

	/**
	 * Inserts nodes or HTML before all objects (as previous siblings).
	 * 
	 * @param {...InDomChildren} siblings - Siblings to insert before
	 * @returns {this} The current InDomArray for chaining
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 */
	before(...siblings: InDomChildren[]): this {
		return this.#eachSetter('before', siblings);
	}

	/**
	 * Registers event listener(s) on all elements. Auto-removed on element removal.
	 *
	 * @param type - Event type or array of types
	 * @param fn   - Handler function. Omit for mouse/click to auto-trigger
	 * @param opts - Event options (once, passive, etc.)
	 * @returns Array of handlers (one per element)
	 * @throws If any element is disconnected or DOM not ready
	 */
	on(type: string, fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler[];
	on(type: string[], fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler[];
	on(
		type: string | string[],
		fn?: (n: InDom, e: Event) => void,
		opts?: AddEventListenerOptions
	): InDomHandler[] {
		this.#isConnected();
		const a: InDomHandler[] = new Array(this.length);
		for (let i = 0; i < this.length; i++) {
			a[i] = this[i].on(type as any, fn as any, opts as any);
		}
		return a;
	}

	/**
	 * Adds one-time event listeners to all objects.
	 * 
	 * @param {string} type - Event type
	 * @param {(n: InDom, e: Event) => void} [fn] - Handler function
	 * @param {AddEventListenerOptions} [opts={}] - Options
	 * @returns {InDomHandler[]} Array of handlers
	 */
	once(type: string, fn?: (n: InDom, e: Event) => void, opts: AddEventListenerOptions = {}): InDomHandler[] {
		return this.on(type, fn, { ...opts, once: true });
	}

	/**
	 * Removes event listener(s) registered with `.on()`, its shorthand methods, or `onRemove()`.
	 * 
	 * @param {string} [type] - Event type
	 * @param {InDomHandler[]} [fnArr] - Handlers to remove
	 * @returns {this} The current InDomArray for chaining
	 * @throws {RangeError} If fnArr length doesn’t match array length
	 * @throws {TypeError} If `type` is provided but is not a non-empty string
	 * @throws {Error} If an element of an InDom object in the array has been removed 
	 */
	off(type?: string, fnArr?: InDomHandler[]): this {
		if (fnArr) {
			if (!Array.isArray(fnArr) || fnArr.length !== this.length) {
				throw new RangeError(`Expected ${this.length} handlers, got ${fnArr?.length ?? 0}`);
			}
			this.forEach((n, i) => n.off(type, fnArr[i]));
		} else {
			this.forEach(n => n.off(type));
		}
		return this;
	}

	/**
	 * Adds `click` event listeners to all objects in the array.
	 *
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function to attach.  
	 *        Omit to trigger all existing click listeners programmatically.
	 * @param {AddEventListenerOptions} [opts] - Optional event listener options (e.g. `once`, `passive`).
	 * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
	 *
	 * @throws {Error} If auto-trigger is used with a non-mouse event.
	 * @throws {TypeError} If `fn` is provided but not a function.
	 * @throws {Error} If an element’s underlying DOM node has been removed.
	 * @throws {Error} If an element’s underlying DOM node is not connected to the document.
	 */
	onClick(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler[] {
		return this.on('click', fn as ((n: InDom, e: Event) => void) | undefined, opts);
	}

	/**
	 * Adds `dblclick` (double-click) event listeners to all objects in the array.
	 *
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function to attach.  
	 *        Omit to trigger all existing double-click listeners programmatically.
	 * @param {AddEventListenerOptions} [opts] - Optional event listener options.
	 * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
	 *
	 * @throws {Error} If auto-trigger is used with a non-mouse event.
	 * @throws {TypeError} If `fn` is provided but not a function.
	 * @throws {Error} If an element’s underlying DOM node has been removed.
	 * @throws {Error} If an element’s underlying DOM node is not connected to the document.
	 */
	onDoubleClick(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler[] {
		return this.on('dblclick', fn as ((n: InDom, e: Event) => void) | undefined, opts);
	}

	/**
	 * Adds `mouseenter` event listeners to all objects in the array.
	 *
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function to attach.  
	 *        Omit to trigger all existing mouseenter listeners programmatically.
	 * @param {AddEventListenerOptions} [opts] - Optional event listener options.
	 * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
	 *
	 * @throws {Error} If auto-trigger is used with a non-mouse event.
	 * @throws {TypeError} If `fn` is provided but not a function.
	 * @throws {Error} If an element’s underlying DOM node has been removed.
	 * @throws {Error} If an element’s underlying DOM node is not connected to the document.
	 */
	onEnter(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler[] {
		return this.on('mouseenter', fn as ((n: InDom, e: Event) => void) | undefined, opts);
	}

	/**
	 * Adds `mouseleave` event listeners to all objects in the array.
	 *
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function to attach.  
	 *        Omit to trigger all existing mouseleave listeners programmatically.
	 * @param {AddEventListenerOptions} [opts] - Optional event listener options.
	 * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
	 *
	 * @throws {Error} If auto-trigger is used with a non-mouse event.
	 * @throws {TypeError} If `fn` is provided but not a function.
	 * @throws {Error} If an element’s underlying DOM node has been removed.
	 * @throws {Error} If an element’s underlying DOM node is not connected to the document.
	 */
	onLeave(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler[] {
		return this.on('mouseleave', fn as ((n: InDom, e: Event) => void) | undefined, opts);
	}

	/**
	 * Adds `focus` event listeners to all objects in the array.
	 *
	 * @param {(n: InDom, e: FocusEvent) => void} [fn] - Handler function to attach.  
	 *        Omit to trigger all existing focus listeners programmatically.
	 * @param {AddEventListenerOptions} [opts] - Optional event listener options.
	 * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
	 *
	 * @throws {Error} If auto-trigger is used with a non-mouse event.
	 * @throws {TypeError} If `fn` is provided but not a function.
	 * @throws {Error} If an element’s underlying DOM node has been removed.
	 * @throws {Error} If an element’s underlying DOM node is not connected to the document.
	 */
	onFocus(fn?: (n: InDom, e: FocusEvent) => void, opts?: AddEventListenerOptions): InDomHandler[] {
		return this.on('focus', fn as ((n: InDom, e: Event) => void) | undefined, opts);
	}

	/**
	 * Adds `blur` event listeners to all objects in the array.
	 *
	 * @param {(n: InDom, e: FocusEvent) => void} [fn] - Handler function to attach.  
	 *        Omit to trigger all existing blur listeners programmatically.
	 * @param {AddEventListenerOptions} [opts] - Optional event listener options.
	 * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
	 *
	 * @throws {Error} If auto-trigger is used with a non-mouse event.
	 * @throws {TypeError} If `fn` is provided but not a function.
	 * @throws {Error} If an element’s underlying DOM node has been removed.
	 * @throws {Error} If an element’s underlying DOM node is not connected to the document.
	 */
	onBlur(fn?: (n: InDom, e: FocusEvent) => void, opts?: AddEventListenerOptions): InDomHandler[] {
		return this.on('blur', fn as ((n: InDom, e: Event) => void) | undefined, opts);
	}

	/**
	 * Adds `change` event listeners to all objects in the array.
	 *
	 * @param {(n: InDom, e: Event) => void} [fn] - Handler function to attach.  
	 *        Omit to trigger all existing change listeners programmatically.
	 * @param {AddEventListenerOptions} [opts] - Optional event listener options.
	 * @returns {InDomHandler[]} Array of wrapped listeners, one per element.
	 *
	 * @throws {Error} If auto-trigger is used with a non-mouse event.
	 * @throws {TypeError} If `fn` is provided but not a function.
	 * @throws {Error} If an element’s underlying DOM node has been removed.
	 * @throws {Error} If an element’s underlying DOM node is not connected to the document.
	 */
	onChange(fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler[] {
		return this.on('change', fn, opts);
	}

	/**
	 * For each InDom object in this InDomArray:
	 * Registers a callback function that runs after the object's internal state
	 * (listeners, data) has been cleaned up, and just before its element is removed from the DOM.
	 * 
	 * @param {(n: InDom) => void} fn - Handler function
	 * @returns {InDomHandler[]} Array of handlers
	 * @throws {Error} If any element is disconnected or DOM not ready
	 */
	onRemove(fn: (n: InDom) => void): InDomHandler[] {
		this.#isConnected();
		const a: InDomHandler[] = [];
		this.forEach(n => a.push(n.onRemove(fn)));
		return a;
	}

	/**
	 * Cleans the internal state of the InDom objects of the array and removes their underlying DOM elements from the document.
	 * 
	 * @throws {Error} If any element’s underlying DOM node has been removed
	 */
	remove(): void {
		this.#eachSetter('remove', []);
	}

	/**
	 * Executes a function for each InDom in the array.
	 * 
	 * @param {(n: InDom, index: number, array: InDom[]) => void} fn - Callback
	 * @returns {this} The current InDomArray for chaining
	 */
	each(fn: (n: InDom, index: number, array: InDom[]) => void): this {
		this.forEach(fn);
		return this;
	}


	filter<S extends InDom>(
		predicate: (value: InDom, index: number, array: InDom[]) => value is S,
		thisArg?: any
	): InDomArray;
	filter(
		predicate: (value: InDom, index: number, array: InDom[]) => unknown,
		thisArg?: any
	): InDomArray;
	filter(arg: string): InDomArray;

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
	*/
	filter(arg: any, thisArg?: any): InDomArray {
		return new InDomArray(
			...(typeof arg === 'string'
				? super.filter(n => {
					const el = n.el();
					return el instanceof Element && el.matches(arg);
				})
				: super.filter(arg))
		);
	}
	/**
	 * Executes a setter method on all objects.
	 * 
	 * @private
	 * @param {keyof InDom} method - Method name
	 * @param {any[]} args - Arguments to pass
	 * @returns {this} The current InDomArray for chaining
	 */
	#eachSetter(method: keyof InDom, args: any[]): this {
		for (let i = 0; i < this.length; i++) {
		  (this[i][method] as any)(...args);
		}
		return this;
	}

	/**
	 * Verifies that DOM is ready and all elements are connected.
	 * 
	 * @private
	 * @throws {Error} If DOM not ready or any element disconnected
	 */
	#isConnected(): void {
		if (!InDom.isReady()) {
			throw new Error('DOM content must be loaded first for this operation');
		}
		for (let i = 0; i < this.length; i++) {
		  if (!this[i].el().isConnected) {
		    throw new Error('Element must be connected to DOM for this operation', { cause: this[i].el() });
		  }
		}
	}
}

/**
 * Main InDom class — contains a single DOM element per instance and provides a modern,
 * chainable API for querying, manipulation, events, data storage, and lifecycle handling with built-in safety.
 */
export class InDom {
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
	static #onReadyFns: Array<() => void> = [];

	/**
	 * Maps DOM elements/documents to their InDom instance
	 * @private
	 * @static
	 * @type {WeakMap<Element | Document, InDom>}
	 */
	static #map = new WeakMap<Element | Document, InDom>();

	/**
	 * Event storage: event-type → Set of wrapped handlers
	 * @private
	 * @type {Record<string, Set<InDomHandler>>}
	 */
	#events: Record<string, Set<InDomHandler>> | null = null;

	/**
	 * Underlying DOM element or document
	 * @private
	 * @type {Element | Document | null}
	 */
	#el: Element | Document | null = null;

	/**
	 * AbortController for automatic cleanup of event listeners
	 * @private
	 * @type {AbortController}
	 */
	#abortController: AbortController | null = null;

	/**
	 * Internal storage for arbitrary key/value data
	 * @private
	 * @type {Map<any, unknown>}
	 */
	#data: Map<any, any> | null = null;

	/**
	 * Creates an InDom object that contains an Element or the Document,
	 * or from an HTML string that produces a single Element.
	 *
	 * @param {Document | Element | string} source - DOM Element or HTML string of a DOM element
	 * @throws {TypeError} If the source is not a valid DOM Element or HTML string of a single DOM Element
	 */
	constructor(source: Document | Element | string) {
		// If an instance for this source already exists, return it
		if (source instanceof Element || source instanceof Document) {
			if (InDom.#map.has(source)) {
				return InDom.#map.get(source)!;
			}
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
			throw new TypeError(
				'Expected a DOM Element, Document, or HTML string of a DOM Element',
				{ cause: el }
			);
		}

		this.#el = el;
	}

	/**
	 * Starts the global MutationObserver that automatically destroys InDom objects
	 * when their underlying elements are removed from the DOM.
	 * 
	 * Safe to call multiple times; subsequent calls have no effect once initialized.
	 */
	static init(): void {
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
			const maybeGone = new Set<InDom>();

			for (let r = 0; r < records.length; r++) {
				const rec = records[r];

				// Use indexed loop for best performance, no Array.from allocation
				for (let i = 0; i < rec.removedNodes.length; i++) {
					const node = rec.removedNodes[i];
					if (node.nodeType !== Node.ELEMENT_NODE) continue;

					// only Element nodes reach this point
					const el = node as Element;

					// Check direct node
					if (this.#map.has(el)) {
						maybeGone.add(this.#map.get(el)!);
					}

					// Walk its subtree
					walker.currentNode = el;
					let sub: Node | null;
					while ((sub = walker.nextNode()) && el.contains(sub)) {
						if (sub instanceof Element && this.#map.has(sub)) {
							maybeGone.add(this.#map.get(sub)!);
						}
					}
				}
			}

			// Cleanup after DOM settles
			if (maybeGone.size > 0) {
				queueMicrotask(() => {
					for (const n of maybeGone) {
						if (!n.el().isConnected) {
							n.remove(); // triggers internal cleanup
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
	static isReady(): boolean {
		return InDom.#ready;
	}

	/**
	 * Registers a function to run when the DOM is ready
	 * (executed immediately if already ready).
	 *
	 * @param {() => void} fn - The callback function
	 * @throws {TypeError} If the handler is not a function
	 */
	static onReady(fn: () => void): void {
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
	static get(selector: string, container?: ParentNode | InDom): InDomArray {
		if (container) {
			if (container instanceof InDom) {
				container = container.el() as ParentNode;
			}
			selector = selector.trim();
			const l = selector[0];
			if (l === '>' || l === '~' || l === '+') {
				selector = ':scope ' + selector;
			}
		} else {
			container = document;
		}

		const elements = container.querySelectorAll(selector);
		const length = elements.length;
		const arr = new InDomArray(length);
		for (let i = 0; i < length; i++) {
			arr[i] = InDom.#wrap(elements[i])!;
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
	static getOne(selector: string, container?: ParentNode | InDom): InDom | null {
		if (container) {
			if (container instanceof InDom) {
				container = container.el() as ParentNode;
			}
			selector = selector.trim();
			const l = selector[0];
			if (l === '>' || l === '~' || l === '+') {
				selector = ':scope ' + selector;
			}
		} else {
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
	static getById(id: string): InDom | null {
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
	 * @returns {InDomValuesMap} Map of field names → normalized values
	 * @throws {TypeError} If a given field name is not a non-empty string
	 */
	static getValues(...args: (string | string[] | InDom)[]): InDomValuesMap {
		let len = args.length;
		const groupsSet = new Set<string>(); // which names will be grouped by _
		let forceGroup = false;              // if true, groups all names with _
		let container: Document | Element = document;
		let selectors: string[];

		// Detect container and normalize arguments
		if (len > 0 && args[len - 1] instanceof InDom) {
			const c = args.pop();
			len--;
			container = (c as InDom).el();
		}

		// No names specified → select all [name]
		if (len === 0) {
			selectors = ["[name]"];
			forceGroup = true;
		} else {
			let names: string[];

			// If first argument is array
			if (Array.isArray(args[0])) {
				names = args[0] as string[];
				len = names.length;
			} else {
				names = args as string[];
			}

			if (len === 0) {
				selectors = ["[name]"];
			} else {
				selectors = new Array(len);
				for (let i = 0; i < len; i++) {
					const name = names[i];
					if (typeof name !== "string" || !name) {
						throw new TypeError("Field names, if given, must be non-empty strings", { cause: name });
					}
					if (name.endsWith("_")) {
						groupsSet.add(name.slice(0, -1));
						selectors[i] = `[name^="${name}"]`;
					} else {
						selectors[i] = `[name="${name}"]`;
					}
				}
			}
		}

		// The result object
		const result: InDomValuesMap = {};

		// Collect all matching fields
		const fields = InDom.get(selectors.join(", "), container);

		fields.each(n => {
			const el = n.el();
			if (!(el instanceof Element)) {
				return;
			}

			const tag = el.tagName.toLowerCase();
			if (tag !== "input" && tag !== "textarea" && tag !== "select") {
				return;
			}

			const name = n.getAttr("name")!;
			const value = n.getValue(container);
			const underscoreIndex = name.indexOf("_");

			// Handle groupable fields
			if (underscoreIndex === -1) {
				result[name] = value;
				return;
			}

			const key = name.slice(0, underscoreIndex);
			if (forceGroup || groupsSet.has(key)) {
				if (!InDom.#isObject(result[key])) {
					result[key] = {};
				}
				(result[key] as Record<string, InDomValue>)[name.slice(underscoreIndex + 1)] = value;
				return;
			}

			result[name] = value;
		});

		return result;
	}

	/**
	 * Tests whether a value is a plain object (not an array, null, or class instance).
	 * @private
	 * @param {any} o - The value to test
	 * @returns {boolean} True if the value is a plain object
	 */
	static #isObject(o: unknown): o is Record<string, unknown> {
		return !!o && typeof o === 'object' && !Array.isArray(o) && o.constructor === Object;
	}

	/**
	 * Return an InDom object that contains an existing DOM Element, or returns null if is invalid.
	 * @private
	 * @param {Element | null} el - The underlying DOM element
	 * @returns {InDom | null} Existing InDom instance or a new one, or null if invalid
	 */
	static #wrap(el: Element | null): InDom | null {
		if (!el) return null;
		if (this.#map.has(el)) {
			return this.#map.get(el)!;
		}
		const n = new InDom(el);
		this.#map.set(el, n);
		return n;
	}

	/**
	 * Flattens a single array argument if needed, preserving variadic usage.
	 * @private
	 * @param {(InDomChild | InDomChild[])[]} arr - Possibly nested array of children
	 * @returns {InDomChild[]} Flattened array
	 */
	static #flattenSingleArray(arr: (InDomChild | InDomChild[])[]): InDomChild[] {
		return (arr.length === 1 && Array.isArray(arr[0]))
			? arr[0] as InDomChild[]
			: arr as InDomChild[];
	}

	/**
	 * Convert incoming content to a DOM Node.
	 * @private
	 * @param {string | Node | InDom} child
	 * @returns {Node}
	 */
	static #normalizeChild(child: string | Node | InDom): Node {
		if (child instanceof InDom) {
			return child.el() as Node; // InDom.el() returns Element | Document
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
		if (frag.childNodes.length === 1 && frag.firstChild?.nodeType === Node.ELEMENT_NODE) {
			return frag.firstChild;
		}

		// If there's exactly one text node, return that text node
		if (frag.childNodes.length === 1 && frag.firstChild?.nodeType === Node.TEXT_NODE) {
			return frag.firstChild;
		}

		// Otherwise, return the fragment
		return frag;
	}

	/**
	 * Validates arguments for event registration helpers like `.on()`.
	 * @private
	 * @param {string} type - Event type name (must be a non-empty string)
	 * @param {Function} fn - Event handler function
	 * @param {AddEventListenerOptions} opts - Event listener options object
	 * @throws {TypeError} If arguments are invalid
	 */
	static #checkOnArguments(
		type: string,
		fn: Function,
		opts: AddEventListenerOptions
	): void {
		if (typeof type !== 'string' || !type) {
			throw new TypeError('Event type must be a non-empty string', { cause: type });
		}
		if (typeof fn !== 'function') {
			throw new TypeError('Event handler must be a function', { cause: fn });
		}
		if (!InDom.#isObject(opts)) {
			throw new TypeError('Options must be an object if defined', { cause: opts });
		}
	}

	/**
	 * Inserts nodes or HTML before the first child of the underlying element of this object.
	 * Accepts multiple arguments or a single array (flattened internally).
	 *
	 * @param {...InDomChildren} children - Content to insert (variadic; a single array is allowed and will be flattened)
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	prepend(...children: InDomChildren[]): this {
		this.#checkElement();
		const flat = InDom.#flattenSingleArray(children);
		// Reverse order so that the first argument ends up first in the DOM
		for (const child of [...flat].reverse()) {
			const node = InDom.#normalizeChild(child);
			if (node) {
				(this.#el as Element).prepend(node);
			}
		}
		return this;
	}

	/**
	 * Inserts nodes or HTML after the last child of the underlying element of this object.
	 * Accepts multiple arguments or a single array (flattened internally).
	 *
	 * @param {...InDomChildren} children - Content to insert (variadic; a single array is allowed and will be flattened)
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	append(...children: InDomChildren[]): this {
		this.#checkElement();
		const flat = InDom.#flattenSingleArray(children);
		for (const child of flat) {
			const node = InDom.#normalizeChild(child);
			if (node) {
				(this.#el as Element).appendChild(node);
			}
		}
		return this;
	}

	/**
	 * Inserts nodes or HTML before the underlying element of this object
	 * (as previous siblings). Accepts multiple arguments or a single array
	 * (flattened internally).
	 *
	 * @param {...InDomChildren} siblings - Content to insert (variadic; a single array is allowed and will be flattened)
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	before(...siblings: InDomChildren[]): this {
		this.#checkElement(); // runtime + TS narrowing if asserts is added
		const flat = InDom.#flattenSingleArray(siblings);
		for (const sib of flat) {
			const node = InDom.#normalizeChild(sib);
			if (node) {
				(this.#el as Element).before(node);
			}
		}
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
	 * @param {...InDomChildren} siblings - Content to insert (variadic; a single array is allowed and will be flattened)
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	after(...siblings: InDomChildren[]): this {
		this.#checkElement();
		const flat = InDom.#flattenSingleArray(siblings);
		for (const sib of [...flat].reverse()) {
			const node = InDom.#normalizeChild(sib);
			if (node) {
				(this.#el as Element).after(node);
			}
		}
		return this;
	}

	/**
	 * Registers an event listener that is automatically removed when the element is
	 * removed from the DOM (no matter how), preventing memory leaks.
	 *
	 * If no handler is provided and the event is a mouse/click event, it is auto-triggered.
	 *
	 * @param {string | string[]} type - Event type (e.g. `"click"`, `"keydown"`) or array of event types
	 * @param {(n: InDom, e: Event) => void} [fn] - Handler function. Omit for mouse/click events to trigger automatically.
	 * @param {AddEventListenerOptions} [opts] - Event options (`once`, `passive`, etc.)
	 * @returns {InDomHandler} The internal wrapped handler. Pass it to `.off()` to remove manually.
	 * @throws {Error} If the element is not connected to the document or DOM not ready
	 * @throws {Error} If auto-trigger is used with non-mouse events
	 * @throws {TypeError} If handler is not a function (when provided)
	 */
	on(type: string, fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler;
	on(type: string[], fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler;
	on(
		type: string | string[],
		fn?: (n: InDom, e: Event) => void,
		opts: AddEventListenerOptions = {}
	): InDomHandler {
		this.#isConnected();

		// normalize + validate
		const types = Array.isArray(type) ? type : [type];
		for (let i = 0; i < types.length; i++) {
			if (typeof types[i] !== 'string' || !types[i]) {
				throw new TypeError('Event type must be a non-empty string', { cause: types[i] });
			}
		}

		// auto-trigger (all must be mouse/click)
		if (fn === undefined) {
			for (let i = 0; i < types.length; i++) {
				if (!(types[i].includes('mouse') || types[i].includes('click'))) {
					throw new Error(`Auto-trigger only supported for mouse events, not '${types[i]}'`);
				}
			}
			for (let i = 0; i < types.length; i++) {
				this.#el!.dispatchEvent(new MouseEvent(types[i], { bubbles: true, cancelable: true, view: window }));
			}
			return () => { };
		}

		// validate handler/options
		if (typeof fn !== 'function') {
			throw new TypeError('Event handler must be a function', { cause: fn });
		}
		if (!InDom.#isObject(opts)) {
			throw new TypeError('Options must be an object if defined', { cause: opts });
		}

		// attach once; reuse wrapped + options for all types
		this.#checkAbortController();
		const finalOpts = { ...opts, signal: this.#abortController!.signal };
		const wrapped = fn.bind(null, this) as InDomHandler;

		for (let i = 0; i < types.length; i++) {
			this.#checkEvents(types[i]);
			this.#el!.addEventListener(types[i], wrapped as unknown as EventListener, finalOpts);
			this.#events![types[i]]!.add(wrapped);
		}

		return wrapped;
	}

	/**
	 * Removes event listener(s) registered with `.on()`, its shorthand methods, or `onRemove()`.
	 *
	 * @param {string} [type] - Event type. If omitted, **all** listeners are removed.
	 * @param {InDomHandler} [fn] - Handler returned by `.on()` / `.onRemove()`. If omitted, **all** listeners of `type` are removed.
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {TypeError} If `type` is provided but is not a non-empty string
	 * @throws {Error} If the underlying element has been removed
	 */
	off(type?: string, fn?: InDomHandler): this {
		this.#checkElement();

		if (!this.#events) {
			return this;
		}

		// Special handling for onRemove pseudo-event
		if (type === 'onRemove') {
			return this.#offOnRemove(fn);
		}

		// Remove all listeners of all types
		if (type === undefined) {
			this.#offOnRemove();
			for (const t in this.#events) {
				for (const h of this.#events[t]!) {
					this.#el!.removeEventListener(t, h as EventListener);
				}
				delete this.#events[t];
			}
			return this;
		}

		if (typeof type !== 'string' || !type) {
			throw new TypeError('Event type, if given, must be a non-empty string', { cause: type });
		}

		const handlers = this.#events[type];
		if (!handlers) {
			return this;
		}

		// Remove all listeners of this type
		if (fn === undefined) {
			for (const h of handlers) {
				this.#el!.removeEventListener(type, h as EventListener);
			}
			delete this.#events[type];
			return this;
		}

		// Remove specific listener
		this.#el!.removeEventListener(type, fn as EventListener);
		handlers.delete(fn);
		if (handlers.size === 0) {
			delete this.#events[type];
		}
		return this;
	}

	/**
	 * Registers an event listener that fires only once, then removes itself.
	 *
	 * @param {string} type - Event type, e.g. `'click'`, `'keydown'`
	 * @param {(n: InDom, e: Event) => void} [fn] - Handler function. Omit for mouse/click to auto-trigger event.
	 * @param {AddEventListenerOptions} [opts] - Optional listener options (`passive`, `capture`, etc.)
	 * @returns {InDomHandler} The internal wrapped listener (pass to `.off()` to remove manually)
	 *
	 * @throws {Error} If DOM is not ready or element is not connected
	 * @throws {TypeError} If handler is not a function (when provided)
	 */
	once(
		type: string,
		fn?: (n: InDom, e: Event) => void,
		opts?: AddEventListenerOptions
	): InDomHandler {
		return this.on(type, fn, { ...opts, once: true });
	}

	/**
	 * Registers a `click` event listener.
	 * Omit the handler to auto-trigger a click immediately.
	 *
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function or omit to trigger.
	 * @param {AddEventListenerOptions} [opts] - Optional listener options.
	 * @returns {InDomHandler} Wrapped listener.
	 *
	 * @throws {Error} If DOM not ready or element not connected
	 * @throws {TypeError} If handler is not a function
	 */
	onClick(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler {
		return this.on('click', fn as any, opts);
	}

	/**
	 * Registers a `dblclick` event listener.
	 *
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function.
	 * @param {AddEventListenerOptions} [opts] - Optional listener options.
	 * @returns {InDomHandler} Wrapped listener.
	 *
	 * @throws {Error} If DOM not ready or element not connected
	 * @throws {TypeError} If handler is not a function
	 */
	onDoubleClick(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler {
		return this.on('dblclick', fn as any, opts);
	}

	/**
	 * Registers a `mouseenter` event listener.
	 *
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function.
	 * @param {AddEventListenerOptions} [opts] - Optional listener options.
	 * @returns {InDomHandler} Wrapped listener.
	 *
	 * @throws {Error} If DOM not ready or element not connected
	 * @throws {TypeError} If handler is not a function
	 */
	onEnter(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler {
		return this.on('mouseenter', fn as any, opts);
	}

	/**
	 * Registers a `mouseleave` event listener.
	 *
	 * @param {(n: InDom, e: MouseEvent) => void} [fn] - Handler function.
	 * @param {AddEventListenerOptions} [opts] - Optional listener options.
	 * @returns {InDomHandler} Wrapped listener.
	 *
	 * @throws {Error} If DOM not ready or element not connected
	 * @throws {TypeError} If handler is not a function
	 */
	onLeave(fn?: (n: InDom, e: MouseEvent) => void, opts?: AddEventListenerOptions): InDomHandler {
		return this.on('mouseleave', fn as any, opts);
	}

	/**
	 * Registers a `focus` event listener.
	 *
	 * @param {(n: InDom, e: FocusEvent) => void} [fn] - Handler function.
	 * @param {AddEventListenerOptions} [opts] - Optional listener options.
	 * @returns {InDomHandler} Wrapped listener.
	 *
	 * @throws {Error} If DOM not ready or element not connected
	 * @throws {TypeError} If handler is not a function
	 */
	onFocus(fn?: (n: InDom, e: FocusEvent) => void, opts?: AddEventListenerOptions): InDomHandler {
		return this.on('focus', fn as any, opts);
	}

	/**
	 * Registers a `blur` event listener.
	 *
	 * @param {(n: InDom, e: FocusEvent) => void} [fn] - Handler function.
	 * @param {AddEventListenerOptions} [opts] - Optional listener options.
	 * @returns {InDomHandler} Wrapped listener.
	 *
	 * @throws {Error} If DOM not ready or element not connected
	 * @throws {TypeError} If handler is not a function
	 */
	onBlur(fn?: (n: InDom, e: FocusEvent) => void, opts?: AddEventListenerOptions): InDomHandler {
		return this.on('blur', fn as any, opts);
	}

	/**
	 * Registers a `change` event listener.
	 *
	 * @param {(n: InDom, e: Event) => void} [fn] - Handler function.
	 * @param {AddEventListenerOptions} [opts] - Optional listener options.
	 * @returns {InDomHandler} Wrapped listener.
	 *
	 * @throws {Error} If DOM not ready or element not connected
	 * @throws {TypeError} If handler is not a function
	 */
	onChange(fn?: (n: InDom, e: Event) => void, opts?: AddEventListenerOptions): InDomHandler {
		return this.on('change', fn as any, opts);
	}

	/**
	 * Registers a callback that runs after internal cleanup and just before removal from DOM.
	 *
	 * @param {(n: InDom) => void} fn - Callback to invoke before removal.
	 * @returns {InDomHandler} Internal wrapped function — pass to `.off('onRemove', handler)` to unregister.
	 *
	 * @throws {TypeError} If `fn` is not a function
	 * @throws {Error} If element is already removed
	 */
	onRemove(fn: (n: InDom) => void): InDomHandler {
		this.#isConnected();
		if (typeof fn !== 'function') {
			throw new TypeError('Remove event handler must be a function', { cause: fn });
		}
		this.#checkEvents('onRemove');
		const ifn = fn.bind(null, this);
		this.#events!.onRemove.add(ifn);
		return ifn;
	}

	/**
	 *Exposes the underlying native DOM element (read-only reference).
	 *
	 * @returns {Document | Element} The underlying DOM element
	 * @throws {Error} If the underlying element has been removed
	 */
	el(): Document | Element {
		this.#checkElement();
		return this.#el!;
	}

	/**
	 * Alias for {@link el}.  
	 * Exposes the underlying native DOM element (read-only reference).
	 *
	 * @returns {Document | Element} The underlying DOM element
	 * @throws {Error} If the underlying element has been removed
	 */
	getElement(): Document | Element {
		return this.el();
	}

	/**
	 * Adds one or more CSS classes to the underlying element.
	 *
	 * @param {...string} names - Class names to add (variadic)
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	addClass(...names: string[]): this {
		this.#checkElement();
		(this.#el as Element).classList.add(...names);
		return this;
	}

	/**
	 * Tests whether the underlying element has the given CSS class.
	 *
	 * @param {string} name - Class name to test
	 * @returns {boolean} `true` if the class is present, `false` otherwise
	 * @throws {Error} If the underlying element has been removed
	 */
	hasClass(name: string): boolean {
		this.#checkElement();
		return (this.#el as Element).classList.contains(name);
	}

	/**
	 * Removes one or more CSS classes from the underlying element.
	 *
	 * @param {...string} names - Class names to remove (variadic)
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	removeClass(...names: string[]): this {
		this.#checkElement();
		(this.#el as Element).classList.remove(...names);
		return this;
	}

	/**
	 * Checks if the underlying element has an attribute.
	 *
	 * @param {string} k - Attribute name
	 * @returns {boolean} `true` if the attribute exists, `false` otherwise
	 * @throws {Error} If the underlying element has been removed
	 */
	hasAttr(k: string): boolean {
		this.#checkElement();
		return (this.#el as Element).hasAttribute(k);
	}

	/**
	 * Gets the value of an attribute of the underlying element.
	 *
	 * @param {string} k - Attribute name
	 * @returns {string | null} The attribute value, or `null` if not present
	 * @throws {Error} If the underlying element has been removed
	 */
	getAttr(k: string): string | null {
		this.#checkElement();
		return (this.#el as Element).getAttribute(k);
	}

	/**
	 * Sets an attribute value on the underlying element.
	 *
	 * @param {string} k - Attribute name
	 * @param {any} v - Attribute value (converted to string)
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	setAttr(k: string, v: any): this {
		this.#checkElement();
		(this.#el as Element).setAttribute(k, String(v));
		return this;
	}

	/**
	 * Removes an attribute from the underlying element.
	 *
	 * @param {string} k - Attribute name
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 */
	removeAttr(k: string): this {
		this.#checkElement();
		(this.#el as Element).removeAttribute(k);
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
	hasData(k: any): boolean {
		this.#checkElement();
		return this.hasAttr('data-' + String(k)) || (this.#data?.has(k) ?? false);
	}

	/**
	 * Reads a `data-*` attribute or in-memory data.
	 * Only available for connected elements to guarantee cleanup and single-instance consistency.
	 *
	 * @param {any} k - The data key
	 * @returns {any} The value from `data-*` attribute or in-memory store
	 * @throws {Error} If the element is not connected or removed
	 */
	getData(k: any): any {
		this.#isConnected();
		const attrName = 'data-' + String(k);
		if (this.hasAttr(attrName)) {
			return this.getAttr(attrName);
		}
		this.#checkData();
		return this.#data!.get(k);
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
	setData(k: any, v: any): this {
		this.#isConnected();
		const attrName = 'data-' + String(k);
		if (this.hasAttr(attrName)) {
			this.setAttr(attrName, v);
		} else {
			this.#checkData();
			this.#data!.set(k, v);
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
	removeData(k: any): this {
		this.#isConnected();
		const attrName = 'data-' + String(k);
		if (this.hasAttr(attrName)) {
			this.removeAttr(attrName);
		} else {
			this.#checkData();
			this.#data!.delete(k);
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
	setHtml(content: string): this {
		this.#checkElement();
		(this.#el as Element).innerHTML = content;
		return this;
	}

	/**
	 * Returns the `innerHTML` of the underlying element.
	 *
	 * @returns {string} The current HTML content of the element
	 * @throws {Error} If the underlying element has been removed
	 */
	getHtml(): string {
		this.#checkElement();
		return (this.#el as Element).innerHTML;
	}

	/**
	 * Sets style properties (object map or single prop/value).
	 *
	 * @param {string | Record<string, string>} key - Property name or object map
	 * @param {string} [value] - Value when first argument is a string
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {Error} If the underlying element has been removed
	 * @throws {TypeError} If the argument is not an object or string
	 */
	setStyle(key: string | Record<string, string>, value?: string): this {
		this.#checkElement();

		let styles: Record<string, string>;
		if (typeof key === 'string' && value !== undefined) {
			styles = { [key]: value };
		} else if (InDom.#isObject(key)) {
			styles = key as Record<string, string>;
		} else {
			throw new TypeError('css param must be an object or string');
		}

		for (const p in styles) {
			const styleKey = p.includes('-')
				? p.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
				: p;
			(this.#el as HTMLElement).style[styleKey as any] = styles[p];
		}
		return this;
	}

	/**
	 * Gets computed CSS values for the underlying element.
	 *
	 * @returns {CSSStyleDeclaration} - When called with no arguments
	 * @throws {Error} If the underlying element has been removed
	 */
	getStyle(): CSSStyleDeclaration;

	/**
	 * Gets a single computed CSS value.
	 *
	 * @param {string} property - The CSS property name (dash-case)
	 * @returns {string} - The computed value
	 * @throws {Error} If the underlying element has been removed
	 */
	getStyle(property: string): string;

	/**
	 * Gets multiple computed CSS values as an object map.
	 *
	 * @param {...string} properties - CSS property names (dash-case)
	 * @returns {Record<string, string>} - Object of `{ prop: value }`
	 * @throws {Error} If the underlying element has been removed
	 */
	getStyle(...properties: string[]): Record<string, string>;

	/**
	 * Implementation
	 */
	getStyle(...properties: string[]): CSSStyleDeclaration | string | Record<string, string> {
		this.#checkElement();
		const style = window.getComputedStyle(this.#el as HTMLElement);

		if (properties.length === 0) return style;
		if (properties.length === 1) return style.getPropertyValue(properties[0]);

		const out: Record<string, string> = {};
		for (const p of properties) {
			out[p] = style.getPropertyValue(p);
		}
		return out;
	}

	/**
	 * Checks if the underlying element matches a CSS selector.
	 *
	 * @param {string} selector - CSS selector to match against.
	 * @returns {boolean} `true` if it matches, `false` otherwise
	 * @throws {Error} If the underlying element has been removed
	 */
	is(selector: string): boolean {
		this.#checkElement();
		return (this.#el as Element).matches(selector);
	}

	/**
	 * Gets the same InDom object if its underlying element matches the selector,
	 * or the InDom object for its closest ancestor that matches,
	 * or `null` if none match.
	 *
	 * @param {string} selector - CSS selector to test against.
	 * @returns {InDom | null} The matching InDom object, or `null` if not found
	 *
	 * @throws {Error} If the underlying element has been removed
	 */
	getSelfOrParent(selector: string): InDom | null {
		this.#checkElement();
		const match = (this.#el as Element).closest(selector);
		return match ? InDom.#wrap(match) : null;
	}

	/**
	 * Gets the closest ancestor that matches the selector, or the direct parent if no selector is provided.
	 * (Important: does NOT include `this` element itself.)
	 *
	 * @param {string} [selector] - CSS selector to match against ancestors.
	 *                              If omitted, returns the direct parent.
	 * @returns {InDom | null} InDom object containing the parent/ancestor element, or `null` if not found
	 * @throws {Error} If the underlying element has been removed
	 */
	getParent(selector?: string): InDom | null {
		this.#checkElement();
		const parent = (this.#el as Element).parentElement;
		return InDom.#wrap(
			selector
				? parent?.closest(selector) || null
				: parent
		);
	}

	/**
	 * Gets the previous sibling that matches the selector.
	 * If no selector is supplied, the immediate previous element sibling is returned.
	 * Returns `null` if nothing is found.
	 *
	 * @param {string} [selector] - CSS selector to test against
	 * @returns {InDom | null} Wrapped sibling or `null` if not found
	 * @throws {Error} If the underlying element has been removed
	 */
	getPrev(selector?: string): InDom | null {
		this.#checkElement();
		return this.#getNextPrev("previousElementSibling", selector);
	}

	/**
	 * Gets the next sibling that matches the selector.
	 * If no selector is supplied, the immediate next element sibling is returned.
	 * Returns `null` if nothing is found.
	 *
	 * @param {string} [selector] - CSS selector to test against
	 * @returns {InDom | null} Wrapped sibling or `null` if not found
	 * @throws {Error} If the underlying element has been removed
	 */
	getNext(selector?: string): InDom | null {
		this.#checkElement();
		return this.#getNextPrev("nextElementSibling", selector);
	}

	/**
	 * Returns a DOMRect with the underlying element’s viewport-relative bounding box.
	 *
	 * @returns {DOMRect} Object with left / x, top / y, width, height, right, bottom
	 * @throws {Error} If the underlying element has been removed
	 */
	getBox(): DOMRect {
		this.#checkElement();
		return (this.#el as Element).getBoundingClientRect();
	}

	/**
	 * Returns a DOMRect that expands the underlying element’s bounding box by its margins.
	 *
	 * @returns {DOMRect} Object with left / x, top / y, width, height, right, bottom
	 * @throws {Error} If the underlying element has been removed
	 */
	getOuterBox(): DOMRect {
		this.#checkElement();
		const el = this.#el as HTMLElement;
		const box = el.getBoundingClientRect();
		const style = window.getComputedStyle(el);

		const marginTop = parseFloat(style.marginTop) || 0;
		const marginLeft = parseFloat(style.marginLeft) || 0;
		const marginRight = parseFloat(style.marginRight) || 0;
		const marginBottom = parseFloat(style.marginBottom) || 0;

		return new DOMRect(
			box.left - marginLeft,
			box.top - marginTop,
			box.width + marginLeft + marginRight,
			box.height + marginTop + marginBottom
		);
	}

	/**
	 * Returns a DOMRect with coordinates relative to the underlying element’s offset parent
	 * (borders of the parent are excluded).
	 *
	 * @returns {DOMRect} Object with left / x, top / y, width, height, right, bottom
	 * @throws {Error} If the underlying element has been removed
	 */
	getRelativeBox(): DOMRect {
		this.#checkElement();
		const el = this.#el as HTMLElement;
		const box = el.getBoundingClientRect();

		const parent = el.offsetParent as HTMLElement | null;
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
	getValue(container?: Document | Element | InDom): InDomValue {
		this.#checkElement();

		// Resolve container
		if (container instanceof InDom) {
			container = container.el();
		} else if (!container) {
			container = document;
		}

		const el = this.#el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

		// Handle select multiple
		if (el.tagName === 'SELECT' && (el as HTMLSelectElement).multiple) {
			const sel = el as HTMLSelectElement;
			return Array.from(sel.selectedOptions).map(opt => opt.value);
		}

		// Handle select single
		if (el.tagName === 'SELECT') {
			return (el as HTMLSelectElement).value || null;
		}

		// Handle checkboxes group
		if ((el as HTMLInputElement).type === 'checkbox') {
			const name = (el as HTMLInputElement).name;
			return Array.from(
				(container as ParentNode).querySelectorAll<HTMLInputElement>(
					`input[type="checkbox"][name="${name}"]:checked`
				)
			).map(cb => cb.value);
		}

		// Handle radio group
		if ((el as HTMLInputElement).type === 'radio') {
			const name = (el as HTMLInputElement).name;
			const checked = (container as ParentNode).querySelector<HTMLInputElement>(
				`input[name="${name}"]:checked`
			);
			return checked ? checked.value : null;
		}

		// Handle file input
		if ((el as HTMLInputElement).type === 'file') {
			return (el as HTMLInputElement).files!;
		}

		// Default: text-like input or textarea
		return 'value' in el ? (el as any).value ?? null : null;
	}

	/**
	 * Sets the element’s value, normalised for its type.
	 * - `input`, `textarea`: value is coerced to string.
	 * - `select` (single): chooses the matching option.
	 * - `select` (multiple): array of values to select.
	 * - `input[type=checkbox]` / `input[type=radio]` (same name group): array of values to check.
	 *
	 * @param {string | string[]} value - Value(s) to assign
	 * @param {Document | Element | InDom} [container] - Scope for checkbox and radio group lookups.
	 *        When provided, only searches within this container for related elements. Defaults to `document`.
	 * @returns {this} The current InDom instance (chainable)
	 * @throws {TypeError} If the element has no writable value
	 * @throws {Error} If the underlying element has been removed
	 */
	setValue(value: string | string[], container?: Document | Element | InDom): this {
		this.#checkElement();

		// Resolve container
		let scope: Document | Element;
		if (container) {
			scope = container instanceof InDom ? container.el() : container;
		} else {
			scope = document;
		}

		const el = this.#el as HTMLElement & { value?: string; type?: string; name?: string; options?: HTMLOptionsCollection; multiple?: boolean };
		const vals = Array.isArray(value) ? value : [value];

		// Handle <select multiple>
		if (el.tagName === 'SELECT' && el.multiple) {
			const selectEl = el as HTMLSelectElement;
			for (const opt of Array.from(selectEl.options)) {
				opt.selected = vals.includes(opt.value);
			}
			return this;
		}

		// Handle checkbox group
		if (el instanceof HTMLInputElement && el.type === 'checkbox' && el.name) {
			const checkboxes = scope.querySelectorAll<HTMLInputElement>(`input[type="checkbox"][name="${el.name}"]`);
			checkboxes.forEach(cb => cb.checked = vals.includes(cb.value));
			return this;
		}

		// Handle radio group
		if (el instanceof HTMLInputElement && el.type === 'radio' && el.name) {
			const radios = scope.querySelectorAll<HTMLInputElement>(`input[type="radio"][name="${el.name}"]`);
			radios.forEach(rb => rb.checked = vals.includes(rb.value));
			return this;
		}

		// Generic value assignment
		if ('value' in el) {
			(el as HTMLInputElement).value = String(vals[0] ?? '');
			return this;
		}

		throw new TypeError('Element has no value to set', { cause: el });
	}

	/**
	 * Removes the underlying DOM element from the document and cleans the internal state.
	 * Automatically invoked if the element is removed externally.
	 *
	 * @returns {void}
	 * @throws {Error} If the underlying element has already been removed
	 */
	remove(): void {
		this.#checkElement();
		(this.#el as Element).remove();
		this.#destroy();
	}

	/**
	 * Ensures the underlying element still exists; throws if destroyed.
	 * @private
	 * @throws {Error} If the underlying element has been removed
	 */
	#checkElement(): void {
		if (!this.#el) {
			throw new Error("Element has been removed");
		}
	}

	/**
	 * Lazily initializes the AbortController for automatic cleanup.
	 * @private
	 */
	#checkAbortController(): void {
		if (!this.#abortController) {
			this.#abortController = new AbortController();
		}
	}

	/**
	 * Lazily initializes the internal data Map, registering in #map if needed.
	 * @private
	 */
	#checkData(): void {
		if (!this.#data) {
			if (!InDom.#map.has(this.#el!)) {
				InDom.#map.set(this.#el!, this);
			}
			this.#data = new Map<any, any>();
		}
	}

	/**
	 * Lazily initializes the internal events map and Set for a given type.
	 * @private
	 * @param {string} type - The event type to prepare storage for
	 */
	#checkEvents(type: string): void {
		if (!this.#events) {
			if (!InDom.#map.has(this.#el!)) {
				InDom.#map.set(this.#el!, this);
			}
			this.#events = {}; // plain object
		}
		if (!this.#events[type]) {
			this.#events[type] = new Set<InDomHandler>();
		}
	}

	/**
	 * Ensures the element is connected to the DOM and InDom is initialized.
	 * @private
	 * @throws {Error} If DOM not ready or element is not connected
	 */
	#isConnected(): void {
		if (!InDom.#ready) {
			throw new Error('DOM content must be loaded first for this operation');
		}
		this.#checkElement(); // throws if #el is null
		if (!this.#el!.isConnected) {
			throw new Error('Element must be connected to DOM for this operation', {
				cause: this.#el
			});
		}
	}

	/**
	 * Removes `onRemove` handler(s) from the internal event registry.
	 * Called internally by {@link off} when type is `"onRemove"`.
	 *
	 * @private
	 * @param {InDomHandler} [fn] - Specific handler to remove.  
	 *                              If omitted, removes **all** `onRemove` handlers.
	 * @returns {this} The current InDom instance (chainable)
	 */
	#offOnRemove(fn?: InDomHandler): this {
		const bucket = this.#events?.onRemove;
		if (!bucket) {
			return this;
		}

		if (fn === undefined) {
			delete this.#events!.onRemove;
			return this;
		}

		bucket.delete(fn);
		if (bucket.size === 0) {
			delete this.#events!.onRemove;
		}

		return this;
	}

	/**
	 * Shared walker for getNext / getPrev.
	 * @private
	 * @param {"nextElementSibling" | "previousElementSibling"} prop - Direction of traversal
	 * @param {string} [selector] - Optional CSS selector to match
	 * @returns {InDom | null} Wrapped sibling or null if not found
	 */
	#getNextPrev(prop: "nextElementSibling" | "previousElementSibling", selector?: string): InDom | null {
		let sib: Element | null = (this.#el as HTMLElement)![prop];
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
	 *
	 * @throws {Error} If the underlying element has been removed
	 * @private
	 */
	#destroy(): void {
		this.#checkElement();

		if (this.#abortController) {
			this.#abortController.abort();
			this.#abortController = null;
		}

		if (this.#data) {
			this.#data.clear();
			this.#data = null;
		}

		const removeHandlers =
			this.#events && this.#events['onRemove']
				? Array.from(this.#events['onRemove'])
				: [];

		this.#events = null;
		InDom.#map.delete(this.#el!);

		for (const fn of removeHandlers) {
			(fn as (n: InDom) => void)(this);
		}

		this.#el = null;
	}
}

/* -----------------------------------------------------------------------------
   Shortcuts for convenience
   --------------------------------------------------------------------------- */

/**
 * Shortcut for {@link InDom.get}, returning a collection of elements.
 *
 * @function
 * @param {string|NodeListOf<Element>|Element[]|InDom[]} source - CSS selector, NodeList, array of elements, or InDom objects.
 * @param {Element|Document} [root=document] - Search root for CSS selector queries.
 * @returns {InDomArray} A wrapped collection of matching elements.
 */
export const $a = InDom.get;

/**
 * Shortcut for {@link InDom.getOne}, returning the first matching element.
 *
 * @function
 * @param {string|Element|InDom} source - CSS selector, Element, or InDom instance.
 * @param {Element|Document} [root=document] - Search root for CSS selector queries.
 * @returns {InDom | null} Wrapped single element, or `null` if not found.
 */
export const $1 = InDom.getOne;

/**
 * Shortcut for {@link InDom.getById}, returning a single element by ID.
 *
 * @function
 * @param {string} id - The element’s ID (without `#`).
 * @returns {InDom | null} Wrapped element, or `null` if not found.
 */
export const $id = InDom.getById;

/**
 * Shortcut constructor for creating a new {@link InDom} wrapper.
 *
 * @function
 * @param {Element|Document|string} source - DOM element, document, or CSS selector.
 * @returns {InDom} Wrapped instance for the element(s).
 */
export const $n = (source: Element | Document | string): InDom => new InDom(source);

/**
 * Shortcut for {@link InDom.getValues}, extracting normalized values from a form or container.
 *
 * @function
 * @param {Element|Document|InDom} container - Container element or wrapper.
 * @returns {InDomValuesMap} Object mapping field names to their values.
 */
export const $v = InDom.getValues;

/* Auto-initialize the observer on load */
InDom.init();

