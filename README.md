# InDom - 3.7KB modern JavaScript DOM library - powerful, easy and automates cleanup
<style>
.toc-list a
{
	display:block;
	margin:2px 0px;
	text-decoration:none;
}
</style>
<div id="release">Full release coming 15 October 2025.</div>
<div class=".toc-list">
  <a href="#release">↑</a>
</div>
<pre style="background-color:#fff;color:#24292e"><code><span><span style="color:#6F42C1">	$1</span><span style="color:#24292E">(</span><span style="color:#032F62">'.example>div'</span><span style="color:#24292E">).</span><span style="color:#6F42C1">setStyle</span><span style="color:#24292E">(</span><span style="color:#032F62">'color'</span><span style="color:#24292E">, </span><span style="color:#032F62">'blue'</span><span style="color:#24292E">);</span></span>
<span><span style="color:#6A737D">	/*</span></span>
<span><span style="color:#6A737D">		If .example>div doesn't match any element, $1('.example>div') will return null.</span></span>
<span><span style="color:#6A737D">		Attempting to call a method on null will result in a TypeError.</span></span>
<span><span style="color:#6A737D">		If you want to avoid this error when the element is not found,</span></span>
<span><span style="color:#6A737D">		use the optional chaining operator (?.) e.g.:</span></span>
<span><span style="color:#6A737D">	*/</span></span>
<span><span style="color:#6F42C1">	$1</span><span style="color:#24292E">(</span><span style="color:#032F62">'.example>div'</span><span style="color:#24292E">)?.</span><span style="color:#6F42C1">setStyle</span><span style="color:#24292E">(</span><span style="color:#032F62">'color'</span><span style="color:#24292E">, </span><span style="color:#032F62">'blue'</span><span style="color:#24292E">);</span></span>
<span></span>
<span><span style="color:#6F42C1">	$1</span><span style="color:#24292E">(</span><span style="color:#032F62">'.example>div'</span><span style="color:#24292E">).</span><span style="color:#6F42C1">onClick</span><span style="color:#24292E">(</span><span style="color:#E36209">n</span><span style="color:#D73A49"> =></span><span style="color:#24292E"> {</span></span>
<span><span style="color:#6A737D">		//n here is the InDom object</span></span>
<span><span style="color:#24292E">		n.</span><span style="color:#6F42C1">addClass</span><span style="color:#24292E">(</span><span style="color:#032F62">'clicked'</span><span style="color:#24292E">).</span><span style="color:#6F42C1">setStyle</span><span style="color:#24292E">({ </span><span style="color:#032F62">'color'</span><span style="color:#24292E">: </span><span style="color:#032F62">'red'</span><span style="color:#24292E">, </span><span style="color:#032F62">'font-size'</span><span style="color:#24292E">: </span><span style="color:#032F62">'120%'</span><span style="color:#24292E"> });</span></span>
<span><span style="color:#24292E">	});</span></span>
<span></span>
<span><span style="color:#6A737D">	// Set style to the first 'span', of the first '.example>div'</span></span>
<span><span style="color:#6F42C1">	$1</span><span style="color:#24292E">(</span><span style="color:#032F62">'span'</span><span style="color:#24292E">, </span><span style="color:#6F42C1">$1</span><span style="color:#24292E">(</span><span style="color:#032F62">'.example>div'</span><span style="color:#24292E">)).</span><span style="color:#6F42C1">setStyle</span><span style="color:#24292E">(</span><span style="color:#032F62">'color'</span><span style="color:#24292E">, </span><span style="color:#032F62">'green'</span><span style="color:#24292E">);</span></span>
<span></span>
<span><span style="color:#6A737D">	//or:</span></span>
<span><span style="color:#D73A49">	const</span><span style="color:#005CC5"> div</span><span style="color:#D73A49"> =</span><span style="color:#6F42C1"> $1</span><span style="color:#24292E">(</span><span style="color:#032F62">'.example>div'</span><span style="color:#24292E">);</span></span>
<span><span style="color:#6F42C1">	$1</span><span style="color:#24292E">(</span><span style="color:#032F62">'span'</span><span style="color:#24292E">, div).</span><span style="color:#6F42C1">setStyle</span><span style="color:#24292E">(</span><span style="color:#032F62">'color'</span><span style="color:#24292E">, </span><span style="color:#032F62">'green'</span><span style="color:#24292E">);</span></span></code></pre>
