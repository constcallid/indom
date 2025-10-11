/// <reference path='./indom.js' />
const _l = msg => console.log(msg);

InDom.onReady(() => {

	const getOneExample = () => {

		$1('.example>div').setStyle('color', 'blue');
		/*
			If .example>div doesn't match any element, $1('.example>div') will return null.
			Attempting to call a method on null will result in a TypeError.
			If you want to avoid this error when the element is not found,
			use the optional chaining operator (?.) e.g.:
		*/
		$1('.example>div')?.setStyle('color', 'blue');

		$1('.example>div').onClick(n => {
			//n here is the InDom object
			n.addClass('clicked').setStyle({ 'color': 'red', 'font-size': '120%' });
		});

		// Set style to the first 'span', of the first '.example>div'
		$1('span', $1('.example>div')).setStyle('color', 'green');

		//or:
		const div = $1('.example>div');
		$1('span', div).setStyle('color', 'green');
	};

	const getExample = () => {

		const menuDivs = $a('#menu>div');
		menuDivs.onEnter(n => n.addClass('on'));
		// In the above n is each InDom object
		menuDivs.onLeave(n => n.removeClass('on'));

		// Set style on every '.example'
		$a('.example').setStyle('color', 'blue');

		// Set click event on every '.example>span'
		$a('.example>span').onClick(n => {
			n.setStyle('color', 'green');
		});
		
		// The same, written as a single-line arrow function: 
		$a('.example>span').onClick(n => n.setStyle('color', 'green'));

		const example1 = $1('.example');
		//Set data 'init': 1 on direct children 'div' of the first '.example'
		$a('>div', example1).setData('init', 1);

		//InDomArray objects themselves don't have get* methods
		//Get the left and top of each '.example>div' relative to viewport
		$a('.example>div').each(n => {
			// .getBox() returns the bounding box
			const box = n.getBox();
			console.log(`left:${box.left} top:${box.top}`);
		});

	};

	const getByIdExample = () => {
		// You could get the InDom object by its ID using the general selector method:
		const example1 = $1('#test');

		// But it's more efficient, especially in HTML documents with many DOM elements,
		// to get it directly by ID:
		const example2 = $id('test');

	};

	const constructorExample = () => {

		// Example 1
		const img2 = $n(
			'<img src="example-star.png" alt="second star image example" width="50" height="50">');
		$1('.img-example-2').append(img2);

		// Example 2
		const container = $id('img-container');
		const btn = $1('>.btn', container);
		/** @type {InDom} */
		let img;

		// Define the click handler for the button (no need for the InDom object 
		// or the event arguments here).
		// It either loads an image for the first time or toggles the image source 
		// on subsequent clicks.
		btn.onClick(() => {

			// Image has not been loaded/created yet
			if (!img) {
				// Check if an image load is already in progress to prevent duplicate requests.
				if (btn.getData('loading') === 1) {
					btn.setHtml('the image is loading...');
					// Exit the handler early as no further action is needed.
					return;
				}

				// Create a native HTML Image object.
				const imgEl = new Image();

				// Define the callback for when the image finishes loading successfully.
				imgEl.onload = () => {
					// Wrap the loaded native image element in an InDom object
					img = $n(imgEl);
					img.setAttr('alt', 'a star image example');
					// Append the InDom-wrapped image to the container element.
					container.append(img);
					btn.setData('loading', 0).setHtml('change img');
				};

				// Configure the image source and initial properties.
				imgEl.src = 'example-star.png';
				imgEl.width = 50;
				imgEl.height = 50;

				// Set a flag on the button to indicate that an image load is now in progress.
				btn.setData('loading', 1);
				// Exit the handler as the load process has started.
				// Note: A production implementation should also handle img.onerror etc.
				return;
			}

			// Image already exists, toggle its source
			// Check the current src to determine which image to switch to.
			if (img.getAttr('src') == "example-cloud.png") {
				// If it's currently showing the 'cloud' image, switch to the 'star' image.
				img.setAttr('src', 'example-star.png')
					.setAttr('alt', 'a star image example');
				// Exit after that
				return;
			}
			// It is a 'star', switch to the 'cloud' image.
			img.setAttr('src', 'example-cloud.png')
				.setAttr('alt', 'a cloud image example');
			return;
		});


		// Notice
		const test1 = $n('<div><span>one single parent element</span></div>');
		// will work , but: 
		try {
			const test2 =
				$n('<div><span>div 1</span></div><div><span>div 2</span></div>');
			// will throw a TypeError because you can create one InDom object only for one element 
		}
		catch (e) {
			console.log(e);
		}
		// in case you need to insert multiple elements set the HTML of the parent element 
		// or append / prepend HTML to it , and then get the InDom object you want: e.g. 
		$1('.example>div')
			.setHtml('<div><span>div 1</span></div><div><span>div 2</span></div>');
		const test3 = $1('.example>div>div:nth-child(2)');
		test3.setStyle('color', 'blue');


		//InDom objects are created only once for the same DOM element
		const a = $1('.example');
		const b = $1('.example');
		if (a === b) {
			console.log("it's the same object");
		}

	};

	const onReadyExample = () => {
		// If the JavaScript file (containing InDom) is loaded and executed before the HTML DOM content is fully parsed,
		// attempting to select elements immediately might fail because they don't exist yet.
		// Additionally, adding event listeners to elements that haven't been parsed yet will also fail.
		// Use the InDom.onReady() function to ensure your code runs only after the DOM is fully loaded and ready.
		// Example:
		InDom.onReady(() => {
			// Safe to use InDom for querying DOM elements and attach event listeners here
			$1(".example").addClass("on");
		});

	}

	const getValueExample = () => {

		// Get the container element the fields that we test.
		const container = $1('.input-examples');

		// Iterate through each direct child <div> within the container.
		$a('>div', container).each(div => {

			// Find the first child element within the current div.
			// Based on the HTML structure, this is the actual field input/textarea/select/etc.
			const field = $1('>*', div);

			// Create a button 
			const btn = $n("<span class='btn'>log value</span>");

			// Append the button to the current div so it sits next to the field.
			div.append(btn);

			// Attach a click event listener to the button.
			btn.onClick(() => {
				// When the button is clicked, log the field's name and its current value.
				console.log(`name:${field.getAttr("name")} value:`);

				// Call the getValue() method on the field and log the result.
				// The output will vary based on the type of field and its current state.
				console.log(field.getValue(container));
				/*
					Expected outputs based on initial HTML state:
					input "username" -> string 
					textarea "message"-> string
					select "color" -> string (selected color)
					select "size" multiple -> array of strings (selected sizes), empty if none selected
					radio "payment" -> string (selected payment) , null if none selected
					checkbox "features" -> array of strings (selected features), empty if none selected
					file "documents" -> FileList object , empty if none selected with .length 0 	
				*/
			});
		});
	}

	const getValuesExample = () => {



		const btn = $n('<div>log field values</div>');
		$1('body').append(btn);
		btn.onClick(() => {

			// every input/textarea/select field in document
			let o = $v();
			console.log(o);
			//→ {"username":"Alice","message":"","color":"blue","size":["s","m"],"payment":null,"features":["wifi","gps"]...}

			// every field inside first .input-examples
			o = $v($1('.input-examples'));
			console.log(o);
			//→ {"username":"Alice","message":"","size":["s","m"],"payment":null,"features":[]...}

			// only username + features (whole document)
			o = $v('username', 'features');
			console.log(o);
			//→ {"username":"Alice","features":["wifi","gps"]}

			// only username + features (inside first .input-examples)
			o = $v('username', 'features', $1('.input-examples'));
			console.log(o);
			//→ {"username":"Alice","features":[]}
			// the same as $v(["username","features"],$1('.input-examples'));


			// pick normal + grouped fields
			o = $v('username', 'name_', 'age_');
			console.log(o);
			//→ {"username":"Alice","name":{"34":"Bob","65":"Carol"},"age":{"34":"28","65":"32"}}

			// harvest all (default: group underscores)
			o = $v();
			console.log(o);
			//→ {"username":"Alice","message":"",..."name":{"34":"Bob","65":"Carol"},"age":{"34":"28","65":"32"}}

			// harvest all WITHOUT grouping
			o = $v([]);
			console.log(o);
			//→ {"username":"Alice","message":"",..."name_34":"Bob","age_34":"28","name_65":"Carol","age_65":"32"}

			console.log(JSON.stringify(o));

		});

	};

	const setValueExample = () => {

		// single text input
		$1('[name="username"]').setValue('Bob');

		// multiple select
		$1('[name="size"]').setValue(['m', 'l']);

		// check only 'gps' in this container (other containers ignored)
		const div = $1('.input-examples');
		$1('[name="features"]', div).setValue('gps', div);
		// a single value can be set with a string or a one-item array

		// clear all editable fields
		$a('input, textarea, select').setValue(null);

		//$1('[name="payment"]').setValue('debit');

		//$1('[name="payment"]').setValue(null);

	};

	const onExample = () => {

		// log every keypress in username / message fields
		$a('[name="username"], [name="message"]').on('keydown', (n, e) => {
			console.log(`name:${n.getAttr('name')} , key pressed:${e.key} , current value:${n.getValue()}`);
			if (e.key === 's') {
				e.preventDefault(); // block 's' key
			}
		});

		// add / remove hover class on every .example>div
		$a('.example>div').onEnter(n => n.addClass('on'));
		$a(".example>div").onLeave(n => n.removeClass('on'));

		// simple accordion: only one panel open at a time
		const menu = $1('#menu');
		const menuBtn = $1('>.btn', menu);
		const search = $1('#search');
		const searchBtn = $1('>.btn', search);

		menuBtn.onClick(() => {
			if (menu.hasClass('on')) { menu.removeClass('on'); return; }
			if (search.hasClass('on')) { searchBtn.onClick(); } // close other
			menu.addClass('on');
		});

		searchBtn.onClick(() => {
			if (search.hasClass('on')) { search.removeClass('on'); return; }
			if (menu.hasClass('on')) { menuBtn.onClick(); } // close other
			search.addClass('on');
		});

		// clicking anywhere adds 'clicked' class to the clicked element
		$n(document).onClick((_, e) => $n(e.target).addClass('clicked'));

		// `on` can also accept many event types for the same handler 
		// here is a simple throttle example
		let canClick = true;
		$1(".example>div").on(["click", "touchstart"], n => {
			if (!canClick) {
				return;
			}
			canClick = false;
			console.log(n); // do something
			setTimeout(() => canClick = true, 300);
		});
	};

	const onRemoveExample = () => {

		const example = $1('.example');
		// callback fires no matter how the element is removed
		example.onRemove(() => {
			console.log('removed:', example);
			alert('press OK → element disappears');
		});

		// Through InDom remove method on the object
		example.remove();



		// Through InDom setHtml on body 
		$1('body').setHtml('empty');

		// Through native DOM removal
		document.querySelector('.example').remove();

		// Through native innerHTML on its parent 
		document.querySelector('.example').parentElement.innerHTML = 'empty';
	};

	const offExample = () => {

		const divs = $a('.example>div');

		divs.onClick(n => {
			console.log(n);
			/*
				this function is visible in DevTools:
				#e (#events) / click / Set entry / [[TargetFunction]]
			*/
		});

		// a simple logger example 
		divs.onEnter(n => console.log(`onEnter in:${n.getHtml()}`));

		const addOnFns = divs.onEnter(n => n.addClass('on'));
		const removeOnFns = divs.onLeave(n => n.removeClass('on'));

		// remove addOnFns and removeOnFns but keep the first onEnter logger
		divs.off('touchstart', addOnFns).off('mouseleave', removeOnFns);

		// remove every touchstart handler (including the logger)
		divs.off('touchstart');

		// remove every handler of every type (including onClick)
		divs.off();

	};


	const getElementExample = () => {

		console.log($1('.example>div').el().scrollTop);

	};

	const removeExample = () => {

		// remove the first .example>div
		$1(".example>div").remove();

		// remove all .example>div
		$a(".example>div").remove();

	};


	const dataExample = () => {
		const div = $1('.example>div');

		// click-counter stored in memory
		div.onClick(() => {
			// read counter (default 0 if never stored)
			const clicks = div.getData('clicked') ?? 0;
			div.setData('clicked', clicks + 1);
		});

		// store object and int
		div.setData('user', { id: 34, name: 'Bob' });
		console.log(div.hasData('user') ? 'has data key: user'
			: 'doesn\'t have data key: user');
		//has data key: user

		div.setData('test', 1);

		console.log([div.getData('user'), div.getData('test')]); // [{id: 34, name: 'Bob'}, 1]

		// remove only 'user'
		div.removeData('user');
		console.log([div.getData('user'), div.getData('test')]); // [undefined, 1]	


		// grab every editable field inside the first .input-examples
		const fields = $a('input, textarea, select', $1('.input-examples'));

		// snapshot original values as JSON strings
		fields.each(n => n.setData('originalValue', JSON.stringify(n.getValue())));

		// button to check if anything changed
		$1('body').append('<div class="checkBtn">Any field modified?</div>');
		$1('.checkBtn').onClick(() => {
			// InDomArray extends Array and inherits all standard array methods.
			// true if any field's current value differs from its snapshot (stops at first true)
			const modified = fields.some(n =>
				n.getData('originalValue') !== JSON.stringify(n.getValue())
			);
			console.log(modified ? 'modified' : 'same');
		});

		{
			// The above is to demonstrate different concepts because with InDom you could just:
			const section = $1('.input-examples');
			$1('body').append('<div class="rwCheckBtn">Any field modified? (rw)</div>');
			const original = JSON.stringify($v(section));
			$1('.rwCheckBtn').onClick(() => console.log(
				original === JSON.stringify($v(section)) ? 'same' : 'modified'
			));
		}
	};

	const isExample = () => {

		const example = $1('.example>div');
		console.log(example.is('div'));
		//true 
		console.log(example.is('.test'));
		//false
	};

	const getParentExample = () => {
		const span = $1('.example>div>span');

		console.log(span.getParent().getHtml());
		// <span class="test">this is a first test</span>

		console.log(span.getParent('.example').getHtml());
		// <div> <span class="test">this is a first test</span></div>...

	};

	const getSelfOrParentExample = () => {

		// delegate clicks on all links (present or future)
		$n(document).onClick((_, e) => {
			// _ instead of n because we only need the event object here (for IDEs)
			const link = $n(e.target).getSelfOrParent("a");
			if (link) {
				console.log(`URL:${link.getAttr('href')} clicked`);
			}
		});

		// test link (works even if added later)
		$1('body').append(`<a href="https://github.com/constcallid/indom" target="_blank">
			InDom - modern JavaScript DOM library</a>`);

	};

	const getNextExample = () => {
		const span = $1('.sibling-example>.a');

		console.log(span.getNext().getHtml());
		// test

		console.log(span.getNext('.c').getHtml());
		// .c test

	};


	const getPrevExample = () => {
		const span = $1('.sibling-example>.c');

		console.log(span.getPrev().getHtml());
		// test

		console.log(span.getPrev('.a').getHtml());
		// .a test

	};


	const getHtmlExample = () => {

		const html = $1(".example>div").getHtml();
		console.log(html);
		//<span>this is a test</span>

	};

	const setHtmlExample = () => {

		const div1 = $1('.example>div');

		//set onClick on the every span child of div1
		$a('>span', div1).onClick(n => console.log('clicked', n));


		//replace innerHTML → old spans gone, listener gone
		div1.setHtml('<span>another test</span>');

		// re-register on the new span(s):
		$a('>span', div1).onClick(n => console.log('clicked', n));

		// or:
		div1.onClick((_, e) => {
			const span = $n(e.target).getSelfOrParent('.example>div>span');
			if (span) {
				console.log('clicked', span);
			}
		});

	};

	const appendPrependExample = () => {

		//isolated steps
		const ul = $1('ul.example-1');

		// raw HTML string
		ul.append('<div>test</div>');
		console.log(ul.getHtml());
		// <li>li 1</li><li>li 2</li><div>test</div>

		// native DOM element
		const img = new Image();
		img.src = 'example-star.png';
		img.width = img.height = 50;
		ul.append(img);
		console.log(ul.getHtml());
		// <li>li 1</li><li>li 2</li><img …>

		// InDom object
		ul.append($n(img)); // same img, in InDom object
		console.log(ul.getHtml()); // identical markup
		// <li>li 1</li><li>li 2</li><img …>

		// InDomArray (moved from .example-2)
		const donor = $1('.example-2');
		ul.append($a('>div', donor)); // moves both divs
		console.log(ul.getHtml());
		// <li>li 1</li><li>li 2</li><div>div 1</div><div>div 2</div>
		console.log(donor.getHtml());
		// <span>span 1</span> (divs gone)

		// bulk append to every <li> of ul
		$a('>li', ul).append('<span>test</span>');
		console.log(ul.getHtml());
		// <li>li 1<span>test</span></li><li>li 2<span>test</span></li>

		{
			// prepend examples (mirror of append examples)
			const ul = $1('ul.example-1');

			ul.prepend('<li>first</li>'); // string
			ul.prepend(img); // Dom Element
			ul.prepend($n(img)); // InDom object (same img) 
			ul.prepend($a('>div', donor)); // InDomArray
			$a('>li', ul).prepend('<span>test</span>'); // bulk prepend to every <li> of ul
		}
	};


	const afterBeforeExample = () => {
		//isolated steps
		const ul = $1('ul.example-1');
		const firtsLi = $1(">li", ul);

		// raw HTML string
		firtsLi.after('<div>test</div>');
		console.log(ul.getHtml());
		// <li>li 1</li><div>test</div><li>li 2</li>

		// native DOM element
		const img = new Image();
		img.src = 'example-star.png';
		img.width = img.height = 50;
		firtsLi.after(img);
		console.log(ul.getHtml());
		//<li>li 1</li><img ...><li>li 2</li>

		// InDom object
		firtsLi.after($n(img)); // same img, in InDom object
		console.log(ul.getHtml()); // identical markup
		//<li>li 1</li><img ...><li>li 2</li>

		// InDomArray (moved from .example-2)
		const donor = $1('.example-2');
		firtsLi.after($a('>div', donor)); // moves both divs
		console.log(ul.getHtml());
		//<li>li 1</li><div>div 1</div><div>div 2</div><li>li 2</li>
		console.log(donor.getHtml());
		// <span>span 1</span> (divs gone)

		// bulk after to every <li> of ul
		$a('>li', ul).after('<span>test</span>');
		console.log(ul.getHtml());
		//<li>li 1</li><span>test</span><li>li 2</li><span>test</span>

		{
			// before examples (mirror of after examples)
			const ul = $1('ul.example-1');
			const firtsLi = $1(">li", ul);

			firtsLi.before('<div>test</div>'); // raw HTML string
			firtsLi.before(img); // native DOM element
			firtsLi.before($n(img)); // same img, in InDom object
			firtsLi.before($a('>div', donor)); // InDomArray (moves both divs)
			$a('>li', ul).before('<span>test</span>'); // bulk before to every <li> of ul
		}

	};

	const attrExample = () => {
		const img = $n('<img src="example-star.png" width="50" height="50">');

		// helper: return attr value if the attribute exists or 'no alt' if doesn't
		const getImgAlt = () => img.hasAttr('alt') ? img.getAttr('alt') : 'no alt';

		console.log(`img alt:${getImgAlt()}`); // no alt 

		img.setAttr('alt', 'example image');
		console.log(`img alt:${getImgAlt()}`); // example image

		img.removeAttr('alt');
		console.log(`img alt:${getImgAlt()}`); // no alt	
	}


	const getBoxExample = () => {

		const div = $n('<div></div>');
		div.setStyle({
			display: 'inline-block',
			position: 'fixed',
			top: '110px',
			left: '130px',
			width: '100px',
			height: '150px',
			backgroundColor: 'blue'
		});

		//console.log(div.getBox());
		console.log(JSON.stringify(div.getBox()));
		//DOMRect {"x":0,"y":0,"width":0,"height":0,"top":0,"right":0,"bottom":0,"left":0}
		//because it is not yet connected to DOM 

		$1('body').append(div);
		console.log(div.getBox());
		console.log(JSON.stringify(div.getBox()));
		//DOMRect {"x":130,"y":110,"width":100,"height":150,"top":110,"right":230,"bottom":260,"left":130}

	}


	const getOuterBoxExample = () => {

		const div = $n('<div></div>');
		div.setStyle({
			'display': 'inline-block',
			'position': 'fixed',
			'top': '110px',
			'left': '130px',
			'width': '100px',
			'height': '150px',
			'background-color': 'blue',
			'margin': '10px 20px'
		});

		$1('body').append(div);

		console.log(div.getBox());
		//DOMRect {"top":120,"left":150,"right":250,"bottom":270,"width":100,"height":150}

		const outerBox = div.getOuterBox();
		console.log(outerBox);
		//DOMRect {"x":130,"y":110,"width":140,"height":170,"top":110,"right":270,"bottom":280,"left":130}

		const div2 = $n('<div></div>');
		div2.setStyle({
			'display': 'inline-block',
			'position': 'fixed',
			'top': outerBox.top + 'px',
			'left': outerBox.left + 'px',
			'width': outerBox.width + 'px',
			'height': outerBox.height + 'px',
			'background-color': 'red'
		});
		$1('body').append(div2);
		// red div2 overlay: exactly covers the margin box of the div blue element

	}


	const getRelativeBoxExample = () => {

		const div = $n('<div></div>');
		div.setStyle({
			display: 'inline-block',
			position: 'fixed',
			top: '110px',
			left: '130px',
			width: '100px',
			height: '150px',
			backgroundColor: 'blue'
		});
		$1('body').append(div);
		console.log(JSON.stringify(div.getBox()));
		//DOMRect {"x":130,"y":110,"width":100,"height":150,"top":110,"right":230,"bottom":260,"left":130}

		const innerDiv = $n('<div></div>');
		innerDiv.setStyle({
			display: 'inline-block',
			position: 'absolute',
			top: '10px',
			left: '30px',
			width: '30px',
			height: '50px',
			backgroundColor: 'red'
		});
		div.append(innerDiv);
		console.log(JSON.stringify(innerDiv.getRelativeBox()));
		//DOMRect {"x":30,"y":10,"width":30,"height":50,"top":10,"right":60,"bottom":60,"left":30}
		// red innerDiv: positioned inside blue div; coords are relative to blue’s padding box
	}

	const classExample = () => {

		// add 'clicked' class to any .example>div that gets clicked
		const divs = $a('.example>div');
		divs.onClick(n => n.addClass('clicked'));

		// button: counts how many are currently clicked, then resets them
		const sumResetClicked = $n('<div class="btn">Sum and reset clicked</div>');
		$1('body').append(sumResetClicked);

		sumResetClicked.onClick(() => {
			let clicked = 0;
			divs.each(n => {
				if (n.hasClass('clicked')) {   // test state
					clicked++;
					n.removeClass('clicked');    // reset state
				}
			});
			console.log('clicked:' + clicked);
		});


	}

	const styleExample = () => {

		const div = $n('<div></div>');
		$1('body').append(div);

		// single property
		div.setStyle('background-color', 'blue');
		console.log(div.getStyle('background-color'));
		// rgb(0, 0, 255)

		// bulk assignment + multi-read
		div.setStyle({ width: '100px', height: '50px', fontSize: '16px' });
		console.log(div.getStyle('width', 'height', 'font-size'));
		// {width: '100px', height: '50px', 'font-size': '16px'}

		// apply to collection
		$a('.example>div').setStyle({ color: 'blue', 'font-size': '15px' });

		// inspect every computed property
		const styles = $1('.example>div').getStyle();
		console.log([styles.color, styles.fontSize]);
		// ['rgb(0, 0, 255)', '15px']


	}


	const arrayMethodsExample = () => {

		$a('.example>div').each((...args) => {
			_l(args);

		});

		$a('.example>div').each(n => {
			if (!n.hasData('init')) {
				// one-time initialisation
				n.setData('init', 1);
			}

		});
		// .each() is safe on empty collections: the callback simply never runs

		const exampleDivs = $a('.example>div');
		exampleDivs.onEnter(n => n.addClass('opened'));

		$1('body').append('<div id="test-filter">test filter</div>');
		$id('test-filter').onClick((...args) => {
			// keep only .opened items
			const openedDivs = exampleDivs.filter('.opened');

			// keep items that contain at least one <a>
			const divsWithLinks = openedDivs.filter(n => $a('a', n).length > 0);

			// same as:
			const divsWithLinks2 = new InDomArray();
			openedDivs.each(n => {
				if ($a('a', n).length > 0) {
					divsWithLinks2.push(n);
				}
			});

		});

		// Suppose that for every #mainMenu>div there is a matching .menu-icon (e.g. positioned fixed)
		const menuIcons = $a('.menu-icon');
		$a('#mainMenu>div').each((n, i) => {
			n.onEnter(() => menuIcons[i].addClass('on'));
			n.onLeave(() => menuIcons[i].removeClass('on'));
		});

		const cat = $id('categories');
		// Sort direct child .example divs by number of their direct span children,
		// then re-append in new order
		cat.append($a('>div', cat).sort((a, b) => $a('>span', a).length - $a('>span', b).length));



	}


	const extendExample = () => {

		// - Extend
		/**
		 * Extend InDom with a custom helper: scrollTop getter / setter
		 * Handles both Element and Document nodes, enforces integer input,
		 * and uses requestAnimationFrame for smooth scrolling.
		 */
		InDom.prototype.scrollTop = function(y, smooth) {
			if (!y) {
				// document itself doesn't have scrollTop only its documentElement
				return (this.el() instanceof Document ? document.documentElement : this.el())
					.scrollTop;
			}
			if (!Number.isInteger(y)) { // accept only an integer for y to scroll
				throw new TypeError('Expected an integer to scrollTop, got ' + y);
			}
			requestAnimationFrame(() => {
				// if it is document it is better to scroll to window instead of its documentElement
				(this.el() instanceof Document ? window : this.el())
					.scrollTo({ top: y, behavior: smooth === true ? 'smooth' : 'instant' });
			});
		};

		// usage example 
		$1(".example>div").onClick(() => $n(document).scrollTop(100, true));

		// - Modify 
		// Modify InDom with custom onClick method that throttles clicks and touchstart
		InDom.prototype.onClick = function(fn, opts) {
			// If no function provided, delegate to standard click event
			if (!fn) {
				return this.on('click');
			}

			let canClick = true; // Throttle flag to prevent rapid repeated triggers

			// Attach handlers to both 'click' and 'touchstart' events
			return this.on(['click', 'touchstart'], (n, e) => {
				if (!canClick) {
					return; // Ignore rapid repeats during throttle period
				}
				canClick = false; // Disable further triggers
				setTimeout(() => canClick = true, 300); // Re-enable after 300ms
				fn(n, e); // Execute user-provided callback with InDom object and event
			}, opts);
		};

		// Bulk version for InDomArray - applies onClick to all InDom objects in the array
		InDomArray.prototype.onClick = function(fn, opts) {
			const fnArr = new Array(this.length);
			for (let i = 0; i < this.length; i++) {
				// Apply onClick to each individual InDom object and store handler references
				fnArr[i] = this[i].onClick(fn, opts);
			}
			return fnArr; // Return array of handler references for cleanup
		};

		// Example usage:
		const exampleDivs = $a(".example>div");

		// Apply custom onClick behavior - logs HTML content and event details
		const clickHandlers = exampleDivs.onClick((n, e) => {
			console.log(['.example>div onClick', 'html:', n.getHtml(), 'event:', e]);
		});

		// Example: Removing event handlers (cleanup)

		// Method 1: Remove ALL click and touchstart listeners from exampleDivs
		exampleDivs.off('click').off('touchstart');

		// Method 2: Remove only the specific handlers we created
		exampleDivs.off('click', clickHandlers).off('touchstart', clickHandlers);

		// Method 3: Enhanced cleanup API for clarity and reusability
		// Create custom removal methods for easier management

		// Remove click/touchstart handlers from a single object
		InDom.prototype.removeOnClick = function(fn) {
			this.off('click', fn);      // Remove click handler
			this.off('touchstart', fn); // Remove touchstart handler
		};

		// Remove click/touchstart handlers from multiple InDom objects in an array

		InDomArray.prototype.removeOnClick = function(fnArr) {
			const hasFunctions = Array.isArray(fnArr);

			// Validate that the handler array matches the number of InDom objects
			if (hasFunctions && fnArr.length !== this.length) {
				throw new RangeError(`Expected ${this.length} handlers, got ${fnArr.length}`);
			}

			// Remove handlers from each InDom object individually
			for (let i = 0; i < this.length; i++) {
				this[i].removeOnClick(hasFunctions ? fnArr[i] : undefined);
			}
		};

		// Usage examples for custom cleanup methods:

		// Removes all 'click' and 'touchstart' events from exampleDivs
		exampleDivs.removeOnClick();

		// Removes only the specific clickHandlers we created earlier
		exampleDivs.removeOnClick(clickHandlers);




	};



	//getOneExample();
	//getExample();
	//changeHtmlExample();
	//getByIdExample();
	//constructorExample();
	//onReadyExample(); 
	//getValueExample();
	//getValuesExample();
	//setValueExample();
	//onExample();
	//onRemoveExample();
	//getElementExample();
	//removeExample();
	//dataExample();
	//isExample();
	//getParentExample();
	//getSelfOrParentExample();
	//getNextExample();
	//getPrevExample();
	//getHtmlExample();
	//setHtmlExample();
	//appendPrependExample();
	//afterBeforeExample();
	//attrExample();
	//getBoxExample();
	//getOuterBoxExample();
	//getBoxExample();
	//classExample();
	//styleExample();
	//arrayMethodsExample();
	//inheritedMethods();
	//extendExample();


});