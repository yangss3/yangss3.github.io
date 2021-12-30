import{_ as e,r as o,c as n,b as s,d as a,e as c,a as t,o as p}from"./app.e2cd98b5.js";const l='{"title":"深入理解 CORS","description":"","frontmatter":{},"headers":[{"level":2,"title":"为什么需要 CORS","slug":"为什么需要-cors"},{"level":2,"title":"安全请求","slug":"安全请求"},{"level":2,"title":"不安全的请求","slug":"不安全的请求"},{"level":2,"title":"凭据 (Credentials)","slug":"凭据-credentials"},{"level":2,"title":"总结","slug":"总结"}],"relativePath":"articles/understand-cors.md","lastUpdated":1640876420267}',d={},i=a("h1",{id:"深入理解-cors",tabindex:"-1"},[c("深入理解 CORS "),a("a",{class:"header-anchor",href:"#深入理解-cors","aria-hidden":"true"},"#")],-1),r=t('<p>跨源资源共享（Cross Origin Resource Sharing）简称 CORS，是一种基于 HTTP 头的安全机制，它允许服务器指定除其自身以外的任何源 Origin (protocol/domain/port)，并让浏览器允许从这些源加载资源。</p><h2 id="为什么需要-cors" tabindex="-1">为什么需要 CORS <a class="header-anchor" href="#为什么需要-cors" aria-hidden="true">#</a></h2><p>出于安全考虑，一般情况下，浏览器是不允许跨源请求 (cross-origin request) 的，即来自 <code>https://domain-a.com</code> 的客户端代码无法对 <code>https://domain-b.com</code> 的资源发起网络请求 (通过 <code>XMLHttpRequest</code> 或 <code>Fetch</code> API)，这样可以保护互联网免受邪恶黑客的攻击。</p><p>但是，随着 web 应用变得越来越复杂，跨源请求是很常见的需求。为了突破浏览器的限制，早期出现了很多跨域的方案，最常见的就是 JSONP (JSON with padding)。</p><p>JSONP 利用了 <code>&lt;script&gt;</code> 标签的 <code>src</code> 可以是任何源 (origin)，即它可以执行来自任何网站的脚本的特点，来实现跨源资源共享。</p><p>假设我们的站点 <code>https://my-website.com</code> 需要从 <code>https://weather.com</code> 获取天气数据，可以这样做：</p><ol><li>首先，我们事先声明一个全局函数来接受数据，例如 <code>getWeather</code>：<div class="language-js"><pre><code><span class="token comment">// 定义一个全局函数用于处理天气数据</span>\n<span class="token keyword">function</span> <span class="token function">getWeather</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> temperature<span class="token punctuation">,</span> humidity <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">temperature: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>temperature<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, humidity: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>humidity<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div></li><li>然后，我们创建一个 <code>&lt;script&gt;</code> 标签， 并设置 <code>src=&quot;http://weather.com/?callback=getWeather&quot;</code>，使用我们预先定义好的函数名定义一个 URL 参数 <code>callback</code>：<div class="language-js"><pre><code><span class="token keyword">const</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;script&#39;</span><span class="token punctuation">)</span>\nscript<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;http://weather.com/?callback=getWeather&#39;</span>\ndocument<span class="token punctuation">.</span>body<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span>\n</code></pre></div></li><li>远程服务器 <code>weather.com</code> 在接收到这个请求后，动态地生成一个脚本，脚本内部使用它想让我们接收的数据调用 <code>getWeather(...)</code>：<div class="language-js"><pre><code><span class="token comment">// weather.com 返回的脚本内容类似这样:</span>\n<span class="token function">getWeather</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n  temperature<span class="token operator">:</span> <span class="token number">25</span><span class="token punctuation">,</span>\n  humidity<span class="token operator">:</span> <span class="token number">78</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div></li><li>当我们的站点加载和并执行响应回来的脚本时，<code>getWeather</code> 就会运行，因为这是我们预先定义好的全局函数，所以我们就拿到了数据。</li></ol><p>这种方法是可行的，而且不违反浏览器的安全策略，因为这样做的前提是双方都同意以这种方式传递数据。所以这绝不是一个黑客。现在仍然有提供这种访问的服务，因为它支持非常古老的浏览器版本。</p><p>但是 JSONP 也有很多缺点，例如只能行进 GET 请求，无法处理错误等等。为了能安全有效的解决这些问题，CORS 就出现了，它允许在满足特定的条件的情况下，通过 <code>XMLHttpRequest</code> 或 <code>Fetch</code> API 进行跨源请求。</p><h2 id="安全请求" tabindex="-1">安全请求 <a class="header-anchor" href="#安全请求" aria-hidden="true">#</a></h2><p>总的来说，跨源请求 (cross-origin request) 可以分为两类：</p><ol><li>全安请求</li><li>其它所有请求</li></ol><p>什么是安全请求 (safe request) ？如果一个请求同时满足下面两个条件，我们称它是安全的：</p><ol><li>请求方法是 GET, POST, HEAD 之一</li><li>只能包含如下的自定义请求头： <ul><li><code>Accept</code></li><li><code>Accept-Language</code></li><li><code>Content-Language</code></li><li><code>Content-Type</code>，且值只能是 <code>application/x-www-form-urlencoded</code>, <code>multipart/form-data</code>, <code>text/plain</code> 之一</li></ul></li></ol><p>任何不满足这两个条件的请求都被认为是不安全的。</p><p>其本质区别在于，安全请求可以用 <code>&lt;form&gt;</code> 或 <code>&lt;script&gt;</code> 来实现，不需要用到任何特殊方法。所以一个古老的服务器也可以处理安全请求。</p><p>与此相反，带有非标准头的请求或例如 DELETE 请求都不能用这种方式创建。很长时间以来，JavaScript 都不能发送这样的请求。因此，一个古老的服务器可能会认为这样的请求来自于一个有特权的来源，因为一个网页无法发送这些请求。</p><p>当我们试图发送一个不安全的请求时，浏览器会先发送一个特殊的 &quot;预检&quot; (preflight) 请求来询问服务器是否同意接受这种跨源请求？除非服务器响应明确的 CORS 头信息进行确认，否则浏览器不会发送不安全的请求。</p><p>如果一个请求是跨源的 (cross-origin)，浏览器会给它加上 <code>Origin</code> 头，例如，如果我们从 <code>https://website-a.com/page</code> 发起请求 <code>https://website-b.com/request</code>，请求头将是这样：</p><div class="language-http"><pre><code>GET /request\n<span class="token header-name keyword">Host:</span> website-b.com\n<span class="token header-name keyword">Origin:</span> https://website-a.com\n...\n</code></pre></div><p>服务器会检查 <code>Origin</code> 头信息，如果它同意接受这样的请求，就在响应中添加一个特殊的头<code>Access-Control-Allow-Origin</code>。该响应头应包含允许的源 (origin)，在我们的例子中是 <code>https://website-a.com</code> ，或者一个星号 <code>*</code>，那么请求就会成功，否则将抛出错误。</p><p>浏览器在这个过程种扮演类似调解人的角色：</p><ol><li>它确保跨源请求发送正确的 <code>Origin</code> 头。</li><li>它检查响应头 <code>Access-Control-Allow-Origin</code> 中是否包含请求源，如果它存在，则允许 JavaScript 访问响应 (response)，否则抛出错误。</li></ol><p>下面是一个成功的服务端响应头：</p><div class="language-http"><pre><code>200 OK\n<span class="token header-name keyword">Content-Type:</span>text/html; charset=UTF-8\n<span class="token header-name keyword">Access-Control-Allow-Origin:</span> https://website-a.com\n</code></pre></div><p>对于跨源请求，默认情况下只允许 JavaScript 访问“安全”的响应头：</p><ul><li><code>Cache-Control</code></li><li><code>Content-Language</code></li><li><code>Content-Type</code></li><li><code>Expires</code></li><li><code>Last-Modified</code></li><li><code>Pragma</code></li></ul><p>除此之外，访问任何其它响应头都会报错。</p><p>要授予 JavaScript 对其他响应头的访问权，服务器必须发送<code>Access-Control-Expose-Headers</code> 头，并在其中指明以逗号分隔的不安全头名称列表。例如：</p><div class="language-http"><pre><code>200 OK\n<span class="token header-name keyword">Content-Type:</span>text/html; charset=UTF-8\n<span class="token header-name keyword">Content-Length:</span> 12345\n<span class="token header-name keyword">API-Key:</span> 2c9de507f2c54aa1\n<span class="token header-name keyword">Access-Control-Allow-Origin:</span> https://website-a.com\n<span class="token header-name keyword">Access-Control-Expose-Headers:</span> Content-Length,API-Key\n</code></pre></div><p>有了这样的 <code>Access-Control-Expose-Headers</code> 响应头，JavaScript 脚本就可以读取响应中的 <code>Content-Length</code> 和 <code>API-Key</code> 头。</p><h2 id="不安全的请求" tabindex="-1">不安全的请求 <a class="header-anchor" href="#不安全的请求" aria-hidden="true">#</a></h2><p>请求方法除了 <code>GET</code>，<code>Post</code>, 还可以是 <code>PATCH</code>，<code>DELETE</code> 等等。在过去，是无法通过网页发送这种请求的，所以一些古老的 web 服务器在接收到这种请求时，它们会认为：这一定不是来自浏览器。为了避免这种误解，对于这些“不安全”的请求，浏览器不会立刻将其直接发送给服务器，而是先发送一个“预检” (preflight) 请求，向服务器询问权限。</p><p>预检请求通过 <code>OPTIONS</code> 方法发送，且不携带 body，只包含三个请求头：</p><ul><li><code>Access-Control-Request-Method</code>：指明不安全请求的方法</li><li><code>Access-Control-Request-Headers</code>：逗号分隔的不安全的请求头列表</li><li><code>Origin</code>：请求源，指明不安全请求来自哪里</li></ul><p>如果服务器同意服务这个请求，它应该响应空的body，200 状态码和如下响应头：</p><ul><li><code>Access-Control-Allow-Origin</code>：允许的请求源，例如 <code>https://website-a.com</code>, 或是一个星号 <code>*</code> 表明允许任何源</li><li><code>Access-Control-Allow-Methods</code>：允许的请求方法</li><li><code>Access-Control-Allow-Headers</code>：允许的请求头</li><li><code>Access-Control-Max-Age</code>：可以指定一个缓存权限的时间长度 (秒数)。这样，浏览器就不必为满足给定权限的后续请求发送预检。</li></ul><p>下面以一个跨源的 <code>PATCH</code> 请求为例，看看它是如何一步步工作的：</p><div class="language-js"><pre><code><span class="token keyword">const</span> response <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;https://website-b.com/request&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  method<span class="token operator">:</span> <span class="token string">&#39;PATCH&#39;</span><span class="token punctuation">,</span>\n  headers<span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token string">&#39;Content-Type&#39;</span><span class="token operator">:</span> <span class="token string">&#39;application/json&#39;</span><span class="token punctuation">,</span>\n    <span class="token string">&#39;API-Key&#39;</span><span class="token operator">:</span> <span class="token string">&#39;secret&#39;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>有三个原因导致该请求不安全（只要一个就够了）:</p><ul><li>请求方法 <code>PATCH</code></li><li><code>Content-Type</code> 不是 <code>application/x-www-form-urlencoded</code>, <code>multipart/form-data</code>, <code>text/plain</code> 之一</li><li>不安全的 <code>API-Key</code> 头</li></ul><p><strong>第一步：浏览器发送预检请求</strong></p><p>在发送真正的请求之前，浏览器会先发送一个 <code>OPTIONS</code> 预检请求，请求头如下：</p><div class="language-http"><pre><code>OPTIONS /request\n<span class="token header-name keyword">Host:</span> website-b.com\n<span class="token header-name keyword">Origin:</span> https://website-a.com\n<span class="token header-name keyword">Access-Control-Request-Method:</span> PATCH\n<span class="token header-name keyword">Access-Control-Request-Headers:</span> Content-Type,API-Key\n</code></pre></div><ul><li>请求方法：<code>OPTIONS</code></li><li>请求路径：<code>/request</code></li><li>跨源的特殊的请求头： <ul><li><code>Origin</code>：请求源</li><li><code>Access-Control-Request-Method</code>：不安全的请求方法</li><li><code>Access-Control-Request-Headers</code>：不安全的请求头列表</li></ul></li></ul><p><strong>第二步：服务器响应预检请求</strong></p><p>服务器以状态码 200 发送如下响应头：</p><div class="language-http"><pre><code>200 OK\n<span class="token header-name keyword">Access-Control-Allow-Origin:</span> https://website-a.com/page\n<span class="token header-name keyword">Access-Control-Allow-Methods:</span> PATCH\n<span class="token header-name keyword">Access-Control-Allow-Headers:</span> Content-Type,API-Key\n</code></pre></div><p>这意味着服务器允许后面的 <code>PATCH</code> 请求。</p><p>如果服务器允许后面有其它方法的请求 (<code>PUT</code>, <code>DELETE</code> 等)或可携带其它头信息，可以提前允许它们，只要将它们添加到列表中即可，例如：</p><div class="language-"><pre><code>200 OK\nAccess-Control-Allow-Origin: https://website-a.com/page\nAccess-Control-Allow-Methods: PUT,PATCH,DELETE\nAccess-Control-Allow-Headers: API-Key,Content-Type,If-Modified-Since,Cache-Control\nAccess-Control-Max-Age: 86400\n</code></pre></div><p>浏览器拿到预检响应后，看到 <code>PATCH</code> 在 <code>Access-Control-Allow-Methods</code> 中，<code>Content-Type</code>，<code>API-Key</code> 在 <code>Access-Control-Allow-Headers</code> 列表中，所以它发出了主请求。</p><p>响应头中如果有带秒数的 <code>Access-Control-Max-Age</code>，那么该预检的权限就会被缓存给定的时间。例如上面的响应将被缓存 86400 秒 (一天)。在这个时间范围内，后续满足条件的请求将不会触发预检，而是被直接发送。</p><p><strong>第三步：浏览器发送主请求</strong></p><p>当预检请求成功后，浏览器会进行主请求。这里的过程与安全请求的过程是一样的：</p><div class="language-http"><pre><code>PATCH /request\n<span class="token header-name keyword">Host:</span> website-b.com\n<span class="token header-name keyword">Origin:</span> https://website-a.com\n<span class="token header-name keyword">Content-Type:</span> application/json\n<span class="token header-name keyword">API-Key:</span> secret\n</code></pre></div><p><strong>第四步：服务器响应主请求</strong></p><p>服务器在主响应中需要添加 <code>Access-Control-Allow-Origin</code>：</p><div class="language-http"><pre><code><span class="token header-name keyword">Access-Control-Allow-Origin:</span> https://website-a.com\n</code></pre></div><p>这样，JavaScript 才可以访问到主请求的响应。</p><div class="tip custom-block"><p class="custom-block-title">注意</p><p>预检请求发生在 &quot;幕后&quot;，它对 JavaScript 是不可见的。JavaScript 只能访问对主请求的响应，如果没有得到服务器的许可，则会抛出一个错误。</p></div><h2 id="凭据-credentials" tabindex="-1">凭据 (Credentials) <a class="header-anchor" href="#凭据-credentials" aria-hidden="true">#</a></h2><p>通常情况下，对 <code>http://website-b.com</code> 的发起的请求会携带该域的所有 cookies。但由 JavaScript 发出的跨源请求是一个例外。默认情况下，由 JavaScript 发起的跨源请求不会携带任何 <em>credentials</em> (cookies 或 HTTP authentication)。</p><p>例如，<code>fetch(&#39;http://website-b.com&#39;)</code> 不会发送任何 cookie，即使它是属于 <code>website-b.com</code> 域名的 cookie。</p><p>为什么？</p><p>这是因为携带 <em>credentials</em> 的请求比没有携带 <em>credentials</em> 的请求要&quot;强大&quot;得多。如果允许携带 <em>credentials</em>，这相当于授予 JavaScript 用户的权限，并可以使用他们的 <em>credentials</em> 访问敏感信息。</p><p>服务器真的这么信任这个脚本吗？所以，它必须附加一个头信息以明确地指明是否允许带有 <em>credentials</em> 的请求。</p><p>为了在 fetch 中发送 <em>credentials</em>，我们需要指定 <code>credentials: &#39;include&#39;</code>，像这样：</p><div class="language-js"><pre><code><span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">&#39;http://website-b.com&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n  credentials<span class="token operator">:</span> <span class="token string">&#39;include&#39;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n</code></pre></div><p>现在，fetch 将来自 <code>website-b.com</code> 的 cookie 与请求一起发送到该网站。</p><p>如果服务器同意接受带有 <em>credentials</em> 的请求，那么除了 <code> Access-Control-Allow-Credentials: true</code> 之外，它还应该在响应中添加一个 <code>Access-Control-Allow-Origin</code> 头。例如：</p><div class="language-http"><pre><code>200 OK\n<span class="token header-name keyword">Access-Control-Allow-Origin:</span> https://website-a.com\n<span class="token header-name keyword">Access-Control-Allow-Credentials:</span> true\n</code></pre></div><p>请注意：<code>Access-Control-Allow-Origin</code> 禁止对带有 <em>credentials</em> 的请求使用星号 <code>*</code>。就像上面显示的那样，而是必须提供准确的来源。这是一个额外的安全措施，以确保服务器真正知道是谁发起的这个请求。</p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-hidden="true">#</a></h2><ul><li>从浏览器的角度，跨源请求分为两种：安全请求和不安全请求。</li><li>安全请求必须满足两个特定条件： <ul><li>请求方法只能是 GET，POST，HEAD</li><li>只能设置以下请求头 <ul><li><code>Accept</code></li><li><code>Accept-Language</code></li><li><code>Content-Language</code></li><li><code>Content-Type</code> 只能是 <code>application/x-www-form-urlencoded</code>, <code>multipart/form-data</code>, <code>text/plain</code> 之一</li></ul></li></ul></li><li>安全请求和不安全请求的本质区别是：安全的请求可以通过 <code>&lt;form&gt;</code> 或 <code>&lt;script&gt;</code> 标签来实现，这也是早期浏览器发送跨源请求的方式。而不安全的请求在很长一段时间内，浏览器是无法发送的。</li><li>安全请求会被浏览器直接发送： <ul><li>--&gt; 浏览器加上 <code>Origin</code> 头信息，然后发送给服务器</li><li>&lt;-- 对于没有携带 credentials 的请求，服务器设置如下响应头: <ul><li><code>Access-Control-Allow-Origin</code> 为 <code>*</code> 或 与 <code>Origin</code> 相同的值</li></ul></li><li>&lt;-- 对于携带了 credentials 的请求，服务器设置如下响应头： <ul><li><code>Access-Control-Allow-Origin</code> 为与 <code>Origin</code> 相同的值</li><li><code>Access-Control-Allow-Credentials</code> 为 true</li></ul></li></ul></li><li>若要授权 JavaScript 访问除了 <code>Cache-Control</code>, <code>Content-Language</code>, <code>Content-Type</code>, <code>Expires</code>, <code>Last-Modified</code>，<code>Pragma</code> 之外的响应头，服务器应该设置 <code>Access-Control-Expose-Headers</code> 头，并将允许访问的头字段列入其中</li><li>对于不安全请求，浏览器会先发起一个预检请求询问服务器的访问权限： <ul><li>--&gt; 浏览器发送 <code>OPTIONS</code> 请求到相同的请求地址，并携带如下请求头： <ul><li><code>Access-Control-Request-Method</code>：不安全请求方法</li><li><code>Access-Control-Request-Headers</code>：不安全的请求头列表</li></ul></li><li>&lt;-- 服务器响应 200 状态码以及如下响应头： <ul><li><code>Access-Control-Allow-Methods</code>：允许的不安全请求方法列表</li><li><code>Access-Control-Allow-Headers</code>：允许的不安全请求头列表</li><li><code>Access-Control-Max-Age</code>：该权限的缓存时长</li></ul></li><li>然后浏览器发送实际的请求，过程同安全请求一样。</li></ul></li></ul>',75);var u=e(d,[["render",function(e,a,c,t,l,d){const u=o("PubDate");return p(),n("div",null,[i,s(u,{date:"2021/10/22"}),r])}]]);export{l as __pageData,u as default};
