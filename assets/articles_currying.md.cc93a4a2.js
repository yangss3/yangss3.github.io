import{_ as n,r as s,c as a,b as p,d as t,e as o,a as c,o as e}from"./app.b2baf6b4.js";const u='{"title":"柯里化（Currying）","description":"","frontmatter":{},"headers":[{"level":2,"title":"为什么需要柯里化？","slug":"为什么需要柯里化？"},{"level":2,"title":"柯里化高级实现","slug":"柯里化高级实现"}],"relativePath":"articles/currying.md","lastUpdated":1632842860093}',l={},i=t("h1",{id:"柯里化（currying）",tabindex:"-1"},[o("柯里化（Currying） "),t("a",{class:"header-anchor",href:"#柯里化（currying）","aria-hidden":"true"},"#")],-1),k=c('<p><a href="https://en.wikipedia.org/wiki/Currying" target="_blank" rel="noopener noreferrer">柯里化（Currying）</a>是一种关于函数的高阶技术，它是一种函数的转换，将一个函数调用从 <code>f(a, b, c)</code> 的形式转换为 <code>f(a)(b)(c)</code> 的调用形式。柯里化不会调用函数，它只是对函数进行转换。</p><p>让我们先来看一个例子，以更好地理解我们正在讲的内容，然后再进行一个实际应用。</p><p>我们将创建一个辅助函数 <code>curry(f)</code>，该函数将对两个参数的函数 <code>f</code> 执行柯里化。换句话说，对于两个参数的函数 <code>f(a, b)</code> 执行 <code>curry(f)</code> 会将其转换为以 <code>f(a)(b)</code> 形式运行的函数：</p><div class="language-js"><pre><code><span class="token comment">// curry(f) 执行柯里化转换</span>\n<span class="token keyword">function</span> <span class="token function">curry</span><span class="token punctuation">(</span><span class="token parameter">f</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> \n  <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token function">f</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// 用法</span>\n<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> a <span class="token operator">+</span> b\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> curriedSum <span class="token operator">=</span> <span class="token function">curry</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span>\n\n<span class="token function">curriedSum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token comment">// 3</span>\n</code></pre></div><p>正如你所看到的，实现非常简单：只有两个包装器（wrapper）</p><ul><li><code>curry(sum)</code> 的结果就是一个包装器 <code>function(a)</code></li><li>当它被像 <code>curriedSum(1)</code> 这样调用时，它的参数会被保存在词法环境中，然后返回一个新的包装器 <code>function(b)</code></li><li>然后这个包装器被以 2 为参数调用，而它将该调用传递给原始的 <code>sum</code> 函数</li></ul><p>柯里化更高级的实现，例如 lodash 库的 <code>_.curry</code>，会返回一个包装器，该包装器允许函数被正常调用或者以偏函数（partial）的方式调用：</p><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> a <span class="token operator">+</span> b\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> curriedSum <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">curry</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span> <span class="token comment">// 使用来自 lodash 库的 _.curry</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">curriedSum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 3，仍可正常调用</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">curriedSum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 3，以偏函数的方式调用</span>\n</code></pre></div><h2 id="为什么需要柯里化？" tabindex="-1">为什么需要柯里化？ <a class="header-anchor" href="#为什么需要柯里化？" aria-hidden="true">#</a></h2><p>要了解它的好处，我们需要一个实际中的例子。</p><p>例如，我们有一个用于格式化输出信息的日志函数 <code>log(date, importance, message)</code>。在实际项目中，此类函数具有很多有用的功能，例如通过网络发送日志，在这儿我们仅使用 <code>console.log</code>：</p><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token parameter">date<span class="token punctuation">,</span> importance<span class="token punctuation">,</span> message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>date<span class="token punctuation">.</span><span class="token function">getHours</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>date<span class="token punctuation">.</span><span class="token function">getMinutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">] [</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>importance<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">] </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>message<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>让我们将它柯里化！</p><div class="language-js"><pre><code>log <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">curry</span><span class="token punctuation">(</span>log<span class="token punctuation">)</span>\n</code></pre></div><p>柯里化之后，<code>log</code> 仍正常运行：</p><div class="language-js"><pre><code><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">&quot;DEBUG&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;some debug&quot;</span><span class="token punctuation">)</span>  <span class="token comment">// log(a, b, c)</span>\n</code></pre></div><p>但是也可以以柯里化形式运行：</p><div class="language-js"><pre><code><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">&quot;DEBUG&quot;</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">&quot;some debug&quot;</span><span class="token punctuation">)</span> <span class="token comment">// log(a)(b)(c)</span>\n</code></pre></div><p>现在，我们可以轻松地为当前日志创建便捷函数：</p><div class="language-js"><pre><code><span class="token comment">// logNow 会是带有固定第一个参数的日志的偏函数</span>\n<span class="token keyword">const</span> logNow <span class="token operator">=</span> <span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n<span class="token comment">// 使用它</span>\n<span class="token function">logNow</span><span class="token punctuation">(</span><span class="token string">&quot;INFO&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;message&quot;</span><span class="token punctuation">)</span> <span class="token comment">// [HH:mm] INFO message</span>\n</code></pre></div><p>现在，<code>logNow</code> 是具有固定第一个参数的 <code>log</code>，换句话说，就是更简短的”偏应用函数（partially applied function）”或“偏函数（partial）”。</p><p>我们可以更进一步，为当前的调试日志（debug log）提供便捷函数：</p><div class="language-js"><pre><code><span class="token keyword">let</span> debugNow <span class="token operator">=</span> <span class="token function">logNow</span><span class="token punctuation">(</span><span class="token string">&quot;DEBUG&quot;</span><span class="token punctuation">)</span>\n\n<span class="token function">debugNow</span><span class="token punctuation">(</span><span class="token string">&quot;message&quot;</span><span class="token punctuation">)</span> <span class="token comment">// [HH:mm] DEBUG message</span>\n</code></pre></div><h2 id="柯里化高级实现" tabindex="-1">柯里化高级实现 <a class="header-anchor" href="#柯里化高级实现" aria-hidden="true">#</a></h2><p>实现代码相当简洁：</p><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">curry</span><span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">curried</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>length <span class="token operator">&gt;=</span> func<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// (1)</span>\n      <span class="token keyword">return</span> <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      <span class="token keyword">return</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// (2)</span>\n        <span class="token keyword">return</span> <span class="token function">curried</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>args2<span class="token punctuation">)</span><span class="token punctuation">)</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div><p>它也很容易理解，<code>curry(func)</code> 调用的结果是返回包装器 <code>curried</code>, 当我们运行它时，这里有两个执行分支：</p><ol><li>如果传入的 <code>args</code> 长度与原始函数所定义的参数长度（<code>func.length</code>）相同或者更长，那么将调用传递给原始函数即可。</li><li>否则，返回另一个包装器（偏函数），它将之前传入的参数与新的参数合并，然后重新调用 <code>curried</code>。在新一轮的调用中，重复 1，2 步骤。</li></ol><p>用例：</p><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token operator">+</span> c<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">const</span> curriedSum <span class="token operator">=</span> <span class="token function">curry</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token function">curriedSum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// 6，仍然可以被正常调用</span>\n<span class="token function">curriedSum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// 6，对第一个参数的柯里化</span>\n<span class="token function">curriedSum</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token comment">// 6，全柯里化</span>\n</code></pre></div>',30);var r=n(l,[["render",function(n,t,o,c,u,l){const r=s("PubDate");return e(),a("div",null,[i,p(r,{date:"2021/05/17"}),k])}]]);export{u as __pageData,r as default};
