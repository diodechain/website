---
layout: new
permalink: /about/
title: About
---
<header class="hero">
	<div class="row">
		<div class="col col-12 col-sm-8 col-lg-7 col-xxl-6">
			<div class="hero__content">
				<h1 class="hero__heading">About headline</h1>
				<p class="hero__subheading">For teams whose assets and communication require a highly secure connected network.</p>
			</div>
		</div>
	</div>
</header>

{%-
include headline.liquid
title="Belief Headline"
text="Belief writeup here ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exerc"
-%}

<section class="box">
	<div class="row flex-lg-row-reverse">
		<div class="col col-12 col-lg-6 col-xl-5 col-xxl-6">
			<figure class="box__picture oval"><img src="{{ "/assets/img/grey-2.png" | relative_url }}" width="272" alt=""></figure>
		</div>
		<div class="col col-12 col-lg-6 col-xl-7 col-xxl-6">
			<div class="box__content">
				<h4 class="box__preheading">adsfsaf</h4>
				<h2 class="box__heading">Story headline to go right here.</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</p>
				<p>incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</p>
			</div>
		</div>
	</div>
</section>

{%-
include team.liquid
title="Our Team"
heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex"
data="team"
-%}